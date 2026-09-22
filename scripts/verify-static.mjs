import assert from 'node:assert/strict'
import { readFile, mkdir, readdir } from 'node:fs/promises'
import { chromium, expect } from '@playwright/test'

const origin = 'http://127.0.0.1:4173'
const snapshot = JSON.parse(await readFile(new URL('../data/snapshot.json', import.meta.url)))
const posts = snapshot['blog/posts'].data
const routes = ['/', '/program/', '/print/', '/dashboard/', '/blog/', '/media/', '/gdpr/', '/vop/', '/index-soon/', '/mapa/', ...posts.map(post => `/blog/${post.slug}/`)]
const forbiddenRequests = []
const failedResponses = []
const errors = []
await mkdir('test-results', { recursive: true })

// Run against the exported files served by Python, with every external request blocked.
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {})
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, serviceWorkers: 'block' })
await context.route('**/*', async route => {
  const request = route.request()
  const url = new URL(request.url())
  if (url.origin !== origin || url.pathname.startsWith('/api/') || request.method() !== 'GET') {
    forbiddenRequests.push(`${request.method()} ${request.url()}`)
    return route.abort()
  }
  return route.continue()
})
const page = await context.newPage()
page.on('pageerror', error => errors.push(error.message))
page.on('response', response => {
  if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`)
})

try {
  for (const route of routes) {
    assert.equal((await page.goto(origin + route)).status(), 200, route)
    await page.waitForLoadState('networkidle')
    const brokenImages = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || !image.naturalWidth).map(image => image.src))
    assert.deepEqual(brokenImages, [], `Images on ${route}`)
    assert.ok((await page.locator('body').innerText()).trim().length > 20, `Empty route ${route}`)
    if (route === '/dashboard/') {
      assert.equal(await page.locator('tbody tr').count(), snapshot.talks.json.length)
      assert.ok((await page.locator('body').innerText()).includes(String(snapshot['talk-favorites/dashboard'].totalFavorites)))
      await page.screenshot({ path: 'test-results/dashboard.png', fullPage: true })
    }
    if (route === '/') await page.screenshot({ path: 'test-results/home.png', fullPage: true })
    console.log(`PASS ${route}`)
  }

  console.log('Checking local program interactions')
  await page.goto(origin + '/program/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: /Seznam$/ }).click()
  await expect(page.getByRole('button', { name: /Seznam$/ })).toHaveAttribute('aria-pressed', 'true')
  const favorite = page.getByRole('button', { name: 'Přidat do oblíbených', exact: true }).first()
  await favorite.click()
  const storedFavorites = await page.evaluate(() => JSON.parse(localStorage.getItem('cryptobyte-2026-favorites')))
  assert.equal(storedFavorites.length, 1)
  await page.reload()
  await page.getByRole('button', { name: 'Odebrat z oblíbených', exact: true }).first().waitFor()
  await page.getByRole('button', { name: /Oblíbené$/ }).click()
  await expect(page.getByRole('button', { name: /Oblíbené$/ })).toHaveAttribute('aria-pressed', 'true')
  assert.equal(await page.getByRole('button', { name: 'Odebrat z oblíbených', exact: true }).count(), 1)
  const selectedTalk = snapshot.talks.json.find(talk => talk.id === storedFavorites[0])
  await page.getByText(selectedTalk.name, { exact: true }).first().click()
  await page.getByRole('dialog').getByText(selectedTalk.name, { exact: true }).waitFor()
  assert.ok((await page.getByRole('dialog').innerText()).includes(selectedTalk.name))
  await page.keyboard.press('Escape')
  await page.screenshot({ path: 'test-results/program.png', fullPage: true })

  await page.goto(origin + '/dashboard/')
  await page.waitForLoadState('networkidle')
  assert.ok((await page.locator('body').innerText()).includes(String(snapshot['talk-favorites/dashboard'].totalFavorites)))
  console.log('Checking dashboard after 31 seconds')
  // The old dashboard polled at 30 seconds. Crossing that boundary must not call any API.
  await page.waitForTimeout(31_000)

  // Navigate between articles through the router, including back to the index.
  await page.goto(origin + '/blog/')
  for (const post of posts.slice(0, 2)) {
    await page.locator(`a[href="/blog/${post.slug}"]`).first().click()
    await page.getByRole('heading', { name: post.title, exact: true }).waitFor()
    await page.getByRole('link', { name: 'Zpět na blog' }).click()
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(origin + '/')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true })
  await page.goto(origin + '/program/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: /Všechny$/ }).click()
  await page.getByRole('button', { name: /Seznam$/ }).click()
  await expect(page.getByRole('button', { name: /Všechny$/ })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('button', { name: /Seznam$/ })).toHaveAttribute('aria-pressed', 'true')
  assert.ok(await page.getByRole('button', { name: 'Přidat do oblíbených', exact: true }).count() > 20)
  await page.waitForFunction(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
  await page.screenshot({ path: 'test-results/program-mobile.png', fullPage: true })

  assert.deepEqual(forbiddenRequests, [], 'No API, external host, or write requests are allowed')
  assert.deepEqual(failedResponses, [], 'No failed asset requests are allowed')
  assert.deepEqual(errors, [], 'No browser exceptions are allowed')
  const outputFiles = await readdir('.output/public')
  assert.ok(!outputFiles.includes('_worker.js'), 'Static output must not contain a Worker')
  console.log(`PASS: ${routes.length} routes, local favorites, modal, blog navigation, desktop/mobile, frozen dashboard; zero external/API/write requests, failed assets or browser exceptions.`)
} finally {
  await browser.close()
}

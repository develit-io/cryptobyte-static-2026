import { readFile } from 'node:fs/promises'

const token = process.env.CLOUDFLARE_API_TOKEN
const account = process.env.CLOUDFLARE_ACCOUNT_ID
if (!token || !account) throw new Error('Missing Cloudflare deployment credentials')
const config = JSON.parse(await readFile(new URL('../deployment/cloudflare-pages.json', import.meta.url)))
const base = `/accounts/${account}/pages/projects`
const projectPath = `${base}/${config.name}`
const domain = '2026.cryptobyte.cz'
const mode = process.argv[2] ?? 'status'

async function api(path, method = 'GET', body, allowMissing = false) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  })
  const data = await response.json()
  if (allowMissing && response.status === 404) return null
  if (!response.ok || !data.success) {
    // Only API error codes/messages, never complete responses or credentials.
    throw new Error(`${method} failed (${response.status}): ${JSON.stringify(data.errors?.map(({ code, message }) => ({ code, message })))}`)
  }
  return data.result
}

let project = await api(projectPath, 'GET', undefined, true)
if (mode === 'setup' && !project) {
  project = await api(base, 'POST', config)
  console.log('Created Pages project with GitHub integration')
}
if (!project) throw new Error('Pages project does not exist')
console.log(JSON.stringify({ name: project.name, subdomain: project.subdomain, domains: project.domains, source: project.source?.type ?? 'direct-upload' }))

if (mode === 'domain') {
  const zones = await api('/zones?name=cryptobyte.cz')
  if (zones.length !== 1) throw new Error('Expected one accessible cryptobyte.cz zone')
  const dnsPath = `/zones/${zones[0].id}/dns_records`
  const records = await api(`${dnsPath}?name=${domain}`)
  if (records.some(record => record.type !== 'CNAME' || record.content !== project.subdomain)) {
    throw new Error('Existing DNS record conflicts with this Pages project; no DNS changes made')
  }
  const domains = await api(`${projectPath}/domains`)
  if (!domains.some(item => item.name === domain)) {
    await api(`${projectPath}/domains`, 'POST', { name: domain })
    console.log(`Associated ${domain} with Pages`)
  }
  // Cloudflare may create the record during association; check again before creating.
  const current = await api(`${dnsPath}?name=${domain}`)
  if (current.length === 0) {
    await api(dnsPath, 'POST', { type: 'CNAME', name: domain, content: project.subdomain, ttl: 1, proxied: true })
    console.log(`Created CNAME for ${domain}`)
  } else if (current.some(record => record.type !== 'CNAME' || record.content !== project.subdomain)) {
    throw new Error('DNS changed during domain setup; existing records preserved')
  }
}
const domains = await api(`${projectPath}/domains`)
console.log(JSON.stringify({ domains: domains.map(item => ({ name: item.name, status: item.status, validation: item.validation_data?.status, verification: item.verification_data?.status })) }))
const deployments = await api(`${projectPath}/deployments?per_page=3`)
console.log(JSON.stringify({ deployments: deployments.map(item => ({ id: item.id, url: item.url, environment: item.environment, stage: item.latest_stage, commit: item.deployment_trigger?.metadata?.commit_hash })) }))

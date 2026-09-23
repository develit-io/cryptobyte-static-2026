// Read-only diagnostic. Never log credentials or unfiltered API responses.
const token = process.env.CLOUDFLARE_API_TOKEN
const account = process.env.CLOUDFLARE_ACCOUNT_ID
const archiveAccount = 'd23b5b8537a1f23ed0a7b43faa482006'
if (!token || !account) throw new Error('Cloudflare token or account ID is unavailable')
console.log(`Configured account matches the 2025 archive: ${account === archiveAccount}`)

async function check(label, path, summarize) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(20000),
  })
  const body = await response.json()
  console.log(JSON.stringify({
    check: label, status: response.status, success: body.success,
    errorCodes: (body.errors ?? []).map(error => error.code),
    ...(body.success ? summarize(body.result) : {}),
  }))
  return body.success
}

const configured = await check('Pages projects in configured account', `/accounts/${account}/pages/projects`, projects => ({
  archiveProjects: projects.filter(project => project.name.includes('cryptobyte')).map(project => ({ name: project.name, subdomain: project.subdomain })),
}))
const archive = await check('Access to existing 2025 archive', `/accounts/${archiveAccount}/pages/projects/cryptobyte2025-static-backup`, project => ({
  name: project.name, subdomain: project.subdomain,
}))
await check('CryptoByte DNS zone visibility', '/zones?name=cryptobyte.cz', zones => ({
  zones: zones.map(zone => ({ name: zone.name, accountName: zone.account?.name, matchesArchiveAccount: zone.account?.id === archiveAccount })),
}))
if (!configured || !archive) process.exitCode = 1

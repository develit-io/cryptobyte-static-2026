import { runCommand } from '@nuxt/cli'

// The Nuxt CLI can retain background handles after prerendering. Finish this
// one-shot export only after the entire generate command has resolved, and
// preserve a failing exit status for any build or prerender error.
try {
  await runCommand('generate', process.argv.slice(2))
  process.exit(process.exitCode ?? 0)
} catch (error) {
  console.error(error)
  process.exit(1)
}

export function formatDate (isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).replace(/\s/g, '')
}

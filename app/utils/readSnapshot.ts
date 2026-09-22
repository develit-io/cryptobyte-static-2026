import snapshot from '../../data/snapshot.json'

/** Read the bundled archive. This deliberately performs no network request. */
export async function readSnapshot<T = any>(key: string): Promise<T> {
  if (!Object.hasOwn(snapshot, key)) {
    throw createError({ statusCode: 404, statusMessage: 'Archived page not found' })
  }
  const value = structuredClone(snapshot[key as keyof typeof snapshot])
  return (key === 'talks' ? JSON.stringify(value) : value) as T
}

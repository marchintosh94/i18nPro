export const objectKeysToLower = <T extends object>(obj: T): T => {
  const mappedObject: [string, any][] = Object.entries(obj).map(
    ([key, val]) => [key.toLowerCase(), val]
  )
  const sortedKeys = new Map([...mappedObject])
  return Object.fromEntries(sortedKeys) as T
}

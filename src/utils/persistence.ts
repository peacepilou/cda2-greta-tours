export function readParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key)
}

export function writeParam(key: string, value: string): void {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.replaceState({}, '', url.toString())
}

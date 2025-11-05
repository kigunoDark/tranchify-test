export function parseFilter<T extends Record<string, unknown>>(
  searchParams: URLSearchParams,
  filterMap: Partial<Record<keyof T, (v: string) => T[keyof T]>>
): T {
  const result = {} as T;

  for (const [key, transform] of Object.entries(filterMap)) {
    const value = searchParams.get(key);
    if (value !== null && transform) {
      result[key as keyof T] = transform(value);
    }
  }

  return result;
}

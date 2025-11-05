/**
 * Parses URLSearchParams into an object of type T using provided transformation functions.
 *
 * @template T - The target object type.
 * @param {URLSearchParams} searchParams - The URLSearchParams instance to parse.
 * @param {Partial<Record<keyof T, (v: string) => T[keyof T]>>} filterMap - A mapping of keys to transformation functions.
 * @returns {T} An object of type T with transformed values from the search parameters.
 */

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

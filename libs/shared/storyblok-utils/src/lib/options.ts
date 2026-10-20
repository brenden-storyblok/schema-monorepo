// Resolve an editor-provided option to a known value, falling back to the
// default when the value is missing or unknown (e.g. stories saved before the
// field existed, or a value removed from the schema).
export function pickOption<const T extends readonly string[]>(
  value: unknown,
  allowed: T,
  fallback: T[number],
): T[number] {
  return typeof value === 'string' &&
    (allowed as readonly string[]).includes(value)
    ? (value as T[number])
    : fallback;
}

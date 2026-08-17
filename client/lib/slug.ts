export function toCategorySlug(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

export function formatShopCount(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(value);
}

export function formatShopJoined(iso: string, now = new Date()): string {
  const joined = new Date(iso);
  const months =
    (now.getFullYear() - joined.getFullYear()) * 12 +
    (now.getMonth() - joined.getMonth());

  if (months < 1) return "this month";
  if (months < 12) {
    return `${months} ${months === 1 ? "month" : "months"}`;
  }

  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? "year" : "years"}`;
}

export function formatShopResponseTime(minutes: number): string {
  if (minutes < 60) return `within ${minutes} min`;
  const hours = Math.round(minutes / 60);
  return `within ${hours} ${hours === 1 ? "hour" : "hours"}`;
}

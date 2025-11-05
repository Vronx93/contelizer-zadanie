export type SortOrder = "ascending" | "descending";

export function sortByKey<T extends object>(
  items: T[],
  key: keyof T,
  order: SortOrder = "ascending"
): T[] {
  if (items.length === 0) return [];
  const direction = order === "ascending" ? 1 : -1;

  return [...items].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1 * direction;
    if (bVal == null) return -1 * direction;

    const aStr = String(aVal).trim();
    const bStr = String(bVal).trim();

    // ---------- ceny ----------
    const isPrice = (val: string) => /^[\d\s,.]+(\s?zł)?$/i.test(val);
    const parsePrice = (val: string) =>
      parseFloat(val.replace(/\s/g, "").replace(/zł/i, "").replace(",", "."));

    if (isPrice(aStr) && isPrice(bStr)) {
      const aPrice = parsePrice(aStr);
      const bPrice = parsePrice(bStr);
      if (!isNaN(aPrice) && !isNaN(bPrice)) {
        return (aPrice - bPrice) * direction;
      }
    }

    // ---------- daty ISO ----------
    const parseDate = (val: string): number | null => {
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d.getTime();
    };

    const aDate = parseDate(aStr);
    const bDate = parseDate(bStr);
    if (aDate !== null && bDate !== null) {
      return (aDate - bDate) * direction;
    }

    // ---------- liczby ----------
    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * direction;
    }

    const aNum = parseFloat(aStr.replace(",", "."));
    const bNum = parseFloat(bStr.replace(",", "."));
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return (aNum - bNum) * direction;
    }

    // ---------- fallback: string ----------
    return aStr.localeCompare(bStr, "pl", { sensitivity: "base" }) * direction;
  });
}

export const search = <T extends object>(items: T[], query: string) => {
  return (
    items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    ) || []
  );
};

import type { VehicleListItem } from "@/lib/api";

interface BrandInfo {
  name: string;
  photo: string | null;
  count: number;
}

export function BrandNav({
  items,
  selected,
  onSelect,
}: {
  items: VehicleListItem[];
  selected: string;
  onSelect: (brand: string) => void;
}) {
  const brandMap = new Map<string, BrandInfo>();
  for (const item of items) {
    const existing = brandMap.get(item.brand);
    if (existing) {
      existing.count += 1;
      if (!existing.photo && item.cover_photo_url) existing.photo = item.cover_photo_url;
    } else {
      brandMap.set(item.brand, { name: item.brand, photo: item.cover_photo_url, count: 1 });
    }
  }
  const brands = Array.from(brandMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  if (brands.length === 0) return null;

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-lg font-bold text-brand-black uppercase">Navegue por marca</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => onSelect("all")}
            className={`flex h-24 w-32 shrink-0 flex-col items-center justify-center gap-1 border text-sm font-semibold transition-colors ${
              selected === "all"
                ? "border-brand-orange bg-brand-orange text-white"
                : "border-border bg-surface text-foreground hover:border-brand-orange"
            }`}
          >
            Todas
          </button>
          {brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => onSelect(brand.name)}
              className={`flex h-24 w-32 shrink-0 flex-col overflow-hidden border transition-colors ${
                selected === brand.name ? "border-brand-orange" : "border-border hover:border-brand-orange"
              }`}
            >
              <div className="relative h-16 w-full overflow-hidden bg-surface">
                {brand.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={brand.photo} alt={brand.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                    {brand.name}
                  </div>
                )}
              </div>
              <div className="flex flex-1 items-center justify-center bg-white px-1">
                <span className="truncate text-xs font-bold text-brand-black uppercase">{brand.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

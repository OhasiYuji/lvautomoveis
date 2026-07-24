import type { VehicleListItem } from "@/lib/api";
import { BrandIcon, findBrandIcon } from "@/components/brand-icons";

interface BrandInfo {
  name: string;
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
    if (existing) existing.count += 1;
    else brandMap.set(item.brand, { name: item.brand, count: 1 });
  }
  const brands = Array.from(brandMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  if (brands.length === 0) return null;

  return (
    <section id="marcas" className="mb-10 scroll-mt-24">
      <h2 className="mb-4 text-lg font-bold text-white uppercase">Navegue por marca</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => onSelect("all")}
          className={`flex h-24 w-28 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border text-sm font-semibold transition-colors ${
            selected === "all"
              ? "bg-gold-gradient border-transparent text-black"
              : "border-border bg-surface text-foreground hover:border-[var(--gold-2)]"
          }`}
        >
          Todas
        </button>
        {brands.map((brand) => {
          const icon = findBrandIcon(brand.name);
          const isSelected = selected === brand.name;
          return (
            <button
              key={brand.name}
              onClick={() => onSelect(brand.name)}
              className={`flex h-24 w-28 shrink-0 flex-col items-center justify-center gap-2 rounded-lg border p-2 transition-colors ${
                isSelected
                  ? "border-[var(--gold-2)] bg-surface-2"
                  : "border-border bg-surface hover:border-[var(--gold-2)]"
              }`}
            >
              {icon ? (
                <BrandIcon
                  path={icon.path}
                  className={`size-8 ${isSelected ? "text-gold-2" : "text-silver"}`}
                />
              ) : (
                <span className="text-silver text-lg font-bold">{brand.name.slice(0, 2)}</span>
              )}
              <span className="truncate text-[11px] font-bold text-zinc-300 uppercase">
                {brand.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

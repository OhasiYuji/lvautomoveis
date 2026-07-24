"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { VehicleListItem } from "@/lib/api";
import { VehicleCard } from "@/components/vehicle-card";
import { BrandNav } from "@/components/brand-nav";

const ALL = "all";

export function Storefront({ items }: { items: VehicleListItem[] }) {
  const [brand, setBrand] = useState(ALL);
  const [sort, setSort] = useState<"recent" | "price-asc" | "price-desc" | "km-asc">("recent");

  const brands = useMemo(() => {
    const set = new Set(items.map((v) => v.brand));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    let result = brand === ALL ? items : items.filter((v) => v.brand === brand);
    result = [...result];
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "km-asc") result.sort((a, b) => a.km - b.km);
    return result;
  }, [items, brand, sort]);

  function handleSelectBrand(value: string) {
    setBrand(value);
    document.getElementById("estoque")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-10">
      <BrandNav items={items} selected={brand} onSelect={handleSelectBrand} />

      <div className="flex flex-col gap-6">
        <div className="border-border bg-surface flex flex-wrap items-center gap-3 rounded-lg border p-4">
          <span className="text-foreground inline-flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="size-4" />
            Filtrar
          </span>

          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border-border text-foreground rounded-md border bg-black/40 px-3 py-2 text-sm outline-none focus:border-[var(--gold-2)]"
          >
            <option value={ALL}>Todas as marcas</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="border-border text-foreground ml-auto rounded-md border bg-black/40 px-3 py-2 text-sm outline-none focus:border-[var(--gold-2)]"
          >
            <option value="recent">Mais recentes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="km-asc">Menor km</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="border-border bg-surface text-muted rounded-lg border border-dashed p-8 text-center">
            Nenhum veículo encontrado com esse filtro.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

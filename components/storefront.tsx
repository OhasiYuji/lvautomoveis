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
    <>
      <BrandNav items={items} selected={brand} onSelect={handleSelectBrand} />

      <section id="estoque" className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 border border-border bg-surface p-4">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal className="size-4" />
              Filtrar
            </span>

            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-brand-orange"
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
              className="ml-auto border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-brand-orange"
            >
              <option value="recent">Mais recentes</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="km-asc">Menor km</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="border border-dashed border-border bg-surface p-8 text-center text-muted">
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
      </section>
    </>
  );
}

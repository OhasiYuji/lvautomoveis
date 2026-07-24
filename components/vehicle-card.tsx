import Link from "next/link";
import { Gauge, Calendar, Palette, Fuel, Cog } from "lucide-react";
import type { VehicleListItem } from "@/lib/api";
import { formatCurrency, formatKm, formatCondition } from "@/lib/format";

export function VehicleCard({ vehicle }: { vehicle: VehicleListItem }) {
  return (
    <Link
      href={`/veiculos/${vehicle.id}`}
      className="group border-border bg-surface hover:border-gold-2 flex flex-col overflow-hidden rounded-lg border transition-colors"
    >
      <div className="bg-surface-2 aspect-[4/3] w-full overflow-hidden">
        {vehicle.cover_photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicle.cover_photo_url}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-muted flex h-full w-full items-center justify-center text-sm">
            Sem foto
          </div>
        )}
      </div>
      <div className="border-border flex flex-1 flex-col gap-2 border-t p-4">
        <h3 className="text-sm font-bold tracking-tight text-white uppercase">
          {vehicle.brand} <span className="text-gold-gradient">{vehicle.model}</span>
        </h3>

        <div className="text-muted flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" />
            {vehicle.model_year ?? vehicle.manufacture_year ?? "—"}
          </span>
          <span className="inline-flex items-center gap-1">
            <Gauge className="size-3.5" />
            {formatKm(vehicle.km)}
          </span>
          {vehicle.color && (
            <span className="inline-flex items-center gap-1">
              <Palette className="size-3.5" />
              {vehicle.color}
            </span>
          )}
          {vehicle.fuel_type && (
            <span className="inline-flex items-center gap-1">
              <Fuel className="size-3.5" />
              {vehicle.fuel_type}
            </span>
          )}
          {vehicle.transmission_type && (
            <span className="inline-flex items-center gap-1">
              <Cog className="size-3.5" />
              {vehicle.transmission_type}
            </span>
          )}
          <span>{formatCondition(vehicle.condition)}</span>
        </div>

        <p className="text-gold-gradient mt-1 text-2xl font-extrabold">
          {formatCurrency(vehicle.price)}
        </p>

        <span className="bg-gold-gradient mt-2 inline-flex w-full items-center justify-center rounded-md py-2 text-sm font-bold tracking-wide text-black uppercase transition-opacity group-hover:opacity-90">
          Ver mais
        </span>
      </div>
    </Link>
  );
}

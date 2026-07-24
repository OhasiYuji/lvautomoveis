import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Gauge, Palette, Fuel, Cog, BadgeCheck, MessageCircle } from "lucide-react";
import { getVehicle } from "@/lib/api";
import { formatCurrency, formatKm, formatCondition, whatsappLink } from "@/lib/format";
import { VehicleGallery } from "@/components/vehicle-gallery";

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="border-border bg-surface flex items-center gap-2 rounded-md border px-3 py-2">
      <Icon className="text-gold-2 size-4 shrink-0" />
      <div>
        <p className="text-muted text-[11px] uppercase">{label}</p>
        <p className="text-foreground text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicle(id);
  if (!vehicle) notFound();

  const label = `${vehicle.brand} ${vehicle.model}`;
  const orderedPhotos = [...vehicle.photos].sort((a, b) => Number(b.is_cover) - Number(a.is_cover));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <Link
        href="/"
        className="text-muted inline-flex w-fit items-center gap-1 text-sm transition-colors hover:text-[var(--gold-2)]"
      >
        <ArrowLeft className="size-4" />
        Voltar ao estoque
      </Link>

      <VehicleGallery photos={orderedPhotos} label={label} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <div>
            <p className="text-gold-gradient text-sm font-semibold tracking-wide uppercase">
              {vehicle.brand}
            </p>
            <h1 className="text-foreground text-2xl font-bold">{vehicle.model}</h1>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <SpecItem
              icon={Calendar}
              label="Ano"
              value={`${vehicle.manufacture_year ?? "-"}/${vehicle.model_year ?? "-"}`}
            />
            <SpecItem icon={Gauge} label="Km" value={formatKm(vehicle.km)} />
            <SpecItem icon={Palette} label="Cor" value={vehicle.color ?? "-"} />
            <SpecItem icon={Fuel} label="Combustível" value={vehicle.fuel_type ?? "-"} />
            <SpecItem icon={Cog} label="Câmbio" value={vehicle.transmission_type ?? "-"} />
            <SpecItem icon={BadgeCheck} label="Condição" value={formatCondition(vehicle.condition)} />
          </div>

          {vehicle.features.length > 0 && (
            <div>
              <h2 className="text-foreground mb-2 font-bold">Opcionais</h2>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature) => (
                  <span
                    key={feature}
                    className="border-border bg-surface text-foreground rounded-md border px-3 py-1 text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="border-border bg-surface sticky top-20 flex flex-col gap-4 rounded-lg border p-5">
            <div>
              <p className="text-muted text-xs uppercase">Valor</p>
              <p className="text-gold-gradient text-4xl font-extrabold">
                {formatCurrency(vehicle.price)}
              </p>
            </div>

            <a
              href={whatsappLink(label)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 text-lg font-bold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-5" fill="currentColor" />
              Falar no WhatsApp
            </a>

            <p className="text-muted text-center text-xs">
              Envie uma mensagem e negocie direto com um vendedor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

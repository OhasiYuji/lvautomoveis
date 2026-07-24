import { listVehicles } from "@/lib/api";
import { Storefront } from "@/components/storefront";
import { whatsappGeneralLink } from "@/lib/format";
import { ShieldCheck, Handshake, Wallet, Award } from "lucide-react";

const HERO_PHOTO_URL =
  "https://images.unsplash.com/photo-1580014317999-e9f1936787a5?fm=jpg&q=75&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0";

const STATS = [
  { value: "15+", label: "Anos de mercado" },
  { value: "3.200+", label: "Carros vendidos" },
  { value: "4.8/5", label: "Avaliação dos clientes" },
];

export default async function HomePage() {
  const { items } = await listVehicles();

  return (
    <div className="flex w-full flex-col">
      {/* HERO BANNER */}
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_PHOTO_URL}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.94) 15%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.35) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 45%)" }}
        />

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center gap-6 px-4 py-24 sm:min-h-[640px]">
          <span className="text-gold-gradient text-sm font-bold tracking-wide uppercase">
            Novos e seminovos com procedência
          </span>

          <h1 className="max-w-2xl text-5xl leading-[1.05] font-extrabold tracking-tight text-white lg:text-7xl">
            O carro certo, no <br className="hidden lg:block" />
            <span className="text-gold-gradient">preço certo.</span>
          </h1>

          <p className="max-w-lg text-lg text-zinc-300">
            15 anos vendendo carros revisados, com seu usado valendo como parte do pagamento.
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <a
              href="#estoque"
              className="bg-gold-gradient flex items-center justify-center rounded-md px-8 py-4 font-bold text-black transition-opacity hover:opacity-90"
            >
              Ver estoque completo
            </a>
            <a
              href={whatsappGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-md bg-white px-8 py-4 font-bold text-black transition-opacity hover:opacity-90"
            >
              Falar com vendedor
            </a>
          </div>
        </div>
      </section>

      {/* FAIXA DE ESTATÍSTICAS — cartão branco flutuando sobre o banner */}
      <div className="relative z-10 mx-auto -mt-14 w-full max-w-5xl px-4 sm:-mt-16">
        <div className="grid grid-cols-1 divide-y divide-zinc-200 rounded-2xl bg-white shadow-2xl shadow-black/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 px-6 py-6 text-center">
              <span className="text-gold-gradient text-3xl font-black sm:text-4xl">{stat.value}</span>
              <span className="text-sm font-medium text-zinc-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ESTOQUE + BUSCA POR MARCA (dentro do Storefront) */}
      <section id="estoque" className="bg-background pt-16 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Destaques da semana
            </h2>
          </div>

          <Storefront items={items} />
        </div>
      </section>

      {/* INSTITUCIONAL */}
      <section id="institucional" className="border-border border-t py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-gold-gradient text-sm font-bold tracking-wide uppercase">
              Institucional
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Quem é a LV Automóveis
            </h2>
            <p className="mt-4 text-zinc-400">
              Há 15 anos ajudando famílias mineiras a comprar, vender e trocar veículos com
              segurança. Todo carro é revisado antes de ir pro pátio, e seu usado sempre vale
              como parte do pagamento.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Procedência garantida",
                description: "Todo veículo passa por vistoria e revisão antes da venda.",
              },
              {
                icon: Wallet,
                title: "Seu usado como entrada",
                description: "Avaliamos seu carro na hora e abatemos do valor final.",
              },
              {
                icon: Handshake,
                title: "Financiamento facilitado",
                description: "Parcerias com os principais bancos, aprovação rápida.",
              },
              {
                icon: Award,
                title: "15 anos de mercado",
                description: "Mais de 3.200 carros vendidos com satisfação comprovada.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border-border bg-surface rounded-xl border p-6 text-center"
              >
                <span className="bg-gold-gradient mx-auto flex size-12 items-center justify-center rounded-full">
                  <item.icon className="size-6 text-black" />
                </span>
                <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

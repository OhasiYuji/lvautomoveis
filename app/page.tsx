import { listVehicles } from "@/lib/api";
import { Storefront } from "@/components/storefront";
import { whatsappGeneralLink } from "@/lib/format";
import { ShieldCheck, Handshake, Wallet, Award } from "lucide-react";

export default async function HomePage() {
  const { items } = await listVehicles();

  return (
    <div className="flex w-full flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: "linear-gradient(135deg, var(--gold-1), var(--gold-2))" }}
        />
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 py-12 md:py-20 lg:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            <span className="text-gold-gradient text-sm font-bold tracking-wide uppercase">
              Novos e seminovos com procedência
            </span>

            <h1 className="text-5xl leading-[1.05] font-extrabold tracking-tight text-white lg:text-7xl">
              O carro certo, no <br className="hidden lg:block" />
              <span className="text-gold-gradient">preço certo.</span>
            </h1>

            <p className="max-w-md text-lg text-zinc-400">
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
                className="border-border text-foreground flex items-center justify-center rounded-md border px-8 py-4 font-bold transition-colors hover:border-zinc-500"
              >
                Falar com vendedor
              </a>
            </div>
          </div>

          <div className="border-border bg-surface w-full max-w-md rounded-xl border p-8 shadow-2xl shadow-black/40 lg:ml-auto">
            <h3 className="mb-5 text-lg font-bold text-white">Busca rápida</h3>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Buscar por marca ou modelo"
                className="border-border placeholder:text-zinc-500 w-full rounded-md border bg-black/40 p-3.5 text-white outline-none focus:border-[var(--gold-2)]"
              />

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="2015+"
                  className="border-border placeholder:text-zinc-500 w-1/2 rounded-md border bg-black/40 p-3.5 text-white outline-none focus:border-[var(--gold-2)]"
                />
                <input
                  type="text"
                  placeholder="R$ 160.000"
                  className="border-border placeholder:text-zinc-500 w-1/2 rounded-md border bg-black/40 p-3.5 text-white outline-none focus:border-[var(--gold-2)]"
                />
              </div>

              <a
                href="#estoque"
                className="bg-gold-gradient mt-2 flex w-full items-center justify-center rounded-md py-4 font-bold text-black transition-opacity hover:opacity-90"
              >
                Buscar no estoque
              </a>
            </form>
          </div>
        </div>
      </section>

      {/* FAIXA DE ESTATÍSTICAS */}
      <section className="bg-surface border-border border-y py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-around gap-10 px-4 text-center sm:flex-row">
          <div>
            <h4 className="text-gold-gradient text-4xl font-black sm:text-5xl">15+</h4>
            <p className="mt-2 text-sm font-medium text-zinc-400">Anos de mercado</p>
          </div>
          <div>
            <h4 className="text-gold-gradient text-4xl font-black sm:text-5xl">3.200+</h4>
            <p className="mt-2 text-sm font-medium text-zinc-400">Carros vendidos</p>
          </div>
          <div>
            <h4 className="text-gold-gradient text-4xl font-black sm:text-5xl">4.8/5</h4>
            <p className="mt-2 text-sm font-medium text-zinc-400">Avaliação dos clientes</p>
          </div>
        </div>
      </section>

      {/* ESTOQUE + BUSCA POR MARCA (dentro do Storefront) */}
      <section id="estoque" className="bg-background py-20">
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
      <section id="institucional" className="bg-surface border-border border-t py-20">
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
              segurança — todo carro revisado antes de ir pro pátio, e seu usado sempre vale
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
                className="border-border bg-background rounded-xl border p-6 text-center"
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

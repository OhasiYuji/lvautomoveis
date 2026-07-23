import Image from "next/image";
import { listVehicles } from "@/lib/api";
import { Storefront } from "@/components/storefront";
import { whatsappGeneralLink } from "@/lib/format";

export default async function HomePage() {
  const { items, total } = await listVehicles();

  return (
    <div className="flex flex-col w-full bg-white text-zinc-900">
      
      {/* HERO SECTION - Estilo Light com Box de Busca */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Lado Esquerdo - Textos e CTAs */}
        <div className="flex-1 flex flex-col gap-6">
          <span className="text-[#D4A330] font-bold text-sm tracking-wide uppercase">
            Novos e seminovos com procedência
          </span>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-black leading-[1.05]">
            O carro certo, no <br className="hidden lg:block" /> preço certo.
          </h1>
          
          <p className="text-zinc-500 text-lg max-w-md">
            15 anos vendendo carros revisados, com seu usado valendo como parte do pagamento.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="#estoque"
              className="flex items-center justify-center bg-[#D4A330] text-black font-bold py-4 px-8 rounded-md transition-colors hover:bg-[#b88c27]"
            >
              Ver estoque completo
            </a>
            <a
              href={whatsappGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#F4F4F5] text-black font-bold py-4 px-8 rounded-md transition-colors hover:bg-zinc-200"
            >
              Falar com vendedor
            </a>
          </div>
        </div>

        {/* Lado Direito - Box de Busca Rápida */}
        <div className="w-full max-w-md bg-[#F9F9F8] p-8 rounded-xl border border-zinc-200 shadow-sm lg:ml-auto">
          <h3 className="font-bold text-black mb-5 text-lg">Busca rápida</h3>
          
          {/* Nota: Para a busca funcionar, você precisará transformar isso num Client Component depois */}
          <form className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Buscar por marca ou modelo" 
              className="w-full p-3.5 rounded-md bg-white border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#D4A330]" 
            />
            
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="2015+" 
                className="w-1/2 p-3.5 rounded-md bg-white border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#D4A330]" 
              />
              <input 
                type="text" 
                placeholder="R$ 160.000" 
                className="w-1/2 p-3.5 rounded-md bg-white border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#D4A330]" 
              />
            </div>
            
            <button 
              type="button"
              className="w-full bg-[#18181B] text-white font-bold py-4 rounded-md mt-2 transition-colors hover:bg-black"
            >
              Buscar no estoque
            </button>
          </form>
        </div>
      </section>

      {/* FAIXA DE ESTATÍSTICAS - Fundo Preto (Baseado na image_3fbdb7.png) */}
      <section className="bg-[#09090B] py-12 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-around items-center gap-10 text-center">
          <div>
            <h4 className="text-4xl sm:text-5xl font-black text-[#D4A330]">15+</h4>
            <p className="text-zinc-400 mt-2 text-sm font-medium">Anos de mercado</p>
          </div>
          <div>
            <h4 className="text-4xl sm:text-5xl font-black text-[#D4A330]">3.200+</h4>
            <p className="text-zinc-400 mt-2 text-sm font-medium">Carros vendidos</p>
          </div>
          <div>
            <h4 className="text-4xl sm:text-5xl font-black text-[#D4A330]">4.8/5</h4>
            <p className="text-zinc-400 mt-2 text-sm font-medium">Avaliação dos clientes</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE ESTOQUE - Fundo Branco */}
      <section id="estoque" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-extrabold text-black tracking-tight sm:text-4xl">
              Destaques da semana
            </h2>
            <a href="#" className="hidden sm:block text-[#D4A330] font-bold text-sm hover:underline">
              Ver todos &rarr;
            </a>
          </div>
          
          {/* Você provavelmente precisará ajustar as cores dentro do componente Storefront também */}
          <Storefront items={items} />
          
          <a href="#" className="block sm:hidden text-center text-[#D4A330] font-bold text-sm hover:underline mt-8">
            Ver todos os veículos &rarr;
          </a>
        </div>
      </section>
      
    </div>
  );
}
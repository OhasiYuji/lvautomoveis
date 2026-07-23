import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Logo } from "@/components/logo";
import { WhatsappFloatButton } from "@/components/whatsapp-float-button";
import { whatsappGeneralLink } from "@/lib/format";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "LV Automóveis | Estoque de veículos",
  description: "Confira o estoque de veículos disponíveis na LV Automóveis.",
};

const WHATSAPP_DISPLAY = "(31) 96438-8758";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased scroll-smooth`}>
      {/* O body agora é claro para abrigar o conteúdo da página, mas o header/footer continuam escuros */}
      <body className="flex min-h-full flex-col bg-white text-zinc-900">
        
        {/* Header no estilo do mockup: Fundo preto, logo e navegação à direita */}
        <header className="sticky top-0 z-40 border-b border-zinc-900 bg-black">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:py-5">
            <Link href="/" className="relative h-12 w-32 sm:h-16 sm:w-48 flex items-center">
              <Logo />
            </Link>
            
            <nav className="hidden items-center gap-8 sm:flex">
              <Link href="/" className="text-[#D4A330] font-bold text-sm hover:text-[#D4A330]/80 transition-colors">
                Início
              </Link>
              <Link href="#estoque" className="text-zinc-300 font-bold text-sm hover:text-white transition-colors">
                Estoque
              </Link>
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md bg-[#D4A330] px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#b88c27]"
              >
                WhatsApp
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* Footer robusto inspirado no layout de referência */}
        <footer className="bg-[#09090B] border-t border-zinc-900 pt-16 pb-8 text-sm text-zinc-400">
          <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-16">
            
            {/* Coluna 1 e 2: Marca e Sobre */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              <div className="relative h-12 w-32 sm:w-40 flex items-center">
                <Logo />
              </div>
              <p className="max-w-sm text-zinc-400 mt-2">
                Compra e venda de veículos novos e seminovos com procedência garantida.
              </p>
              <p className="text-zinc-500">
                Belo Horizonte - MG
              </p>
            </div>
            
            {/* Coluna 3: Contato */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white text-base">Contato</h4>
              <p className="text-zinc-300 font-medium">{WHATSAPP_DISPLAY}</p>
              <p className="text-zinc-500 text-sm">Seg a sex, 8h–19h · Sáb, 8h–14h</p>
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-md bg-[#D4A330] px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-[#b88c27] mt-2"
              >
                Falar agora
              </a>
            </div>
          </div>
          
          {/* Base do Footer */}
          <div className="mx-auto max-w-7xl px-4 border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 LV Automóveis. Todos os direitos reservados.</p>
            <p className="tracking-widest uppercase opacity-40">powered by SistemyX</p>
          </div>
        </footer>

        <WhatsappFloatButton />
      </body>
    </html>
  );
}
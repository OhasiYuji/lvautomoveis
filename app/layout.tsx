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
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased scroll-smooth`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <header className="border-border bg-black sticky top-0 z-40 border-b">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4">
            <Link href="/" className="flex h-12 w-32 items-center sm:h-14 sm:w-40">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-8 sm:flex">
              <Link
                href="#estoque"
                className="text-foreground/80 hover:text-foreground text-sm font-bold tracking-wide transition-colors"
              >
                Estoque
              </Link>
              <Link
                href="#marcas"
                className="text-foreground/80 hover:text-foreground text-sm font-bold tracking-wide transition-colors"
              >
                Marcas
              </Link>
              <Link
                href="#institucional"
                className="text-foreground/80 hover:text-foreground text-sm font-bold tracking-wide transition-colors"
              >
                Institucional
              </Link>
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-gradient rounded-md px-6 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90"
              >
                WhatsApp
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-border bg-brand-black border-t pt-16 pb-8 text-sm text-zinc-400">
          <div className="mx-auto mb-16 grid max-w-7xl gap-10 px-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <div className="h-12 w-36 sm:w-40">
                <Logo />
              </div>
              <p className="mt-2 max-w-sm text-zinc-400">
                Compra e venda de veículos novos e seminovos com procedência garantida.
              </p>
              <p className="text-zinc-500">
                Rua Benedito dos Santos, 315 - Barreiro, Belo Horizonte - MG, 30640-140
              </p>
              <p className="text-zinc-500">CNPJ 52.028.967/0001-85</p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-base font-bold text-white">Contato</h4>
              <p className="font-medium text-zinc-300">{WHATSAPP_DISPLAY}</p>
              <p className="text-sm text-zinc-500">Seg a sex, 8h–19h · Sáb, 8h–14h</p>
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-gradient mt-2 inline-flex w-fit items-center justify-center rounded-md px-6 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90"
              >
                Falar agora
              </a>
            </div>
          </div>

          <div className="border-border mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t px-4 pt-8 text-xs sm:flex-row">
            <p>© 2026 LV Automóveis. Todos os direitos reservados.</p>
            <p className="tracking-widest text-zinc-600 uppercase">powered by SistemyX</p>
          </div>
        </footer>

        <WhatsappFloatButton />
      </body>
    </html>
  );
}

import { MessageCircle } from "lucide-react";
import { whatsappGeneralLink } from "@/lib/format";

export function WhatsappFloatButton() {
  return (
    <a
      href={whatsappGeneralLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-sm bg-[#25D366] px-4 py-3 font-semibold text-white shadow-md transition-opacity hover:opacity-90"
    >
      <MessageCircle className="size-5" fill="currentColor" />
      <span className="hidden sm:inline">Fale conosco</span>
    </a>
  );
}

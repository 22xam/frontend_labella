import {
  CircleUserRound,
  House,
  Inbox,
  Package,
  ReceiptText,
} from "lucide-react";

const MENU = [
  { id: "inicio", label: "Inicio", icon: House },
  { id: "productos", label: "Productos", icon: Package },
  { id: "pedidos", label: "Pedidos", icon: ReceiptText },
  { id: "bandeja", label: "Bandeja", icon: Inbox },
  { id: "cuenta", label: "Cuenta", icon: CircleUserRound },
];

export default function FooterMenu({ activeTab, onChange }) {
  return (
    <footer className="mt-auto pt-4">
      <nav className="grid grid-cols-5 gap-1 rounded-3xl border border-white/10 bg-neutral-900/80 p-2 backdrop-blur">
        {MENU.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[11px] transition ${
                isActive
                  ? "bg-white text-neutral-950"
                  : "text-neutral-300 hover:bg-white/5"
              }`}
            >
              <Icon size={16} strokeWidth={2.3} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </footer>
  );
}

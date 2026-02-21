import { useEffect, useMemo, useState } from "react";
import MobileScreen from "../components/layout/MobileScreen";
import TopBar from "../components/layout/TopBar";
import FooterMenu from "../components/navigation/FooterMenu";
import PanelCard from "../components/ui/PanelCard";
import { useFooterMenu } from "../hooks/useFooterMenu";
import { getDashboardSnapshot } from "../services/dashboard";

function ListItem({ title, right, subtitle }) {
  return (
    <li className="rounded-2xl border border-white/10 bg-neutral-900/50 px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-neutral-100">{title}</p>
        {right ? <span className="text-xs text-neutral-400">{right}</span> : null}
      </div>
      {subtitle ? <p className="mt-1 text-xs text-neutral-400">{subtitle}</p> : null}
    </li>
  );
}

export default function MainDashboard({ user, onLogout }) {
  const { activeTab, setActiveTab } = useFooterMenu();
  const [data, setData] = useState({ productos: [], pedidos: [], mensajes: [] });

  useEffect(() => {
    getDashboardSnapshot().then(setData);
  }, []);

  const content = useMemo(() => {
    if (activeTab === "inicio") {
      return (
        <div className="space-y-3">
          <PanelCard title="Resumen del día" subtitle="Vista rápida de la operación.">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-neutral-900/60 px-2 py-3">
                <p className="text-lg font-semibold">{data.productos.length}</p>
                <p className="text-[11px] text-neutral-400">Productos</p>
              </div>
              <div className="rounded-2xl bg-neutral-900/60 px-2 py-3">
                <p className="text-lg font-semibold">{data.pedidos.length}</p>
                <p className="text-[11px] text-neutral-400">Pedidos</p>
              </div>
              <div className="rounded-2xl bg-neutral-900/60 px-2 py-3">
                <p className="text-lg font-semibold">{data.mensajes.length}</p>
                <p className="text-[11px] text-neutral-400">Mensajes</p>
              </div>
            </div>
          </PanelCard>
          <PanelCard title="Actividad" subtitle="Último pedido: PD-102 · Hace 10 min" />
        </div>
      );
    }

    if (activeTab === "productos") {
      return (
        <PanelCard title="Productos" subtitle="Control de stock en tiempo real.">
          <ul className="space-y-2">
            {data.productos.map((item) => (
              <ListItem key={item.id} title={item.nombre} right={`Stock ${item.stock}`} />
            ))}
          </ul>
        </PanelCard>
      );
    }

    if (activeTab === "pedidos") {
      return (
        <PanelCard title="Pedidos" subtitle="Pedidos activos en la app.">
          <ul className="space-y-2">
            {data.pedidos.map((item) => (
              <ListItem
                key={item.id}
                title={`${item.id} · ${item.cliente}`}
                subtitle={`Estado: ${item.estado}`}
              />
            ))}
          </ul>
        </PanelCard>
      );
    }

    if (activeTab === "bandeja") {
      return (
        <PanelCard title="Bandeja de entrada" subtitle="Mensajes internos.">
          <ul className="space-y-2">
            {data.mensajes.map((item) => (
              <ListItem key={item.id} title={item.de} subtitle={item.texto} />
            ))}
          </ul>
        </PanelCard>
      );
    }

    return (
      <PanelCard title="Cuenta" subtitle="Gestioná tu sesión.">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/50 px-3 py-3">
            <p className="text-sm">Usuario: {user?.username || "usuario"}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950 transition active:scale-[0.99]"
          >
            Cerrar sesión
          </button>
        </div>
      </PanelCard>
    );
  }, [activeTab, data, onLogout, user]);

  return (
    <MobileScreen>
      <TopBar username={user?.username} />
      <div className="space-y-3">{content}</div>
      <FooterMenu activeTab={activeTab} onChange={setActiveTab} />
    </MobileScreen>
  );
}

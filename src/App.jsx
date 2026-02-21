import { useEffect, useState } from "react";
import AppShell from "./components/AppShell";
import Login from "./pages/Login";
import ProductosPage from "./pages/Productos";
import { logout, me } from "./services/auth";

function App() {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState("productos");

  useEffect(() => {
    const checkSession = async () => {
      try {
        await me();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setIsAuthenticated(false);
    }
  };

  if (isChecking) {
    return (
      <div className="grid min-h-screen place-items-center bg-neutral-950 text-white">
        Cargando sesión...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AppShell active={activeView} onNavigate={setActiveView} onLogout={handleLogout}>
      {activeView === "productos" ? <ProductosPage /> : null}
    </AppShell>
  );
}

export default App;

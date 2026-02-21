import Login from "./pages/Login";
import MainDashboard from "./pages/MainDashboard";
import MobileScreen from "./components/layout/MobileScreen";
import { useSession } from "./hooks/useSession";

function App() {
  const { isAuthenticated, isBootstrapping, signIn, signOut, user } = useSession();

  if (isBootstrapping) {
    return (
      <MobileScreen>
        <div className="my-auto rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
          <p className="text-sm text-neutral-300">Cargando sesión...</p>
        </div>
      </MobileScreen>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={signIn} />;
  }

  return <MainDashboard user={user} onLogout={signOut} />;
}

export default App;

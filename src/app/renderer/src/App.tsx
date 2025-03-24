// src/app/renderer/App.tsx
import { AuthProvider } from "./context/AuthContext";
import { LoginScreen } from "./components/LoginScreen";
import { Home } from "./components/Home";
import { useAuth } from "./context/AuthContext";

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Carregando...</div>;

  return user ? <Home /> : <LoginScreen />;
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
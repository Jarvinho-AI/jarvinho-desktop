import { jsx as _jsx } from "react/jsx-runtime";
// src/app/renderer/App.tsx
import { AuthProvider } from "./context/AuthContext";
import { LoginScreen } from "./components/LoginScreen";
import { Home } from "./components/Home";
import { useAuth } from "./context/AuthContext";
function AppContent() {
    const { user, loading } = useAuth();
    if (loading)
        return _jsx("div", { className: "text-center mt-10", children: "Carregando..." });
    return user ? _jsx(Home, {}) : _jsx(LoginScreen, {});
}
export function App() {
    return (_jsx(AuthProvider, { children: _jsx(AppContent, {}) }));
}

// src/app/renderer/components/LoginScreen.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginWithEmail } from "../hooks/useLogin";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    const token = await loginWithEmail(email, password);
    setLoading(false);

    if (token) {
      console.log("Usuário autenticado com token:", token);
      // Aqui você pode navegar para a tela principal ou armazenar o token
    } else {
      setError("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background">
      <div className="bg-white dark:bg-card shadow-md rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Entrar no Jarvinho</h2>
        
        <Input
          type="email"
          placeholder="Email"
          className="mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        
        <Button onClick={handleLogin} disabled={loading} className="w-full">
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </div>
  );
}

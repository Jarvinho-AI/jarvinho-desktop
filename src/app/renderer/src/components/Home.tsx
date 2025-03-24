import { useAuth } from "../context/AuthContext";

export function Home() {
  const { user, token } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Bem-vindo, {user}</h1>
      <p className="text-sm break-all">
        <strong>Seu token JWT:</strong><br />
        {token}
      </p>
    </div>
  );
}
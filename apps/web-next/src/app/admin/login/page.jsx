"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLoginPage() {
  const { session, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) router.replace("/admin");
  }, [session, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/admin");
    } catch {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form onSubmit={handleSubmit} className="spec-plate p-8 w-full max-w-sm space-y-5">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
            Panel admin
          </div>
          <h1 className="font-display font-extrabold text-3xl">Iniciar sesión</h1>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-muted">
            Correo
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface-2 border border-border px-3 py-2 focus-ring"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="font-mono text-xs uppercase tracking-wider text-muted">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-2 border border-border px-3 py-2 focus-ring"
          />
        </div>

        {error && <p className="text-sm text-danger font-mono">{error}</p>}

        <button type="submit" disabled={loading} className="btn-cta w-full disabled:opacity-50">
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}

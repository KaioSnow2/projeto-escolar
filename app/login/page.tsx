"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    console.log("clicou no entrar");
    e.preventDefault();
    setErro(null);
    setLoading(true);

    // ✅ pega do form (funciona com autofill)
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const senha = String(fd.get("senha") || "");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setLoading(false);

    if (error) {
      setErro(error.message);
      return;
    }

    router.push("/avisos");
  }

  return (
    <div className="authShell">
      <div className="card">
        <div className="authHeader">
          <h1 className="title">Entrar</h1>
          <span className="badge">Acesso</span>
        </div>

        <p className="subtitle">Acesse para acompanhar e interagir com o projeto.</p>

        <form onSubmit={handleLogin}>
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              name="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label className="label">Senha</label>
            <input
              className="input"
              name="senha"
              type={show ? "text" : "password"}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="row">
            <label className="check">
              <input
                type="checkbox"
                checked={show}
                onChange={(e) => setShow(e.target.checked)}
              />
              Mostrar senha
            </label>

            <a className="mutedLink" href="/avisos">
              Ver avisos
            </a>
          </div>

          {erro && (
            <div className="error">
              <b>Erro:</b> {erro}
            </div>
          )}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="footerHint">
          <span>Não tem conta?</span>
          <a href="/cadastro">Criar agora</a>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setLoading(false);

    if (error) {
      setErro(error.message);
      return;
    }

    // logou: manda pro lugar padrão (pode trocar)
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>

          <div className="field">
            <label className="label">Senha</label>
            <input
              className="input"
              type={show ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
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

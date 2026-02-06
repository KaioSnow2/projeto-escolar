"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setErrorMsg("Email ou senha inválidos.");
      return;
    }

    // alunos podem ir pra /avisos, admins vão pro /admin (a gente ajusta já já)
    router.push("/avisos");
  }

  return (
    <div className="authShell">
      <div className="card authCard">
        <div className="authHeader">
          <div>
            <h1 className="title">Entrar</h1>
            <p className="subtitle">Acesse para acompanhar e interagir com o projeto.</p>
          </div>
          <span className="badge">🔐 Conta</span>
        </div>

        <form onSubmit={handleLogin}>
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="seunome@escola.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label className="label">Senha</label>
            <input
              className="input"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="row">
            <label className="check">
              <input
                type="checkbox"
                checked={showPass}
                onChange={(e) => setShowPass(e.target.checked)}
              />
              Mostrar senha
            </label>

            <a className="mutedLink" href="/avisos">Ver avisos</a>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {errorMsg && <div className="error">⚠️ {errorMsg}</div>}

          <div className="footerHint">
            <span>Não tem conta?</span>
            <a href="/cadastro">Criar agora</a>
          </div>
        </form>
      </div>
    </div>
  );
}
<p className="subtitle">
  Entre para ver avisos, participar e acompanhar o andamento do projeto.
</p>


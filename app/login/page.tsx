export default function LoginPage() {
  return (
    <div className="authShell">
      <div className="card">

        <div className="authHeader">
          <h1 className="title">Entrar</h1>
          <span className="badge">Acesso</span>
        </div>

        <p className="subtitle">
          Acesse para acompanhar e interagir com o projeto.
        </p>

        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <div className="field">
          <label className="label">Senha</label>
          <input
            className="input"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <div className="row">
          <label className="check">
            <input type="checkbox" />
            Mostrar senha
          </label>

          <a href="/avisos" className="mutedLink">
            Ver avisos
          </a>
        </div>

        <button className="btn">Entrar</button>

        <div className="footerHint">
          <span>Não tem conta?</span>
          <a href="/cadastro">Criar agora</a>
        </div>

      </div>
    </div>
  );
}

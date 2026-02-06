import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function AdminPage() {
  const supabase = createSupabaseServerClient();

  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;

  if (!user) redirect("/login");

  // checa se é admin
  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) redirect("/avisos");

  // busca avisos
  const { data: avisos } = await supabase
    .from("avisos")
    .select("id, titulo, conteudo, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="adminShell">
      <div className="adminTop">
        <div>
          <h1 className="adminTitle">Painel</h1>
          <p className="adminSub">Gerencie avisos e atualizações do projeto.</p>
        </div>
        <a className="adminLink" href="/avisos">Ver como aluno</a>
      </div>

      <div className="adminGrid">
        <div className="adminCard">
          <h2 className="adminH2">Criar aviso</h2>
          <p className="adminP">Publica algo novo para todo mundo.</p>
          <form action="/admin/criar" method="post" className="adminForm">
            <label className="label">Título</label>
            <input className="input" name="titulo" required placeholder="Ex: Reunião sexta" />

            <label className="label">Conteúdo</label>
            <textarea className="input adminText" name="conteudo" required placeholder="Escreva o aviso..." />

            <button className="btn" type="submit">Publicar</button>
          </form>
        </div>

        <div className="adminCard">
          <h2 className="adminH2">Avisos publicados</h2>
          <p className="adminP">{avisos?.length ?? 0} no total</p>

          <div className="adminList">
            {(avisos ?? []).map((a) => (
              <div key={a.id} className="adminItem">
                <div className="adminItemMain">
                  <div className="adminItemTitle">{a.titulo}</div>
                  <div className="adminItemMeta">
                    {new Date(a.created_at).toLocaleString("pt-BR")}
                  </div>
                  <div className="adminItemBody">{a.conteudo}</div>
                </div>

                <form action="/admin/apagar" method="post">
                  <input type="hidden" name="id" value={a.id} />
                  <button className="adminDanger" type="submit">Apagar</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

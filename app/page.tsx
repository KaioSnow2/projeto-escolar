import { supabase } from "@/lib/supabaseClient";

export default async function Avisos() {
  const { data: avisos, error } = await supabase
    .from("avisos")
    .select("*")
    .order("criado_em", { ascending: false });

  return (
    <main style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Avisos do Projeto</h1>

      {error && (
        <p style={{ color: "crimson" }}>
          Erro ao carregar avisos: {error.message}
        </p>
      )}

      {!avisos?.length && !error && <p>Nenhum aviso ainda.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {(avisos ?? []).map((aviso: any) => (
          <li
            key={aviso.id}
            style={{
              border: "1px solid #333",
              borderRadius: 10,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <strong style={{ fontSize: 18 }}>{aviso.titulo}</strong>
            <p style={{ margin: "8px 0" }}>{aviso.conteudo}</p>
            <small>{new Date(aviso.criado_em).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}

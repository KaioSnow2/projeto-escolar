import { createServerClient } from "@/lib/supabaseServer";

export default async function Avisos() {
  const supabase = createServerClient();

  const { data: avisos, error } = await supabase
    .from("avisos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Erro ao carregar avisos.</div>;
  }

  return (
    <main>
      <h1>Avisos</h1>
      <pre>{JSON.stringify(avisos, null, 2)}</pre>
    </main>
  );
}

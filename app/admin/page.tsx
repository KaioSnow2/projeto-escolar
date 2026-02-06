"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <p style={{ padding: 20 }}>Carregando...</p>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Painel Admin 🔒</h1>
      <p>Somente usuários logados podem ver isso.</p>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Email ou senha inválidos");
      return;
    }

    // ✅ LOGIN OK → REDIRECIONA
    router.push("/avisos");
  }

  return (
    <form onSubmit={handleLogin}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Entrar</button>
    </form>
  );
}

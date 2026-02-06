import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const form = await req.formData();
  const titulo = String(form.get("titulo") || "").trim();
  const conteudo = String(form.get("conteudo") || "").trim();

  const supabase = createSupabaseServerClient();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.redirect(new URL("/login", req.url));

  // inserir (RLS vai barrar se não for admin)
  const { error } = await supabase.from("avisos").insert({ titulo, conteudo });

  if (error) return NextResponse.redirect(new URL("/admin?err=1", req.url));
  return NextResponse.redirect(new URL("/admin", req.url));
}

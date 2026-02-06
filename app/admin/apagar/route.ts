import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const form = await req.formData();

  const titulo = String(form.get("titulo") || "");
  const conteudo = String(form.get("conteudo") || "");

  const supabase = createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login", req.url));

  const { error } = await supabase.from("avisos").insert([{ titulo, conteudo }]);

  if (error) return NextResponse.redirect(new URL("/admin?err=1", req.url));
  return NextResponse.redirect(new URL("/admin", req.url));
}

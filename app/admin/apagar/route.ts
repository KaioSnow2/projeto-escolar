import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const form = await req.formData();
  const id = String(form.get("id") || "");

  const supabase = createSupabaseServerClient();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.redirect(new URL("/login", req.url));

  const { error } = await supabase.from("avisos").delete().eq("id", id);

  if (error) return NextResponse.redirect(new URL("/admin?err=1", req.url));
  return NextResponse.redirect(new URL("/admin", req.url));
}

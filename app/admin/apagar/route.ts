import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabaseServer";


export async function POST(req: Request) {
  const form = await req.formData();
  const id = String(form.get("id") || "");

  const supabase = createServerClient();


  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login", req.url));

  const { error } = await supabase.from("avisos").delete().eq("id", id);

  if (error) return NextResponse.redirect(new URL("/admin?err=1", req.url));
  return NextResponse.redirect(new URL("/admin", req.url));
}

"use server";

import { setAdminSession } from "@/lib/auth-basic";
import { validateAdminCredentials } from "@/lib/auth-basic";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = (formData.get("username") as string)?.trim() || "";
  const password = (formData.get("password") as string) || "";

  if (!username || !password) {
    redirect("/admin/login?error=missing");
  }

  if (!validateAdminCredentials(username, password)) {
    redirect("/admin/login?error=invalid");
  }

  await setAdminSession();
  redirect("/admin");
}

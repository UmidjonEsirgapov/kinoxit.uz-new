import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "kinoxit_admin";
const SALT = "kinoxit_admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("Set ADMIN_SECRET or NEXTAUTH_SECRET in .env");
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const expected = sign(SALT);
    const bufToken = Buffer.from(token, "utf8");
    const bufExpected = Buffer.from(expected, "utf8");
    return bufToken.length === bufExpected.length && timingSafeEqual(bufToken, bufExpected);
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sign(SALT), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const envUser = process.env.ADMIN_USERNAME || "admin";
  const envPass = process.env.ADMIN_PASSWORD || "admin123";
  return username === envUser && password === envPass;
}

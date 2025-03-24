// src/shared/auth.ts
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/client";

/**
 * Retorna o token JWT atual do usuário logado
 */
export async function getUserToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
}

/**
 * Retorna o UID do usuário atual
 */
export function getUserId(): string | null {
  return auth.currentUser?.uid ?? null;
}

/**
 * Retorna se há um usuário autenticado
 */
export function isAuthenticated(): boolean {
  return !!auth.currentUser;
}
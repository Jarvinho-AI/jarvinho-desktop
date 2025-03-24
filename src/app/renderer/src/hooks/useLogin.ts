import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


export async function loginWithEmail(email: string, password: string): Promise<string | null> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return token;
  } catch (err: any) {
    console.error("Erro ao fazer login:", err);
    return null;
  }
}
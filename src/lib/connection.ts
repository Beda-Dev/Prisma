"use server";
import { hashPassword, comparePassword } from "./CryptagePassword";
import prisma from "./prisma";


export async function Connection(formData: FormData) {
  const email: string = formData.get("email") as string;
  const password: string = formData.get("password") as string;
  const hashedPassword: string = (await hashPassword(password, 10)) as string;

  if (formData) {
    const utilisateurexistant = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (utilisateurexistant) {
      const comparaisonPassword = comparePassword(password, hashedPassword);
      if ((await comparaisonPassword) == true) {
        console.log("utilisateur existant");
        return { email, password };
      }
    } else {
      console.log("utilisateur inexistant");
    }
  }
  return null;
}

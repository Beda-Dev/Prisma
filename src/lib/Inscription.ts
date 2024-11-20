"use server";
import { hashPassword } from "./CryptagePassword";
import prisma from "./prisma";

export async function AuthPass(formPass: FormData) {
  const email: string = formPass.get("email") as string;
  const password: string = formPass.get("password") as string;
  const hashedPassword: string = (await hashPassword(password, 10)) as string;
  if (formPass) {
    const utilisateurexistant = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (utilisateurexistant) {
      await prisma.user.update({
        where: { email: email },
        data: {
          password: hashedPassword as string,
        },
      });
      return true
    }
  }
}

export async function Inscription(formData: FormData) {
  const firstname: string = formData.get("nom") as string;
  const lastname: string = formData.get("prenom") as string;
  const email: string = formData.get("email1") as string;
  const password: string = formData.get("password1") as string;
  const hashedPassword: string = (await hashPassword(password, 10)) as string;

  if (formData) {
    const utilisateurexistant = await prisma.user.findUnique({
      where: { email: email as string },
    });
    console.log("email deja utiliser");

    if (!utilisateurexistant) {
      await prisma.user.create({
        data: {
          name: `${firstname} ${lastname}` as string,
          email: email as string,
          image: "",
          password: hashedPassword as string,
        },
      });
      console.log("utilisateur enregistrer dans la base de donnée");
      return { email, password };
    }
  }

  return null;
}

"use server"

import prisma from "./prisma";



async function isPasswordNull(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (user && user.password === null) {
    return true;
  }
  return false;
}

export default isPasswordNull;

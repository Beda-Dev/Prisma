
'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function ClientOnlyProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

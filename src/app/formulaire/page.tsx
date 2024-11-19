"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Facebook, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    setIsLoading(false);
  }

  useEffect(() => {
    if (session) {
      router.push("/Homepage");
    }
  }, [session, router]);

  return (
    <Card className="w-[380px]">
      <CardHeader className="text-center">
        <CardTitle>Authentication</CardTitle>
        <CardDescription>Inscription ou connexion</CardDescription>
        {session && <p>{status}</p>}
      </CardHeader>
      <CardContent>
        {isLogin ? (
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
              <Button disabled={isLoading} className="bg-orange-500">
                {isLoading && <Mail className="mr-2 h-4 w-4 animate-spin" />}
                Se connecter
              </Button>
              <div className="flex justify-center space-x-4 mb-4">
                <p
                  className="cursor-pointer text-sm hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  vous n'avez pas de compte ? s'inscrire
                </p>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button disabled={isLoading} className="bg-orange-500">
                {isLoading && <Mail className="mr-2 h-4 w-4 animate-spin" />}
                S'inscrire
              </Button>
              <div className="flex justify-center space-x-4 mb-4">
                <p
                  className="cursor-pointer text-sm hover:underline"
                  onClick={() => {
                    setIsLogin(true);
                    setEmail("");
                    setPassword("");
                  }}
                >
                  déjà inscrit ? se connecter
                </p>
              </div>
            </div>
          </form>
        )}
        <div className="text-center text-sm">
          {isLogin ? <p>-- ou se connecter avec --</p> : <p>-- ou s'inscrire avec --</p>}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            onClick={() => signIn("github")}
          >
            <Github className="h-4 w-4" />
            Github
          </Button>
          <Button
            variant="outline"
            onClick={() => signIn("google")}
          >
           <svg
              className=" h-4 w-4"
              viewBox="0 0 24 24"
              fill="#4285F4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => signIn("facebook")}
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
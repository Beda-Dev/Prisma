'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LockIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import {AuthPass} from '@/lib/Inscription'

export default function Component() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { data: session, status } = useSession()
  const [mail , setMail] = useState<string>(session?.user?.email as string)
  
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const result = await AuthPass(formData)
    if(result){
      router.push("/Homepage")
    }else {
      setErrorMessage("Échec de l'authentification. Veuillez réessayer.")
    }

  }

  if(!session){
    router.push("/")
    
  }

  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-6">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <h1 className="text-2xl font-semibold text-foreground">Chargement</h1>
          <div className="flex space-x-2 justify-center">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse delay-150"></div>
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse delay-300"></div>
          </div>
          <p className="text-muted-foreground max-w-sm mx-auto">
            veillez patientez quelque instant

          </p>
        </div>
      </div>
    );


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isSubmitted ? 0.8 : 1, opacity: isSubmitted ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            >
              <LockIcon className="mx-auto h-12 w-12 text-blue-500" />
            </motion.div>
            <h2 className="mt-4 text-2xl font-bold text-gray-700">Bienvenue {session?.user?.name} , veillez entrez votre mot de passe </h2>
          </div>
          <div className="mb-4">
          <Label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 hidden" hidden>
              email
            </Label>

          <Input
              type="text"
              id="email"
              name='email'
              value={mail}
              onChange={()=>setMail(mail)}
              className="hidden"
              hidden

            />
            <Label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Mot de passe
            </Label>
            <Input
              type="password"
              id="password"
              name='password'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-sm"
              placeholder="••••••••"
              required
            />

          </div>
          <div className="flex items-center justify-between">
          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
          )}
            <Button type="submit" className="w-full">
              Envoyer
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
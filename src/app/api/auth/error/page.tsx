"use client"

import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password. Please try again.'
      case 'EmailSignin':
        return 'Failed to send verification email. Please try again.'
      case 'OAuthSignin':
        return 'Could not sign in with the selected provider. Please try again.'
      case 'EmailCreateAccount':
        return 'Failed to create an account. This email might be already in use.'
      case 'Callback':
        return 'There was an error during the authentication process. Please try again.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertCircle className="w-6 h-6 mr-2" />
            erreur lors de l&apos;autentification
          </CardTitle>
          <CardDescription>
            un probleme es survenue lors de votre requete
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {getErrorMessage(error)}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">retour a la page de connection</Link>
          </Button>
  
        </CardFooter>
      </Card>
    </div>
  )
}
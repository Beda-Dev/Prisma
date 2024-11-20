"use client"

import { signIn } from "next-auth/react";


export default function ConnexionAuto(data: { email: string, password: string }) {
    
        const autoConnect = async () => {
            const result = await signIn('credentials', {
                redirect: true, 
                email: data.email,
                password: data.password,
            });


            
            if (result?.error) {
                console.log("Erreur lors de l'authentification :", result.error);
            } else {
                console.log("Utilisateur connecté avec succès.");

            }
        };

        autoConnect();

    return null; 
}

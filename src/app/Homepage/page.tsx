"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);

  useEffect(() => {
    setMounted(true);
  }, []);


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
    <div className="min-h-screen bg-transparent ">
      <nav className="p-4">
        <ul className="flex justify-end space-x-4">
          <li>
            <a
              href="#"
              className="text-white hover:text-gray-200 transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:text-gray-200 transition-colors"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:text-gray-200 transition-colors"
            >
              Contact
            </a>
          </li>
          <li>
            <button
              className=" p-0 bg-transparent text-red-500 hover:text-gray-200 transition-colors"
              onClick={() => {const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
                modal?.showModal()}}
            >
              Deconnexion
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-sm">Hello!</h3>
                <p className="py-4">voulez-vous vous deconnecter ?</p>
                <div className="modal-action">
                  <button
                    className="btn bg-green-500"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    OUI
                  </button>
                  <form method="dialog">
                    <button className="btn bg-red-500">NON</button>
                  </form>
                </div>
              </div>
            </dialog>
          </li>
        </ul>
      </nav>

      <main className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 max-w-2xl"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Bienvenue sur notre site
          </motion.h1>
          <motion.p
            className="text-xl text-white mb-8"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
          >
            Decouvrez d&apos;incroyable experiences et des soulution inovantes .
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.5 }}
          ></motion.div>
        </motion.div>
      </main>
    </div>
  );
}

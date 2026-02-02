"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { migrateLocalDataToAccount, hasCompletedOnboarding } from "@/lib/auth";
import Logo from "@/components/ui/Logo";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Signing you in...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (session?.user) {
          setMessage("Setting up your account...");

          // Migrate any local data to the authenticated account
          await migrateLocalDataToAccount(session.user.id);

          setMessage("Almost there...");

          // Check if user has completed onboarding
          const hasOnboarded = await hasCompletedOnboarding(session.user.id);

          // Also check localStorage for onboarding status
          const localOnboarded = localStorage.getItem("fijihindi_onboarded") === "true";

          setStatus("success");
          setMessage("Welcome to FijiHindi!");

          // Redirect based on onboarding status
          setTimeout(() => {
            if (hasOnboarded || localOnboarded) {
              router.push("/dashboard");
            } else {
              router.push("/onboarding");
            }
          }, 1500);
        } else {
          // No session, redirect to login
          setStatus("error");
          setMessage("Something went wrong. Please try again.");
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        setStatus("error");
        setMessage("Authentication failed. Please try again.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Logo size="lg" className="mx-auto mb-8" />

        {/* Status indicator */}
        <div className="mb-6">
          {status === "loading" && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full"
            />
          )}
          {status === "success" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 mx-auto bg-green-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-2xl">✓</span>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 mx-auto bg-red-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-2xl">✕</span>
            </motion.div>
          )}
        </div>

        <p className="text-lg text-charcoal dark:text-white font-medium">
          {message}
        </p>
      </motion.div>
    </div>
  );
}

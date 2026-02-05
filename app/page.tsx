"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupCount, setSignupCount] = useState<number | null>(null);

  // Check if user has already signed up (stored in localStorage)
  useEffect(() => {
    const hasSignedUp = localStorage.getItem("fijihindi_email_signup");
    if (hasSignedUp) {
      // User already signed up, they can skip the email gate
      setEmail(hasSignedUp);
    }

    // Fetch signup count for social proof
    fetchSignupCount();
  }, []);

  const fetchSignupCount = async () => {
    try {
      const response = await fetch("/api/signup/count");
      if (response.ok) {
        const data = await response.json();
        setSignupCount(data.count);
      }
    } catch {
      // Silently fail - social proof is optional
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source: "landing",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If email already exists, that's okay - let them proceed
        if (data.code === "EMAIL_EXISTS") {
          localStorage.setItem("fijihindi_email_signup", email.trim().toLowerCase());
          router.push("/onboarding");
          return;
        }
        throw new Error(data.error || "Failed to sign up");
      }

      // Store in localStorage so they don't have to sign up again
      localStorage.setItem("fijihindi_email_signup", email.trim().toLowerCase());
      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Allow users to skip but track it
    localStorage.setItem("fijihindi_email_signup", "skipped");
    router.push("/onboarding");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 globe-container">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-md mx-auto"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/30"
        >
          <span className="text-4xl">🌴</span>
        </motion.div>

        {/* App name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-heading font-bold mb-4"
        >
          <span className="gradient-text">FijiHindi</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-charcoal/80 dark:text-white/80 font-medium mb-2"
        >
          Hamaar Bhasha, Hamaar Kahani
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-gray-500 dark:text-gray-400 mb-6"
        >
          Our Language, Our Stories
        </motion.p>

        {/* Value proposition bullets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-left mb-8 bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm"
        >
          <ul className="space-y-2 text-sm text-charcoal/80 dark:text-white/80">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Learn family words in Fiji Hindi
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Build your family tree
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Connect with the global diaspora
            </li>
          </ul>
        </motion.div>

        {/* Email capture form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            error={error}
            className="text-center"
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            {isLoading ? "Joining..." : "Get Early Access"}
          </Button>
        </motion.form>

        {/* Skip option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4"
        >
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors underline underline-offset-2"
          >
            or skip and try now →
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 text-sm text-gray-500 dark:text-gray-400"
        >
          {signupCount !== null && signupCount > 0 ? (
            <span className="flex items-center justify-center gap-2">
              <span>🌴</span>
              Join {signupCount} {signupCount === 1 ? "family" : "families"} already exploring
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>🌴</span>
              Be among the first to explore
            </span>
          )}
        </motion.div>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex justify-center gap-8 text-sm text-gray-500 dark:text-gray-400"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">195K+</div>
            <div>Fiji Indians</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">50+</div>
            <div>Countries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">140+</div>
            <div>Years of History</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary/5 to-transparent pointer-events-none" />
    </main>
  );
}

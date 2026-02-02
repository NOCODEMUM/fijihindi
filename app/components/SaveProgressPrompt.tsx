"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { signInWithMagicLink, signInWithGoogle, signInWithApple } from "@/lib/auth";

interface SaveProgressPromptProps {
  isOpen: boolean;
  onClose: () => void;
  familyMemberCount: number;
}

export default function SaveProgressPrompt({
  isOpen,
  onClose,
  familyMemberCount,
}: SaveProgressPromptProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      await signInWithMagicLink(email, `${window.location.origin}/auth/callback`);
      setEmailSent(true);
    } catch (err) {
      setError("Failed to send email. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(`${window.location.origin}/auth/callback`);
    } catch (err) {
      setError("Failed to sign in with Google.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      await signInWithApple(`${window.location.origin}/auth/callback`);
    } catch (err) {
      setError("Failed to sign in with Apple.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleRemindLater = () => {
    // Set a flag to remind later (e.g., after 3 more family members)
    localStorage.setItem("fijihindi_remind_save_at", String(familyMemberCount + 3));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl overflow-hidden"
        >
          {/* Handle for mobile */}
          <div className="flex justify-center pt-3 pb-2 sm:hidden">
            <div className="w-12 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          </div>

          <div className="p-6">
            {emailSent ? (
              /* Email sent confirmation */
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl">📧</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white mb-2">
                  Check Your Email!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We sent a link to <strong>{email}</strong>. Click it to save
                  your family tree.
                </p>
                <Button variant="ghost" onClick={() => setEmailSent(false)}>
                  Use different email
                </Button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-3xl">💾</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white">
                    Save Your Progress?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    You&apos;ve added <strong>{familyMemberCount} family members</strong>!
                    Save your tree to access it from any device.
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Social buttons */}
                <div className="space-y-3 mb-4">
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-colors bg-white dark:bg-gray-800 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="font-medium text-charcoal dark:text-white">
                      Save with Google
                    </span>
                  </button>

                  <button
                    onClick={handleAppleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-colors bg-white dark:bg-gray-800 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span className="font-medium text-charcoal dark:text-white">
                      Save with Apple
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                  <span className="text-xs text-gray-500">or use email</span>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                </div>

                {/* Email form */}
                <form onSubmit={handleMagicLink} className="space-y-3 mb-4">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" className="w-full" disabled={loading || !email}>
                    {loading ? "Sending..." : "Save with Email"}
                  </Button>
                </form>

                {/* Skip options */}
                <div className="flex gap-3">
                  <button
                    onClick={handleRemindLater}
                    className="flex-1 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Remind me later
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Not now
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

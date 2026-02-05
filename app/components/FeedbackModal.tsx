"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Please enter your feedback");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.trim(),
          email: email.trim() || undefined,
          pageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit feedback");
      }

      setSuccess(true);
      setContent("");
      setEmail("");

      // Auto-close after success
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-white">
                  Share Your Feedback
                </h2>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p className="text-white/80 text-sm mt-1">
                Help us make FijiHindi better!
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {success ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal dark:text-white">
                    Thank you!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Your feedback helps us improve.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="feedback-content"
                      className="block text-sm font-medium text-charcoal dark:text-white mb-2"
                    >
                      What do you think?
                    </label>
                    <textarea
                      id="feedback-content"
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                        setError("");
                      }}
                      placeholder="Share your thoughts, ideas, or report issues..."
                      rows={4}
                      className={`
                        w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                        bg-white dark:bg-gray-900
                        text-charcoal dark:text-white
                        placeholder-gray-400 dark:placeholder-gray-500
                        border-gray-200 dark:border-gray-700
                        focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                        resize-none
                        ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                      `}
                    />
                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                  </div>

                  <Input
                    type="email"
                    label="Email (optional)"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    hint="For follow-up questions only"
                  />

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? "Sending..." : "Send Feedback"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

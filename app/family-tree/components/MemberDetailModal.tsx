"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { getRelationship, getTermForFaith, getAllTermsForFaith, Faith } from "@/data/relationships";
import { speakFijiHindi } from "@/lib/audio";
import { FamilyMember } from "./FamilyNode";

interface MemberDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: FamilyMember | null;
  onDelete?: (memberId: string) => void;
}

export default function MemberDetailModal({
  isOpen,
  onClose,
  member,
  onDelete,
}: MemberDetailModalProps) {
  const [userFaith, setUserFaith] = useState<Faith>("hindu");

  // Load user's faith from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("fijihindi_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.faith) {
        setUserFaith(user.faith as Faith);
      }
    }
  }, []);

  if (!member) return null;

  const relationship = getRelationship(member.relationshipType);
  const isYou = member.relationshipType === "self";
  const fijiHindiTerm = relationship ? getTermForFaith(relationship, userFaith) : "";
  const allTerms = relationship ? getAllTermsForFaith(relationship, userFaith) : null;

  const handlePlayAudio = () => {
    if (fijiHindiTerm) {
      speakFijiHindi(fijiHindiTerm);
    }
  };

  const getGenderIcon = () => {
    switch (relationship?.gender) {
      case "male":
        return "👨";
      case "female":
        return "👩";
      default:
        return "👤";
    }
  };

  const getSideLabel = () => {
    switch (relationship?.side) {
      case "paternal":
        return "Father's Side";
      case "maternal":
        return "Mother's Side";
      case "spouse":
        return "Spouse & In-Laws";
      case "child":
        return "Children";
      case "self":
        return "You";
      default:
        return "";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-50 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header with avatar */}
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`
                  w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-xl
                  ${isYou ? "bg-gradient-to-br from-primary to-primary-600" : "bg-gradient-to-br from-secondary to-accent"}
                `}
              >
                <span className="text-5xl">{isYou ? "😊" : getGenderIcon()}</span>
              </motion.div>

              {/* Name */}
              <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mt-4">
                {member.name || (isYou ? "You" : relationship?.english)}
              </h2>

              {/* Side label */}
              {!isYou && (
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-300">
                  {getSideLabel()}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {!isYou && relationship && (
                <>
                  {/* Fiji Hindi Term */}
                  <div className="mb-6">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Fiji Hindi Term
                    </div>
                    <button
                      onClick={handlePlayAudio}
                      className="flex items-center gap-3 w-full p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-xl">🔊</span>
                      </div>
                      <div className="text-left">
                        <div className="text-xl font-bold text-primary">
                          {fijiHindiTerm}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Tap to hear pronunciation
                        </div>
                        {allTerms?.alternate && (
                          <div className="text-xs text-gray-400 mt-1">
                            Also: {allTerms.alternate}
                          </div>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* English meaning */}
                  <div className="mb-6">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      English Meaning
                    </div>
                    <div className="text-lg text-charcoal dark:text-white">
                      {relationship.english}
                    </div>
                  </div>

                  {/* Generation info */}
                  <div className="mb-6">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Relationship
                    </div>
                    <div className="text-charcoal dark:text-white">
                      {relationship.generation > 0
                        ? `${relationship.generation} generation${relationship.generation > 1 ? "s" : ""} older`
                        : relationship.generation < 0
                        ? `${Math.abs(relationship.generation)} generation${Math.abs(relationship.generation) > 1 ? "s" : ""} younger`
                        : "Same generation"}
                    </div>
                  </div>
                </>
              )}

              {isYou && (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  This is you! Add family members by tapping the + button.
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                {!isYou && onDelete && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onDelete(member.id);
                      onClose();
                    }}
                    className="flex-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Remove
                  </Button>
                )}
                <Button onClick={onClose} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

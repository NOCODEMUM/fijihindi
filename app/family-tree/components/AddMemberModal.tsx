"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  getAddableRelationships,
  getRelationship,
  getTermForFaith,
  Relationship,
  Faith,
} from "@/data/relationships";
import { speakFijiHindi } from "@/lib/audio";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (relationshipType: string, name: string) => void;
  fromMemberId: string;
  fromRelationshipType: string;
}

export default function AddMemberModal({
  isOpen,
  onClose,
  onAdd,
  fromRelationshipType,
}: AddMemberModalProps) {
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(
    null
  );
  const [name, setName] = useState("");
  const [step, setStep] = useState<"select" | "name">("select");
  const [userFaith, setUserFaith] = useState<Faith>("hindu");

  const availableRelationships = getAddableRelationships(fromRelationshipType);
  const fromRelationship = getRelationship(fromRelationshipType);

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

  useEffect(() => {
    if (!isOpen) {
      setSelectedRelationship(null);
      setName("");
      setStep("select");
    }
  }, [isOpen]);

  // Helper to get the Fiji Hindi term for the user's faith
  const getTerm = (rel: Relationship) => getTermForFaith(rel, userFaith);

  const handleSelectRelationship = (rel: Relationship) => {
    setSelectedRelationship(rel);
    speakFijiHindi(getTerm(rel));
    setStep("name");
  };

  const handleSubmit = () => {
    if (selectedRelationship) {
      onAdd(selectedRelationship.id, name);
      onClose();
    }
  };

  const getRelationshipIcon = (gender: string) => {
    switch (gender) {
      case "male":
        return "👨";
      case "female":
        return "👩";
      default:
        return "👤";
    }
  };

  const getCategoryLabel = (side: string) => {
    switch (side) {
      case "paternal":
        return "Father's Side";
      case "maternal":
        return "Mother's Side";
      case "spouse":
        return "Spouse & In-Laws";
      case "child":
        return "Children";
      case "self":
        return "Siblings";
      default:
        return "Other";
    }
  };

  // Group relationships by side
  const groupedRelationships = availableRelationships.reduce((acc, rel) => {
    const key = rel.side;
    if (!acc[key]) acc[key] = [];
    acc[key].push(rel);
    return acc;
  }, {} as Record<string, Relationship[]>);

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
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl max-h-[85vh] overflow-hidden"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>

            <div className="px-6 pb-8 overflow-y-auto max-h-[calc(85vh-60px)]">
              <AnimatePresence mode="wait">
                {step === "select" ? (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white">
                        Add Family Member
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        From {fromRelationship?.english || "You"}
                      </p>
                    </div>

                    {/* Relationship options */}
                    {Object.entries(groupedRelationships).map(([side, rels]) => (
                      <div key={side} className="mb-6">
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          {getCategoryLabel(side)}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {rels.map((rel) => (
                            <motion.button
                              key={rel.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSelectRelationship(rel)}
                              className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary text-left transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">
                                  {getRelationshipIcon(rel.gender)}
                                </span>
                                <div>
                                  <div className="font-medium text-charcoal dark:text-white text-sm">
                                    {rel.english}
                                  </div>
                                  <div className="text-primary text-xs">
                                    {getTerm(rel)}
                                  </div>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}

                    {availableRelationships.length === 0 && (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No more relatives can be added from this person.
                        <br />
                        Try adding from a different family member.
                      </div>
                    )}

                    {/* Close button */}
                    <Button variant="ghost" onClick={onClose} className="w-full mt-4">
                      Cancel
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Header with selected relationship */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
                      >
                        <span className="text-4xl">
                          {getRelationshipIcon(selectedRelationship?.gender || "neutral")}
                        </span>
                      </motion.div>
                      <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white">
                        {selectedRelationship?.english}
                      </h3>
                      <button
                        onClick={() =>
                          selectedRelationship &&
                          speakFijiHindi(getTerm(selectedRelationship))
                        }
                        className="inline-flex items-center gap-2 text-primary mt-2 hover:underline"
                      >
                        <span className="text-lg font-medium">
                          {selectedRelationship && getTerm(selectedRelationship)}
                        </span>
                        <span>🔊</span>
                      </button>
                    </div>

                    {/* Name input */}
                    <div className="mb-6">
                      <Input
                        label="Their name (optional)"
                        placeholder="e.g., Ravi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        onClick={() => setStep("select")}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button onClick={handleSubmit} className="flex-1">
                        Add to Family
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import TreeCanvas from "./components/TreeCanvas";
import AddMemberModal from "./components/AddMemberModal";
import MemberDetailModal from "./components/MemberDetailModal";
import { FamilyMember } from "./components/FamilyNode";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";
import SaveProgressPrompt from "@/app/components/SaveProgressPrompt";
import { useAuth } from "@/app/contexts/AuthContext";
import { speakFijiHindi } from "@/lib/audio";

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Common relationship terms to display
const RELATIONSHIP_TERMS = [
  { fijiHindi: "Maa", english: "Mother", emoji: "👩" },
  { fijiHindi: "Baap", english: "Father", emoji: "👨" },
  { fijiHindi: "Nani", english: "Grandmother (maternal)", emoji: "👵" },
  { fijiHindi: "Nana", english: "Grandfather (maternal)", emoji: "👴" },
  { fijiHindi: "Dadi", english: "Grandmother (paternal)", emoji: "👵" },
  { fijiHindi: "Dada", english: "Grandfather (paternal)", emoji: "👴" },
  { fijiHindi: "Bhai", english: "Brother", emoji: "👦" },
  { fijiHindi: "Bahin", english: "Sister", emoji: "👧" },
  { fijiHindi: "Beta", english: "Son", emoji: "👦" },
  { fijiHindi: "Beti", english: "Daughter", emoji: "👧" },
  { fijiHindi: "Chacha", english: "Uncle (paternal)", emoji: "👨" },
  { fijiHindi: "Chachi", english: "Aunt (paternal)", emoji: "👩" },
  { fijiHindi: "Mama", english: "Uncle (maternal)", emoji: "👨" },
  { fijiHindi: "Mami", english: "Aunt (maternal)", emoji: "👩" },
];

export default function FamilyTreePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedMemberForDetail, setSelectedMemberForDetail] = useState<FamilyMember | null>(
    null
  );
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [playingTerm, setPlayingTerm] = useState<string | null>(null);

  // Initialize with "self" node
  useEffect(() => {
    const stored = localStorage.getItem("fijihindi_family_tree");
    if (stored) {
      setMembers(JSON.parse(stored));
    } else {
      const selfMember: FamilyMember = {
        id: generateId(),
        name: "",
        relationshipType: "self",
        parentMemberId: null,
      };
      setMembers([selfMember]);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (members.length > 0) {
      localStorage.setItem("fijihindi_family_tree", JSON.stringify(members));
    }
  }, [members]);

  // Show save prompt after 5 family members (if not logged in)
  useEffect(() => {
    if (user) return; // Already logged in, don't prompt

    const memberCount = members.length;
    const remindAt = parseInt(localStorage.getItem("fijihindi_remind_save_at") || "5");
    const hasBeenPrompted = localStorage.getItem("fijihindi_save_prompted");

    // Show prompt at 5 members, then again every 3 more members
    if (memberCount >= remindAt && !hasBeenPrompted) {
      setShowSavePrompt(true);
      localStorage.setItem("fijihindi_save_prompted", "true");
    }
  }, [members.length, user]);

  const handleAddRelative = useCallback((memberId: string) => {
    setSelectedMemberId(memberId);
    setAddModalOpen(true);
  }, []);

  const handleTapMember = useCallback((member: FamilyMember) => {
    setSelectedMemberForDetail(member);
    setDetailModalOpen(true);
  }, []);

  const handleAddMember = useCallback(
    (relationshipType: string, name: string) => {
      const newMember: FamilyMember = {
        id: generateId(),
        name,
        relationshipType,
        parentMemberId: selectedMemberId,
      };
      setMembers((prev) => [...prev, newMember]);
    },
    [selectedMemberId]
  );

  const handleDeleteMember = useCallback((memberId: string) => {
    setMembers((prev) => {
      // Remove the member and all descendants
      const toRemove = new Set<string>();
      const findDescendants = (id: string) => {
        toRemove.add(id);
        prev
          .filter((m) => m.parentMemberId === id)
          .forEach((m) => findDescendants(m.id));
      };
      findDescendants(memberId);
      return prev.filter((m) => !toRemove.has(m.id));
    });
  }, []);

  const handlePlayTerm = (term: string) => {
    setPlayingTerm(term);
    speakFijiHindi(term, {
      onEnd: () => setPlayingTerm(null),
      onError: () => setPlayingTerm(null),
    });
  };

  const selectedMember = members.find((m) => m.id === selectedMemberId);

  return (
    <main className="min-h-screen bg-coconut dark:bg-background-dark pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-bold text-charcoal dark:text-white">
              Family Tree
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {members.length - 1} family member{members.length !== 2 ? "s" : ""} added
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            Done
          </Button>
        </div>
      </motion.header>

      {/* Tree Canvas */}
      <div className="max-w-4xl mx-auto">
        <TreeCanvas
          members={members}
          onAddRelative={handleAddRelative}
          onTapMember={handleTapMember}
        />
      </div>

      {/* Floating action hint */}
      {members.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-32 left-1/2 transform -translate-x-1/2 glass-card rounded-xl px-6 py-3 shadow-lg"
        >
          <p className="text-sm text-charcoal dark:text-white">
            👆 Tap <span className="text-primary font-bold">+</span> on yourself to start adding family!
          </p>
        </motion.div>
      )}

      {/* Relationship Terms Section */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <motion.button
          onClick={() => setShowTerms(!showTerms)}
          className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <div className="text-left">
              <p className="font-medium text-charcoal dark:text-white">
                Relationship Terms
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Learn family words in Fiji Hindi
              </p>
            </div>
          </div>
          <motion.svg
            animate={{ rotate: showTerms ? 180 : 0 }}
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {showTerms && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card variant="default" className="mt-2 divide-y divide-gray-100 dark:divide-gray-800">
                {RELATIONSHIP_TERMS.map((term, index) => (
                  <motion.div
                    key={term.fijiHindi}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{term.emoji}</span>
                      <div>
                        <p className="font-medium text-charcoal dark:text-white">
                          {term.fijiHindi}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {term.english}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handlePlayTerm(term.fijiHindi)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        playingTerm === term.fijiHindi
                          ? "bg-primary text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {playingTerm === term.fijiHindi ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          🔊
                        </motion.div>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      )}
                    </motion.button>
                  </motion.div>
                ))}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddMember}
        fromMemberId={selectedMemberId || ""}
        fromRelationshipType={selectedMember?.relationshipType || "self"}
      />

      {/* Member Detail Modal */}
      <MemberDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        member={selectedMemberForDetail}
        onDelete={handleDeleteMember}
      />

      {/* Save Progress Prompt (for non-logged-in users) */}
      <SaveProgressPrompt
        isOpen={showSavePrompt}
        onClose={() => {
          setShowSavePrompt(false);
          // Reset prompted flag so it can show again later
          localStorage.removeItem("fijihindi_save_prompted");
        }}
        familyMemberCount={members.length - 1}
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );
}

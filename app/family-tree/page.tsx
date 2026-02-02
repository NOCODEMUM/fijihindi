"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import TreeCanvas from "./components/TreeCanvas";
import AddMemberModal from "./components/AddMemberModal";
import MemberDetailModal from "./components/MemberDetailModal";
import { FamilyMember } from "./components/FamilyNode";
import Button from "@/components/ui/Button";
import SaveProgressPrompt from "@/app/components/SaveProgressPrompt";
import { useAuth } from "@/app/contexts/AuthContext";

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

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

  const selectedMember = members.find((m) => m.id === selectedMemberId);

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
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
          className="fixed bottom-24 left-1/2 transform -translate-x-1/2 glass-card rounded-xl px-6 py-3 shadow-lg"
        >
          <p className="text-sm text-charcoal dark:text-white">
            👆 Tap <span className="text-primary font-bold">+</span> on yourself to start adding family!
          </p>
        </motion.div>
      )}

      {/* Bottom navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 safe-area-bottom"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-around">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-xs">Family</span>
          </button>
          <button
            onClick={() => router.push("/onboarding")}
            className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs">Map</span>
          </button>
        </div>
      </motion.nav>

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
    </main>
  );
}

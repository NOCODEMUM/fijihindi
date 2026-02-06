"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import TreeCanvas from "@/app/family-tree/components/TreeCanvas";
import AddMemberModal from "@/app/family-tree/components/AddMemberModal";
import { FamilyMember } from "@/app/family-tree/components/FamilyNode";

interface FamilySetupStepProps {
  onNext: (members: FamilyMember[]) => void;
  onBack: () => void;
  initialMembers?: FamilyMember[];
}

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function FamilySetupStep({
  onNext,
  onBack,
}: FamilySetupStepProps) {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Initialize with "self" node or load from localStorage
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

  // Persist to localStorage whenever members change
  useEffect(() => {
    if (members.length > 0) {
      localStorage.setItem("fijihindi_family_tree", JSON.stringify(members));
    }
  }, [members]);

  const handleAddRelative = useCallback((memberId: string) => {
    setSelectedMemberId(memberId);
    setAddModalOpen(true);
  }, []);

  const handleTapMember = useCallback(() => {
    // In onboarding, just open add modal when tapping self
    // Could be extended later for member details
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

  const selectedMember = members.find((m) => m.id === selectedMemberId);
  const familyMemberCount = members.length - 1; // Exclude "self"

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-[70vh] px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <span className="text-4xl mb-2 block">👨‍👩‍👧‍👦</span>
        <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-1">
          Build Your Family Tree
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Tap the <span className="text-primary font-bold">+</span> button to add family members
        </p>
      </motion.div>

      {/* Interactive Tree Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 relative bg-coconut/50 dark:bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
        style={{ minHeight: "350px" }}
      >
        <TreeCanvas
          members={members}
          onAddRelative={handleAddRelative}
          onTapMember={handleTapMember}
        />
      </motion.div>

      {/* Family count badge */}
      {familyMemberCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-3"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <span>✓</span>
            {familyMemberCount} family member{familyMemberCount !== 1 ? "s" : ""} added
          </span>
        </motion.div>
      )}

      {/* Info message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-500 dark:text-gray-400 text-center mt-3 mb-4"
      >
        You can add more family members later in the Family tab
      </motion.p>

      {/* Navigation */}
      <div className="flex gap-4">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={() => onNext(members)}
          className="flex-1"
        >
          {familyMemberCount > 0 ? "Continue" : "Skip for now"}
        </Button>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddMember}
        fromMemberId={selectedMemberId || ""}
        fromRelationshipType={selectedMember?.relationshipType || "self"}
      />
    </motion.div>
  );
}

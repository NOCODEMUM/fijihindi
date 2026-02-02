"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getRelationship, getTermForFaith, Faith } from "@/data/relationships";
import { speakFijiHindi } from "@/lib/audio";

export interface FamilyMember {
  id: string;
  name: string;
  relationshipType: string;
  parentMemberId: string | null;
}

interface FamilyNodeProps {
  member: FamilyMember;
  isCenter?: boolean;
  onAddRelative: (memberId: string) => void;
  onTap: (member: FamilyMember) => void;
  delay?: number;
}

export default function FamilyNode({
  member,
  isCenter = false,
  onAddRelative,
  onTap,
  delay = 0,
}: FamilyNodeProps) {
  const [userFaith, setUserFaith] = useState<Faith>("hindu");

  useEffect(() => {
    const storedUser = localStorage.getItem("fijihindi_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.faith) {
        setUserFaith(user.faith as Faith);
      }
    }
  }, []);

  const relationship = getRelationship(member.relationshipType);
  const isYou = member.relationshipType === "self";
  const fijiHindiTerm = relationship ? getTermForFaith(relationship, userFaith) : "";

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fijiHindiTerm) {
      speakFijiHindi(fijiHindiTerm);
    }
  };

  const getNodeColor = () => {
    if (isYou) return "from-primary to-primary-600";
    switch (relationship?.side) {
      case "paternal":
        return "from-secondary to-secondary-600";
      case "maternal":
        return "from-accent to-accent";
      case "spouse":
        return "from-pink-500 to-pink-600";
      case "child":
        return "from-purple-500 to-purple-600";
      default:
        return "from-gray-400 to-gray-500";
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className={`relative ${isCenter ? "z-10" : "z-0"}`}
    >
      {/* Main node */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onTap(member)}
        className={`
          relative cursor-pointer
          ${isCenter ? "w-28 h-28" : "w-24 h-24"}
        `}
      >
        {/* Background circle */}
        <div
          className={`
            absolute inset-0 rounded-full bg-gradient-to-br ${getNodeColor()}
            shadow-lg ${isCenter ? "shadow-primary/30" : "shadow-gray-200 dark:shadow-gray-800"}
          `}
        />

        {/* Avatar/Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${isCenter ? "text-4xl" : "text-3xl"}`}>
            {isYou ? "😊" : getGenderIcon()}
          </span>
        </div>

        {/* Pulse ring for center */}
        {isCenter && (
          <div className="absolute inset-0 rounded-full border-4 border-primary animate-pulse-ring opacity-50" />
        )}

        {/* Audio button */}
        {!isYou && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayAudio}
            className="absolute -right-1 -top-1 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center border-2 border-gray-100 dark:border-gray-700"
          >
            <span className="text-sm">🔊</span>
          </motion.button>
        )}

        {/* Add button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onAddRelative(member.id);
          }}
          className="absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-primary shadow-lg flex items-center justify-center text-white font-bold"
        >
          +
        </motion.button>
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.1 }}
        className="text-center mt-2"
      >
        {/* Name */}
        <div className="text-sm font-medium text-charcoal dark:text-white truncate max-w-[100px]">
          {member.name || (isYou ? "You" : relationship?.english)}
        </div>

        {/* Fiji Hindi term */}
        {!isYou && fijiHindiTerm && (
          <div className="text-xs text-primary font-medium">
            {fijiHindiTerm}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

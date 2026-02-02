"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import FamilyNode, { FamilyMember } from "./FamilyNode";
import { getRelationship } from "@/data/relationships";

interface TreeCanvasProps {
  members: FamilyMember[];
  onAddRelative: (memberId: string) => void;
  onTapMember: (member: FamilyMember) => void;
}

interface PositionedMember extends FamilyMember {
  x: number;
  y: number;
  level: number;
}

export default function TreeCanvas({
  members,
  onAddRelative,
  onTapMember,
}: TreeCanvasProps) {
  // Pan state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [startMouse, setStartMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle pan start (mouse and touch)
  const handlePanStart = useCallback((clientX: number, clientY: number) => {
    setIsPanning(true);
    setStartMouse({ x: clientX, y: clientY });
    setStartPan({ x: pan.x, y: pan.y });
  }, [pan]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start panning if clicking on the canvas background, not on nodes
    if ((e.target as HTMLElement).closest('.family-node')) return;
    e.preventDefault();
    handlePanStart(e.clientX, e.clientY);
  }, [handlePanStart]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.family-node')) return;
    if (e.touches.length === 1) {
      handlePanStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handlePanStart]);

  // Handle pan move
  const handlePanMove = useCallback((clientX: number, clientY: number) => {
    if (!isPanning) return;
    const deltaX = clientX - startMouse.x;
    const deltaY = clientY - startMouse.y;
    setPan({
      x: startPan.x + deltaX,
      y: startPan.y + deltaY,
    });
  }, [isPanning, startMouse, startPan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handlePanMove(e.clientX, e.clientY);
  }, [handlePanMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handlePanMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handlePanMove]);

  // Handle pan end
  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Reset pan position
  const handleResetPan = useCallback(() => {
    setPan({ x: 0, y: 0 });
  }, []);

  // Calculate positions for each member
  const positionedMembers = useMemo(() => {
    const positions: PositionedMember[] = [];
    const centerX = 50; // percentage
    const centerY = 50;
    const levelHeight = 25; // percentage between levels

    // Find the "self" node (center)
    const selfMember = members.find((m) => m.relationshipType === "self");
    if (!selfMember) return positions;

    // Add self at center
    positions.push({ ...selfMember, x: centerX, y: centerY, level: 0 });

    // Group members by generation
    const generations: Record<number, FamilyMember[]> = { 0: [] };

    members.forEach((member) => {
      if (member.relationshipType === "self") return;

      const rel = getRelationship(member.relationshipType);
      if (!rel) return;

      const gen = rel.generation;
      if (!generations[gen]) generations[gen] = [];
      generations[gen].push(member);
    });

    // Position each generation
    Object.entries(generations).forEach(([genStr, genMembers]) => {
      const gen = parseInt(genStr);
      if (gen === 0 || genMembers.length === 0) return;

      const y = centerY - gen * levelHeight;
      const spacing = 80 / (genMembers.length + 1);

      genMembers.forEach((member, index) => {
        const rel = getRelationship(member.relationshipType);
        let x: number;

        // Position based on side (paternal on left, maternal on right)
        if (rel?.side === "paternal") {
          x = 10 + (index + 1) * spacing * 0.4;
        } else if (rel?.side === "maternal") {
          x = 50 + (index + 1) * spacing * 0.4;
        } else if (rel?.side === "spouse") {
          x = centerX + (index % 2 === 0 ? 20 : -20);
        } else if (rel?.side === "child") {
          x = centerX + (index - genMembers.length / 2) * 20;
        } else {
          // Siblings
          x = centerX + (index - genMembers.length / 2 + 0.5) * 25;
        }

        positions.push({ ...member, x, y, level: gen });
      });
    });

    return positions;
  }, [members]);

  // Calculate connection lines
  const connections = useMemo(() => {
    const lines: { from: PositionedMember; to: PositionedMember }[] = [];

    positionedMembers.forEach((member) => {
      if (member.parentMemberId) {
        const parent = positionedMembers.find((m) => m.id === member.parentMemberId);
        if (parent) {
          lines.push({ from: parent, to: member });
        }
      }
    });

    return lines;
  }, [positionedMembers]);

  const selfMember = positionedMembers.find((m) => m.relationshipType === "self");

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[600px] overflow-hidden select-none ${
        isPanning ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handlePanEnd}
      onMouseLeave={handlePanEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePanEnd}
    >
      {/* Pannable content container */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          transition: isPanning ? "none" : "transform 0.1s ease-out",
        }}
      >
        {/* Connection lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00CED1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF7722" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {connections.map((conn, index) => (
            <motion.path
              key={`${conn.from.id}-${conn.to.id}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              d={`M ${conn.from.x}% ${conn.from.y}%
                  C ${conn.from.x}% ${(conn.from.y + conn.to.y) / 2}%,
                    ${conn.to.x}% ${(conn.from.y + conn.to.y) / 2}%,
                    ${conn.to.x}% ${conn.to.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {/* Family nodes */}
        {positionedMembers.map((member, index) => (
          <div
            key={member.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 family-node"
            style={{
              left: `${member.x}%`,
              top: `${member.y}%`,
            }}
          >
            <FamilyNode
              member={member}
              isCenter={member.relationshipType === "self"}
              onAddRelative={onAddRelative}
              onTap={onTapMember}
              delay={index * 0.1}
            />
          </div>
        ))}

        {/* Empty state helper */}
        {members.length === 1 && selfMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              Tap the <span className="text-primary font-bold">+</span> button to add family members
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Learn Fiji Hindi relationship terms as you build your tree
            </p>
          </motion.div>
        )}
      </div>

      {/* Legend - fixed position, not affected by pan */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 glass-card rounded-xl p-3 text-xs space-y-2 z-10"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-gray-600 dark:text-gray-300">Father&apos;s Side</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-gray-600 dark:text-gray-300">Mother&apos;s Side</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-pink-500" />
          <span className="text-gray-600 dark:text-gray-300">Spouse</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-gray-600 dark:text-gray-300">Children</span>
        </div>
      </motion.div>

      {/* Reset pan button - shows when panned */}
      {(pan.x !== 0 || pan.y !== 0) && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleResetPan}
          className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          title="Reset view"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </motion.button>
      )}

      {/* Pan hint - shows briefly on first load */}
      {members.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 right-4 z-10 glass-card rounded-lg px-3 py-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
          </svg>
          Drag to pan
        </motion.div>
      )}
    </div>
  );
}

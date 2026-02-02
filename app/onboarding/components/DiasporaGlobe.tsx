"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { DIASPORA_COUNTRIES, FIJI_CENTER, TOTAL_DIASPORA_COUNT } from "@/lib/constants";

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

// Earth globe with texture
function EarthGlobe({ radius = 2 }: { radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Use a stylized earth texture - soft colors that match our palette
  // This is a free-to-use NASA Blue Marble texture
  const texture = useLoader(
    THREE.TextureLoader,
    "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg"
  );

  // Make the texture softer/more stylized
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}

// Atmosphere glow effect
function AtmosphereGlow({ radius = 2 }: { radius?: number }) {
  return (
    <>
      {/* Inner glow */}
      <Sphere args={[radius * 1.01, 32, 32]}>
        <meshBasicMaterial
          color="#4ECDC4"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      {/* Outer glow */}
      <Sphere args={[radius * 1.05, 32, 32]}>
        <meshBasicMaterial
          color="#4ECDC4"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </>
  );
}

// Location pins on the globe
function LocationPins({ radius = 2 }: { radius?: number }) {
  const pinsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pinsRef.current) {
      pinsRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const baseScale = mesh.userData.baseScale || 1;
        mesh.scale.setScalar(
          baseScale * (1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.15)
        );
      });
    }
  });

  return (
    <group ref={pinsRef}>
      {/* Fiji heartbeat pin - larger and orange/mango */}
      <mesh position={latLngToVector3(FIJI_CENTER.lat, FIJI_CENTER.lng, radius + 0.1)}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#FF8C42" /> {/* papaya */}
      </mesh>

      {/* Fiji glow ring */}
      <mesh
        position={latLngToVector3(FIJI_CENTER.lat, FIJI_CENTER.lng, radius + 0.02)}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshBasicMaterial color="#FF8C42" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Diaspora pins */}
      {DIASPORA_COUNTRIES.map((loc, index) => {
        const pos = latLngToVector3(loc.lat, loc.lng, radius + 0.06);
        const size = Math.min(0.07, 0.03 + (loc.count / 50000) * 0.04);

        // Color cycle: lagoon, hibiscus, mango
        const colors = ["#4ECDC4", "#E8A0BF", "#FFB347"];
        const color = colors[index % 3];

        return (
          <mesh
            key={`${loc.city}-${loc.country}`}
            position={pos}
            userData={{ baseScale: 1 }}
          >
            <sphereGeometry args={[size, 12, 12]} />
            <meshBasicMaterial color={color} transparent opacity={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}

// Connection arcs from Fiji to diaspora
function ConnectionArcs({ radius = 2 }: { radius?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const curves = useMemo(() => {
    return DIASPORA_COUNTRIES.slice(0, 10).map((loc) => {
      const start = latLngToVector3(FIJI_CENTER.lat, FIJI_CENTER.lng, radius);
      const end = latLngToVector3(loc.lat, loc.lng, radius);

      // Create curved arc
      const midPoint = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(radius * 1.25);

      const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
      return curve.getPoints(50);
    });
  }, [radius]);

  if (!visible) return null;

  return (
    <group>
      {curves.map((points, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#4ECDC4"
            transparent
            opacity={0.5}
            linewidth={1}
          />
        </line>
      ))}
    </group>
  );
}

// Auto-rotating globe group
function RotatingGlobe() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <AtmosphereGlow radius={2} />
      <EarthGlobe radius={2} />
      <LocationPins radius={2} />
      <ConnectionArcs radius={2} />
    </group>
  );
}

// Fallback globe (simple dotted version for loading)
function FallbackGlobe({ radius = 2 }: { radius?: number }) {
  const positions = useMemo(() => {
    const pos: number[] = [];
    const samples = 2000;
    const offset = 2 / samples;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < samples; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      pos.push(x * radius, y * radius, z * radius);
    }
    return new Float32Array(pos);
  }, [radius]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#4ECDC4" transparent opacity={0.5} />
    </points>
  );
}

// Camera controller
function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 5.5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={0.3}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.5}
    />
  );
}

// Stats card
interface StatCardProps {
  title: string;
  value: string | number;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  delay?: number;
}

function StatCard({ title, value, position, delay = 0 }: StatCardProps) {
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: position.includes("top") ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute ${positionClasses[position]} glass-card rounded-2xl px-4 py-3`}
    >
      <div className="text-xs text-charcoal/60 mb-1">{title}</div>
      <div className="text-xl font-bold text-charcoal">{value}</div>
    </motion.div>
  );
}

// Top locations list
function TopLocations({ delay = 0 }: { delay?: number }) {
  const topCities = DIASPORA_COUNTRIES.slice(0, 3);
  const maxCount = Math.max(...topCities.map((c) => c.count));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="absolute bottom-4 left-4 glass-card rounded-2xl px-4 py-3 min-w-[200px]"
    >
      <div className="text-xs text-charcoal/60 mb-3">Top locations</div>
      <div className="space-y-3">
        {topCities.map((loc, index) => (
          <div key={`${loc.city}-${loc.country}`}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-charcoal font-medium">
                {loc.city} • {loc.country}
              </span>
              <span className="text-charcoal/60">{loc.count.toLocaleString()}</span>
            </div>
            <div className="h-1.5 bg-sand-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(loc.count / maxCount) * 100}%` }}
                transition={{ delay: delay + 0.2 + index * 0.1, duration: 0.5 }}
                className={`h-full rounded-full ${
                  index === 0
                    ? "bg-lagoon"
                    : index === 1
                    ? "bg-hibiscus"
                    : "bg-mango"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Main component
interface DiasporaGlobeProps {
  showStats?: boolean;
  className?: string;
}

export default function DiasporaGlobe({
  showStats = true,
  className = "",
}: DiasporaGlobeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`relative w-full h-[500px] globe-container ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-lagoon border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-[500px] globe-container ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} />
        <React.Suspense fallback={<FallbackGlobe />}>
          <RotatingGlobe />
        </React.Suspense>
        <CameraController />
      </Canvas>

      <AnimatePresence>
        {showStats && (
          <>
            <StatCard
              title="Fiji Indians worldwide"
              value={TOTAL_DIASPORA_COUNT.toLocaleString()}
              position="top-left"
              delay={0.5}
            />
            <TopLocations delay={0.8} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

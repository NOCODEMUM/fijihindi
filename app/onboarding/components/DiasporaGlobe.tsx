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

  const texture = useLoader(
    THREE.TextureLoader,
    "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg"
  );

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
      <Sphere args={[radius * 1.01, 32, 32]}>
        <meshBasicMaterial
          color="#4ECDC4"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
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

// Fiji heartbeat pin
function FijiPin({ radius = 2 }: { radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      ringRef.current.scale.setScalar(scale);
      ringRef.current.material.opacity = 0.4 - Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  const fijiPos = latLngToVector3(FIJI_CENTER.lat, FIJI_CENTER.lng, radius + 0.08);

  return (
    <group>
      {/* Main Fiji pin */}
      <mesh ref={meshRef} position={fijiPos}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#FF8C42" />
      </mesh>
      {/* Pulsing ring */}
      <mesh
        ref={ringRef}
        position={latLngToVector3(FIJI_CENTER.lat, FIJI_CENTER.lng, radius + 0.02)}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.1, 0.15, 32]} />
        <meshBasicMaterial color="#FF8C42" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Flying dots that animate from Fiji to destinations
function FlyingDots({ radius = 2 }: { radius?: number }) {
  const dotsRef = useRef<THREE.InstancedMesh>(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Generate dots - 1 dot per 500 people, max 500 dots total for performance
  const dots = useMemo(() => {
    const allDots: { destLat: number; destLng: number; delay: number; color: string }[] = [];

    DIASPORA_COUNTRIES.forEach((loc, locIndex) => {
      // Number of dots for this location (1 per 500 people, min 1, max 50 per location)
      const dotCount = Math.min(50, Math.max(1, Math.floor(loc.count / 500)));

      // Colors cycle through our palette
      const colors = ["#4ECDC4", "#E8A0BF", "#FFB347", "#FF8C42"];

      for (let i = 0; i < dotCount; i++) {
        // Add slight randomness to position so dots don't stack perfectly
        const latOffset = (Math.random() - 0.5) * 3;
        const lngOffset = (Math.random() - 0.5) * 3;

        allDots.push({
          destLat: loc.lat + latOffset,
          destLng: loc.lng + lngOffset,
          delay: locIndex * 0.1 + i * 0.02, // Stagger by location and dot
          color: colors[locIndex % colors.length],
        });
      }
    });

    return allDots.slice(0, 400); // Cap at 400 dots for performance
  }, []);

  // Animation progress for each dot (0 = at Fiji, 1 = at destination)
  const progressRef = useRef<Float32Array>(new Float32Array(dots.length).fill(0));
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
      startTimeRef.current = Date.now();
    }, 1000); // Start animation after 1 second
    return () => clearTimeout(timer);
  }, []);

  const fijiPos = latLngToVector3(FIJI_CENTER.lat, FIJI_CENTER.lng, radius + 0.05);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => {
    const colors = new Float32Array(dots.length * 3);
    dots.forEach((dot, i) => {
      const color = new THREE.Color(dot.color);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });
    return colors;
  }, [dots]);

  useFrame(() => {
    if (!dotsRef.current || !animationStarted) return;

    const elapsed = (Date.now() - startTimeRef.current) / 1000;

    dots.forEach((dot, i) => {
      // Calculate progress with easing
      const rawProgress = Math.max(0, (elapsed - dot.delay) / 2); // 2 second flight time
      const progress = Math.min(1, rawProgress * rawProgress * (3 - 2 * rawProgress)); // Smooth easing
      progressRef.current[i] = progress;

      // Calculate position along arc from Fiji to destination
      const destPos = latLngToVector3(dot.destLat, dot.destLng, radius + 0.05);

      // Create arc by interpolating and lifting the midpoint
      const midPoint = new THREE.Vector3().lerpVectors(fijiPos, destPos, 0.5);
      midPoint.normalize().multiplyScalar(radius + 0.4); // Lift arc above surface

      // Quadratic bezier interpolation
      const t = progress;
      const pos = new THREE.Vector3();
      pos.x = (1 - t) * (1 - t) * fijiPos.x + 2 * (1 - t) * t * midPoint.x + t * t * destPos.x;
      pos.y = (1 - t) * (1 - t) * fijiPos.y + 2 * (1 - t) * t * midPoint.y + t * t * destPos.y;
      pos.z = (1 - t) * (1 - t) * fijiPos.z + 2 * (1 - t) * t * midPoint.z + t * t * destPos.z;

      dummy.position.copy(pos);

      // Scale: small while flying, grow when landed
      const scale = progress < 1 ? 0.015 : 0.02;
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();
      dotsRef.current!.setMatrixAt(i, dummy.matrix);
    });

    dotsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={dotsRef} args={[undefined, undefined, dots.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial vertexColors />
      <instancedBufferAttribute
        attach="geometry-attributes-color"
        args={[colorArray, 3]}
      />
    </instancedMesh>
  );
}

// Auto-rotating globe group
function RotatingGlobe() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Slower rotation
    }
  });

  return (
    <group ref={groupRef}>
      <AtmosphereGlow radius={2} />
      <EarthGlobe radius={2} />
      <FijiPin radius={2} />
      <FlyingDots radius={2} />
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
      autoRotateSpeed={0.2}
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
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: position.includes("top") ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute ${positionClasses[position]} z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg`}
    >
      <div className="text-xs text-gray-500 dark:text-gray-400">{title}</div>
      <div className="text-lg font-bold text-charcoal dark:text-white">{value}</div>
    </motion.div>
  );
}

// Top locations list
function TopLocations({ delay = 0 }: { delay?: number }) {
  const topCities = DIASPORA_COUNTRIES.slice(0, 3);
  const maxCount = Math.max(...topCities.map((c) => c.count));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="absolute bottom-12 left-2 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg max-w-[180px]"
    >
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Top locations</div>
      <div className="space-y-2">
        {topCities.map((loc, index) => (
          <div key={`${loc.city}-${loc.country}`}>
            <div className="flex justify-between text-xs mb-0.5">
              <span className="text-charcoal dark:text-white font-medium">
                {loc.city} • {loc.country}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">{loc.count.toLocaleString()}</span>
            </div>
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(loc.count / maxCount) * 100}%` }}
                transition={{ delay: delay + 0.2 + index * 0.1, duration: 0.5 }}
                className={`h-full rounded-full ${
                  index === 0
                    ? "bg-primary"
                    : index === 1
                    ? "bg-lagoon"
                    : "bg-peach"
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
      <div className={`relative w-full h-full min-h-[400px] globe-container ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-lagoon border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[500px] globe-container overflow-hidden ${className}`}>
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
            <TopLocations delay={0.7} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

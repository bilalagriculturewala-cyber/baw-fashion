/**
 * BAWMonogram3D — Lightweight 3D gold monogram for the hero section.
 *
 * Uses @react-three/fiber + @react-three/drei.
 * Renders a 3D icosahedron geometry (the "gem") with a metallic gold material,
 * orbital ring, and floating particles — all tied to mouse-tracking for
 * subtle parallax depth. Canvas is aria-hidden and never blocks clicks.
 */
import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Gold palette ─────────────────────────────────────────── */
const GOLD = new THREE.Color('#F4D9A0');
const GOLD_LIGHT = new THREE.Color('#FAF7F0');
const GOLD_DARK = new THREE.Color('#5B4632');

/* ─── Particle cloud ───────────────────────────────────────── */
function Particles({ count = 80 }) {
    const ref = useRef();
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 1.4 + Math.random() * 1.2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            arr[i * 3 + 2] = r * Math.cos(phi);
        }
        return arr;
    }, [count]);

    useFrame((_, delta) => {
        if (ref.current) ref.current.rotation.y += delta * 0.09;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color={GOLD_LIGHT}
                size={0.022}
                sizeAttenuation
                transparent
                opacity={0.55}
            />
        </points>
    );
}

/* ─── Orbital ring ──────────────────────────────────────────── */
function OrbitalRing() {
    const ref = useRef();
    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.z += delta * 0.18;
        }
    });
    return (
        <group ref={ref} rotation={[Math.PI / 3, 0, 0]}>
            <Torus args={[1.32, 0.012, 16, 120]}>
                <meshStandardMaterial
                    color={GOLD}
                    emissive={GOLD_DARK}
                    emissiveIntensity={0.4}
                    roughness={0.3}
                    metalness={1}
                />
            </Torus>
        </group>
    );
}

/* ─── Inner gem ─────────────────────────────────────────────── */
function GoldGem({ mouse }) {
    const ref = useRef();
    const { size } = useThree();

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Slow continuous rotation
        ref.current.rotation.y += delta * 0.22;
        ref.current.rotation.x += delta * 0.08;

        // Mouse-driven tilt (parallax depth)
        const targetX = (mouse.current[1] / size.height - 0.5) * 0.5;
        const targetY = (mouse.current[0] / size.width - 0.5) * 0.5;
        ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.04;
        ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.04;

        // Gentle float
        ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.07;
    });

    return (
        <mesh ref={ref} castShadow>
            <icosahedronGeometry args={[0.72, 1]} />
            <MeshDistortMaterial
                color={GOLD}
                emissive={GOLD_DARK}
                emissiveIntensity={0.15}
                roughness={0.1}
                metalness={0.95}
                distort={0.18}
                speed={1.2}
                envMapIntensity={1}
            />
        </mesh>
    );
}

/* ─── Outer shell (glassy) ──────────────────────────────────── */
function OuterShell() {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = -state.clock.elapsedTime * 0.12;
        }
    });
    return (
        <Sphere ref={ref} args={[1.05, 48, 48]}>
            <meshStandardMaterial
                color={GOLD}
                roughness={0.05}
                metalness={0.3}
                transparent
                opacity={0.06}
                side={THREE.BackSide}
            />
        </Sphere>
    );
}

/* ─── Scene ─────────────────────────────────────────────────── */
function Scene({ mouse }) {
    return (
        <>
            {/* Lights */}
            <ambientLight intensity={0.3} />
            <directionalLight
                position={[3, 4, 3]}
                intensity={2.5}
                color={GOLD_LIGHT}
            />
            <pointLight position={[-3, -2, -3]} intensity={1.2} color={GOLD} />
            <pointLight position={[0, 3, -2]} intensity={0.6} color="#fff" />

            <GoldGem mouse={mouse} />
            <OuterShell />
            <OrbitalRing />
            <Particles />
        </>
    );
}

/* ─── Public component ──────────────────────────────────────── */
export default function BAWMonogram3D() {
    const mouse = useRef([0, 0]);

    const onMouseMove = (e) => {
        mouse.current = [e.clientX, e.clientY];
    };

    return (
        <div
            className="absolute inset-0 z-0 pointer-events-none"
            onMouseMove={onMouseMove}
            aria-hidden="true"
        >
            <Canvas
                camera={{ position: [0, 0, 3.2], fov: 50 }}
                dpr={[1, 1.5]}   // max 1.5× DPR — keeps GPU load low
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <Scene mouse={mouse} />
                </Suspense>
            </Canvas>
        </div>
    );
}

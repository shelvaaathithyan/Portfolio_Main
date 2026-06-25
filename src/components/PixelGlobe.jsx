import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSphere = ({ active, isMobile }) => {
  const pointsRef = useRef();

  // Create 300 particles for extreme performance, half on mobile
  const particleCount = isMobile ? 150 : 300;
  
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const radius = 2.5;

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral method for even distribution on a sphere
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Randomize sizes slightly for a digital pixel feel
      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    return [positions, sizes];
  }, [particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Extremely slow, smooth rotation
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
      
      // Optional subtle breathing effect if active
      if (active && !isMobile) {
         pointsRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
      } else if (!isMobile) {
         pointsRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={true}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={active ? "#ffffff" : "#cbd5e1"}
        transparent
        opacity={isMobile ? 0.8 : (active ? 0.9 : 0.5)}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const PixelGlobe = ({ active, isMobile }) => {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        performance={{ current: 1, min: 0.5, max: 1, debounce: 200 }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSphere active={active} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default PixelGlobe;

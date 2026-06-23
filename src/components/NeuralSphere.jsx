import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const Orb = () => {
  const orbRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      orbRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      
      // Slight follow cursor
      orbRef.current.position.x = pointer.x * 0.5;
      orbRef.current.position.y = pointer.y * 0.5;
    }
  });

  return (
    <Sphere ref={orbRef} args={[1, 64, 64]} scale={1.5}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
        transparent={true}
        opacity={0.15}
      />
    </Sphere>
  );
};

const NeuralSphere = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Orb />
      </Canvas>
    </div>
  );
};

export default NeuralSphere;

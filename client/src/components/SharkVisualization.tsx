import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SharkVisualization: React.FC = () => {
  const sharkRef = useRef<THREE.Group>(null);

  // Animation loop
  useFrame((state, delta) => {
    if (sharkRef.current) {
      // Smooth rotation animation
      sharkRef.current.rotation.y += delta * 0.3;
      
      // Gentle floating motion
      sharkRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      
      // Optional: slight forward/backward motion
      sharkRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <group ref={sharkRef} position={[0, 0, 0]}>
      {/* Main shark body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.3, 4, 12]} />
        <meshPhongMaterial 
          color="#4A90E2" 
          shininess={30}
          specular="#ffffff"
        />
      </mesh>
      
      {/* Shark head (nose) */}
      <mesh position={[0, 0, 2.2]} castShadow receiveShadow>
        <coneGeometry args={[0.3, 1, 8]} />
        <meshPhongMaterial color="#357ABD" />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0, -2.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 6]} />
        <meshPhongMaterial color="#357ABD" />
      </mesh>
      
      {/* Dorsal fin */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.4, 1.2, 4]} />
        <meshPhongMaterial color="#2E6BA8" />
      </mesh>
      
      {/* Pectoral fins */}
      <mesh position={[1, 0, 0.5]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshPhongMaterial color="#2E6BA8" />
      </mesh>
      <mesh position={[-1, 0, 0.5]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshPhongMaterial color="#2E6BA8" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.3, 0.3, 1.5]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.3, 0.3, 1.5]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
};

export default SharkVisualization;

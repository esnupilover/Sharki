import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import PixelShader from './PixelShader';

interface SharkGLTF {
  scene: THREE.Group;
  nodes: { [key: string]: THREE.Object3D };
  materials: { [key: string]: THREE.Material };
}

interface SharkVisualizationProps {
  sharkColor?: string;
}

const SharkVisualization: React.FC<SharkVisualizationProps> = ({ sharkColor = '#4A90E2' }) => {
  const sharkRef = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const { size } = useThree();
  
  // Load the new shark model
  const sharkModel = useGLTF('/models/shark.glb') as SharkGLTF;

  useEffect(() => {
    if (sharkModel?.scene) {
      console.log('✅ New shark model loaded successfully!');
      
      // Setup materials and shadows
      sharkModel.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material instanceof THREE.Material) {
            child.material.needsUpdate = true;
          }
        }
      });
      
      setModelLoaded(true);
    }
  }, [sharkModel]);

  // Update shark color when color prop changes
  useEffect(() => {
    if (sharkModel?.scene && modelLoaded) {
      sharkModel.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.MeshStandardMaterial || 
              child.material instanceof THREE.MeshPhongMaterial) {
            child.material.color.set(sharkColor);
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [sharkColor, sharkModel, modelLoaded]);

  // Animation loop
  useFrame((state, delta) => {
    if (sharkRef.current) {
      // Smooth rotation animation
      sharkRef.current.rotation.y += delta * 0.8;
      
      // Gentle floating motion
      sharkRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      
      // Optional: slight forward/backward motion
      sharkRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  // Show the real shark model when loaded, fallback otherwise
  if (modelLoaded && sharkModel?.scene) {
    return (
      <>
        <group 
          ref={sharkRef} 
          position={[0, 0, 0]} 
          scale={[2.5, 2.5, 2.5]}
          rotation={[0, Math.PI, 0]}
        >
          <primitive 
            object={sharkModel.scene.clone()} 
            castShadow
            receiveShadow
          />
        </group>
        
        {/* Pixelated post-processing effects */}
        <EffectComposer>
          <PixelShader 
            pixelSize={4.0}
            resolution={[size.width, size.height]}
          />
        </EffectComposer>
      </>
    );
  }

  // Fallback geometric shark while loading
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

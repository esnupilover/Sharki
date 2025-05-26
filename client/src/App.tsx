import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SharkVisualization from "./components/SharkVisualization";
import "@fontsource/inter";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden', 
        background: '#ffffff',
        fontFamily: 'Inter, sans-serif'
      }}>
        <Canvas
          shadows
          camera={{
            position: [0, 2, 8],
            fov: 60,
            near: 0.1,
            far: 100
          }}
          gl={{
            antialias: false,
            powerPreference: "default"
          }}
          onCreated={({ gl }) => {
            console.log('Canvas created, renderer initialized');
            gl.setSize(window.innerWidth, window.innerHeight);
            gl.setPixelRatio(window.devicePixelRatio);
          }}
        >
          <color attach="background" args={["#ffffff"]} />
          
          {/* Enhanced lighting setup for better model visibility */}
          <directionalLight 
            position={[5, 10, 7.5]} 
            intensity={1.5} 
            color="#ffffff"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <ambientLight intensity={0.8} color="#404040" />
          
          {/* Additional fill lights for better visibility */}
          <pointLight position={[-5, 5, 5]} intensity={0.6} color="#ffffff" />
          <pointLight position={[5, -5, -5]} intensity={0.4} color="#ffffff" />
          <pointLight position={[0, 0, 10]} intensity={0.3} color="#ffffff" />
          
          {/* Rim light for better definition */}
          <directionalLight
            position={[-5, 2, -5]}
            intensity={0.5}
            color="#4A90E2"
          />
          
          <Suspense fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="red" wireframe />
            </mesh>
          }>
            <SharkVisualization />
          </Suspense>
        </Canvas>

      </div>
    </QueryClientProvider>
  );
}

export default App;

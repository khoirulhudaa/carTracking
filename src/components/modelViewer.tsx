// components/Local3DViewer.tsx
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import { Group } from "three";

const LoadingSpinner = () => {
  const ref = React.useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 3;
  });

  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial color="#8b5cf6" wireframe />
      </mesh>
    </group>
  );
};

// Komponen model lokal
const LocalModel: React.FC<{
  path: string;                    // contoh: "/models/shoe.glb"
  scale?: number | [number, number, number];
  speed?: number;
}> = ({ path, scale = 5 }) => {
  const { scene } = useGLTF(path);
  const ref = React.useRef<Group>(null);

  // ROTASI AWAL 90° — DEPAN MOBIL LANGSUNG KELIHATAN
  React.useLayoutEffect(() => {
    scene.rotation.y = Math.PI / 2;     // 90° ke kiri → paling sering cocok untuk mobil
  }, [scene]);

  return <primitive ref={ref} object={scene} scale={scale} />;
};

// Viewer utama
interface Local3DViewerProps {
  modelName: string;                    
  scale?: number | [number, number, number];
  rotationSpeed?: number;
  enableZoom?: boolean;
  height?: string;
  className?: string;
}

const Local3DViewer: React.FC<Local3DViewerProps> = ({
  modelName,
  scale = 1,
  height = "510px",
}) => {
  const modelPath = `/assets/${modelName}`;

  // Preload otomatis
  useEffect(() => {
    useGLTF.preload(modelPath);
  }, [modelPath]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border bg-black/40`} style={{ height }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }} className="bg-white">
        <color args={["#0f172a"]} />
        <ambientLight intensity={24} />
        <directionalLight position={[14, 4, 12]} intensity={24} />
        <pointLight position={[-5, 5, -5]} intensity={4} color="#6366f1" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />

        <Suspense fallback={<LoadingSpinner />}>
          <LocalModel path={modelPath} scale={scale} />
        </Suspense>
      </Canvas>

      {/* Optional: nama model */}
      <div className="relative text-white text-sm bg-white px-3 py-1 rounded-lg backdrop-blur">
        {modelName}
      </div>
    </div>
  );
};

export default Local3DViewer;
'use client';
 
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import { useState, Suspense } from 'react';
 
const LandingPage = () => {
  const [labelValue, setLabelValue] = useState(0);
 
  const cubeClick = () => {
    setLabelValue((prev) => (prev + 1 <= 100 ? prev + 1 : 100));
  };
  const ModelLayout = () => {
    const MODEL_PATH = `/interactive-3D-Model-viewer/glb/Cooler.glb`;
    const { scene } = useGLTF(MODEL_PATH);

    if (!scene) {
      return (
        <Html position={[0, 1, 0]}>
          <div className="bg-red-500 p-2 text-white rounded">Model failed to load</div>
        </Html>
      );
    }
 
    return (
      <group>
        <primitive object={scene} scale={1} />
        <Html position={[-1, 1, 0]}>
          <div className="bg-white p-1 text-xs rounded shadow-md text-black">{labelValue}%</div>
        </Html>
        <CubeBox />
      </group>
    );
  };
 
  const CubeBox = () => {
    return (
      <mesh position={[0.8, 0.9, 0]} onClick={cubeClick}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="green" />
      </mesh>
    );
  };
 
  return (
    <div className="w-screen h-screen bg-amber-50">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />
        <Suspense>
          <ModelLayout />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <div className="absolute top-4 right-4 cursor-pointer text-base text-red-600" onClick={() => setLabelValue(0)}>
        Reset
      </div>
    </div>
  );
};
 
export default LandingPage;
 
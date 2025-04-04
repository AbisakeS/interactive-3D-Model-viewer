'use client';
 
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import { useState, Suspense, useEffect } from 'react';
 
const LandingPage = () => {
  const [labelValue, setLabelValue] = useState(0);
  const [isReachedMaxValue,setIsReachedMax] = useState(false);
  const cubeClick = () => {;
  
    if(isReachedMaxValue){
      setLabelValue((prev) => 
        (prev - 10 ));
      if(labelValue ==10){
        setIsReachedMax(!isReachedMaxValue)
      }
    }
    else{
      setLabelValue((prev) => 
        (prev + 1 <= 100 ? prev + 10 : 100));
      if(labelValue === 90 ){
        setIsReachedMax(!isReachedMaxValue)
      }
    }

  };
  const ModelLayout = () => {
    const MODEL_PATH = `/interactive-3D-Model-viewer/glb/Cooler.glb`;
    const { scene } = useGLTF(MODEL_PATH);
    console.log(scene,'scene')

    if (!scene) {
      return (
        <Html position={[0, 1, 0]}>
          <div className={`bg-red-500 p-2 text-white rounded`}>Model failed to load</div>
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
    const [color, setColor] = useState("green");
    useEffect(() =>{
      const intervalId = setInterval(() => {
        setColor((prevColor) => (prevColor === "red" ? "green" : "red"));
      }, 500);
      return () => clearInterval(intervalId);
    },[])
    return (
      <mesh position={[-0.7, 0.9, 0]} onClick={cubeClick}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial  color={labelValue === 100 ? color : "green"} />
      </mesh>
    );
  };
 
  return (
    <div className="w-screen h-screen bg-amber-50">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={2} position={[5,10,5]}/>
        <directionalLight intensity={5} position={[0, 20, 20]} />
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
 
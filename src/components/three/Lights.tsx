"use client";

export function Lights() {
  return (
    <>
      {/* Main ambient light */}
      <ambientLight intensity={0.3} />
      
      {/* Key light - main directional */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Fill light - softer from opposite side */}
      <directionalLight 
        position={[-5, 5, 5]} 
        intensity={0.5} 
        color="#a5b4fc"
      />
      
      {/* Accent lights for depth */}
      <pointLight position={[-10, -20, -10]} color="#8b5cf6" intensity={3} distance={30} />
      <pointLight position={[10, -40, -5]} color="#3b82f6" intensity={2} distance={25} />
      <pointLight position={[-5, -60, 5]} color="#06b6d4" intensity={2} distance={25} />
      
      {/* Rim light for edge definition */}
      <spotLight
        position={[0, 10, -10]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#e0e7ff"
      />
    </>
  );
}

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
      
      {/* Fill light - softer from opposite side with pink tint */}
      <directionalLight 
        position={[-5, 5, 5]} 
        intensity={0.5} 
        color="#fce7f3"
      />
      
      {/* Accent lights for depth - pink/magenta theme */}
      <pointLight position={[-10, -20, -10]} color="#ec4899" intensity={3} distance={30} />
      <pointLight position={[10, -40, -5]} color="#a78bfa" intensity={2} distance={25} />
      <pointLight position={[-5, -60, 5]} color="#f472b6" intensity={2} distance={25} />
      
      {/* Rim light for edge definition */}
      <spotLight
        position={[0, 10, -10]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#fdf4ff"
      />
    </>
  );
}

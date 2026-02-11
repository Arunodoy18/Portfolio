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
      
      {/* Fill light - softer from opposite side with cool tint */}
      <directionalLight 
        position={[-5, 5, 5]} 
        intensity={0.5} 
        color="#e0f7ff"
      />
      
      {/* Accent lights for depth - Valorant red/cyan theme */}
      <pointLight position={[-10, -20, -10]} color="#ff4655" intensity={3} distance={30} />
      <pointLight position={[10, -40, -5]} color="#00e5ff" intensity={2} distance={25} />
      <pointLight position={[-5, -60, 5]} color="#1fb6ff" intensity={2} distance={25} />
      
      {/* Gojo energy light on hero */}
      <pointLight position={[2.5, 1, 3]} color="#00e5ff" intensity={4} distance={12} />
      
      {/* Rim light for edge definition */}
      <spotLight
        position={[0, 10, -10]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#e8f4ff"
      />
    </>
  );
}

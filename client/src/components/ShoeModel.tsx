import React, { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Ensure THREE objects are extended
extend({ MeshPhysicalMaterial: THREE.MeshPhysicalMaterial });

type ShoeGLTF = {
  nodes: Record<string, THREE.Mesh>;
};

interface ShoeModelProps {
  colors: { [key: string]: string };
  materials: {
    normalMap?: string;
    roughness?: number;
    metallic?: boolean;
    translucent?: boolean;
  };
}

const ShoeModel: React.FC<ShoeModelProps> = ({ colors, materials }) => {
  const { nodes } = useGLTF("/models/sneaker_high.gltf") as unknown as ShoeGLTF;

  // Ensure nodes exist
  if (!nodes || !nodes.shoe) {
    console.warn("Shoe model not loaded correctly.");
    return null;
  }

  const normalMap = materials.normalMap
    ? new THREE.TextureLoader().load(materials.normalMap)
    : null;

  const createMaterial = (baseColor: string) =>
    new THREE.MeshPhysicalMaterial({
      color: baseColor,
      roughness: materials.roughness ?? 0.4,
      metalness: materials.metallic ? 0.7 : 0,
      normalMap: normalMap ?? undefined,
      transparent: !!materials.translucent,
      transmission: materials.translucent ? 0.8 : 0,
    });

  return (
    <mesh
      geometry={nodes.shoe.geometry}
      material={createMaterial(colors.shoe)}
    />
  );
};

const ShoeModelScene: React.FC<ShoeModelProps> = (props) => {
  return (
    <Canvas>
      <Suspense fallback={<p>Loading Model...</p>}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <ShoeModel {...props} />
      </Suspense>
    </Canvas>
  );
};

export default ShoeModelScene;

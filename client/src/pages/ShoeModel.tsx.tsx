import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { Loader } from "lucide-react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
<<<<<<< HEAD
import { API_URLS } from "@/lib/api";
=======
>>>>>>> c6cae2b (Save current Hueify updates)

interface ApiResponse {
  history: string[];
  message?: string;
}



type ShoeGLTF = {
  nodes: {
    Object_2: THREE.Mesh;
  };
};

function ShoeModel({ color }: { color: string }) {
  const { nodes } = useGLTF("/models/Shoe.glb") as unknown as ShoeGLTF;
  const material = new MeshStandardMaterial({ color });

  return (
    <group dispose={null} scale={[1, 1, 1]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry} // Adjust according to your model
        material={material}
      />
    </group>
  );
}

export default function ShoeModelPage() {
  const [color, setColor] = useState<string>("#ffffff");
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
<<<<<<< HEAD
        const res = await fetch(API_URLS.user.getHistory);
=======
        const res = await fetch("/api/user/get-history");
>>>>>>> c6cae2b (Save current Hueify updates)
        const data: ApiResponse = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching color history");
        setColors(data.history);
      } catch (error) {
        console.error(error);
      }
    };
    fetchColors();
  }, []);

  return (
    <Layout>
      <div className="relative w-screen h-[calc(100vh-4rem)]">
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Loader className="size-8 animate-spin" /></div>}>
          <Canvas camera={{ position: [0, 1, 5], fov: 50 }} style={{ height: "100%", width: "100%" }}>
            <color attach="background" args={["#101010"]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Stage environment="city" intensity={0.6}>
              <ShoeModel color={color} />
            </Stage>
            <OrbitControls enableZoom enablePan enableRotate maxPolarAngle={Math.PI / 2} />
          </Canvas>
        </Suspense>

        {/* Color Picker */}
        {colors.length > 0 && (
          <div className="fixed bottom-4 left-4 p-4 rounded-lg backdrop-blur-md bg-gray-100/10 space-y-2 shadow-md">
            <h2 className="text-lg font-semibold text-white text-center">My Shoe Colors</h2>
            <div className="flex justify-between items-center">
              <Input id="colorPicker" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-1/2 rounded-lg border-none cursor-pointer" />
              <span className="font-semibold">{color}</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color, index) => (
                <div key={index} onClick={() => setColor(color)} style={{ backgroundColor: color }} className="cursor-pointer w-8 h-8 rounded-full hover:scale-110 duration-200 border border-gray-700" />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}




useGLTF.preload("/models/Shoe.glb");



// import { useGLTF } from "@react-three/drei";
// import { useEffect } from "react";
// import { MeshStandardMaterial } from "three";

// export default function ShoeModel({ color }: { color: string }) {
//   const { nodes } = useGLTF("/models/Shoe.glb") as any;

//   useEffect(() => {
//     console.log("Loaded nodes:", nodes); // Log nodes to inspect their names
//   }, [nodes]);

//   const material = new MeshStandardMaterial({ color });

//   return (
//     <group dispose={null} scale={[1, 1, 1]}>
//       {Object.keys(nodes).map((nodeKey) => (
//         <mesh
//           key={nodeKey}
//           geometry={nodes[nodeKey]?.geometry} // Apply the correct geometry
//           material={material}
//         />
//       ))}
//     </group>
//   );
// }

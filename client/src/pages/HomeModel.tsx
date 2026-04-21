///correct code with simple colors

// import { Suspense, useEffect, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
// import { MeshStandardMaterial } from "three";
// import { Loader } from "lucide-react";
// import Layout from "@/components/Layout";
// import { Input } from "@/components/ui/input";

// interface ApiResponse {
//   history: string[];
//   message?: string;
// }

// function HomeModel({ color }: { color: string }) {
//   const { nodes } = useGLTF("/models/Home.glb") as any;
//   const material = new MeshStandardMaterial({ color });

//   return (
//     <group dispose={null} scale={[1, 1, 1]}>
//       {Object.entries(nodes).map(([key, node]: any) => (
//         node.isMesh ? (
//           <mesh
//             key={key}
//             geometry={node.geometry}
//             material={material}
//           />
//         ) : null
//       ))}
//     </group>
//   );
// }

// export default function HomeModelPage() {
//   const [color, setColor] = useState<string>("#ffffff");
//   const [colors, setColors] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchColors = async () => {
//       try {
//         const res = await fetch("/api/user/get-history");
//         const data: ApiResponse = await res.json();
//         if (!res.ok) throw new Error(data.message || "Error fetching color history");
//         setColors(data.history);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchColors();
//   }, []);

//   return (
//     <Layout>
//       <div className="relative w-screen h-[calc(100vh-4rem)]">
//         <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Loader className="size-8 animate-spin" /></div>}>
//           <Canvas camera={{ position: [0, 1, 5], fov: 50 }} style={{ height: "100%", width: "100%" }}>
//             <color attach="background" args={["#101010"]} />
//             <ambientLight intensity={0.6} />
//             <directionalLight position={[10, 10, 5]} intensity={1} />
//             <Stage environment="city" intensity={0.6}>
//               <HomeModel color={color} />
//             </Stage>
//             <OrbitControls enableZoom enablePan enableRotate maxPolarAngle={Math.PI / 2} />
//           </Canvas>
//         </Suspense>

//         {/* Color  Picker */}
//         {colors.length > 0 && (
//           <div className="fixed bottom-4 left-4 p-4 rounded-lg backdrop-blur-md bg-gray-100/10 space-y-2 shadow-md">
//             <h2 className="text-lg font-semibold text-white text-center">My Home Colors</h2>
//             <div className="flex justify-between items-center">
//               <Input id="colorPicker" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-1/2 rounded-lg border-none cursor-pointer" />
//               <span className="font-semibold">{color}</span>
//             </div>
//             <div className="grid grid-cols-6 gap-2">
//               {colors.map((color, index) => (
//                 <div key={index} onClick={() => setColor(color)} style={{ backgroundColor: color }} className="cursor-pointer w-8 h-8 rounded-full hover:scale-110 duration-200 border border-gray-700" />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }

// useGLTF.preload("/models/Home.glb");







//// correct code with different colors ............





// import { Suspense, useEffect, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { MeshReflectorMaterial, OrbitControls, Stage, useGLTF } from "@react-three/drei";
// import { MeshStandardMaterial } from "three";
// import { Loader } from "lucide-react";
// import Layout from "@/components/Layout";
// import Configurator from "@/components/Configurator";
// import { CustomizationProvider } from "@/components/Customization";

// interface ApiResponse {
//   history: string[];
//   message?: string;
// }

// function HomeModel({ colors }: { colors: { walls: string; roof: string; doors: string } }) {
//   const { nodes } = useGLTF("/models/Home.glb") as any;

//   const wallMaterial = new MeshStandardMaterial({ color: colors.walls });
//   const roofMaterial = new MeshStandardMaterial({ color: colors.roof });
//   const doorMaterial = new MeshStandardMaterial({ color: colors.doors });

//   return (
//     <group dispose={null} scale={[1, 1, 1]}>
//       {nodes &&
//         Object.entries(nodes).map(([key, node]: any) => {
//           let material = wallMaterial;
//           if (key.toLowerCase().includes("roof")) material = roofMaterial;
//           if (key.toLowerCase().includes("door")) material = doorMaterial;
//           return node.isMesh ? <mesh key={key} geometry={node.geometry} material={material} /> : null;
//         })}
//     </group>
//   );
// }

// export default function HomeModelPage() {
//   const [colors, setColors] = useState({ walls: "#ffffff", roof: "#ff0000", doors: "#000000" });
//   const [savedColors, setSavedColors] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchColors = async () => {
//       try {
//         const res = await fetch("/api/user/get-history");
//         const data: ApiResponse = await res.json();
//         if (!res.ok) throw new Error(data.message || "Error fetching color history");

//         // Validate and filter colors to ensure proper hex format
//         const validColors = data.history.filter(color => /^#[0-9A-Fa-f]{6}$/.test(color));
//         setSavedColors(validColors);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchColors();
//   }, []);

//   return (
//     <Layout>
//       <CustomizationProvider>
//         <div className="w-screen h-[calc(100vh-4rem)]">
//           <Suspense
//             fallback={
//               <div className="h-screen w-screen flex items-center justify-center backdrop-invert-0">
//                 <Loader className="size-8 animate-spin" />
//               </div>
//             }
//           >
//             <Canvas>
//               <color attach="background" args={["#101010"]} />
//               <fog attach="fog" args={["#101010", 10, 30]} />
//               <OrbitControls maxPolarAngle={Math.PI / 2} />
//               <Stage environment="city" intensity={0.6} contactShadow={false}>
//                 <Suspense fallback={null}>
//                   <HomeModel colors={colors} />
//                 </Suspense>
//               </Stage>
//               <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-0.5}>
//                 <planeGeometry args={[170, 170]} />
//                 <MeshReflectorMaterial
//                   blur={[300, 100]}
//                   resolution={2048}
//                   mixBlur={1}
//                   mixStrength={40}
//                   roughness={1}
//                   depthScale={1.2}
//                   minDepthThreshold={0.4}
//                   maxDepthThreshold={1.4}
//                   color="#101010"
//                   metalness={0.5}
//                 />
//               </mesh>
//             </Canvas>
//             <Configurator onColorChange={setColors} />

//             {savedColors.length > 0 && (
//               <div className="fixed bottom-4 w-1/3 mx-3 backdrop-blur-sm space-y-2">
//                 <h2 className="text-xl text-center font-semibold text-gray-200">My Home Colors</h2>
//                 <div className="grid grid-cols-6 grid-rows-2 gap-2 h-20">
//                   {savedColors.map((color, index) => (
//                     <div
// //                       key={index}
//                       onClick={() => {
//                         if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
//                           setColors({ ...colors, walls: color });
//                         } else {
//                           console.error("Invalid color:", color);
//                         }
//                       }}
//                       style={{ backgroundColor: color }}
//                       className="cursor-pointer rounded-lg text-transparent hover:text-white hover:scale-110 duration-200"
//                     >
//                       {color}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </Suspense>
//         </div>
//       </CustomizationProvider>
//     </Layout>
//   );
// }

// useGLTF.preload("/models/Home.glb");


import { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { Loader } from "lucide-react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";

interface ApiResponse {
  history: string[];
  message?: string;
}

type HomeGLTF = {
  nodes: Record<string, THREE.Object3D>;
};

function HomeModel({
  colorsMap,
  setSelectedPart,
}: {
  colorsMap: Record<string, string>;
  setSelectedPart: (part: string) => void;
}) {
  const { nodes } = useGLTF("/models/Home.glb") as unknown as HomeGLTF;
  const materialsRef = useRef<Record<string, MeshStandardMaterial>>({});

  // Create or update materials
  useMemo(() => {
    Object.entries(nodes).forEach(([key, node]) => {
      if (node instanceof THREE.Mesh) {
        materialsRef.current[key] =
          materialsRef.current[key] || new MeshStandardMaterial();
        materialsRef.current[key].color.set(colorsMap[key] || "#ffffff");
      }
    });
  }, [colorsMap, nodes]);

  return (
    <group dispose={null} scale={[1, 1, 1]}>
      {Object.entries(nodes).map(([key, node]) =>
        node instanceof THREE.Mesh ? (
          <mesh
            key={key}
            geometry={node.geometry}
            material={materialsRef.current[key]}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPart(key);
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "auto")}
          />
        ) : null
      )}
    </group>
  );
}

export default function HomeModelPage() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [colorsMap, setColorsMap] = useState<Record<string, string>>({});
  const [colorsHistory, setColorsHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/user/get-history");
        const data: ApiResponse = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching color history");
        setColorsHistory(data.history || []);
      } catch (error) {
        console.error("Failed to load color history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchColors();
  }, []);

  const handleColorChange = (color: string) => {
    if (!selectedPart) return;

    setColorsMap(prev => ({
      ...prev,
      [selectedPart]: color
    }));

    // Update color history - fixed version
    setColorsHistory(prev => {
      const updatedHistory = Array.from(new Set([color, ...prev]));
      return updatedHistory.slice(0, 18); // Keep only last 18 unique colors
    });
  };

  return (
    <Layout>
      <div className="relative w-screen h-[calc(100vh-4rem)]">
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Loader className="size-8 animate-spin" /></div>}>
          <Canvas camera={{ position: [0, 1, 5], fov: 50 }} style={{ height: "100%", width: "100%" }}>
            <color attach="background" args={["#101010"]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Stage environment="city" intensity={0.6}>
              <HomeModel colorsMap={colorsMap} setSelectedPart={setSelectedPart} />
            </Stage>
            <OrbitControls enableZoom enablePan enableRotate maxPolarAngle={Math.PI / 2} />
          </Canvas>
        </Suspense>

        {/* Control Panel */}
        <div className="fixed bottom-4 left-4 p-6 rounded-xl backdrop-blur-lg bg-gray-900/80 border border-gray-700/50 shadow-2xl space-y-4 w-80 transition-all duration-300 hover:border-gray-600/50">
          {/* Header Section */}
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold text-white">
              {selectedPart ? `Editing ${selectedPart}` : "Material Editor"}
            </h2>
            <p className="text-sm text-gray-400">
              {selectedPart ? "Click color swatches to apply" : "Select a component from the 3D model"}
            </p>
          </div>

          {/* Color Picker Section */}
          {selectedPart && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Input
                    id="colorPicker"
                    type="color"
                    value={colorsMap[selectedPart] || "#ffffff"}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-full h-12 rounded-lg border-2 border-gray-600/50 cursor-pointer bg-gray-800 hover:border-primary-400 transition-colors"
                  />
                  <div className="absolute inset-0 pointer-events-none flex items-center px-4">
                    <span className="text-sm font-mono text-white/80">
                      {colorsMap[selectedPart]?.toUpperCase() || "#FFFFFF"}
                    </span>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: colorsMap[selectedPart] || "#ffffff" }}
                  className="h-12 w-12 rounded-lg border-2 border-gray-600/50 shadow-sm"
                />
              </div>

              <button
                onClick={() => setSelectedPart(null)}
                className="w-full py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          )}

          {/* History Section */}
          <div className="pt-4 border-t border-gray-700/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-300">Recent Colors</h3>
              <span className="text-xs text-gray-500">
                {colorsHistory.length} colors
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-6 gap-2 animate-pulse">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-gray-700/50" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-2">
                {colorsHistory.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => selectedPart && handleColorChange(color)}
                    style={{ backgroundColor: color }}
                    className="group relative cursor-pointer h-8 w-8 rounded-full hover:scale-110 transition-transform duration-200 border-2 border-gray-600/50 hover:border-white/30"
                    title={color}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-4 h-4 text-white/80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

useGLTF.preload("/models/Home.glb");

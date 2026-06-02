import React, { Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, Environment, Html, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const includesTarget = (materialName, meshName, targets = []) =>
  targets.some((target) => {
    const search = target.toLowerCase();
    return materialName.includes(search) || meshName.includes(search);
  });

const createDetailTexture = (sourceTexture) => {
  const image = sourceTexture?.image;
  const width = image?.naturalWidth || image?.videoWidth || image?.width;
  const height = image?.naturalHeight || image?.videoHeight || image?.height;

  if (!image || !width || !height) {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  for (let index = 0; index < pixels.length; index += 4) {
    const luma = pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114;
    const detail = Math.max(0, Math.min(255, (luma - 128) * 1.25 + 150));

    pixels[index] = detail;
    pixels[index + 1] = detail;
    pixels[index + 2] = detail;
  }

  context.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = sourceTexture.flipY;
  texture.wrapS = sourceTexture.wrapS;
  texture.wrapT = sourceTexture.wrapT;
  texture.repeat.copy(sourceTexture.repeat);
  texture.offset.copy(sourceTexture.offset);
  texture.needsUpdate = true;

  return texture;
};

function LoadedModel({
  color = "#FFFFFF",
  colorRules = [],
  meshColors = {},
  onSelectMesh,
  selectedMeshName,
  selectable = false,
  solidColorMode = "standard",
  solidColorTargets = [],
  targetMaterials = [],
  textureTargets = [],
  textureUrl = "null",
  url,
}) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const solidTargets = solidColorTargets.map((name) => name.toLowerCase());
    const targets = targetMaterials.map((name) => name.toLowerCase());
    const rules = colorRules.map((rule) => ({
      color: rule.color,
      targets: rule.targets.map((target) => target.toLowerCase()),
    }));
    const texture =
      textureUrl && textureUrl !== "null" ? new THREE.TextureLoader().load(textureUrl) : null;

    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
    }

    model.traverse((child) => {
      if (!child.isMesh || !child.material) {
        return;
      }

      const materials = Array.isArray(child.material) ? child.material : [child.material];
      const nextMaterials = materials.map((material) => {
        const clone = material.clone();
        const materialName = clone.name?.toLowerCase() || "";
        const meshName = child.name?.toLowerCase() || "";
        const matchingRule = rules.find((rule) =>
          includesTarget(materialName, meshName, rule.targets)
        );
        const meshColor = meshColors[child.name];
        const shouldUseDefaultColor =
          rules.length === 0 &&
          (targets.length === 0 || includesTarget(materialName, meshName, targets));
        const shouldUseSolidColor =
          solidTargets.length > 0 && includesTarget(materialName, meshName, solidTargets);
        const shouldUseTexture =
          texture && includesTarget(materialName, meshName, textureTargets);
        const isTextureTarget = includesTarget(materialName, meshName, textureTargets);

        if (meshColor && clone.color) {
          clone.color = new THREE.Color(meshColor);
        } else if (matchingRule && clone.color) {
          clone.color = new THREE.Color(matchingRule.color);
        } else if (shouldUseDefaultColor && clone.color) {
          clone.color = new THREE.Color(color);
        }

        if (shouldUseSolidColor) {
          if (solidColorMode === "flat") {
            const solidMaterial = new THREE.MeshBasicMaterial({
              color: new THREE.Color(color),
              side: clone.side,
              transparent: clone.transparent,
              opacity: clone.opacity,
            });
            solidMaterial.toneMapped = false;
            return solidMaterial;
          }

          const detailTexture =
            solidColorMode === "detailed" ? createDetailTexture(clone.map) : null;

          clone.map = detailTexture;
          clone.color = new THREE.Color(color);
          clone.metalness = 0;
          clone.roughness = 0.82;
          clone.toneMapped = false;
        } else if (shouldUseTexture) {
          clone.map = texture;
          if (clone.color) {
            clone.color = new THREE.Color("#FFFFFF");
          }
        } else if (isTextureTarget) {
          clone.map = null;
        }

        clone.needsUpdate = true;
        return clone;
      });

      child.material = Array.isArray(child.material) ? nextMaterials : nextMaterials[0];
      child.castShadow = true;
      child.receiveShadow = true;
      if (selectable) {
        child.userData.originalScale = child.userData.originalScale || child.scale.clone();
        if (selectedMeshName === child.name) {
          child.scale.set(
            child.userData.originalScale.x * 1.015,
            child.userData.originalScale.y * 1.015,
            child.userData.originalScale.z * 1.015
          );
        } else if (child.userData.originalScale) {
          child.scale.copy(child.userData.originalScale);
        }
      }
    });
  }, [color, colorRules, meshColors, model, onSelectMesh, selectable, selectedMeshName, solidColorMode, solidColorTargets, targetMaterials, textureTargets, textureUrl]);

  useFrame((_, delta) => {
    model.rotation.y += delta * 0.08;
  });

  return (
    <primitive
      object={model}
      onPointerDown={
        selectable
          ? (event) => {
              event.stopPropagation();
              if (event.object?.name) {
                onSelectMesh?.(event.object.name);
              }
            }
          : undefined
      }
    />
  );
}

export default function ModelViewer({
  color,
  colorRules,
  meshColors,
  onSelectMesh,
  selectedMeshName,
  selectable,
  solidColorMode,
  solidColorTargets,
  targetMaterials,
  textureTargets,
  textureUrl,
  url,
}) {
  return (
    <div className="h-[min(70svh,22rem)] overflow-hidden rounded-3xl border border-white/10 bg-[#090612] shadow-2xl shadow-black/40 sm:h-[min(72svh,30rem)] lg:h-[min(76svh,34rem)] lg:rounded-[2rem]">
      <Canvas shadows camera={{ position: [4, 3, 6], fov: 45 }}>
        <color attach="background" args={["#090612"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 6, 5]} intensity={2.5} castShadow />
        <spotLight position={[-4, 5, 3]} angle={0.35} penumbra={1} intensity={1.5} />
        <Suspense
          fallback={
            <Html center>
              <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                Loading model...
              </div>
            </Html>
          }
        >
          <Bounds fit clip observe margin={1.25}>
            <Center>
              <LoadedModel
                color={color}
                colorRules={colorRules}
                meshColors={meshColors}
                onSelectMesh={onSelectMesh}
                selectedMeshName={selectedMeshName}
                selectable={selectable}
                solidColorMode={solidColorMode}
                solidColorTargets={solidColorTargets}
                targetMaterials={targetMaterials}
                textureTargets={textureTargets}
                textureUrl={textureUrl}
                url={url}
              />
            </Center>
          </Bounds>
          <Environment preset="city" />
          <ContactShadows position={[0, -1.2, 0]} opacity={0.45} scale={10} blur={2.5} far={5} />
        </Suspense>
        <OrbitControls makeDefault enablePan={false} minDistance={2} maxDistance={12} />
      </Canvas>
    </div>
  );
}

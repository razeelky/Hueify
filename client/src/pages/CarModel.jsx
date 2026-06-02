import React, { useState } from "react";
import HistoryColorSelect from "@/components/HistoryColorSelect";
import ModelViewer from "@/components/ModelViewer";

const wrapMaterials = [
  { label: "None", value: "null", preview: "#FFFFFF" },
  { label: "Galaxy", value: "/galaxyMaterial.png", image: "/galaxyMaterial.png" },
  { label: "Neo", value: "/material1.png", image: "/material1.png" },
  { label: "Steel", value: "/material2.jpg", image: "/material2.jpg" },
  { label: "Carbon", value: "/material3.jpg", image: "/material3.jpg" },
  { label: "Solar", value: "/material8.webp", image: "/material8.webp" },
];

function ColorControl({ label, onChange, value }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span>
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {value}
        </span>
      </span>
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
        aria-label={`Change ${label}`}
      />
    </label>
  );
}

export default function CarModel() {
  const [bodyColor, setBodyColor] = useState("#8B5CF6");
  const [interiorColor, setInteriorColor] = useState("#111827");
  const [rimsColor, setRimsColor] = useState("#E5E7EB");
  const [accessoriesColor, setAccessoriesColor] = useState("#0F172A");
  const [wrap, setWrap] = useState("null");

  const colorRules = [
    { color: bodyColor, targets: ["paint", "coloured"] },
    { color: interiorColor, targets: ["interior", "driver", "seat"] },
    { color: rimsColor, targets: ["bespoke", "rotor", "spoke"] },
    { color: accessoriesColor, targets: ["carbon", "grille", "engine", "base"] },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="mb-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            3D Studio
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            3D Car Model
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Rotate, zoom, and customize the McLaren paint, rims, interior, accessories, and wrap.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/25 backdrop-blur sm:p-5 xl:sticky xl:top-24 xl:self-start">
          <div>
            <h2 className="text-lg font-bold text-foreground">Customize</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick colors for each visible section.
            </p>
          </div>

          <ColorControl label="Body" value={bodyColor} onChange={setBodyColor} />
          <ColorControl label="Interior" value={interiorColor} onChange={setInteriorColor} />
          <ColorControl label="Rims" value={rimsColor} onChange={setRimsColor} />
          <ColorControl label="Accessories" value={accessoriesColor} onChange={setAccessoriesColor} />

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Car Wrap
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2">
              {wrapMaterials.map((material) => (
                <button
                  type="button"
                  key={material.value}
                  onClick={() => setWrap(material.value)}
                  className={`overflow-hidden rounded-2xl border p-1 text-left transition hover:-translate-y-0.5 ${
                    wrap === material.value
                      ? "border-primary bg-primary/15"
                      : "border-white/10 bg-white/5"
                  }`}
                  title={material.label}
                >
                  <span
                    className="block h-12 rounded-xl bg-cover bg-center"
                    style={
                      material.image
                        ? { backgroundImage: `url(${material.image})` }
                        : { backgroundColor: material.preview }
                    }
                  />
                  <span className="mt-2 block truncate px-1 pb-1 text-xs font-semibold text-foreground">
                    {material.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <ModelViewer
            colorRules={colorRules}
            textureTargets={["paint", "coloured"]}
            textureUrl={wrap}
            url="/models/mclaren720.gltf"
          />

          <HistoryColorSelect
            title="Choose body color from history"
            onSelect={setBodyColor}
          />
        </div>
      </div>
    </section>
  );
}

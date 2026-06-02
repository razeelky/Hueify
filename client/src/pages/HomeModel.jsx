import React, { useState } from "react";
import HistoryColorSelect from "@/components/HistoryColorSelect";
import ModelViewer from "@/components/ModelViewer";

export default function HomeModelPage() {
  const [color, setColor] = useState("#F59E0B");
  const [baseColor, setBaseColor] = useState("#F59E0B");
  const [selectedPart, setSelectedPart] = useState("");
  const [partColors, setPartColors] = useState({});

  const updateColor = (nextColor) => {
    setColor(nextColor);
    if (selectedPart) {
      setPartColors((current) => ({
        ...current,
        [selectedPart]: nextColor,
      }));
    } else {
      setBaseColor(nextColor);
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            3D Studio
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            3D Home Model
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Explore the home model with orbit controls and a warm material tint.
          </p>
        </div>

        <label className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:w-auto">
          <span className="text-sm font-semibold text-foreground">Tint color</span>
          <input
            type="color"
            value={color}
            onChange={(event) => updateColor(event.target.value)}
            className="h-10 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
            aria-label="Change home model tint"
          />
        </label>
      </div>

      <div className="grid gap-6 grid-cols-[minmax(0,1fr)_18rem]">
        <ModelViewer
          color={baseColor}
          meshColors={partColors}
          onSelectMesh={setSelectedPart}
          selectedMeshName={selectedPart}
          selectable
          url="/models/Home.glb"
        />
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/25 backdrop-blur sm:p-5 sticky top-24 self-start">
          <h2 className="text-lg font-bold text-foreground">House Tools</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Click any visible part of the house, then use a color or history swatch to paint that section.
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Selected part
            </span>
            <span className="mt-1 block text-sm font-semibold text-foreground">
              {selectedPart || "Click a part of the house model"}
            </span>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-3">
            {["#F59E0B", "#E5E7EB", "#94A3B8", "#A16207", "#22C55E", "#06B6D4", "#8B5CF6", "#EF4444"].map((preset) => (
              <button
                type="button"
                key={preset}
                onClick={() => updateColor(preset)}
                className={`h-12 rounded-2xl border transition hover:scale-105 ${
                  color === preset ? "border-primary" : "border-white/10"
                }`}
                style={{ backgroundColor: preset }}
                aria-label={`Use ${preset} house tint`}
              />
            ))}
          </div>
          <div className="mt-5">
            <HistoryColorSelect onSelect={updateColor} />
          </div>
        </div>
      </div>
    </section>
  );
}

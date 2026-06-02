import React, { useState } from "react";
import HistoryColorSelect from "@/components/HistoryColorSelect";
import ModelViewer from "@/components/ModelViewer";

export default function TshirtModel() {
  const [color, setColor] = useState("#F8FAFC");

  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            3D Studio
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            3D T-Shirt
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Try different fabric colors and inspect the model from every angle.
          </p>
        </div>

        <label className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:w-auto">
          <span className="text-sm font-semibold text-foreground">Fabric color</span>
          <input
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            className="h-10 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
            aria-label="Change T-shirt color"
          />
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <ModelViewer color={color} url="/models/Tshirt.glb" />
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/25 backdrop-blur sm:p-5 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-lg font-bold text-foreground">T-shirt Tools</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Use the color control above to test fabric looks, then orbit the model to inspect the fit and folds.
          </p>
          <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-8 lg:grid-cols-4">
            {["#F8FAFC", "#111827", "#EF4444", "#22D3EE", "#8B5CF6", "#F59E0B", "#22C55E", "#EC4899"].map((preset) => (
              <button
                type="button"
                key={preset}
                onClick={() => setColor(preset)}
                className={`h-12 rounded-2xl border transition hover:scale-105 ${
                  color === preset ? "border-primary" : "border-white/10"
                }`}
                style={{ backgroundColor: preset }}
                aria-label={`Use ${preset} T-shirt color`}
              />
            ))}
          </div>
          <div className="mt-5">
            <HistoryColorSelect onSelect={setColor} />
          </div>
        </div>
      </div>
    </section>
  );
}

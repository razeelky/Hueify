import React, { useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, Droplets, Save, Shuffle } from "lucide-react";
import { API_URLS } from "@/lib/api";
import { getColorName, saveRecentColor } from "@/lib/colorNames";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizeHex = (value) => {
  const clean = value.replace(/[^0-9a-f]/gi, "").slice(0, 6);
  return `#${clean.padEnd(6, "0")}`.toUpperCase();
};

const hexToRgb = (hex) => {
  const value = normalizeHex(hex).slice(1);
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
};

const rgbToHex = ({ r, g, b }) =>
  `#${[r, g, b]
    .map((channel) => clamp(channel, 0, 255).toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase();

const rgbToHsl = ({ r, g, b }) => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(lightness * 100) };
  }

  const delta = max - min;
  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue;

  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  return {
    h: Math.round(hue * 60),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
};

const hslToRgb = ({ h, s, l }) => {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const hue = h / 60;
  const x = chroma * (1 - Math.abs((hue % 2) - 1));
  const match = lightness - chroma / 2;
  let rgb = [0, 0, 0];

  if (hue >= 0 && hue < 1) rgb = [chroma, x, 0];
  else if (hue < 2) rgb = [x, chroma, 0];
  else if (hue < 3) rgb = [0, chroma, x];
  else if (hue < 4) rgb = [0, x, chroma];
  else if (hue < 5) rgb = [x, 0, chroma];
  else rgb = [chroma, 0, x];

  return {
    r: Math.round((rgb[0] + match) * 255),
    g: Math.round((rgb[1] + match) * 255),
    b: Math.round((rgb[2] + match) * 255),
  };
};

const createPalette = (hex) => {
  const hsl = rgbToHsl(hexToRgb(hex));
  const colors = [
    { label: "Soft", h: hsl.h, s: clamp(hsl.s - 10, 0, 100), l: clamp(hsl.l + 24, 0, 100) },
    { label: "Base", h: hsl.h, s: hsl.s, l: hsl.l },
    { label: "Deep", h: hsl.h, s: clamp(hsl.s + 8, 0, 100), l: clamp(hsl.l - 22, 0, 100) },
    { label: "Accent", h: (hsl.h + 35) % 360, s: clamp(hsl.s + 12, 0, 100), l: clamp(hsl.l + 4, 0, 100) },
    { label: "Contrast", h: (hsl.h + 180) % 360, s: hsl.s, l: clamp(hsl.l + 8, 0, 100) },
  ];

  return colors.map((color) => ({
    label: color.label,
    hex: rgbToHex(hslToRgb(color)),
  }));
};

export default function ColorPicker() {
  const [hex, setHex] = useState("#8B5CF6");
  const [copied, setCopied] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const normalizedHex = normalizeHex(hex);
  const rgb = useMemo(() => hexToRgb(normalizedHex), [normalizedHex]);
  const hsl = useMemo(() => rgbToHsl(rgb), [rgb]);
  const colorName = useMemo(() => getColorName(normalizedHex), [normalizedHex]);
  const palette = useMemo(
    () =>
      createPalette(normalizedHex).map((color) => ({
        ...color,
        name: getColorName(color.hex),
      })),
    [normalizedHex]
  );

  useEffect(() => {
    saveRecentColor(normalizedHex);
  }, [normalizedHex]);

  const copyColor = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(""), 1200);
    } catch {
      setMessage("Could not copy this color in your browser.");
    }
  };

  const saveColor = async (value = normalizedHex) => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(API_URLS.user.colorHistory, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ hex: value }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || data.error || "Could not save color.");
      }

      setMessage(`${value} saved to your color history.`);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const randomize = () => {
    const next = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
    setHex(`#${next}`.toUpperCase());
    setMessage("");
  };

  const downloadColorInfo = () => {
    const lines = [
      `Color Name: ${colorName}`,
      `HEX: ${normalizedHex}`,
      `RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      `HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      "",
      "Generated Palette:",
      ...palette.map((color) => `${color.label}: ${color.name} ${color.hex}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${colorName.toLowerCase().replace(/\s+/g, "-") || "color"}-${normalizedHex.slice(1)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
          Color Studio
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Color Picker
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Pick a color, generate a balanced palette, copy values, and save your favorites.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6 rounded-[2rem]">
          <div
            className="mb-6 flex min-h-56 items-end rounded-[1.5rem] p-4 shadow-inner sm:min-h-72 sm:p-6"
            style={{ backgroundColor: normalizedHex }}
          >
            <div className="rounded-2xl bg-black/35 px-4 py-3 text-white backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Selected</p>
              <p className="text-lg font-bold">{colorName}</p>
              <p className="text-2xl font-black sm:text-3xl">{normalizedHex}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[7rem_1fr]">
            <label className="group flex h-20 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <input
                type="color"
                value={normalizedHex}
                onChange={(event) => {
                  setHex(event.target.value);
                  setMessage("");
                }}
                className="h-24 w-32 cursor-pointer border-0 bg-transparent"
                aria-label="Pick a color"
              />
            </label>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                HEX value
              </label>
              <input
                value={hex}
                onChange={(event) => {
                  setHex(normalizeHex(event.target.value));
                  setMessage("");
                }}
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-base font-semibold uppercase text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
                placeholder="#8B5CF6"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={() => copyColor(normalizedHex)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-foreground transition hover:bg-white/10"
            >
              {copied === normalizedHex ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              Copy HEX
            </button>
            <button
              type="button"
              onClick={() => saveColor()}
              disabled={saving}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 px-5 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Color"}
            </button>
            <button
              type="button"
              onClick={randomize}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-foreground transition hover:bg-white/10"
            >
              <Shuffle className="h-4 w-4" />
              Random
            </button>
            <button
              type="button"
              onClick={downloadColorInfo}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-foreground transition hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              Download Info
            </button>
          </div>

          {message && (
            <p className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground">
              {message}
            </p>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6 lg:rounded-[2rem]">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Droplets className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-foreground">Color Values</h2>
                <p className="text-sm text-muted-foreground">Copy exact values for your designs.</p>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                ["NAME", colorName],
                ["HEX", normalizedHex],
                ["RGB", `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`],
                ["HSL", `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`],
              ].map(([label, value]) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => copyColor(value)}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
                >
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="break-all font-semibold text-foreground">{value}</span>
                  </span>
                  {copied === value ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6 lg:rounded-[2rem]">
            <h2 className="text-xl font-bold text-foreground">Generated Palette</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A ready-to-use mix of soft, deep, accent, and contrast colors.
            </p>

            <div className="mt-5 grid gap-3 grid-cols-5">
              {palette.map((color) => (
                <button
                  type="button"
                  key={`${color.label}-${color.hex}`}
                  onClick={() => copyColor(color.hex)}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <span
                    className="block h-24"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="block p-3">
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      {color.label}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-foreground">
                      {color.name}
                    </span>
                    <span className="mt-1 block text-sm font-bold text-foreground">
                      {color.hex}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

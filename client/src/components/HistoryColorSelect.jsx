import React, { useEffect, useState } from "react";
import { API_URLS } from "@/lib/api";
import { getColorName, getRecentColors, normalizeHex } from "@/lib/colorNames";

export default function HistoryColorSelect({ onSelect, title = "Choose from history" }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    let mounted = true;

    const loadColors = async () => {
      const recent = getRecentColors().map((color) => normalizeHex(color.hex));
      let saved = [];

      try {
        const response = await fetch(API_URLS.user.getHistory, {
          credentials: "include",
        });
        const data = await response.json().catch(() => ({}));
        if (response.ok) {
          saved = data.history || [];
        }
      } catch {
        saved = [];
      }

      const unique = [...new Set([...recent, ...saved.map(normalizeHex)])].slice(0, 12);
      if (mounted) {
        setColors(unique);
      }
    };

    loadColors();
    return () => {
      mounted = false;
    };
  }, []);

  if (colors.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </h3>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6">
        {colors.map((hex) => (
          <button
            type="button"
            key={hex}
            onClick={() => onSelect(hex)}
            className="h-9 rounded-xl border border-white/15 shadow-sm transition hover:scale-110"
            style={{ backgroundColor: hex }}
            title={`${getColorName(hex)} ${hex}`}
            aria-label={`Use ${getColorName(hex)} ${hex}`}
          />
        ))}
      </div>
    </div>
  );
}

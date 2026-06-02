import React, { useEffect, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { API_URLS } from "@/lib/api";
import { getColorName, getRecentColors, normalizeHex } from "@/lib/colorNames";

function ColorCard({ color, copied, onCopy }) {
  const hex = normalizeHex(typeof color === "string" ? color : color.hex);
  const name = typeof color === "string" ? getColorName(hex) : color.name || getColorName(hex);
  const savedAt = typeof color === "string" ? null : color.savedAt;

  return (
    <button
      type="button"
      onClick={() => onCopy(hex)}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:bg-white/[0.08]"
    >
      <span className="block h-28" style={{ backgroundColor: hex }} />
      <span className="block p-4">
        <span className="flex items-start justify-between gap-3">
          <span>
            <span className="block text-base font-bold text-foreground">{name}</span>
            <span className="mt-1 block text-sm font-semibold text-muted-foreground">{hex}</span>
          </span>
          {copied === hex ? (
            <Check className="h-4 w-4 shrink-0 text-primary" />
          ) : (
            <Copy className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </span>
        {savedAt && (
          <span className="mt-3 block text-xs text-muted-foreground">
            {new Date(savedAt).toLocaleString()}
          </span>
        )}
      </span>
    </button>
  );
}

export default function ColorHistory() {
  const [recentColors, setRecentColors] = useState([]);
  const [savedColors, setSavedColors] = useState([]);
  const [copied, setCopied] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    setLoading(true);
    setMessage("");
    setRecentColors(getRecentColors());

    try {
      const response = await fetch(API_URLS.user.getHistory, {
        credentials: "include",
      });
      const data = await response.json().catch(() => ({}));

      if (response.status === 404) {
        setSavedColors([]);
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || "Could not load saved colors.");
      }

      setSavedColors((data.history || []).slice(0, 12));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const copyColor = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(""), 1200);
    } catch {
      setMessage("Could not copy this color in your browser.");
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Recently Searched
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Color History
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            View colors you recently picked and colors saved to your account.
          </p>
        </div>

        <button
          type="button"
          onClick={loadHistory}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-foreground transition hover:bg-white/10 sm:w-auto"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {message && (
        <p className="mb-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground">
          {message}
        </p>
      )}

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-bold text-foreground">Recent Picks</h2>
          {recentColors.length > 0 ? (
            <div className="grid gap-4 grid-cols-4">
              {recentColors.map((color) => (
                <ColorCard
                  key={`${color.hex}-${color.savedAt}`}
                  color={color}
                  copied={copied}
                  onCopy={copyColor}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-sm text-muted-foreground">
              Pick colors on the Colors page and they will appear here.
            </p>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold text-foreground">Saved Colors</h2>
          {loading ? (
            <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-sm text-muted-foreground">
              Loading saved colors...
            </p>
          ) : savedColors.length > 0 ? (
            <div className="grid gap-4 grid-cols-4">
              {savedColors.slice(0, 12).map((hex) => (
                <ColorCard
                  key={hex}
                  color={hex}
                  copied={copied}
                  onCopy={copyColor}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-sm text-muted-foreground">
              Saved colors will appear here after you press Save Color.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

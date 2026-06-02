import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { API_URLS } from "@/lib/api";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URLS.auth.signIn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      const userData = await response.json();
      login(userData);
      navigate("/colors");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative -mx-4 min-h-[calc(100svh-8rem)] overflow-hidden px-4 py-8 sm:-mx-6 sm:px-6 sm:py-12 lg:-mx-8 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(236,72,153,0.22),transparent_24%),radial-gradient(circle_at_50%_95%,rgba(245,158,11,0.16),transparent_30%)]" />
      <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl grid-cols-[0.95fr_1.05fr] rounded-[2rem]">
        <section className="relative min-h-[580px] overflow-hidden bg-gradient-to-br from-cyan-400/90 via-purple-700/90 to-pink-600/90 p-10 text-white flex flex-col justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,214,0,0.7),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(0,195,255,0.7),transparent_30%)]" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
              Hueify Studio
            </p>
            <h1 className="mt-4 max-w-sm text-5xl font-black leading-tight">
              Your colors, saved and ready.
            </h1>
          </div>

          <div className="relative grid grid-cols-5 gap-3 rounded-3xl bg-white/15 p-4 backdrop-blur">
            {["#22d3ee", "#8b5cf6", "#ec4899", "#f59e0b", "#84cc16"].map((color) => (
              <span
                key={color}
                className="h-16 rounded-2xl shadow-lg shadow-black/20"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center bg-[#120d1f]/80 px-4 py-8 sm:px-10 sm:py-10 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Welcome back
              </p>
              <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                Login
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Sign in to access your saved palettes and 3D designs.
              </p>
            </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Email
              </label>
              <div className="flex h-12 items-center rounded-2xl border border-white/10 bg-white/5 px-5 focus-within:ring-2 focus-within:ring-primary/30">
                <Mail className="mr-4 h-5 w-5 shrink-0 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-full border-0 bg-transparent p-0 text-base text-white shadow-none placeholder:text-white/35 focus-visible:ring-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Password
              </label>
              <div className="flex h-12 items-center rounded-2xl border border-white/10 bg-white/5 px-5 focus-within:ring-2 focus-within:ring-primary/30">
                <Lock className="mr-4 h-5 w-5 shrink-0 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="h-full border-0 bg-transparent p-0 text-base text-white shadow-none placeholder:text-white/35 focus-visible:ring-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 text-base text-white shadow-lg shadow-primary/25 hover:scale-[1.01]"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
          </div>
        </section>
        </div>
    </div>
  );
}

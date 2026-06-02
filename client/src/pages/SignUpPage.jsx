import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { API_URLS } from "@/lib/api";
import { Lock, Mail, User } from "lucide-react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_URLS.auth.signUp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Sign up failed");
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
      <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr] lg:rounded-[2rem]">
        <section className="flex items-center justify-center bg-[#120d1f]/80 px-4 py-8 sm:px-10 sm:py-10 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Start creating
              </p>
              <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                Create Account
              </h1>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Save color history, customize designs, and preview your 3D models.
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
                Username
              </label>
              <div className="flex h-12 items-center rounded-2xl border border-white/10 bg-white/5 px-5 focus-within:ring-2 focus-within:ring-primary/30">
                <User className="mr-4 h-5 w-5 shrink-0 text-muted-foreground" />
                <Input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  className="h-full border-0 bg-transparent p-0 text-base text-white shadow-none placeholder:text-white/35 focus-visible:ring-0"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Email
              </label>
              <div className="flex h-12 items-center rounded-2xl border border-white/10 bg-white/5 px-5 focus-within:ring-2 focus-within:ring-primary/30">
                <Mail className="mr-4 h-5 w-5 shrink-0 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="h-full border-0 bg-transparent p-0 text-base text-white shadow-none placeholder:text-white/35 focus-visible:ring-0"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  placeholder="Create a password"
                  className="h-full border-0 bg-transparent p-0 text-base text-white shadow-none placeholder:text-white/35 focus-visible:ring-0"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Confirm Password
              </label>
              <div className="flex h-12 items-center rounded-2xl border border-white/10 bg-white/5 px-5 focus-within:ring-2 focus-within:ring-primary/30">
                <Lock className="mr-4 h-5 w-5 shrink-0 text-muted-foreground" />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="h-full border-0 bg-transparent p-0 text-base text-white shadow-none placeholder:text-white/35 focus-visible:ring-0"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
          </div>
        </section>

        <section className="relative hidden min-h-[640px] overflow-hidden bg-gradient-to-br from-amber-300/90 via-pink-600/90 to-violet-800/90 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(34,211,238,0.75),transparent_28%),radial-gradient(circle_at_84%_80%,rgba(132,204,22,0.65),transparent_30%)]" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
              Hueify Studio
            </p>
            <h2 className="mt-4 max-w-sm text-5xl font-black leading-tight">
              Build a library of your best ideas.
            </h2>
          </div>

          <div className="relative rounded-3xl bg-white/15 p-5 backdrop-blur">
            <div className="mb-4 flex items-center justify-between text-sm font-semibold text-white/80">
              <span>Palette preview</span>
              <span>5 colors</span>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {["#fbbf24", "#ec4899", "#a855f7", "#06b6d4", "#22c55e"].map((color) => (
                <span
                  key={color}
                  className="h-20 rounded-2xl shadow-lg shadow-black/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </section>
        </div>
    </div>
  );
}

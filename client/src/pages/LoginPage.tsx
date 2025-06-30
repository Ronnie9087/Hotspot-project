import { useState } from "react";
import { useLocation } from "wouter";

interface LoginPageProps {
  onLogin: () => void;
}

// Backend API URL from env or fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      console.log("Login response data:", data); // Debug log

      if (res.ok && data.token) {
        console.log("Received token:", data.token); // Debug log
        localStorage.setItem("token", data.token);
        onLogin();
        navigate("/dashboard", { replace: true });
      } else {
        setError(data.error || data.message || "Login failed (no token)");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Login to SuperApp</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

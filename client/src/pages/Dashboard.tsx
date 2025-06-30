import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  Wifi,
  Bike,
  Utensils,
  ShoppingBag,
  Briefcase,
  Plus,
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

interface UserProfile {
  email: string;
  created_at: string;
  name?: string;
}

// Backend API URL from env or fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLocation("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            // Unauthorized or invalid token
            localStorage.removeItem("token");
            setLocation("/login");
            return;
          }

          // Other errors
          const errData = await response.json().catch(() => null);
          const msg = errData?.error || "Failed to fetch profile";
          throw new Error(msg);
        }

        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        console.error("Fetch profile error:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setLocation]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600 animate-pulse">
        Loading dashboard...
      </p>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>Error: {error}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => {
            setError(null);
            setLoading(true);
            // retry by forcing re-run effect
            window.location.reload();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="animate-fade-in min-h-screen px-4">
      {/* Header: User info + Logout */}
      <div className="flex justify-end items-center max-w-6xl mx-auto mb-6">
        <div className="text-sm text-right mr-4">
          <p className="font-semibold text-gray-800">{user.name || user.email}</p>
          <p className="text-gray-500 text-xs">
            Joined: {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setLocation("/login");
          }}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Welcome Message */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to SuperApp 🌍
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your one-stop solution for all local services. Access internet plans,
          transportation, food delivery, shopping, and job opportunities all in one place.
        </p>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <ServiceCard
          icon={Wifi}
          title="Buy Internet"
          description="High-speed internet plans for home and business"
          buttonText="Get Started"
          href="/internet"
        />
        <ServiceCard
          icon={Bike}
          title="Get BodaBoda"
          description="Quick motorcycle taxi rides around the city"
          buttonText="Book Now"
          href="/boda"
        />
        <ServiceCard
          icon={Utensils}
          title="Restaurant Order"
          description="Order delicious meals from local restaurants"
          buttonText="Order Food"
          href="/restaurants"
        />
        <ServiceCard
          icon={ShoppingBag}
          title="Local Shop"
          description="Browse and buy from neighborhood stores"
          buttonText="Start Shopping"
          href="/shop"
        />
        <ServiceCard
          icon={Briefcase}
          title="Local Jobs"
          description="Find employment opportunities in your area"
          buttonText="Find Jobs"
          href="/jobs"
        />
        <ServiceCard
          icon={Plus}
          title="More Services"
          description="Additional services coming soon"
          buttonText="Coming Soon"
          href="#"
          isComingSoon
        />
      </div>
    </div>
  );
}

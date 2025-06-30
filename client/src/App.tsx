// src/App.tsx
import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import InternetService from "@/pages/InternetService";
import BodaBodaService from "@/pages/BodaBodaService";
import RestaurantService from "@/pages/RestaurantService";
import ShopService from "@/pages/ShopService";
import JobsService from "@/pages/JobsService";
import NotFound from "@/pages/not-found";

function Router() {
  const [location, navigate] = useLocation();
  // Keep token in React state so that changes force a re-render
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const currentLocation = location as string;

  // Whenever `token` or `location` changes, run redirect logic.
  useEffect(() => {
    if (token) {
      // If we are on "/login" but already logged in, send to dashboard
      if (currentLocation === "/login") {
        navigate("/dashboard", { replace: true });
      }
    } else {
      // If not logged in, send to login (unless we’re already there)
      if (currentLocation !== "/login") {
        navigate("/login", { replace: true });
      }
    }
  }, [token, currentLocation, navigate]);

  // Watch window.storage events too (in case token changes in another tab)
  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Called by <LoginPage> after a successful login
  const handleLogin = () => {
    // read the new token from localStorage (it was written in LoginPage)
    setToken(localStorage.getItem("token"));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Switch>
          {/* Pass onLogin so that LoginPage can tell us “hey, token just changed.” */}
          <Route
            path="/login"
            component={() => <LoginPage onLogin={handleLogin} />}
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/internet" component={InternetService} />
          <Route path="/boda" component={BodaBodaService} />
          <Route path="/restaurants" component={RestaurantService} />
          <Route path="/shop" component={ShopService} />
          <Route path="/jobs" component={JobsService} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

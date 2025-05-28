import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import InternetService from "@/pages/InternetService";
import BodaBodaService from "@/pages/BodaBodaService";
import RestaurantService from "@/pages/RestaurantService";
import ShopService from "@/pages/ShopService";
import JobsService from "@/pages/JobsService";
import Header from "@/components/Header";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Switch>
          <Route path="/" component={Dashboard} />
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

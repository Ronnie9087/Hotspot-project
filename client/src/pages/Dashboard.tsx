import { Wifi, Bike, Utensils, ShoppingBag, Briefcase, Plus } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to SuperApp 🌍</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your one-stop solution for all local services. Access internet plans, transportation, 
          food delivery, shopping, and job opportunities all in one place.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

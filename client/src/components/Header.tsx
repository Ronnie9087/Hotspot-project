import { useLocation } from "wouter";
import { User } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  
  const getPageTitle = () => {
    switch (location) {
      case "/":
        return "Dashboard";
      case "/internet":
        return "Internet Plans";
      case "/boda":
        return "BodaBoda Service";
      case "/restaurants":
        return "Restaurant Orders";
      case "/shop":
        return "Local Shop";
      case "/jobs":
        return "Local Jobs";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">SuperApp</h1>
            </div>
            <nav className="hidden md:flex ml-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <span className="hover:text-gray-700">{getPageTitle()}</span>
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

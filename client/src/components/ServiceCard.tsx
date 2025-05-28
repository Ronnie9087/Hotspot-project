import { LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  isComingSoon?: boolean;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  buttonText,
  href,
  isComingSoon = false,
}: ServiceCardProps) {
  if (isComingSoon) {
    return (
      <Card className="service-card bg-gray-50 border-gray-200 opacity-75">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-500 mb-3">{title}</h3>
          <p className="text-gray-400 mb-6 text-sm">{description}</p>
          <Button
            disabled
            className="w-full bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
          >
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="service-card bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 text-sm">{description}</p>
        <Link href={href}>
          <Button className="service-button w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6">
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

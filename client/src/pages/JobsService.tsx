import { Link } from "wouter";
import { ArrowLeft, Briefcase, Building, MapPin, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@shared/schema";

const jobTypes = ["All Jobs", "Full-time", "Part-time", "Remote", "Contract", "Flexible"];

export default function JobsService() {
  const [selectedType, setSelectedType] = useState("All Jobs");
  
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs", selectedType],
    queryFn: async () => {
      const response = await fetch(`/api/jobs?type=${selectedType}`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <div className="text-center">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="bg-white shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Local Jobs</h1>
            <p className="text-gray-600">Find employment opportunities in your area</p>
          </div>

          {/* Job Categories */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {jobTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className={
                  selectedType === type
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobs?.map((job) => (
              <Card key={job.id} className="border border-gray-200 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {job.company}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.type}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{job.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 text-sm">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

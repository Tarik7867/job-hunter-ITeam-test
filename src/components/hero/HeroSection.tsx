import { Search, TrendingUp, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-job-search.jpg";

export function HeroSection() {
  const stats = [
    { icon: Users, label: "Active Jobs", value: "10K+" },
    { icon: TrendingUp, label: "Success Rate", value: "94%" },
    { icon: Star, label: "Companies", value: "500+" },
  ];

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                🚀 AI-Powered Job Matching
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Find Your
                <span className="text-gradient block">Dream Career</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Discover opportunities that perfectly match your skills, passion, and career goals. 
                Let our smart recommendations guide you to success.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-primary text-white shadow-lg hover:shadow-xl transition-all">
                <Search className="h-5 w-5 mr-2" />
                Start Job Search
              </Button>
              
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                Create Profile
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="gradient-primary rounded-lg p-3 w-fit mx-auto mb-2">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="font-bold text-2xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-2xl">
              <CardContent className="p-0">
                <img
                  src={heroImage}
                  alt="Professional job search environment"
                  className="w-full h-[400px] object-cover"
                />
              </CardContent>
            </Card>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-lg px-4 py-2 shadow-lg">
              <div className="text-sm font-medium">New Match! 🎉</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-card border shadow-lg rounded-lg px-4 py-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-medium">Active Job Hunt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
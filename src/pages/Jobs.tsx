import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JobCard } from "@/components/job/JobCard";
import { HeroSection } from "@/components/hero/HeroSection";
import { jobApi } from "@/services/jobApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserProfile } from "@/types/job";

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [profile] = useLocalStorage<UserProfile | null>("userProfile", null);

  // Use profile data for recommendations if available
  const recommendedQuery = profile?.desiredPosition || "software developer";

  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs', currentQuery || recommendedQuery],
    queryFn: () => jobApi.searchJobs(currentQuery || recommendedQuery),
    enabled: !!(currentQuery || recommendedQuery),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentQuery(searchQuery);
  };

  const isShowingRecommendations = !currentQuery && profile;
  const showHero = !currentQuery && !profile;

  return (
    <div className="min-h-screen">
      {/* Hero Section - only show when no search and no profile */}
      {showHero && <HeroSection />}

      <div className="container mx-auto px-4 py-8">
        {/* Search Section for existing users or after search */}
        {(profile || currentQuery) && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {isShowingRecommendations ? "Recommended for You" : "Job Search Results"}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {isShowingRecommendations
                  ? `Jobs matching your profile: ${profile?.desiredPosition}`
                  : "Find your perfect opportunity"
                }
              </p>
            </div>

            {/* Search Form */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit" variant="gradient-primary">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Current Search Info */}
        {(currentQuery || isShowingRecommendations) && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {isShowingRecommendations 
                  ? `Recommended jobs for "${recommendedQuery}"` 
                  : `Jobs for "${currentQuery}"`
                }
              </span>
            </div>
            {data && (
              <span className="text-sm text-muted-foreground">
                {data.data.length} jobs found
              </span>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Searching for jobs...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">
              Sorry, we couldn't fetch jobs right now. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {/* Jobs Grid */}
        {data && data.data && data.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        ) : data && data.data && data.data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No jobs found for "{currentQuery || recommendedQuery}". Try different keywords.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setCurrentQuery("");
              }}
              variant="outline"
            >
              Clear Search
            </Button>
          </div>
        ) : null}

        {/* Profile Prompt */}
        {!profile && !currentQuery && !showHero && (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Get Personalized Job Recommendations</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your profile to receive job suggestions tailored to your preferences.
                </p>
                <Button asChild variant="outline">
                  <a href="/profile">Create Profile</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
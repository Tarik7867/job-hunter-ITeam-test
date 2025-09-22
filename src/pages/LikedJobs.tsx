import { useState, useEffect } from "react";
import { Heart, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCard } from "@/components/job/JobCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Job } from "@/types/job";
import { jobApi } from "@/services/jobApi";
import { Link } from "react-router-dom";

export default function LikedJobs() {
  const [likedJobs, setLikedJobs] = useLocalStorage<string[]>("likedJobs", []);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedJobs = async () => {
      setLoading(true);
      const jobPromises = likedJobs.map(jobId => jobApi.getJobDetails(jobId));
      const jobDetails = await Promise.all(jobPromises);
      setJobs(jobDetails.filter(Boolean) as Job[]);
      setLoading(false);
    };

    if (likedJobs.length > 0) {
      fetchLikedJobs();
    } else {
      setLoading(false);
    }
  }, [likedJobs]);

  const clearAllLiked = () => {
    setLikedJobs([]);
    setJobs([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary-light/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-pulse">
                <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
              </div>
              <p className="text-muted-foreground">Loading your liked jobs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-light/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="gradient-primary rounded-lg p-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Liked Jobs</h1>
                <p className="text-muted-foreground">
                  {jobs.length === 0 
                    ? "You haven't liked any jobs yet" 
                    : `${jobs.length} job${jobs.length === 1 ? '' : 's'} saved`
                  }
                </p>
              </div>
            </div>
            
            {jobs.length > 0 && (
              <Button
                variant="outline"
                onClick={clearAllLiked}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        {jobs.length === 0 ? (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Liked Jobs Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start exploring jobs and save the ones that interest you by clicking the heart icon.
                </p>
                <Button asChild className="gradient-primary text-white">
                  <Link to="/">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Jobs
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        )}

        {/* Tips */}
        {jobs.length > 0 && (
          <div className="mt-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Set up job alerts for positions similar to your liked jobs</li>
                  <li>• Review and update your profile to get better recommendations</li>
                  <li>• Check back regularly as new similar positions may be posted</li>
                  <li>• Use your liked jobs to identify patterns in your preferences</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
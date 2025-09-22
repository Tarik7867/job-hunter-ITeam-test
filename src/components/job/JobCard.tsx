import { Heart, MapPin, Clock, DollarSign, Building } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [likedJobs, setLikedJobs] = useLocalStorage<string[]>("likedJobs", []);
  const isLiked = likedJobs.includes(job.job_id);

  const toggleLike = () => {
    if (isLiked) {
      setLikedJobs(likedJobs.filter(id => id !== job.job_id));
    } else {
      setLikedJobs([...likedJobs, job.job_id]);
    }
  };

  const formatSalary = () => {
    if (job.job_min_salary && job.job_max_salary) {
      return `$${(job.job_min_salary / 1000).toFixed(0)}k - $${(job.job_max_salary / 1000).toFixed(0)}k`;
    }
    return null;
  };

  const formatLocation = () => {
    const parts = [job.job_city, job.job_state, job.job_country].filter(Boolean);
    return parts.join(", ");
  };

  const formatPostedDate = () => {
    if (job.job_posted_at_datetime_utc) {
      const date = new Date(job.job_posted_at_datetime_utc);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      return `${Math.ceil(diffDays / 30)} months ago`;
    }
    return "Recently posted";
  };

  return (
    <Card className="card-hover h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {job.employer_logo ? (
              <img
                src={job.employer_logo}
                alt={job.employer_name}
                className="w-12 h-12 rounded-lg object-cover border"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                {job.job_title}
              </h3>
              <p className="text-muted-foreground text-sm">{job.employer_name}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLike}
            className={cn(
              "p-2",
              isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"
            )}
          >
            <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
          </Button>
        </div>

        <div className="space-y-3 mb-4">
          {formatLocation() && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {formatLocation()}
              {job.job_is_remote && (
                <Badge variant="secondary" className="ml-2">
                  Remote
                </Badge>
              )}
            </div>
          )}

          {formatSalary() && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              {formatSalary()}
              {job.job_salary_period && (
                <span className="ml-1">/{job.job_salary_period.toLowerCase()}</span>
              )}
            </div>
          )}

          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {formatPostedDate()}
          </div>

          {job.job_employment_type && (
            <Badge variant="outline" className="w-fit">
              {job.job_employment_type}
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {job.job_description}
        </p>

        {job.job_required_skills && job.job_required_skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {job.job_required_skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.job_required_skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{job.job_required_skills.length - 4} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="w-full flex gap-2">
          <Button asChild className="flex-1" variant="outline">
            <Link to={`/job-details/${job.job_id}`}>
              View Details
            </Link>
          </Button>
          <Button asChild className="flex-1 gradient-accent text-white hover:opacity-90">
            <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
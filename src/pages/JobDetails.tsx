import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  ExternalLink,
  Loader2,
  Users,
  Calendar,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { jobApi } from "@/services/jobApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [likedJobs, setLikedJobs] = useLocalStorage<string[]>("likedJobs", []);
  
  const isLiked = id ? likedJobs.includes(id) : false;

  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', id],
    queryFn: () => jobApi.getJobDetails(id!),
    enabled: !!id,
  });

  const toggleLike = () => {
    if (!id) return;
    
    if (isLiked) {
      setLikedJobs(likedJobs.filter(jobId => jobId !== id));
    } else {
      setLikedJobs([...likedJobs, id]);
    }
  };

  const formatSalary = () => {
    if (job?.job_min_salary && job?.job_max_salary) {
      return `$${(job.job_min_salary / 1000).toFixed(0)}k - $${(job.job_max_salary / 1000).toFixed(0)}k`;
    }
    return null;
  };

  const formatLocation = () => {
    if (!job) return "";
    const parts = [job.job_city, job.job_state, job.job_country].filter(Boolean);
    return parts.join(", ");
  };

  const formatPostedDate = () => {
    if (job?.job_posted_at_datetime_utc) {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary-light/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading job details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary-light/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-destructive mb-4">
              Sorry, we couldn't find this job. It may have been removed or doesn't exist.
            </p>
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Jobs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-light/20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {job.employer_logo ? (
                      <img
                        src={job.employer_logo}
                        alt={job.employer_name}
                        className="w-16 h-16 rounded-xl object-cover border"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building className="h-8 w-8 text-primary" />
                      </div>
                    )}
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{job.job_title}</h1>
                      <p className="text-xl text-muted-foreground">{job.employer_name}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={toggleLike}
                    className={cn(
                      "p-3",
                      isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"
                    )}
                  >
                    <Heart className={cn("h-6 w-6", isLiked && "fill-current")} />
                  </Button>
                </div>

                {/* Job Meta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {formatLocation() && (
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-5 w-5 mr-3" />
                      <span>{formatLocation()}</span>
                      {job.job_is_remote && (
                        <Badge variant="secondary" className="ml-2">
                          Remote
                        </Badge>
                      )}
                    </div>
                  )}

                  {formatSalary() && (
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="h-5 w-5 mr-3" />
                      <span>
                        {formatSalary()}
                        {job.job_salary_period && (
                          <span>/{job.job_salary_period.toLowerCase()}</span>
                        )}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-5 w-5 mr-3" />
                    <span>{formatPostedDate()}</span>
                  </div>

                  {job.job_employment_type && (
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-5 w-5 mr-3" />
                      <span>{job.job_employment_type}</span>
                    </div>
                  )}
                </div>

                {/* Skills */}
                {job.job_required_skills && job.job_required_skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.job_required_skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Apply Button */}
                <div className="flex gap-4">
                  <Button asChild size="lg" className="gradient-accent text-white hover:opacity-90">
                    <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href={job.employer_website} target="_blank" rel="noopener noreferrer">
                      Company Website
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {job.job_description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Job Highlights */}
            {job.job_highlights && (
              <Card>
                <CardHeader>
                  <CardTitle>Job Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {job.job_highlights.Qualifications && (
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Qualifications</h4>
                      <ul className="space-y-2">
                        {job.job_highlights.Qualifications.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.job_highlights.Responsibilities && (
                    <div>
                      <Separator className="my-4" />
                      <h4 className="font-semibold mb-3 text-primary">Responsibilities</h4>
                      <ul className="space-y-2">
                        {job.job_highlights.Responsibilities.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.job_highlights.Benefits && (
                    <div>
                      <Separator className="my-4" />
                      <h4 className="font-semibold mb-3 text-primary">Benefits</h4>
                      <ul className="space-y-2">
                        {job.job_highlights.Benefits.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.employer_name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.employer_company_type && (
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{job.employer_company_type}</span>
                  </div>
                )}
                
                {job.employer_website && (
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={job.employer_website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Job Info */}
            <Card>
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Job ID</span>
                    <span className="font-mono">{job.job_id}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Publisher</span>
                    <span>{job.job_publisher}</span>
                  </div>

                  {job.job_posted_at_datetime_utc && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Posted</span>
                      <span>{formatPostedDate()}</span>
                    </div>
                  )}

                  {job.job_offer_expiration_datetime_utc && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expires</span>
                      <span className="text-warning">
                        {new Date(job.job_offer_expiration_datetime_utc).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={`/jobs?q=${encodeURIComponent(job.job_title)}`}>
                    Find Similar Jobs
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Card className="border-warning/20 bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Stay Safe</h4>
                    <p className="text-xs text-muted-foreground">
                      Never pay for job applications or provide sensitive personal information before verifying the employer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
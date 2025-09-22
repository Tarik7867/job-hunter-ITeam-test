import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Save, CheckCircle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserProfile } from "@/types/job";

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useLocalStorage<UserProfile | null>("userProfile", null);
  
  const [formData, setFormData] = useState({
    name: "",
    desiredPosition: "",
    aboutMe: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        desiredPosition: profile.desiredPosition || "",
        aboutMe: profile.aboutMe || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    const hasChanges = profile
      ? (formData.name !== profile.name ||
         formData.desiredPosition !== profile.desiredPosition ||
         formData.aboutMe !== profile.aboutMe)
      : !!(formData.name || formData.desiredPosition || formData.aboutMe);
    
    setHasChanges(hasChanges);
  }, [formData, profile]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.desiredPosition.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Name and desired position are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const newProfile: UserProfile = {
        name: formData.name.trim(),
        desiredPosition: formData.desiredPosition.trim(),
        aboutMe: formData.aboutMe.trim(),
      };

      setProfile(newProfile);

      toast({
        title: "Profile saved successfully!",
        description: "Your profile has been updated. You'll now get personalized job recommendations.",
      });

      // Navigate to jobs page after a brief delay
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      toast({
        title: "Error saving profile",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isEdit = !!profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-light/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="gradient-primary rounded-lg p-4 w-fit mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {isEdit ? "Edit Your Profile" : "Create Your Profile"}
            </h1>
            <p className="text-muted-foreground">
              {isEdit 
                ? "Update your information to get better job recommendations"
                : "Tell us about yourself to get personalized job recommendations"
              }
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <span>Professional Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-11"
                    required
                  />
                </div>

                {/* Desired Position */}
                <div className="space-y-2">
                  <Label htmlFor="desiredPosition" className="text-sm font-medium">
                    Desired Position *
                  </Label>
                  <Input
                    id="desiredPosition"
                    type="text"
                    placeholder="e.g., Software Developer, Product Manager, UX Designer"
                    value={formData.desiredPosition}
                    onChange={(e) => handleInputChange("desiredPosition", e.target.value)}
                    className="h-11"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be used to find relevant job recommendations for you
                  </p>
                </div>

                {/* About Me */}
                <div className="space-y-2">
                  <Label htmlFor="aboutMe" className="text-sm font-medium">
                    About Me
                  </Label>
                  <Textarea
                    id="aboutMe"
                    placeholder="Tell us about your skills, experience, and what you're looking for in your next role..."
                    value={formData.aboutMe}
                    onChange={(e) => handleInputChange("aboutMe", e.target.value)}
                    className="min-h-[120px] resize-none"
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional: This helps us understand your background better
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading || !hasChanges}
                    className="flex-1 gradient-primary text-white hover:opacity-90"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isEdit ? "Update Profile" : "Create Profile"}
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Success State */}
          {profile && (
            <div className="mt-6">
              <Card className="bg-success/5 border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <h4 className="font-semibold text-sm">Profile Active</h4>
                      <p className="text-xs text-muted-foreground">
                        Your profile is being used to provide personalized job recommendations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary text-lg">🚀 Profile Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Get personalized job recommendations based on your desired position
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Skip manual searching - relevant jobs appear automatically
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Save time by focusing on opportunities that match your goals
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Update anytime to refine your job recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
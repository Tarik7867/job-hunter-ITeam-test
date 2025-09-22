import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { Search, Heart, User, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="gradient-primary rounded-lg p-2">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">JobHunt</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Jobs</span>
            </Link>
          </Button>

          <Button
            variant={isActive("/liked") ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/liked" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Liked</span>
            </Link>
          </Button>

          <Button
            variant={isActive("/profile") ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
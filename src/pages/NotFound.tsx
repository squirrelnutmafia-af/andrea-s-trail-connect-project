import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Mountain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-mulish">
      <div className="text-center space-y-6 p-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <Mountain className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-heading">404</h1>
          <p className="text-xl text-muted-foreground">Trail not found!</p>
          <p className="text-body max-w-sm mx-auto">
            Looks like you've wandered off the path. Let's get you back to familiar terrain.
          </p>
        </div>
        <Link to="/">
          <Button variant="default" className="mt-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

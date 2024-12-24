import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="h-screen flex flex-col items-center gap-y-4 justify-center">
      <AlertTriangle className="size-6" />
      <p className="text-sm">Something went wrong</p>
      <Button variant="primary" size="sm">
        <Link to="/">Go To Home</Link>
      </Button>
    </div>
  );
}

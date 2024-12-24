/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom";
import { DottedSeparator } from "../dotted-separator";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "sonner";
import { makeHTTPCall } from "@/helper/make-http-call";
import { useState } from "react";
import DashboardLoading from "@/components/Loading";

export default function JoinWorkspace({ initialValue }) {
  const [isLoading, setIsLoading] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      if (!param.id) {
        toast.error("Invalid workspace ID");
        navigate("");
        return;
      }

      const response = await makeHTTPCall(
        `join/${param.invitecode}`,
        "POST",
        true
      );

      if (response.error === false) {
        toast.success("Workspace joined successfully!");
        navigate(`/workspace/${param.id}`);
      }

      if (response.error === true) {
        toast.error(response.message);
        navigate("");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle>
          <CardDescription>
            You&apos;ve been invited to join <strong>{initialValue}</strong>{" "}
            workspace
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          <Button
            variant="secondary"
            type="button"
            asChild
            size="lg"
            className="w-full lg:w-fit"
          >
            <Link to="/">Cancel</Link>
          </Button>
          <Button
            className="w-full lg:w-fit"
            type="button"
            size="lg"
            onClick={onSubmit}
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

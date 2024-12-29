import JoinWorkspace from "@/components/workspaces/JoinWorkspace";
import WorkspaceLayout from "./WorkspaceLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { makeHTTPCall } from "@/helper/make-http-call";
import Loading from "../../components/Loading";

export default function Workspacejoin() {
  const [isLoading, setIsLoading] = useState(false);
  const [joinWorkspace, setJoinWorkspace] = useState(null);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Prevent setting state if unmounted

    const fetchWorkSpace = async () => {
      setIsLoading(true);
      try {
        if (!param.id) {
          toast.error("Invalid workspace ID");
          navigate("");
          return;
        }

        const response = await makeHTTPCall(
          `/getinviteworkspace/${param.id}`,
          "GET",
          true
        );

        if (response.error === false && isMounted) {
          setJoinWorkspace(response.workspacename);
        }

        if (response.error === true) {
          toast.error(response.message);
          navigate("");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWorkSpace();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [param.id, navigate]);

  if (isLoading || joinWorkspace === null) {
    return <Loading />;
  }

  return (
    <WorkspaceLayout>
      <div className="w-full lg:max-w-xl">
        <JoinWorkspace initialValue={joinWorkspace} />
      </div>
    </WorkspaceLayout>
  );
}

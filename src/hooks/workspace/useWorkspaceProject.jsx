import { useState, useEffect } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useWorkspaceProject(workspaceId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!workspaceId) {
          toast.error("Invalid workspace ID");
          return;
        }
        const response = await makeHTTPCall(
          `/workspace/${workspaceId}/projects`,
          "GET",
          true
        );
        //("response", response);
        if (!response.error) {
          setData(response.projects);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [workspaceId]);

  return { data, loading };
}

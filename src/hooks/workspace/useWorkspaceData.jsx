import { useState, useEffect } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { toast } from "sonner";

export default function useWorkspaceData(workspaceId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!workspaceId) {
          throw new Error("No workspace");
        }
        const response = await makeHTTPCall(
          `workspace/${workspaceId}`,
          "GET",
          true
        );
        if (!response.error) {
          setData(response.workspace);
        } else {
          throw new Error(response.message);
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

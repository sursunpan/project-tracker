import { useState, useEffect } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";

export default function useWorkspaceProject(workspaceId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!workspaceId) {
        setError("Invalid workspace ID");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await makeHTTPCall(
          `/workspace/${workspaceId}/projects`,
          "GET",
          true
        );

        if (response.error) {
          setError(response.message || "Failed to fetch projects");
          setData(null);
        } else {
          setData(response.projects || []);
        }
      } catch (err) {
        const message = err.message || "An unexpected error occurred";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [workspaceId]);

  return { data, isLoading, error };
}

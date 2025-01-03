import { useState, useEffect } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { useNavigate } from "react-router-dom";

export default function useProjectDetails(workspaceId, projectId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!workspaceId || !projectId) {
          navigate("/");
          return;
        }
        const response = await makeHTTPCall(
          `/workspace/${workspaceId}/project/${projectId}`,
          "GET",
          true
        );
        if (!response.error) {
          setData(response.project);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [workspaceId, navigate, projectId]);

  return { data, loading };
}

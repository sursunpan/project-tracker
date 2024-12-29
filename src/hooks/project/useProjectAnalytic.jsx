import { useState, useEffect } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";

export default function useProjectAnalytics(projectId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await makeHTTPCall(
          `task/${projectId}/analytic`,
          "GET",
          true
        );
        if (!response.error) {
          setData(response);
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
  }, [projectId]);

  return { data, loading };
}

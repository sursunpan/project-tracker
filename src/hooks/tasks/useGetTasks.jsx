import { makeHTTPCall } from "@/helper/make-http-call";
import { useEffect, useState } from "react";

export default function useGetTasks({
  workSpaceId,
  projectId,
  status,
  search,
  assigneId,
  dueDate,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        setError(null);

        const filteredQuery = Object.fromEntries(
          Object.entries({
            projectId,
            status,
            search,
            assigneId,
            dueDate,
            // eslint-disable-next-line no-unused-vars
          }).filter(([_, value]) => value !== undefined)
        );

        // Convert query object to query string
        const queryString = new URLSearchParams(filteredQuery).toString();

        const response = await makeHTTPCall(
          `/tasks/${workSpaceId}?${queryString}`,
          "GET",
          true
        );

        if (!response.error) {
          setData(response.tasks || []);
        } else {
          setError(
            response.message || "An error occurred while fetching tasks."
          );
        }
      } catch (e) {
        console.error("Fetch Tasks Error:", e);
        setError(e.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (workSpaceId) {
      fetchTask();
    }
  }, [workSpaceId, projectId, status, search, assigneId, dueDate]);

  return { loading, data, error };
}

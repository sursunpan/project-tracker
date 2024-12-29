import { useState, useEffect } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";

export default function useWorkspaceMember(workspaceId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await makeHTTPCall(
          `workspace/member/${workspaceId}`,
          "GET",
          true
        );
        if (response.error === false) {
          setData(response.members);
        }

        if (response.error === true) {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [workspaceId]);

  return { data, loading };
}

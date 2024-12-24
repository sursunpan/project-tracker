import { useState, useEffect } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useWorkspaceData(workspaceId) {
  console.log("----------------->useWorkspaceData");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!workspaceId) {
          toast.error("Invalid workspace ID");
          // navigate("/");
          return;
        }
        const response = await makeHTTPCall(
          `workspace/${workspaceId}`,
          "GET",
          true
        );
        console.log("response", response);
        if (!response.error) {
          setData(response.workspace);
        } else {
          toast.error(response.message);
          // navigate("/");
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

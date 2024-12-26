import { useState, useEffect } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useWorkspaceMember(workspaceId) {
  console.log("----------------->useWorkspaceMember");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
          toast.success("Member List Success");
          setData(response.members);
        }

        if (response.error === true) {
          toast.error(response.message);
          navigate("");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [navigate, workspaceId]);

  return { data, loading };
}

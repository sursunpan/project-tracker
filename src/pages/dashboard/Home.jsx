import { useEffect, useState } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { useNavigate } from "react-router-dom";
import DashboardLoading from "../../components/Loading";

export default function Home() {
  //("--------------->Home");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await makeHTTPCall("user/workspaces", "GET", true);
        if (response.error === false) {
          setLoading(false);
          if (response.count > 0) {
            const workspace = response.workspaces[0];
            navigate(`/workspace/${workspace?.id}`);
          } else {
            navigate("/workspace/create");
          }
        }
      } catch (error) {
        setLoading(false);
        navigate("/workspace/create");
        console.error("Error fetching workspaces:", error);
      }
    };
    fetchWorkspaces();
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {loading ? <DashboardLoading /> : <p>Redirecting...</p>}
    </div>
  );
}

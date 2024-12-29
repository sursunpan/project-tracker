import { useState, useEffect } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useGetTask(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await makeHTTPCall(`task/${id}`, "GET", true);
        if (response.error === false) {
          toast.success("Task fetch successfully");
          setData(response.task);
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

    fetchTask();
  }, [id, navigate]);

  //("Fetching members...", data);

  console.log("Fetching data..", data);
  return { data, loading };
}

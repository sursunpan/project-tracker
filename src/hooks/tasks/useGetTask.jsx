import { useState, useEffect } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
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
          setData(response.task);
        }

        if (response.error === true) {
          navigate("");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  console.log("Fetching data..", data);
  return { data, loading };
}

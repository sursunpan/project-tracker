// import { RiAddCircleFill } from "react-icons/ri";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { useEffect, useState } from "react";
// import { makeHTTPCall } from "@/helper/make-http-call";
// import Workspaceavatar from "./Workspaceavatar";
// import { useNavigate, useParams } from "react-router-dom";
// import { openCreateWorkspaceModal } from "@/redux/slices/modalSlice";
// import { useDispatch } from "react-redux";

// export default function WorkspaceSwitcher() {
//   const [workspaceList, setWorkspaceList] = useState(null);
//   const navigate = useNavigate();
//   const params = useParams();

//   const dispatch = useDispatch();
//   const openModal = () => {
//     dispatch(openCreateWorkspaceModal());
//   };

//   useEffect(() => {
//     const fetchWorkspaces = async () => {
//       try {
//         const response = await makeHTTPCall("user/workspaces", "GET", true);
//         if (response.error === false) {
//           setWorkspaceList(response.workspaces);
//         }
//       } catch (error) {
//         console.error("Error fetching workspaces:", error);
//       }
//     };
//     fetchWorkspaces();
//   }, []);

//   const onSelect = (id) => {
//     navigate(`/workspace/${id}`);
//   };

//   return (
//     <div className="flex flex-col gap-y-2">
//       <div className="flex items-center justify-between">
//         <p className="text-xs uppercase text-neutral-500">Workspaces</p>
//         <RiAddCircleFill
//           onClick={openModal}
//           className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
//         />
//       </div>
//       <Select onValueChange={onSelect} value={params.id || ""}>
//         <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
//           <SelectValue placeholder="No workspace selected" />
//         </SelectTrigger>
//         <SelectContent>
//           {workspaceList &&
//             workspaceList.map((workspace) => (
//               <SelectItem key={workspace.id} value={workspace.id}>
//                 <div className="flex justify-start items-center gap-3 font-medium">
//                   <Workspaceavatar
//                     name={workspace.name}
//                     image={workspace.image}
//                   />
//                   <span className="truncate">{workspace.name}</span>
//                 </div>
//               </SelectItem>
//             ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

// import { RiAddCircleFill } from "react-icons/ri";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { useEffect } from "react";
// import { makeHTTPCall } from "@/helper/make-http-call";
// import Workspaceavatar from "./Workspaceavatar";
// import { useNavigate, useParams } from "react-router-dom";
// import { openCreateWorkspaceModal } from "@/redux/slices/modalSlice";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setError,
//   setLoading,
//   setWorkspaces,
// } from "@/redux/slices/workspaceSlice";

// export default function WorkspaceSwitcher() {
//   console.log("--------------->", "workspaceSwitcher");
//   const navigate = useNavigate();
//   const params = useParams();
//   const dispatch = useDispatch();

//   const { list: workspaceList, isLoading } = useSelector(
//     (state) => state.workspace
//   );

//   const openModal = () => {
//     const result = dispatch(openCreateWorkspaceModal());
//     console.log(result);
//   };

//   useEffect(() => {
//     const fetchWorkspaces = async () => {
//       dispatch(setLoading(true));
//       try {
//         const response = await makeHTTPCall("user/workspaces", "GET", true);
//         console.log(response);
//         if (!response.error) {
//           dispatch(setWorkspaces(response.workspaces || []));
//         } else {
//           dispatch(setError(response.message));
//         }
//       } catch (error) {
//         console.error("Error fetching workspaces:", error);
//         dispatch(setError("Error fetching workspaces."));
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };
//     fetchWorkspaces();
//   }, [dispatch]);

//   return (
//     <div className="flex flex-col gap-y-2">
//       <div className="flex items-center justify-between">
//         <p className="text-xs uppercase text-neutral-500">Workspaces</p>
//         <RiAddCircleFill
//           onClick={openModal}
//           className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
//         />
//       </div>
//       {isLoading ? (
//         <p className="text-sm text-neutral-400">Loading workspaces...</p>
//       ) : workspaceList.length === 0 ? (
//         <p className="text-sm text-neutral-400">No workspaces available</p>
//       ) : (
//         <Select
//           onValueChange={(id) => navigate(`/workspace/${id}`)}
//           value={params.id || ""}
//         >
//           <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
//             <SelectValue placeholder="No workspace selected" />
//           </SelectTrigger>
//           <SelectContent>
//             {workspaceList.map((workspace) => (
//               <SelectItem key={workspace.id} value={workspace.id}>
//                 <div className="flex justify-start items-center gap-3 font-medium">
//                   <Workspaceavatar
//                     name={workspace.name}
//                     image={workspace.image}
//                   />
//                   <span className="truncate">{workspace.name}</span>
//                 </div>
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       )}
//     </div>
//   );
// }

import { RiAddCircleFill } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useCallback } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import Workspaceavatar from "./Workspaceavatar";
import { useNavigate, useParams } from "react-router-dom";
import { openCreateWorkspaceModal } from "@/redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setWorkspaces,
} from "@/redux/slices/workspaceSlice";

export default function WorkspaceSwitcher() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const {
    list: workspaceList,
    isLoading,
    error,
  } = useSelector((state) => state.workspace);

  const openModal = useCallback(() => {
    dispatch(openCreateWorkspaceModal());
  }, [dispatch]);

  const handleWorkspaceChange = useCallback(
    (id) => {
      navigate(`/workspace/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    const fetchWorkspaces = async () => {
      dispatch(setLoading(true));
      try {
        const response = await makeHTTPCall("user/workspaces", "GET", true);
        if (!response.error) {
          dispatch(setWorkspaces(response.workspaces || []));
        } else {
          dispatch(setError(response.message));
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        dispatch(setError("Error fetching workspaces."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchWorkspaces();
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          onClick={openModal}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {isLoading && (
        <p className="text-sm text-neutral-400">Loading workspaces...</p>
      )}
      {!isLoading && error && <p className="text-sm text-red-400">{error}</p>}
      {!isLoading && !error && workspaceList.length === 0 && (
        <p className="text-sm text-neutral-400">No workspaces available</p>
      )}
      {!isLoading && !error && workspaceList.length > 0 && (
        <Select onValueChange={handleWorkspaceChange} value={params.id || ""}>
          <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
            <SelectValue placeholder="No workspace selected" />
          </SelectTrigger>
          <SelectContent>
            {workspaceList.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                <div className="flex justify-start items-center gap-3 font-medium">
                  <Workspaceavatar
                    name={workspace.name}
                    image={workspace.image}
                  />
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

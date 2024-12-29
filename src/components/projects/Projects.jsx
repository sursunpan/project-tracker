import useWorkspaceProject from "@/hooks/workspace/useWorkspaceProject";
import { cn } from "@/lib/utils";
import { openCreateProjectModal } from "@/redux/slices/projectModalSlice";
import { RiAddCircleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import ProjectAvatar from "./ProjectAvatar";
import Loading from "../Loading";

export default function Projects() {
  const params = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { data, isLoading } = useWorkspaceProject(params.id);

  const openModal = () => {
    dispatch(openCreateProjectModal());
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={openModal}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {data?.map((project) => {
        const fullHref = `/workspace/${params.id}/project/${project?.id}`;
        const isActive = pathname === fullHref;

        return (
          <Link to={fullHref} key={project.id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar image={project.image} name={project.name} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

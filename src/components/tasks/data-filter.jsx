/* eslint-disable react/prop-types */
import useWorkspaceMember from "@/hooks/workspace/useWorkspaceMember";
import useWorkspaceProject from "@/hooks/workspace/useWorkspaceProject";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FolderIcon, ListCheckIcon, UserIcon } from "lucide-react";
import DatePicker from "../datePicker";

export default function DataFilter({ filter, setFilter, hideProjectFilter }) {
  const params = useParams();

  console.log("filter>>>>>>>>>>>", filter);
  const { data: projects, isLoading: isLoadingProjects } = useWorkspaceProject(
    params.id
  );
  const { data: members, isLoading: isLoadingMembers } = useWorkspaceMember(
    params.id
  );

  const projectOptions = projects?.map((project) => ({
    value: project.id,
    label: project.name,
  }));

  const membersOptions = members?.map((member) => ({
    value: member.id,
    label: member._user.name,
  }));

  const isLoading = isLoadingMembers || isLoadingProjects;

  if (isLoading) {
    return null;
  }

  const onStatusChange = (value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      status: value === "all" ? undefined : value,
    }));
  };

  const onAssigneeIdChange = (value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      assigneeId: value === "all" ? undefined : value,
    }));
  };

  const onProjectIdChange = (value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      projectId: value === "all" || value === "null" ? undefined : value,
    }));
  };

  const onDueDateChange = (value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      dueDate: value === value ? value.toISOString() : undefined,
    }));
  };

  // const onSearchChange = (event) => {
  //   setFilter((prevFilter) => ({
  //     ...prevFilter,
  //     search: event.target.value,
  //   }));
  // };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select defaultValue={filter.status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <ListCheckIcon className="size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          <SelectItem value="BACKLOG">Backlog</SelectItem>
          <SelectItem value="TODO">To Do</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="IN_REVIEW">In Review</SelectItem>
          <SelectItem value="DONE">Done</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={filter.assigneeId}
        onValueChange={onAssigneeIdChange}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 mr-2" />
            <SelectValue placeholder="All assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All assignees</SelectItem>
          <SelectSeparator />
          {membersOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!hideProjectFilter && (
        <Select
          defaultValue={filter.projectId}
          onValueChange={onProjectIdChange}
        >
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              <FolderIcon className="size-4 mr-2" />
              <SelectValue placeholder="All projects" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All projects</SelectItem>
            <SelectSeparator />
            {projectOptions?.map((project) => (
              <SelectItem key={project.value} value={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <DatePicker
        placeholder="Due date"
        className="h-8 w-full lg:w-auto"
        value={filter.dueDate ? new Date(filter.dueDate) : undefined}
        onChange={onDueDateChange}
      />
    </div>
  );
}

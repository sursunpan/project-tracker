/* eslint-disable react/prop-types */
import { Loader, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DottedSeparator } from "../dotted-separator";
import { useCallback, useState } from "react";
import { openTaskModal } from "@/redux/slices/taskModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeTaskView } from "@/redux/slices/taskViewSlice";
import useGetTasks from "@/hooks/tasks/useGetTasks";
import { useParams } from "react-router-dom";
import DataFilter from "./data-filter";
import { DataTable } from "./DataTable";
import { column } from "../Columns";
import DataKanban from "./data-kanban";
import { toast } from "sonner";
import { makeHTTPCall } from "@/helper/make-http-call";
import DataCalendra from "./DataCalendra";

export default function TaskViewSwitcher({ hideProjectFilter }) {
  console.log("hideProjectFilter>>>>>", hideProjectFilter);
  const params = useParams();

  const dispatch = useDispatch();

  const { taskView } = useSelector((state) => state.taskView);

  const [filter, setFilter] = useState(
    hideProjectFilter
      ? {
          projectId: params.projectId,
          assigneeId: "all",
          dueDate: undefined,
          search: undefined,
          status: "all",
        }
      : {
          projectId: "all",
          assigneeId: "all",
          dueDate: undefined,
          search: undefined,
          status: "all",
        }
  );

  const { data, loading } = useGetTasks({
    workSpaceId: params.id,
    ...filter,
  });

  const openModal = useCallback(() => {
    dispatch(openTaskModal());
  }, [dispatch]);

  const handleChangeView = useCallback(
    (value) => {
      dispatch(changeTaskView(value));
    },
    [dispatch]
  );

  const onKanbanChange = useCallback((tasks) => {
    const bulkUpdate = async () => {
      try {
        const response = await makeHTTPCall("tasks", "POST", true, {
          tasks,
        });
        if (!response.error) {
          toast.success("Tasks updated successfully!");
        } else {
          toast.error("Failed to update tasks!");
          console.error("Failed to update tasks:", response.message);
          toast.error("Failed to update tasks!");
          console.error("Failed to update tasks:", response.message);
        }
      } catch (err) {
        console.error(err);
      }
    };
    bulkUpdate();
  }, []);

  return (
    <Tabs
      defaultValue={taskView}
      onValueChange={handleChangeView}
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto" onClick={openModal}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilter
          filter={filter}
          setFilter={setFilter}
          hideProjectFilter={hideProjectFilter}
        />
        <DottedSeparator className="my-4" />
        {loading ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={column} data={data} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban data={data} onChange={onKanbanChange} />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0 h-full pb-4">
              <DataCalendra data={data} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}

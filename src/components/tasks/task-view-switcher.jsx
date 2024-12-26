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

export default function TaskViewSwitcher() {
  const params = useParams();

  const dispatch = useDispatch();

  const { taskView } = useSelector((state) => state.taskView);

  const [filter, setFilter] = useState({
    projectId: undefined,
    assigneId: undefined,
    dueDate: undefined,
    search: undefined,
    status: "all",
  });

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
        <DataFilter filter={filter} setFilter={setFilter} />
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
              {JSON.stringify(data)}
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              {JSON.stringify(data)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}

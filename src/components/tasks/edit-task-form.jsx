/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { DottedSeparator } from "../dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import DashboardLoading from "@/components/Loading";
import DatePicker from "../datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import WorkspaceMemberavatar from "../workspaces/Member-avatar";

export default function EditTaskForm({
  onCancel,
  projectOptions,
  memberOptions,
  initialValues,
}) {
  console.log("23e46tr46tr45r45r4r5r45r45r45r4546r354", initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      ...initialValues,
    },
  });

  const onSubmit = async (data) => {
    //(data);
    setIsLoading(true);
    try {
      const response = await makeHTTPCall(
        `task/${initialValues.id}`,
        "PUT",
        true,
        {
          name: data.name,
          description: data.description,
          dueDate: data.dueDate,
          assigneeId: data.assigneeId,
          projectId: data.projectId,
          status: data.status,
        }
      );

      const { error, message } = response;
      if (error) throw new Error(message || "API error");
      toast.success("Task created successfully!");
      form.reset();

      if (onCancel) onCancel();
    } catch (error) {
      toast.error(error.message || "Failed to create task.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <>
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex p-7">
          <CardTitle className="text-xl font-bold">Update task</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter task Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <DatePicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assigneeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignee</FormLabel>
                      <Select
                        defaultValue={initialValues?.assigneeId?._id}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Assignee" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {memberOptions.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              <div className="flex items-center gap-x-2">
                                <WorkspaceMemberavatar
                                  className="size-6"
                                  name={member?.name}
                                />
                                {member?.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <SelectItem value="BACKLOG">Backlog</SelectItem>
                          <SelectItem value="TODO">To Do</SelectItem>
                          <SelectItem value="IN_PROGRESS">
                            In Progress
                          </SelectItem>
                          <SelectItem value="IN_REVIEW">In Review</SelectItem>
                          <SelectItem value="DONE">Done</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project</FormLabel>
                      <Select
                        defaultValue={initialValues?.projectId?._id}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Project" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {projectOptions.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              <div className="flex items-center gap-x-2">
                                <WorkspaceMemberavatar
                                  className="size-6"
                                  name={project?.name}
                                />
                                {project?.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DottedSeparator className="py-7" />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button type="submit" size="lg">
                  {isLoading ? "Loading..." : "Save Changes.."}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

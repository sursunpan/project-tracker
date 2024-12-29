/* eslint-disable react/prop-types */
import { PencilIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DottedSeparator } from "../dotted-separator";
import { useState } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

export default function TaskDescription({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description || "");
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setLoading(true);
    try {
      const response = await makeHTTPCall(`task/${task.id}`, "PUT", true, {
        description: description,
      });

      const { error, message } = response;
      if (error) throw new Error(message || "API error");
      toast.success("Task Update successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
          className=""
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            row={4}
          />
          <Button size="sm" className="w-fit ml-auto" onClick={onSave}>
            {loading ? "saving..." : "save Changes..."}
          </Button>
        </div>
      ) : (
        <div className="">
          {task.description || (
            <span className="text-muted-foreground">
              No description provided. Click the edit button to add one.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

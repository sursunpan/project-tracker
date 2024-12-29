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
import { useRef, useState } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { imageUploadOnAWS } from "@/helper/fileUpload";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useDeleteConfirm } from "@/hooks/Delete-Confirm-Hook";

export default function UpdateWorkspaceFrom({
  initialValue,
  onCancel,
  workspaceId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const [DeleteDialog, confirmDelete] = useDeleteConfirm(
    "Delete Workspace",
    "Are you sure you want to delete this workspace?",
    "destructive"
  );

  const [ResetDialog, confirmReset] = useDeleteConfirm(
    "Reset Invite Link",
    "Are you sure you want to Reset the Link?",
    "destructive"
  );

  const inputRef = useRef(null);

  const form = useForm({
    defaultValues: {
      ...initialValue,
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds 1MB");
      return;
    }
    form.setValue("image", file);
    setImagePreview(URL.createObjectURL(file));
    setIsImageChanged(true);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let imageUrl = null;
      const file = form.getValues("image");
      if (file && isImageChanged) {
        imageUrl = await imageUploadOnAWS(file);
        if (!imageUrl) throw new Error("Image upload failed");
      }
      const response = await makeHTTPCall(
        `workspace/${workspaceId}`,
        "PUT",
        true,
        {
          name: data.name,
          image: imageUrl,
        }
      );
      const { error, message, workspace } = response;
      if (error) throw new Error(message || "API error");

      toast.success("Workspace updated successfully!");
      form.reset();
      navigate(`/workspace/${response.workspace.id}`);
      if (workspace?.id) navigate(`/workspace/${workspace.id}`);
      if (onCancel) onCancel();
    } catch (error) {
      console.error("Error during workspace creation:", error);
      toast.error(error.message || "Failed to create workspace.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const ok = await confirmDelete();
      if (!ok) return;

      const response = await makeHTTPCall(
        `workspace/${initialValue.id}`,
        "DELETE",
        true
      );
      if (response.error === false) {
        toast.success("Workspace deleted successfully!");
        navigate("/");
      } else {
        throw new Error(response.message);
      }
      //("delete");
    } catch (error) {
      console.error("Error during workspace deletion:", error);
      toast.error(error.message || "Failed to delete workspace.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeLink = async () => {
    setIsLoading(false);
    try {
      const ok = await confirmReset();
      if (!ok) return;

      const response = await makeHTTPCall(
        `workspace/changeinvitecode/${initialValue.id}`,
        "POST",
        true
      );
      if (response.error === false) {
        toast.success("Invite link is updated!");
        window.location.reload();
      } else {
        throw new Error(response.message);
      }
      //("delete");
    } catch (error) {
      console.error("Error during workspace deletion:", error);
      toast.error(error.message || "Failed to reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  const fullInviteLink = `http://localhost:5173/workspace/${initialValue.id}/join/${initialValue.inviteCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullInviteLink);
    toast.success("Invite link copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button size="sm" variant="secondary" onClick={onCancel}>
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">Update workspace</CardTitle>
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
                  rules={{ required: "Workspace name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter workspace Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => {
                    return (
                      <div className="flex flex-col gap-y-2">
                        <div className="flex items-center gap-x-5">
                          {field.value ? (
                            <div className="size-[72px] relative rounded-md overflow-hidden">
                              <img
                                alt="logo"
                                className="object-cover"
                                src={imagePreview}
                              />
                            </div>
                          ) : (
                            <Avatar className="size-[72px]">
                              <AvatarFallback>
                                <ImageIcon className="size-[36px] text-neutral-400" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex flex-col">
                            <p className="text-sm">Workspace Icon</p>
                            <p className="text-sm text-muted-foreground">
                              JPG, PNG, SVG or JPEG, max 1mb
                            </p>
                            <input
                              className="hidden"
                              type="file"
                              accept=".jpg,.png,.svg,.jpeg"
                              ref={inputRef}
                              onChange={handleImageChange}
                            />
                            <Button
                              type="button"
                              variant="teritary"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  }}
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
                  {isLoading ? "Loading..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite Members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace.
            </p>
            <div className="mt-4 ">
              <div className="flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} />
                <Button
                  variant="secondary"
                  className="size-12"
                  onClick={handleCopyLink}
                >
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
            <Button
              className="mt-6 w-fit ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              onClick={handleChangeLink}
            >
              Reset invite link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting workspace is irreversible and will remove all associated
              resources.
            </p>
            <Button
              className="mt-6 w-fit ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              onClick={handleDelete}
            >
              Deleting the workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

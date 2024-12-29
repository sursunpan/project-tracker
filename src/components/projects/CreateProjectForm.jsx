/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { DottedSeparator } from "../DottedSeparator";
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
import { ImageIcon } from "lucide-react";
import { imageUploadOnAWS } from "@/helper/fileUpload";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import Loading from "@/components/Loading";

export default function CreateProjectForm({ onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const inputRef = useRef(null);

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        toast.error("File size exceeds 1MB");
        return;
      }
      form.setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let imageUrl = null;
      const file = form.getValues("image");
      if (file) {
        imageUrl = await imageUploadOnAWS(file);
        if (!imageUrl) throw new Error("Image upload failed");
      }
      const response = await makeHTTPCall(
        `/workspace/${params.id}/project/create`,
        "POST",
        true,
        {
          name: data.name,
          image: imageUrl,
          workSpaceId: params.id,
        }
      );

      const { error, message, project } = response;
      if (error) throw new Error(message || "API error");
      toast.success("Workspace Project created successfully!");
      form.reset();
      setImagePreview(null);

      if (project?.id)
        navigate(`/workspace/${project.workSpaceId}/project/${project.id}`); // do later

      if (onCancel) onCancel();
    } catch (error) {
      toast.error(error.message || "Failed to create workspace.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex p-7">
          <CardTitle className="text-xl font-bold">
            Create a new workspace project
          </CardTitle>
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
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter project Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={() => {
                    return (
                      <div className="flex flex-col gap-y-2">
                        <div className="flex items-center gap-x-5">
                          {imagePreview ? (
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
                            <p className="text-sm">Project Icon</p>
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
                <Button disabled={isLoading} type="submit" size="lg">
                  {isLoading ? <Loading /> : "Create Project"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

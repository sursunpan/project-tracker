/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function ProjectAvatar({
  image,
  name,
  className,
  avatarFallbackClassName,
}) {
  if (image) {
    return (
      <div
        className={cn("size-5 relative rounded-md overflow-hidden", className)}
      >
        <img src={image} alt={name} className="object-cover w-full h-full" />
      </div>
    );
  }

  return (
    <Avatar
      className={cn("size-5 relative rounded-md overflow-hidden", className)}
    >
      <AvatarFallback
        className={cn(
          "text-white bg-blue-600 font-semibold text-lg uppercase rounded-md",
          avatarFallbackClassName
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
}

/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function WorkspaceMemberavatar({
  name,
  className,
  fallBackClassName,
}) {
  return (
    <Avatar
      className={cn(
        "size-5 transition border border-neutral-300 rounded-full",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
          fallBackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

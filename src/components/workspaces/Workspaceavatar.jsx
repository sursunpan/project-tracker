/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Workspaceavatar({ image, name, className }) {
  if (image) {
    return (
      <div
        className={cn("size-10 relative rounded-md overflow-hidden", className)}
      >
        <img src={image} alt={name} className="object-cover w-full h-full" />
      </div>
    );
  }

  return (
    <Avatar
      className={cn("size-10 relative rounded-md overflow-hidden", className)}
    >
      <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase rounded-md">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
}

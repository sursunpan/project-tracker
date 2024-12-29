import { useLocation } from "react-router-dom";
import UserButton from "./auth/UserButton";
import MobileSidebar from "./MobileSidebar";

const pathNameMap = {
  tasks: {
    title: "My Tasks",
    description: "View all of your task here",
  },
  project: {
    title: "My Projects",
    description: "View tasks of your project here",
  },
};

const defaultMap = {
  title: "Home",
  description: "Monitor all of your projects and tasks here",
};

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3];
  const { title, description } = pathNameMap[pathnameKey] || defaultMap;
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
}

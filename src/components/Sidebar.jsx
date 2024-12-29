import { Link } from "react-router-dom";
import { DottedSeparator } from "./DottedSeparator";
import Navigation from "./Navigation";
import WorkspaceSwitcher from "./workspaces/WorkspaceSwitcher";
import Projects from "./projects/Projects";

export default function Sidebar() {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link to="">
        <img src="/logo.svg" height={48} width={164} alt="Logo" />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
}

import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon } from "lucide-react";
import {
  GoHome,
  GoHomeFill,
  GoCheckCircle,
  GoCheckCircleFill,
} from "react-icons/go";
import { Link, useLocation, useParams } from "react-router-dom";

const routes = [
  {
    lable: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    lable: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    lable: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    lable: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export default function Navigation() {
  const params = useParams();
  const { pathname } = useLocation();

  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const fullHref = `/workspace/${params.id}${item.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;

        //(fullHref, pathname);

        return (
          <Link key={item.href} to={fullHref}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.lable}
            </div>
          </Link>
        );
      })}
    </ul>
  );
}

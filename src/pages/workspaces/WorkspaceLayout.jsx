import UserButton from "@/components/auth/UserButton";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function WorkspaceLayout({ children }) {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link to="/">
            <img src="/logo.svg" height={56} width={152} alt="Logo" />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
}

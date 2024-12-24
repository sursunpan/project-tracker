import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

//<img src="/logo.svg" height={50} width={100} alt="Logo" />
const AuthLayout = ({ children }) => {
  const location = useLocation();
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <img src="/logo.svg" height={56} width={152} alt="Logo" />
          <Button variant="secondary">
            <Link
              to={location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
            >
              {location.pathname === "/sign-in" ? "Sign Up" : "Log In"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;

import { SignInCard } from "@/components/auth/SignInCard";
import AuthLayout from "./AuthLayout";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Navigate } from "react-router-dom";

export default function SignIn() {
  const { token, user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (token && user) {
    return <Navigate to="/" />;
  }
  return (
    <AuthLayout>
      <SignInCard />
    </AuthLayout>
  );
}

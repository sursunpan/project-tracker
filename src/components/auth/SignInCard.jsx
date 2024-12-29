import { DottedSeparator } from "../DottedSeparator";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Link, useNavigate } from "react-router-dom";
import { makeHTTPCall } from "@/helper/make-http-call";
import { useCallback, useState } from "react";
import { Login_User } from "@/redux/slices/userCredentialSlice";
import { decodeToken } from "@/helper/jwt-decode";
import { toast } from "sonner";
import Loading from "../Loading";

export const SignInCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const response = await makeHTTPCall("login", "POST", false, {
          email: data.email,
          password: data.password,
        });
        if (response.error === true) {
          setIsLoading(false);
          toast.error(response.message);
        } else {
          setIsLoading(false);
          toast.success("Login Successfully!");
          if (!response.user) {
            response.user = decodeToken(response.token);
          }
          dispatch(Login_User({ token: response.token, user: response.user }));
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to login. Please try again.");
        setIsLoading(false);
      }
    },
    [dispatch, navigate]
  );

  return (
    <>
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
        <CardHeader className="flex items-center justify-center text-center p-7">
          <CardTitle className="text-2xl">Welcome back!</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                rules={{
                  required: "Password is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} size="lg" className="w-full">
                {isLoading ? <Loading /> : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7 flex flex-col gap-y-4">
          <Button
            disabled={isLoading}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <FcGoogle className="mr-2 size-5" />
            Login With Google
          </Button>
          <Button
            disabled={isLoading}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <FaGithub className="mr-2 size-5" />
            Login With Github
          </Button>
        </CardContent>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7 flex items-center justify-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/sign-up">
              <span className="text-blue-700">&nbsp;Sign up</span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

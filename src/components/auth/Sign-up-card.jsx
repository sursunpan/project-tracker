import { DottedSeparator } from "../dotted-separator";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { makeHTTPCall } from "@/helper/make-http-call";
import { useState } from "react";
import { toast } from "sonner";

export const SignUpCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await makeHTTPCall("register", "POST", false, {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (response.error === true) {
      setIsLoading(false);
      toast.error(response.message);
    } else {
      setIsLoading(false);
      toast.success("Registration Successful! Please login now.");
      navigate("/sign-in");
    }
  };

  return (
    <>
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
        <CardHeader className="flex items-center justify-center text-center p-7">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            By signing up, you agree to our{" "}
            <Link href="/privacy">
              <span className="text-blue-700">Privacy Policy</span>
            </Link>{" "}
            and{" "}
            <Link href="/terms">
              <span className="text-blue-700">Terms of Service</span>
            </Link>
          </CardDescription>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="name"
                rules={{
                  required: "Name is required",
                }}
                render={({ field, fieldState }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field, fieldState }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="password"
                rules={{
                  required: "Password is required",
                }}
                render={({ field, fieldState }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  );
                }}
              />
              <Button disabled={false} size="lg" className="w-full">
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7 flex flex-col gap-y-4">
          <Button
            disabled={false}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <FcGoogle className="mr-2 size-5" />
            Login With Google
          </Button>
          <Button
            disabled={false}
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
            Already have a account{" "}
            <Link to="/sign-in">
              <span className="text-blue-700">&nbsp;Sign in</span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

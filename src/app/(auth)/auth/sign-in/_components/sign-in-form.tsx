"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type FormType = z.infer<typeof formSchema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (payload: FormType) => {
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Login successful!");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(`login error : ${error}`);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(payload: FormType) {
    await handleSignIn(payload);
  }

  return (
    <div className="bg-white p-8 rounded-xl space-y-8">
      <div className="text-center">
        <div>
          <Image
            src={"/logo.png"}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-16 w-16 object-cover mx-auto"
          />
          <h1 className="text-3xl font-bold text-primary mt-4 mb-1">MDS-AI™</h1>
          <h5 className="font-medium opacity-50">
            Welcome back. Sign in to manage and process your resident
            documentation.
          </h5>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    {...field}
                    className="h-[50px] bg-[#eaeaea] "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter Password"
                    {...field}
                    className="h-[50px] bg-[#eaeaea] "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end">
            <Link href={"/auth/forgot-password"} className="hover:underline">
              <p className="text-sm font-medium text-primary">
                Forgot Password?
              </p>
            </Link>
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full h-[50px] disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-1">
                <span>
                  <Spinner />
                </span>

                <span>Sign In</span>
              </span>
            ) : (
              `Sign In`
            )}
          </Button>

          <div>
            <p>
              Don&apos;t have an account ?{" "}
              <Link
                href={"/auth/sign-up"}
                className="text-primary font-bold underline"
              >
                <span>Sign Up</span>.
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;

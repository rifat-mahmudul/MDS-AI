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

const formSchema = z.object({
  email: z.string().email(),
});

type FormType = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
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
            Please enter the email address linked to your account. We&apos;ll
            send a one-time password (OTP) to your email for verification.
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

          <Button type="submit" className="w-full h-[50px]">
            Send OTP
          </Button>

          <div className="text-center">
            <p>
              Back To{" "}
              <Link
                href={"/auth/sign-in"}
                className="text-primary font-bold underline"
              >
                <span>Sign In</span>.
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;

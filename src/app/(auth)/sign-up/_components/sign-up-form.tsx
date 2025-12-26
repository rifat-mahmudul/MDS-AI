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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const formSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "First Name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last Name is required",
    }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormType = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
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
          <h5 className="font-medium opacity-50">Create an account</h5>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col lg:flex-row items-center gap-5 w-full">
            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter First Name"
                        {...field}
                        className="h-[50px] bg-[#eaeaea] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Last Name"
                        {...field}
                        className="h-[50px] bg-[#eaeaea] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

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
                  <Input
                    placeholder="Enter Password"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
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
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className=" text-primary">
                    I agree to the{" "}
                    <Link href="/terms" className="underline">
                      Terms and Conditions
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-[50px]">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;

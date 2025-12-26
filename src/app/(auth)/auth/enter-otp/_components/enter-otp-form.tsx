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
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const formSchema = z.object({
  otp: z.string().min(1, { message: "OTP is required." }),
});

type FormType = z.infer<typeof formSchema>;

const EnterOtpForm = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      otp: "",
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
            An OTP has been sent to your email address please verify it below
          </h5>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="otp"
            render={() => (
              <FormItem>
                <FormLabel className="text-primary">OTP</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  >
                    <InputOTPGroup className="space-x-6">
                      <InputOTPSlot
                        index={0}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                        
                      />
                      <InputOTPSlot
                        index={1}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                      <InputOTPSlot
                        index={2}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                      <InputOTPSlot
                        index={3}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                      <InputOTPSlot
                        index={4}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                      <InputOTPSlot
                        index={5}
                        className="border-0 h-14 w-16 rounded-md bg-[#eaeaea]"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-[50px]">
            Verify
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

export default EnterOtpForm;

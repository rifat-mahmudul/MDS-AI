"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  professionalTitle: z.string().optional(),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone Number must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  location: z.string(),
  postalCode: z.string(),
});

const PersonalInformationForm = () => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      professionalTitle: "",
      email: "",
      phone: "",
      address: "",
      location: "",
      postalCode: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["profile-update"],
    mutationFn: async (payload: z.infer<typeof formSchema>) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Profile Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutateAsync(values);
    } catch (error) {
      console.log(`error from update profile :  ${error}`);
    }
  }
  return (
    <div className="h-full py-6 px-8 bg-white rounded-[8px] shadow-[0_4px_8px_rgba(0,0,0,0.12)]">
      <div>
        <h4 className="text-xl md:text-2xl text-[#343A40] leading-[120%] font-semibold">
          Personal Information
        </h4>
        <p className="text-base font-normal text-[#68706A] leading-[120%] pt-3">
          Manage your personal information and profile details.
        </p>
      </div>
      {/* form  */}
      <div className="pt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                        placeholder="Maria Jasmin"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                        placeholder="Maria Jasmin"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="professionalTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                    Professional Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                      placeholder="San Francisco"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                        placeholder="bessieedwards@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                        placeholder="+1 (555) 123-4567"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                    Street Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                      placeholder="San Francisco"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                        placeholder="Admin"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                      Postal Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                        placeholder="Pricing Management, Badge Approvals, Blog Management"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center justify-end gap-6 pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="h-[50px] text-sm text-[#E5102E] leading-[120%] font-medium py-4 px-6 rounded-[6px] border border-[#E5102E]"
              >
                Discard Changes
              </Button>

              <Button
                disabled={isPending}
                type="submit"
                className="h-[50px] disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center gap-1">
                    <span>
                      <Spinner />
                    </span>

                    <span>Save Changes</span>
                  </span>
                ) : (
                  `Save Changes`
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PersonalInformationForm;

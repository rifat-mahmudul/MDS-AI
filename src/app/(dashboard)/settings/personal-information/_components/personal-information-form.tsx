"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react"; // Add this import

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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { UserProfileApiResponse } from "../../_components/user-data-type";

// Update form schema to match API response fields
const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  professionTitle: z.string().optional(),
  phone: z.string().optional(),
  streetAddress: z.string().optional(),
  location: z.string().optional(),
  postCode: z.string().optional(),
  profileImage: z.string().optional(),
});

const PersonalInformationForm = () => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useQuery<UserProfileApiResponse>({
    queryKey: ["user-data"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await res.json();
    },
    enabled: !!token,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      professionTitle: "",
      phone: "",
      streetAddress: "",
      location: "",
      postCode: "",
      profileImage: "",
    },
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      form.reset({
        firstName: data?.data?.firstName || "",
        lastName: data?.data?.lastName || "",
        email: data?.data?.email || "",
        professionTitle: data?.data?.professionTitle || "",
        phone: data?.data?.phone || "",
        streetAddress: data?.data?.streetAddress || "",
        location: data?.data?.location || "",
        postCode: data?.data?.postCode || "",
        profileImage: data.data.profileImage || "",
      });
    }
  }, [isSuccess, data, form]);

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

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-full py-6 px-8 bg-white rounded-[8px] shadow-[0_4px_8px_rgba(0,0,0,0.12)] flex items-center justify-center">
        <Spinner />
      </div>
    );
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
                        placeholder="Enter first name"
                        {...field}
                        value={field.value || ""}
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
                        placeholder="Enter last name"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="professionTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                    Professional Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                      placeholder="Enter professional title"
                      {...field}
                      value={field.value || ""}
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
                        placeholder="Enter email address"
                        {...field}
                        value={field.value || ""}
                        type="email"
                        disabled
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
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                    Street Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                      placeholder="Enter street address"
                      {...field}
                      value={field.value || ""}
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
                        placeholder="Enter location"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#3B4759] leading-[120%] font-medium">
                      Postal Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px] w-full rounded-[4px] border-[#C0C3C1] p-3 placeholder:text-[#8E959F] text-[#3B4759] text-base ring-0 outline-none leading-[120%] font-normal"
                        placeholder="Enter postal code"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {/* Hidden field for profileImage (if needed) */}
            <input type="hidden" {...form.register("profileImage")} />

            <div className="w-full flex items-center justify-end gap-6 pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (data?.data) {
                    form.reset({
                      firstName: data.data.firstName || "",
                      lastName: data.data.lastName || "",
                      email: data.data.email || "",
                      professionTitle: data?.data?.professionTitle || "",
                      phone: data?.data?.phone || "",
                      streetAddress: data?.data?.streetAddress || "",
                      location: data?.data?.location || "",
                      postCode: data?.data?.postCode || "",
                      profileImage: data.data.profileImage || "",
                    });
                  }
                }}
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

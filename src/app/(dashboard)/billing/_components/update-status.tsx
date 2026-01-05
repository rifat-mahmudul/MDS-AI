import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { Invoice } from "./invoice-history";

const UpdateStatus = ({ item, token }: { item: Invoice; token: string }) => {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      invoiceId,
      status,
    }: {
      invoiceId: string;
      status: string;
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoice/${invoiceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update invoice status");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Invoice status updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    updateStatusMutation.mutate({ invoiceId, status: newStatus });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="flex justify-center">
      <Select
        defaultValue={item?.status}
        onValueChange={(value) => handleStatusChange(item._id, value)}
        disabled={updateStatusMutation.isPending}
      >
        <SelectTrigger className={`w-[120px] ${getStatusColor(item?.status)}`}>
          <SelectValue placeholder="Status">
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  item?.status === "paid"
                    ? "bg-green-500"
                    : item?.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
              />
              <span className="capitalize">{item?.status}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paid" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Paid
            </div>
          </SelectItem>
          <SelectItem value="pending" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              Pending
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UpdateStatus;

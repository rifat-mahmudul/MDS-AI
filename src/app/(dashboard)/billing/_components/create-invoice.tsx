"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface Payload {
  amount: string;
}

export function CreateInvoice({ open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const [amount, setAmount] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-invoice"],
    mutationFn: async (data: Payload) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleCreate = async () => {
    const payload = {
      amount,
    };

    if (!amount) {
      return toast.error("Please Enter Amount!");
    }

    try {
      await mutateAsync(payload);
    } catch (error) {
      console.log(`error from create invoice: ${error}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="text-center">
            <DialogTitle>Create Invoice</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Enter Amount</Label>
              <Input
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="h-[45px]"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreate} type="submit">
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Create...
                </span>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

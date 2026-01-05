import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Eye, Plus } from "lucide-react";
import React, { useState } from "react";
import { CreateInvoice } from "./create-invoice";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

interface Invoice {
  _id: string;
  invoiceId: string;
  createdAt: string;
  amount: number | string;
}

const InvoiceHistory = () => {
  const tableHeaderClass = "text-center text-white font-medium";
  const tableRowClass = "h-[50px] text-center opacity-70 font-medium";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const session = useSession();
  const status = session?.status;
  const token = session?.data?.user?.accessToken;

  const { data: invoices = [], isLoading } = useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoice`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch invoices");
      }

      const data = await res.json();
      return data?.data || [];
    },
    enabled: !!token,
  });

  const SkeletonRow = () => (
    <TableRow>
      <TableCell className={tableRowClass}>
        <Skeleton className="h-4 w-24 mx-auto" />
      </TableCell>
      <TableCell className={tableRowClass}>
        <Skeleton className="h-4 w-28 mx-auto" />
      </TableCell>
      <TableCell className={tableRowClass}>
        <Skeleton className="h-4 w-20 mx-auto" />
      </TableCell>
      <TableCell className={tableRowClass}>
        <Skeleton className="h-6 w-16 mx-auto rounded-full" />
      </TableCell>
      <TableCell className={tableRowClass}>
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </TableCell>
    </TableRow>
  );

  const PlanUsageSkeleton = () => (
    <Card className="border-none shadow-sm">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-12" />
        </div>
        <div className="relative pt-1">
          <Skeleton className="h-2.5 w-full" />
        </div>
      </CardContent>
    </Card>
  );

  const HeaderSkeleton = () => (
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-[45px] w-40" />
    </div>
  );

  return (
    <div className="space-y-5">
      {isLoading ? (
        <PlanUsageSkeleton />
      ) : (
        <Card className="border-none shadow-sm">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Plan Usage</h2>
              <span className="text-lg font-semibold text-[#1a2b3b]">
                {invoices?.length}
              </span>
            </div>
            <div className="relative pt-1">
              <Progress value={invoices?.length} className="h-2.5 bg-slate-100" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-5">
        {isLoading ? (
          <HeaderSkeleton />
        ) : (
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-primary">
              Invoice History
            </h1>
            <Button onClick={() => setIsOpen(true)} className="h-[45px]">
              <Plus /> Create Invoice
            </Button>
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <Table>
            <TableHeader className="bg-primary hover:bg-primary/90 h-[50px]">
              <TableRow>
                <TableHead className={`${tableHeaderClass}`}>
                  Invoice #
                </TableHead>
                <TableHead className={`${tableHeaderClass}`}>Date</TableHead>
                <TableHead className={`${tableHeaderClass}`}>Amount</TableHead>
                <TableHead className={`${tableHeaderClass}`}>Status</TableHead>
                <TableHead className={`${tableHeaderClass}`}>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading || status === "loading" ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : invoices?.length > 0 ? (
                invoices.map((item: Invoice) => (
                  <TableRow key={item._id}>
                    <TableCell className={`${tableRowClass} max-w-[150px]`}>
                      {item.invoiceId}
                    </TableCell>
                    <TableCell className={tableRowClass}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={tableRowClass}>
                      {item.amount}
                    </TableCell>
                    <TableCell className={tableRowClass}>Paid</TableCell>
                    <TableCell
                      className={`${tableRowClass} flex items-center justify-center gap-2`}
                    >
                      <button>
                        <Eye className="h-4 w-4" />
                      </button>
                      <button>
                        <Download className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="text-gray-400">No invoices found</div>
                      <Button onClick={() => setIsOpen(true)} size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Create Your First
                        Invoice
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {isOpen && (
            <CreateInvoice
              open={isOpen}
              onOpenChange={() => setIsOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceHistory;

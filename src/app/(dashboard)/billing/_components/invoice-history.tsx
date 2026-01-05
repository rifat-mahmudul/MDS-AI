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

const InvoiceHistory = () => {
  const tableHeaderClass = "text-center text-white font-medium";
  const tableRowClass = "h-[50px] text-center opacity-70 font-medium";

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="space-y-5">
      {/* Plan Usage Card */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Plan Usage</h2>
            <span className="text-lg font-semibold text-[#1a2b3b]">65%</span>
          </div>
          <div className="relative pt-1">
            <Progress value={65} className="h-2.5 bg-slate-100" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-primary">
            Invoice History
          </h1>

          <Button onClick={() => setIsOpen(true)} className="h-[45px]">
            <Plus /> Create Invoice
          </Button>
        </div>

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
              <TableRow>
                <TableCell className={tableRowClass}>INV-2025-001</TableCell>
                <TableCell className={tableRowClass}>Dec 10, 2025</TableCell>
                <TableCell className={tableRowClass}>----</TableCell>
                <TableCell className={tableRowClass}>Paid</TableCell>
                <TableCell
                  className={`${tableRowClass} flex items-center justify-center gap-2`}
                >
                  <button>
                    <Eye />
                  </button>

                  <button>
                    <Download />
                  </button>
                </TableCell>
              </TableRow>
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

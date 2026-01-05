import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Eye } from "lucide-react";
import React from "react";

const InvoiceHistory = () => {
  const tableHeaderClass = "text-center text-white font-medium";
  const tableRowClass = "h-[50px] text-center opacity-70 font-medium";

  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary mb-4">
        Invoice History
      </h1>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <Table>
          <TableHeader className="bg-primary hover:bg-primary/90 h-[50px]">
            <TableRow>
              <TableHead className={`${tableHeaderClass}`}>Invoice #</TableHead>
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

                <button className={tableRowClass}>
                  <Download />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceHistory;

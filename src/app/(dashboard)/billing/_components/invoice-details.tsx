import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export interface InvoiceDetails {
  _id: string;
  invoiceId: string;
  date: string;
  amount: string | number;
  status: "pending" | "paid" | "draft";
  html: string;
  subject: string;
  emailSent: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvoiceDetailsProps {
  invoice: InvoiceDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: string;
}

const InvoiceDetails = ({
  invoice,
  open,
  onOpenChange,
  token,
}: InvoiceDetailsProps) => {
  if (!invoice) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoice/download/${invoice._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${invoice.invoiceId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${invoice.subject}</title>
            <style>
              body { margin: 0; padding: 20px; }
              @media print {
                body { padding: 0; }
              }
            </style>
          </head>
          <body>${invoice.html}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between mt-5">
            <span>Invoice Details</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="h-8"
              >
                <Download className="h-4 w-4 mr-1" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="h-8"
              >
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 ">
          {/* HTML Preview */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <p className="text-sm font-medium">Invoice Preview</p>
            </div>
            <div className="p-0">
              <iframe
                srcDoc={invoice.html}
                className="w-full h-[700px] border-0"
                title="Invoice Preview"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDetails;

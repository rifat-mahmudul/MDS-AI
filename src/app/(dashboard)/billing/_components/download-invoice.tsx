import { Spinner } from "@/components/ui/spinner";
import { Download } from "lucide-react";
import React, { useState } from "react";
import { Invoice } from "./invoice-history";

interface Props {
  token: string;
  item: Invoice;
}

const DownloadInvoice = ({ token, item }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownloadPdf = async (invoiceId: string) => {
    try {
      setLoading(true);
      const urlRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoice/${invoiceId}/pdf`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!urlRes.ok) {
        throw new Error("Failed to get download URL");
      }

      const urlData = await urlRes.json();
      const downloadUrl = urlData.data.downloadUrl;

      const pdfRes = await fetch(downloadUrl);

      if (!pdfRes.ok) {
        throw new Error("Failed to fetch PDF");
      }

      const blob = await pdfRes.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleDownloadPdf(item?.invoiceId)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        {loading ? <Spinner /> : <Download className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default DownloadInvoice;

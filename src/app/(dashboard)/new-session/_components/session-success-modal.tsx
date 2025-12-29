import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const SessionSuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  if (!isOpen) return null;

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-white rounded-xl p-8 text-center space-y-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          <Image
            src="/session-success.png"
            alt="Password reset successful"
            width={1000}
            height={1000}
            className="h-32 w-32 object-cover rounded-full mx-auto"
          />

          <h1 className="text-primary text-xl font-semibold">
            Your MDS-AI analysis is ready.
          </h1>

          <div>
            <Link href={`/report-history/${id}`}>
              <Button className="h-[50px] w-[160px] font-semibold">
                View Report
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSuccessModal;

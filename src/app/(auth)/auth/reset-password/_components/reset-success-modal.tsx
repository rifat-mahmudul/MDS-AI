import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetSuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm bg-white rounded-xl p-8 text-center space-y-4">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          <Image
            src="/success-reset.png"
            alt="Password reset successful"
            width={1000}
            height={1000}
            className="h-16 w-16 object-cover rounded-full mx-auto"
          />

          <h1 className="text-primary font-bold text-3xl">
            Password Changed Successfully
          </h1>

          <p className="opacity-70">
            Your MDS-AI Password has been updated successfully
          </p>

          <div>
            <Link href="/auth/sign-in">
              <Button className="h-[50px] w-full">Back to Sign in</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccessModal;

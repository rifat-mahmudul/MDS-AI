"use client";
import AppTopBar from "@/components/shared/app-topbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Image from "next/image";
import React from "react";
import InvoiceHistory from "./invoice-history";

const Billing = () => {
  return (
    <div className="space-y-8">
      <div>
        <AppTopBar
          title="Billing"
          desc="Manage your facility's plan, payment methods and view invoice
              history. Securely Handled via Stripe."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Plan Card */}
        <Card className="overflow-hidden border-none shadow-sm md:col-span-2">
          <CardContent className="p-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <div className="flex-1 space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold">
                      MDS-AI™ Facility Plan
                    </h2>
                    <Badge
                      variant="secondary"
                      className="bg-[#e8f5ed] text-[#2d7a4d] hover:bg-[#e8f5ed] font-medium px-3 py-0.5 rounded-full border-none"
                    >
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">
                    Clinical documentation processing with advanced MDS and PDPM
                    insights
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-semibold text-[#1a2b3b]">
                    Facility Subscription
                  </h3>
                  <p className="text-sm text-slate-400">
                    Next billing date: January 10, 2026
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <Image
                  src="/payment.png"
                  alt="MDS AI Logo"
                  width={1000}
                  height={1000}
                  className="h-[150px] w-[150px] object-contain"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details Card */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-8 space-y-8">
            <h2 className="text-xl font-semibold">Payment Details</h2>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-300">
                  Payment Method
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-14 items-center justify-center rounded bg-[#1a2b3b] font-bold italic text-white text-[10px]">
                    VISA
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    **** 3434
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-300">
                  Billing Contact
                </p>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">billing@gmail.com</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      

      <div>
        <InvoiceHistory />
      </div>
    </div>
  );
};

export default Billing;

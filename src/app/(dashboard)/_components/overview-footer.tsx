import { Button } from "@/components/ui/button";
import { CirclePlus, MessageCircleQuestionMark, Receipt } from "lucide-react";
import React from "react";

const OverviewFooter = () => {
  return (
    <div className="space-x-5">
      <Button className="h-[50px] w-[180px] font-medium">
        <CirclePlus /> New Session
      </Button>

      <Button className="h-[50px] w-[180px] font-medium">
        <Receipt /> Billing
      </Button>

      <Button className="h-[50px] w-[180px] font-medium">
        <MessageCircleQuestionMark /> Support
      </Button>
    </div>
  );
};

export default OverviewFooter;

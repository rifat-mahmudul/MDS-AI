import Image from "next/image";
import React from "react";

const States = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white p-5 shadow-[1px_2px_10px_0px_#00000029] rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="opacity-50">Sessions Processed Today</h1>
          <Image
            src={`/states-1.png`}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-12 w-12 object-cover rounded-md"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mt-5">14</h1>
        </div>
      </div>

      <div className="bg-white p-5 shadow-[1px_2px_10px_0px_#00000029] rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="opacity-50">Average Alignment Score</h1>
          <Image
            src={`/states-2.png`}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-12 w-12 object-cover rounded-md"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mt-5">14%</h1>
        </div>
      </div>

      <div className="bg-white p-5 shadow-[1px_2px_10px_0px_#00000029] rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="opacity-50">High-Risk Flags Identified</h1>
          <Image
            src={`/states-3.png`}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-12 w-12 object-cover rounded-md"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mt-5">14</h1>
        </div>
      </div>
    </div>
  );
};

export default States;

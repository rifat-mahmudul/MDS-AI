import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Auth = () => {
  return (
    <div className="text-white space-y-5">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Welcome to MDS-AI</h1>
        <p className="opacity-85 mt-1">Reducing the stress of MDS, one chart at a time.</p>
      </div>

      <div>
        <Image
          src={"/auth-logo.png"}
          alt="img.png"
          width={1000}
          height={1000}
          className="h-[481px] w-[650px] object-cover"
        />
      </div>

      <div className="text-center space-x-5">
        <Link href={"/auth/sign-up"}>
          <Button className="bg-white hover:bg-white text-primary h-[45px] w-[150px] rounded-3xl text-lg font-bold">
            Sign Up
          </Button>
        </Link>

        <Link href={"/auth/sign-in"}>
          <Button className="h-[45px] w-[150px] rounded-3xl text-lg font-bold">
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Auth;

"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/TempHeader";
import { address, contactInfo, socialIcons } from "@/constants";
import { bgsvg } from "@/public";

const WelcomePage = () => {
  return (
    <div className="">
      {/* <div className="absolute h-auto opacity-50">
        <Image src={bgsvg} height={200} width={1200} alt="backgroudn" />
      </div> */}
      <div>
        <Header
          address={address}
          contactInfo={contactInfo}
          socialIcons={socialIcons}
        />
      </div>
    </div>
  );
};

export default WelcomePage;

const UserInfo = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center mb-4">
      {user.imageUrl && (
        <Image
          src={user.imageUrl}
          alt="Profile picture"
          width={100}
          height={100}
          className="rounded-full mr-4"
        />
      )}
      <h1 className="text-2xl font-bold">Welcome, {user.firstName}!</h1>
      <p className="mb-2">
        Your email: {user.primaryEmailAddress?.emailAddress || "Not provided"}
      </p>
      <p className="mb-2">
        Your mobile number:{" "}
        {user.primaryPhoneNumber?.phoneNumber || "Not provided"}
      </p>
    </div>
  );
};

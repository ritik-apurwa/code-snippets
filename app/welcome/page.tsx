"use client"

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/TempHeader";
import { address, contactInfo, socialIcons } from "@/constants";



const WelcomePage = () => {
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
    <div className="p-4">
      <div>
        <Header address={address} contactInfo={contactInfo} socialIcons={socialIcons}/>
      </div>
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
      </div>
      <p className="mb-2">We are glad to see you here.</p>
      <p className="mb-2">Your email: {user.primaryEmailAddress?.emailAddress || "Not provided"}</p>
      <p className="mb-2">Your mobile number: {user.primaryPhoneNumber?.phoneNumber || "Not provided"}</p>
      <p>Enjoy your stay!</p>
    </div>
  );
};

export default WelcomePage;
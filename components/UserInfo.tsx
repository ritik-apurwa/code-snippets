"use client"
import { callsvg, emailsvg } from "@/public";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const UserInfo = () => {
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
      <div className="mx-auto">
        <div className="flex flex-col gap-2 items-center mb-4">
          <h1 className="text-xl font-bold">Welcome, {user.firstName}!</h1>
          {user.imageUrl && (
            <Image
              src={user.imageUrl}
              alt="Profile picture"
              width={64}
              height={64}
              className="rounded-full mr-4"
            />
          )}
  
         <section className="flex flex-col items-start justify-center">
         <div className="flex flex-row gap-x-2 text-sm items-center h-10">
            <Image src={emailsvg} height={24} width={24} alt="email" />
            <p> {user.primaryEmailAddress?.emailAddress || "Not provided"}</p>
          </div>
          <div className="flex flex-row gap-x-2 text-sm items-center h-10">
            <Image src={callsvg} height={24} width={24} alt="phone" />
            {user.primaryPhoneNumber?.phoneNumber || "Not provided"}
          </div>
         </section>
        </div>
        <div>
         
        </div>
      </div>
    );
  };


  
"use client"

import { SignedOut, SignedIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/welcome");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <header>
      <SignedOut>
        <Link href="/sign-in">Sign in</Link>
        <Link href="/sign-up">Sign up</Link>
      </SignedOut>
      <SignedIn>
        <Link href="/welcome">Go to Welcome Page</Link>
      </SignedIn>
    </header>
  );
};

export default Page;
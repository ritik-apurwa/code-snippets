import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <SignUp />
    </section>
  );
}

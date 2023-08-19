"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Client() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signIn");
    },
  });
  return <div className="p-10">Client</div>;
}

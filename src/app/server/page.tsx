import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Server() {
  const session = await getServerSession(options);
  console.log(session);
  if (!session) {
    redirect("/signIn");
  }

  return <div className="p-10">Server</div>;
}

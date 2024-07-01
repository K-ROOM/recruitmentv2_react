import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import Login from "@/app/components/login";

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/main");
  } else {
    return (
      <>
        <Login />
      </>
    )
  }
}
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { Suspense } from "react";
import Loading from "../loading";
import Login from "../components/login";
import MainBody from "../components/main_body";

export default async function Main() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <>
        <Suspense fallback={<Loading />}>
          <MainBody session={session} />
        </Suspense>
      </>
    )
  } else {
    return (
      <>
        <Login />
      </>
    )
  }
}

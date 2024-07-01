import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import PermissionDenied from "../components/permission_denied";
import Body from "../components/main_body";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { Suspense } from "react";
import Loading from "../loading";
import Login from "../components/login";
import MyApplicationBody from "../components/my_application_body";

export default async function MyApplicationPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <>
        <Suspense fallback={<Loading />}>
          <MyApplicationBody session={session} />
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

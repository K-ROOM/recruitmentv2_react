import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import FormSignup_Navbar from "../components/formsignup_navbar";
import FormSignup_Body from "../components/formsignup_body";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function Signup() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/main");
  } else {
    return (
      <>
        <FormSignup_Body />
      </>
    )
  }
}
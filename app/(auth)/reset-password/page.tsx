import { redirect } from "next/navigation";
import ResetPasswordForm from "./resetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await searchParams).token;
  if (!token) {
    redirect("/login?error=invalid_reset_link");
  }
  return (
    <div className="flex flex-1 justify-center">
      <ResetPasswordForm className="max-w-md justify-stretch" token={token} />
    </div>
  );
}

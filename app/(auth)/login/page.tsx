import { CheckCircle } from "lucide-react";
import LoginForm from "../_components/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const error = (await searchParams).error;
  return (
    <div className="flex flex-1 justify-center">
      <LoginForm className="max-w-md" error={error} />
    </div>
  );
}

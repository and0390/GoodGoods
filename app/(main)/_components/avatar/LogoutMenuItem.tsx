"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import { AuthSession } from "../../../(shared)/_types/auth";

export const LogoutMenuItem = (
  props: Omit<ComponentProps<typeof DropdownMenuItem>, "variant" | "onSelect">
) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  };

  return (
    <>
      <DropdownMenuItem
        variant="destructive"
        onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        {...props}
      >
        Log out
      </DropdownMenuItem>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log Out?</AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;ll need to Log In later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

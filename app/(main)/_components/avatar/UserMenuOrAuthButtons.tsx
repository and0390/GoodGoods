import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { AuthUser } from "../../../(shared)/_types/auth";
import { LogoutMenuItem } from "./LogoutMenuItem";

type UserAvatarMenuProps = {
  authUser: AuthUser;
};

const UserAvatarMenu = ({ authUser }: UserAvatarMenuProps) => {
  const { image, name } = authUser;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hidden rounded-full sm:flex"
        >
          <Avatar>
            <AvatarImage src={image ?? undefined} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LogoutMenuItem />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const UserMenuOrAuthButtons = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return <UserAvatarMenu authUser={session["user"]} />;
  }

  return (
    <div className="hidden flex-none gap-2 sm:flex">
      <Button size="lg" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
      <Button size="lg" variant="secondary" asChild>
        <Link href="/login">Log In</Link>
      </Button>
    </div>
  );
};

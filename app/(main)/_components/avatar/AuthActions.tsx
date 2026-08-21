import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
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
import Link from "next/link";
import { LogoutMenuItem } from "./LogoutMenuItem";

type UserAvatarMenuProps = {
  imageUrl: string | null;
  name: string;
};

const UserAvatarMenu = ({ imageUrl, name }: UserAvatarMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hidden rounded-full sm:flex"
        >
          <Avatar>
            <AvatarImage src={imageUrl ?? undefined} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-110">
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

export async function AuthActions() {
  const session = await getSessionCached();

  if (session) {
    return (
      <UserAvatarMenu
        name={session.user.name}
        imageUrl={session.user.image ?? null}
      />
    );
  }

  return (
    <div className="flex gap-1">
      <Button size="lg" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
      <Button size="lg" variant="outline" asChild>
        <Link href="/login">Sign In</Link>
      </Button>
    </div>
  );
}

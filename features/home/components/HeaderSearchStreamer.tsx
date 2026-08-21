import "server-only";
import HeaderSearch from "./HeaderSearch";
import { headers } from "next/headers";

export default async function HeaderSearchStreamer() {
  const headersList = await headers();
  const deviceType = headersList.get("x-device-type") ?? "desktop";

  return <HeaderSearch isDesktopDevice={deviceType === "desktop"} />;
}

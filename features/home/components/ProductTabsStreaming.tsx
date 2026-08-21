import ProductTabs from "@/app/(main)/_components/tabs/ProductTabs";
import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import getPersonalizedFeed from "@/features/home/server/getPersonalizedFeed";
import { getAnonId } from "@/lib/anonId";
import { headers } from "next/headers";
import "server-only";

export default async function ProductTabsStreaming() {
  const headersList = await headers();
  const deviceType = headersList.get("x-device-type") ?? "desktop";
  const isDesktopDevice = deviceType === "desktop";
  const session = await getSessionCached().then(
    (session) => session && { name: session.user.name, id: session.user.id }
  );
  const anonId = session ? null : await getAnonId();

  const productsForYou = getPersonalizedFeed({
    limit: 20,
    category: null,
    cursor: null,
    userId: session?.id ?? null,
    anonymousId: anonId,
  });

  return (
    <ProductTabs
      productsForYou={productsForYou}
      session={session}
      isDesktopDevice={isDesktopDevice}
    />
  );
}

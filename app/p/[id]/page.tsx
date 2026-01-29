// app/p/[id]/page.tsx

import PasteClient from "./paste-client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PasteClient id={id} />;
}



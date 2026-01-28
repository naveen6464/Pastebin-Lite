// app/paste/[id]/page.tsx

import PasteClient from "./paste-client";


export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <PasteClient id={params?.id} />;
}

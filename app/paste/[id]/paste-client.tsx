"use client";

import { useEffect, useState } from "react";

type PasteData = {
  content: string;
  remaining_views?: number | null;
  expires_at?: string | null;
};

export default function PasteClient({ id }: { id: string }) {

    console.log(id,"90909090");
    
  const [data, setData] = useState<PasteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPaste() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pastes/${id}`
        );

        if (!res.ok) throw new Error("Not found");

        const json = await res.json();
        setData(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPaste();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Paste not available</h1>
          <p className="text-gray-500 mt-2">
            It may have expired or reached its view limit.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <pre className="whitespace-pre-wrap font-mono text-sm">
          {data.content}
        </pre>

        {(data.remaining_views !== null || data.expires_at) && (
          <div className="mt-4 text-sm text-gray-500 flex gap-4">
            {data.remaining_views !== null && (
              <span>Views left: {data.remaining_views}</span>
            )}
            {data.expires_at && (
              <span>
                Expires at:{" "}
                {new Date(data.expires_at).toLocaleString()}
              </span>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

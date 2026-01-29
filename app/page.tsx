"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const PasteSchema = Yup.object().shape({
  content: Yup.string()
    .trim()
    .required("Paste content is required"),
  ttl_seconds: Yup.number()
    .nullable()
    .min(1, "TTL must be at least 1 second"),
  max_views: Yup.number()
    .nullable()
    .min(1, "Max views must be at least 1"),
});

export default function HomePage() {
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-1">Pastebin Lite</h1>
        <p className="text-gray-500 mb-6">
          Create a temporary text paste and share it securely.
        </p>

        <Formik
          initialValues={{
            content: "",
            ttl_seconds: "",
            max_views: "",
          }}
          validationSchema={PasteSchema}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            setResultUrl(null);

            const payload = {
              content: values.content,
              ttl_seconds: values.ttl_seconds || undefined,
              max_views: values.max_views || undefined,
            };

            try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pastes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });

              if (!res.ok) {
                throw new Error("Failed to create paste");
              }

              const data = await res.json();
              setResultUrl(data.url);
              resetForm();
            } catch (err) {
              alert("Something went wrong. Please try again.");
            } finally {
              setLoading(false);
            }
          }}
        >
          {() => (
            <Form className="space-y-5">
              {/* Content */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Paste Content
                </label>
                <Field
                  as="textarea"
                  name="content"
                  rows={6}
                  placeholder="Paste your text here..."
                  className="w-full rounded-lg border px-3 py-2 font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <ErrorMessage
                  name="content"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Constraints */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expire after (seconds)
                  </label>
                  <Field
                    name="ttl_seconds"
                    type="number"
                    placeholder="Optional"
                    className="w-full rounded-lg border px-3 py-2"
                  />
                  <ErrorMessage
                    name="ttl_seconds"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Maximum views
                  </label>
                  <Field
                    name="max_views"
                    type="number"
                    placeholder="Optional"
                    className="w-full rounded-lg border px-3 py-2"
                  />
                  <ErrorMessage
                    name="max_views"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Paste"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Success */}
        {resultUrl && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-medium text-green-700 mb-2">
              Paste created successfully 🎉
            </p>
            <div className="flex gap-2">
              <input
                value={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${resultUrl}`}
                readOnly
                className="flex-1 border rounded px-2 py-1 text-sm"
              />
              <button
                onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${resultUrl}`)}
                className="bg-green-600 text-white px-3 rounded"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

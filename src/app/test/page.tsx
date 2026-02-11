"use client";

import { useEffect, useState } from "react";

export default function TestIndexPage() {
  const [dateTime, setDateTime] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/test/date")
      .then((res) => res.json())
      .then((data) => setDateTime(data.currentDateTime));
  }, []);

  return (
    <main className="min-h-screen w-full bg-white text-black">
      <section className="mx-auto flex max-w-xl flex-col gap-4 p-8">
        <h1 className="text-2xl font-semibold">Current Date/Time</h1>
        <p className="text-lg font-mono">{dateTime ?? "Loading..."}</p>
      </section>
    </main>
  );
}

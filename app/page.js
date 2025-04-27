"use client";

import Header from "@/app/auth/page";
import List from "@/components/List";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <List />
        </div>
      </main>
    </div>
  );
}

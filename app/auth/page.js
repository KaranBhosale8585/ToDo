"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Auth() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-3xl font-bold text-white tracking-wider mb-3 md:mb-0">
          Todo&apos;s App
        </h1>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <div className="flex items-center gap-3 bg-white/10 p-2 rounded-full pr-4 hover:bg-white/20 transition">
                <Image
                  src={session.user?.image || "/default-profile.png"} // fallback for missing image
                  alt="User"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <div className="text-white text-sm">
                  <p className="font-semibold">
                    {session.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-200">
                    {session.user?.email || "No email available"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

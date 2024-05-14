"use client";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPage = pathname.includes("/sign-in") || pathname.includes("/sign-up");

  const { theme, setTheme } = useTheme();

  return (
    <div className="md:px-20 px-3">
      {!isPublicPage && (
        <div className="flex justify-between items-center py-5 px-5 border shadow border-gray-300 dark:border-gray-500">
          <h1
            className="text-primary dark:text-dark-primary font-semibold cursor-pointer"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
          >
            HEAP <b className="text-secondary dark:text-dark-secondary">OVERFLOW</b>
          </h1>
          <div className="pl-5 flex gap-5 items-center">
            <Button
              size="sm"
              onClick={() => {
                router.push("/profile");
                router.refresh();
              }}
              className="dark:bg-gray-700"
            >
              Profile
            </Button>
            <UserButton afterSignOutUrl="/" />
            <label
              className="cursor-pointer p-2"
              htmlFor="light-switch"
              onClick={() => {
                if (theme === "dark") {
                  return setTheme("light");
                }
                return setTheme("dark");
              }}
            >
              <svg
                className="hidden dark:block"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-slate-300"
                  d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
                />
                <path
                  className="fill-slate-400"
                  d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
                />
              </svg>
              <svg
                className="dark:hidden"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-slate-400"
                  d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
                />
                <path
                  className="fill-slate-500"
                  d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
                />
              </svg>
            </label>
          </div>
        </div>
      )}

      {isPublicPage && <div>{children}</div>}

      {!isPublicPage && <div className="my-5">{children}</div>}
    </div>
  );
}

export default LayoutProvider;
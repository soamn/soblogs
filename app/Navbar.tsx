"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="bg-slate-100 p-4 shadow-lg">
      <ul className="flex space-x-5">
        <li
          className={`hover:cursor-pointer hover:font-semibold ${
            pathname === "/" ? "font-bold" : ""
          }`}
          onClick={() => router.push("/")}
        >
          Home
        </li>
        <li
          className={`hover:cursor-pointer hover:font-semibold ${
            pathname === "/about" ? "font-bold" : ""
          }`}
          onClick={() => router.push("/about")}
        >
          About
        </li>
      </ul>
    </nav>
  );
}

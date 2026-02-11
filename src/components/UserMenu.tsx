"use client";

import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, UserCircle } from "lucide-react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center justify-center rounded-full bg-green-200 p-1.5 transition-colors hover:bg-green-300"
      >
        <UserCircle size={28} className="text-green-700" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          <button
            onClick={() => setOpen(false)}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
          >
            <User size={16} />
            Profile
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
          >
            <Settings size={16} />
            Setting
          </button>
          <div className="my-1 border-t border-gray-100" />
          <button
            onClick={() => setOpen(false)}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

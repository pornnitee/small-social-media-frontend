"use client";

import Link from "next/link";
import { useSignOut } from "../api/auth/signOut";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { mutate: onSignOut } = useSignOut();

  const [value, setValue] = useState<{
    userId: string | null;
    userName: string | null;
  }>({
    userId: "",
    userName: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("user_id");
      const userName = localStorage.getItem("user_name");
      setValue({ userName, userId });
    }
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between">
        <div className="flex space-x-4 ">
          <li>
            <Link href="/" className="text-white font-bold hover:text-gray-300">
              Social Media
            </Link>
          </li>
        </div>
        {value.userId && (
          <div className="flex space-x-4 ">
            <div className="flex items-center space-x-2">
              <div className="relative group">
                <div className="h-2 w-2 bg-green-500 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"></div>

                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="block ">Online</span>
                  <span className="text-xs text-gray-400">
                    {value.userName}
                  </span>
                </div>
              </div>
              <div className="text-gray-400 text-sm">Online</div>
            </div>
            <div
              className="text-white hover:text-gray-300 cursor-pointer"
              onClick={() => onSignOut()}
            >
              Logout
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

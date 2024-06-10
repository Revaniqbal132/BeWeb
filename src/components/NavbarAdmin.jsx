"use client";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";

const NavbarAdmin = () => {
  const { handleLogout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full md:p-3 fixed top-0 z-50">
      <div className=" transition-all duration-300 ease-in-out border md:border-none shadow-md md:shadow-none">
        <div className="w-full md:w-11/12 bg-white mx-auto p-6 shadow-md md:rounded-3xl flex justify-between items-center border border-gray-200">
          <h1 className="text-3xl font-bold">M-SAVING</h1>
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            <FiMenu size={30} />
          </div>
          <ul className="hidden md:flex justify-between gap-8 text-xl font-semibold">
            <li className="hover:bg-teal-500 hover:text-white p-2 rounded-md">
              <Link href={"/admin"}>Home</Link>
            </li>
            <li className="hover:bg-teal-500 hover:text-white p-2 rounded-md">
              <Link href={"/admin/users"}>Users</Link>
            </li>
            {user && (
              <li className="hover:bg-teal-500 hover:text-white p-2 rounded-md">
                <Link href={"/admin/mutation"}>Mutation</Link>
              </li>
            )}
            {user ? (
              <li className="hover:bg-teal-500 hover:text-white p-2 rounded-md">
                <button onClick={handleLogout}>Log Out</button>
              </li>
            ) : (
              <li className="hover:bg-teal-500 hover:text-white p-2 rounded-md">
                <Link href={"/sign-up"}>Sign Up</Link>
              </li>
            )}
          </ul>
        </div>
        <ul
          className={`${
            isMenuOpen ? "md:flex" : "hidden"
          }  md:hidden justify-between md:gap-8 text-xl font-semibold md:w-2/3 p-4`}
        >
          <li
            className="hover:bg-teal-500 hover:text-white p-2 rounded-md"
            onClick={toggleMenu}
          >
            <Link href={"/admin"}>Home</Link>
          </li>
          <li
            className="hover:bg-teal-500 hover:text-white p-2 rounded-md"
            onClick={toggleMenu}
          >
            <Link href={"/admin/users"}>users</Link>
          </li>
          {user && (
            <li
              className="hover:bg-teal-500 hover:text-white p-2 rounded-md"
              onClick={toggleMenu}
            >
              <Link href={"/admin/mutation"}>Mutation</Link>
            </li>
          )}
          {user ? (
            <li
              className="hover:bg-teal-500 hover:text-white p-2 rounded-md"
              onClick={toggleMenu}
            >
              <button onClick={handleLogout}>Log Out</button>
            </li>
          ) : (
            <li
              className="hover:bg-teal-500 hover:text-white p-2 rounded-md"
              onClick={toggleMenu}
            >
              <Link href={"/sign-up"}>Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavbarAdmin;

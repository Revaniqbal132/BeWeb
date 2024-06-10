"use client";
import useAuth from "@/context/useAuth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PlanCard = ({ image, title, content, link }) => {
  const { user } = useAuth();
  return (
    <div className="w-11/12 md:w-3/4 mx-auto p-10 shadow-xl rounded-2xl">
      <div className="overflow-hidden rounded-3xl mb-10">
        <Image
          src={image}
          width={2000 / 4}
          height={2000 / 4}
          alt={title}
          className="transition-transform duration-300 ease-in-out hover:scale-150 h-96 md:h-[600px] object-cover w-full"
          priority
        />
      </div>
      <h1 className="text-3xl font-semibold mb-3 text-center">{title}</h1>
      <p className="mb-6 text-justify">{content}</p>
      <div className="flex justify-center">
        {user ? (
          <Link
            href={link}
            className="w-full text-center bg-blue-500 text-white py-3 rounded font-semibold transition hover:bg-blue-600"
          >
            Clicked here
          </Link>
        ) : (
          <Link
            href={"/sign-in"}
            className="w-full text-center bg-blue-500 text-white py-3 rounded font-semibold transition hover:bg-blue-600"
          >
            Sign In To View More...
          </Link>
        )}
      </div>
    </div>
  );
};

export default PlanCard;

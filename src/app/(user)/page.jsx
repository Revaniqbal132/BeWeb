"use client";
import CardItem from "@/components/CardItem";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState(""); // Inisialisasi state userName dengan nilai awal kosong
  useEffect(() => {
    if (user && userProfile.role === "admin") {
      router.push("/admin");
    }else if (user && userProfile.role === "gudang") {
      router.push("/gudang");
    }else if (user && userProfile.role === "user") {
      // Jika user adalah admin, kita dapat menampilkan alert selamat datang
      // dan menampilkan nama admin dari userProfile
      alert("Selamat datang, " + userProfile.name);
      setUserName(userProfile.name);
    }
  }, [user, userProfile, router]);
  return (
    <div className="bg-sky-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="overflow-hidden flex justify-center mb-2 mt-64 stroke-sky-500 ">
        <Image
          src={"/assets/bealogo.png"}
          width={550}
          height={550 }
          alt={"logo"}
          className="object-cover"
          priority
        />
        <h1 className="text-center mt-48 text-2xl mb-28">
          Siap membawa Bisnis Ecommerce Anda ke level berikutnya? Hubungi kami hari ini untuk mempelajari bagaimana Be Agency dapat membantu Anda sukses di bisnis anda.
        </h1>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
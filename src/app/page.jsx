import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="overflow-hidden flex justify-center mb-2 mt-24">
        <Image
          src={"/assets/bealogo.png"}
          width={350}
          height={350 }
          alt={"logo"}
          className="object-cover"
          priority
        />
        <h1 className="text-center mt-48 text-2xl mb-28">
          Siap membawa Bisnis Ecommerce Anda ke level berikutnya? Hubungi kami hari ini untuk mempelajari bagaimana Be Agency dapat membantu Anda sukses di bisnis anda.
        </h1>
      </div>
    </div>
  );
}

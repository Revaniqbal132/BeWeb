import Navbar from "@/components/Navbar";
import React from "react";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center mt-36 p-10 md:p-28 bg-gray-100 w-4/5  rounded-3xl shadow-xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">Visi</h1>
        <p>
        Menjadi mitra terpercaya dan terdepan dalam membantu brand dan penjual sukses di ranah e-commerce, dengan memberikan solusi inovatif dan strategi khusus yang menghasilkan kepuasan maksimal bagi klien.
        </p>
        <h1 className="text-3xl font-bold mt-16 mb-3">Misi</h1>
        <p>
          - Memberikan solusi inovatif dan strategi khusus yang sesuai dengan kebutuhan klien untuk mendominasi pasar e-commerce.<br/>
          - Berkomitmen untuk memahami sepenuhnya kebutuhan klien dan bekerja sama dengan mereka untuk merancang solusi yang efektif.<br/>
          - Membawa bisnis e-commerce klien ke level berikutnya dengan strategi yang terbukti berhasil dan menguntungkan.<br/>
          - Menjadi agen yang responsif dan adaptif terhadap perubahan dalam pasar e-commerce yang kompetitif.<br/>
          - Membangun hubungan jangka panjang dengan klien berdasarkan kepercayaan, integritas, dan kepuasan.
        </p>
      </div>
    </div>
  );
};

export default About;

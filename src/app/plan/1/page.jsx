import Navbar from "@/components/Navbar";
import PlanDetail from "@/components/PlanDetail";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const Plan = () => {
  return (
    <div>
      <Navbar />
      <div className="md:px-20 mt-36">
        <h1 className="text-3xl mb-10 font-bold">
          11 Cara Mengatur Keuangan Pribadi dengan Baik
        </h1>
        <Image
          src={"/assets/plan2.jpg"}
          width={2000}
          height={2000}
          alt={"plan 1"}
          className="h-[700px] object-cover object-top rounded-3xl mb-6"
        />
        <p className="text-justify text-xl mb-10">
          Mengatur keuangan memang membutuhkan usaha. Akan tetapi, akan timbul
          lebih banyak masalah jika Anda tidak melakukannya, baik bagi diri Anda
          sendiri maupun orang-orang di sekitar. Agar itu tidak terjadi,
          terapkan cara-cara mengatur keuangan pribadi dengan gaji kecil
          berikut.
          <br />
          <br />
          1. Terapkan Prinsip 50/30/20 Cara mengatur keuangan pribadi dengan
          baik pertama adalah menerapkan Prinsip 50/30/20. Prinsip ini terutama
          penting dilakukan bagi pekerja di bawah usia 30 tahun. Dengan
          melakukan prinsip ini, Anda dapat mengelola pengeluaran agar bisa
          memenuhi kebutuhan, menabung, dan bersenang-senang dengan biaya
          proporsional. Prinsip 50/30/20 penerapannya begini: 50% gaji guna
          membeli kebutuhan/kewajiban sehari-hari, 30% memenuhi keinginan, dan
          20% masuk tabungan.
          <br />
          <br />
          2. Catat Setiap Pengeluaran dengan Rutin Pernahkah uang Anda tiba-tiba
          habis, tapi tidak tahu untuk apa? Rasanya pasti sedih, kecewa,
          sekaligus menyesal. Akan tetapi, hal ini tidak akan Anda alami jika
          rutin mencatat belanja harian. Oleh karena itu, selalu siapkan buku
          catatan khusus untuk menulis pengeluaran Anda. Bila perlu, tetapkan
          batas uang yang akan Anda gunakan tiap harinya. Apabila anggaran hari
          kemarin melebihi batas, Anda dapat mengurangi limit anggaran hari ini,
          sebagai punishment agar Anda lebih disiplin.
          <br />
          <br />
          3. Sesuaikan Gaya Hidup Dengan Penghasilan Menyesuaikan gaya hidup
          adalah cara mengatur keuangan pribadi dengan gaji kecil terbaik. Jika
          gaji Anda masih pas-pasan memenuhi kebutuhan hidup, jangan memaksakan
          diri membeli barang-barang di luar kemampuan. Dengan meningkatkan gaya
          hidup, Anda mungkin akan tampak lebih bergengsi. Akan tetapi, ada
          banyak masalah menunggu Anda ke depannya, mulai dari terbengkalainya
          kebutuhan primer sampai menumpuknya hutang.
          <br />
          <br />
          4. Jangan Mengambil Terlalu Banyak Cicilan Selain bergaya hidup
          sederhana, cara mengatur keuangan pribadi dengan gaji kecil berikutnya
          adalah tidak mengambil terlalu banyak cicilan. Tidak semua barang
          harus dimiliki sekaligus, ada kalanya Anda perlu menunggu melunasi
          satu barang dulu sebelum mengambil barang berikutnya. Jika mengambil
          terlalu banyak kredit dalam satu waktu, ketenangan pikiran akan
          terganggu. Sebanyak apapun gaji, Anda harus merelakannya guna membayar
          tagihan setiap bulannya.
          <br />
          <br />
          5. Buat Rekening Sendiri untuk Menabung Jika ingin lebih disiplin
          menyisihkan uang, membuat rekening khusus tabungan adalah cara
          mengatur keuangan pribadi dengan baik yang dapat Anda lakukan. Dengan
          membuat rekening tabungan sendiri, Anda akan lebih mampu menahan diri
          agar tidak menghabiskan pendapatan bulanan sekaligus. Setiap gajian,
          Anda dapat langsung transfer sebagian uang ke rekening tersebut.
          Setelah itu, Anda bisa menaruh ATM dan rekening di rumah, tidak perlu
          membawanya ke mana-mana.
          <br />
          <br />
          6. Pakai Fitur Auto Deposito Bank Tertarik dengan investasi jangka
          panjang? Kalau iya, Anda dapat menggunakan produk auto deposito dari
          bank. Deposito adalah salah satu produk bank paling menarik untuk
          digunakan. Bukan hanya lebih lancar menabung, Anda juga akan mendapat
          interest tiap bulannya. Salah satu contoh program deposito terbaik
          misalnya Deposito Berjangka OCBC NISP. Melalui program ini, Anda dapat
          menyimpan uang dengan aman dalam jangka waktu 1 - 12 bulan di OCBC
          NISP, dengan interest rate mencapai 2,75%.
          <br />
          <br />
          7. Kumpulkan Uang Receh Dalam Satu Tempat Jika Anda ingin lebih pandai
          mengatur keuangan, Anda perlu belajar lebih menghargai uang. Salah
          satu cara menghargai uang adalah dengan mengumpulkan uang receh sisa
          kembalian di satu tempat. Hal ini mungkin terkesan sepele. Akan
          tetapi, mengumpulkan uang receh merupakan salah satu cara mengatur
          keuangan pribadi dengan gaji kecil. Sebab, uang receh yang dikumpulkan
          lama kelamaan akan semakin banyak, dan tetap bisa digunakan membeli
          kebutuhan.
          <br />
          <br />
          8. Mulai Belajar Investasi Investasi adalah salah satu opsi cara
          mengatur keuangan pribadi dengan baik dan cerdas. Saat menabung,
          nominal uang Anda akan tetap sama dari waktu ke waktu. Jika tahun 2021
          Anda menabung Rp10 juta, maka di 2041 uang Anda akan tetap jumlahnya.
          Beda kondisi jika Anda menginvestasikan Rp10 juta tersebut ke
          perusahaan di pasar modal. Anggap saja return rate perusahaan ada di
          angka 5% per tahun. Jika Anda memilih opsi perhitungan compound
          interest, maka dalam 10 tahun Anda bisa mendapat Rp16,4 juta.
          <br />
          <br />
          9. Belajar Mencari Penghasilan Tambahan Jika Anda masih muda dan baru
          bekerja, mencari penghasilan tambahan adalah cara mengatur keuangan
          pribadi dengan gaji kecil yang patut dicoba. Di zaman digital seperti
          ini, ada banyak opsi pekerjaan sampingan untuk dilakukan. Beberapa di
          antaranya adalah menjadi penulis freelance, content creator,
          influencer, atau pedagang online.
          <br />
          <br />
          10. Buat Wish-List Barang Paling Diinginkan 5 Tahun ke Depan Setiap
          orang memiliki barang-barang idaman yang ingin dimiliki di masa depan.
          Menulis impian tersebut satu per satu adalah salah satu cara mengatur
          keuangan pribadi dengan baik. Misalnya dalam lima tahun ke depan Anda
          ingin membeli rumah, mobil, dan menikah. Ketiganya butuh dana tidak
          sedikit, sehingga Anda dapat membuat rencana anggarannya dari
          sekarang.
          <br />
          <br />
          11. Jangan Lupa Sisihkan untuk Sedekah Berambisi mengumpulkan sebanyak
          mungkin tabungan memang baik. Akan tetapi, jangan lupa sisakan
          sebagian penghasilan untuk sedekah ke pihak kurang mampu. Usahakan
          untuk melakukan hal ini secara rutin tiap bulannya. Sehingga, bukan
          hanya tabungan uang Anda yang bertambah banyak, tapi juga tabungan
          kebaikan Anda. Itulah 11 cara mengatur keuangan pribadi dengan baik
          yang dapat dilakukan, berapapun gaji Anda. Selama cara-cara di atas
          Anda terapkan, kondisi keuangan pribadi dijamin lebih stabil. Selain
          itu, hidup Anda juga akan menjadi semakin tenang dan damai karena Anda
          dapat mengukur kapasitas finansial Anda sendiri.
        </p>
        <Link
          href={"/"}
          className="bg-stone-800 px-8 py-4 text-white text-2xl rounded flex items-center gap-3 mb-10"
        >
          <span>
            <IoIosArrowBack size={24} />
          </span>
          Kembali ke home
        </Link>
      </div>
    </div>
  );
};

export default Plan;

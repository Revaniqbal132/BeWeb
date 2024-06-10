import Navbar from "@/components/Navbar";
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
          Apa Itu Tabungan Berjangka?
        </h1>
        <Image
          src={"/assets/plan3.jpg"}
          width={2000}
          height={2000}
          alt={"plan 2"}
          className="h-[700px] object-cover object-top rounded-3xl mb-6"
        />
        <p className="text-justify text-xl mb-10">
          Tabungan berjangka adalah jenis tabungan di mana nasabah menyetorkan
          sejumlah uang ke dalam rekening bank dan menentukan jangka waktu
          simpanan. Biasanya, dana yang disetorkan dalam jumlah yang tetap
          selama jangka waktu antara satu bulan hingga beberapa tahun. Selama
          jangka waktu tersebut, nasabah tidak dapat melakukan penarikan dana
          atau pengambilan uang dari rekening tabungan berjangka tersebut.
          Produk ini juga dikenal sebagai tabungan rencana. Keuntungan dan
          Manfaat Tabungan Berjangka Produk tabungan berjangka memiliki banyak
          manfaat dan keuntungan, terutama untuk Anda yang ingin menyiapkan
          sejumlah dana dalam jumlah besar serta ingin mencapainya dalam jangka
          waktu yang lebih panjang. Berikut ini beberapa manfaat dan keuntungan
          dari tabungan berjangka: Membantu Lebih Disiplin Apabila Anda memiliki
          rencana untuk menggunakan uang dalam jangka waktu yang pendek,
          sebaiknya memilih tabungan reguler. Hal ini karena Anda dapat
          melakukan pengambilan dana sewaktu-waktu ketika dibutuhkan. Nah,
          produk tabungan rencana merupakan pilihan tepat bila Anda sulit
          menabung secara konsisten. Seperti yang sudah disebutkan sebelumnya,
          tabungan ini tak bisa dicairkan sewaktu-waktu. Cocok untuk Mengatur
          Keuangan Jangka Panjang Keuntungan tabungan berjangka berikutnya
          sangat cocok untuk Anda yang ingin mengatur keuangan jangka panjang.
          Dengan menabung secara teratur di tabungan berjangka, Anda dapat
          memperoleh keuntungan investasi jangka panjang dan menghindari
          pengeluaran yang tidak perlu. Lebih Aman Berbicara mengenai
          keamanannya, produk satu ini relatif aman karena nasabah tidak dapat
          melakukan penarikan dana sebelum jangka waktu simpanan berakhir. Hal
          ini memastikan bahwa uang yang disimpan tetap aman dan terjaga
          keamanannya dari risiko kehilangan atau pengeluaran yang tidak
          terencana.
          <br />
          <br />
          <span className="text-blue-500">
            <a
              href="https://www.megasyariah.co.id/id/artikel/edukasi-tips/simpanan/tabungan-berjangka"
              target="_blank"
            >
              https://www.megasyariah.co.id/id/artikel/edukasi-tips/simpanan/tabungan-berjangka
            </a>
          </span>
          <br />
          <br />
          Membangkitkan Motivasi Menabung & Keuntungan Menabung Jika saat ini
          kamu belum mempunyai motivasi menabung, maka jadikan beberapa manfaat
          menabung berikut ini sebagai pemicu untuk kamu melakukan aktivitas
          tersebut.
          <br />
          <br />
          1. Menghindari perilaku konsumtif Manfaat menabung yang bisa kamu
          rasakan adalah melatih gaya hidup dan prinsip berhemat. Berbeda dengan
          sifat pelit, hemat adalah prinsip hidup yang kamu perlukan untuk
          membedakan mana yang termasuk kebutuhan dan mana yang termasuk
          keinginan belaka. Dengan begitu, kamu akan terhindar dari perilaku
          atau gaya hidup konsumtif. Dengan menyisihkan sebagian uang untuk
          menabung, kamu akan terbiasa untuk berpikir sebelum bertindak. Jika
          sebelumnya kamu akan langsung mengeluarkan uang untuk membeli
          barang-barang yang kamu inginkan, maka setelah terbiasa menabung, kamu
          akan berpikir lebih dulu apakah barang tersebut memang kamu butuhkan
          atau tidak.
          <br />
          <br />
          2. Memiliki dana darurat Hampir setiap orang pernah mengalami masalah
          yang tak terduga sehingga dibutuhkan dana darurat untuk bisa
          menyelesaikannya. Nah, salah satu manfaat yang bisa kamu dapatkan dari
          menabung adalah memiliki dana darurat yang bisa menolongmu dalam
          kondisi terdesak. Perubahan yang terjadi di masa depan sangat sulit
          untuk diprediksi sehingga kamu membutuhkan dana darurat untuk
          mengatasi perubahan tersebut. Dengan adanya dana darurat, kamu tidak
          perlu panik saat menghadapi kejadian yang tiba-tiba datang tanpa
          diduga.
          <br />
          <br />
          <span className="text-blue-500">
            <a
              href="https://bmoney.id/blog/motivasi-menabung-120094"
              target="_blank"
            >
              https://bmoney.id/blog/motivasi-menabung-120094
            </a>
          </span>
          <br />
          <br />
          Cara meningkatkan motivasi menabung (123rf.com) Sebagian orang mungkin
          sudah menyadari penuh apa pentingnya menerapkan kebiasaan menabung
          sejak dini. Namun, ada juga orang yang justru sama sekali tidak
          memiliki motivasi menabung karena berbagai alasan. Mulai dari
          keinginan untuk bersenang-senang sampai tidak punya edukasi tentang
          pentingnya menabung untuk masa depan. Menabung mungkin kelihatan hanya
          membuang-buang waktu atau bahkan terkesan sepele, apalagi jika nominal
          tabungan yang dimiliki tidak begitu besar. Namun, ada banyak
          keuntungan yang bisa kamu peroleh di masa depan jika kamu melakukan
          kebiasaan ini sejak dini. Menabung bukan sekadar menyimpan sebagain
          uang yang kita miliki untuk digunakan di masa yang akan datang. Lebih
          dari itu, menabung juga menumbuhkan tingkat kedisiplinan yang kuat
          agar kamu bisa terus tumbuh dan berkembang menjadi pribadi yang lebih
          baik, terutama dalam hal finansial.
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

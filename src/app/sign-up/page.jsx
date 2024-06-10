"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Navbar from "@/components/Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    duration: "1 Bulan",
    bank: "BNI",
    accountNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const { isLoading, setIsLoading } = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async () => {
    try {
      let newErrors = {};
      if (!formData.username) {
        newErrors.username = "Username is required";
      }
      if (!formData.fullname) {
        newErrors.fullname = "Fullname is required";
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email address is invalid";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!formData.accountNumber) {
        newErrors.accountNumber = "Nomor akun is required";
      }
      setErrors(newErrors);

      const userData = {
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
        jangka: parseInt(formData.duration),
        bank: formData.bank,
        nomorAkun: formData.accountNumber,
        role: "user",
        status: "online",
        withDrawalStatus: "nothing",
        balance: 0,
      };

      // console.log(userData);
      // return;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        ...userData,
        timeStamp: serverTimestamp(),
      });
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          status: "online",
        });
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          router.push("/");
          localStorage.setItem(
            "userMSavingProfile",
            JSON.stringify(docSnap.data())
          );
        }
      }
    } catch (error) {
      console.log(error.message);
      let errorMessage = error.message;
      if (errorMessage === "Firebase: Error (auth/invalid-email).") {
        // Menggunakan operator perbandingan yang tepat
        errorMessage = "Email yang anda masukkan salah";
      } else if (errorMessage === "Firebase: Error (auth/missing-password).") {
        // Menggunakan operator perbandingan yang tepat
        errorMessage = "Password anda salah";
      } else if (
        errorMessage === "Firebase: Error (auth/invalid-credential)."
      ) {
        // Menggunakan operator perbandingan yang tepat
        errorMessage = "Email atau password salah";
      }
      setToastMessage(errorMessage);
    }
    router.push("/");
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <label className="block mb-4">
          Username:
          <div className="p-3 border rounded my-3">
            <input
              type="text"
              name="username"
              className="form-input mt-1 block w-full rounded-md outline-none border-none"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Isi username anda disini..."
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
          </div>
        </label>
        <label className="block mb-4">
          Fullname:
          <div className="p-3 border rounded my-3">
            <input
              type="text"
              name="fullname"
              className="form-input mt-1 block w-full rounded-md outline-none border-none"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Isi nama lengkap anda disini..."
            />
            {errors.fullname && (
              <p className="text-red-500">{errors.fullname}</p>
            )}
          </div>
        </label>
        <label className="block mb-4">
          Email:
          <div className="p-3 border rounded my-3">
            <input
              type="email"
              name="email"
              className="form-input mt-1 block w-full rounded-md outline-none border-none"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Isi email anda disini..."
            />
          </div>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </label>
        <label className="block mb-4">
          Password:
          <div className="p-3 border rounded my-3">
            <input
              type="password"
              name="password"
              className="form-input mt-1 block w-full rounded-md outline-none border-none"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Isi password anda disini..."
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
        </label>
        <label className="block mb-4">
          Confirm Password:
          <div className="p-3 border rounded my-3">
            <input
              type="password"
              name="confirmPassword"
              className="form-input mt-1 block w-full rounded-md outline-none border-none"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Isi password anda disini..."
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </label>
        <label className="block mb-4">
          Jangka:
          <div className="p-3 border rounded my-3">
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="form-select mt-1 block w-full rounded-md outline-none border-none p-2"
            >
              <option value="3">3 Bulan</option>
              <option value="6">6 Bulan</option>
              <option value="12">12 Bulan</option>
            </select>
          </div>
        </label>
        <label className="block mb-4">
          Pilih Bank:
          <div className="p-3 border rounded my-3">
            <select
              name="bank"
              value={formData.bank}
              onChange={handleInputChange}
              className="form-select mt-1 block w-full rounded-md outline-none border-none p-2"
            >
              <option value="BNI">BNI</option>
              <option value="Mandiri">Mandiri</option>
              <option value="BCA">BCA</option>
            </select>
          </div>
        </label>
        <label className="block mb-4">
          No Rekening:
          <div className="p-3 border rounded my-3">
            <input
              type="text"
              name="accountNumber"
              className="form-input mt-1 block w-full rounded-md outline-none border-none"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="Isi rekening anda disini..."
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </label>
        <label className="flex gap-2 mb-4" htmlFor="confirmData">
          <input type="checkbox" name="confirmData" id="confirmData" />
          <span>Data Sudah Benar</span>
        </label>

        <button
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          onClick={() => document.getElementById("agreementModal").showModal()}
        >
          Submit
        </button>
        <dialog id="agreementModal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-4xl mb-3">SURAT PERSETUJUAN</h3>
            <hr />
            <div className="w-full py-2 text-justify">
              <h1 className="text-3xl font-semibold mb-3">Perlu Diketahui</h1>
              <h2 className="text-2xl font-semibold mb-2">
                Persyaratan dan Tata Cara:
              </h2>
              <ul>
                <li>
                  • Calon anggota Koperasi ASKA Maju Terus adalah perorangan
                  dari Petugas Penanganan Prasarana dan Sarana Umum (PPSU)
                  minimal berusia 18 tahun dan maksimal 56 tahun (Pensiun).
                </li>
                <li>• Menyetujui formulir permohonan pembukaan rekening.</li>
              </ul>
              <br />
              <h2 className="text-2xl font-semibold mb-2">
                Informasi Fitur, Manfaat, dan Resiko Tahapan Berjangka
              </h2>
              <h3 className="text-xl font-semibold mb-2">
                Fitur Utama Tahapan Berjangka:
              </h3>
              <ul>
                <li>• Tersedia dalam 1 jenis mata uang yaitu Rupiah. </li>
                <li>• Setoran minimum Rp300.000 s/d maximal Rp1.500.000</li>
                <li>• Tidak ada saldo minimum ditahan.</li>
                <li>
                  • Setoran menggunakan Virtual Account melalui sistem MidTrans{" "}
                </li>
                <li>
                  • Jangka waktu menabung minimal 3 bulan, 6bulan, dan maksimal
                  12 bulan
                </li>
                <li>
                  • Tidak dapat dilakukan penarikan dana selama jangka waktu
                  menabung.
                </li>
                <li>
                  • Nasabah akan mendapatkan informasi mutasi rekening setiap
                  melakukan Transaksi.
                </li>
              </ul>
              <h3 className="text-xl font-semibold mb-2 mt-3">Manfaat:</h3>
              <ul>
                <li>
                  • Menjadi Tabungan berjangka yang mudah dan fleksibel bagi
                  anggota koperasi
                </li>
                <li>
                  • Tabungan yang telah jatuh tempo akan ditransfer ke rekening
                  sumber dana dan anggota koperasi ASKA akan mendapat
                  pemberitahuan melalui email
                </li>
              </ul>
              <h3 className="text-xl font-semibold mb-2 mt-3">Risiko:</h3>
              <div className="ml-2 mb-3">
                Klaim atas pengajuan pengembalian uang Tabungan sebelum jangka
                waktu yang di tentukan, dapat di tolak apabila anggota Koperasi
                ASKA Maju Terus (Tertanggung) Meninggal Dunia sebagai akibat
                dari hal-hal berikut:
              </div>
              <ul>
                <li>• Bunuh diri</li>
                <li>
                  • Tindakan melanggar hukum atau tindakan kejahatan yang
                  dilakukan oleh Anggota Kopeasi ASKA (Tertanggung) atau
                  Penerima Manfaat yang mengakibatkan meninggalnya Tertanggung
                </li>
                <li>
                  • Keterlibatan Tertanggung dalam aktifitas atau olah raga yang
                  membahayakan seperti : bela diri termasuk namun tidak terbatas
                  pada tinju dan gulat, menyelam, berenang atau berlayar di laut
                  lepas, mendaki gunung, panjat tebing (baik buatan maupun
                  sebenarnya), arung jeram, base atau bungee jumping, olahraga
                  musim dingin dan/atau yang melibatkan es atau salju, termasuk
                  namun tidak terbatas pada ski es, kereta luncur dan hoki es,
                  adu kecepatan kendaraan baik bermotor atau tidak seperti
                  bersepeda, berkuda, berperahu (baik dengan layar maupun
                  tidak), terjun payung, terbang layang atau olah raga/permainan
                  dirgantara lainnya atau melakukan aktifitas di udara kecuali
                  sebagai pilot, pramugari/a (flight attendants) atau penumpang
                  pesawat udara berjadwal yang mempunyai lisensi/ ijin yang
                  lengkap yang dikelola oleh perusahaan penerbangan komersil.
                </li>
                <li>
                  • Penyakit yang disebabkan secara langsung oleh penggunaan
                  obat – obatan terlarang (Narkotika)
                </li>
              </ul>
              <h3 className="text-xl font-semibold mb-2 mt-3">
                Informasi Tambahan:
              </h3>
              <ul>
                <li>
                  • Nasabah tidak dapat melakukan penarikan dana atau penutupan
                  rekening sebelum jangka waktu menabung berakhir. Apabila
                  dilakukan penarikan dana atau penutupan rekening, nasabah akan
                  dikenakan biaya penutupan rekening sebelum jatuh tempo
                </li>
                <li>
                  • Prosedur klaim Asuransi Jiwa Tahapan Berjangka:
                  <ul className="ml-4">
                    <li>
                      o Surat keterangan meninggal dunia dari rumah sakit dan
                      ditandatangani oleh Dokter
                    </li>
                    <li>
                      o Surat keterangan meninggal dunia dari Instansi yang
                      berwenang
                    </li>
                    <li>
                      o Surat keterangan kematian/berita acara dari Kepolisian
                      apabila meninggal dunia karena Kecelakaan
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-success text-white"
                  onClick={handleSignUp}
                >
                  Daftar
                </button>
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500">
            Sign In
          </Link>
        </p>
        {toastMessage && (
          <div className="toast toast-end">
            <div className="alert alert-error">
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;

"use client";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import Swal from "sweetalert2";
import Navbar from "@/components/Navbar";
import { formatDate } from "../utility/formatDate";

const Mutation = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Terbaru"); // default option
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (user && userProfile.role === "admin") {
      router.push("/");
    }
  }, [user, userProfile, router]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "mutation"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      let mutationList = list.filter(
        (mutation) => mutation.userId === user.uid
      );
      let filteredList = mutationList.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      // Apply sorting based on the selected option
      if (selectedOption === "Terbaru") {
        filteredList = filteredList.reverse();
      } else if (selectedOption === "Menabung") {
        filteredList = filteredList.filter((item) => item.status === "saving");
      } else if (selectedOption === "Penarikan") {
        filteredList = filteredList.filter(
          (item) => item.status === "withdraw"
        );
      } else if (selectedOption === "Penarikan sukses") {
        filteredList = filteredList.filter((item) => item.status === "success");
      }
      setData(filteredList);
      setPageCount(Math.ceil(filteredList.length / 5)); // Assuming 10 items per page
    });

    return () => {
      unsubscribe();
    };
  }, [selectedOption, searchTerm, user]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <Navbar />
      <div className="w-[87%] mx-auto mt-36">
        <div className="flex justify-between items-center gap-3 mb-3">
          <h1 className="text-3xl font-semibold mb-3">Mutation List</h1>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option>Terbaru</option>
            <option>Terlama</option>
            <option>Menabung</option>
            <option>Penarikan</option>
            <option>Penarikan sukses</option>
          </select>
          <p className="text-base">Total Data: {data && data.length}</p>
        </div>

        {toast && <div className="bg-yellow-100 p-4 rounded-xl">{toast}</div>}
        <div className="flex justify-end mb-4"></div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Transaction ID</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Bank</th>
                <th>Nomor Rekening</th>
                <th>Jumlah Uang</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {data
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((mutation, index) => (
                  <tr key={mutation.id}>
                    <td>{index + 1}</td>
                    <td>{mutation.id}</td>
                    <td>{mutation.userId}</td>
                    <td>{mutation.username}</td>
                    <td>{mutation.bank}</td>
                    <td>{mutation.nomorRekening}</td>
                    <td>{mutation.jumlahUang}</td>
                    <td>{mutation.status}</td>
                    <td>{formatDate(mutation.tanggal.toDate())}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-10">
          <div className="join">{renderPaginationButtons()}</div>
        </div>
      </div>
    </div>
  );
};

export default Mutation;

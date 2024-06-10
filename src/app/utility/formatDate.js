export const formatDate = (date) => {
  // Array untuk menerjemahkan nama bulan dari bahasa Inggris ke bahasa Indonesia
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Mendapatkan tanggal, bulan, dan tahun
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Mendapatkan jam, menit, dan detik
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Menerjemahkan nama bulan ke bahasa Indonesia
  const monthName = months[monthIndex];

  // Menghasilkan string format yang diinginkan
  const formattedDate = `${day} ${monthName} ${year}, ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
};

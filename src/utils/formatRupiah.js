// export const formatRupiah = (number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//     }).format(number);
//   };
  

export const formatRupiah = (amount) => {
    return "Rp" + parseInt(amount, 10).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).replace('IDR', '').trim();
  };
  
const CardItem5 = ({
    imageUrl,
    fakultas,
    judul,
    deskripsi,
    harga,
    status,
    timeStamp,
    inCart,
    addToCart,
    removeFromCart,
    isInCart,
  }) => {
    return (
      <div className="card">
        <img src={imageUrl} alt={judul} />
        <div className="card-body">
          <h2>{judul}</h2>
          <p>{deskripsi}</p>
          <p>{fakultas}</p>
          <p>{harga}</p>
          <p>{status}</p>
          <p>{new Date(timeStamp?.toDate()).toLocaleString()}</p>
          {/* {inCart ? (
            <button onClick={removeFromCart}>Remove from Cart</button>
          ) : (
            <button onClick={addToCart}>Add to Cart</button>
          )} */}
        </div>
      </div>
    );
  };
  
  export default CardItem5;
  


// // CardItem5.jsx
// import React from "react";

// const CardItem5 = ({
//   imageUrl,
//   fakultas,
//   judul,
//   deskripsi,
//   harga,
//   status,
//   timeStamp,
//   inCart,
//   handleApprovePayment, // Function to handle approval
// }) => {
//   return (
//     <div className="card">
//       <img src={imageUrl} alt={judul} />
//       <div className="card-body">
//         <h2>{judul}</h2>
//         <p>{deskripsi}</p>
//         <p>{fakultas}</p>
//         <p>{harga}</p>
//         <p>{status}</p>
//         <p>{new Date(timeStamp?.toDate()).toLocaleString()}</p>
//         {inCart ? (
//           <button onClick={() => handleApprovePayment(product.id)}>
//             Approve Payment
//           </button>
//         ) : (
//           <p>Payment Approved</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardItem5;

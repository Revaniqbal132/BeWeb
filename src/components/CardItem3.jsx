// import { getDownloadURL, ref } from "firebase/storage";
// import { storage } from "@/firebase/firebase";

// const CardItem3 = ({ imageUrl, fakultas, judul, deskripsi, harga }) => {
//   const handleDownload = async () => {
//     try {
//       // Mendapatkan URL unduhan gambar dari Firebase Storage
//       const imageRef = ref(storage, imageUrl);
//       const downloadURL = await getDownloadURL(imageRef);

//       // Mendapatkan nama file dari URL unduhan
//       const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

//       // Melakukan pengunduhan gambar dengan nama file dari URL
//       const link = document.createElement('a');
//       link.href = downloadURL;
//       link.setAttribute('download', fileName); // Gunakan nama file dari URL
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading image:', error);
//     }
//   };

//   return (
//     <div>
//       <img src={imageUrl} alt="Bukti Transfer" />
//       <div>
//         <h3>{judul}</h3>
//         <p>{deskripsi}</p>
//         <p>{fakultas}</p>
//         <p>{harga}</p>
//       </div>
//       <button onClick={handleDownload} style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Download</button>
//     </div>
//   );
// };

// export default CardItem3;

//YANG DIGUNAKAN SEBELUMNYA STATUS
import { getDownloadURL, ref } from "firebase/storage";
import { storage, db } from "@/firebase/firebase"; // import db from firebase config
import { doc, updateDoc } from "firebase/firestore";

const CardItem3 = ({ id, imageUrl, fakultas, judul, deskripsi, harga }) => {
  const handleDownload = async () => {
    try {
      const imageRef = ref(storage, imageUrl);
      const downloadURL = await getDownloadURL(imageRef);
      const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

      const link = document.createElement('a');
      link.href = downloadURL;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleApprove = async () => {
    try {
      const productRef = doc(db, "payments", id); // reference to the specific document
      await updateDoc(productRef, {
        status: "mohon menunggu proses pengerjaan",
      });
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', margin: '10px' }}>
      <img src={imageUrl} alt="Bukti Transfer" style={{ width: '100%', height: 'auto' }} />
      <div>
        <h3>{judul}</h3>
        <p>{deskripsi}</p>
        <p>{fakultas}</p>
        <p>{harga}</p>
      </div>
      <div>
        <button 
          onClick={handleDownload} 
          style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', border: 'none', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}
        >
          Download
        </button>
        <button 
          onClick={handleApprove} 
          style={{ backgroundColor: '#008cba', color: 'white', padding: '10px 20px', border: 'none', fontSize: '16px', cursor: 'pointer' }}
        >
          Acc
        </button>
      </div>
    </div>
  );
};

export default CardItem3;


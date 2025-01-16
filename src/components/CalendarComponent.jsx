// // components/CalendarComponent.js

// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import CardItem from "./CardItem"; // Pastikan path sesuai dengan struktur proyek Anda

// const CalendarComponent = ({ events }) => {
//   const [date, setDate] = useState(new Date());

//   const onChange = (newDate) => {
//     setDate(newDate);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-18 mr-1 r-1 size-152">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
//         <div className="mb-6 md:mb-0 size-252 ml-12">
//           <Calendar
//             onChange={onChange}
//             value={date}
//             className="mx-auto border rounded-lg shadow-md"
//           />
//         </div>
//         <div className="space-y-6">
//           {events
//             .filter((event) => {
//               const eventDate = new Date(event.date);
//               return (
//                 eventDate.getMonth() === date.getMonth() &&
//                 eventDate.getFullYear() === date.getFullYear()
//               );
//             })
//             .map((event) => (
//               <CardItem
//                 key={event.id}
//                 imageUrl={event.imageUrl}
//                 judul={event.title}
//                 deskripsi={event.description}
//                 tanggal={event.date}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarComponent;



import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Import locale Indonesia

const CalendarComponent = ({ events, onDateClick }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateClick) {
      onDateClick(format(date, "yyyy-MM-dd", { locale: id })); // Format tanggal menggunakan locale Indonesia
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        locale="id-ID" // Atur locale agar kalender menggunakan format Indonesia
        className="border rounded-lg shadow-md"
      />
    </div>
  );
};

export default CalendarComponent;


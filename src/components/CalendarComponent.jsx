import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DatePickerDemo = ({ formData, setFormData, name ,handleDateChange}) => {
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Mendapatkan tanggal hari ini di midnight untuk perbandingan yang akurat
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (date) => {
    if (!date) return "";
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
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Fungsi untuk mengecek apakah suatu tanggal harus didisable
  const disabledDays = (date) => {
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);
    return currentDate < today;
  };

  return (
    <div className="w-full max-w-md">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full min-h-[40px] sm:min-h-[44px] text-left font-normal relative flex items-center justify-between hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <div className="flex items-center">
              <svg
                className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="truncate">
                {formData && formData[name]
                  ? formatDate(formData[name])
                  : "Pilih tanggal"}
              </span>
            </div>
            <svg
              className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 sm:min-w-[320px]" align="start">
          <Calendar
            mode="single"
            // selected={formData[name]}
            onSelect={(newDate) => {
              setFormData? setFormData({ ...formData, [name]: newDate }) : handleDateChange(newDate)
              setIsOpen(false);
            }}
            disabled={disabledDays}
            defaultMonth={today}
            fromDate={today}
            initialFocus
            className="rounded-md border shadow-lg"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerDemo;

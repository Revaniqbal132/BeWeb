"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        "service_e9ufax7",
        "template_qnecbg5",
        form.current,
        "YdISpzB0jmWVzUkJS"
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSuccess(true);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="my-10">
      <Navbar />
      <div className="bg-white w-full md:w-3/4 mx-auto p-10 rounded md:shadow-xl md:border mt-36">
        <h1 className="text-center text-3xl font-semibold">
          Send a message to us!
        </h1>
        <form ref={form} onSubmit={sendEmail}>
          <div className="flex flex-col my-3">
            <label htmlFor="email" className="text-center">
              Email:
            </label>
            <div className="border-2 p-3 bg-white rounded ">
              <input
                type="email"
                name="user_email"
                id="email"
                className="w-full outline-none"
                placeholder="Tulis email anda disini..."
              />
            </div>
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="name" className="text-center">
              Name:
            </label>
            <div className="border-2 p-3 bg-white rounded">
              <input
                type="text"
                name="user_name"
                id="name"
                className="w-full outline-none"
                placeholder="Tulis nama anda disini..."
              />
            </div>
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="messageType" className="text-center">
              Message Type:
            </label>
            <div className="border-2 p-3 bg-white rounded">
              <select
                name="message_type"
                id="messageType"
                className="w-full outline-none border-none"
              >
                <option value="Masalah Transaksi">Masalah Transaksi</option>
                <option value="Penemuan Bug">Penemuan Bug</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="message" className="text-center">
              Messages:
            </label>
            <div className="border-2 p-3 bg-white rounded">
              <textarea
                name="message"
                id="message"
                className="w-full outline-none"
                placeholder="Tulis pesan anda disini..."
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="phoneNumber" className="text-center">
              No. Telepon:
            </label>
            <div className="border-2 p-3 bg-white rounded">
              <input
                type="text"
                name="phone_number"
                id="phoneNumber"
                className="w-full outline-none"
                placeholder="Tulis nomor hp anda disini..."
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full bg-green-600 p-3 text-white rounded ${
              isLoading ? "animate-pulse" : ""
            }`}
          >
            Submit
          </button>
        </form>

        {isSuccess && (
          <div className="my-5 bg-teal-500 text-white p-4 rounded text-center">
            <h2>Pesan Berhasil Terkirim</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;

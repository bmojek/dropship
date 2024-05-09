import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { Link } from "react-router-dom";
export default function Success() {
  return (
    <div className="text-center mb-[15%]">
      <h2 className="align-middle inline-block text-5xl py-5 text-green-500">
        <CiCircleCheck />
      </h2>
      <h1 className="text-5xl py-9">Dziękujemy za zamówienie!</h1>
      <p className="text-gray-500 pb-11">
        Wyślemy email z potwierdzeniem zamówienia
      </p>
      <Link
        to="/"
        className="mt-10 py-2 px-10 rounded-xl text-white bg-green-500"
      >
        Strona główna
      </Link>
    </div>
  );
}

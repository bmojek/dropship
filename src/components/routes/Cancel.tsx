import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="text-center mb-[15%]">
      <h2 className="align-middle inline-block text-5xl py-5 text-red-500">
        <CiCircleRemove />
      </h2>
      <h1 className="text-5xl py-9">Zamówienie anulowane</h1>
      <p className="text-gray-500 pb-11">
        Dodaj produkt do koszyka i spróbuj jeszcze raz
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

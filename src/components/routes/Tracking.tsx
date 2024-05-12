import React, { useState, ChangeEvent } from "react";

const Tracking: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState<string>("");

  const handleSearch = () => {
    const url = `https://inpost.pl/sledzenie-przesylek?number=${orderNumber}`;
    window.open(url, "_blank");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrderNumber(event.target.value);
  };

  return (
    <div className="grid grid-cols-1 mx-auto w-6/12 text-center mb-[21.4%]">
      <h1 className="text-4xl font-medium">Śledź swoje zamówienie</h1>
      <input
        type="tel"
        className="border-2 px-5 rounded-lg mt-10 mb-6"
        placeholder="podaj numer zamówienia"
        value={orderNumber}
        onChange={handleChange}
      />
      <button
        className="bg-green-500 mx-auto py-2 px-20 rounded-xl text-xl text-white"
        onClick={handleSearch}
      >
        Szukaj
      </button>
    </div>
  );
};

export default Tracking;

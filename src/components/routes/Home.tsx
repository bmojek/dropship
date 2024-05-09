import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <img src="images/main2.jpg" className="w-full mb-6" alt="" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-auto w-6/12 text-center py-2">
        <div>
          <Link to="/Aircooler">
            <h1 className="text-3xl text-blue-500 font-semibold py-4">
              Aircooler
            </h1>
            <img
              alt="aircooler"
              className="rounded-3xl"
              src="images/airCooler/mainAir.webp"
            ></img>
          </Link>
        </div>
        <div>
          <Link to="/bottleSpray">
            <h1 className="text-3xl text-green-600 font-semibold py-4">
              SprayBottle
            </h1>
            <img
              className="rounded-3xl"
              alt="spraybottle"
              src="images/bottleSpray/1.webp"
            ></img>
          </Link>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  return (
    <div>
      <img src="images/supp.jpg" className="w-full min-h-72" alt="" />
      <div className="relative -top-96 ">
        <h1 className="p-10 text-5xl text-white font-bold">Kontakt</h1>
        <p className="pl-10 text-white">
          Jeżeli masz jakieś pytania skontaktuj się z nami!
        </p>
      </div>
      <div className="grid gap-20 grid-cols-1  lg:grid-cols-2 w-10/12 mx-auto">
        <div className="h-96 bg-white border-2 rounded-xl -my-0 lg:-my-64 z-50 text-center">
          <a
            className="inline-block pt-10  text-pink-600"
            target="_blank"
            rel="noreferrer"
            href="https://instagram.com"
          >
            <FaSquareInstagram className="text-6xl" />
          </a>
          <a
            className=" inline-block text-black"
            rel="noreferrer"
            href="https://www.tiktok.com/@summerrefresh.pl"
            target="_blank"
          >
            <AiFillTikTok className="text-6xl" />
          </a>
          <h1 className="pt-10 font-bold">Napisz poprzez social media</h1>
          <p className="px-12 pt-10">
            Skontaktuj się z nami bezpośrednio w wiadomości prywatnej na
            instagramie lub tiktoku
          </p>
        </div>

        <div className="h-96 bg-white border-2 rounded-xl -my-64 mb-11 z-50 text-center">
          <MdEmail className="inline-block mt-10 text-6xl" />
          <h1 className="pt-10 font-bold">Napisz do nas email</h1>
          <p className="px-12 pt-10">
            Skontaktuj się z nami poprzez na support email:{" "}
            <a
              className="font-semibold"
              href="mailto: support-summerrefresh@gmail.com"
            >
              support-summerrefresh@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

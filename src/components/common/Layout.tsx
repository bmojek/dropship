import React, { useState, useRef, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { CartContext } from "../contexts/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import Home from "../routes/Home";
import Cancel from "../routes/Cancel";
import Success from "../routes/Success";
import Aircooler from "../routes/Aircooler";
import Contact from "../routes/Contact";
import Bottlespray from "../routes/Bottlespray";
import PrivacyPolicy from "../routes/PrivacyPolicy";
import TermsOfService from "../routes/TermsOfService";
import Tracking from "../routes/Tracking";

export default function Layout(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuCart, setMenuCart] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const { cart, removeFromCart, getTotalPrice } = useContext(CartContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setMenuCart(!menuCart);
  };

  const handleClickOutsideCart = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setMenuCart(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideCart);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    };
  }, []);

  const handleDelete = (name: string, color: string) => {
    removeFromCart(name, color);
  };

  const handleCheckout = async () => {
    try {
      await fetch("https://summerrefresh.pl/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.url) {
            window.location.assign(response.url);
          }
        });
    } catch {
      console.log("blad serwera");
    }
  };

  return (
    <Router>
      <>
        <div className="text-center py-1 text-white bg-green-600 text-lg">
          <p className="inline-block">❄️ DARMOWA DOSTAWA DO 10 DNI ❄️</p>
        </div>

        <nav className="menu text-center text-lg pt-6 font-medium pb-10 ">
          <Link to="/" className="text-2xl lg:inline lg:pr-40 text-green-600">
            <img
              className="inline"
              src="images/logo2.jpg"
              width="150px"
              alt="logo"
            ></img>
          </Link>
          <div className="inline-block">
            <button
              className="lg:hidden text-end absolute left-10 top-28"
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <RxCross1 className="text-3xl" />
              ) : (
                <RxHamburgerMenu className="text-3xl" />
              )}
            </button>

            <div className="hidden lg:inline-block lg:space-x-8">
              <Link
                to="/Aircooler"
                className="nav-link block lg:inline hover:text-gray-500"
              >
                AIRCOOLER
              </Link>
              <Link
                to="/Bottlespray"
                className="nav-link block lg:inline hover:text-gray-500"
              >
                BOTTLESPRAY
              </Link>
              <Link
                to="/Tracking"
                className="nav-link block lg:inline hover:text-gray-500"
              >
                ŚLEDZENIE ZAMÓWIENIA
              </Link>
              <Link
                to="/Contact"
                className="nav-link block lg:inline hover:text-gray-500"
              >
                KONTAKT
              </Link>
            </div>

            <button
              className="w-11 absolute top-28 right-8 lg:ml-10 lg:static"
              onClick={toggleCart}
            >
              <span className="text-green-700">
                {cart.length > 0 && cart.length}
              </span>
              <CiShoppingCart className="inline text-center text-3xl"></CiShoppingCart>
            </button>
          </div>
          <div
            className={`lg:hidden ${
              menuOpen ? "block" : "hidden"
            } text-white text-left bg-green-500 h-[80vh] space-y-4 p-10`}
          >
            <Link
              onClick={toggleMenu}
              to="/Aircooler"
              className="block lg:inline hover:text-gray-500"
            >
              AIRCOOLER
            </Link>
            <Link
              onClick={toggleMenu}
              to="/Bottlespray"
              className="block lg:inline hover:text-gray-500"
            >
              BOTTLESPRAY
            </Link>
            <Link
              onClick={toggleMenu}
              to="/Tracking"
              className="block lg:inline hover:text-gray-500"
            >
              ŚLEDZENIE ZAMÓWIENIA
            </Link>
            <Link
              onClick={toggleMenu}
              to="/Contact"
              className="block lg:inline hover:text-gray-500"
            >
              KONTAKT
            </Link>
          </div>
          {menuCart ? (
            <div
              ref={cartRef as React.RefObject<HTMLDivElement>}
              className={`fixed w-96 h-full right-0 top-0 border-2  bg-white ${
                menuCart ? "slide-in" : "slide-out"
              }`}
              style={{ zIndex: 9999 }}
            >
              <div className="py-5 text-2xl ">
                <h1 className="inline">Koszyk</h1>
                <button className="inline pl-[60%]" onClick={toggleCart}>
                  X
                </button>
                <div style={{ maxHeight: "30em", overflowY: "scroll" }}>
                  {cart.map((product, index) => (
                    <div key={index} className="grid grid-cols-3 py-3">
                      <Link to={`/${product.name}`}>
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full"
                        />
                      </Link>
                      <div className="text-base text-left">
                        <h2>{product.name}</h2>
                        <p>{product.price} zł</p>
                        <p>Kolor: {product.color}</p>
                        <p>Ilość: {product.quantity}</p>
                      </div>
                      <div>
                        <p>{product.price * product.quantity}zł</p>
                        <button
                          className="pt-5"
                          onClick={() =>
                            handleDelete(product.name, product.color)
                          }
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {cart.length > 0 ? (
                  <div className="absolute bottom-4 left-7">
                    <hr />
                    <p className="py-8 text-md ">
                      Podsumowanie{" "}
                      <span className="pl-6">{getTotalPrice()}zł</span>
                    </p>
                    <button
                      onClick={handleCheckout}
                      className="bg-green-500 hover:bg-green-700 py-4 px-20 rounded-lg text-base text-white"
                    >
                      Przejdź do płatności
                    </button>
                  </div>
                ) : (
                  <div className="mt-[50%]">
                    <h1 className="text-3xl">PUSTY</h1>
                    <p className="text-lg pt-5">Dodaj produkt do koszyka!</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </nav>
      </>
      <div className={`mainApp ${menuOpen ? "hidden" : "block"} lg:block`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Tracking" element={<Tracking />} />
          <Route
            path="/Aircooler"
            element={
              <Aircooler menuCart={menuCart} setMenuCart={setMenuCart} />
            }
          />
          <Route
            path="/Bottlespray"
            element={
              <Bottlespray menuCart={menuCart} setMenuCart={setMenuCart} />
            }
          />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Cancel" element={<Cancel />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
        </Routes>
      </div>
      <footer className="p-10 mt-3 bottom-0 bg-green-700 ">
        <div className="grid grid-cols-1 grid-rows-3 gap-5 w-52 lg:w-full  lg:flex items-center justify-between text-white">
          <div>
            <p className=" inline-block">© 2024, Summer-Refresh</p>
            <span> • </span>
            <Link
              className="inline-block hover:underline  text-xs"
              to="/PrivacyPolicy"
            >
              Polityka prywatności
            </Link>
            <span> • </span>
            <Link
              className="inline-block hover:underline text-xs"
              to="/TermsOfService"
            >
              Warunki korzystania
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-1 ">
            <svg
              aria-hidden="true"
              className="SVGInline-svg rounded-lg SVGInline--cleaned-svg inline-block SVG-svg Icon-svg Icon--blik-svg Icon-color-svg Icon-color--gray600-svg"
              height="32"
              width="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#010101" d="M0 0h32v32H0z"></path>
              <path
                d="M16.276 13.305a6.268 6.268 0 0 0-2.968.745v-7.1H10v12.629a6.277 6.277 0 0 0 12.553 0 6.275 6.275 0 0 0-6.277-6.274Zm0 9.295a3.021 3.021 0 1 1 0-6.042 3.021 3.021 0 0 1 0 6.042Z"
                fill="#fff"
              ></path>
              <path
                d="M19.592 11.921a2.96 2.96 0 1 0 0-5.921 2.96 2.96 0 0 0 0 5.921Z"
                fill="url(#bi_blik__a)"
              ></path>
              <defs>
                <linearGradient
                  id="bi_blik__a"
                  x1="103.397"
                  y1="92.918"
                  x2="521.926"
                  y2="511.447"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E52F08"></stop>
                  <stop offset="1" stopColor="#E94F96"></stop>
                </linearGradient>
              </defs>
            </svg>
            <svg
              aria-hidden="true"
              className="SVGInline-svg rounded-lg SVGInline--cleaned-svg inline-block SVG-svg Icon-svg Icon--applepay-svg Icon-color-svg Icon-color--gray600-svg"
              height="32"
              width="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#F6F8FA" d="M0 0h32v32H0z"></path>
              <path
                d="M26.672 8H5.328c-.163 0-.327.002-.49.004a3.265 3.265 0 0 0-.49.043 1.56 1.56 0 0 0-1.148.837c-.076.149-.124.3-.153.464a3.442 3.442 0 0 0-.043.49L3 10.06v12.255c0 .164.002.328.004.492.004.163.014.328.043.489a1.562 1.562 0 0 0 .837 1.148c.149.076.3.124.464.153a3.3 3.3 0 0 0 .49.044l.223.003h21.877l.226-.003c.162-.005.326-.015.488-.044a1.65 1.65 0 0 0 .465-.153c.295-.15.534-.389.683-.683.074-.147.126-.304.153-.466.027-.161.041-.324.043-.488.002-.075.003-.149.003-.224l.001-.268V10.062c0-.075-.002-.15-.004-.225a3.243 3.243 0 0 0-.043-.489 1.567 1.567 0 0 0-1.3-1.301 3.274 3.274 0 0 0-.49-.043L26.938 8h-.266Z"
                fill="#000"
              ></path>
              <path
                d="M26.672 8.555h.262c.071 0 .143.002.215.004.123.003.27.009.405.034.118.022.217.053.312.103a1.004 1.004 0 0 1 .54.751c.025.134.032.28.035.405l.004.214v12.515c0 .07-.002.141-.004.212 0 .136-.012.272-.034.406a1.08 1.08 0 0 1-.102.311.996.996 0 0 1-.44.44c-.098.05-.202.084-.31.102a2.822 2.822 0 0 1-.404.035 8.19 8.19 0 0 1-.217.002H5.064c-.071 0-.143 0-.212-.002a2.832 2.832 0 0 1-.406-.035 1.087 1.087 0 0 1-.312-.102.995.995 0 0 1-.44-.44 1.09 1.09 0 0 1-.102-.312 2.744 2.744 0 0 1-.033-.405 10.392 10.392 0 0 1-.004-.213V10.066c0-.072.001-.143.004-.215.003-.124.01-.269.034-.405.018-.108.052-.213.102-.31a.998.998 0 0 1 .44-.441 1.11 1.11 0 0 1 .311-.103c.135-.02.27-.032.406-.033l.213-.004h21.607Z"
                fill="#fff"
              ></path>
              <path
                d="M10.098 13.599c.223-.28.373-.652.333-1.035-.325.016-.723.214-.953.494-.207.238-.39.628-.342.994.366.032.731-.183.962-.453Zm.33.524c-.531-.032-.984.302-1.237.302-.254 0-.643-.286-1.063-.278a1.567 1.567 0 0 0-1.331.81c-.571.983-.151 2.442.404 3.244.27.396.594.833 1.022.817.405-.016.564-.26 1.055-.26s.634.26 1.062.252c.444-.008.722-.396.991-.793.31-.453.437-.889.444-.913-.007-.007-.857-.333-.864-1.308-.007-.818.666-1.206.699-1.23-.382-.563-.976-.627-1.183-.642m4.626-1.106c1.155 0 1.959.796 1.959 1.955 0 1.162-.82 1.963-1.988 1.963h-1.278v2.032h-.924v-5.95h2.231Zm-1.307 3.143h1.06c.804 0 1.261-.433 1.261-1.184 0-.75-.457-1.18-1.257-1.18h-1.064v2.364Zm3.508 1.574c0-.759.581-1.224 1.612-1.282l1.187-.07v-.334c0-.482-.326-.771-.87-.771-.515 0-.837.247-.915.635h-.84c.049-.784.716-1.362 1.788-1.362 1.052 0 1.724.557 1.724 1.428v2.99h-.853v-.714h-.02c-.252.483-.802.788-1.37.788-.85 0-1.443-.528-1.443-1.308Zm2.8-.39v-.343l-1.069.065c-.53.037-.832.273-.832.644 0 .38.313.627.791.627.623 0 1.11-.428 1.11-.994Zm1.692 3.22v-.722c.066.017.215.017.289.017.413 0 .635-.174.771-.619 0-.009.078-.264.078-.268l-1.566-4.342h.965l1.098 3.53h.016l1.097-3.53h.94l-1.625 4.565c-.37 1.052-.8 1.39-1.699 1.39a3.699 3.699 0 0 1-.363-.021Z"
                fill="#000"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              className="SVGInline-svg rounded-lg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--googlepay-svg Icon-color-svg Icon-color--gray600-svg"
              height="32"
              width="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#F5F6F8" d="M0 0h32v32H0z"></path>
              <path
                d="M27.765 13.823h-11.53v4.628h6.611a5.444 5.444 0 0 1-.84 2.068 5.551 5.551 0 0 1-1.607 1.572v3.011h3.934a11.74 11.74 0 0 0 2.788-4.044c.944-2.285 1.055-4.815.644-7.235Z"
                fill="#4285F4"
              ></path>
              <path
                d="M16.235 28c3.295 0 6.085-1.055 8.098-2.898l-3.934-3.01a7.42 7.42 0 0 1-4.164 1.145 7.409 7.409 0 0 1-4.238-1.39 7.198 7.198 0 0 1-2.625-3.553H5.3v3.078a12.104 12.104 0 0 0 4.511 4.837A12.405 12.405 0 0 0 16.235 28Z"
                fill="#34A853"
              ></path>
              <path
                d="M9.372 18.294a7.069 7.069 0 0 1 0-4.606v-3.1H5.3A11.847 11.847 0 0 0 4 15.98c0 1.872.445 3.719 1.3 5.392l4.072-3.078Z"
                fill="#FBBC04"
              ></path>
              <path
                d="M16.235 8.745a6.7 6.7 0 0 1 4.69 1.797l3.5-3.438a12.304 12.304 0 0 0-4.874-2.65 12.454 12.454 0 0 0-5.565-.252 12.352 12.352 0 0 0-5.102 2.195 12.077 12.077 0 0 0-3.584 4.19l4.072 3.1a7.198 7.198 0 0 1 2.625-3.551 7.409 7.409 0 0 1 4.238-1.391Z"
                fill="#EA4335"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              className="SVGInline-svg rounded-lg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--p24-svg Icon-color-svg Icon-color--gray600-svg"
              height="32"
              width="32"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#F5F6F8" d="M0 .097h32v32H0z"></path>
              <g
                clipPath="url(#bi_p24__a)"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path
                  d="m18.28 22.057-.155.818h-6.556l.308-1.616c.172-.905.47-1.498.898-1.78.427-.28 1.355-.496 2.784-.647 1.142-.117 1.85-.276 2.12-.477.273-.202.488-.723.648-1.565.14-.738.102-1.217-.117-1.437-.219-.22-.765-.33-1.641-.33-1.094 0-1.8.09-2.12.268-.322.177-.547.606-.675 1.285l-.11.641h-1.007l.092-.446c.195-1.026.555-1.71 1.08-2.053.526-.34 1.48-.512 2.862-.512 1.227 0 2.017.185 2.369.553.353.37.426 1.088.223 2.157-.195 1.026-.521 1.713-.98 2.058-.46.346-1.359.58-2.698.7-1.176.11-1.894.261-2.153.454-.26.192-.474.739-.645 1.64l-.055.29h5.529Zm8.623-7.747-1.1 5.782h1.362l-.156.818h-1.36l-.377 1.98h-1.025l.376-1.98H19.53l.215-1.137 5.573-5.463h1.587-.001Zm-2.126 5.782.981-5.16h-.02l-5.208 5.16h4.247Z"
                  fill="#99A0A6"
                ></path>
                <path
                  d="M4.656 14.206 3 22.86h1.052l.653-3.41h2.69l.412-.007c1.097 0 1.88-.18 2.346-.54.467-.358.796-1.032.985-2.02.197-1.032.14-1.736-.17-2.112-.31-.376-.992-.564-2.043-.564h-4.27Zm2.699 4.419H4.862l.688-3.595h2.828l.401.007c.743 0 1.191.11 1.347.333.156.222.153.75-.007 1.587-.136.714-.37 1.171-.702 1.37-.331.198-1.02.298-2.062.298Z"
                  fill="#D40E2B"
                ></path>
                <path
                  d="m9.142 11.056-1.012-.67A22.12 22.12 0 0 1 11.847 9l.186.914c-.915.26-1.88.632-2.89 1.142Zm11.481-.502a10.827 10.827 0 0 0-2.992-1l.818-1.457h.023c2.362.01 4.24.308 5.72.721l-3.569 1.737Zm-13.414.302 1.034.7c-.471.27-.953.57-1.443.905H4.793s.83-.738 2.415-1.605Zm10.026-2.709-.484 1.291a12.351 12.351 0 0 0-4.016.264l-.138-.924c1.52-.359 3.074-.57 4.638-.632v.001Zm8.84 1.304c2.14.938 2.925 2.006 2.925 2.006h-6.92s-.228-.197-.659-.472l4.654-1.534Z"
                  fill="#99A0A6"
                ></path>
              </g>
              <defs>
                <clipPath id="bi_p24__a">
                  <path
                    fill="#fff"
                    transform="translate(3 8.097)"
                    d="M0 0h26v14.793H0z"
                  ></path>
                </clipPath>
              </defs>
            </svg>
            <svg
              aria-hidden="true"
              className="SVGInline-svg rounded-lg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--card-svg Icon-color-svg Icon-color--gray600-svg"
              height="32"
              width="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#D8DEE4" d="M0 0h32v32H0z"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 10.375C6 9.339 6.84 8.5 7.875 8.5h16.25C25.16 8.5 26 9.34 26 10.375v11.25c0 1.035-.84 1.875-1.875 1.875H7.875A1.875 1.875 0 0 1 6 21.625v-11.25Zm1.875 0h16.25v1.875H7.875v-1.875Zm16.25 3.75v7.5H7.875v-7.5h16.25Z"
                fill="#474E5A"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.75 18.813c0-.518.42-.938.938-.938h5.624a.937.937 0 1 1 0 1.875h-5.625a.937.937 0 0 1-.937-.938Z"
                fill="#474E5A"
              ></path>
            </svg>
          </div>
          <div className="grid grid-cols-5 gap-1">
            <a
              className="inline text-pink-600"
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/summerrefresh.pl/"
            >
              <FaSquareInstagram className="text-4xl" />
            </a>
            <a
              className="inline text-black"
              rel="noreferrer"
              href="https://www.tiktok.com/@summerrefresh.pl"
              target="_blank"
            >
              <AiFillTikTok className="text-4xl" />
            </a>
            <a
              className="inline text-blue-900"
              rel="noreferrer"
              href="https://www.facebook.com/profile.php?id=61559457217460"
              target="_blank"
            >
              <FaFacebookSquare className="text-4xl" />
            </a>
            <a
              className="inline text-black"
              rel="noreferrer"
              href="https://twitter.com/summerrefreshpl"
              target="_blank"
            >
              <FaSquareXTwitter className="text-4xl" />
            </a>
            <a
              className="inline text-red-600"
              rel="noreferrer"
              href="https://www.youtube.com/@summerrefreshpl"
              target="_blank"
            >
              <FaYoutube className="text-4xl" />
            </a>
          </div>
        </div>
      </footer>
    </Router>
  );
}

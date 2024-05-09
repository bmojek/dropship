import React, { useState, useRef, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { CartContext } from "../contexts/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import Home from "../routes/Home";
import Cancel from "../routes/Cancel";
import Success from "../routes/Success";
import About from "../routes/About";
import Aircooler from "../routes/Aircooler";
import Contact from "../routes/Contact";
import Bottlespray from "../routes/Bottlespray";

export default function Layout(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(true);
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
    await fetch("http://localhost:4000/checkout", {
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
  };

  return (
    <Router>
      <>
        <div className="text-center py-1 text-white bg-green-600 text-lg">
          <p className="inline-block">❄️ DARMOWA DOSTAWA DO 10 DNI ❄️</p>
        </div>

        <nav className="menu text-center text-lg pt-6 font-medium pb-10 ">
          <Link
            to="/"
            className="text-2xl block lg:inline pr-40 text-green-600"
          >
            <img
              className="inline"
              src="images/logo2.jpg"
              width="150px"
              alt="logo"
            ></img>
          </Link>
          <div className="inline-block lg:space-x-8 ">
            <button
              className="lg:hidden text-end absolute left-6 top-16"
              onClick={toggleMenu}
            >
              {menuOpen ? "|||" : "|||"}
            </button>
            {menuOpen ? (
              <>
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
                {/* <Link to="/Aircooler" className='nav-link block lg:inline hover:text-gray-500'>WATERGUN</Link> */}
                <Link
                  to="/About"
                  className="nav-link block lg:inline hover:text-gray-500"
                >
                  O NAS
                </Link>
                <Link
                  to="/Contact"
                  className="nav-link block lg:inline hover:text-gray-500"
                >
                  KONTAKT
                </Link>
                <button className="w-11" onClick={toggleCart}>
                  <span className="text-green-700">
                    {cart.length > 0 && cart.length}
                  </span>
                  <CiShoppingCart className="block lg:inline text-center text-3xl"></CiShoppingCart>
                </button>
              </>
            ) : null}
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
              </div>
            </div>
          ) : null}
        </nav>
      </>
      <div className="mainApp">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
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
        </Routes>
      </div>
      <footer className="p-10 mt-3 bottom-0 bg-green-700 ">
        <div className="flex items-center justify-between text-white">
          <p>© 2024, Summer-Refresh</p>
          <div className="flex  space-x-4">
            <a
              className="inline text-pink-600"
              target="_blank"
              rel="noreferrer"
              href="https://instagram.com"
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
          </div>
        </div>
      </footer>
    </Router>
  );
}

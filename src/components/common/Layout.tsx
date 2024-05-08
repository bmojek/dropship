import React, { useState, useRef, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import About from "../routes/About";
import Aircooler from "../routes/Aircooler";
import Contact from "../routes/Contact";
import { CiShoppingCart } from "react-icons/ci";
import Bottlespray from "../routes/Bottlespray";
import { CartContext } from "../contexts/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";

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

  return (
    <Router>
      <div className="">
        <div className="text-center py-1 text-white bg-green-600 text-lg">
          <p>Darmowa dostawa w 10 dni 😲</p>
        </div>

        <nav className="menu text-center text-lg py-14 font-medium pb-20 ">
          <Link
            to="/"
            className="text-2xl block lg:inline pr-40 text-green-600"
          >
            SummerShop
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
                <button onClick={toggleCart}>
                  {cart.length > 0 && cart.length}
                  <CiShoppingCart className="block lg:inline text-center text-3xl"></CiShoppingCart>
                </button>
              </>
            ) : null}
          </div>
          {menuCart ? (
            <div
              ref={cartRef as React.RefObject<HTMLDivElement>}
              className={`absolute w-96 h-full right-0 top-0 border-2  bg-white ${
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
                  {cart.map((product) => (
                    <div key={product.name} className="grid grid-cols-3 py-3">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full"
                      />
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
                    Cena produktów {getTotalPrice()}zł
                  </p>
                  <button className="bg-green-400 py-4 px-20 rounded-lg text-base text-white">
                    Przejdź do płatności
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </nav>
      </div>
      <Routes>
        <Route path="/" />
        <Route path="/About" element={<About />} />
        <Route
          path="/Aircooler"
          element={<Aircooler menuCart={menuCart} setMenuCart={setMenuCart} />}
        />
        <Route
          path="/Bottlespray"
          element={<Bottlespray menuCart={menuCart} />}
        />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

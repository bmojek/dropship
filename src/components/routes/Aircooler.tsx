import React, { useState, useRef, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../contexts/CartContext";

interface Props {
  menuCart: boolean;
  setMenuCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Aircooler: React.FC<Props> = ({ menuCart, setMenuCart }) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const sliderRef = useRef<Slider>(null);
  const { addToCart } = useContext(CartContext);
  const price = 99;
  const thumbnails: { color: string; url: string }[] = [
    { color: "czarny", url: "images/airCooler/airBlack.webp" },
    { color: "biały", url: "images/airCooler/airWhite.webp" },
    { color: "zielony", url: "images/airCooler/airGreen.webp" },
  ];

  const descPhotos: { url: string }[] = [];

  for (let i = 1; i < 21; i++) {
    descPhotos.push({ url: `images/airCooler/${i}.webp` });
  }

  const handleColorChange = (index: number, color: string) => {
    setSelectedColor(color);
    sliderRef.current?.slickGoTo(index + 1);
  };

  const handleAddToCart = () => {
    const selectedThumbnail = thumbnails.find(
      (thumbnail) => thumbnail.color === selectedColor
    );

    if (selectedThumbnail)
      addToCart({
        name: "Aircooler",
        color: selectedColor,
        quantity: quantity,
        price: price,
        img: selectedThumbnail.url,
      });
    setMenuCart(true);
    setSelectedColor("");
    setQuantity(1);
  };

  const buttonStyle = (color: string) => {
    return `color-button border-2 font-light rounded-xl px-3 mx-2 py-1 ${
      selectedColor === color ? "bg-green-800 border-green-800 text-white" : ""
    }`;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="w-3/5 m-auto grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Slider className={`w-10/12 min-w-56 `} {...settings} ref={sliderRef}>
            <img
              className="rounded-3xl"
              src="images/airCooler/firstCooler.webp"
              alt=""
            />
            {thumbnails.map((thumbnail, index) => (
              <div key={index}>
                <img src={thumbnail.url} alt={`air${index}`} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="product pt-16">
          <h1 className="text-4xl  font-semibold text-green-600">Aircooler</h1>
          <p className="p-3 font-semibold text-lg">
            {price},00zł{" "}
            <span className="line-through font-normal">219,00zł</span>
          </p>
          <p className="font-normal pl-2 pb-4 text-sm text-green-500">
            Zostało 10+ sztuk w magazynie
          </p>
          <div className="color-buttons">
            <p className="py-2 font-light">Kolor</p>
            {thumbnails.map((thumbnail, index) => (
              <button
                key={index}
                className={buttonStyle(thumbnail.color)}
                onClick={() => handleColorChange(index, thumbnail.color)}
              >
                {thumbnail.color}
              </button>
            ))}
          </div>
          <div className="flex items-center my-10">
            <label className="mr-2 font-light">Ilość:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border-2 rounded-md px-2 py-1 w-16"
            />
          </div>
          <button
            className="bg-green-400 hover:bg-green-300 text-white font-semibold w-10/12 py-2 rounded-md mt-4"
            onClick={handleAddToCart}
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
      <div className="bg-green-600 col-span-2 text-center my-16 py-10 text-white">
        <h1 className="text text-4xl font-bold">
          Pokonaj letnie upały w tym roku!
        </h1>
        <p className="pt-4">
          Rozkoszuj się orzeźwiającym powiewem z naszym Aircooler
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-1 w-8/12 mx-auto">
        {descPhotos.map((photo, index) => (
          <img
            key={index}
            src={photo.url}
            className="w-full h-auto"
            alt="Description"
          />
        ))}
      </div>
    </>
  );
};
export default Aircooler;

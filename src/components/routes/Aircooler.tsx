import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Aircooler() {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const sliderRef = useRef<Slider>(null);

  const thumbnails: { color: string; url: string }[] = [
    { color: 'black', url: 'images/airBlack.webp' },
    { color: 'white', url: 'images/airWhite.webp' },
    { color: 'green', url: 'images/airGreen.webp' },
  ];

  const handleColorChange = (index: number, color: string) => {
    setSelectedColor(color);
    sliderRef.current?.slickGoTo(index);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${selectedColor} Aircooler(s) to cart.`);
  };

  const buttonStyle = (color: string) => {
    return `color-button border-2 font-light rounded-xl px-3 mx-2 py-1 ${selectedColor === color ? 'bg-green-800 border-green-800 text-white' : ''}`;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='w-3/5 m-auto grid grid-cols-2'>
      <Slider className='w-10/12 min-w-56' {...settings} ref={sliderRef}>
        {thumbnails.map((thumbnail, index) => (
          <div key={index}>
            <img src={thumbnail.url} alt={`air${index}`} />
          </div>
        ))}
      </Slider>
      <div className='product  pt-16'>
        <h1 className='text-4xl  font-semibold text-green-600'>Aircooler</h1>
        <p className='p-3 font-semibold text-lg'>99,00zł <span className='line-through font-normal'>219,00zł</span></p>
        <div className="color-buttons">
          <p className='py-2 font-light'>Kolor</p>
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
        <button className="bg-green-600 text-white font-semibold w-10/12 py-2 rounded-md mt-4" onClick={handleAddToCart}>
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
}

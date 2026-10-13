import React, { useState, useEffect } from "react";
import { Clock, Users } from "lucide-react";

// Auto-sliding image carousel component with fallback handling
function CarImageSlider({ images, carName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(images[0]);

  // Update current image when carousel changes
  useEffect(() => {
    setImgSrc(images[currentIndex]);
  }, [currentIndex, images]);

  // Auto slide every 3 seconds
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl mb-4 bg-slate-950 group">
      <img
        src={imgSrc}
        alt={`${carName} view ${currentIndex + 1}`}
        onError={() => {
          // Fallback if an individual link fails
          setImgSrc(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_Model_3_2019_1.jpg/800px-Tesla_Model_3_2019_1.jpg",
          );
        }}
        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
      />

      {/* Progress Dots */}
      <div className="absolute bottom-2.5 left-0 right-0 flex justify-center space-x-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-5 bg-red-600 shadow-sm shadow-red-500/50"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// 100% Verified Tesla Image Sets per Model
const fullCatalog = [
  {
    id: 1,
    name: "Tesla Model 3",
    tag: "MOST POPULAR",
    tagBg: "bg-amber-500",
    range: "272 mi",
    speed: "140 mph",
    fee: "$299",
    images: [
      "/assets/images/tesla model 3 img-1.jfif",
      "/assets/images/tesla model 3 img-2.jfif",
      "/assets/images/tesla model 3 img-3.jfif",
      "/assets/images/tesla model 3 img-4.jfif",
    ],
  },
  {
    id: 2,
    name: "Tesla Model Y",
    tag: "FAMILY SUV",
    tagBg: "bg-blue-600",
    range: "310 mi",
    speed: "155 mph",
    fee: "$349",
    images: [
      "/assets/images/tesla model y img-1.jfif",
      "/assets/images/tesla model y img-2.jfif",
      "/assets/images/tesla model y img-3.jfif",
      "/assets/images/tesla model y img-4.jfif",
    ],
  },
  {
    id: 3,
    name: "Tesla Model S",
    tag: "PERFORMANCE",
    tagBg: "bg-purple-600",
    range: "405 mi",
    speed: "200 mph",
    fee: "$399",
    images: [
      "/assets/images/tesla model s img-1.jfif",
      "/assets/images/tesla model s img-2.jfif",
      "/assets/images/tesla model s img-3.jfif",
      "/assets/images/tesla model s img-4.jfif",
    ],
  },
  {
    id: 4,
    name: "Tesla Model X",
    tag: "LUXURY",
    tagBg: "bg-emerald-600",
    range: "335 mi",
    speed: "163 mph",
    fee: "$249",
    images: [
      "/assets/images/tesla model x img-1.jfif",
      "/assets/images/tesla model x img-2.jfif",
      "/assets/images/tesla model x img-3.jfif",
      "/assets/images/tesla model x img-4.jfif",
    ],
  },
  {
    id: 5,
    name: "Tesla Cybertruck",
    tag: "CYBERBEAST",
    tagBg: "bg-purple-700",
    range: "340 mi",
    speed: "130 mph",
    fee: "$379",
    images: [
      "/assets/images/tesla cybertruck 1.jfif",
      "/assets/images/tesla cybertruck 2.jfif",
      "/assets/images/tesla cybertruck 3.jfif",
      "/assets/images/tesla cybertruck 4.jfif",
    ],
  },
  {
    id: 6,
    name: "Tesla Roadster",
    tag: "SUPERCAR",
    tagBg: "bg-amber-600",
    range: "620 mi",
    speed: "250+ mph",
    fee: "$499",
    images: [
      "/assets/images/tesla roadster 1.jfif",
      "/assets/images/tesla roadster 2.jfif",
      "/assets/images/tesla roadster 3.jfif",
      "/assets/images/tesla roadster 4.jfif",
    ],
  },
  {
    id: 7,
    name: "Tesla Model S Plaid",
    tag: "ULTIMATE",
    tagBg: "bg-cyan-600",
    range: "396 mi",
    speed: "200 mph",
    fee: "$199",
    images: [
      "/assets/images/Tesla Model S Plaid 1.jfif",
      "/assets/images/Tesla Model S Plaid 2.jfif",
      "/assets/images/Tesla Model S Plaid 4.jfif",
      "/assets/images/Tesla Model S Plaid.jfif",
    ],
  },
  {
    id: 8,
    name: "Tesla Model X Plaid",
    tag: "TRI-MOTOR",
    tagBg: "bg-indigo-600",
    range: "333 mi",
    speed: "163 mph",
    fee: "$329",
    images: [
      "/assets/images/Tesla Model X Plaid 1.jfif",
      "/assets/images/Tesla Model X Plaid 2.jfif",
      "/assets/images/Tesla Model X Plaid 4.jfif",
      "/assets/images/Tesla Model X Plaid.jfif",
    ],
  },
];

export default function CarCatalog({ onSelectCar }) {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      {/* Banner */}
      <div className="text-center mb-10">
        <span className="text-xs font-semibold text-red-500 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full">
          OFFICIAL TESLA GLOBAL GIVEAWAY
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3">
          Choose Your <span className="text-red-500">Tesla Electric Car</span>
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Tesla is gifting brand new electric vehicles to participants
          worldwide.
        </p>

        {/* Timer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 bg-slate-900 border border-slate-800 px-5 py-3 rounded-2xl sm:rounded-full mt-6 text-xs text-slate-300 mx-auto max-w-max">
          {/* Timer */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-500 shrink-0" />
            <span className="whitespace-nowrap">
              ENDS SOON:{" "}
              <strong className="text-white font-mono tracking-wider ml-1">
                11 : 42 : 30
              </strong>
            </span>
          </div>

          {/* Participants Counter */}
          <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-center">
            <Users className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="whitespace-nowrap">12,847 participants</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {fullCatalog.map((car) => (
          <div
            key={car.id}
            className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
          >
            {/* Header Tag */}
            <div
              className={`py-2 px-4 text-center text-[10px] font-extrabold text-white tracking-wider uppercase ${car.tagBg}`}
            >
              {car.tag}
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-bold text-white text-center">
                  {car.name}
                </h3>
                <p className="text-[11px] text-slate-400 text-center mb-4">
                  2026 Model
                </p>

                {/* Auto-sliding Image Carousel */}
                <CarImageSlider images={car.images} carName={car.name} />

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950 p-3 rounded-xl mb-4 border border-slate-800/80 text-center">
                  <div>
                    <p className="text-slate-500">Range</p>
                    <p className="text-white font-bold">{car.range}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Top Speed</p>
                    <p className="text-white font-bold">{car.speed}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectCar && onSelectCar(car)}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                Claim This Tesla Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

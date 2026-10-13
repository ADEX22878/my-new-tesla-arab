import React, { useState, useEffect } from "react";
import { Zap, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Updated list of all 8 Tesla models using local image paths
const quickCars = [
  {
    name: "Model 3",
    fullName: "Tesla Model 3",
    subtitle: "Rear-Wheel Drive • Pearl White",
    tag: "Popular",
    tagBg: "bg-amber-500/80 border-amber-400/30 text-amber-100",
    img: "/assets/images/tesla model 3 img-3.jfif",
  },
  {
    name: "Model Y",
    fullName: "Tesla Model Y Performance",
    subtitle: "Dual Motor All-Wheel Drive • Deep Blue",
    tag: "Best Value",
    tagBg: "bg-blue-600/80 border-blue-400/30 text-blue-100",
    img: "/assets/images/tesla model y img-2.jfif",
  },
  {
    name: "Model S",
    fullName: "Tesla Model S",
    subtitle: "Tri-Motor All-Wheel Drive • Solid Black",
    tag: "Performance",
    tagBg: "bg-purple-600/80 border-purple-400/30 text-purple-100",
    img: "/assets/images/tesla model s img-3.jfif",
  },
  {
    name: "Model X",
    fullName: "Tesla Model X",
    subtitle: "Falcon Wing Doors • Ultra Red",
    tag: "Luxury",
    tagBg: "bg-emerald-600/80 border-emerald-400/30 text-emerald-100",
    img: "/assets/images/tesla model x img-1.jfif",
  },
  {
    name: "Cybertruck",
    fullName: "Tesla Cybertruck",
    subtitle: "Cyberbeast Tri-Motor • Stainless Steel",
    tag: "New Edition",
    tagBg: "bg-indigo-600/80 border-indigo-400/30 text-indigo-100",
    img: "/assets/images/tesla cybertruck 3.jfif",
  },
  {
    name: "Roadster",
    fullName: "Tesla Roadster",
    subtitle: "SpaceX Package • Fire Red",
    tag: "Supercar",
    tagBg: "bg-rose-600/80 border-rose-400/30 text-rose-100",
    img: "/assets/images/tesla roadster 1.jfif",
  },
  {
    name: "Model S Plaid",
    fullName: "Tesla Model S Plaid",
    subtitle: "1,020 HP • Carbon Fiber Spoiler",
    tag: "Ultimate",
    tagBg: "bg-cyan-600/80 border-cyan-400/30 text-cyan-100",
    img: "/assets/images/Tesla Model S Plaid 1.jfif",
  },
  {
    name: "Model X Plaid",
    fullName: "Tesla Model X Plaid",
    subtitle: "0-60 mph in 2.5s • Yoke Steering",
    tag: "Tri-Motor",
    tagBg: "bg-violet-600/80 border-violet-400/30 text-violet-100",
    img: "/assets/images/Tesla Model X Plaid 1.jfif",
  },
];

export default function Hero({ onClaimClick }) {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  // Auto-play interval for the right carousel (swaps car every 4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCarIndex((prev) => (prev + 1) % quickCars.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentCarIndex((prev) => (prev + 1) % quickCars.length);
  };

  const handlePrev = () => {
    setCurrentCarIndex(
      (prev) => (prev - 1 + quickCars.length) % quickCars.length,
    );
  };

  const activeCar = quickCars[currentCarIndex];

  return (
    <section className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
      {/* Main Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        {/* Left Hero Content */}
        <div className="lg:col-span-7 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Official 2026 Model Giveaway</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Win a{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
              Brand New Tesla
            </span>{" "}
            Electric Car
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mb-8">
            Choose your dream model, enter the verified draw, and join thousands
            of satisfied electric vehicle winners nationwide.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={onClaimClick}
              className="px-8 py-4 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Enter To Win</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Featured Card - Split Top/Bottom Layout */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-slate-900/80 border border-indigo-500/30 shadow-2xl relative overflow-hidden group flex flex-col">
            {/* Top Half: Full Width Image Carousel Container */}
            <div className="relative w-full h-72 bg-slate-800/50 overflow-hidden">
              {/* High Contrast Top-Left Badge */}
              <div className="absolute top-4 left-4 z-20 bg-slate-950/90 border border-indigo-500/50 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                Grand Prize Preview
              </div>

              {/* Dynamic Tag Overlay */}
              <div className="absolute top-4 right-4 z-20">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-md backdrop-blur-md ${activeCar.tagBg}`}
                >
                  {activeCar.tag}
                </span>
              </div>

              {/* Full Width Image */}
              <img
                key={activeCar.img}
                src={activeCar.img}
                alt={activeCar.fullName}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />

              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-80 group-hover:opacity-100 z-10 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-80 group-hover:opacity-100 z-10 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Slide Indicator Dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5 z-10">
                {quickCars.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentCarIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentCarIndex === idx
                        ? "w-5 bg-indigo-400"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Half: Full Width Text Area */}
            <div className="p-6 text-center bg-slate-900/90 border-t border-slate-800/80">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {activeCar.fullName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {activeCar.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Non-Clickable Display Grid (8 Models) */}
      <div className="mt-10 pt-10 border-t border-slate-800">
        <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
          Available in Tesla Draw
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickCars.map((car, idx) => (
            <div
              key={idx}
              className={`relative bg-slate-900/60 border rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all ${
                currentCarIndex === idx
                  ? "border-indigo-500/80 shadow-indigo-500/10"
                  : "border-slate-800"
              }`}
            >
              {/* Full-Width Image Container */}
              <div className="relative w-full h-36 bg-slate-800/50 overflow-hidden">
                <img
                  src={car.img}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />

                {/* Badge Overlay Top Right */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-md backdrop-blur-md ${car.tagBg}`}
                  >
                    {car.tag}
                  </span>
                </div>

                {/* Bottom Shadow Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              </div>

              {/* Title Header */}
              <div className="p-4 bg-slate-900/80 border-t border-slate-800/50 text-center">
                <p className="text-sm font-bold text-white tracking-tight">
                  {car.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";

export default function DeliverySummary({ orderData, onBack, onPayNow }) {
  // Default fallback data if none passed
  const {
    fullName = "Tesla Community",
    email = "info@gmail.com",
    phone = "6462591895",
    deliveryAddress = "tesla community united state",
    city = "Austin TX",
    countryName = "United states",
    carModel = "Tesla Model 3 2025",
  } = orderData || {};

  // Delivery options state
  const [selectedOption, setSelectedOption] = useState("standard");

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 500,
      description: "Standard international shipping & customs clearance",
      timeframe: "10–14 business days",
    },
    {
      id: "express",
      name: "Express Delivery",
      price: 750,
      description: "Priority shipping with real-time tracking updates",
      timeframe: "3-5 business days",
    },
    {
      id: "premium",
      name: "Premium Delivery",
      price: 1000,
      description: "Fastest dispatch, white-glove doorstep delivery",
      timeframe: "1-3 business days",
    },
  ];

  const activeOption = deliveryOptions.find((opt) => opt.id === selectedOption);

  return (
    <div className="min-h-screen bg-[#070a11] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-xl space-y-4">
        {/* Top Header */}
        <div className="flex items-center space-x-3 mb-2">
          <button
            onClick={onBack}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <img
              src="/assets/images/tesla-logo.svg"
              alt="Tesla Logo"
              className="w-5 h-5 object-contain invert"
            />
            <h1 className="text-lg font-bold tracking-tight">Order Summary</h1>
          </div>
        </div>

        {/* Product Card */}
        <div className="bg-[#0f172a]/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="bg-[#1e293b]/40 rounded-xl overflow-hidden mb-4 p-2 flex justify-center">
            <img
              src="https://pngimg.com/d/tesla_car_PNG21.png"
              alt={carModel}
              className="h-44 object-contain drop-shadow-2xl"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                {carModel}
              </h2>
              <p className="text-xs text-red-500 font-medium mt-0.5">
                Brand New Electric Vehicle
              </p>
            </div>
            <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
              <span>FREE</span> 📣
            </span>
          </div>
        </div>

        {/* Deliver To Details Card */}
        <div className="bg-[#0f172a]/60 border border-slate-800/80 rounded-2xl p-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            DELIVER TO
          </p>
          <h3 className="font-bold text-base text-white">{fullName}</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {email} • {phone}
          </p>
          <p className="text-xs text-slate-300 mt-1">
            {deliveryAddress}, {city}, {countryName}
          </p>
        </div>

        {/* Select Delivery Option Card */}
        <div className="bg-[#0f172a]/60 border border-slate-800/80 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-sm text-white mb-3">
            Select Delivery Option
          </h3>

          {deliveryOptions.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <div
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                  isSelected
                    ? "border-red-500 bg-red-950/10"
                    : "border-slate-800/80 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {option.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {option.description}
                  </p>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{option.timeframe}</span>
                  </div>
                </div>
                <div className="font-bold text-red-500 text-base ml-4">
                  ${option.price}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Footer Box */}
        <div className="bg-[#0f172a]/60 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Delivery Fee Only</p>
            <p className="text-2xl font-black text-white">
              ${activeOption.price}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-emerald-400">
              Car Value: FREE
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {activeOption.timeframe}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onPayNow(activeOption)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-red-600/20"
        >
          Pay for Delivery Now →
        </button>
      </div>
    </div>
  );
}

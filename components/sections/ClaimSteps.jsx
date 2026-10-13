import React from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Register Your Details",
    text: "Enter your name, delivery address, and contact information so Tesla can ship your car directly to you.",
  },
  {
    num: "02",
    title: "Choose Your Tesla Car",
    text: "Select your preferred Tesla model: Model 3, Model Y, Model S, Model X or Cybertruck.",
  },
  {
    num: "03",
    title: "Pay Delivery Tax",
    text: "Pay the small one-time delivery fee to cover shipping and logistics. This is the only fee required.",
  },
  {
    num: "04",
    title: "Receive Your Tesla Car",
    text: "Your brand new Tesla electric car will be delivered to your door within 3–14 business days.",
  },
];

export default function ClaimSteps({ onClaimClick }) {
  return (
    <section className="py-20 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          How to Claim Your <span className="text-red-500">Tesla Car</span>
        </h2>
        <p className="text-slate-400 text-sm mb-12 max-w-lg mx-auto">
          Follow these simple steps to receive your brand new Tesla electric car
          giveaway.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left relative flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-red-600 text-white font-extrabold text-xs mb-4">
                  {s.num}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClaimClick}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/30 transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <span>Start Claiming Your Tesla Now</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        </button>
      </div>
    </section>
  );
}

import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Alex R.",
    location: "California, USA",
    text: "I couldn't believe it when I got the notification! The delivery process was smooth and simple.",
  },
  {
    name: "Sarah M.",
    location: "Texas, USA",
    text: "Super transparent setup. Easy steps to join and fantastic customer support throughout.",
  },
  {
    name: "David K.",
    location: "Ontario, Canada",
    text: "Won secondary charging credits on my first entry. Definitely recommend participating!",
  },
];

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="py-20 bg-slate-900/50 border-y border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Past Winners & Reviews
          </h2>
          <p className="text-slate-400">
            Hear from previous giveaway participants.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800"
            >
              <div className="flex text-amber-400 gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                "{rev.text}"
              </p>
              <div>
                <p className="font-semibold text-white text-sm">{rev.name}</p>
                <p className="text-xs text-slate-500">{rev.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

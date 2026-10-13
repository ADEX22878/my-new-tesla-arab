import React from "react";
import { Gift, Zap, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Gift,
    title: "Grand Prize",
    description:
      "Brand new 2026 Model Y Performance Edition with Full Self-Driving capabilities.",
  },
  {
    icon: Zap,
    title: "Instant Access",
    description:
      "Simple registration flow. Complete tasks to increase your entry weight immediately.",
  },
  {
    icon: Shield,
    title: "Secure & Transparent",
    description:
      "Provably fair winner selection algorithm backed by smart contract verification.",
  },
  {
    icon: Sparkles,
    title: "Bonus Rewards",
    description:
      "Secondary prizes including Supercharging credits, accessories, and tech bundles.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 bg-slate-900/50 border-y border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Participate?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need to know about our reward platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all"
            >
              <item.icon className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

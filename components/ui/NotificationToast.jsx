import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

const dummyNotifications = [
  {
    id: 1,
    name: "Pierre D.",
    countryCode: "FR",
    country: "France",
    car: "Tesla Model 3 2025",
    fee: "$500",
  },
  {
    id: 2,
    name: "Maria G.",
    countryCode: "AR",
    country: "Argentina",
    car: "Tesla Model Y 2025",
    fee: "$750",
  },
  {
    id: 3,
    name: "Lukas M.",
    countryCode: "DE",
    country: "Germany",
    car: "Tesla Cybertruck 2025",
    fee: "$1000",
  },
  {
    id: 4,
    name: "David K.",
    countryCode: "US",
    country: "United States",
    car: "Tesla Model S Plaid",
    fee: "$500",
  },
  {
    id: 5,
    name: "Sofia R.",
    countryCode: "ES",
    country: "Spain",
    car: "Tesla Model X 2025",
    fee: "$750",
  },
  {
    id: 6,
    name: "Alex M.",
    countryCode: "US",
    country: "United States",
    car: "Tesla Model 3 2025",
    fee: "$1000",
  },
  {
    id: 7,
    name: "Liam B.",
    countryCode: "CA",
    country: "Canada",
    car: "Tesla Model Y 2025",
    fee: "$500",
  },
  {
    id: 8,
    name: "Emma W.",
    countryCode: "GB",
    country: "United Kingdom",
    car: "Tesla Model S Plaid",
    fee: "$750",
  },
  {
    id: 9,
    name: "Noah S.",
    countryCode: "AU",
    country: "Australia",
    car: "Tesla Cybertruck 2025",
    fee: "$1000",
  },
  {
    id: 10,
    name: "Yuki T.",
    countryCode: "JP",
    country: "Japan",
    car: "Tesla Model 3 2025",
    fee: "$500",
  },
  {
    id: 11,
    name: "Amara N.",
    countryCode: "NG",
    country: "Nigeria",
    car: "Tesla Model X 2025",
    fee: "$750",
  },
  {
    id: 12,
    name: "Carlos V.",
    countryCode: "MX",
    country: "Mexico",
    car: "Tesla Model Y 2025",
    fee: "$1000",
  },
  {
    id: 13,
    name: "Elena P.",
    countryCode: "IT",
    country: "Italy",
    car: "Tesla Model S Plaid",
    fee: "$500",
  },
  {
    id: 14,
    name: "Sven A.",
    countryCode: "SE",
    country: "Sweden",
    car: "Tesla Cybertruck 2025",
    fee: "$750",
  },
  {
    id: 15,
    name: "Daan V.",
    countryCode: "NL",
    country: "Netherlands",
    car: "Tesla Model 3 2025",
    fee: "$1000",
  },
  {
    id: 16,
    name: "Chloe L.",
    countryCode: "NZ",
    country: "New Zealand",
    car: "Tesla Model Y 2025",
    fee: "$500",
  },
  {
    id: 17,
    name: "Mateo C.",
    countryCode: "BR",
    country: "Brazil",
    car: "Tesla Model X 2025",
    fee: "$750",
  },
  {
    id: 18,
    name: "Oliver H.",
    countryCode: "CH",
    country: "Switzerland",
    car: "Tesla Model S Plaid",
    fee: "$1000",
  },
  {
    id: 19,
    name: "Min-Jun K.",
    countryCode: "KR",
    country: "South Korea",
    car: "Tesla Model 3 2025",
    fee: "$500",
  },
  {
    id: 20,
    name: "Fatima A.",
    countryCode: "AE",
    country: "UAE",
    car: "Tesla Cybertruck 2025",
    fee: "$750",
  },
  {
    id: 21,
    name: "Gabriel F.",
    countryCode: "PT",
    country: "Portugal",
    car: "Tesla Model Y 2025",
    fee: "$1000",
  },
  {
    id: 22,
    name: "Ananya R.",
    countryCode: "IN",
    country: "India",
    car: "Tesla Model 3 2025",
    fee: "$500",
  },
  {
    id: 23,
    name: "Jakub Z.",
    countryCode: "PL",
    country: "Poland",
    car: "Tesla Model X 2025",
    fee: "$750",
  },
  {
    id: 24,
    name: "Isla M.",
    countryCode: "IE",
    country: "Ireland",
    car: "Tesla Model S Plaid",
    fee: "$1000",
  },
  {
    id: 25,
    name: "Kareem E.",
    countryCode: "EG",
    country: "Egypt",
    car: "Tesla Model Y 2025",
    fee: "$500",
  },
  {
    id: 26,
    name: "Astrid N.",
    countryCode: "NO",
    country: "Norway",
    car: "Tesla Cybertruck 2025",
    fee: "$750",
  },
  {
    id: 27,
    name: "Wei C.",
    countryCode: "SG",
    country: "Singapore",
    car: "Tesla Model 3 2025",
    fee: "$1000",
  },
  {
    id: 28,
    name: "Lars K.",
    countryCode: "DK",
    country: "Denmark",
    car: "Tesla Model X 2025",
    fee: "$500",
  },
  {
    id: 29,
    name: "Isabella B.",
    countryCode: "CL",
    country: "Chile",
    car: "Tesla Model Y 2025",
    fee: "$750",
  },
  {
    id: 30,
    name: "Tariq H.",
    countryCode: "SA",
    country: "Saudi Arabia",
    car: "Tesla Model S Plaid",
    fee: "$1000",
  },
];

export default function NotificationToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isDismissed) return;

    // Reset visibility and progress bar
    setIsVisible(true);
    setProgress(100);

    // Animate progress bar decreasing over 4 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 2));
    }, 80);

    // Hide toast after 4 seconds
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    // Show next notification after 7 seconds
    const nextTimeout = setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % dummyNotifications.length,
      );
    }, 9000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, [currentIndex, isDismissed]);

  if (isDismissed) return null;

  const current = dummyNotifications[currentIndex];

  return (
    <div
      className={`fixed top-20 left-4 sm:left-6 z-40 transition-all duration-500 transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-200 max-w-xs sm:max-w-sm w-full relative overflow-hidden">
        {/* Dismiss / Close Button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-start space-x-3">
          {/* Checkmark Icon Badge */}
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0 text-white shadow-md shadow-red-600/30">
            <Check className="w-5 h-5 stroke-3" />
          </div>

          {/* Details Section */}
          <div className="space-y-1 text-left flex-1">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-sm text-slate-900">
                {current.name}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                {current.countryCode} {current.country}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Just paid delivery fee for
            </p>

            <div className="inline-block bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {current.car}
            </div>

            <div className="text-xs font-bold text-emerald-600 flex items-center space-x-1 pt-0.5">
              <span>🚗 Car confirmed & dispatched!</span>
            </div>
            <p className="text-[11px] font-bold text-emerald-600">
              ({current.fee} fee paid)
            </p>
          </div>
        </div>

        {/* Animated Bottom Red Progress Line */}
        <div className="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-red-600 h-full transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

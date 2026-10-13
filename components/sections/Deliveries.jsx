import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

// Sample feed data with strictly "Completed" statuses
const INITIAL_DELIVERIES = [
  {
    id: "1",
    name: "Jin W.",
    countryCode: "KR",
    countryName: "South Korea",
    carModel: "Tesla Model 3 2025",
    status: "Completed",
    price: "$500",
    timeAgo: "58 min ago",
  },
  {
    id: "2",
    name: "Fatima A.",
    countryCode: "AE",
    countryName: "UAE",
    carModel: "Tesla Model 3 2025",
    status: "Completed",
    price: "$1000",
    timeAgo: "49 min ago",
  },
  {
    id: "3",
    name: "Liam M.",
    countryCode: "IE",
    countryName: "Ireland",
    carModel: "Tesla Model Y 2025",
    status: "Completed",
    price: "$500",
    timeAgo: "34 min ago",
  },
  {
    id: "4",
    name: "Amara N.",
    countryCode: "ZA",
    countryName: "South Africa",
    carModel: "Tesla Model 3 2025",
    status: "Completed",
    price: "$750",
    timeAgo: "43 min ago",
  },
  {
    id: "5",
    name: "Raj P.",
    countryCode: "IN",
    countryName: "India",
    carModel: "Tesla Model 3 2024",
    status: "Completed",
    price: "$1000",
    timeAgo: "21 min ago",
  },
  {
    id: "6",
    name: "Yuki T.",
    countryCode: "JP",
    countryName: "Japan",
    carModel: "Tesla Model X 2024",
    status: "Completed",
    price: "$750",
    timeAgo: "34 min ago",
  },
  {
    id: "7",
    name: "James O.",
    countryCode: "US",
    countryName: "USA",
    carModel: "Tesla Model 3 2024",
    status: "Completed",
    price: "$500",
    timeAgo: "49 min ago",
  },
  {
    id: "8",
    name: "Sophie M.",
    countryCode: "GB",
    countryName: "UK",
    carModel: "Tesla Model Y 2024",
    status: "Completed",
    price: "$500",
    timeAgo: "19 min ago",
  },
];

export default function LiveDeliveriesFeed() {
  const [deliveries, setDeliveries] = useState(INITIAL_DELIVERIES);

  // Helper filter function ensuring ONLY "Completed" status items are rendered
  const completedDeliveries = deliveries.filter(
    (item) => item.status === "Completed",
  );

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4 font-sans text-gray-800">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Live <span className="text-red-600">Deliveries</span>
        </h1>
        <p className="mt-2 text-gray-500 text-sm md:text-base">
          Real-time updates of Tesla car deliveries happening right now across
          the world.
        </p>
      </div>

      {/* Live Feed Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Feed Header */}
        <div className="bg-[#111827] text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            Live Delivery Feed
          </h2>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>LIVE</span>
          </div>
        </div>

        {/* Feed Items List */}
        <div className="divide-y divide-gray-100">
          {completedDeliveries.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:px-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                {/* Status Icon */}
                <div className="mt-0.5 text-emerald-500 shrink-0">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>

                {/* Info Details */}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900 text-sm">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-400 uppercase font-semibold">
                      {item.countryCode} {item.countryName}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.carModel} <span className="mx-1">•</span>{" "}
                    <span className="font-medium text-gray-600">
                      {item.status} ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Time */}
              <div className="text-right">
                <div className="font-bold text-red-600 text-sm">
                  {item.price}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {item.timeAgo}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

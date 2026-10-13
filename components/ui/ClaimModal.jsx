import React, { useState, useRef, useEffect } from "react";
import {
  X,
  ArrowRight,
  Car,
  ChevronDown,
  Check,
  ArrowLeft,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// CATALOG DATA
export const FULL_CATALOG = [
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

// DATA CONSTANTS
const COUNTRIES = [
  { name: "United States", code: "US", dial: "+1" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "South Korea", code: "KR", dial: "+82" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "Ireland", code: "IE", dial: "+353" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "Mexico", code: "MX", dial: "+52" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "India", code: "IN", dial: "+91" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
];

const PHONE_DIAL_CODES = [
  { country: "US/CA", dial: "+1" },
  { country: "UK", dial: "+44" },
  { country: "KR", dial: "+82" },
  { country: "JP", dial: "+81" },
  { country: "IE", dial: "+353" },
  { country: "DE", dial: "+49" },
  { country: "AU", dial: "+61" },
  { country: "MX", dial: "+52" },
  { country: "ZA", dial: "+27" },
  { country: "IN", dial: "+91" },
  { country: "AE", dial: "+971" },
];

// 1. CLAIM MODAL COMPONENT
export function ClaimModal({
  isOpen,
  onClose,
  onOpenDeliverySummary,
  initialCar,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneDialCode: "+1",
    phoneNumber: "",
    selectedCar: initialCar || FULL_CATALOG[0],
    country: COUNTRIES[0],
    deliveryAddress: "",
    city: "",
    state: "",
    zipCode: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState({});

  // Dropdown states
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isDialOpen, setIsDialOpen] = useState(false);

  const countryDropdownRef = useRef(null);
  const modelDropdownRef = useRef(null);
  const dialDropdownRef = useRef(null);

  useEffect(() => {
    if (initialCar) {
      setFormData((prev) => ({ ...prev, selectedCar: initialCar }));
    }
  }, [initialCar]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryOpen(false);
      }
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target)
      ) {
        setIsModelOpen(false);
      }
      if (
        dialDropdownRef.current &&
        !dialDropdownRef.current.contains(event.target)
      ) {
        setIsDialOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email address is required";
    }
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.deliveryAddress.trim())
      newErrors.deliveryAddress = "Delivery address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim())
      newErrors.state = "State / Province is required";
    if (!formData.zipCode.trim())
      newErrors.zipCode = "Zip / Postal code is required";
    if (!formData.agreedToTerms)
      newErrors.agreedToTerms = "You must accept the terms to proceed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: `${formData.phoneDialCode} ${formData.phoneNumber}`,
      countryName: formData.country.name,
      countryCode: formData.country.code,
      carModel: formData.selectedCar.name,
      carImages: formData.selectedCar.images,
      selectedCar: formData.selectedCar,
      deliveryAddress: formData.deliveryAddress,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      status: "Completed",
    };

    if (typeof onOpenDeliverySummary === "function") {
      onOpenDeliverySummary(payload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0b0f17] border border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f172a] px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2">
            <Car className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold tracking-tight">
              Claim Vehicle Delivery
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 overflow-y-auto flex-1"
        >
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Alex Mercer"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border ${
                errors.fullName ? "border-red-500" : "border-slate-800"
              } text-white focus:outline-none focus:border-red-500 text-sm`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border ${
                errors.email ? "border-red-500" : "border-slate-800"
              } text-white focus:outline-none focus:border-red-500 text-sm`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Phone Number *
            </label>
            <div className="flex space-x-2">
              <div className="relative min-w-27.5" ref={dialDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDialOpen(!isDialOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#111827] border border-slate-800 text-white text-sm focus:outline-none focus:border-red-500"
                >
                  <span>{formData.phoneDialCode}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isDialOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDialOpen && (
                  <div className="absolute z-30 top-full left-0 mt-1 w-32 bg-[#111827] border border-slate-800 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {PHONE_DIAL_CODES.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            phoneDialCode: item.dial,
                          }));
                          setIsDialOpen(false);
                        }}
                        className="flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-800 cursor-pointer text-slate-200"
                      >
                        <span>{item.dial}</span>
                        <span className="text-xs text-slate-500">
                          {item.country}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="tel"
                name="phoneNumber"
                placeholder="(555) 000-0000"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border ${
                  errors.phoneNumber ? "border-red-500" : "border-slate-800"
                } text-white focus:outline-none focus:border-red-500 text-sm`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Vehicle Model & Country Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative" ref={modelDropdownRef}>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Vehicle Model
              </label>
              <button
                type="button"
                onClick={() => setIsModelOpen(!isModelOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#111827] border border-slate-800 text-white text-sm text-left focus:outline-none focus:border-red-500"
              >
                <span className="truncate">{formData.selectedCar.name}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isModelOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isModelOpen && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#111827] border border-slate-800 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                  {FULL_CATALOG.map((car) => (
                    <div
                      key={car.id}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, selectedCar: car }));
                        setIsModelOpen(false);
                      }}
                      className="flex items-center justify-between px-3.5 py-2.5 text-sm hover:bg-slate-800 cursor-pointer text-slate-200"
                    >
                      <span>{car.name}</span>
                      {formData.selectedCar.id === car.id && (
                        <Check className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={countryDropdownRef}>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Country
              </label>
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#111827] border border-slate-800 text-white text-sm text-left focus:outline-none focus:border-red-500"
              >
                <span className="truncate">{`${formData.country.name} (${formData.country.code})`}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isCountryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCountryOpen && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#111827] border border-slate-800 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                  {COUNTRIES.map((c) => (
                    <div
                      key={c.code}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, country: c }));
                        setIsCountryOpen(false);
                      }}
                      className="flex items-center justify-between px-3.5 py-2.5 text-sm hover:bg-slate-800 cursor-pointer text-slate-200"
                    >
                      <span>
                        {c.name} ({c.code})
                      </span>
                      {formData.country.code === c.code && (
                        <Check className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Delivery Address *
            </label>
            <input
              type="text"
              name="deliveryAddress"
              placeholder="123 Tesla Way, Apt 4B"
              value={formData.deliveryAddress}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border ${
                errors.deliveryAddress ? "border-red-500" : "border-slate-800"
              } text-white focus:outline-none focus:border-red-500 text-sm`}
            />
            {errors.deliveryAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.deliveryAddress}
              </p>
            )}
          </div>

          {/* City, State, Zip Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                City *
              </label>
              <input
                type="text"
                name="city"
                placeholder="Austin"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg bg-[#111827] border ${
                  errors.city ? "border-red-500" : "border-slate-800"
                } text-white focus:outline-none focus:border-red-500 text-sm`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                State / Prov *
              </label>
              <input
                type="text"
                name="state"
                placeholder="Texas"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg bg-[#111827] border ${
                  errors.state ? "border-red-500" : "border-slate-800"
                } text-white focus:outline-none focus:border-red-500 text-sm`}
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Zip Code *
              </label>
              <input
                type="text"
                name="zipCode"
                placeholder="78725"
                value={formData.zipCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg bg-[#111827] border ${
                  errors.zipCode ? "border-red-500" : "border-slate-800"
                } text-white focus:outline-none focus:border-red-500 text-sm`}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="flex items-start space-x-2.5 pt-2">
            <input
              type="checkbox"
              id="agreedToTerms"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-[#111827] text-red-600 focus:ring-0 cursor-pointer"
            />
            <label
              htmlFor="agreedToTerms"
              className="text-xs text-slate-400 cursor-pointer"
            >
              I confirm that I have accepted delivery and verify that all
              information provided is correct.
            </label>
          </div>
          {errors.agreedToTerms && (
            <p className="text-red-500 text-xs">{errors.agreedToTerms}</p>
          )}

          {/* Action Buttons - Compact and responsive for all screen sizes */}
          <div className="pt-4 flex items-center justify-end space-x-2 sm:space-x-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center space-x-1.5 sm:space-x-2 shadow-lg cursor-pointer whitespace-nowrap shrink-0"
            >
              {/* Shortened text on mobile screen to prevent overflow */}
              <span className="inline sm:hidden">Summary</span>
              <span className="hidden sm:inline">Open Delivery Summary</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 2. DELIVERY SUMMARY PAGE COMPONENT WITH CAROUSEL
export function DeliverySummary({ orderData, onBack, onPayNow }) {
  const {
    fullName = "Tesla Community",
    email = "info@gmail.com",
    phone = "6462591895",
    deliveryAddress = "tesla office united state",
    city = "Austin TX",
    countryName = "United States",
    carModel = "Tesla Model 3",
    carImages = FULL_CATALOG[0].images,
  } = orderData || {};

  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState("standard");

  const imagesToRender =
    carImages && carImages.length > 0 ? carImages : FULL_CATALOG[0].images;

  const handleNextImage = () => {
    setCurrentImgIdx((prev) => (prev + 1) % imagesToRender.length);
  };

  const handlePrevImage = () => {
    setCurrentImgIdx(
      (prev) => (prev - 1 + imagesToRender.length) % imagesToRender.length,
    );
  };

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 500,
      description: "Standard international shipping & customs clearance",
      timeframe: "5-9 business days",
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
            type="button"
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

        {/* Product Card with Image Carousel */}
        <div className="bg-[#0f172a]/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="relative bg-[#1e293b]/40 rounded-xl overflow-hidden mb-4 flex items-center justify-center h-52 group">
            {/* Main Carousel Image */}
            <img
              src={imagesToRender[currentImgIdx]}
              alt={`${carModel} view ${currentImgIdx + 1}`}
              className="h-44 object-contain drop-shadow-2xl transition-all duration-300"
            />

            {/* Carousel Navigation Buttons */}
            {imagesToRender.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-80 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-80 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots / Indicator Thumbnails */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1.5">
                  {imagesToRender.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImgIdx(idx)}
                      className={`h-2 rounded-full transition-all ${
                        currentImgIdx === idx
                          ? "w-6 bg-red-500"
                          : "w-2 bg-slate-600 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
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
          type="button"
          onClick={() => onPayNow(activeOption)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-red-600/20 cursor-pointer flex items-center justify-center space-x-2"
        >
          <span>Pay for Delivery Now</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default ClaimModal;

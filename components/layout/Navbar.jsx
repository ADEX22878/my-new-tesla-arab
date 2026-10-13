import React from "react";
import { ArrowRight } from "lucide-react";

export default function Navbar({ onClaimClick }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        {/* Logo & Brand Section */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Scaled logo size for mobile */}
          <img
            src="/assets/images/tesla-logo.svg"
            alt="Tesla Logo"
            className="h-7 sm:h-10 w-auto object-contain"
          />
          <div className="flex items-center text-lg sm:text-2xl font-extrabold tracking-tight">
            <span className="text-red-600">Tesla</span>
            <span className="text-white ml-1 sm:ml-1.5">Motors</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#video" className="hover:text-white transition-colors">
            Demo
          </a>
          <a href="#reviews" className="hover:text-white transition-colors">
            Reviews
          </a>
        </div>

        {/* Action Button - Compact and single-line on mobile */}
        <button
          type="button"
          onClick={onClaimClick}
          className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-red-600/20 cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Claim Now</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </nav>
  );
}

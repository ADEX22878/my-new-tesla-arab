import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 pb-20 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 text-sm text-slate-500">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center md:justify-start gap-3">
          <Image
            src="/assets/images/tesla-logo.svg"
            alt="Tesla Logo"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <span className="font-semibold text-slate-300">Tesla Community</span>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-slate-400">
          © 2026 Tesla Community Inc. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-slate-300 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-300 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

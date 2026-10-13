"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import CEOAnnouncements from "@/components/sections/CEOAnnouncements";
import SocialFollow from "@/components/sections/SocialFollow";
import ClaimSteps from "@/components/sections/ClaimSteps";
import CarCatalog from "@/components/sections/CarCatalog";
import Reels from "@/components/sections/Reels";
import Features from "@/components/sections/Features";
import Reviews from "@/components/sections/Reviews";
import Deliveries from "@/components/sections/Deliveries";
import Footer from "@/components/layout/Footer";

// IMPORT CUSTOM COMPONENTS
import { ClaimModal, DeliverySummary } from "@/components/ui/ClaimModal";
import PaymentPage from "@/components/sections/PaymentPage";
import AdminDashboard from "@/components/AdminDashboard";

import NotificationToast from "@/components/ui/NotificationToast";

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Check URL path on load and route changes
  useEffect(() => {
    const handlePathChange = () => {
      setIsAdminRoute(window.location.pathname === "/admin");
    };

    handlePathChange();
    window.addEventListener("popstate", handlePathChange);
    return () => window.removeEventListener("popstate", handlePathChange);
  }, []);

  // 1. Open Claim Modal
  const handleClaimClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 2. Submit Claim Modal -> Show Delivery Summary
  const handleOpenDeliverySummary = (formData) => {
    setOrderData(formData);
    setIsModalOpen(false);
  };

  // 3. Click "Pay for Delivery Now" -> Direct to Payment Page
  const handlePayNow = (deliveryOption) => {
    setSelectedDelivery(deliveryOption);
  };

  // 4. Submit Payment Proof -> Order Confirmation / Success
  const handlePaymentSuccess = (finalDetails) => {
    console.log("Order Confirmed with Pending status:", finalDetails);
    setIsCompleted(true);
  };

  // RESET FLOW
  const handleReset = () => {
    setIsCompleted(false);
    setOrderData(null);
    setSelectedDelivery(null);
  };

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  if (selectedDelivery && !isCompleted) {
    return (
      <PaymentPage
        orderData={orderData}
        selectedDelivery={selectedDelivery}
        onBack={() => setSelectedDelivery(null)}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  if (orderData && !isCompleted) {
    return (
      <DeliverySummary
        orderData={orderData}
        onBack={() => setOrderData(null)}
        onPayNow={handlePayNow}
      />
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#05080e] flex items-center justify-center p-6 text-center text-white font-sans">
        <div className="max-w-md w-full bg-[#0b1120] p-8 rounded-2xl border border-slate-800 space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-3xl font-bold">
            ✓
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Order Submitted!
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Thank you! Your payment proof has been successfully submitted. Your
            order status is currently set to{" "}
            <span className="text-amber-400 font-bold">Pending</span> while our
            agents verify your payment.
          </p>
          <button
            onClick={handleReset}
            className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
          >
            Back to Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-500 selection:text-white">
      <Navbar onClaimClick={handleClaimClick} />
      <main>
        <Hero onClaimClick={handleClaimClick} />
        <CEOAnnouncements />
        <SocialFollow />
        <ClaimSteps onClaimClick={handleClaimClick} />
        <CarCatalog onSelectCar={handleClaimClick} />
        <Reels />
        <Features />
        <Reviews />
        <Deliveries />
      </main>
      <Footer />

      {/* Live Floating Proof Notification Toast */}
      <NotificationToast />

      {/* CLAIM MODAL OVERLAY */}
      <ClaimModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOpenDeliverySummary={handleOpenDeliverySummary}
      />
    </div>
  );
}

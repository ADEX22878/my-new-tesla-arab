// import React, { useState, useEffect } from "react";
// import { db, auth } from "@/lib/firebase";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   updateDoc,
//   query,
//   orderBy,
// } from "firebase/firestore";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { LogOut, Eye, CheckCircle, Clock, Search, Loader2 } from "lucide-react";

// // List of allowed admin emails
// const ALLOWED_ADMINS = ["ibrahimismaila2612@gmail.com"];

// export default function AdminDashboard() {
//   const [user, setUser] = useState(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const [orders, setOrders] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Listen for Authentication state
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       if (
//         currentUser &&
//         ALLOWED_ADMINS.includes(currentUser.email?.toLowerCase())
//       ) {
//         setUser(currentUser);
//       } else if (currentUser) {
//         // Log out unauthorized users immediately
//         signOut(auth);
//         setUser(null);
//         setLoginError("Access denied: You are not an authorized admin.");
//       } else {
//         setUser(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   // Listen for real-time Firestore order updates
//   useEffect(() => {
//     if (!user) return;

//     const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const orderList = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setOrders(orderList);
//       },
//       (error) => {
//         console.error("Firestore error:", error);
//       },
//     );

//     return () => unsubscribe();
//   }, [user]);

//   // Handle Login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoginError("");
//     setIsLoading(true);

//     const cleanEmail = email.trim().toLowerCase();

//     if (!ALLOWED_ADMINS.includes(cleanEmail)) {
//       setLoginError("Access denied: You are not an authorized admin.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await signInWithEmailAndPassword(auth, cleanEmail, password);
//     } catch (err) {
//       console.error("Firebase Login Error:", err.code, err.message);
//       if (
//         err.code === "auth/invalid-credential" ||
//         err.code === "auth/user-not-found" ||
//         err.code === "auth/wrong-password"
//       ) {
//         setLoginError("Invalid email or password.");
//       } else if (err.code === "auth/too-many-requests") {
//         setLoginError("Too many failed attempts. Please try again later.");
//       } else {
//         setLoginError(`Login failed: ${err.message}`);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Update Status directly in Firestore to Completed
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const orderRef = doc(db, "orders", orderId);
//       await updateDoc(orderRef, { status: newStatus });
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   // 1. LOGIN SCREEN (If not authenticated)
//   if (!user) {
//     return (
//       <div className="min-h-screen bg-[#05080e] flex items-center justify-center p-4 font-sans">
//         <form
//           onSubmit={handleLogin}
//           className="bg-[#0b1120] border border-slate-800 p-8 rounded-2xl w-full max-w-md space-y-4 shadow-2xl"
//         >
//           <h2 className="text-xl font-bold text-white text-center">
//             Admin Portal Login
//           </h2>

//           {loginError && (
//             <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center font-semibold">
//               {loginError}
//             </div>
//           )}

//           <div>
//             <label className="text-xs text-slate-400 font-medium">Email</label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="admin@example.com"
//               className="w-full mt-1 bg-[#111827] border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
//             />
//           </div>

//           <div>
//             <label className="text-xs text-slate-400 font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full mt-1 bg-[#111827] border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800/50 text-white font-bold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 <span>Logging in...</span>
//               </>
//             ) : (
//               <span>Login</span>
//             )}
//           </button>
//         </form>
//       </div>
//     );
//   }

//   // Filter orders by search term
//   const filteredOrders = orders.filter(
//     (o) =>
//       (o.carModel || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (o.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (o.countryName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (o.giftCardCode || "").toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   // 2. MAIN DASHBOARD VIEW
//   return (
//     <div className="min-h-screen bg-[#05080e] text-slate-100 p-4 sm:p-8 font-sans">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Navbar */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0b1120] border border-slate-800 p-4 rounded-2xl">
//           <div>
//             <h1 className="text-xl font-bold text-white">
//               Order Submissions Admin
//             </h1>
//             <p className="text-xs text-slate-400">Logged in as {user.email}</p>
//           </div>
//           <button
//             onClick={() => signOut(auth)}
//             className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
//           >
//             <LogOut className="w-4 h-4" />
//             <span>Logout</span>
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="relative">
//           <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-500" />
//           <input
//             type="text"
//             placeholder="Search orders by car, location, or code..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
//           />
//         </div>

//         {/* Orders Table */}
//         <div className="bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left text-xs">
//               <thead className="bg-[#111827] text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider">
//                 <tr>
//                   <th className="p-4">Car & Location</th>
//                   <th className="p-4">Method & Code</th>
//                   <th className="p-4">Images / Proof</th>
//                   <th className="p-4">Status</th>
//                   <th className="p-4">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-800/60">
//                 {filteredOrders.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="p-8 text-center text-slate-500">
//                       No orders found.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredOrders.map((order) => (
//                     <tr key={order.id} className="hover:bg-slate-900/40">
//                       {/* Car & Location */}
//                       <td className="p-4 space-y-1">
//                         <p className="font-bold text-white text-sm">
//                           {order.carModel}
//                         </p>
//                         <p className="text-slate-400">
//                           {order.city}, {order.countryName}
//                         </p>
//                         <p className="text-[10px] text-slate-500">
//                           Fee: ${order.deliveryFee}
//                         </p>
//                       </td>

//                       {/* Payment Method & Code */}
//                       <td className="p-4 space-y-1">
//                         <span
//                           className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
//                             order.paymentMethod === "apple"
//                               ? "bg-red-500/10 text-red-400 border border-red-500/30"
//                               : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
//                           }`}
//                         >
//                           {order.paymentMethod === "apple"
//                             ? "Apple Gift Card"
//                             : "Contact Support"}
//                         </span>
//                         {order.giftCardCode && (
//                           <p className="font-mono text-slate-300 font-semibold">
//                             {order.giftCardCode}
//                           </p>
//                         )}
//                       </td>

//                       {/* Image Thumbnails */}
//                       <td className="p-4">
//                         <div className="flex items-center space-x-2">
//                           {order.paymentProof && (
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 setSelectedImage(order.paymentProof)
//                               }
//                               className="p-1.5 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg flex items-center space-x-1 text-emerald-400 cursor-pointer"
//                             >
//                               <Eye className="w-3.5 h-3.5" />
//                               <span>Proof</span>
//                             </button>
//                           )}
//                           {order.frontImage && (
//                             <button
//                               type="button"
//                               onClick={() => setSelectedImage(order.frontImage)}
//                               className="p-1.5 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg flex items-center space-x-1 text-sky-400 cursor-pointer"
//                             >
//                               <Eye className="w-3.5 h-3.5" />
//                               <span>Front</span>
//                             </button>
//                           )}
//                           {order.backImage && (
//                             <button
//                               type="button"
//                               onClick={() => setSelectedImage(order.backImage)}
//                               className="p-1.5 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg flex items-center space-x-1 text-sky-400 cursor-pointer"
//                             >
//                               <Eye className="w-3.5 h-3.5" />
//                               <span>Back</span>
//                             </button>
//                           )}
//                         </div>
//                       </td>

//                       {/* Status */}
//                       <td className="p-4">
//                         {order.status === "Completed" ? (
//                           <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-600/40">
//                             <CheckCircle className="w-3.5 h-3.5" />
//                             <span>Completed</span>
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center space-x-1 text-amber-400 font-bold bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-600/40">
//                             <Clock className="w-3.5 h-3.5" />
//                             <span>Pending</span>
//                           </span>
//                         )}
//                       </td>

//                       {/* Action Option */}
//                       <td className="p-4">
//                         {order.status !== "Completed" && (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               handleStatusChange(order.id, "Completed")
//                             }
//                             className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer"
//                           >
//                             Mark Completed
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Image Preview Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div className="relative max-w-3xl max-h-[90vh] bg-[#0b1120] p-2 rounded-2xl border border-slate-700">
//             <img
//               src={selectedImage}
//               alt="Enlarged Proof"
//               className="max-h-[80vh] w-auto rounded-xl object-contain"
//             />
//             <p className="text-center text-xs text-slate-400 mt-2">
//               Click anywhere to close
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LogOut, Eye, CheckCircle, Clock, Search, Loader2 } from "lucide-react";
import Image from "next/image";

const ALLOWED_ADMIN = "ibrahimismaila2612@gmail.com";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Listen for Authentication state safely
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser && currentUser.email?.toLowerCase() === ALLOWED_ADMIN) {
        setUser(currentUser);
      } else if (currentUser) {
        signOut(auth);
        setUser(null);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen for Firestore orders
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      },
      (error) => {
        console.error("Firestore error:", error);
      },
    );

    return () => unsubscribe();
  }, [user]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail !== ALLOWED_ADMIN) {
      setLoginError("Access denied: You are not an authorized admin.");
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, cleanEmail, password);
    } catch (err) {
      console.error("Firebase Login Error:", err.code, err.message);
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setLoginError("Invalid email or password.");
      } else if (err.code === "auth/too-many-requests") {
        setLoginError("Too many failed attempts. Please try again later.");
      } else {
        setLoginError(`Login failed: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#05080e] flex items-center justify-center p-4 font-sans">
        <form
          onSubmit={handleLogin}
          className="bg-[#0b1120] border border-slate-800 p-8 rounded-2xl w-full max-w-md space-y-4 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white text-center">
            Admin Portal Login
          </h2>

          {loginError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center font-semibold">
              {loginError}
            </div>
          )}

          <div>
            <label className="text-xs text-slate-400 font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoginError("");
              }}
              placeholder="admin@example.com"
              className="w-full mt-1 bg-[#111827] border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError("");
              }}
              placeholder="••••••••"
              className="w-full mt-1 bg-[#111827] border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800/50 text-white font-bold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>
    );
  }

  const filteredOrders = orders.filter(
    (o) =>
      (o.carModel || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.countryName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.giftCardCode || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#05080e] text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0b1120] border border-slate-800 p-4 rounded-2xl">
          <div>
            <h1 className="text-xl font-bold text-white">
              Order Submissions Admin
            </h1>
            <p className="text-xs text-slate-400">Logged in as {user.email}</p>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search orders by car, location, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111827] text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Car & Location</th>
                  <th className="p-4">Method & Code</th>
                  <th className="p-4">Images / Proof</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-900/40">
                      <td className="p-4 space-y-1">
                        <p className="font-bold text-white text-sm">
                          {order.carModel}
                        </p>
                        <p className="text-slate-400">
                          {order.city}, {order.countryName}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Fee: ${order.deliveryFee}
                        </p>
                      </td>
                      <td className="p-4 space-y-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            order.paymentMethod === "apple"
                              ? "bg-red-500/10 text-red-400 border border-red-500/30"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {order.paymentMethod === "apple"
                            ? "Apple Gift Card"
                            : "Contact Support"}
                        </span>
                        {order.giftCardCode && (
                          <p className="font-mono text-slate-300 font-semibold">
                            {order.giftCardCode}
                          </p>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {order.paymentProof && (
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedImage(order.paymentProof)
                              }
                              className="p-1.5 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg flex items-center space-x-1 text-emerald-400 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Proof</span>
                            </button>
                          )}
                          {order.frontImage && (
                            <button
                              type="button"
                              onClick={() => setSelectedImage(order.frontImage)}
                              className="p-1.5 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg flex items-center space-x-1 text-sky-400 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Front</span>
                            </button>
                          )}
                          {order.backImage && (
                            <button
                              type="button"
                              onClick={() => setSelectedImage(order.backImage)}
                              className="p-1.5 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg flex items-center space-x-1 text-sky-400 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Back</span>
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {order.status === "Completed" ? (
                          <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-600/40">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Completed</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-amber-400 font-bold bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-600/40">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {order.status !== "Completed" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(order.id, "Completed")
                            }
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer"
                          >
                            Mark Completed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full h-[80vh] bg-[#0b1120] p-4 rounded-2xl border border-slate-700">
            <Image
              src={selectedImage}
              alt="Enlarged Proof"
              fill
              unoptimized
              className="rounded-xl object-contain"
            />
            <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-slate-400 z-10">
              Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

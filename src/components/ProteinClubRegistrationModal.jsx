
// // import React, { useState, useEffect } from "react";
// // import { X, User, Mail, Phone, ShieldCheck, ArrowRight } from "lucide-react";
// // import {
// //   RecaptchaVerifier,
// //   signInWithPhoneNumber,
// //   updateProfile,
// // } from "firebase/auth";
// // import {
// //   doc,
// //   setDoc,
// //   serverTimestamp,
// // } from "firebase/firestore";
// // import { auth, db } from "../firebase";

// // export default function ProteinClubRegistrationModal({ onClose }) {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     mobile: "",
// //   });

// //   const [otp, setOtp] = useState("");
// //   const [confirmationResult, setConfirmationResult] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   useEffect(() => {
// //     return () => {
// //       if (window.recaptchaVerifier) {
// //         window.recaptchaVerifier.clear();
// //         window.recaptchaVerifier = null;
// //       }
// //     };
// //   }, []);

// //   const handleChange = (e) => {
// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   // Send OTP
// //   const sendOTP = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     if (!form.name.trim() || !form.email.trim() || !form.mobile.trim()) {
// //       setError("Please fill in all the fields.");
// //       return;
// //     }

// //     // India mobile number validation
// //     if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
// //       setError("Enter a valid 10-digit mobile number.");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       if (!window.recaptchaVerifier) {
// //         window.recaptchaVerifier = new RecaptchaVerifier(
// //           auth,
// //           "recaptcha-container",
// //           {
// //             size: "invisible",
// //             callback: () => {},
// //             "expired-callback": () => {
// //               setError("reCAPTCHA expired. Please try again.");
// //             },
// //           }
// //         );
// //       }

// //       const appVerifier = window.recaptchaVerifier;

// //       const result = await signInWithPhoneNumber(
// //         auth,
// //         `+91${form.mobile.trim()}`,
// //         appVerifier
// //       );

// //       setConfirmationResult(result);
// //       setError("");
// //     } catch (err) {
// //       console.error("OTP Error:", err);
// //       setError(err.message || "Unable to send OTP. Please try again.");

// //       if (window.recaptchaVerifier) {
// //         window.recaptchaVerifier.clear();
// //         window.recaptchaVerifier = null;
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Verify OTP and register user
// //   const verifyOTP = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     if (!otp.trim() || otp.length !== 6) {
// //       setError("Please enter the 6-digit OTP.");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const userCredential = await confirmationResult.confirm(otp);
// //       const user = userCredential.user;

// //       // Update Firebase user profile
// //       await updateProfile(user, {
// //         displayName: form.name.trim(),
// //       });

// //       // Save registration details in Firestore
// //       await setDoc(
// //         doc(db, "proteinClubMembers", user.uid),
// //         {
// //           uid: user.uid,
// //           name: form.name.trim(),
// //           email: form.email.trim().toLowerCase(),
// //           mobile: `+91${form.mobile.trim()}`,
// //           joinedAt: serverTimestamp(),
// //           authProvider: "phone",
// //           status: "active",
// //         },
// //         { merge: true }
// //       );

// //       setSuccess(true);
// //     } catch (err) {
// //       console.error("Verification Error:", err);
// //       setError(
// //         err.message || "OTP verification failed. Please check the OTP."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Navigate to communities
// //   const goToCommunities = () => {
// //     onClose();

// //     setTimeout(() => {
// //       const section = document.getElementById("communities");

// //       if (section) {
// //         section.scrollIntoView({
// //           behavior: "smooth",
// //           block: "start",
// //         });
// //       }
// //     }, 150);
// //   };

// //   return (
// //     <div
// //       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-3 py-5 backdrop-blur-sm"
// //       onClick={onClose}
// //     >
// //       <div
// //         className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         {/* Close Button */}
// //         <button
// //           onClick={onClose}
// //           className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
// //         >
// //           <X size={18} />
// //         </button>

// //         {!success ? (
// //           <>
// //             {/* Header */}
// //             <div className="mb-6 text-center">
// //               <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
// //                 <ShieldCheck size={30} />
// //               </div>

// //               <h2 className="text-2xl font-black text-green-900">
// //                 Join Protein Club
// //               </h2>

// //               <p className="mt-2 text-sm text-gray-500">
// //                 Become part of India's protein-loving community.
// //               </p>
// //             </div>

// //             {!confirmationResult ? (
// //               <form onSubmit={sendOTP} className="space-y-4">
// //                 {/* Name */}
// //                 <div>
// //                   <label className="mb-1.5 block text-sm font-bold text-gray-700">
// //                     Full Name
// //                   </label>

// //                   <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-green-600">
// //                     <User size={18} className="text-gray-400" />

// //                     <input
// //                       type="text"
// //                       name="name"
// //                       value={form.name}
// //                       onChange={handleChange}
// //                       placeholder="Enter your full name"
// //                       className="w-full bg-transparent text-sm outline-none"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Email */}
// //                 <div>
// //                   <label className="mb-1.5 block text-sm font-bold text-gray-700">
// //                     Email Address
// //                   </label>

// //                   <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-green-600">
// //                     <Mail size={18} className="text-gray-400" />

// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={form.email}
// //                       onChange={handleChange}
// //                       placeholder="Enter your email"
// //                       className="w-full bg-transparent text-sm outline-none"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Mobile */}
// //                 <div>
// //                   <label className="mb-1.5 block text-sm font-bold text-gray-700">
// //                     Mobile Number
// //                   </label>

// //                   <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-green-600">
// //                     <Phone size={18} className="text-gray-400" />

// //                     <span className="border-r border-gray-200 pr-3 text-sm font-semibold text-gray-600">
// //                       +91
// //                     </span>

// //                     <input
// //                       type="tel"
// //                       name="mobile"
// //                       value={form.mobile}
// //                       onChange={handleChange}
// //                       placeholder="10-digit mobile number"
// //                       maxLength={10}
// //                       className="w-full bg-transparent text-sm outline-none"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 {error && (
// //                   <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
// //                     {error}
// //                   </p>
// //                 )}

// //                 {/* reCAPTCHA */}
// //                 <div id="recaptcha-container"></div>

// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 py-3.5 font-extrabold text-white shadow-lg transition hover:from-green-800 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-60"
// //                 >
// //                   {loading ? "Sending OTP..." : "Register & Send OTP"}
// //                   {!loading && <ArrowRight size={17} />}
// //                 </button>

// //                 <p className="text-center text-xs text-gray-400">
// //                   Your mobile number will be verified securely.
// //                 </p>
// //               </form>
// //             ) : (
// //               /* OTP Screen */
// //               <form onSubmit={verifyOTP} className="space-y-4">
// //                 <div className="rounded-xl bg-green-50 p-4 text-center">
// //                   <p className="text-sm text-green-800">
// //                     OTP sent to
// //                   </p>
// //                   <p className="mt-1 font-bold text-green-900">
// //                     +91 {form.mobile}
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <label className="mb-1.5 block text-sm font-bold text-gray-700">
// //                     Enter 6-Digit OTP
// //                   </label>

// //                   <input
// //                     type="text"
// //                     inputMode="numeric"
// //                     maxLength={6}
// //                     value={otp}
// //                     onChange={(e) =>
// //                       setOtp(e.target.value.replace(/\D/g, ""))
// //                     }
// //                     placeholder="------"
// //                     className="w-full rounded-xl border border-gray-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-green-600"
// //                     required
// //                   />
// //                 </div>

// //                 {error && (
// //                   <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
// //                     {error}
// //                   </p>
// //                 )}

// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="w-full rounded-full bg-green-700 py-3.5 font-extrabold text-white transition hover:bg-green-800 disabled:opacity-60"
// //                 >
// //                   {loading ? "Verifying..." : "Verify OTP & Join"}
// //                 </button>

// //                 <button
// //                   type="button"
// //                   onClick={() => {
// //                     setConfirmationResult(null);
// //                     setOtp("");
// //                     setError("");
// //                   }}
// //                   className="w-full py-2 text-sm font-bold text-green-700"
// //                 >
// //                   Change Mobile Number
// //                 </button>
// //               </form>
// //             )}
// //           </>
// //         ) : (
// //           /* Registration Success */
// //           <div className="py-5 text-center">
// //             <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
// //               <ShieldCheck size={42} />
// //             </div>

// //             <h2 className="text-2xl font-black text-green-900">
// //               Registration Successful!
// //             </h2>

// //             <p className="mt-3 text-base font-semibold text-gray-700">
// //               Welcome to Protein Club, {form.name}!
// //             </p>

// //             <div className="mt-5 rounded-2xl bg-green-50 p-4">
// //               <p className="font-bold text-green-800">
// //                 Select the community you want to join.
// //               </p>
// //               <p className="mt-1 text-sm text-green-700">
// //                 Explore our communities and connect with people who share your interests.
// //               </p>
// //             </div>

// //             <button
// //               onClick={goToCommunities}
// //               className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 font-extrabold text-white shadow-lg transition hover:from-orange-600 hover:to-orange-700"
// //             >
// //               Explore Communities
// //               <ArrowRight size={17} />
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { X, User, Mail, Phone, ShieldCheck, ArrowRight } from "lucide-react";
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   updateProfile,
// } from "firebase/auth";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "../firebase";

// export default function ProteinClubRegistrationModal({ onClose }) {
//   const [form, setForm] = useState({ name: "", email: "", mobile: "" });
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   // Keep the verifier outside React render state so it isn't recreated on renders.
//   const recaptchaRef = useRef(null);
//   const recaptchaRenderPromiseRef = useRef(null);

//   const clearRecaptcha = () => {
//     try {
//       if (recaptchaRef.current) {
//         recaptchaRef.current.clear();
//       }
//     } catch (recaptchaError) {
//       console.warn("reCAPTCHA cleanup error:", recaptchaError);
//     }

//     recaptchaRef.current = null;
//     recaptchaRenderPromiseRef.current = null;

//     const container = document.getElementById("recaptcha-container");
//     if (container) {
//       container.innerHTML = "";
//     }
//   };


//   // Create/render only one verifier for the current modal/container.
//   const getRecaptchaVerifier = async () => {
//     if (recaptchaRef.current && recaptchaRenderPromiseRef.current) {
//       await recaptchaRenderPromiseRef.current;
//       return recaptchaRef.current;
//     }

//     const container = document.getElementById("recaptcha-container");
//     if (!container) {
//       throw new Error("reCAPTCHA container was not found. Please close and reopen the form.");
//     }

//     // Clear any stale markup left by a previous verifier.
//     container.innerHTML = "";

//     const verifier = new RecaptchaVerifier(auth, container, {
//       size: "invisible",
//       callback: () => {
//         setError("");
//       },
//       "expired-callback": () => {
//         setError("reCAPTCHA expired. Please try sending the OTP again.");
//       },
//     });

//     recaptchaRef.current = verifier;
//     recaptchaRenderPromiseRef.current = verifier.render();

//     try {
//       await recaptchaRenderPromiseRef.current;
//       return verifier;
//     } catch (renderError) {
//       clearRecaptcha();
//       throw renderError;
//     }
//   };


//   useEffect(() => {
//     return () => {
//       clearRecaptcha();
//     };
//     // This cleanup is intentionally for modal unmount only.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((previous) => ({
//       ...previous,
//       [name]: name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value,
//     }));
//   };


//   // Send OTP
//   const sendOTP = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.name.trim() || !form.email.trim() || !form.mobile.trim()) {
//       setError("Please fill in all the fields.");
//       return;
//     }

//     if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
//       setError("Enter a valid 10-digit mobile number.");
//       return;
//     }

//     if (loading) return;
//     setLoading(true);

//     try {
//       const appVerifier = await getRecaptchaVerifier();
//       const result = await signInWithPhoneNumber(
//         auth,
//         `+91${form.mobile.trim()}`,
//         appVerifier
//       );

//       setConfirmationResult(result);
//       setError("");
//     } catch (err) {
//       console.error("OTP Error:", err);
//       setError(err.message || "Unable to send OTP. Please try again.");
//       // A failed attempt can leave the widget unusable; clear it so retry creates a fresh one.
//       clearRecaptcha();
//     } finally {
//       setLoading(false);
//     }
//   };


//   // Verify OTP and register user
//   const verifyOTP = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!confirmationResult) {
//       setError("Please request an OTP first.");
//       return;
//     }

//     if (!/^\d{6}$/.test(otp.trim())) {
//       setError("Please enter the 6-digit OTP.");
//       return;
//     }

//     if (loading) return;
//     setLoading(true);

//     try {
//       const userCredential = await confirmationResult.confirm(otp.trim());
//       const user = userCredential.user;

//       await updateProfile(user, { displayName: form.name.trim() });

//       await setDoc(
//         doc(db, "proteinClubMembers", user.uid),
//         {
//           uid: user.uid,
//           name: form.name.trim(),
//           email: form.email.trim().toLowerCase(),
//           mobile: `+91${form.mobile.trim()}`,
//           joinedAt: serverTimestamp(),
//           authProvider: "phone",
//           status: "active",
//         },
//         { merge: true }
//       );

//       setSuccess(true);
//     } catch (err) {
//       console.error("Verification Error:", err);
//       setError(err.message || "OTP verification failed. Please check the OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };


//   // Change phone number and start the OTP process again with a fresh verifier.
//   const changeMobileNumber = () => {
//     clearRecaptcha();
//     setConfirmationResult(null);
//     setOtp("");
//     setError("");
//   };


//   // Navigate to communities
//   const navigate = useNavigate();

// const goToDashboard = () => {
//   onClose?.();
//   navigate("/protein-club/dashboard");
// };


    


//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-3 py-5 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <div
//         className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={onClose}
//           aria-label="Close registration modal"
//           className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
//         >
//           <X size={18} />
//         </button>

//         {!success ? (
//           <>
//             {/* Header */}
//             <div className="mb-6 text-center">
//               <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
//                 <ShieldCheck size={30} />
//               </div>

//               <h2 className="text-2xl font-black text-green-900">Join Protein Club</h2>
//               <p className="mt-2 text-sm text-gray-500">
//                 Become part of India's protein-loving community.
//               </p>
//             </div>


//             {!confirmationResult ? (
//               <form onSubmit={sendOTP} className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="mb-1.5 block text-sm font-bold text-gray-700">
//                     Full Name
//                   </label>
//                   <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-green-600">
//                     <User size={18} className="text-gray-400" />
//                     <input
//                       type="text"
//                       name="name"
//                       value={form.name}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       autoComplete="name"
//                       className="w-full bg-transparent text-sm outline-none"
//                       required
//                     />
//                   </div>
//                 </div>


//                 {/* Email */}
//                 <div>
//                   <label className="mb-1.5 block text-sm font-bold text-gray-700">
//                     Email Address
//                   </label>
//                   <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-green-600">
//                     <Mail size={18} className="text-gray-400" />
//                     <input
//                       type="email"
//                       name="email"
//                       value={form.email}
//                       onChange={handleChange}
//                       placeholder="Enter your email"
//                       autoComplete="email"
//                       className="w-full bg-transparent text-sm outline-none"
//                       required
//                     />
//                   </div>
//                 </div>


//                 {/* Mobile */}
//                 <div>
//                   <label className="mb-1.5 block text-sm font-bold text-gray-700">
//                     Mobile Number
//                   </label>
//                   <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-green-600">
//                     <Phone size={18} className="text-gray-400" />
//                     <span className="border-r border-gray-200 pr-3 text-sm font-semibold text-gray-600">
//                       +91
//                     </span>
//                     <input
//                       type="tel"
//                       name="mobile"
//                       value={form.mobile}
//                       onChange={handleChange}
//                       placeholder="10-digit mobile number"
//                       autoComplete="tel-national"
//                       inputMode="numeric"
//                       maxLength={10}
//                       className="w-full bg-transparent text-sm outline-none"
//                       required
//                     />
//                   </div>
//                 </div>


//                 {error && (
//                   <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600 break-words">
//                     {error}
//                   </p>
//                 )}


//                 {/* Keep one stable reCAPTCHA container in this modal */}
//                 <div id="recaptcha-container" />

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 py-3.5 font-extrabold text-white shadow-lg transition hover:from-green-800 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {loading ? "Sending OTP..." : "Register & Send OTP"}
//                   {!loading && <ArrowRight size={17} />}
//                 </button>

//                 <p className="text-center text-xs text-gray-400">
//                   Your mobile number will be verified securely.
//                 </p>
//               </form>
//             ) : (
//               /* OTP Screen */
//               <form onSubmit={verifyOTP} className="space-y-4">
//                 <div className="rounded-xl bg-green-50 p-4 text-center">
//                   <p className="text-sm text-green-800">OTP sent to</p>
//                   <p className="mt-1 font-bold text-green-900">+91 {form.mobile}</p>
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-bold text-gray-700">
//                     Enter 6-Digit OTP
//                   </label>
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     autoComplete="one-time-code"
//                     maxLength={6}
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                     placeholder="------"
//                     className="w-full rounded-xl border border-gray-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-green-600"
//                     required
//                   />
//                 </div>

//                 {error && (
//                   <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600 break-words">
//                     {error}
//                   </p>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full rounded-full bg-green-700 py-3.5 font-extrabold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {loading ? "Verifying..." : "Verify OTP & Join"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={changeMobileNumber}
//                   disabled={loading}
//                   className="w-full py-2 text-sm font-bold text-green-700 disabled:opacity-50"
//                 >
//                   Change Mobile Number
//                 </button>
//               </form>
//             )}
//           </>
//         ) : (
//           /* Registration Success */
//           <div className="py-5 text-center">
//             <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
//               <ShieldCheck size={42} />
//             </div>

//             <h2 className="text-2xl font-black text-green-900">Registration Successful!</h2>
//             <p className="mt-3 text-base font-semibold text-gray-700">
//               Welcome to Protein Club, {form.name}!
//             </p>

//             <div className="mt-5 rounded-2xl bg-green-50 p-4">
//               <p className="font-bold text-green-800">
//                 Select the community you want to join.
//               </p>
//               <p className="mt-1 text-sm text-green-700">
//                 Explore our communities and connect with people who share your interests.
//               </p>
//             </div>

//             <button
//   type="button"
//   onClick={goToDashboard}
//   className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 font-extrabold text-white shadow-lg transition hover:from-orange-600 hover:to-orange-700"
// >
//   Explore Communities
//   <ArrowRight size={17} />
// </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  User,
  Mail,
  Phone,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";

export default function ProteinClubRegistrationModal({ onClose }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const recaptchaRef = useRef(null);
  const recaptchaRenderPromiseRef = useRef(null);
  const isMountedRef = useRef(true);

  // -----------------------------------------
  // Firebase error messages
  // -----------------------------------------
  const getFriendlyError = (err) => {
    switch (err?.code) {
      case "auth/invalid-phone-number":
        return "Please enter a valid mobile number.";

      case "auth/too-many-requests":
        return "Too many requests. Please wait and try again later.";

      case "auth/quota-exceeded":
        return "SMS verification limit reached. Please try again later.";

      case "auth/invalid-verification-code":
        return "Incorrect OTP. Please enter the correct code.";

      case "auth/code-expired":
        return "OTP expired. Please request a new OTP.";

      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";

      case "auth/captcha-check-failed":
        return "Verification failed. Please try again.";

      case "auth/operation-not-allowed":
        return "Phone authentication is not enabled in Firebase.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      default:
        return err?.message || "Something went wrong. Please try again.";
    }
  };

  // -----------------------------------------
  // Clear Firebase reCAPTCHA
  // -----------------------------------------
  const clearRecaptcha = () => {
    try {
      if (recaptchaRef.current) {
        recaptchaRef.current.clear();
      }
    } catch (err) {
      console.warn("reCAPTCHA cleanup error:", err);
    }

    recaptchaRef.current = null;
    recaptchaRenderPromiseRef.current = null;

    const container = document.getElementById("recaptcha-container");

    if (container) {
      container.innerHTML = "";
    }
  };

  // -----------------------------------------
  // Initialize reCAPTCHA only once
  // -----------------------------------------
  const getRecaptchaVerifier = async () => {
    if (recaptchaRef.current) {
      if (recaptchaRenderPromiseRef.current) {
        await recaptchaRenderPromiseRef.current;
      }

      return recaptchaRef.current;
    }

    const container = document.getElementById("recaptcha-container");

    if (!container) {
      throw new Error(
        "Verification container not found. Please reopen the registration form."
      );
    }

    container.innerHTML = "";

    const verifier = new RecaptchaVerifier(
      auth,
      container,
      {
        size: "invisible",

        callback: () => {
          if (isMountedRef.current) {
            setError("");
          }
        },

        "expired-callback": () => {
          if (isMountedRef.current) {
            setError("Verification expired. Please try again.");
          }
        },
      }
    );

    recaptchaRef.current = verifier;

    const renderPromise = verifier.render();
    recaptchaRenderPromiseRef.current = renderPromise;

    try {
      await renderPromise;
      return verifier;
    } catch (err) {
      clearRecaptcha();
      throw err;
    }
  };

  // -----------------------------------------
  // Component cleanup
  // -----------------------------------------
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      clearRecaptcha();
    };
  }, []);

  // -----------------------------------------
  // Handle form inputs
  // -----------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "mobile"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));
  };

  // -----------------------------------------
  // Validate registration form
  // -----------------------------------------
  const validateForm = () => {
    const name = form.name.trim();
    const email = form.email.trim();
    const mobile = form.mobile.trim();

    if (!name || !email || !mobile) {
      return "Please fill in all the fields.";
    }

    if (name.length < 2) {
      return "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return "Enter a valid 10-digit Indian mobile number.";
    }

    return null;
  };

  // -----------------------------------------
  // Send OTP
  // -----------------------------------------
  const sendOTP = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const appVerifier = await getRecaptchaVerifier();

      const phoneNumber = `+91${form.mobile.trim()}`;

      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      if (!isMountedRef.current) return;

      setConfirmationResult(result);
      setOtp("");
      setError("");
    } catch (err) {
      console.error("Send OTP Error:", err);

      if (isMountedRef.current) {
        setError(getFriendlyError(err));
      }

      clearRecaptcha();
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  // -----------------------------------------
  // Verify OTP and register member
  // -----------------------------------------
  const verifyOTP = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    if (!confirmationResult) {
      setError("Please request OTP first.");
      return;
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Verify SMS OTP
      const userCredential = await confirmationResult.confirm(
        otp.trim()
      );

      const user = userCredential.user;

      // Step 2: Update Firebase user display name
      await updateProfile(user, {
        displayName: form.name.trim(),
      });

      // Step 3: Save Protein Club member profile
      await setDoc(
        doc(db, "proteinClubMembers", user.uid),
        {
          uid: user.uid,
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          mobile: `+91${form.mobile.trim()}`,
          joinedAt: serverTimestamp(),
          authProvider: "phone",
          status: "active",
        },
        {
          merge: true,
        }
      );

      // Step 4: Registration success
      if (isMountedRef.current) {
        setSuccess(true);
        setError("");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);

      if (isMountedRef.current) {
        setError(getFriendlyError(err));
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  // -----------------------------------------
  // Change mobile number
  // -----------------------------------------
  const changeMobileNumber = () => {
    clearRecaptcha();

    setConfirmationResult(null);
    setOtp("");
    setError("");
  };

  // -----------------------------------------
  // Navigate after successful registration
  // -----------------------------------------
  const goToDashboard = () => {
    clearRecaptcha();

    if (onClose) {
      onClose();
    }

    navigate("/protein-club/dashboard", {
      replace: true,
    });
  };

  // -----------------------------------------
  // Close modal
  // -----------------------------------------
  const handleClose = () => {
    if (loading) return;

    clearRecaptcha();
    onClose?.();
  };

  // -----------------------------------------
  // UI
  // -----------------------------------------
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-3 py-5 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={loading}
          aria-label="Close registration"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
        >
          <X size={18} />
        </button>

        {!success ? (
          <>
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <ShieldCheck size={30} />
              </div>

              <h2 className="text-2xl font-black text-green-900">
                Join Protein Club
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Become part of India's protein-loving community.
              </p>
            </div>

            {/* Registration Form */}
            {!confirmationResult ? (
              <form onSubmit={sendOTP} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-700">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-green-600">
                    <User size={18} className="text-gray-400" />

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="w-full bg-transparent text-sm outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-700">
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-green-600">
                    <Mail size={18} className="text-gray-400" />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="w-full bg-transparent text-sm outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-700">
                    Mobile Number
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-green-600">
                    <Phone size={18} className="text-gray-400" />

                    <span className="border-r border-gray-200 pr-3 text-sm font-semibold text-gray-600">
                      +91
                    </span>

                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      autoComplete="tel-national"
                      inputMode="numeric"
                      maxLength={10}
                      className="w-full bg-transparent text-sm outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <p
                    role="alert"
                    className="break-words rounded-xl bg-red-50 p-3 text-sm text-red-600"
                  >
                    {error}
                  </p>
                )}

                {/* reCAPTCHA */}
                <div id="recaptcha-container" />

                {/* Send OTP */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 py-3.5 font-extrabold text-white shadow-lg transition hover:from-green-800 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending OTP..." : "Register & Send OTP"}

                  {!loading && <ArrowRight size={17} />}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Your mobile number will be verified securely.
                </p>
              </form>
            ) : (
              /* OTP Verification */
              <form onSubmit={verifyOTP} className="space-y-4">
                <div className="rounded-xl bg-green-50 p-4 text-center">
                  <p className="text-sm text-green-800">
                    OTP sent to
                  </p>

                  <p className="mt-1 font-bold text-green-900">
                    +91 {form.mobile}
                  </p>
                </div>

                {/* OTP Input */}
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-700">
                    Enter 6-Digit OTP
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                    placeholder="------"
                    className="w-full rounded-xl border border-gray-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-green-600"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p
                    role="alert"
                    className="break-words rounded-xl bg-red-50 p-3 text-sm text-red-600"
                  >
                    {error}
                  </p>
                )}

                {/* Verify OTP */}
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full rounded-full bg-green-700 py-3.5 font-extrabold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify OTP & Join"}
                </button>

                {/* Change Mobile */}
                <button
                  type="button"
                  onClick={changeMobileNumber}
                  disabled={loading}
                  className="w-full py-2 text-sm font-bold text-green-700 disabled:opacity-50"
                >
                  Change Mobile Number
                </button>
              </form>
            )}
          </>
        ) : (
          /* Registration Success */
          <div className="py-5 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
              <ShieldCheck size={42} />
            </div>

            <h2 className="text-2xl font-black text-green-900">
              Registration Successful!
            </h2>

            <p className="mt-3 text-base font-semibold text-gray-700">
              Welcome to Protein Club, {form.name}!
            </p>

            <div className="mt-5 rounded-2xl bg-green-50 p-4">
              <p className="font-bold text-green-800">
                Your account is ready.
              </p>

              <p className="mt-1 text-sm text-green-700">
                Visit your dashboard to explore communities, challenges,
                rewards, and your Protein Club membership.
              </p>
            </div>

            <button
              type="button"
              onClick={goToDashboard}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 font-extrabold text-white shadow-lg transition hover:from-orange-600 hover:to-orange-700"
            >
              Go to Dashboard
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

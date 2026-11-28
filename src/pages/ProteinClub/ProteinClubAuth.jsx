import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { auth } from "../../firebase";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import { clubImages } from "./data/communities";

const avatarPresets = [
  { label: "Fitness Member", url: clubImages.hero },
  { label: "Build Muscle", url: clubImages.buildMuscle },
  { label: "Meal Prep", url: clubImages.mealBowl },
  { label: "Wellness", url: clubImages.women },
];

const cities = [
  "Visakhapatnam, AP",
  "Hyderabad, TS",
  "Bengaluru, KA",
  "Chennai, TN",
  "Vijayawada, AP",
  "Mumbai, MH",
  "Delhi NCR",
  "Pune, MH",
  "Coimbatore, TN",
  "Other",
];

const dietOptions = ["Veg", "Non-Veg", "Eggetarian", "Vegan"];

export default function ProteinClubAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    profile,
    privateInfo,
    signInWithGoogle,
    saveProfile,
    showToast,
  } = useProteinClubAuth();

  const [authTab, setAuthTab] = useState("google");
  const [phoneInput, setPhoneInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [saveBusy, setSaveBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneSetupNeeded, setPhoneSetupNeeded] = useState(false);

  const [formEdits, setFormEdits] = useState({});
  const setForm = (updater) => {
    setFormEdits((prev) => {
      const current = {
        fullName:
          prev.fullName ??
          profile?.displayName ??
          privateInfo?.fullName ??
          user?.displayName ??
          "",
        mobile: prev.mobile ?? privateInfo?.mobile ?? user?.phoneNumber ?? "",
        email: prev.email ?? privateInfo?.email ?? user?.email ?? "",
        age: String(prev.age ?? privateInfo?.age ?? "30"),
        gender: prev.gender ?? privateInfo?.gender ?? "Male",
        location: prev.location ?? profile?.location ?? "Visakhapatnam, AP",
        dietPreference: prev.dietPreference ?? profile?.dietPreference ?? "Non-Veg",
        photoURL: prev.photoURL ?? profile?.photoURL ?? user?.photoURL ?? clubImages.hero,
      };
      return typeof updater === "function" ? updater(current) : { ...current, ...updater };
    });
  };

  const form = {
    fullName:
      formEdits.fullName ??
      profile?.displayName ??
      privateInfo?.fullName ??
      user?.displayName ??
      "",
    mobile: formEdits.mobile ?? privateInfo?.mobile ?? user?.phoneNumber ?? "",
    email: formEdits.email ?? privateInfo?.email ?? user?.email ?? "",
    age: String(formEdits.age ?? privateInfo?.age ?? "30"),
    gender: formEdits.gender ?? privateInfo?.gender ?? "Male",
    location: formEdits.location ?? profile?.location ?? "Visakhapatnam, AP",
    dietPreference: formEdits.dietPreference ?? profile?.dietPreference ?? "Non-Veg",
    photoURL: formEdits.photoURL ?? profile?.photoURL ?? user?.photoURL ?? clubImages.hero,
  };

  const recaptchaRef = useRef(null);

  useEffect(() => {
    return () => {
      try {
        recaptchaRef.current?.clear();
      } catch {
        // ignore cleanup error
      }
    };
  }, []);

  const resetRecaptcha = () => {
    try {
      recaptchaRef.current?.clear();
    } catch {
      // ignore cleanup error
    }
    recaptchaRef.current = null;
    const container = document.getElementById("club-recaptcha-container");
    if (container) {
      container.innerHTML = "";
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setPhoneSetupNeeded(false);
    setAuthBusy(true);
    try {
      const { hasProfile } = await signInWithGoogle();
      showToast("Signed in with Google! Complete or confirm your profile below.");
      if (hasProfile && location.state?.from?.pathname) {
        navigate(location.state.from.pathname, { replace: true });
      }
    } catch (err) {
      setErrorMsg(
        err?.message || "Could not sign in with Google. Please allow popups and try again."
      );
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSendPhoneOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setPhoneSetupNeeded(false);
    if (!/^[6-9]\d{9}$/.test(phoneInput.trim())) {
      setErrorMsg("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setAuthBusy(true);
    try {
      const container = document.getElementById("club-recaptcha-container");
      if (!recaptchaRef.current && container) {
        recaptchaRef.current = new RecaptchaVerifier(auth, container, {
          size: "invisible",
        });
      }
      const res = await signInWithPhoneNumber(
        auth,
        `+91${phoneInput.trim()}`,
        recaptchaRef.current
      );
      setConfirmationResult(res);
      showToast("OTP sent to +91 " + phoneInput.trim());
    } catch (err) {
      resetRecaptcha();
      const code = err?.code || "";
      if (
        code === "auth/operation-not-allowed" ||
        code === "auth/captcha-check-failed" ||
        code === "auth/invalid-app-credential" ||
        code === "auth/unauthorized-domain"
      ) {
        setPhoneSetupNeeded(true);
        setErrorMsg(
          "SMS Phone OTP requires enabling the Phone Sign-in provider and authorizing this domain in Firebase Console. You can continue immediately with Instant Google Sign-In."
        );
      } else if (code === "auth/too-many-requests") {
        setErrorMsg("Too many OTP attempts. Please wait a bit or use Instant Google Sign-In.");
      } else {
        setErrorMsg(err?.message || "Unable to send OTP right now.");
      }
    } finally {
      setAuthBusy(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!/^\d{6}$/.test(otpInput.trim())) {
      setErrorMsg("Enter the 6-digit OTP.");
      return;
    }
    setAuthBusy(true);
    try {
      await confirmationResult.confirm(otpInput.trim());
      setForm((prev) => ({ ...prev, mobile: `+91${phoneInput.trim()}` }));
      showToast("Mobile number verified! Now complete your profile.");
    } catch (err) {
      setErrorMsg(err?.message || "Invalid OTP code.");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!user) {
      setErrorMsg("Please sign in with Google or Mobile OTP first.");
      return;
    }
    if (!form.fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    setSaveBusy(true);
    try {
      await saveProfile({
        fullName: form.fullName.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim(),
        age: Number(form.age) || 30,
        gender: form.gender,
        location: form.location,
        dietPreference: form.dietPreference,
        photoURL: form.photoURL,
        goal: profile?.goal || "Build Muscle",
        dailyProteinTarget: profile?.dailyProteinTarget || 90,
      });
      showToast("Profile saved! Now choose your protein goal.");
      navigate("/protein-club/goal");
    } catch (err) {
      setErrorMsg(err?.message || "Could not save profile.");
    } finally {
      setSaveBusy(false);
    }
  };

  const currentStep = user ? 2 : 1;

  return (
    <div className="min-h-screen bg-protein-surface px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-green-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Onboarding Stepper */}
          <div className="flex flex-col justify-between rounded-2xl bg-protein-surface p-6 lg:col-span-4">
            <div>
              <div className="flex items-center gap-2.5 text-protein-dark">
                <ShieldCheck className="text-protein-green" size={24} />
                <span className="text-lg font-extrabold">EatProtein Account</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                One account works seamlessly across EatProtein Website, Protein Club, Shop, and Mobile App.
              </p>

              <div className="mt-6 space-y-4">
                {[
                  { num: 1, title: "Sign In / Verify", desc: "Google or Mobile OTP" },
                  { num: 2, title: "Complete Profile", desc: "Name, age, city & diet" },
                  { num: 3, title: "Set Your Goal", desc: "Daily protein requirement" },
                  { num: 4, title: "Join Communities", desc: "Connect & start challenges" },
                ].map((step) => {
                  const done = step.num < currentStep;
                  const active = step.num === currentStep;
                  return (
                    <div key={step.num} className="flex items-start gap-3">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                          done || active
                            ? "bg-protein-green text-white"
                            : "border border-gray-300 bg-white text-gray-500"
                        }`}
                      >
                        {done ? <CheckCircle2 size={15} /> : step.num}
                      </span>
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            active || done ? "text-protein-dark" : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-green-100 bg-white p-3.5 text-xs text-gray-600">
              <p className="font-bold text-protein-dark">Privacy First</p>
              <p className="mt-1">
                Your mobile number and email stay private under your EatProtein profile and are never posted publicly.
              </p>
            </div>
          </div>

          {/* Right Form Flow */}
          <div className="lg:col-span-8">
            {!user ? (
              <div>
                <h1 className="text-2xl font-extrabold text-protein-dark sm:text-3xl">
                  Join or Sign In to Protein Club
                </h1>
                <p className="mt-1.5 text-sm text-gray-600">
                  Use your existing EatProtein account or sign in instantly below.
                </p>

                {/* Method Toggle */}
                <div className="mt-5 inline-flex rounded-xl bg-protein-surface p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("google");
                      setErrorMsg("");
                      setPhoneSetupNeeded(false);
                    }}
                    className={`rounded-lg px-4 py-2 text-xs font-bold transition sm:text-sm ${
                      authTab === "google"
                        ? "bg-protein-green text-white shadow-sm"
                        : "text-gray-700"
                    }`}
                  >
                    Instant Google Sign-In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("phone");
                      setErrorMsg("");
                      setPhoneSetupNeeded(false);
                    }}
                    className={`rounded-lg px-4 py-2 text-xs font-bold transition sm:text-sm ${
                      authTab === "phone"
                        ? "bg-protein-green text-white shadow-sm"
                        : "text-gray-700"
                    }`}
                  >
                    Mobile Number + OTP
                  </button>
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700"
                  >
                    <p>{errorMsg}</p>
                    {phoneSetupNeeded && authTab === "phone" && (
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab("google");
                          setErrorMsg("");
                          setPhoneSetupNeeded(false);
                        }}
                        className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-protein-green px-4 py-1.5 text-xs font-bold text-white hover:bg-protein-hover"
                      >
                        Switch to Instant Google Sign-In
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                )}

                {authTab === "google" ? (
                  <div className="mt-6 rounded-2xl border border-gray-200 bg-protein-surface p-6">
                    <h2 className="text-base font-extrabold text-gray-900">
                      Continue with your Google account
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      One-click verification for your unified EatProtein profile, communities, challenges, and Protein Coins.
                    </p>
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={authBusy}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-protein-green px-6 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-protein-hover disabled:opacity-60 sm:w-auto"
                    >
                      {authBusy ? "Connecting to Google..." : "Continue with Google"}
                      <ArrowRight size={17} />
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl border border-gray-200 bg-protein-surface p-6">
                    {!confirmationResult ? (
                      <form onSubmit={handleSendPhoneOtp} className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-bold text-gray-800">
                            Mobile Number
                          </label>
                          <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2.5 focus-within:border-protein-green">
                            <Phone size={18} className="text-gray-400" />
                            <span className="border-r border-gray-200 pr-2 text-sm font-bold text-gray-600">
                              +91
                            </span>
                            <input
                              type="tel"
                              value={phoneInput}
                              onChange={(e) =>
                                setPhoneInput(e.target.value.replace(/\D/g, "").slice(0, 10))
                              }
                              placeholder="Enter 10-digit mobile number"
                              className="w-full bg-transparent text-sm outline-none"
                              required
                            />
                          </div>
                        </div>
                        <div id="club-recaptcha-container" />
                        <button
                          type="submit"
                          disabled={authBusy}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-protein-green px-6 py-3 text-sm font-extrabold text-white hover:bg-protein-hover disabled:opacity-60 sm:w-auto"
                        >
                          {authBusy ? "Sending OTP..." : "Send OTP"}
                          <ArrowRight size={16} />
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <p className="text-sm font-semibold text-gray-700">
                          Enter the 6-digit OTP sent to +91 {phoneInput}
                        </p>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) =>
                            setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6))
                          }
                          placeholder="000000"
                          className="w-full max-w-xs rounded-xl border border-gray-300 px-4 py-3 text-center text-xl font-bold tracking-[0.4em] outline-none focus:border-protein-green"
                          required
                        />
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="submit"
                            disabled={authBusy}
                            className="rounded-full bg-protein-green px-6 py-3 text-sm font-extrabold text-white hover:bg-protein-hover"
                          >
                            {authBusy ? "Verifying..." : "Verify & Continue"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setConfirmationResult(null);
                              setOtpInput("");
                              resetRecaptcha();
                            }}
                            className="rounded-full border border-gray-200 px-4 py-3 text-xs font-bold text-gray-600"
                          >
                            Change Number
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-extrabold text-protein-dark sm:text-3xl">
                  Complete Your Profile
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Tell us a bit about yourself to personalize your Protein Club experience.
                </p>

                {errorMsg && (
                  <div
                    role="alert"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                  >
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="mt-5 space-y-5">
                  {/* Profile Photo + Presets */}
                  <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-green-100 bg-protein-surface p-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-protein-green bg-protein-soft">
                      {form.photoURL ? (
                        <img
                          src={form.photoURL}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-protein-green">
                          <UserRound size={28} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                        <Camera size={14} className="text-protein-green" /> Choose Profile Avatar
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {avatarPresets.map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({ ...prev, photoURL: preset.url }))
                            }
                            className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                              form.photoURL === preset.url
                                ? "border-protein-green bg-protein-green text-white"
                                : "border-gray-200 bg-white text-gray-700 hover:border-green-400"
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Full Name & Age */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-gray-800">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2.5 focus-within:border-protein-green">
                        <UserRound size={17} className="text-gray-400" />
                        <input
                          type="text"
                          value={form.fullName}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, fullName: e.target.value }))
                          }
                          placeholder="Manoj Kumar"
                          className="w-full bg-transparent text-sm outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-gray-800">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={110}
                        value={form.age}
                        onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-protein-green"
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile & Email */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-gray-800">
                        Mobile Number
                      </label>
                      <div className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2.5 focus-within:border-protein-green">
                        <Phone size={17} className="text-gray-400" />
                        <input
                          type="tel"
                          value={form.mobile}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, mobile: e.target.value }))
                          }
                          placeholder="+91 98765 43210"
                          className="w-full bg-transparent text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-gray-800">
                        Email Address
                      </label>
                      <div className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2.5 focus-within:border-protein-green">
                        <Mail size={17} className="text-gray-400" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, email: e.target.value }))
                          }
                          placeholder="you@example.com"
                          className="w-full bg-transparent text-sm outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gender & Location */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-gray-800">
                        Gender
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Male", "Female", "Other"].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, gender: g }))}
                            className={`rounded-xl border py-2.5 text-xs font-bold transition sm:text-sm ${
                              form.gender === g
                                ? "border-protein-green bg-protein-soft text-protein-dark"
                                : "border-gray-200 bg-white text-gray-700"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-gray-800">
                        Location
                      </label>
                      <div className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2.5 focus-within:border-protein-green">
                        <MapPin size={17} className="text-gray-400" />
                        <select
                          value={form.location}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, location: e.target.value }))
                          }
                          className="w-full bg-transparent text-sm outline-none"
                        >
                          {cities.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Diet Preference */}
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-gray-800">
                      Diet Preference
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {dietOptions.map((diet) => (
                        <button
                          key={diet}
                          type="button"
                          onClick={() =>
                            setForm((p) => ({ ...p, dietPreference: diet }))
                          }
                          className={`rounded-xl border py-2.5 text-xs font-bold transition sm:text-sm ${
                            form.dietPreference === diet
                              ? "border-protein-green bg-protein-green text-white"
                              : "border-gray-200 bg-white text-gray-700 hover:border-green-400"
                          }`}
                        >
                          {diet}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-3 border-t border-gray-100 pt-4">
                    <button
                      type="submit"
                      disabled={saveBusy}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-protein-green px-8 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-protein-hover disabled:opacity-60 sm:w-auto"
                    >
                      {saveBusy ? "Saving Profile..." : "Continue to Protein Goal"}
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
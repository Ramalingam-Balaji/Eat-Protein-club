import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Plus,
  ArrowRight,
  Users,
  Target,
  ChartNoAxesColumnIncreasing,
  Gift,
  LockKeyhole,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100";

const labelClass = "mb-1.5 block text-sm font-bold text-[#10243B]";

export default function ProteinClubAuth() {
  const [mode, setMode] = useState("register");
  const [photo, setPhoto] = useState(null);

  // Registration states
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    age: "",
    gender: "",
    location: "",
  });

  // Login states
  const [loginContact, setLoginContact] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image under 5 MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPhoto(previewUrl);
  };

  const handleRegister = (e) => {
  e.preventDefault();

  if (!form.gender) {
    alert("Please select your gender.");
    return;
  }

  alert("Registration UI is ready. Authentication will be connected later.");
};

  const handleSendOTP = (e) => {
    e.preventDefault();

    if (!loginContact.trim()) {
      alert("Please enter your mobile number or email.");
      return;
    }

    // UI-only OTP flow
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 500);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    // UI-only verification
    alert("OTP UI is ready. Authentication will be connected later.");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setOtpSent(false);
    setOtp("");
    setLoginContact("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute left-0 top-20 h-60 w-60 rounded-full bg-green-100/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-lime-100/50 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-70px)] max-w-[1600px] grid-cols-1 items-center gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_minmax(0,880px)_250px] lg:gap-5 lg:px-8 lg:py-8 xl:gap-8">
        {/* ==================================================
            LEFT INFO PANEL
        =================================================== */}
        <aside className="hidden lg:block">
          <div className="max-w-[270px]">
            <h1 className="text-4xl font-black leading-tight tracking-tight text-[#10243B] xl:text-[43px]">
              EatProtein
              <span className="block text-green-800">Protein Club</span>
            </h1>

            <p className="mt-4 text-xl font-medium leading-snug text-[#10243B]">
              A community for a stronger, healthier life and protein-rich life.
            </p>

            <div className="mt-7 space-y-4">
              {[
                {
                  icon: Users,
                  text: "Join like-minded health champions",
                },
                {
                  icon: Target,
                  text: "Take challenges & build healthy habits",
                },
                {
                  icon: ChartNoAxesColumnIncreasing,
                  text: "Track your progress",
                },
                {
                  icon: Gift,
                  text: "Earn rewards & get exclusive benefits",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
                      <Icon className="h-6 w-6 text-green-800" />
                    </div>

                    <p className="text-sm font-semibold leading-relaxed text-gray-800">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ==================================================
            MAIN AUTH CARD
        =================================================== */}
        <section className="w-full min-w-0">
          <div className="mx-auto w-full max-w-[880px] rounded-[26px] border border-gray-100 bg-white/95 p-4 shadow-[0_12px_45px_rgba(15,23,42,0.12)] sm:p-6 md:p-8 lg:p-9">
            {/* Mobile branding */}
            <div className="mb-5 text-center lg:hidden">
              <h1 className="text-2xl font-black text-[#10243B]">
                EatProtein <span className="text-green-700">Protein Club</span>
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Your journey to a healthier lifestyle
              </p>
            </div>

            {/* Card heading */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-2">
                <span className="text-2xl font-black tracking-tight text-[#10243B] sm:text-3xl md:text-4xl">
                  {mode === "register" ? "Join Protein Club" : "Welcome Back"}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                {mode === "register"
                  ? "Create your profile to personalize your protein journey."
                  : otpSent
                  ? "Enter the OTP sent to your mobile or email."
                  : "Login to continue your Protein Club journey."}
              </p>
            </div>

            {/* ==================================================
                REGISTER FORM
            =================================================== */}
            {mode === "register" && (
              <form onSubmit={handleRegister} className="mt-6 space-y-4 sm:mt-7">
                {/* Photo + Name */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[150px_minmax(0,1fr)]">
                  {/* Photo Upload */}
                  <div className="flex items-center justify-center sm:justify-start">
                    <label className="group relative flex h-[145px] w-[145px] cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-green-300 bg-green-50/70 transition hover:border-green-600 hover:bg-green-50">
                      {photo ? (
                        <img
                          src={photo}
                          alt="Profile preview"
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <>
                          <Camera className="h-8 w-8 text-gray-700" />
                          <span className="mt-2 text-xs font-bold text-gray-800">
                            Upload Photo
                          </span>
                          <span className="mt-1 text-[10px] text-gray-500">
                            JPG, PNG (Max 5 MB)
                          </span>
                        </>
                      )}

                      <span className="absolute bottom-0 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-white shadow-md transition group-hover:bg-green-800">
                        <Plus size={20} />
                      </span>

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Full name */}
                  <div className="min-w-0">
                    <label className={labelClass}>
                      Full Name <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleFormChange}
                        placeholder="Enter your full name"
                        className={`${inputClass} pl-12`}
                        required
                      />
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      Your name will be displayed on your Protein Club profile.
                    </p>
                  </div>
                </div>

                {/* Mobile and Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
                      <input
                        type="tel"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleFormChange}
                        placeholder="+91 Enter mobile number"
                        className={`${inputClass} pl-12`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="Enter your email address"
                        className={`${inputClass} pl-12`}
                      />
                    </div>
                  </div>
                </div>

                {/* Age + Gender */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={form.age}
                      onChange={handleFormChange}
                      min="1"
                      max="120"
                      placeholder="Enter your age"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Gender <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      {["Male", "Female", "Other"].map((gender) => (
                        <button
                          key={gender}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({ ...prev, gender }))
                          }
                          className={`rounded-xl border px-2 py-3 text-sm font-semibold transition ${
                            form.gender === gender
                              ? "border-green-600 bg-green-50 text-green-800 ring-2 ring-green-100"
                              : "border-gray-300 bg-white text-gray-700 hover:border-green-400"
                          }`}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                    
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className={labelClass}>
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleFormChange}
                      placeholder="Enter city / location"
                      className={`${inputClass} pl-12`}
                      required
                    />
                  </div>
                </div>

                {/* Register button */}
                <button
                  type="submit"
                  className="mx-auto mt-2 flex w-full max-w-[470px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-green-700 via-green-600 to-green-700 px-6 py-3.5 text-base font-extrabold text-white shadow-md transition hover:brightness-110 hover:shadow-lg sm:py-4 sm:text-lg"
                >
                  Continue
                  <ArrowRight size={21} />
                </button>

                {/* Switch to login */}
                <div className="flex items-center gap-3 pt-3">
                  <span className="h-px flex-1 bg-gray-200" />
                  <p className="text-center text-sm text-gray-700">
                    Already have an EatProtein account?
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="ml-1 font-extrabold text-green-700 underline underline-offset-2 hover:text-green-900"
                    >
                      Login
                    </button>
                  </p>
                  <span className="h-px flex-1 bg-gray-200" />
                </div>
              </form>
            )}

            {/* ==================================================
                LOGIN FORM
            =================================================== */}
            {mode === "login" && (
              <div className="mx-auto mt-8 max-w-[500px]">
                {!otpSent ? (
                  <form onSubmit={handleSendOTP} className="space-y-5">
                    <div>
                      <label className={labelClass}>
                        Mobile Number or Email{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
                        <input
                          type="text"
                          value={loginContact}
                          onChange={(e) => setLoginContact(e.target.value)}
                          placeholder="Enter mobile number or email"
                          className={`${inputClass} pl-12`}
                          required
                        />
                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        We'll send a one-time password to verify your account.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-6 py-3.5 text-base font-extrabold text-white shadow-md transition hover:brightness-110 disabled:opacity-70 sm:py-4"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className="h-5 w-5 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Send OTP
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-5">
                    <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                      <div className="flex items-center gap-2 text-green-800">
                        <ShieldCheck size={20} />
                        <p className="text-sm font-bold">OTP verification</p>
                      </div>
                      <p className="mt-1 break-all text-sm text-gray-700">
                        Verification code sent to{" "}
                        <span className="font-bold">{loginContact}</span>
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Enter 6-digit OTP <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
                        <input
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={6}
                          value={otp}
                          onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                          }
                          placeholder="Enter 6-digit OTP"
                          className={`${inputClass} pl-12 text-center text-lg font-bold tracking-[0.4em]`}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-6 py-3.5 text-base font-extrabold text-white shadow-md transition hover:brightness-110 sm:py-4"
                    >
                      Verify OTP
                      <CheckCircle2 size={20} />
                    </button>

                    <div className="flex items-center justify-between gap-2 text-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp("");
                        }}
                        className="inline-flex items-center gap-1 font-bold text-gray-600 hover:text-green-800"
                      >
                        <ArrowLeft size={16} />
                        Change mobile/email
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOtp("");
                          setOtpSent(false);
                        }}
                        className="font-bold text-green-700 underline underline-offset-2 hover:text-green-900"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </form>
                )}

                {/* Switch to register */}
                <div className="mt-7 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gray-200" />
                  <p className="text-center text-sm text-gray-700">
                    New to EatProtein?
                    <button
                      type="button"
                      onClick={() => switchMode("register")}
                      className="ml-1 font-extrabold text-green-700 underline underline-offset-2 hover:text-green-900"
                    >
                      Register
                    </button>
                  </p>
                  <span className="h-px flex-1 bg-gray-200" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ==================================================
            RIGHT FOOD IMAGE
        =================================================== */}
        <aside className="relative hidden h-full min-h-[580px] items-center justify-center lg:flex">
          <div className="absolute right-0 top-[12%] h-72 w-72 rounded-full bg-green-50" />

          <img
            src="/assets/protein-auth-food.webp"
            alt="Healthy high protein meal"
            className="relative z-10 max-h-[620px] w-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </aside>
      </div>
    </main>
  );
}
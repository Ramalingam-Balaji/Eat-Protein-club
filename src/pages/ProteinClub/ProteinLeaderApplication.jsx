
import React from "react";
import { Link } from "react-router-dom";
import { Crown, ArrowLeft } from "lucide-react";

export default function ProteinLeaderApplication() {
  return (
    <section className="min-h-screen bg-[#F0F8EF] px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-sm sm:p-10">
        <Link
          to="/protein-club/communities"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-green-800"
        >
          <ArrowLeft size={16} />
          Back to Communities
        </Link>

        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
          <Crown className="text-orange-500" size={34} />
        </div>

        <h1 className="text-3xl font-extrabold text-[#063D27]">
          Become a Protein Leader
        </h1>

        <p className="mt-3 text-gray-600">
          Help others build better protein habits, grow a community, lead
          challenges, and earn recognition within EatProtein.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Application form submitted! Backend integration will be added later.");
          }}
          className="mt-8 space-y-4"
        >
          <input
            required
            placeholder="Full Name"
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
          />

          <input
            required
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
          />

          <input
            required
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
          />

          <input
            required
            placeholder="City / Location"
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
          />

          <textarea
            required
            rows={4}
            placeholder="Why would you like to become a Protein Leader?"
            className="w-full resize-none rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 p-3 font-bold text-white hover:shadow-lg"
          >
            Submit Application →
          </button>
        </form>
      </div>
    </section>
  );
}

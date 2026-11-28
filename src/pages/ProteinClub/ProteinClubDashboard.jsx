
import React from "react";
import { Link } from "react-router-dom";
import {
  UserCircle,
  Users,
  Trophy,
  Target,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";

export default function ProteinClubDashboard() {
  const { user, member } = useProteinClubAuth();

  const name =
    member?.name || user?.displayName || "Protein Club Member";

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      alert("Unable to log out. Please try again.");
    }
  };

  const items = [
    {
      title: "My Communities",
      description: "Join communities and connect with members.",
      icon: Users,
      link: "/protein-club/explore-communities",
    },
    {
      title: "Challenges",
      description: "Participate in protein and fitness challenges.",
      icon: Target,
      link: "/protein-club/challenges",
    },
    {
      title: "Leaderboard",
      description: "Track your position and progress.",
      icon: Trophy,
      link: "/protein-club/leaderboard",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F0F8EF] px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Welcome */}
        <section className="rounded-3xl bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 p-5 text-white sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-green-100">
                PROTEIN CLUB MEMBER
              </p>

              <h1 className="mt-2 text-2xl font-black sm:text-4xl">
                Welcome, {name}!
              </h1>

              <p className="mt-2 text-sm text-green-50 sm:text-base">
                Your healthy journey starts here.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <UserCircle size={38} />
            </div>
          </div>
        </section>

        {/* Profile */}
        <section className="mt-5 rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-green-900">
            My Profile
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-[#F0F8EF] p-4">
              <p className="text-xs font-semibold text-gray-500">
                Full Name
              </p>
              <p className="mt-1 break-words font-bold text-gray-800">
                {name}
              </p>
            </div>

            <div className="rounded-xl bg-[#F0F8EF] p-4">
              <p className="text-xs font-semibold text-gray-500">
                Mobile
              </p>
              <p className="mt-1 break-words font-bold text-gray-800">
                {user?.phoneNumber || member?.mobile || "Not available"}
              </p>
            </div>

            <div className="rounded-xl bg-[#F0F8EF] p-4 sm:col-span-2">
              <p className="text-xs font-semibold text-gray-500">
                Email
              </p>
              <p className="mt-1 break-words font-bold text-gray-800">
                {member?.email || user?.email || "Not available"}
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard features */}
        <section className="mt-6">
          <h2 className="mb-4 text-xl font-black text-green-900 sm:text-2xl">
            Explore Protein Club
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.link}
                  className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-800">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-4 text-lg font-extrabold text-green-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>

                  <span className="mt-4 inline-block text-sm font-bold text-green-700">
                    Explore →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 font-bold text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </main>
  );
}

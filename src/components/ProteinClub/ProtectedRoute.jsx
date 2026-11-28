import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAdmin, authLoading } = useProteinClubAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-protein-surface">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-700" />
          <p className="mt-3 text-sm font-semibold text-green-800">
            Checking your EatProtein account...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/protein-club/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-protein-surface px-4">
        <div className="max-w-md rounded-3xl border border-green-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-extrabold text-protein-dark">
            Admin Access Required
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            This console is restricted to authorized EatProtein Protein Club administrators.
          </p>
          <a
            href="/protein-club/my-club"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-protein-green px-5 py-2.5 text-sm font-bold text-white hover:bg-protein-hover"
          >
            Back to My Protein Club
          </a>
        </div>
      </div>
    );
  }

  return children;
}

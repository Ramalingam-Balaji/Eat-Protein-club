
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useProteinClubAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F0F8EF]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-700" />
          <p className="mt-3 text-sm font-semibold text-green-800">
            Checking your account...
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

  return children;
}

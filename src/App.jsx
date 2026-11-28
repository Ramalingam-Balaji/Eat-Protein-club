import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import ProteinClub from "./pages/ProteinClub";
import ExploreCommunities from "./pages/ProteinClub/ExploreCommunities";
import ProteinGoal from "./pages/ProteinClub/ProteinGoal";
import ProteinLeaderApplication from "./pages/ProteinClub/ProteinLeaderApplication";
import CommunityDetails from "./pages/ProteinClub/CommunityDetails";
import SuggestCommunity from "./pages/ProteinClub/SuggestCommunity";
import LeaderboardRewards from "./pages/ProteinClub/LeaderboardRewards";
import ProteinChallenge from "./pages/ProteinClub/ProteinChallenge";
import MyProteinClub from "./pages/ProteinClub/MyProteinClub";
import ProteinClubAuth from "./pages/ProteinClub/ProteinClubAuth";
import ProteinClubDashboard from "./pages/ProteinClub/ProteinClubDashboard";
import EventsResources from "./pages/ProteinClub/EventsResources";
import AdminPanel from "./pages/ProteinClub/AdminPanel";

import Franchise from "./pages/Franchise";
import FoodStores from "./pages/FoodStores";
import CategoryStores from "./pages/CategoryStores";
import Contact from "./pages/Contact";
import Store from "./pages/Store";
import StoreDetails from "./pages/StoreDetails";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ProteinCalculator from "./pages/ProteinCalculator";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import WhatsAppSupport from "./components/WhatsAppSupport";
import ProtectedRoute from "./components/ProteinClub/ProtectedRoute";
import BrandThemeStudioModal from "./components/BrandThemeStudioModal";

export default function AppRoutes() {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col bg-white text-protein-text">
      <ScrollManager />

      <Navbar />

      <main className="w-full min-w-0 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* EatProtein Protein Club Platform */}
          <Route path="/protein-club" element={<ProteinClub />} />
          <Route path="/protein-club/login" element={<ProteinClubAuth />} />
          <Route path="/protein-club/register" element={<ProteinClubAuth />} />
          <Route path="/protein-club/goal" element={<ProteinGoal />} />
          <Route path="/protein-club/communities" element={<ExploreCommunities />} />
          <Route path="/protein-club/explore-communities" element={<ExploreCommunities />} />
          <Route path="/protein-club/community/:slug" element={<CommunityDetails />} />
          <Route path="/protein-club/challenges" element={<ProteinChallenge />} />
          <Route path="/protein-club/21-day-protein-challenge" element={<ProteinChallenge />} />
          <Route
            path="/protein-club/leaderboard"
            element={<LeaderboardRewards defaultTab="leaderboard" />}
          />
          <Route
            path="/protein-club/rewards"
            element={<LeaderboardRewards defaultTab="rewards" />}
          />
          <Route
            path="/protein-club/leaderboard-rewards"
            element={<LeaderboardRewards defaultTab="leaderboard" />}
          />
          <Route path="/protein-club/events" element={<EventsResources mode="events" />} />
          <Route path="/protein-club/resources" element={<EventsResources mode="resources" />} />
          <Route path="/protein-club/my-club" element={<MyProteinClub />} />
          <Route
            path="/protein-club/dashboard"
            element={
              <ProtectedRoute>
                <ProteinClubDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/protein-club/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/protein-club/suggest-community" element={<SuggestCommunity />} />
          <Route path="/protein-club/leader-application" element={<ProteinLeaderApplication />} />

          {/* Core EatProtein Website & Shop */}
          <Route path="/protein-calculator" element={<ProteinCalculator />} />
          <Route path="/food-stores" element={<FoodStores />} />
          <Route path="/food-stores/:category" element={<CategoryStores />} />
          <Route path="/food-stores/:categorySlug/:storeName" element={<StoreDetails />} />
          <Route path="/store-registration" element={<Store />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/shipping" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppSupport />
      <BrandThemeStudioModal />
    </div>
  );
}

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Outlet } from "react-router-dom";
import { useResetScrollOnRouteChange } from "@/context/ScrollContext";

export default function AppLayout() {
  useResetScrollOnRouteChange();

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white relative">
      {/* UI LAYER */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

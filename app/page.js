"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { auth } from "@/app/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import Footer from "./components/Footer";

const images = ["/turf1.webp", "/turf2.webp", "/turf3.webp"];

export default function HomePage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      return autoplay();
    }
  }, [emblaApi, autoplay]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => await signOut(auth);

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setLoginError("");
      setShowLoginModal(false);
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const features = [
    {
      icon: "/location.png",
      title: "Prime Location",
      description:
        "Conveniently located turf with great lighting and accessibility.",
    },
    {
      icon: "/appointment.png",
      title: "Quick Booking",
      description: "Pick your date & time. Book in under a minute.",
    },
    {
      icon: "/confirm.png",
      title: "Instant Confirmation",
      description: "Get an email confirmation right after payment.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 transform -skew-y-6 -rotate-6 origin-top-left"></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                Book Premium <span className="text-green-600">Turf</span> Fields
                in Minutes
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Find and reserve the best sports turfs in your city. Football,
                cricket, hockey - we have it all with easy online booking.
              </p>
              <Link href="/book">
                <button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition duration-300 transform hover:scale-105">
                  {user?.email === "keluskaratharva999@gmail.com"
                    ? "Manage Slots"
                    : "Book Turf Now"}
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose TurfBook?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make turf booking simple, fast, and reliable with our premium
              features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300"
              >
                <img src={f.icon} alt={f.title} className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-cyan-500 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Play?
            </h2>
            <p className="text-white text-xl max-w-2xl mx-auto mb-10">
              Join thousands of players who book their turf with us every week
            </p>
            <Link href="/book">
              <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-bold shadow-lg transition duration-300 transform hover:scale-105">
                {user?.email === "keluskaratharva999@gmail.com"
                  ? "Manage Slots"
                  : "Book Now"}
              </button>
            </Link>
          </div>
        </div>
        <div id="location">
          location
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Login to TurfBook
              </h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {loginError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {loginError}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <button className="text-sm text-green-600 hover:text-green-800">
                  Forgot password?
                </button>
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition duration-300 mt-4"
              >
                Login
              </button>
              <div className="text-center text-gray-600 mt-4">
               Don&apos;t miss out!{" "}
                <button className="text-green-600 hover:text-green-800 font-medium">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

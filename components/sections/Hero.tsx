"use client";
import { useState, useEffect } from "react";
import Lanyard from "../../app/components/Lanyard/Lanyard";
import ScrollVelocity from "../../app/components/TextAnimations/ScrollVelocity/ScrollVelocity";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [activeIcon, setActiveIcon] = useState<string | null>(null); // Untuk state warna yang persisten

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMobileIconInteraction = (iconType: string) => {
    // Toggle tooltip untuk mobile
    if (activeTooltip === iconType) {
      // Jika sudah aktif, hide tooltip dan reset active state
      setActiveTooltip(null);
      setActiveIcon(null);
    } else {
      // Show tooltip dan set active state
      setActiveTooltip(iconType);
      setActiveIcon(iconType);
      
      // Auto hide setelah 5 detik (lebih lama untuk mobile)
      setTimeout(() => {
        setActiveTooltip(null);
        setActiveIcon(null);
      }, 5000);
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 mb-12"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-8">
        {/* Nama */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            M Nandana Aruna
          </span>
          <br />
          <span className="text-gray-800 dark:text-white">
            Apta Baswara
          </span>
        </h1>
        
        {/* Bagian tumpang tindih */}
        <div className="relative w-full flex items-center" style={{ minHeight: 220 }}>
          {/* Lanyard - HIDDEN pada mobile (< 640px) */}
          <div className="absolute pointer-events-none z-20 right-0 top-1/2 -translate-y-1/2 w-64 max-w-[320px]
            /* Hide completely on mobile */
            hidden sm:block"
          >
            <Lanyard position={[0, 0, 15]} />
          </div>
          
          {/* ScrollVelocity - Full width pada mobile tanpa margin */}
          <div className="w-full max-w-5xl overflow-hidden mx-auto z-10">
            <ScrollVelocity
              scrollContainerRef={null}
              texts={[
                "Web Developer",
                "Backend Developer",
              ]}
              velocity={50}
              numCopies={6}
              className="custom-scroll-text"
              parallaxClassName=""
              scrollerClassName=""
              parallaxStyle={{}}
              scrollerStyle={{}}
            />
          </div>
        </div>
        
        {/* Social Icons dengan enhanced hover effects & mobile touch */}
        <div className="flex gap-4 sm:gap-6 mb-4 justify-center">
          {/* Email Icon */}
          <div className="relative group">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=nandana219@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className={`flex items-center justify-center w-12 h-12 rounded-full 
                transition-all duration-300 transform group
                /* Desktop hover states */
                hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/25
                /* Base colors */
                ${activeIcon === 'email' 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/25 scale-110 -translate-y-1' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }
                /* Desktop hover colors */
                sm:hover:bg-red-500 sm:hover:text-white
                /* Mobile active state (fallback for very quick taps) */
                active:bg-red-500 active:text-white active:scale-105`}
              onClick={(e) => {
                // Untuk mobile - show tooltip on first tap, navigate on second tap
                if (window.innerWidth < 640) {
                  if (activeTooltip !== 'email') {
                    e.preventDefault();
                    handleMobileIconInteraction('email');
                  }
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
            {/* Tooltip - responsive untuk mobile & desktop */}
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs sm:text-sm 
              px-2 sm:px-3 py-1 rounded-lg transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50
              ${activeTooltip === 'email' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              nandana219@gmail.com
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>

          {/* GitHub Icon */}
          <div className="relative group">
            <a
              href="https://github.com/Daarns"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`flex items-center justify-center w-12 h-12 rounded-full 
                transition-all duration-300 transform group
                hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-900/25
                ${activeIcon === 'github' 
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/25 scale-110 -translate-y-1' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }
                sm:hover:bg-gray-900 sm:hover:text-white
                active:bg-gray-900 active:text-white active:scale-105`}
              onClick={(e) => {
                if (window.innerWidth < 640) {
                  if (activeTooltip !== 'github') {
                    e.preventDefault();
                    handleMobileIconInteraction('github');
                  }
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
            </a>
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs sm:text-sm 
              px-2 sm:px-3 py-1 rounded-lg transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50
              ${activeTooltip === 'github' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              @Daarns
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>

          {/* Instagram Icon */}
          <div className="relative group">
            <a
              href="https://www.instagram.com/nndaarn/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`flex items-center justify-center w-12 h-12 rounded-full 
                transition-all duration-300 transform group
                hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/25
                ${activeIcon === 'instagram' 
                  ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-400 text-white shadow-lg shadow-pink-500/25 scale-110 -translate-y-1' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }
                sm:hover:bg-gradient-to-br sm:hover:from-purple-600 sm:hover:via-pink-600 sm:hover:to-orange-400 sm:hover:text-white
                active:bg-gradient-to-br active:from-purple-600 active:via-pink-600 active:to-orange-400 active:text-white active:scale-105`}
              onClick={(e) => {
                if (window.innerWidth < 640) {
                  if (activeTooltip !== 'instagram') {
                    e.preventDefault();
                    handleMobileIconInteraction('instagram');
                  }
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </a>
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs sm:text-sm 
              px-2 sm:px-3 py-1 rounded-lg transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50
              ${activeTooltip === 'instagram' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              @nndaarn
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>

          {/* LinkedIn Icon */}
          <div className="relative group">
            <a
              href="https://linkedin.com/in/m-nandana-aruna-apta-baswara-a21291289"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`flex items-center justify-center w-12 h-12 rounded-full 
                transition-all duration-300 transform group
                hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/25
                ${activeIcon === 'linkedin' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-110 -translate-y-1' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }
                sm:hover:bg-blue-600 sm:hover:text-white
                active:bg-blue-600 active:text-white active:scale-105`}
              onClick={(e) => {
                if (window.innerWidth < 640) {
                  if (activeTooltip !== 'linkedin') {
                    e.preventDefault();
                    handleMobileIconInteraction('linkedin');
                  }
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.531-2.513-1.531 0-1.767 1.197-1.767 2.434v4.683h-3v-9h2.881v1.229h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v4.733z" />
              </svg>
            </a>
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs sm:text-sm 
              px-2 sm:px-3 py-1 rounded-lg transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50
              ${activeTooltip === 'linkedin' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              LinkedIn Profile
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>

        {/* Mobile instruction text */}
        <div className="sm:hidden text-center text-xs text-gray-500 dark:text-gray-400">
          Tap icons to see details, tap again to visit
        </div>
        
        {/* Tombol utama */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
          >
            View My Work
          </button>
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-700 active:text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95">
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
}
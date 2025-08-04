"use client";
import { useState, useEffect } from "react";
import Lanyard from "../../app/components/Lanyard/Lanyard";
import ScrollVelocity from "../../app/components/TextAnimations/ScrollVelocity/ScrollVelocity";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          {/* Lanyard absolute di kanan, di atas scroll velocity */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-64 max-w-[320px] pointer-events-none">
            <Lanyard position={[0, 0, 15]} />
          </div>
          {/* ScrollVelocity di belakang Lanyard */}
          <div className="w-full max-w-5xl overflow-hidden mx-auto z-10">
            <ScrollVelocity
              texts={[
                "Web Developer",
                "Backend Developer",
              ]}
              velocity={50}
              numCopies={6}
              className="custom-scroll-text"
            />
          </div>
        </div>
        {/* Social Icons */}
        <div className="flex gap-4 mb-4 justify-center">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=nandana219@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="p-2 rounded-full bg-muted hover:bg-primary/20 text-primary hover:text-primary transition-colors"
          >
            {/* Email Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6"
              />
            </svg>
          </a>
          <a
            href="https://github.com/Daarns"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-full bg-muted hover:bg-primary/20 text-primary hover:text-primary transition-colors"
          >
            {/* GitHub Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/nndaarn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-full bg-muted hover:bg-primary/20 text-primary hover:text-primary transition-colors"
          >
            {/* Instagram Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/m-nandana-aruna-apta-baswara-a21291289"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-full bg-muted hover:bg-primary/20 text-primary hover:text-primary transition-colors"
          >
            {/* LinkedIn Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.531-2.513-1.531 0-1.767 1.197-1.767 2.434v4.683h-3v-9h2.881v1.229h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v4.733z" />
            </svg>
          </a>
        </div>
        {/* Tombol utama */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            View My Work
          </button>
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-medium transition-all duration-200 hover:scale-105">
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
}
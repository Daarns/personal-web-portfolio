"use client";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Heart,
  ArrowUp,
} from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Loading...");

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
    
    // Fetch build info
    fetch('/build-info.json')
      .then(response => response.json())
      .then(data => {
        setLastUpdated(data.lastCommitDate || "Unknown");
      })
      .catch(error => {
        console.warn('Could not fetch build info:', error);
        // Fallback to current date
        const fallbackDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        setLastUpdated(fallbackDate);
      });
  }, []);

  // Show scroll to top button when scrolled down
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Static values to prevent hydration mismatch
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Daarns",
      icon: Github,
      description: "View my code",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/m-nandana-aruna-apta-baswara-a21291289",
      icon: Linkedin,
      description: "Connect with me",
    },
    {
      name: "Email",
      url: "mailto:nandana219@gmail.com",
      icon: Mail,
      description: "Send me a message",
    },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const techStack = [
    "JavaScript",
    "PHP",
    "Python",
    "Laravel",
    "CodeIgniter",
    "FastAPI",
    "MySQL",
    "Figma",
  ];

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <footer className="relative bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-muted-foreground">Loading...</div>
        </div>
      </footer>
    );
  }

  return (
    <>
      <footer className="relative bg-card border-t border-border">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-foreground mb-4">
                M Nandana Aruna Apta Baswara
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Backend-focused Web Developer passionate about creating
                efficient, scalable solutions. Always eager to learn new
                technologies and contribute to meaningful projects.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-3 bg-secondary rounded-lg hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                      title={social.description}
                    >
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />

                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-md px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        {social.description}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Quick Links
              </h4>
              <nav className="space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300 group"
                  >
                    <span className="flex items-center">
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md hover:bg-primary/20 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-6">
                <h5 className="text-sm font-medium text-foreground mb-2">
                  Available for Work
                </h5>
                <p className="text-xs text-muted-foreground">
                  Open to freelance projects and full-time opportunities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - UPDATED dengan 3 kolom layout */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              
              {/* Made with Love - Left */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground order-2 lg:order-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>using Next.js & Three.js</span>
              </div>

              {/* Copyright - Center */}
              <div className="text-sm text-muted-foreground text-center order-1 lg:order-2">
                <span>© {currentYear} M Nandana Aruna Apta Baswara</span>
              </div>

              {/* Last Updated - Right */}
              <div className="text-xs text-muted-foreground order-3">
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-dark-lg hover:scale-110 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Footer;
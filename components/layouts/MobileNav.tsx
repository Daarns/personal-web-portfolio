"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Home, User, Wrench, FolderOpen } from "lucide-react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Dock from "../../app/components/Dock/Dock";

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Show swipe hint after 5 seconds if dock hasn't been shown
    hintTimeoutRef.current = setTimeout(() => {
      if (!isVisible) {
        setShowSwipeHint(true);
        setTimeout(() => setShowSwipeHint(false), 3000);
      }
    }, 5000);
  }, []);

  // Clear all timeouts
  const clearAllTimeouts = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
  }, []);

  // Show dock function with faster hide duration
  const showDock = useCallback((duration: number = 1000) => { // Reduced from 2000 to 1000
    setIsVisible(true);
    clearAllTimeouts();
    
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, duration);
  }, [clearAllTimeouts]);

  // Enhanced edge swipe detection with scroll conflict prevention
  const handleEdgeSwipe = useCallback((event: TouchEvent | MouseEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const screenHeight = window.innerHeight;
    
    // Get touch coordinates
    let clientY: number;
    let startY: number;
    
    if ('touches' in event && event.touches.length > 0) {
      clientY = event.touches[0].clientY;
      startY = event.touches[0].pageY;
    } else if ('changedTouches' in event && event.changedTouches.length > 0) {
      clientY = event.changedTouches[0].clientY;
      startY = event.changedTouches[0].pageY;
    } else {
      clientY = (event as MouseEvent | PointerEvent).clientY;
      startY = clientY;
    }
    
    // STRICT CONDITIONS untuk avoid scroll conflict:
    const isInSwipeZone = clientY > screenHeight - 60; // Only bottom 60px
    const isUpwardSwipe = offset.y < -80; // Minimum 80px upward
    const isFastSwipe = velocity.y < -800; // High velocity requirement
    const isShortSwipe = Math.abs(offset.x) < 50; // Prevent horizontal scrolling
    
    // Only trigger if ALL conditions met
    if (isInSwipeZone && isUpwardSwipe && isFastSwipe && isShortSwipe) {
      // Prevent scrolling during dock activation
      event.preventDefault?.();
      event.stopPropagation?.();
      
      showDock(3000); // Show longer for intentional swipe
      setShowSwipeHint(false);
    }
  }, [showDock]);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detect scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);

      // Show dock on scroll movement (FASTER HIDE - reduced by 1 second)
      if (Math.abs(currentScrollY - lastScrollY) > 5 || currentScrollY > 100) {
        setIsVisible(true);
        clearAllTimeouts();
        
        // FASTER auto-hide timing
        scrollTimeoutRef.current = setTimeout(() => {
          hideTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
          }, 500); // Reduced from 1500 to 500ms
        }, 300); // Reduced from 800 to 300ms
      }

      // Section detection
      const sections = ["hero", "about", "skills", "projects"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    // Initial dock visibility with faster hide
    if (window.scrollY > 50) {
      showDock(2000); // Reduced from 3000 to 2000ms
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearAllTimeouts();
    };
  }, [mounted, lastScrollY, showDock, clearAllTimeouts]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    
    // Keep dock visible during navigation (faster hide)
    showDock(1500); // Reduced from 2500 to 1500ms
  };

  // Handle dock interaction with faster hide
  const handleDockInteraction = useCallback(() => {
    showDock(2000); // Reduced from 3000 to 2000ms
  }, [showDock]);

  const dockItems = [
    {
      icon: <Home className={`w-5 h-5 ${activeSection === "hero" ? "text-primary" : "text-white"}`} />,
      label: "Home",
      onClick: () => scrollToSection("hero"),
      className: activeSection === "hero" ? "bg-primary/20 border-primary" : "",
    },
    {
      icon: <User className={`w-5 h-5 ${activeSection === "about" ? "text-primary" : "text-white"}`} />,
      label: "About", 
      onClick: () => scrollToSection("about"),
      className: activeSection === "about" ? "bg-primary/20 border-primary" : "",
    },
    {
      icon: <Wrench className={`w-5 h-5 ${activeSection === "skills" ? "text-primary" : "text-white"}`} />,
      label: "Skills",
      onClick: () => scrollToSection("skills"),
      className: activeSection === "skills" ? "bg-primary/20 border-primary" : "",
    },
    {
      icon: <FolderOpen className={`w-5 h-5 ${activeSection === "projects" ? "text-primary" : "text-white"}`} />,
      label: "Projects",
      onClick: () => scrollToSection("projects"),
      className: activeSection === "projects" ? "bg-primary/20 border-primary" : "",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="md:hidden">
      {/* RESTRICTED Swipe Area - Only bottom 60px */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[60px] z-40"
        onPan={handleEdgeSwipe}
        style={{ 
          background: 'transparent',
          touchAction: 'pan-y manipulation', // Restricted touch actions
          pointerEvents: 'auto'
        }}
        // Prevent scroll propagation in swipe zone
        onTouchStart={(e) => {
          // Only prevent if in strict bottom zone
          const touch = e.touches[0];
          if (touch && touch.clientY > window.innerHeight - 60) {
            e.stopPropagation();
          }
        }}
      />

      {/* Enhanced Swipe Hint with zone indicator */}
      <AnimatePresence>
        {showSwipeHint && !isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-30"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-card/95 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground shadow-lg"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: 180,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 0.5 },
                    scale: { duration: 1, repeat: Infinity }
                  }}
                  className="text-primary text-lg"
                >
                  ↑
                </motion.div>
                <div className="flex flex-col">
                  <span className="font-medium">Swipe up for navigation</span>
                  <span className="text-xs opacity-70">From bottom edge</span>
                </div>
              </div>
            </motion.div>
            
            {/* Visual indicator for swipe zone */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="fixed bottom-0 left-0 right-0 h-[60px] bg-primary/10 border-t-2 border-primary/20 -z-10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dock */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ 
              y: 100, 
              opacity: 0,
              scale: 0.8 
            }}
            animate={{ 
              y: 0, 
              opacity: 1,
              scale: 1
            }}
            exit={{ 
              y: 100, 
              opacity: 0,
              scale: 0.8
            }}
            transition={{
              type: "spring",
              stiffness: 500, // Slightly faster animation
              damping: 35,
              mass: 0.7
            }}
            className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
            onTouchStart={handleDockInteraction}
            onMouseEnter={handleDockInteraction}
          >
            <Dock
              items={dockItems}
              magnification={60}
              distance={150}
              baseItemSize={45}
              panelHeight={40}
              className="dock-backdrop bg-card/95 backdrop-blur-xl border-border shadow-2xl mx-4 mb-4 rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      {!isVisible && activeSection !== "hero" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 z-30"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-3 h-3 bg-primary/60 rounded-full relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-primary/30 rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
"use client";
import dynamic from "next/dynamic";
import {useState, useRef, useEffect} from "react";
import {motion, useInView} from "framer-motion";

const Keycaps3D = dynamic(
  () => import("../../app/components/Keycaps/Keycaps"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Loading 3D Model...</span>
      </div>
    ),
  }
);

export default function Skills() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [loadingPhase, setLoadingPhase] = useState("initial"); // 'initial', 'loading', 'ready', 'animating', 'complete'
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, {once: true, margin: "-100px"});

  // Sequential loading management
  useEffect(() => {
    if (inView && loadingPhase === "initial") {
      setLoadingPhase("loading");

      const loadingTimer = setTimeout(() => {
        if (is3DLoaded) {
          setLoadingPhase("ready");
        }
      }, 700);

      return () => clearTimeout(loadingTimer);
    }
  }, [inView, loadingPhase, is3DLoaded]);

  // Trigger animasi setelah 3D loaded dan loading phase selesai
  useEffect(() => {
    if (loadingPhase === "ready") {
      const animationTimer = setTimeout(() => {
        setLoadingPhase("animating");
      }, 200);

      return () => clearTimeout(animationTimer);
    }
  }, [loadingPhase]);

  // Handle 3D model loaded
  const handle3DLoaded = () => {
    setIs3DLoaded(true);
    if (loadingPhase === "loading") {
      setLoadingPhase("ready");
    }
  };

  // Handle cascade animation complete
  const handleAnimationComplete = () => {
    setLoadingPhase("complete");
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Animated Header - REDUCED BOTTOM MARGIN */}
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
          transition={{duration: 0.6, ease: "easeOut"}}
          className="text-center mb-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive keycaps representing my technical expertise.
            <span className="text-primary font-medium">
              {" "}
              Hover to explore each technology
            </span>
          </p>
        </motion.div>

        {/* COMPACT Loading & Tech Info Display - REDUCED HEIGHT & MARGIN */}
        <div className="flex justify-center mb-4 h-[120px]">
          <div className="flex items-center justify-center max-w-lg w-full">
            {/* Simple Loading State - HANYA loading dots tanpa teks */}
            {(loadingPhase === "loading" || loadingPhase === "ready") && (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.3}}
                className="text-center"
              >
                <div className="flex items-center justify-center space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 0,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 0.2,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 0.4,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Tech Info Display - HANYA saat hover */}
            {loadingPhase === "complete" && hoveredTech && (
              <motion.div
                className="text-center"
                initial={{opacity: 0, scale: 0.9, y: 10}}
                animate={{opacity: 1, scale: 1, y: 0}}
                exit={{opacity: 0, scale: 0.9, y: -10}}
                transition={{duration: 0.25, ease: "easeOut"}}
              >
                <motion.h3
                  className="text-xl font-bold text-foreground mb-2"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.1}}
                >
                  {hoveredTech.name}
                </motion.h3>
                <motion.p
                  className="text-muted-foreground text-sm mb-3 leading-relaxed"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.15}}
                >
                  {hoveredTech.description}
                </motion.p>
                <motion.div
                  className="flex justify-center gap-3"
                  initial={{opacity: 0, y: 5}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.2}}
                >
                  {hoveredTech.level && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                      {hoveredTech.level}
                    </span>
                  )}
                  <span className="text-muted-foreground text-xs self-center">
                    •
                  </span>
                  <span className="text-muted-foreground text-xs font-medium self-center">
                    {hoveredTech.category}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* 3D Keycaps Container - REDUCED TOP MARGIN */}
        <motion.div
          initial={{opacity: 0, scale: 0.95}}
          animate={{
            opacity: inView ? 1 : 0,
            scale: inView ? 1 : 0.95,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="w-full flex justify-center items-center"
        >
          {/* CLEAN CONTAINER - tanpa text overlay */}
          <div className="w-full max-w-[1000px] h-[600px] flex justify-center items-center relative ml-8 md:ml-12 lg:ml-16">
            {/* Minimal Loading Overlay - HANYA spinner tanpa text */}
            <motion.div
              className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10"
              initial={{opacity: 1}}
              animate={{
                opacity:
                  loadingPhase === "animating" || loadingPhase === "complete"
                    ? 0
                    : 1,
              }}
              transition={{duration: 0.5}}
              style={{
                pointerEvents:
                  loadingPhase === "animating" || loadingPhase === "complete"
                    ? "none"
                    : "auto",
              }}
            >
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </motion.div>

            {/* 3D Component */}
            <Keycaps3D
              onHover={setHoveredTech}
              onLoaded={handle3DLoaded}
              startAnimation={loadingPhase === "animating"}
              onAnimationComplete={handleAnimationComplete}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

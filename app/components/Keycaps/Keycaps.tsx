"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useState, useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const keycapsGLB = "/assets/keycaps/keycaps.glb";

// ✅ ADD TYPE DEFINITIONS
interface TechInfo {
  name: string;
  description: string;
  level: string;
  category: string;
}

interface AnimatedKeycapGroupProps {
  keycap: THREE.Object3D;
  logo: THREE.Object3D | null;
  isHovered: boolean;
  onHover: (name: string, isHovering: boolean) => void;
  animationDelay?: number;
  startAnimation?: boolean;
  onAnimationComplete?: () => void;
}

interface Keycaps3DProps {
  onHover?: (techInfo: TechInfo | null) => void;
  onLoaded?: () => void;
  startAnimation?: boolean;
  onAnimationComplete?: () => void;
}

// Urutan animasi keycaps dengan timing yang lebih smooth
const KEYCAP_ANIMATION_ORDER = [
  'java', 'js', 'php', 'mysql', 'codeigniter', 
  'laravel', 'python', 'figma', 'springboot', 'fastapi'
];

// Enhanced Animation Config
const ANIMATION_CONFIG = {
  CASCADE_DELAY: 0.2, // 200ms delay antar keycap (lebih smooth)
  DROP_DURATION: 1.8, // 1.8 detik durasi animasi (lebih dramatic)
  DROP_HEIGHT: 10,    // Height dari mana keycap mulai jatuh
  BOUNCE_INTENSITY: 0.25, // Intensity bounce effect
  TOTAL_DURATION: 6.0 // Total durasi untuk semua animasi selesai
};

// Tech info database
const techInfo: Record<string, TechInfo> = {
  js: {
    name: "JavaScript",
    description: "Dynamic programming language for web development and interactive applications",
    level: "Intermediate",
    category: "Programming Language"
  },
  php: {
    name: "PHP",
    description: "Server-side scripting language for web development and backend systems",
    level: "Advanced",
    category: "Programming Language"
  },
  python: {
    name: "Python",
    description: "Versatile programming language for web development, data science, and automation",
    level: "Beginner",
    category: "Programming Language"
  },
  java: {
    name: "Java",
    description: "Object-oriented programming language for enterprise and Android development",
    level: "Beginner",
    category: "Programming Language"
  },
  laravel: {
    name: "Laravel",
    description: "Elegant PHP framework for rapid web application development",
    level: "Advanced",
    category: "Framework"
  },
  codeigniter: {
    name: "CodeIgniter",
    description: "Lightweight PHP framework with simple and elegant syntax",
    level: "Advanced",
    category: "Framework"
  },
  mysql: {
    name: "MySQL",
    description: "Reliable relational database management system for web applications",
    level: "Advanced",
    category: "Database"
  },
  fastapi: {
    name: "FastAPI",
    description: "Modern Python web framework for building high-performance APIs",
    level: "Beginner",
    category: "Framework"
  },
  figma: {
    name: "Figma",
    description: "Collaborative design tool for UI/UX design and prototyping",
    level: "Intermediate",
    category: "Design Tool"
  },
  springboot: {
    name: "Spring Boot",
    description: "Java framework for building production-ready microservices and web applications",
    level: "Beginner",
    category: "Framework"
  }
};

// ✅ FIXED: Enhanced clone function with proper types
function safeClone(object: THREE.Object3D): THREE.Object3D | null {
  if (!object) return null;
  
  try {
    const cloned = object.clone();
    
    if ((cloned as THREE.Mesh).material) {
      const mesh = cloned as THREE.Mesh;
      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((mat: THREE.Material) => {
          if (!mat) return mat;
          const clonedMat = mat.clone();
          
          if ('map' in mat && mat.map && mat.map instanceof THREE.Texture && mat.map.image) {
            clonedMat.transparent = true;
            if ('alphaTest' in clonedMat) clonedMat.alphaTest = 0.1;
            if ('side' in clonedMat) clonedMat.side = THREE.DoubleSide;
            if ('depthWrite' in clonedMat) clonedMat.depthWrite = false;
          }
          
          return clonedMat;
        });
      } else {
        mesh.material = mesh.material.clone();
        
        if ('map' in mesh.material && mesh.material.map && mesh.material.map instanceof THREE.Texture && mesh.material.map.image) {
          mesh.material.transparent = true;
          if ('alphaTest' in mesh.material) mesh.material.alphaTest = 0.1;
          if ('side' in mesh.material) mesh.material.side = THREE.DoubleSide;
          if ('depthWrite' in mesh.material) mesh.material.depthWrite = false;
        }
      }
    }
    
    return cloned;
  } catch (error) {
    console.warn('Failed to clone object:', error);
    return object;
  }
}

// ✅ FIXED: Enhanced material opacity function with proper types
function setMaterialOpacity(object: THREE.Object3D, opacity: number): void {
  // Only Mesh objects have 'material'
  if (!object || !(object instanceof THREE.Mesh)) return;

  try {
    const material = object.material;
    if (Array.isArray(material)) {
      material.forEach((mat: THREE.Material) => {
        if (mat && 'opacity' in mat && typeof mat.opacity !== 'undefined') {
          mat.opacity = opacity;

          if ('map' in mat && mat.map && mat.map instanceof THREE.Texture && mat.map.image) {
            mat.transparent = true;
            if ('alphaTest' in mat) mat.alphaTest = 0.1;
          } else {
            mat.transparent = opacity < 1;
          }

          mat.needsUpdate = true;
        }
      });
    } else if (material && 'opacity' in material && typeof material.opacity !== 'undefined') {
      material.opacity = opacity;

      if ('map' in material && material.map && material.map instanceof THREE.Texture && material.map.image) {
        material.transparent = true;
        if ('alphaTest' in material) material.alphaTest = 0.1;
      } else {
        material.transparent = opacity < 1;
      }

      material.needsUpdate = true;
    }
  } catch (error) {
    console.warn('Failed to set material opacity:', error);
  }
}

// ✅ FIXED: Enhanced AnimatedKeycapGroup with proper types
function AnimatedKeycapGroup({ 
  keycap, 
  logo, 
  isHovered, 
  onHover, 
  animationDelay = 0, 
  startAnimation = false,
  onAnimationComplete 
}: AnimatedKeycapGroupProps) {
  // ✅ ALL HOOKS FIRST - NO CONDITIONS BEFORE HOOKS
  const groupRef = useRef<THREE.Group>(null);
  const logoRef = useRef<THREE.Group>(null);
  const keycapRef = useRef<THREE.Object3D>(null);
  const logoMeshRef = useRef<THREE.Object3D>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animationStartTime, setAnimationStartTime] = useState<number | null>(null);
  
  // ✅ useMemo hooks with proper types
  const clonedKeycap = useMemo(() => safeClone(keycap), [keycap]);
  const clonedLogo = useMemo(() => logo ? safeClone(logo) : null, [logo]);
  
  // ✅ CALCULATE VALUES INSIDE HOOK - NO EARLY RETURNS
  const isValidKeycap = keycap && keycap.position && clonedKeycap;
  const initialY = isValidKeycap ? keycap.position.y + ANIMATION_CONFIG.DROP_HEIGHT : 0;
  const finalY = isValidKeycap ? keycap.position.y : 0;

  // ✅ useFrame MUST BE CALLED UNCONDITIONALLY
  useFrame((state, delta) => {
    // Early exit inside useFrame is OK
    if (!groupRef.current || !isValidKeycap) return;

    try {
      // Trigger animation start
      if (startAnimation && !animationStartTime && !hasAnimated) {
        setAnimationStartTime(state.clock.elapsedTime);
      }

      // Entrance Animation - Enhanced drop with bounce
      if (animationStartTime && !hasAnimated) {
        const elapsed = state.clock.elapsedTime - animationStartTime;
        const startTime = elapsed - animationDelay;
        
        if (startTime > 0) {
          const progress = Math.min(startTime / ANIMATION_CONFIG.DROP_DURATION, 1);
          
          if (progress < 1) {
            // Enhanced easing function untuk smooth bounce
            const easeOutBounce = (t: number): number => {
              const n1 = 7.5625;
              const d1 = 2.75;
              
              if (t < 1 / d1) {
                return n1 * t * t;
              } else if (t < 2 / d1) {
                return n1 * (t -= 1.5 / d1) * t + 0.75;
              } else if (t < 2.5 / d1) {
                return n1 * (t -= 2.25 / d1) * t + 0.9375;
              } else {
                return n1 * (t -= 2.625 / d1) * t + 0.984375;
              }
            };
            
            const easedProgress = easeOutBounce(progress);
            const currentY = THREE.MathUtils.lerp(initialY, finalY, easedProgress);
            
            groupRef.current.position.y = currentY;
            groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.2, 1, easedProgress));
            
            // Subtle rotation effect
            const rotationProgress = Math.sin(progress * Math.PI) * ANIMATION_CONFIG.BOUNCE_INTENSITY;
            groupRef.current.rotation.z = rotationProgress;
            
            // Enhanced opacity animation
            const opacity = THREE.MathUtils.lerp(0.2, 1, progress);
            if (keycapRef.current) {
              setMaterialOpacity(keycapRef.current, opacity);
            }
            if (logoMeshRef.current) {
              setMaterialOpacity(logoMeshRef.current, opacity);
            }
          } else {
            // Animation completed
            groupRef.current.position.y = finalY;
            groupRef.current.scale.setScalar(1);
            groupRef.current.rotation.z = 0;
            
            if (keycapRef.current) {
              setMaterialOpacity(keycapRef.current, 1);
            }
            if (logoMeshRef.current) {
              setMaterialOpacity(logoMeshRef.current, 1);
            }
            
            setHasAnimated(true);
            
            // Notify parent about animation completion
            if (onAnimationComplete) {
              setTimeout(() => onAnimationComplete(), 100);
            }
          }
        }
      }
      
      // Enhanced hover animation
      if (hasAnimated && groupRef.current) {
        const targetY = finalY + (isHovered ? 0.3 : 0);
        const targetScale = isHovered ? 1.1 : 1;
        
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y, 
          targetY, 
          delta * 12
        );
        
        groupRef.current.scale.setScalar(
          THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 10)
        );
      }
    } catch (error) {
      console.warn('Animation frame error:', error);
    }
    
    // Logo floating animation yang subtle
    if (logoRef.current && hasAnimated) {
      try {
        if (isHovered) {
          // Gaya lama: hanya subtle floating, tanpa rotation berlebihan
          logoRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.025;
        } else {
          // Kembali ke posisi normal dengan smooth lerp
          logoRef.current.position.y = THREE.MathUtils.lerp(logoRef.current.position.y, 0, delta * 18);
        }
      } catch (error) {
        console.warn('Logo animation error:', error);
      }
    }
  });

  // ✅ NOW conditional rendering is OK - AFTER all hooks
  if (!isValidKeycap) {
    console.warn('Invalid keycap object:', keycap);
    return null;
  }

  return (
    <group
      ref={groupRef}
      position={[keycap.position.x, hasAnimated ? finalY : initialY, keycap.position.z]}
      onPointerEnter={(e) => {
        e.stopPropagation();
        if (hasAnimated && onHover && keycap.name) {
          onHover(keycap.name, true);
        }
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        if (hasAnimated && onHover && keycap.name) {
          onHover(keycap.name, false);
        }
      }}
    >
      {/* Keycap mesh */}
      <primitive 
        ref={keycapRef}
        object={clonedKeycap}
      />
      
      {/* Logo dengan GAYA LAMA - tanpa rotation berlebihan */}
      {clonedLogo && logo && (
        <group
          ref={logoRef}
          position={[
            logo.position.x - keycap.position.x,
            logo.position.y - keycap.position.y,
            logo.position.z - keycap.position.z
          ]}
        >
          <primitive 
            ref={logoMeshRef}
            object={clonedLogo}
          />
        </group>
      )}

      {/* Enhanced glow effect */}
      {isHovered && hasAnimated && (
        <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1.2, 32]} />
          <meshBasicMaterial 
            color="#60a5fa" 
            transparent 
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

export default function Keycaps3D({ 
  onHover, 
  onLoaded, 
  startAnimation = false, 
  onAnimationComplete 
}: Keycaps3DProps) {
  const { scene } = useGLTF(keycapsGLB);
  const [hoveredKeycap, setHoveredKeycap] = useState<string | null>(null);

  // POSISI TETAP SAMA
  const positionX = 0;
  const positionY = -4.4;
  const positionZ = -2.8;
  const rotationX = 0;
  const rotationY = -120;
  const rotationZ = 0;
  const scaleX = 1.5;
  const scaleY = 1.5;
  const scaleZ = 1.5;
  const cameraX = 6;
  const cameraY = 4;
  const cameraZ = 6;

  const rotationRadians: [number, number, number] = [
    (rotationX * Math.PI) / 180,
    (rotationY * Math.PI) / 180,
    (rotationZ * Math.PI) / 180,
  ];

  // Notify parent when 3D scene is loaded
  useEffect(() => {
    if (scene && onLoaded) {
      const timer = setTimeout(() => {
        onLoaded();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [scene, onLoaded]);

  // ✅ SIMPLIFIED animation tracking without unused state
  const handleKeycapAnimationComplete = () => {
    // Simple timeout-based completion check
    if (onAnimationComplete) {
      setTimeout(() => {
        onAnimationComplete();
      }, ANIMATION_CONFIG.TOTAL_DURATION * 1000);
    }
  };

  // Enhanced keycap mapping
  const keycapLogoMapping = useMemo(() => {
    if (!scene || !scene.children) {
      console.warn('Scene not loaded yet');
      return [];
    }

    try {
      const keycaps = scene.children.slice(0, 10).filter(child => child && child.position);
      const logos = scene.children.slice(10).filter(child => child && child.position);
      
      const mappedKeycaps = keycaps
        .map((keycap) => {
          if (!keycap || !keycap.name) return undefined;
          
          const keycapName = keycap.name.toLowerCase();
          
          const matchingLogo = logos.find((logo) => {
            if (!logo || !logo.name) return false;
            
            const logoName = logo.name.toLowerCase();
            
            if (keycapName.includes('js') && logoName.includes('js')) return true;
            if (keycapName.includes('php') && logoName.includes('php')) return true;
            if (keycapName.includes('python') && logoName.includes('python')) return true;
            if (keycapName.includes('java') && logoName.includes('java') && !logoName.includes('script')) return true;
            if (keycapName.includes('laravel') && logoName.includes('laravel')) return true;
            if (keycapName.includes('codeigniter') && logoName.includes('codeigniter')) return true;
            if (keycapName.includes('mysql') && logoName.includes('mysql')) return true;
            if (keycapName.includes('fastapi') && logoName.includes('fastapi')) return true;
            if (keycapName.includes('figma') && logoName.includes('figma')) return true;
            if (keycapName.includes('springboot') && logoName.includes('springboot')) return true;
            
            return false;
          });
          
          let animationOrder = KEYCAP_ANIMATION_ORDER.length;
          
          for (let i = 0; i < KEYCAP_ANIMATION_ORDER.length; i++) {
            if (keycapName.includes(KEYCAP_ANIMATION_ORDER[i])) {
              animationOrder = i;
              break;
            }
          }
          
          return {
            keycap,
            logo: matchingLogo || null,
            animationOrder,
            animationDelay: animationOrder * ANIMATION_CONFIG.CASCADE_DELAY
          };
        })
        .filter((item): item is {
          keycap: THREE.Object3D;
          logo: THREE.Object3D | null;
          animationOrder: number;
          animationDelay: number;
        } => !!item);

      return mappedKeycaps.sort((a, b) => a.animationOrder - b.animationOrder);
    } catch (error) {
      console.warn('Error mapping keycaps:', error);
      return [];
    }
  }, [scene]);

  const handleHover = (keycapName: string, isHovering: boolean) => {
    if (!keycapName) return;
    
    try {
      setHoveredKeycap(isHovering ? keycapName : null);
      document.body.style.cursor = isHovering ? "pointer" : "default";
      
      if (onHover) {
        if (isHovering) {
          const techKey = Object.keys(techInfo).find(key => 
            keycapName.toLowerCase().includes(key)
          );
          if (techKey) {
            onHover(techInfo[techKey]);
          }
        } else {
          onHover(null);
        }
      }
    } catch (error) {
      console.warn('Error handling hover:', error);
    }
  };

  return (
    <div className="w-full h-full">
      <Canvas 
        className="w-full h-full"
        camera={{ 
          position: [cameraX, cameraY, cameraZ],
          fov: 45,
          near: 0.1,
          far: 1000 
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        onError={(error) => console.warn('Canvas error:', error)}
      >
        <ambientLight intensity={0.7} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          castShadow 
        />
        <directionalLight 
          position={[-5, 8, 3]} 
          intensity={0.8} 
          color="#ffffff"
        />
        <pointLight 
          position={[0, 12, 0]} 
          intensity={0.6} 
          color="#ffffff"
        />
        
        {/* Enhanced group dengan smooth rendering */}
        <group 
          position={[positionX, positionY, positionZ]} 
          rotation={rotationRadians}
          scale={[scaleX, scaleY, scaleZ]}
        >
          {keycapLogoMapping.map(({ keycap, logo, animationDelay }, i) => (
            <AnimatedKeycapGroup
              key={keycap?.uuid || `keycap-${i}`}
              keycap={keycap}
              logo={logo}
              isHovered={hoveredKeycap === keycap?.name}
              onHover={handleHover}
              animationDelay={animationDelay}
              startAnimation={startAnimation}
              onAnimationComplete={handleKeycapAnimationComplete}
            />
          ))}
        </group>
        
        <OrbitControls 
          enableZoom={true}
          maxDistance={15}
          minDistance={6}
          enablePan={false}
          enableRotate={true}
          target={[positionX, positionY, positionZ]}
          enableDamping={true}
          dampingFactor={0.03}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
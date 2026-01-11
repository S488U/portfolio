import { motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";

const Home = () => {
  const containerRef = useRef(null);

  const controlsH1 = useAnimation();
  const controlsH2 = useAnimation();
  const controlsH3 = useAnimation();

  // Only track if interaction happened to show the button
  const [isMoved, setIsMoved] = useState(false);

  const handleReset = () => {
    // Animate all back to 0,0 with a heavy spring feel
    const resetTransition = { type: "spring", stiffness: 300, damping: 25 };

    controlsH1.start({ x: 0, y: 0, transition: resetTransition });
    controlsH2.start({ x: 0, y: 0, transition: resetTransition });
    controlsH3.start({ x: 0, y: 0, transition: resetTransition });

    setIsMoved(false);
  };

  // Shared physics configuration for consistent "weight" and feel
  const physicsProps = {
    drag: true,
    dragConstraints: containerRef,
    dragElastic: 0.2, // Adds resistance at the edges (0 to 1)
    dragMomentum: true, // Allows "throwing" the element
    dragTransition: { power: 0.2, timeConstant: 200 }, // Friction physics
    whileDrag: {
      scale: 1.05,
      cursor: "grabbing",
      textShadow: "-1px 5px 15px rgba(47,46,46,0.5)",
    },
    onDragStart: () => setIsMoved(true),
  };

  return (
    <div
      id="home"
      ref={containerRef}
      className="w-full h-screen flex flex-col justify-center items-center gap-y-8 overflow-hidden"
    >
      <motion.h1
        className="font-nature text-3xl md:text-6xl cursor-grab"
        animate={controlsH1}
        {...physicsProps}
      >
        Hey,
      </motion.h1>

      <motion.h1
        className="font-nature text-5xl md:text-8xl cursor-grab"
        animate={controlsH2}
        {...physicsProps}
      >
        I&apos;m Shahabas
      </motion.h1>

      <motion.h1
        className="font-nature text-3xl cursor-grab z-10"
        animate={controlsH3}
        {...physicsProps}
      >
        A Developer
      </motion.h1>

      {/* Animated Decorative Triangle */}
      <motion.div
        className="absolute -z-10 bottom-2 w-0 h-0 border-l-80 border-l-transparent border-r-80 border-r-transparent border-b-140 border-b-black"
        animate={{
          rotateY: [0, 10, -10, 0],
          y: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.1,
          rotateY: 20,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      />

      {/* Reset Button */}
      {isMoved && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-black text-white rounded-full text-lg px-5 py-1 absolute bottom-2 right-2 cursor-pointer z-50"
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
      )}
    </div>
  );
};

export default Home;

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const Home = () => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState({
    h1: { x: 0, y: 0 },
    h2: { x: 0, y: 0 },
    h3: { x: 0, y: 0 },
  });

  const handleReset = () => {
    setPositions({
      h1: { x: 0, y: 0 },
      h2: { x: 0, y: 0 },
      h3: { x: 0, y: 0 },
    });
  };

  const handleDragEnd = (id, info) => {
    setPositions((prev) => ({
      ...prev,
      [id]: {
        x: prev[id].x + info.offset.x,
        y: prev[id].y + info.offset.y,
      },
    }));
  };

  const isResetVisible = Object.values(positions).some(
    (pos) => pos.x !== 0 || pos.y !== 0
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col justify-center items-center gap-y-8 overflow-hidden"
    >
      {/* Draggable Text Elements */}
      <motion.h1
        className="font-nature text-3xl md:text-6xl cursor-grabbing"
        drag
        dragConstraints={containerRef}
        onDragEnd={(e, info) => handleDragEnd("h1", info)}
        animate={positions.h1}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        whileDrag={{
          scale: 1.05,
          textShadow: "-1px 5px 7px rgba(47,46,46,0.39)",
        }}
      >
        Hey,
      </motion.h1>

      <motion.h1
        className="font-nature cursor-grabbing text-5xl md:text-8xl"
        drag
        dragConstraints={containerRef}
        onDragEnd={(e, info) => handleDragEnd("h2", info)}
        animate={positions.h2}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        whileDrag={{
          scale: 1.05,
          textShadow: "-1px 5px 7px rgba(47,46,46,0.39)",
        }}
      >
        I&apos;m Shahabas
      </motion.h1>

      <motion.h1
        className="font-nature text-3xl cursor-grabbing z-1"
        drag
        dragConstraints={containerRef}
        onDragEnd={(e, info) => handleDragEnd("h3", info)}
        animate={positions.h3}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        whileDrag={{
          scale: 1.05,
          textShadow: "-1px 5px 7px rgba(47,46,46,0.39)",
        }}
      >
        A Developer
      </motion.h1>

      {/* Animated Decorative Triangle */}
      <motion.div
        className="absolute -z-10 bottom-2 w-0 h-0 border-l-80 border-l-transparent border-r-80 border-r-transparent border-b-140 border-b-black"
        animate={{
          rotateY: [0, 10, -10, 0],
          translateY: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{
          scale: 1.1,
          rotateY: 20,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      ></motion.div>

      {/* Reset Button */}
      {isResetVisible && (
        <motion.button
          className="bg-black text-white rounded-full text-lg px-5 py-1 absolute bottom-2 right-2 cursor-pointer"
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          Reset
        </motion.button>
      )}
    </div>
  );
};

export default Home;

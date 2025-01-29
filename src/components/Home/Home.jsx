import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const Home = () => {
  const containerRef = useRef(null);

  // State to track draggable elements' positions
  const [positions, setPositions] = useState({
    h1: { x: 0, y: 0 },
    h2: { x: 0, y: 0 },
    h3: { x: 0, y: 0 },
  });

  const handleReset = () => {
    // Reset positions to defaults
    setPositions({
      h1: { x: 0, y: 0 },
      h2: { x: 0, y: 0 },
      h3: { x: 0, y: 0 },
    });
  };

  const handleDragEnd = (id, info) => {
    // Update the position of the dragged element
    setPositions((prev) => ({
      ...prev,
      [id]: { x: info.offset.x, y: info.offset.y },
    }));
  };

  const isResetVisible =
    positions.h1.x !== 0 || positions.h2.x !== 0 || positions.h3.x !== 0;

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-screen flex flex-col justify-center items-center gap-y-8 overflow-hidden"
      >
        {/* Draggable Text */}
        <motion.h1
          className="font-nature text-3xl md:text-6xl cursor-grabbing "
          drag
          dragConstraints={containerRef}
          onDragEnd={(e, info) => handleDragEnd("h1", info)}
          animate={{ x: positions.h1.x, y: positions.h1.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          whileDrag={{ scale: 1.05 }}
        >
          Hey,
        </motion.h1>
        <motion.h1
          className="font-nature cursor-grabbing text-5xl md:text-8xl"
          drag
          dragConstraints={containerRef}
          onDragEnd={(e, info) => handleDragEnd("h2", info)}
          animate={{ x: positions.h2.x, y: positions.h2.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          whileDrag={{ scale: 1.05 }}
        >
          I{"'"}am Shahabas
        </motion.h1>
        <motion.h1
          className="font-nature text-3xl cursor-grabbing"
          drag
          dragConstraints={containerRef}
          onDragEnd={(e, info) => handleDragEnd("h3", info)}
          animate={{ x: positions.h3.x, y: positions.h3.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          whileDrag={{ scale: 1.05 }}
        >
          A Developer
        </motion.h1>

        <div className="absolute -z-10 bottom-2 w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[140px] border-b-black"></div>

        {/* Conditionally Render Reset Button */}
        {isResetVisible && (
          <button
            className="bg-black text-white rounded-full text-lg px-5 py-1 absolute bottom-2 right-2"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
    </>
  );
};

export default Home;

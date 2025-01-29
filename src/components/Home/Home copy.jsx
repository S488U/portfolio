import { motion } from 'framer-motion';
import { useRef } from 'react';
import Box from "../Elements/Box";

const Home = () => {
  const containerRef = useRef(null);

  return (
    <>
      <div
        ref={containerRef}
        className='w-full h-screen flex flex-col justify-center items-center text-8xl gap-y-8 overflow-hidden'
      >
        <motion.h1
          className="font-nature text-6xl cursor-grabbing "
          drag
          dragConstraints={containerRef}
        >
          Hey,
        </motion.h1>
        <motion.h1
          className="font-nature cursor-grabbing"
          drag
          dragConstraints={containerRef}
        >
          I${"'"}am Shahabas
        </motion.h1>
        <motion.h1
          className="font-nature text-3xl cursor-grabbing "
          drag
          dragConstraints={containerRef}
        >
          A Developer
        </motion.h1>
        <button className='bg-black text-white rounded-full text-lg px-4 absolute bottom-2 right-2'>Reset</button>
      </div>
      <Box height="100px" width="300px" bgColor="bg-red-500" />
    </>
  );
};

export default Home;

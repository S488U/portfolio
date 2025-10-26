import { useState } from "react";
import { motion } from "framer-motion";
import TextHeader from "../Elements/TextHeader";
import ProjectCard from "../Elements/ProjectCard";
import Modal from "../Elements/Modal.jsx";
import Data from "../Data/Data.json";
import BreakLine from "../Elements/BreakLine";
import useRandomColors from "../../hooks/useRandomColors";

const Projects = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const bgColors = useRandomColors(Data.projects.length, reloadKey);

  const reload = () => setReloadKey((prev) => prev + 1);

  const handleView = (project, color) => {
    setSelectedProject({ ...project, bgColor: color });
    setShowModal(true);
  };

  return (
    <div
      id="project"
      className="w-full h-auto flex flex-col justify-around items-center overflow-hidden scroll-mt-18 md:scroll-mt-14 my-8 p-4"
    >
      <div className="w-full max-w-5xl space-y-4">
        <TextHeader text="Projects" />

        <motion.div
          id="reload"
          key={reloadKey}
          layout
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          className="w-auto grid grid-cols-1 sx-grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {Data.projects.map((item, index) => {
            if (item.ready === true)
              return (
                <ProjectCard
                  key={item.id}
                  id={item.id}
                  heading={item.heading}
                  desc={item.desc}
                  url={item.url}
                  hosted={item.hosted}
                  image={item.image}
                  onView={() => handleView(item, bgColors[index])}
                  bgColor={bgColors[index]}
                />
              );
          })}
        </motion.div>

        <div className="flex flex-col justify-center items-center text-center ">
          <p className="text-sm text-grey mt-3">
            Not a fan of the card color? Well, guess what – you can change it as
            many times as you like! 🎨😎
          </p>
          <motion.button
            onClick={reload}
            className="rounded-full bg-black text-white text-sm py-2 px-4 mt-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.85 }}
          >
            Change Colour
          </motion.button>
        </div>

        <BreakLine />
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={selectedProject || {}}
      />
    </div>
  );
};

export default Projects;

import { useState } from "react";
import { motion } from "framer-motion";
import TextHeader from "../Elements/TextHeader";
import ProjectCard from "../Elements/ProjectCard";
import Data from "../Data/Data.json";
import BreakLine from "../Elements/BreakLine";

const Projects = () => {
    const [reloadKey, setReloadKey] = useState(0);

    const reload = () => {
        setReloadKey((prevKey) => prevKey + 1);
    };

    return (
        <div id="project" className="w-full h-auto flex flex-col justify-around items-center overflow-hidden my-8 p-4">
            <div className="w-full max-w-5xl space-y-4">
                <TextHeader text="Projects" />
                <div
                    id="reload"
                    key={reloadKey} 
                    className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {Data.projects.map((item) => (
                        <ProjectCard
                            key={item.id}
                            heading={item.heading}
                            desc={item.desc}
                            url={item.url}
                            hosted={item.hosted}
                            image={item.image}
                        />
                    ))}
                </div>
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
        </div>
    );
};

export default Projects;

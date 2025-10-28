import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ProjectCard = ({
  heading,
  desc,
  image,
  hosted,
  onView,
  id,
  bgColor,
  url,
}) => {
  return (
    <motion.div
      layoutId={`modal-${id}`}
      className="border border-grey rounded-lg p-1 h-[250px] shadow-lg cursor-pointer"
      onClick={() => onView({ heading, desc, image, hosted, id, url })}
    >
      <div
        className="w-full h-[170px] rounded-lg flex flex-col justify-center items-start text-lg pl-5"
        style={{ backgroundColor: bgColor || "#E0F2F1" }}
      >
        <h1 className="text-4xl font-nature">{heading}</h1>
        <p className="font-nature">{desc}</p>
      </div>
      <div className="w-full bg-grey-800 h-[65px] flex flex-row justify-around items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <img
            className="aspect-square object-contain"
            src={image}
            height="45"
            width="45"
            alt={hosted}
          />
          <p className="max-w-[100px] text-sm">{hosted}</p>
        </div>
        <motion.span
          className="bg-black text-white rounded-full p-1 px-5"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.85 }}
        >
          Read more..
        </motion.span>
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  heading: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  hosted: PropTypes.string.isRequired,
  onView: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  bgColor: PropTypes.string, // new prop
  url: PropTypes.objectOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      bg: PropTypes.string,
      color: PropTypes.string,
    })
  ),
};

export default ProjectCard;

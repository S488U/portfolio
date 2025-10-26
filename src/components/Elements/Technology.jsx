import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Technology = (props) => {
  let content = props.content;

  const mobile = window.innerWidth <= 765;
  const tapClick = mobile ? 1.2 : 0.5;
  return (
    <motion.p
      className="flex flex-row justify-center items-center max-w-fit max-h-8 whitespace-nowrap py-1 px-4 rounded-full bg-green-200 border border-green-300 text-green-900 select-none cursor-pointer"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: tapClick }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span className="text-sm">{content}</span>
    </motion.p>
  );
};

Technology.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Technology;

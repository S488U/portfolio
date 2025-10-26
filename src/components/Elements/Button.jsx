import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Button = ({ name, url, bg = "bg-black", color = "text-white" }) => {
  const border = bg === "bg-black" ? "border" : "border border-black";

  return (
    <motion.a
      target="_blank"
      href={url}
      className={`${bg} ${color} rounded-full py-0.5 md:py-1 px-4 sm:text-sm text-md capitalize mr-2 ${border} inline-block`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.85 }}
    >
      {name}
    </motion.a>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  bg: PropTypes.string,
  color: PropTypes.string,
};

export default Button;

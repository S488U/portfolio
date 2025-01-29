import PropTypes from "prop-types";

const UpArrowIcon = ({ size = 24, color = "black" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V6M12 6l-5 5M12 6l5 5"/>
    </svg>
  );
};

UpArrowIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

export default UpArrowIcon;

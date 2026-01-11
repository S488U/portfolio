import PropTypes from 'prop-types';

const BreakLine = ({ bgcolor = "black" }) => {
  return (
    <div className="w-full h-3 skew-x-12 relative z-[-1]" style={{ backgroundColor: bgcolor }}></div>
  );
};

BreakLine.propTypes = {
  bgcolor: PropTypes.string,
};

export default BreakLine;

import PropTypes from 'prop-types';

const BreakLine = ({bgcolor}) => {
  return (
    <div className="w-full h-[12px] skew-x-12 relative z-[-1]" style={{ backgroundColor: bgcolor || "black"}}></div>
  )
}

export default BreakLine

BreakLine.propTypes = {
  bgcolor: PropTypes.string.isRequired,
}
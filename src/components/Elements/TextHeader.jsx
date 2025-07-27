import PropTypes from "prop-types"

const TextHeader = ({ text }) => {
  return (
    <h1 className="text-4xl text-white bg-black inline-block">&#47;&#42; {text || ""} &#42;&#47;</h1>
  )
}

TextHeader.propTypes = {
  text: PropTypes.string.isRequired,
}

export default TextHeader

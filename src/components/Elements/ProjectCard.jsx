import PropTypes from 'prop-types';

const ProjectCard = (props) => {
  const mildColors = [
    '#FEF4E3', // Light Cream
    '#F0E5D8', // Pale Beige
    "#F8F0E3", // Ivory
    "#FFF7D6", // Soft Yellow
    "#FAF1DD", // Light Peach
    "#FDEFEF", // Pale Pink
    "#FBE8F4", // Light Rose
    "#EDE4FF", // Soft Lavender
    "#DDEFFD", // Light Blue
    "#CFF7FF", // Pale Aqua
    "#D6FFF7", // Light Teal
    "#E6FFF2", // Soft Mint
    "#F2FFE6", // Pale Green
    "#FFF6E6", // Light Apricot
    "#FFF0F0", // Blush Pink
    "#F0F8FF", // Alice Blue
    "#F5FFFA", // Mint Cream
    "#FAFAD2", // Light Goldenrod Yellow
    "#FFFACD", // Lemon Chiffon
    "#FFFDD0", // Cream
    "#F0FFF0", // Honeydew
    "#F0FFFF", // Azure
    "#F5F5DC", // Beige
    "#E3F9E5", // Light Pastel Green
    "#FFFAF0", // Floral White
    "#FFF8DC", // Cornsilk
    "#FAEBD7", // Antique White
    "#FDF5E6", // Old Lace
    "#FFFFF0", // Ivory
    "#F8F9F9", // Ghost White
    "#FFF5EE", // Seashell
    "#F0F4F8", // Light Periwinkle
    "#FFFAFA", // Snow
    "#F5F5F5", // White Smoke
    "#EAE7DC", // Warm Cream
    "#EEEDE7", // Soft Linen
    "#E2D7C8", // Sandstone Beige
    "#D8D8D8", // Light Gray
    "#F4EBD0", // Pastel Yellow
    "#F6DFEB", // Pale Orchid
    "#EAD8E0", // Soft Mauve
    "#DBE6EF", // Light Ice Blue
    "#D8F3DC", // Fresh Mint Green
    "#E6D0DE", // Soft Pink Champagne
    "#E1E7DD", // Misty Green
  ];

  const getRandomMildColor = () => {
    const randomIndex = Math.floor(Math.random() * mildColors.length);
    return mildColors[randomIndex];
  };

  return (
    <div
      className="border border-grey rounded-lg p-1 h-[250px] shadow-lg"
    >
      <div className="w-full h-[170px] rounded-lg flex flex-col justify-center items-start text-lg pl-5"
        style={{ backgroundColor: getRandomMildColor() }}>
        <h1 className="text-4xl font-nature">{props.heading}</h1>
        <p className="font-nature">{props.desc}</p>
      </div>
      <div className="w-full bg-grey-800 h-[65px] flex flex-row justify-around items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <img src={props.image} height="45" width="45" alt="GitHub" />
          <p className="max-w-[100px] text-sm">{props.hosted}</p>
        </div>
        <a href={props.url} className="bg-black text-white rounded-full p-1 px-5">
          View
        </a>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  heading: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  hosted: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ProjectCard;

import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Technology from "./Technology.jsx";
import Render from "./Render.jsx";
import Button from "./Button";

const Modal = ({ show, onClose, data }) => {
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (show) {
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "";
    };
  }, [show]);

  const technologiesArray = data.technologies || ["No Technology specified"];
  const urlsArray = data.url ? Object.entries(data.url) : [];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/60 z-50 flex justify-center items-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            layoutId={`modal-${data.id}`}
            className="bg-white w-[95%] md:w-[90%] h-[88%] overflow-y-auto remove-scroll mt-[4.5em] mb-[0.5em] rounded-2xl py-2 px-2 p-md-6  z-60 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-2 top-2" onClick={onClose}>
              <motion.div
                onClick={onClose}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                className=" h-5 w-5 sm:w-7 sm:h-7 font-medium sm:font-light text-xs sm:text-lg bg-black text-white rounded-full flex justify-center items-center hover:bg-red-500 cursor-pointer outline-3 outline-white"
                aria-label="close"
              >
                &#x2715;
              </motion.div>
            </div>

            <div className="w-full h-full @container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  style={{ backgroundColor: data.bgColor || "#E0F2F1" }}
                  className="rounded-2xl  p-6 border"
                >
                  <h2 className="text-4xl font-nature my-4">{data.heading}</h2>
                  <p className="text-lg font-nature">{data.desc}</p>
                </div>
                <div className="flex flex-col p-2 md:p-6 ">
                  <h1 className="font-nature font-light my-2">
                    Technologies Used:
                  </h1>
                  <div className="flex flex-wrap justify-start content-start gap-3">
                    {technologiesArray.map((item, i) => (
                      <Technology content={item} key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col border rounded-xl my-2 p-3 max-h-fit max-w-none w-full">
                <div className="w-full h-auto mt-1 mb-3 mx-0">
                  {urlsArray.map(([key, value]) => (
                    <Button
                      key={key}
                      name={key}
                      url={value.link}
                      color={value.color}
                      bg={value.bg}
                    />
                  ))}
                </div>
                <Render content={data.brief || ""} />
              </div>
              <div className="h-px"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    heading: PropTypes.string,
    desc: PropTypes.string,
    image: PropTypes.string,
    hosted: PropTypes.string,
    technologies: PropTypes.array,
    brief: PropTypes.string,
    url: PropTypes.objectOf(
      PropTypes.shape({
        link: PropTypes.string.isRequired,
        bg: PropTypes.string,
        color: PropTypes.string,
      })
    ),
    bgColor: PropTypes.string,
  }).isRequired,
};

export default Modal;

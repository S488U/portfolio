import {
  lazy,
  Suspense,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import TextHeader from "../Elements/TextHeader";
import ProjectCard from "../Elements/ProjectCard";
import Data from "../Data/Data.json";
import BreakLine from "../Elements/BreakLine";
import useRandomColors from "../../hooks/useRandomColors";

const importModal = () => import("../Elements/Modal.jsx");

const Modal = lazy(importModal);

const getProjectSlug = (project) => {
  if (project.slug) {
    return String(project.slug).toLowerCase();
  }

  return project.heading
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const Projects = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPrefetched, setIsPrefetched] = useState(false);

  const sectionRef = useRef(null);
  const bgColors = useRandomColors(Data.projects.length, reloadKey);

  useEffect(() => {
    if (isPrefetched || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          importModal();
          setIsPrefetched(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "150px",
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [isPrefetched]);

  const findProjectBySlug = useCallback((slug) => {
    const index = Data.projects.findIndex((p) => getProjectSlug(p) === slug);
    if (index !== -1) {
      return { project: Data.projects[index], index };
    }

    return null;
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("project");

    if (slug) {
      const match = findProjectBySlug(slug);

      if (match) {
        // If not loaded the Modal code. we load it fast to ensure the working of slug.
        if (!isPrefetched) {
          importModal();
          setIsPrefetched(true);
        }

        setSelectedProject({
          ...match.project,
          bgColor: bgColors[match.index],
        });

        setShowModal(true);
      }

      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentSlug = currentParams.get("project");

      if (currentSlug) {
        const match = findProjectBySlug(currentSlug);
        if (match) {
          setSelectedProject({
            ...match.project,
            bgColor: bgColors[match.index],
          });

          setShowModal(true);
        }
      } else {
        setShowModal(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [bgColors, findProjectBySlug, isPrefetched]);

  const handleView = (project, color) => {
    setSelectedProject({ ...project, bgColor: color });
    setShowModal(true);

    const slug = getProjectSlug(project);
    const newUrl = `${window.location.pathname}?project=${slug}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const handleClose = () => {
    setShowModal(false);
    window.history.pushState({}, "", window.location.pathname);
  };

  const reload = () => setReloadKey((prev) => prev + 1);

  return (
    <div
      id="project"
      className="w-full h-auto flex flex-col justify-around items-center overflow-hidden scroll-mt-18 md:scroll-mt-14 my-8 p-4"
      ref={sectionRef}
    >
      <div className="w-full max-w-5xl space-y-4">
        <TextHeader text="Projects" />

        <motion.div
          id="reload"
          key={reloadKey}
          layout
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          className="w-auto grid grid-cols-1 sx-grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {Data.projects.map((item, index) => {
            if (item.ready === true)
              return (
                <ProjectCard
                  key={item.id}
                  id={item.id}
                  heading={item.heading}
                  desc={item.desc}
                  url={item.url}
                  hosted={item.hosted}
                  image={item.image}
                  onView={() => handleView(item, bgColors[index])}
                  bgColor={bgColors[index]}
                />
              );
          })}
        </motion.div>

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

      {showModal && (
        <Suspense fallback={null}>
          <Modal
            show={showModal}
            onClose={handleClose}
            data={selectedProject || {}}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Projects;

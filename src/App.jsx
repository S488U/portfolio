import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import useGpuAvailable from "./hooks/useGpuAvailable.js";

import Loader from "./components/Elements/Loader.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

const Home = lazy(() => import("./components/Home/Home.jsx"));
const About = lazy(() => import("./components/About/About.jsx"));
const Projects = lazy(() => import("./components/Projects/Projects.jsx"));
const Contact = lazy(() => import("./components/Contact/Contact.jsx"));
const Footer = lazy(() => import("./components/Footer/Footer.jsx"));

const App = () => {
  const { available, name } = useGpuAvailable();

  useEffect(() => {
    if (available === true) {
      console.log("GPU Available:", name);
    } else if (available === false) {
      console.log("GPU Available: false\nNo GPU Detected");
    }
  }, [available, name]);

  return (
    <div>
      <Navbar />
      <main>
        <Toaster position="top-right" reverseOrder={false} />
        <Suspense fallback={<Loader />}>
          <Home />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default App;

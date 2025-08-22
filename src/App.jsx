import { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Toaster } from "react-hot-toast";

import useGpuAvailable from "./hooks/useGpuAvailable.js";

const Home = lazy(() => import("./components/Home/Home.jsx"));
const About = lazy(() => import("./components/About/About.jsx"));
const Projects = lazy(() => import("./components/Projects/Projects.jsx"));
const Contact = lazy(() => import("./components/Contact/Contact.jsx"));
const Footer = lazy(() => import("./components/Footer/Footer.jsx"));

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <span className="w-1 h-5 bg-black rounded-lg animate-scaleUp"></span>
    <span
      className="w-1 h-9 mx-1 bg-black rounded-lg animate-scaleUp"
      style={{ animationDelay: "150ms" }}
    ></span>
    <span
      className="w-1 h-5 bg-black rounded-lg animate-scaleUp"
      style={{ animationDelay: "300ms" }}
    ></span>
  </div>
);

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

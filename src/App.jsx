import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./components/Home/Home.jsx"));
const About = lazy(() => import("./components/About/About.jsx"));
const Projects = lazy(() => import("./components/Projects/Projects.jsx"));
const Contact = lazy(() => import("./components/Contact/Contact.jsx"));
const Footer = lazy(() => import("./components/Footer/Footer.jsx"));

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <span className="w-1 h-5 bg-black rounded-lg animate-scaleUp"></span>
    <span className="w-1 h-9 mx-1 bg-black rounded-lg animate-scaleUp" style={{ animationDelay: "150ms" }}></span>
    <span className="w-1 h-5 bg-black rounded-lg animate-scaleUp" style={{ animationDelay: "300ms" }}></span>
  </div>
);

const App = () => {
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

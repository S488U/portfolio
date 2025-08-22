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

export default Loader;
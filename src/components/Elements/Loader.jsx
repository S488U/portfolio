const Loader = () => (
  <div className="flex items-center justify-center h-screen" role="status" aria-label="Loading">
    <span className="w-1 h-5 bg-black rounded-lg animate-scale-up"></span>
    <span
      className="w-1 h-9 mx-1 bg-black rounded-lg animate-scale-up"
      style={{ animationDelay: "150ms" }}
    ></span>
    <span
      className="w-1 h-5 bg-black rounded-lg animate-scale-up"
      style={{ animationDelay: "300ms" }}
    ></span>
  </div>
);

export default Loader;
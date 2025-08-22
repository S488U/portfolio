// Custom React hook to detect if a GPU (WebGL) is available in the browser.
// Returns an object with:
//   - available: boolean | null  → true if GPU available, false if not, null while checking
//   - name: string               → the detected GPU name, or a fallback message

import { useState, useEffect } from "react";

const getGpuInfo = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) return { available: false, name: "No GPU detected" };

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const gpuName = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : "GPU Detected (Name Unavailable)";

    return { available: true, name: gpuName };
  } catch {
    return { available: false, name: "Error Detecting GPU" };
  }
};

const useGpuAvailable = () => {
  const [gpuInfo, setGpuInfo] = useState({ available: null, name: "" });

  useEffect(() => {
    const info = getGpuInfo();
    setGpuInfo(info);
  }, []);

  return gpuInfo;
};

export default useGpuAvailable;
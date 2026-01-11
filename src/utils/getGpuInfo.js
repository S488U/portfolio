
/**
 * Retrieves GPU information from the browser's WebGL context.
 * 
 * @function getGpuInfo
 * @returns {Object} An object containing GPU availability and name information.
 * @returns {boolean} returns.available - Whether a GPU is detected and available.
 * @returns {string} returns.name - The name of the GPU or a descriptive message if unavailable.
 * 
 * @example
 * const gpuInfo = getGpuInfo();
 * console.log(gpuInfo); // { available: true, name: "NVIDIA GeForce GTX 1080" }
 * 
 * @description
 * Attempts to access the WebGL context and extract GPU information using the
 * WEBGL_debug_renderer_info extension. If WebGL is not supported or an error
 * occurs during detection, returns an object indicating unavailability with
 * an appropriate error message.
 */

const getGpuInfo = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) return { available: false, name: "No GPU detected" };

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const gpuName = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : "GPU Detected (Name Unavailable)";

    return { available: true, name: gpuName };
  } catch (error) {
    return { available: false, name: `Error Detecting GPU: ${error.message}` };
  }
};

export default getGpuInfo;

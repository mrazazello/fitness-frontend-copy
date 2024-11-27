const BACKEND_FILES_URL =
  import.meta.env.VITE_REACT_APP_BACKEND_FILES_URL || ""; // иначе ts считает что  | underfined

const backendPaths = {
  BACKEND_FILES_URL: (url: string) => `${BACKEND_FILES_URL}${url}`,

  FILES_UPLOAD_URL: () => "/files",
  FILE_FULL_URL: (url: string) => `${BACKEND_FILES_URL}/${url}`
};

export default backendPaths;

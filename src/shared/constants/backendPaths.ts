import { envConfig } from "@shared/config/env";

const BACKEND_FILES_URL = envConfig.BACKEND_FILES_URL || "";

const backendPaths = {
  BACKEND_FILES_URL: (url: string) => `${BACKEND_FILES_URL}${url}`,

  FILES_UPLOAD_URL: () => "/files",
  FILE_FULL_URL: (url: string) => `${BACKEND_FILES_URL}/${url}`
};

export default backendPaths;

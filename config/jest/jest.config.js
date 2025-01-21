export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "esnext"
        }
      }
    ]
  },
  rootDir: "../../",
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@pages/(.*)": "<rootDir>/src/pages/$1",
    "@entities/(.*)": "<rootDir>/src/entities/$1",
    "@features/(.*)": "<rootDir>/src/features/$1",
    "@shared/(.*)": "<rootDir>/src/shared/$1"
  }
};

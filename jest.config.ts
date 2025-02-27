import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // Coverage settings
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],

  // Extensions Jest should recognize
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Transform TypeScript files
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // Setup files for test environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Patterns to detect test files
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

  // Ignore node_modules from transformation
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^/]+$"],

  // Добавляем заглушку для CSS и других не-JS файлов
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};

export default config;

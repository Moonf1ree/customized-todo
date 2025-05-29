import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(sa|sc|le|c)ss$": "identity-obj-proxy",
    "^clsx$": require.resolve("clsx"),
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
        },
        diagnostics: false, // выключение проверки на sass
      },
    ],
  },
};

export default config;

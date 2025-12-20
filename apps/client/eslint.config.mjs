import eslintConfig from "../../eslint.config.mjs";

export default [
  ...eslintConfig,
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];

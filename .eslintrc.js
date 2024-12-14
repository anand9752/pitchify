module.exports = {
  extends: ["next", "next/core-web-vitals", "next/typescript"],
  rules: {
    "@next/next/no-img-element": "off", // Disables warnings for <img> instead of <Image>
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^ignored" }
    ],
    "@typescript-eslint/no-explicit-any": "warn", // Allows 'any' but shows a warning to encourage better typing
    "no-console": ["warn", { allow: ["warn", "error"] }], // Encourages limiting console statements
     "react/react-in-jsx-scope": "off", // Not needed for Next.js as React is automatically in scope
    "@typescript-eslint/ban-ts-comment": "off" // Add this line to ignore TypeScript comments
  }
};
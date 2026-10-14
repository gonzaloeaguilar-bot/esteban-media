const config = {
  // rail-kit-prune runs after Tailwind has inlined the @imports: it drops the
  // vendored kit's rules for components no source file renders. See the file.
  plugins: ["@tailwindcss/postcss", "./scripts/postcss-rail-kit-prune.cjs"],
};

export default config;

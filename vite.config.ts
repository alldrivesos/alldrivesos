import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  plugins: [
    react(),
    commonjs({
      filter(id) {
        if (id.includes("node_modules/list-of-cars")) {
          return true;
        }
      },
    }),
  ],
  optimizeDeps: {
    include: ["react-apexcharts"], // Pre-bundle react-apexcharts
  },
  build: {
    sourcemap: false, // Disable sourcemaps to reduce memory usage
    rollupOptions: {
      output: {
        manualChunks: undefined, // Reduce chunk splitting
      },
    },
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ["react-apexcharts"], // still good
//   },
//   build: {
//     sourcemap: false,
//     rollupOptions: {
//       output: {
//         // Let Rollup split vendor deps instead of disabling
//         manualChunks(id) {
//           if (id.includes("node_modules")) {
//             return "vendor";
//           }
//         },
//       },
//     },
//   },
// });

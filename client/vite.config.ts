import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Markdown Suite
            if (
              id.includes("react-markdown") ||
              id.includes("vfile") ||
              id.includes("property-information")
            ) {
              return "vendor-markdown-core";
            }
            if (
              id.includes("remark-gfm") ||
              id.includes("micromark") ||
              id.includes("unist-util") ||
              id.includes("hast-util")
            ) {
              return "vendor-markdown-plugins";
            }

            // CodeMirror Suite (Heavy)
            if (id.includes("@codemirror/view")) return "vendor-cm-view";
            if (id.includes("@codemirror/language")) return "vendor-cm-lang";
            if (
              id.includes("@codemirror/state") ||
              id.includes("@codemirror/commands") ||
              id.includes("@codemirror/search") ||
              id.includes("@codemirror/autocomplete")
            ) {
              return "vendor-cm-core";
            }
            if (id.includes("@uiw/react-codemirror")) {
              return "vendor-codemirror-ui";
            }

            // Syntax Highlighting Suite
            if (id.includes("react-syntax-highlighter")) {
              if (id.includes("dist/esm/languages"))
                return "vendor-syntax-langs";
              if (id.includes("dist/esm/styles")) return "vendor-syntax-styles";
              return "vendor-syntax-core";
            }
            if (id.includes("prismjs")) {
              return "vendor-prism";
            }

            // Core UI & Animations
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("framer-motion")) return "vendor-animations";

            // Framework Suite (Aggressively split to stay under 500KB)
            if (id.includes("@tanstack/react-query")) return "vendor-query";
            if (id.includes("react-router")) return "vendor-router";
            if (id.includes("react-dom")) return "vendor-react-dom";
            if (id.includes("react") || id.includes("scheduler")) {
              return "vendor-react-base";
            }
          }
        },
      },
    },
  },
});

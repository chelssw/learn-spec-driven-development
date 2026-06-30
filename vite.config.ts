import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/learn-spec-driven-development/",
  plugins: [react(), tailwindcss()],
});

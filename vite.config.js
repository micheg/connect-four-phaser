import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Permette di usare il progetto in una sottodirectory
  server: {
    port: 3000,
    open: true, // Apre automaticamente il browser
  },
});

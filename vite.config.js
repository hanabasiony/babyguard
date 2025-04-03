import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';


// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(),tailwindcss()],
  base: "/", 
})

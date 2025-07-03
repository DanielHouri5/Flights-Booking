// Vite configuration file for the React frontend project
// This file sets up Vite with the React plugin for fast development and build

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Register the React plugin to enable JSX and React Fast Refresh
  plugins: [react()],
  // You can add more Vite options here if needed
});

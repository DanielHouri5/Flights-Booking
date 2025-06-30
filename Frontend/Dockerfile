# Use Node.js 18 Alpine image as the build environment for building the React app
FROM node:18-alpine AS build

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory to install dependencies
COPY package*.json ./

# Install all dependencies defined in package.json
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

ARG VITE_SERVICE_URL
ENV VITE_SERVICE_URL=$VITE_SERVICE_URL

# Build the React app for production; output is in the /app/dist directory
RUN npm run build

# Use a lightweight Nginx Alpine image to serve the built static files
FROM nginx:alpine

# Remove default files from Nginx's html directory to avoid conflicts
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app files from the build stage to Nginx's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080 so the container can receive traffic on this port
EXPOSE 8080

# Run Nginx in the foreground so the container keeps running
CMD ["nginx", "-g", "daemon off;"]

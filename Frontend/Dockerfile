# Use Node.js 18 Alpine image as the build environment for building the React app
FROM node:18

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory to install dependencies
COPY package*.json ./

# Install all dependencies defined in package.json
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose port 8080 so the container can receive traffic on this port
EXPOSE 5173

CMD ["npm", "run", "dev"]

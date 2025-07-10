#!/bin/bash
# setup-dev.sh: Script to set up the local development environment for Flights-Booking
# - Installs dependencies
# - Sets up environment variables
# - Brings up Docker containers

# Go to the script's directory (scripts/) then move to project root
cd "$(dirname "$0")/.." || exit 1

# Install backend dependencies
cd Backend && npm install

# Install frontend dependencies
cd ../Frontend && npm install

# Go back to project root
cd ..

# Copy example env files if .env does not exist
[ -f .env ] || cp .env.example .env 2>/dev/null
[ -f Backend/.env ] || cp Backend/.env.example Backend/.env 2>/dev/null
[ -f Frontend/.env ] || cp Frontend/.env.example Frontend/.env 2>/dev/null

# Start all services with Docker Compose
docker-compose up --build
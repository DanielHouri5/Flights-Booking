#!/bin/bash
# setup-prod.sh: Script to set up the production environment for Flights-Booking
# - Prepares environment variables for production
# - Builds Docker images with production config
# - Pushes images to container registry (example: GCR)
# - Deploys to Google Cloud Run

# Set environment variables for production (edit as needed)
export NODE_ENV=production

# Build Docker images
docker build -t gcr.io/devops-workshop-462511/flights-backend:prod ../Backend/
docker build -t gcr.io/devops-workshop-462511/flights-frontend:prod ../Frontend/

# Push images to registry
docker push gcr.io/devops-workshop-462511/flights-backend:prod
docker push gcr.io/devops-workshop-462511/flights-frontend:prod

# Deploy to Google Cloud Run (with DATABASE_URL env var)
gcloud run deploy flights-backend \
  --image gcr.io/devops-workshop-462511/flights-backend:prod \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "DATABASE_URL=$DATABASE_URL"

gcloud run deploy flights-frontend \
  --image gcr.io/devops-workshop-462511/flights-frontend:prod \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "VITE_SERVICE_URL=$VITE_SERVICE_URL"

#!/bin/bash
export $(grep -v '^#' .env | xargs)

# Build frontend
cd client
npm i
npm run build

# Move build to server container
rm -rf ../server/build_client
mv build ../server/build_client

#start containers
docker-compose up --build -d

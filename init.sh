#!/bin/bash

# Build frontend
cd frontend
npm run build

# Move build to server container
rm -rf ../server/build_client
mv build ../server/build_client

#start containers
cd ../server/
npm run dev

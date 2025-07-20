#!/bin/bash

echo "Installing dependencies..."
# install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install git nodejs npm chromium-browser -y
sudo npm install -g pm2

echo "Cloning repository..."
git clone https://github.com/ksawio97/apple-wall-calendar.git

# build frontend
cd ./apple-wall-calendar/frontend
npm install
sudo npm install -g serve
npm run build

# install backend dependencies
cd ../backend
npm install
cd ../..
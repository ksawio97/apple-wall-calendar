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

# start ecosystem
cd ..
echo "Starting ecosystem with pm2..."
pm2 start ./setup/ecosystem.config.js

pm2 save

# Run pm2 startup and get the command to run with sudo
startup_cmd=$(pm2 startup | grep sudo)
eval "$startup_cmd"
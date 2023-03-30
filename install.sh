#!/usr/bin/bash

pkg install imagemagick git nodejs python ffmpeg libwebp mc nano yarn
rm -rf node_modules
yarn
rm -rf session
npm start

echo "All dependencies have been installed, please run the command \"npm start\" to immediately start the script"

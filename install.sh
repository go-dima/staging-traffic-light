#!/bin/bash

# Clone the repository
git clone https://github.com/go-dima/staging-traffic-light.git
cd staging-traffic-light || exit

# Install the dependencies
npm install

# Replace myorg with kodem in public/manifest.json
sed -i '' 's/myorg/kodem/g' public/manifest.json

# Build
npm run build

# Chrome -> Extensions -> Load unpacked -> Choose the dist folder
#!/bin/bash

# Check if organization parameter is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <organization-name>"
    exit 1
fi

ORG_NAME=$1

# Clone the repository
git clone https://github.com/go-dima/staging-traffic-light.git
cd staging-traffic-light || exit

# Install the dependencies
npm install

# Replace myorg in public/manifest.json
sed -i '' "s/myorg/$ORG_NAME/g" public/manifest.json src/utils/constants.ts

# Build
npm run build

# Chrome -> Extensions
#   - Enable developer mode
#   - Load unpacked -> Choose the dist folder
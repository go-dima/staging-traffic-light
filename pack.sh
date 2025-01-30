#!/bin/bash

# Default values
CLONE=false
ORG_NAME=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --clone)
            CLONE=true
            shift
            ;;
        *)
            ORG_NAME=$1
            shift
            ;;
    esac
done

# Check if organization parameter is provided
if [ -z "$ORG_NAME" ]; then
    echo "Usage: $0 [--clone] <organization-name>"
    exit 1
fi

# Clone the repository if flag is set
if [ "$CLONE" = true ]; then
    git clone https://github.com/go-dima/staging-traffic-light.git
    cd staging-traffic-light || exit
fi

# Install the dependencies
npm install

# Replace myorg in public/manifest.json
sed -i '' "s/myorg/$ORG_NAME/g" public/manifest.json src/utils/constants.ts

# Build
npm run build

# Chrome -> Extensions
#   - Enable developer mode
#   - Load unpacked -> Choose the dist folder
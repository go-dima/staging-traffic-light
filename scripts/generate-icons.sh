#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p icons

# Function to create a filled circle PNG with ImageMagick
create_icon() {
    size=$1
    output_file=$2

    convert -size ${size}x${size} xc:none \
        -fill "#808080" \
        -draw "circle $((size/2)),$((size/2)) $((size/2)),1" \
        "$output_file"
}

# Generate icons for all required sizes
create_icon 16 "icons/icon-grey-16.png"
create_icon 32 "icons/icon-grey-32.png"
create_icon 48 "icons/icon-grey-48.png"
create_icon 128 "icons/icon-grey-128.png"

echo "Icons generated successfully in icons/ directory"
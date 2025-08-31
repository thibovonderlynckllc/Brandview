#!/bin/bash

# Simple video conversion script for iOS Safari compatibility
# Converts videos to MP4 with H.264 codec

echo "Converting videos to MP4 for iOS compatibility..."
echo ""

# Create output directory
mkdir -p media/mp4-ios

# Convert videos
for file in media/*.mp4 media/*.MP4 media/*.webm media/*.mov; do
    if [ -f "$file" ]; then
        output_file="media/mp4-ios/$(basename "${file%.*}").mp4"
        echo "Converting: $(basename "$file")"
        
        ffmpeg -i "$file" \
               -c:v libx264 \
               -preset medium \
               -crf 23 \
               -c:a aac \
               -b:a 128k \
               -movflags +faststart \
               -pix_fmt yuv420p \
               -vf "scale=1280:720:force_original_aspect_ratio=decrease" \
               -r 30 \
               -y "$output_file" > /dev/null 2>&1
        
        if [ $? -eq 0 ]; then
            echo "  ✅ Success: $(basename "$output_file")"
        else
            echo "  ❌ Failed: $(basename "$file")"
        fi
    fi
done

echo ""
echo "Conversion complete! MP4 files are in: media/mp4-ios/"

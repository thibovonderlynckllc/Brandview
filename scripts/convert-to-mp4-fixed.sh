#!/bin/bash

# Fixed video conversion script for iOS Safari compatibility
# Handles filenames with special characters and spaces

echo "Converting videos to MP4 for iOS compatibility..."
echo ""

# Create output directory
mkdir -p media/mp4-ios

# Function to convert video with proper filename handling
convert_video() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local name_without_ext="${filename%.*}"
    local output_file="media/mp4-ios/${name_without_ext}.mp4"
    
    echo "Converting: $filename"
    
    ffmpeg -i "$input_file" \
           -c:v libx264 \
           -preset medium \
           -crf 23 \
           -c:a aac \
           -b:a 128k \
           -movflags +faststart \
           -pix_fmt yuv420p \
           -vf "scale=1280:720:force_original_aspect_ratio=decrease" \
           -r 30 \
           -y "$output_file" 2>/dev/null
    
    if [ $? -eq 0 ] && [ -s "$output_file" ]; then
        size=$(ls -lh "$output_file" | awk '{print $5}')
        echo "  ✅ Success: $(basename "$output_file") ($size)"
    else
        echo "  ❌ Failed: $filename"
        # Remove empty file if conversion failed
        [ -f "$output_file" ] && rm "$output_file"
    fi
    echo ""
}

# Convert each video individually with proper filename handling
convert_video "media/Edit-website v2.mp4"
convert_video "media/hunterson (2160p).mp4"
convert_video "media/Kopie van Manna Art Center.mp4"
convert_video "media/MANNA ART CENTRE - Reel 2.mp4"
convert_video "media/Muurkranten - reel 1 (1).mp4"
convert_video "media/Productvideo V3.mp4"
convert_video "media/smile_safari_wijnegem.mp4 (1080p).mp4"
convert_video "media/Werkvolk gezocht-Wesley-Voornboorn.mp4"
convert_video "media/ShortContent-Edit-tasje-en-schaaltjes.MP4"

echo "Conversion complete! MP4 files are in: media/mp4-ios/"

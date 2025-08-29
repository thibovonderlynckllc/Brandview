#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const VIDEO_DIR = path.join(__dirname, '../webm');
const POSTER_DIR = path.join(__dirname, '../public/images/posters');
const FRAME_TIME = '00:00:00'; // Extract frame at 0 seconds (first frame)

// Ensure poster directory exists
if (!fs.existsSync(POSTER_DIR)) {
  fs.mkdirSync(POSTER_DIR, { recursive: true });
}

// Get all video files
function getVideoFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.mp4', '.webm', '.mov', '.avi', '.mkv'].includes(ext);
  });
}

// Generate poster for a single video
function generatePoster(videoPath, posterPath) {
  try {
    const command = `ffmpeg -i "${videoPath}" -ss ${FRAME_TIME} -vframes 1 -q:v 2 "${posterPath}" -y`;
    console.log(`Generating poster for: ${path.basename(videoPath)}`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Generated: ${path.basename(posterPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to generate poster for ${path.basename(videoPath)}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🎬 Starting poster generation...\n');
  
  const videoFiles = getVideoFiles(VIDEO_DIR);
  
  if (videoFiles.length === 0) {
    console.log('No video files found in:', VIDEO_DIR);
    return;
  }
  
  console.log(`Found ${videoFiles.length} video files:\n`);
  
  let successCount = 0;
  
  videoFiles.forEach(videoFile => {
    const videoPath = path.join(VIDEO_DIR, videoFile);
    const posterName = path.parse(videoFile).name + '-poster.jpg';
    const posterPath = path.join(POSTER_DIR, posterName);
    
    if (generatePoster(videoPath, posterPath)) {
      successCount++;
    }
  });
  
  console.log(`\n🎉 Poster generation complete!`);
  console.log(`✅ Successfully generated: ${successCount}/${videoFiles.length} posters`);
  console.log(`📁 Posters saved to: ${POSTER_DIR}`);
  
  if (successCount > 0) {
    console.log('\n📋 Generated posters:');
    const posters = fs.readdirSync(POSTER_DIR);
    posters.forEach(poster => {
      console.log(`   - ${poster}`);
    });
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { generatePoster, getVideoFiles };

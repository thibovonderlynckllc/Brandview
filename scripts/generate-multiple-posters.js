#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const VIDEO_DIR = path.join(__dirname, '../webm');
const POSTER_DIR = path.join(__dirname, '../public/images/posters');
const FRAME_TIMES = [
  '00:00:00', // 0 seconds (first frame)
  '00:00:00.5', // 0.5 seconds
  '00:00:01', // 1 second
  '00:00:01.5', // 1.5 seconds
  '00:00:02'  // 2 seconds
];

// Ensure poster directory exists
if (!fs.existsSync(POSTER_DIR)) {
  fs.mkdirSync(POSTER_DIR, { recursive: true });
}

// Get video duration using ffprobe
function getVideoDuration(videoPath) {
  try {
    const command = `ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${videoPath}"`;
    const duration = parseFloat(execSync(command, { encoding: 'utf8' }).trim());
    return duration;
  } catch (error) {
    console.error(`Could not get duration for ${path.basename(videoPath)}`);
    return null;
  }
}

// Convert seconds to HH:MM:SS format
function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Generate poster for a single video at multiple timestamps
function generateMultiplePosters(videoPath) {
  const videoName = path.parse(videoPath).name;
  const duration = getVideoDuration(videoPath);
  
  console.log(`\n🎬 Processing: ${path.basename(videoPath)}`);
  if (duration) {
    console.log(`   Duration: ${secondsToTime(duration)}`);
  }
  
  const generatedPosters = [];
  
  FRAME_TIMES.forEach((time, index) => {
    try {
      const posterName = `${videoName}-poster-${index + 1}.jpg`;
      const posterPath = path.join(POSTER_DIR, posterName);
      
      const command = `ffmpeg -i "${videoPath}" -ss ${time} -vframes 1 -q:v 2 "${posterPath}" -y`;
      execSync(command, { stdio: 'pipe' });
      
      generatedPosters.push({
        name: posterName,
        path: posterPath,
        time: time
      });
      
      console.log(`   ✅ Generated: ${posterName} (at ${time})`);
    } catch (error) {
      console.log(`   ⚠️  Skipped frame at ${time} (might be beyond video duration)`);
    }
  });
  
  return generatedPosters;
}

// Get all video files
function getVideoFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.mp4', '.webm', '.mov', '.avi', '.mkv'].includes(ext);
  });
}

// Main function
function main() {
  console.log('🎬 Starting multiple poster generation...\n');
  console.log(`📁 Looking for videos in: ${VIDEO_DIR}`);
  console.log(`📁 Posters will be saved to: ${POSTER_DIR}\n`);
  
  const videoFiles = getVideoFiles(VIDEO_DIR);
  
  if (videoFiles.length === 0) {
    console.log('No video files found in:', VIDEO_DIR);
    return;
  }
  
  console.log(`Found ${videoFiles.length} video files:\n`);
  
  let totalPosters = 0;
  const allGenerated = {};
  
  videoFiles.forEach(videoFile => {
    const videoPath = path.join(VIDEO_DIR, videoFile);
    const posters = generateMultiplePosters(videoPath);
    
    allGenerated[videoFile] = posters;
    totalPosters += posters.length;
  });
  
  console.log(`\n🎉 Multiple poster generation complete!`);
  console.log(`✅ Generated ${totalPosters} poster options for ${videoFiles.length} videos`);
  console.log(`📁 All posters saved to: ${POSTER_DIR}`);
  
  // Summary
  console.log('\n📋 Summary:');
  Object.entries(allGenerated).forEach(([video, posters]) => {
    console.log(`\n   ${path.basename(video)}:`);
    posters.forEach(poster => {
      console.log(`     - ${poster.name} (${poster.time})`);
    });
  });
  
  console.log('\n💡 Next steps:');
  console.log('   1. Check the generated posters in the posters folder');
  console.log('   2. Choose the best frame for each video');
  console.log('   3. Upload the chosen poster to your CMS');
  console.log('   4. Delete the unused poster options');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { generateMultiplePosters, getVideoFiles };

#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const POSTER_DIR = path.join(__dirname, '../public/images/posters');
const MAX_SIZE_MB = 1;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// Ensure output directory exists
const webpDir = path.join(POSTER_DIR, 'webp');
if (!fs.existsSync(webpDir)) {
  fs.mkdirSync(webpDir, { recursive: true });
}

// Get all JPG poster files
function getJpgFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg';
  });
}

// Convert single image to WebP with quality optimization
function convertToWebP(inputPath, outputPath, targetSizeBytes) {
  try {
    // Start with high quality and reduce if needed
    let quality = 85;
    let currentSize = 0;

    while (quality > 10) {
      const command = `ffmpeg -i "${inputPath}" -c:v libwebp -quality ${quality} -y "${outputPath}"`;
      execSync(command, { stdio: 'pipe' });

      // Check file size
      if (fs.existsSync(outputPath)) {
        currentSize = fs.statSync(outputPath).size;

        if (currentSize <= targetSizeBytes) {
          console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${(currentSize / 1024 / 1024).toFixed(2)}MB, quality: ${quality})`);
          return true;
        }
      }

      quality -= 5; // Reduce quality and try again
    }

    // If we still can't get under the target size, use the smallest we can get
    const finalCommand = `ffmpeg -i "${inputPath}" -c:v libwebp -quality 10 -y "${outputPath}"`;
    execSync(finalCommand, { stdio: 'pipe' });

    if (fs.existsSync(outputPath)) {
      currentSize = fs.statSync(outputPath).size;
      console.log(`⚠️  ${path.basename(inputPath)} → ${path.basename(outputPath)} (${(currentSize / 1024 / 1024).toFixed(2)}MB, quality: 10 - minimum quality reached)`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Failed to convert ${path.basename(inputPath)}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🖼️  Starting poster conversion to WebP...\n');
  console.log(`📁 Source directory: ${POSTER_DIR}`);
  console.log(`📁 Output directory: ${webpDir}`);
  console.log(`📏 Target max size: ${MAX_SIZE_MB}MB\n`);

  const jpgFiles = getJpgFiles(POSTER_DIR);

  if (jpgFiles.length === 0) {
    console.log('No JPG files found in:', POSTER_DIR);
    return;
  }

  console.log(`Found ${jpgFiles.length} JPG files:\n`);

  let successCount = 0;
  let totalOriginalSize = 0;
  let totalWebpSize = 0;

  jpgFiles.forEach((jpgFile) => {
    const inputPath = path.join(POSTER_DIR, jpgFile);
    const webpName = path.parse(jpgFile).name + '.webp';
    const outputPath = path.join(webpDir, webpName);

    // Get original file size
    const originalSize = fs.statSync(inputPath).size;
    totalOriginalSize += originalSize;

    console.log(`Converting: ${jpgFile} (${(originalSize / 1024 / 1024).toFixed(2)}MB)`);

    if (convertToWebP(inputPath, outputPath, MAX_SIZE_BYTES)) {
      successCount++;

      // Get WebP file size
      if (fs.existsSync(outputPath)) {
        const webpSize = fs.statSync(outputPath).size;
        totalWebpSize += webpSize;
      }
    }
  });

  console.log(`\n🎉 WebP conversion complete!`);
  console.log(`✅ Successfully converted: ${successCount}/${jpgFiles.length} images`);
  console.log(`📁 WebP files saved to: ${webpDir}`);

  if (successCount > 0) {
    const compressionRatio = (((totalOriginalSize - totalWebpSize) / totalOriginalSize) * 100).toFixed(1);
    console.log(`\n📊 Size comparison:`);
    console.log(`   Original JPG: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   WebP: ${(totalWebpSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Compression: ${compressionRatio}% smaller`);

    console.log('\n📋 Generated WebP files:');
    const webpFiles = fs.readdirSync(webpDir);
    webpFiles.forEach((webpFile) => {
      const filePath = path.join(webpDir, webpFile);
      const fileSize = fs.statSync(filePath).size;
      console.log(`   - ${webpFile} (${(fileSize / 1024 / 1024).toFixed(2)}MB)`);
    });
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { convertToWebP, getJpgFiles };

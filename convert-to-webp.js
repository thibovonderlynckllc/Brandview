const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = '/Users/thibovonderlynck/Nextjs/Reinout/brandviewReinout/IMAGECONVERT';
const outputDir = '/Users/thibovonderlynck/Nextjs/Reinout/brandviewReinout/IMAGECONVERT/webp';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('Created output directory:', outputDir);
}

// Get all image files
function getImageFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg' || ext === '.JPG' || ext === '.JPEG';
  });
}

// Convert image to WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    const startTime = Date.now();

    await sharp(inputPath)
      .webp({
        quality: 80, // Good quality, good compression
        effort: 6, // Higher effort for better compression
      })
      .toFile(outputPath);

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Get file sizes
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const compressionRatio = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

    console.log(`✅ Converted: ${path.basename(inputPath)}`);
    console.log(`   📊 ${(inputStats.size / 1024 / 1024).toFixed(1)}MB → ${(outputStats.size / 1024 / 1024).toFixed(1)}MB (${compressionRatio}% smaller)`);
    console.log(`   ⏱️  ${duration}ms`);
    console.log('');

    return { success: true, inputSize: inputStats.size, outputSize: outputStats.size, duration };
  } catch (error) {
    console.error(`❌ Failed to convert ${path.basename(inputPath)}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Main conversion function
async function convertAllImages() {
  console.log('🔄 Starting WebP conversion...\n');

  const imageFiles = getImageFiles(inputDir);
  console.log(`📁 Found ${imageFiles.length} images to convert\n`);

  if (imageFiles.length === 0) {
    console.log('No JPG images found in the directory.');
    return;
  }

  const results = [];
  let totalInputSize = 0;
  let totalOutputSize = 0;
  let totalDuration = 0;
  let successCount = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, path.parse(file).name + '.webp');

    const result = await convertToWebP(inputPath, outputPath);
    results.push(result);

    if (result.success) {
      successCount++;
      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;
      totalDuration += result.duration;
    }
  }

  // Summary
  console.log('📊 Conversion Summary:');
  console.log(`✅ Successfully converted: ${successCount}/${imageFiles.length} images`);
  console.log(`📦 Total size reduction: ${(totalInputSize / 1024 / 1024).toFixed(1)}MB → ${(totalOutputSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`💾 Space saved: ${((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(1)}MB (${(((totalInputSize - totalOutputSize) / totalInputSize) * 100).toFixed(1)}%)`);
  console.log(`⏱️  Total time: ${totalDuration}ms`);
  console.log(`📁 WebP files saved to: ${outputDir}`);
}

// Run the conversion
convertAllImages().catch(console.error);

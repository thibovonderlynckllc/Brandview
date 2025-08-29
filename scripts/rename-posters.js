#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const POSTER_DIR = path.join(__dirname, '../public/images/posters/webp');

// Rename function
function renamePosters() {
  console.log('🔄 Starting poster renaming...\n');
  console.log(`📁 Directory: ${POSTER_DIR}\n`);

  if (!fs.existsSync(POSTER_DIR)) {
    console.log('❌ WebP posters directory not found!');
    return;
  }

  const files = fs.readdirSync(POSTER_DIR);
  const webpFiles = files.filter((file) => file.endsWith('.webp'));

  if (webpFiles.length === 0) {
    console.log('No WebP files found to rename.');
    return;
  }

  console.log(`Found ${webpFiles.length} WebP files to rename:\n`);

  let successCount = 0;

  webpFiles.forEach((oldName) => {
    // Remove 'ShortContent' and replace with 'Poster'
    const newName = oldName.replace('ShortContent-', 'Poster-');

    if (oldName !== newName) {
      const oldPath = path.join(POSTER_DIR, oldName);
      const newPath = path.join(POSTER_DIR, newName);

      try {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ ${oldName} → ${newName}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to rename ${oldName}:`, error.message);
      }
    } else {
      console.log(`⏭️  ${oldName} (no change needed)`);
    }
  });

  console.log(`\n🎉 Renaming complete!`);
  console.log(`✅ Successfully renamed: ${successCount} files`);

  if (successCount > 0) {
    console.log('\n📋 Final file list:');
    const finalFiles = fs.readdirSync(POSTER_DIR).filter((file) => file.endsWith('.webp'));
    finalFiles.forEach((file) => {
      const filePath = path.join(POSTER_DIR, file);
      const fileSize = fs.statSync(filePath).size;
      console.log(`   - ${file} (${(fileSize / 1024 / 1024).toFixed(2)}MB)`);
    });
  }
}

// Run the script
if (require.main === module) {
  renamePosters();
}

module.exports = { renamePosters };

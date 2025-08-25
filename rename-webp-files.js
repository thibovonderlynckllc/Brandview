const fs = require('fs');
const path = require('path');

const webpDir = '/Users/thibovonderlynck/Nextjs/Reinout/brandviewReinout/IMAGECONVERT/webp';

// Get all WebP files
function getWebpFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.webp';
  });
}

// Rename file function
function renameFile(oldPath, newPath) {
  try {
    fs.renameSync(oldPath, newPath);
    return true;
  } catch (error) {
    console.error(`❌ Failed to rename ${path.basename(oldPath)}:`, error.message);
    return false;
  }
}

// Main renaming function
function renameAllWebpFiles() {
  console.log('🔄 Starting WebP file renaming...\n');

  const webpFiles = getWebpFiles(webpDir);
  console.log(`📁 Found ${webpFiles.length} WebP files to rename\n`);

  if (webpFiles.length === 0) {
    console.log('No WebP files found in the directory.');
    return;
  }

  let successCount = 0;

  for (const file of webpFiles) {
    const oldPath = path.join(webpDir, file);

    // Remove file extension, remove spaces, add 'Business-' prefix
    const nameWithoutExt = path.parse(file).name;
    const newName = 'Business-' + nameWithoutExt.replace(/\s+/g, '') + '.webp';
    const newPath = path.join(webpDir, newName);

    console.log(`🔄 Renaming: ${file}`);
    console.log(`   → ${newName}`);

    if (renameFile(oldPath, newPath)) {
      successCount++;
      console.log(`   ✅ Success\n`);
    } else {
      console.log(`   ❌ Failed\n`);
    }
  }

  // Summary
  console.log('📊 Renaming Summary:');
  console.log(`✅ Successfully renamed: ${successCount}/${webpFiles.length} files`);
  console.log(`📁 Files updated in: ${webpDir}`);
}

// Run the renaming
renameAllWebpFiles();

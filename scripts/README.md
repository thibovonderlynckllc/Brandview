# Video Poster Generation Scripts

These scripts automatically generate poster/thumbnail images from your videos using FFmpeg.

## Prerequisites

Make sure you have FFmpeg installed on your system:

**macOS (using Homebrew):**

```bash
brew install ffmpeg
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
Download from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)

## Usage

### Quick Poster Generation

Generates one poster per video at 0 seconds (first frame):

```bash
npm run generate-posters
```

### Multiple Poster Options

Generates 5 poster options per video at different timestamps (0s, 0.5s, 1s, 1.5s, 2s):

```bash
npm run generate-multiple-posters
```

## How It Works

1. **Video Location:** Scripts look for videos in `webm/`
2. **Poster Output:** Generated posters are saved to `public/images/posters/`
3. **Supported Formats:** MP4, WebM, MOV, AVI, MKV
4. **Output Format:** JPG images

## File Naming

- **Single poster:** `video-name-poster.jpg`
- **Multiple posters:** `video-name-poster-1.jpg`, `video-name-poster-2.jpg`, etc.

## Customization

You can modify the scripts to:

- Change the frame extraction time
- Adjust output quality
- Change output format
- Add more frame extraction points

## Next Steps

1. Run the script on your videos
2. Check the generated posters in `public/images/posters/`
3. Choose the best frame for each video
4. Upload the chosen poster to your CMS
5. Delete unused poster options

## Example Output

```
🎬 Starting multiple poster generation...

📁 Looking for videos in: /path/to/webm
📁 Posters will be saved to: /path/to/public/images/posters

Found 9 video files:

🎬 Processing: ShortContent-Edit-tasje-en-schaaltjes.webm
   Duration: 00:00:07
   ✅ Generated: ShortContent-Edit-tasje-en-schaaltjes-poster-1.jpg (at 00:00:00)
   ✅ Generated: ShortContent-Edit-tasje-en-schaaltjes-poster-2.jpg (at 00:00:00.5)
   ✅ Generated: ShortContent-Edit-tasje-en-schaaltjes-poster-3.jpg (at 00:00:01)
   ✅ Generated: ShortContent-Edit-tasje-en-schaaltjes-poster-4.jpg (at 00:00:01.5)
   ✅ Generated: ShortContent-Edit-tasje-en-schaaltjes-poster-5.jpg (at 00:00:02)

🎉 Multiple poster generation complete!
✅ Generated 45 poster options for 9 videos
📁 All posters saved to: /path/to/public/images/posters
```

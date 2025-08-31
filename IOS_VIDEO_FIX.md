# iOS Video Crash Fix

## Problem

Videos causing app crashes on iOS devices (iPhone/iPad) due to Safari's WebM handling and resource limits.

## Solution

Simple iOS optimizations to prevent crashes:

### 1. VideoPlayer Component

- **iOS Detection**: Automatically detects iOS devices
- **Memory Management**: Unloads videos when not visible (Intersection Observer)
- **Preload Control**: Uses `preload="none"` on iOS to prevent upfront loading
- **Autoplay Disabled**: Prevents iOS autoplay crashes

### 2. Video Conversion

- **Script**: `scripts/convert-to-mp4.sh`
- **Format**: MP4 with H.264 codec (iOS native support)
- **Settings**: 720p, 30fps, CRF 23, AAC audio

### 3. Video Limiter

- **Component**: `IOSVideoLimiter.tsx`
- **Limits**: 6 videos on iOS, 15 on other devices
- **Purpose**: Prevents memory overload

## Usage

### Convert Videos

```bash
./scripts/convert-to-mp4.sh
```

### Limit Videos on iOS

```tsx
import IOSVideoLimiter from './components/IOSVideoLimiter';

<IOSVideoLimiter maxVideosIOS={6} maxVideosOther={15}>
  {videoComponents}
</IOSVideoLimiter>;
```

## Key Features

- ✅ **iOS Detection**: Automatic device detection
- ✅ **Memory Management**: Unloads off-screen videos
- ✅ **Preload Control**: Prevents upfront loading on iOS
- ✅ **Autoplay Control**: Disables autoplay on iOS
- ✅ **Video Limiting**: Prevents memory overload

## Testing

1. Test on real iOS devices
2. Use Safari Developer Tools
3. Monitor memory usage
4. Test with different video counts

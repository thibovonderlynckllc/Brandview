import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

// Initialize R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: 'https://d769879df266edf1eaf504e7027ee2a0.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true,
});

export async function POST(request: NextRequest) {
  try {
    const { filename, contentType, fileSize } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: 'Filename and content type are required' }, { status: 400 });
    }

    // Generate a unique filename while preserving the original name
    const fileExtension = filename.split('.').pop();
    const baseName = filename.replace(/\.[^/.]+$/, ''); // Remove extension
    const timestamp = Date.now();
    const shortId = randomUUID().split('-')[0]; // Use only first part of UUID (8 chars)
    const uniqueFilename = `${baseName}_${timestamp}_${shortId}.${fileExtension}`;
    const key = `media/${uniqueFilename}`;

    // Create the presigned URL for upload
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET || 'brandview-data',
      Key: key,
      ContentType: contentType,
      ContentLength: fileSize,
      // Add metadata for Payload compatibility
      Metadata: {
        'original-filename': filename,
        'uploaded-via': 'direct-upload',
      },
    });

    const presignedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 3600, // 1 hour
    });

    // Generate the public URL for the uploaded file
    const publicUrl = `${process.env.S3_PUBLIC_URL}/media/${uniqueFilename}`;

    return NextResponse.json({
      presignedUrl,
      publicUrl,
      key,
      filename: uniqueFilename,
      originalFilename: filename,
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
  }
}

import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@/payload.config';
import { NextResponse } from 'next/server';

// Define filename patterns for each category
const BUSINESS_PATTERNS = ['HAIRAFFAIR', 'Hairaffair', 'ApotheekMalehoek', 'ApotheekDegroote'];

const CORPORATE_EVENTS_PATTERNS = ['VDM-', 'TAM-', 'Kokkerelleke VOKA', '10jFOODBAG'];

export async function POST() {
  try {
    // Get Payload instance
    const payload = await getPayloadHMR({ config: configPromise });

    // Get all media files
    const mediaFiles = await payload.find({
      collection: 'media',
      limit: 1000,
    });

    let businessCount = 0;
    let corporateEventsCount = 0;
    let skippedCount = 0;
    const results: string[] = [];

    // Process each media file
    for (const media of mediaFiles.docs) {
      const filename = media.filename || '';
      let tagsToAdd: string[] = [];

      // Check if it's a business image
      const isBusiness = BUSINESS_PATTERNS.some((pattern) => filename.includes(pattern));

      // Check if it's a corporate events image
      const isCorporateEvents = CORPORATE_EVENTS_PATTERNS.some((pattern) => filename.includes(pattern));

      if (isBusiness) {
        tagsToAdd.push('business');
        businessCount++;
      } else if (isCorporateEvents) {
        tagsToAdd.push('corporate-events');
        corporateEventsCount++;
      }

      // Only update if we found matching patterns
      if (tagsToAdd.length > 0) {
        await payload.update({
          collection: 'media',
          id: media.id,
          data: {
            tags: tagsToAdd,
          },
        });

        results.push(`✅ Tagged "${filename}" as: ${tagsToAdd.join(', ')}`);
      } else {
        results.push(`⏭️ Skipped "${filename}" (no matching pattern)`);
        skippedCount++;
      }
    }

    const summary = {
      totalProcessed: mediaFiles.docs.length,
      businessTagged: businessCount,
      corporateEventsTagged: corporateEventsCount,
      skipped: skippedCount,
      results: results,
    };

    return NextResponse.json({
      success: true,
      message: 'Media tagging completed successfully!',
      summary,
    });
  } catch (error) {
    console.error('Error tagging media files:', error);
    return NextResponse.json({ success: false, error: 'Failed to tag media files' }, { status: 500 });
  }
}

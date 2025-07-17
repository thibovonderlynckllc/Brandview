import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@/payload.config';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Get Payload instance
    const payload = await getPayloadHMR({ config: configPromise });

    // Get all media files tagged with 'food'
    const foodMedia = await payload.find({
      collection: 'media',
      where: {
        tags: {
          contains: 'food',
        },
      },
      limit: 1000,
    });

    console.log(`Found ${foodMedia.docs.length} food media items`);

    if (foodMedia.docs.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No media items found with "food" tag',
      });
    }

    // Find the food portfolio entry
    const foodPortfolios = await payload.find({
      collection: 'portfolio' as any,
      where: {
        slug: {
          equals: 'food',
        },
      },
    });

    let foodPortfolio;
    if (foodPortfolios.docs.length === 0) {
      // Create food portfolio if it doesn't exist
      foodPortfolio = await payload.create({
        collection: 'portfolio' as any,
        data: {
          title: 'Food Photography',
          slug: 'food',
          portfolioType: 'food',
          description: 'Delicious food photography that makes your dishes irresistible',
          galleryGrid: {
            row1: {},
            row2: {},
            row3: {},
            row4: {},
            row5: {},
            row6: {},
            row7: {},
            row8: {},
          },
        },
      });
      console.log('Created new food portfolio');
    } else {
      foodPortfolio = foodPortfolios.docs[0];
      console.log('Found existing food portfolio');
    }

    // Define all 23 positions in order
    const positions = [
      // Row 1
      { row: 'row1', position: 'position1' },
      { row: 'row1', position: 'position2' },
      { row: 'row1', position: 'position3' },
      // Row 2
      { row: 'row2', position: 'position4' },
      { row: 'row2', position: 'position5' },
      { row: 'row2', position: 'position6' },
      // Row 3
      { row: 'row3', position: 'position7' },
      { row: 'row3', position: 'position8' },
      { row: 'row3', position: 'position9' },
      // Row 4
      { row: 'row4', position: 'position10' },
      { row: 'row4', position: 'position11' },
      // Row 5
      { row: 'row5', position: 'position12' },
      { row: 'row5', position: 'position13' },
      // Row 6
      { row: 'row6', position: 'position14' },
      { row: 'row6', position: 'position15' },
      { row: 'row6', position: 'position16' },
      // Row 7
      { row: 'row7', position: 'position17' },
      { row: 'row7', position: 'position18' },
      { row: 'row7', position: 'position19' },
      { row: 'row7', position: 'position20' },
      { row: 'row7', position: 'position21' },
      // Row 8
      { row: 'row8', position: 'position22' },
      { row: 'row8', position: 'position23' },
    ];

    // Build the gallery grid data
    const galleryGrid: any = {
      row1: {},
      row2: {},
      row3: {},
      row4: {},
      row5: {},
      row6: {},
      row7: {},
      row8: {},
    };

    // Populate positions with food media (cycle through if we have more positions than media)
    let mediaIndex = 0;
    const assignedMedia: string[] = [];

    for (const pos of positions) {
      if (mediaIndex < foodMedia.docs.length) {
        const mediaItem = foodMedia.docs[mediaIndex];
        galleryGrid[pos.row][pos.position] = mediaItem.id;
        assignedMedia.push(`${pos.row}.${pos.position} -> ${mediaItem.filename}`);
        mediaIndex++;
      } else {
        // If we have more positions than media, cycle back to the beginning
        mediaIndex = 0;
        const mediaItem = foodMedia.docs[mediaIndex];
        galleryGrid[pos.row][pos.position] = mediaItem.id;
        assignedMedia.push(`${pos.row}.${pos.position} -> ${mediaItem.filename} (cycled)`);
        mediaIndex++;
      }
    }

    // Update the food portfolio with the populated gallery
    await payload.update({
      collection: 'portfolio' as any,
      id: foodPortfolio.id,
      data: {
        galleryGrid: galleryGrid,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully populated food gallery with ${foodMedia.docs.length} media items across 32 positions`,
      details: {
        totalMediaItems: foodMedia.docs.length,
        totalPositions: positions.length,
        portfolioId: foodPortfolio.id,
        assignments: assignedMedia,
      },
    });
  } catch (error) {
    console.error('Error populating food gallery:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to populate food gallery',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

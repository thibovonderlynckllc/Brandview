import { NextRequest, NextResponse } from 'next/server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';

// Portfolio type mapping
const PORTFOLIO_CONFIG = {
  food: {
    title: 'Food Photography',
    slug: 'food',
    tag: 'food',
    description: 'Delicious food photography that makes your dishes irresistible',
  },
  business: {
    title: 'Business Photography',
    slug: 'business',
    tag: 'business',
    description: 'Professional business photography that elevates your brand',
  },
  portraits: {
    title: 'Portraits',
    slug: 'portraits',
    tag: 'portraits',
    description: 'Authentic portrait photography that captures personality',
  },
  products: {
    title: 'Product Photography',
    slug: 'products',
    tag: 'products',
    description: 'Clean product photography that drives sales',
  },
  'corporate-events': {
    title: 'Corporate Events',
    slug: 'corporate-events',
    tag: 'corporate-events',
    description: 'Dynamic corporate event photography',
  },
  'short-content': {
    title: 'Short Content',
    slug: 'short-content',
    tag: 'short-content',
    description: 'Engaging short-form content for social media',
  },
};

export async function POST(request: NextRequest) {
  try {
    const { portfolioType } = await request.json();

    if (!portfolioType || !PORTFOLIO_CONFIG[portfolioType as keyof typeof PORTFOLIO_CONFIG]) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid portfolio type. Available types: ${Object.keys(PORTFOLIO_CONFIG).join(', ')}`,
        },
        { status: 400 }
      );
    }

    const config = PORTFOLIO_CONFIG[portfolioType as keyof typeof PORTFOLIO_CONFIG];
    const payload = await getPayloadHMR({ config: configPromise });

    console.log(`🔍 Searching for media tagged with '${config.tag}'...`);

    // Find all media with the specified tag
    const mediaResult = await payload.find({
      collection: 'media',
      where: {
        tags: {
          contains: config.tag,
        },
      },
      limit: 1000, // Get plenty of media
    });

    const mediaItems = mediaResult.docs;
    console.log(`📸 Found ${mediaItems.length} media items tagged with '${config.tag}'`);

    if (mediaItems.length === 0) {
      return NextResponse.json({
        success: false,
        message: `No media items found with tag '${config.tag}'`,
      });
    }

    // Check if portfolio already exists
    const existingPortfolio = await payload.find({
      collection: 'portfolio' as any,
      where: {
        slug: {
          equals: config.slug,
        },
      },
    });

    let portfolioId;

    if (existingPortfolio.docs.length > 0) {
      portfolioId = existingPortfolio.docs[0].id;
      console.log(`📁 Found existing ${config.title} portfolio with ID: ${portfolioId}`);
    } else {
      console.log(`📁 Creating new ${config.title} portfolio...`);
      const newPortfolio = await payload.create({
        collection: 'portfolio' as any,
        data: {
          title: config.title,
          slug: config.slug,
          portfolioType: portfolioType,
          description: config.description,
          galleryGrid: {
            row1: {},
            row2: {},
            row3: {},
            row4: {},
            row5: {},
            row6: {},
            row7: {},
            row8: {},
            row9: {},
            row10: {},
            row11: {},
          },
        } as any,
      });
      portfolioId = newPortfolio.id;
      console.log(`✅ Created new ${config.title} portfolio with ID: ${portfolioId}`);
    }

    // Define the gallery structure (23 positions)
    const galleryStructure = [
      { row: 'row1', positions: ['position1', 'position2', 'position3'] },
      { row: 'row2', positions: ['position4', 'position5', 'position6'] },
      { row: 'row3', positions: ['position7', 'position8', 'position9'] },
      { row: 'row4', positions: ['position10', 'position11'] },
      { row: 'row5', positions: ['position12', 'position13'] },
      { row: 'row6', positions: ['position14', 'position15', 'position16'] },
      { row: 'row7', positions: ['position17', 'position18', 'position19', 'position20', 'position21'] },
      { row: 'row8', positions: ['position22', 'position23'] },
    ];

    // Create gallery grid data
    const galleryGrid: any = {};
    const assignments: string[] = [];
    let mediaIndex = 0;

    // Populate only the positions for which we have unique media
    for (const rowData of galleryStructure) {
      galleryGrid[rowData.row] = {};

      for (const position of rowData.positions) {
        // Only assign if we have a unique media item (no cycling)
        if (mediaIndex < mediaItems.length) {
          const mediaItem = mediaItems[mediaIndex];
          galleryGrid[rowData.row][position] = mediaItem.id;
          assignments.push(`${rowData.row}.${position} -> ${mediaItem.filename}`);
          mediaIndex++;
        }
        // If no more unique media items, leave position empty (don't assign anything)
      }
    }

    // Update the portfolio with the populated gallery
    await payload.update({
      collection: 'portfolio' as any,
      id: portfolioId,
      data: {
        galleryGrid,
      } as any,
    });

    console.log(`✅ Successfully populated ${config.title} gallery!`);

    return NextResponse.json({
      success: true,
      message: `Successfully populated ${config.title} gallery with ${mediaItems.length} unique media items (${assignments.length} positions filled)`,
      details: {
        portfolioType,
        totalMediaItems: mediaItems.length,
        positionsFilled: assignments.length,
        totalAvailablePositions: 32,
        portfolioId,
        assignments,
      },
    });
  } catch (error) {
    console.error('❌ Error populating portfolio gallery:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to populate portfolio gallery',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

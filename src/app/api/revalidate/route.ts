import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { collection, slug, action } = body;

    // Verify the request is coming from PayloadCMS
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.REVALIDATION_SECRET;

    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.log(`Revalidating ${collection} with slug: ${slug}, action: ${action}`);

    // Revalidate based on collection and content type
    if (collection === 'pages') {
      switch (slug) {
        case 'home':
          revalidatePath('/');
          break;
        case 'about':
          revalidatePath('/about');
          break;
        case 'services':
          revalidatePath('/services');
          break;
        case 'portfolio':
          revalidatePath('/portfolio');
          break;
        case 'rates':
          revalidatePath('/rates');
          break;
        case 'contact':
          revalidatePath('/contact');
          break;
        default:
          // Revalidate all pages if we're not sure
          revalidatePath('/', 'layout');
      }
    } else if (collection === 'portfolio') {
      // Revalidate specific portfolio page and the main portfolio page
      revalidatePath(`/portfolio/${slug}`);
      revalidatePath('/portfolio');
    } else if (collection === 'media') {
      // Media changes might affect multiple pages, so revalidate all
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      message: 'Revalidated successfully',
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ message: 'Error revalidating', error: error.message }, { status: 500 });
  }
}

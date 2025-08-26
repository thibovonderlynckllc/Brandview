import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json();

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath('/');
      revalidatePath('/portfolio');
      revalidatePath('/rates');
      revalidatePath('/services');
      revalidatePath('/contact');
      revalidatePath('/about');
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}

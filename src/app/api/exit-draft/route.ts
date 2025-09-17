import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  const draft = await draftMode();
  draft.disable();

  // Redirect back to the homepage (or wherever they came from)
  redirect('/');
}

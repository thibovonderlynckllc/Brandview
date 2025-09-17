'use client';

import { useSearchParams } from 'next/navigation';

interface DraftBannerProps {
  isDraftMode: boolean;
}

export default function DraftBanner({ isDraftMode }: DraftBannerProps) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  
  if (!isDraftMode && !isPreview) return null;

  return (
    <div className="bg-red-600 text-white px-4 py-3 text-center font-bold text-lg border-b-4 border-red-800 shadow-lg sticky top-0 z-50">
      ⚠️ DRAFT PREVIEW - This content is NOT live on your website yet! 
      <br />
      <span className="text-sm font-normal">
        Only you can see this preview. Visitors see the published version. 
        <a href="/api/exit-draft" className="underline ml-2 hover:text-red-200">
          Exit Preview Mode
        </a>
      </span>
    </div>
  );
}

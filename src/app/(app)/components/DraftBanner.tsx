interface DraftBannerProps {
  isDraftMode: boolean;
}

export default function DraftBanner({ isDraftMode }: DraftBannerProps) {
  if (!isDraftMode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white px-4 py-2 text-center font-bold text-sm shadow-lg z-50 border-t-4 border-red-800">
      ⚠️ DRAFT PREVIEW - Not live yet! 
      <span className="text-xs font-normal ml-2">
        Only you see this. 
        <a href="/api/exit-draft" className="underline ml-1 hover:text-red-200">
          Exit
        </a>
      </span>
    </div>
  );
}

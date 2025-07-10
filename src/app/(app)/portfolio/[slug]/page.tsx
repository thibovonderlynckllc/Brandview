'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useMemo, useState, useEffect, use } from 'react';
import Masonry from 'react-masonry-css';

// Types for the portfolio data
interface MediaItem {
  url: string;
  alt?: string;
}

interface GalleryPosition {
  position1?: MediaItem;
  position2?: MediaItem;
  position3?: MediaItem;
  position4?: MediaItem;
  position5?: MediaItem;
  position6?: MediaItem;
  position7?: MediaItem;
  position8?: MediaItem;
  position9?: MediaItem;
  position10?: MediaItem;
  position11?: MediaItem;
  position12?: MediaItem;
  position13?: MediaItem;
  position14?: MediaItem;
  position15?: MediaItem;
  position16?: MediaItem;
  position17?: MediaItem;
  position18?: MediaItem;
  position19?: MediaItem;
  position20?: MediaItem;
  position21?: MediaItem;
  position22?: MediaItem;
  position23?: MediaItem;
  position24?: MediaItem;
  position25?: MediaItem;
  position26?: MediaItem;
  position27?: MediaItem;
  position28?: MediaItem;
  position29?: MediaItem;
  position30?: MediaItem;
  position31?: MediaItem;
  position32?: MediaItem;
}

interface GalleryGrid {
  row1: GalleryPosition;
  row2: GalleryPosition;
  row3: GalleryPosition;
  row4: GalleryPosition;
  row5: GalleryPosition;
  row6: GalleryPosition;
  row7: GalleryPosition;
  row8: GalleryPosition;
  row9: GalleryPosition;
  row10: GalleryPosition;
  row11: GalleryPosition;
}

interface DecorativeElements {
  icon1?: MediaItem;
  icon1Position?: string;
  icon2?: MediaItem;
  icon2Position?: string;
  icon3?: MediaItem;
  icon3Position?: string;
}

interface PortfolioData {
  title: string;
  slug: string;
  description?: string;
  galleryGrid: GalleryGrid;
  decorativeElements?: DecorativeElements;
  bannerImage?: MediaItem;
}

async function getPortfolioData(slug: string): Promise<PortfolioData | null> {
  try {
    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/portfolio?where[slug][equals]=${slug}`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (data.docs && data.docs.length > 0) {
      return data.docs[0];
    }
    
    return null;
  } catch (error) {
    console.warn('Error fetching portfolio data:', error);
    return null;
  }
}

export default function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap the params Promise
  const { slug } = use(params);
  // Make this a client component to use useMemo hook
  return <PortfolioContent slug={slug} />;
}

function PortfolioContent({ slug }: { slug: string }) {
  const breakpointColumnsObj = useMemo(
    () => ({
      default: 3,
      1100: 2,
      768: 1, // Changed to match Tailwind's md breakpoint
    }),
    []
  );

  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getPortfolioData(slug);
      setPortfolioData(data);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return <div className="bg-blue min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!portfolioData) {
    notFound();
  }

  const { galleryGrid, decorativeElements, bannerImage } = portfolioData;

  // Helper function to get image src with fallback
  const getImageSrc = (position?: MediaItem, fallback?: string) => {
    return position?.url || fallback || null;
  };

  // Helper function to render decorative icon
  const renderDecorativeIcon = (icon?: MediaItem, position?: string, defaultPosition?: string) => {
    const iconSrc = icon?.url;
    if (!iconSrc) return null;

    return (
      <div className={position || defaultPosition || "absolute w-64 -top-33 right-5 lg:bottom-11 lg:-right-38 z-10 flex items-center justify-center"}>
        <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={248} height={200} />
      </div>
    );
  };

  return (
    <div>
      {/* Header Section - matching the old BusinessPage structure */}
      <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-3xl md:text-6xl font-medium">{portfolioData.title}</h1>
        </div>
        {portfolioData.description && (
          <p className="text-xl md:text-2xl font-thin mt-2">{portfolioData.description}</p>
        )}
      </div>

      {/* Gallery Section */}
      <div className="bg-blue">
        <div className="space-y-0">
          {/* First Masonry Section */}
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column !space-y-0">
            {/* First row (3-3-2) */}
            <div className="gallery-item h-[600px] relative mb-0">
              {getImageSrc(galleryGrid.row1?.position1) && (
                <Image 
                  src={getImageSrc(galleryGrid.row1?.position1)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            <div className="gallery-item h-[600px] relative mb-0">
              {getImageSrc(galleryGrid.row1?.position2) && (
                <Image 
                  src={getImageSrc(galleryGrid.row1?.position2)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {renderDecorativeIcon(
                decorativeElements?.icon1, 
                decorativeElements?.icon1Position,
                "absolute w-64 -top-33 right-5 lg:bottom-11 lg:-right-38 z-10 flex items-center justify-center"
              )}
            </div>

            <div className="gallery-item h-[400px] mb-0 relative">
              {getImageSrc(galleryGrid.row1?.position3) && (
                <Image 
                  src={getImageSrc(galleryGrid.row1?.position3)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            {/* Second row (3-2-3) */}
            <div className="gallery-item h-[600px] mb-0 relative">
              {getImageSrc(galleryGrid.row2?.position4) && (
                <Image 
                  src={getImageSrc(galleryGrid.row2?.position4)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            <div className="gallery-item h-[400px] mb-0 relative">
              {getImageSrc(galleryGrid.row2?.position5) && (
                <Image 
                  src={getImageSrc(galleryGrid.row2?.position5)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            <div className="gallery-item h-[600px] relative mb-0">
              {getImageSrc(galleryGrid.row2?.position6) && (
                <Image 
                  src={getImageSrc(galleryGrid.row2?.position6)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            {/* Third row (2-3-3) */}
            <div className="gallery-item h-[400px] mb-0 relative">
              {getImageSrc(galleryGrid.row3?.position7) && (
                <Image 
                  src={getImageSrc(galleryGrid.row3?.position7)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            <div className="gallery-item h-[600px] mb-0 relative">
              {getImageSrc(galleryGrid.row3?.position8) && (
                <Image 
                  src={getImageSrc(galleryGrid.row3?.position8)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            <div className="gallery-item h-[600px] mb-0 relative">
              {getImageSrc(galleryGrid.row3?.position9) && (
                <Image 
                  src={getImageSrc(galleryGrid.row3?.position9)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>
          </Masonry>

          {/* First Banner */}
          <img src={bannerImage?.url || "/images/banner.svg"} alt="banner" className="w-full h-52 md:h-auto object-cover" />

          {/* Custom Layout Section */}
          <div className="w-full space-y-0">
            <div className="flex flex-col md:flex-row justify-between items-start gap-0">
              <div className="w-full md:w-1/3 self-stretch flex flex-col space-y-0">
                <div className="bg-white h-[600px] flex items-center justify-center gallery-item relative">
                  {getImageSrc(galleryGrid.row4?.position10) && (
                    <Image 
                      src={getImageSrc(galleryGrid.row4?.position10)!} 
                      alt="Business Photography" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                      className="object-cover" 
                    />
                  )}
                </div>
                <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                  {getImageSrc(galleryGrid.row4?.position11) && (
                    <Image 
                      src={getImageSrc(galleryGrid.row4?.position11)!} 
                      alt="Business Photography" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                      className="object-cover" 
                    />
                  )}
                  {renderDecorativeIcon(
                    decorativeElements?.icon2, 
                    decorativeElements?.icon2Position,
                    "absolute -top-25 left-10 md:-bottom-40 md:-right-30"
                  )}
                </div>
                <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                  {getImageSrc(galleryGrid.row5?.position12) && (
                    <Image 
                      src={getImageSrc(galleryGrid.row5?.position12)!} 
                      alt="Business Photography" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                      className="object-cover" 
                    />
                  )}
                </div>
                <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                  {getImageSrc(galleryGrid.row5?.position13) && (
                    <Image 
                      src={getImageSrc(galleryGrid.row5?.position13)!} 
                      alt="Business Photography" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                      className="object-cover" 
                    />
                  )}
                </div>
                <div className="bg-white h-[600px] flex items-center justify-center gallery-item relative">
                  {getImageSrc(galleryGrid.row6?.position14) && (
                    <Image 
                      src={getImageSrc(galleryGrid.row6?.position14)!} 
                      alt="Business Photography" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                      className="object-cover" 
                    />
                  )}
                </div>
                <div className="bg-white h-[405px] flex items-center justify-center gallery-item relative">
                  {getImageSrc(galleryGrid.row6?.position15) && (
                    <Image 
                      src={getImageSrc(galleryGrid.row6?.position15)!} 
                      alt="Business Photography" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                      className="object-cover" 
                    />
                  )}
                </div>
              </div>

              <div className="w-full md:w-2/3 mt-0 space-y-0">
                <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                  {getImageSrc(galleryGrid.row6?.position16) && (
                    <Image 
                      src={getImageSrc(galleryGrid.row6?.position16)!} 
                      alt="Business Photography" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 67vw" 
                      className="object-cover" 
                    />
                  )}
                </div>
                <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                  {getImageSrc(galleryGrid.row7?.position17) && (
                    <Image 
                      src={getImageSrc(galleryGrid.row7?.position17)!} 
                      alt="Business Photography" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 67vw" 
                      className="object-cover" 
                    />
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-0">
                  <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                    {getImageSrc(galleryGrid.row7?.position18) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row7?.position18)!} 
                        alt="Business Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover" 
                      />
                    )}
                  </div>
                  <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                    {getImageSrc(galleryGrid.row7?.position19) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row7?.position19)!} 
                        alt="Business Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover" 
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-0">
                  <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                    {getImageSrc(galleryGrid.row7?.position20) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row7?.position20)!} 
                        alt="Business Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover" 
                      />
                    )}
                  </div>
                  <div className="w-full md:w-1/2 space-y-0">
                    <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative">
                      {getImageSrc(galleryGrid.row7?.position21) && (
                        <Image 
                          src={getImageSrc(galleryGrid.row7?.position21)!} 
                          alt="Business Photography" 
                          fill 
                          sizes="(max-width: 768px) 100vw, 33vw" 
                          className="object-cover" 
                        />
                      )}
                    </div>
                    <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative">
                      {getImageSrc(galleryGrid.row8?.position22) && (
                        <Image 
                          src={getImageSrc(galleryGrid.row8?.position22)!} 
                          alt="Business Photography" 
                          fill 
                          sizes="(max-width: 768px) 100vw, 33vw" 
                          className="object-cover" 
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                  {getImageSrc(galleryGrid.row8?.position23) && (
                    <Image 
                      src={getImageSrc(galleryGrid.row8?.position23)!} 
                      alt="Business Photography" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 67vw" 
                      className="object-cover" 
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Second Banner */}
          <img src={bannerImage?.url || "/images/banner.svg"} alt="banner" className="w-full h-52 md:h-auto object-cover" />

          {/* Final Masonry Section */}
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column !space-y-0">
            {/* First row (3-3-2) */}
            <div className="gallery-item h-[600px] relative">
              {getImageSrc(galleryGrid.row9?.position24) && (
                <Image 
                  src={getImageSrc(galleryGrid.row9?.position24)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            <div className="gallery-item h-[600px] relative">
              {getImageSrc(galleryGrid.row9?.position25) && (
                <Image 
                  src={getImageSrc(galleryGrid.row9?.position25)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            <div className="gallery-item h-[400px] relative">
              {getImageSrc(galleryGrid.row9?.position26) && (
                <Image 
                  src={getImageSrc(galleryGrid.row9?.position26)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            {/* Second row (3-2-3) */}
            <div className="gallery-item h-[600px] relative">
              {getImageSrc(galleryGrid.row10?.position27) && (
                <Image 
                  src={getImageSrc(galleryGrid.row10?.position27)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            <div className="gallery-item h-[400px] relative">
              {getImageSrc(galleryGrid.row10?.position28) && (
                <Image 
                  src={getImageSrc(galleryGrid.row10?.position28)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            <div className="gallery-item h-[600px] relative">
              {getImageSrc(galleryGrid.row10?.position29) && (
                <Image 
                  src={getImageSrc(galleryGrid.row10?.position29)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            {/* Third row (2-3-3) */}
            <div className="gallery-item h-[400px] relative">
              {getImageSrc(galleryGrid.row11?.position30) && (
                <Image 
                  src={getImageSrc(galleryGrid.row11?.position30)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>

            <div className="gallery-item h-[600px] relative">
              {getImageSrc(galleryGrid.row11?.position31) && (
                <Image 
                  src={getImageSrc(galleryGrid.row11?.position31)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {renderDecorativeIcon(
                decorativeElements?.icon3, 
                decorativeElements?.icon3Position,
                "absolute -top-20 right-10 lg:-top-20 lg:-right-35 z-10"
              )}
            </div>

            <div className="gallery-item h-[600px] relative">
              {getImageSrc(galleryGrid.row11?.position32) && (
                <Image 
                  src={getImageSrc(galleryGrid.row11?.position32)!} 
                  alt="Business Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
            </div>
          </Masonry>
        </div>
      </div>
    </div>
  );
} 
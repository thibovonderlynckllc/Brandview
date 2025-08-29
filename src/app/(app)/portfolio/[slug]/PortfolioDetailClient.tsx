'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import Masonry from 'react-masonry-css';

// Types for the portfolio data
interface MediaItem {
  url: string;
  alt?: string;
  poster?: string | { url: string };
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
}

interface DecorativeElements {
  icon1?: MediaItem;
  icon2?: MediaItem;
  icon3?: MediaItem;
}

interface PortfolioData {
  title: string;
  slug: string;
  portfolioType: string;
  description?: string;
  galleryGrid: GalleryGrid;
  decorativeElements?: DecorativeElements;
  bannerImage?: MediaItem;
}

interface PortfolioDetailClientProps {
  data: PortfolioData;
}

export default function PortfolioDetailClient({ data }: PortfolioDetailClientProps) {
  const breakpointColumnsObj = useMemo(
    () => ({
      default: 3,
      1100: 2,
      768: 1,
    }),
    []
  );

  const { galleryGrid, decorativeElements, bannerImage, portfolioType } = data;

  // Helper function to get image src with fallback
  const getImageSrc = (position?: MediaItem, fallback?: string) => {
    return position?.url || fallback || null;
  };

  // Helper function to check if media is a video
  const isVideo = (media?: MediaItem) => {
    if (!media?.url) return false;
    const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv'];
    return videoExtensions.some(ext => media.url.toLowerCase().includes(ext));
  };

  // Helper function to get video src
  const getVideoSrc = (position?: MediaItem) => {
    if (!position || !isVideo(position)) return null;
    return position.url;
  };

  // Helper function to get poster src
  const getPosterSrc = (position?: MediaItem) => {
    if (!position?.poster) return undefined;
    return typeof position.poster === 'string' ? position.poster : position.poster.url;
  };

  // Portfolio-type-specific icon rendering functions
  const renderIcon1 = (icon?: MediaItem) => {
    const iconSrc = icon?.url;
    if (!iconSrc) return null;

    switch (portfolioType) {
      case 'business':
        return (
          <div className="absolute w-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-auto md:translate-x-0 md:translate-y-0 md:-top-33 md:right-5 lg:bottom-11 lg:-right-38 z-10 flex items-center justify-center">
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} />
          </div>
        );
      case 'food':
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 md:left-auto md:translate-x-0 md:translate-y-0 md:-bottom-35 md:-bottom-35 md:-right-34 rotate-10 z-10" />
        );
      case 'portraits':
        return (
          <>
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute hidden lg:block -bottom-29 -right-25 z-10" />
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-auto md:translate-x-0 md:translate-y-0 lg:hidden md:-bottom-29 md:right-20 z-10" />
          </>
        );
      case 'products':
        return (
          <>
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute hidden lg:block bottom-30 -right-48 z-10" />
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute lg:hidden left-1/2 transform -translate-x-1/2 translate-y-1/2 -bottom-0 z-10" />
          </>
        );
      case 'corporate-events':
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-auto md:translate-x-0 md:translate-y-0 md:-bottom-17 -rotate-10 z-10" />
        );
      case 'short-content':
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-auto md:translate-x-0 md:translate-y-0 md:-top-26 md:right-20 rotate-10 z-10" />
        );
      default:
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} />
        );
    }
  };

  const renderIcon2 = (icon?: MediaItem) => {
    const iconSrc = icon?.url;
    if (!iconSrc) return null;

    switch (portfolioType) {
      case 'business':
        return (
          <Image 
            src={iconSrc} 
            alt={icon?.alt || "Decorative Icon"} 
            width={208} 
            height={208} 
            className="absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-auto md:translate-x-0 md:translate-y-0 md:-top-25 md:left-10 md:-bottom-40 md:-right-30 z-20" 
          />
        );
      case 'food':
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute -top-30 md:-left-20 md:-top-28 z-10" />
        );
      case 'portraits':
        return (
          <>
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute hidden md:block -bottom-37 -right-42 z-10" />
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 -top-0 md:hidden z-10" />
          </>
        );
      case 'products':
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:top-auto md:translate-x-0 md:translate-y-0 md:-bottom-20 md:left-25 rotate-10 z-10" />
        );
      case 'corporate-events':
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute -top-16 md:bottom-13 md:-right-40 z-10 rotate-10" />
        );
      case 'short-content':
        return (
          <>
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute hidden md:block -bottom-33 -right-33 rotate-8 z-10" />
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute md:hidden left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 rotate-8 z-10" />
          </>
        );
      default:
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} />
        );
    }
  };

  const renderIcon3 = (icon?: MediaItem) => {
    const iconSrc = icon?.url;
    if (!iconSrc) return null;

    switch (portfolioType) {
      case 'business':
        return (
          <Image 
            src={iconSrc} 
            alt={icon?.alt || "Decorative Icon"} 
            width={208} 
            height={208} 
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-auto md:translate-x-0 md:translate-y-0 md:-top-20 md:right-10 lg:-top-20 lg:-right-35 z-10" 
          />
        );
      case 'food':
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-auto md:translate-x-0 md:translate-y-0 md:right-30 md:-top-25 rotate-10 z-10" />
        );
      case 'portraits':
        return (
          <>
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute hidden lg:block -bottom-15 -right-27 rotate-5 z-10" />
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 -bottom-0 lg:hidden z-10 lg:hidden" />
          </>
        );
      case 'products':
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:-top-28 md:left-7 z-10" />
        );
      case 'corporate-events':
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-auto md:translate-x-0 md:translate-y-0 md:-top-35 md:right-12 z-10" />
        );
      case 'short-content':
        return (
          <>
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute hidden md:block -top-20 -left-18 -rotate-5 z-10" />
            <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-10 md:hidden" />
          </>
        );
      default:
        return (
          <Image src={iconSrc} alt={icon?.alt || "Decorative Icon"} width={208} height={208} />
        );
    }
  };

  // Get icons for any portfolio type
  const getPortfolioIcons = () => {
    if (!decorativeElements) {
      return { icon1: null, icon2: null, icon3: null };
    }
    
    return {
      icon1: renderIcon1(decorativeElements.icon1),
      icon2: renderIcon2(decorativeElements.icon2), 
      icon3: renderIcon3(decorativeElements.icon3)
    };
  };

  const portfolioIcons = getPortfolioIcons();

  return (
    <div>
      {/* Header Section */}
      <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-3xl md:text-6xl font-medium">{data.title}</h1>
        </div>
        {data.description && (
          <p className="text-xl md:text-2xl font-thin mt-2">{data.description}</p>
        )}
      </div>

      {/* Gallery Section */}
      <div className="bg-blue">
        <div className="space-y-0">
          {/* First Masonry Section */}
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column !space-y-0">
            {/* First row (3-3-2) */}
            <div className="gallery-item h-[600px] relative mb-0 p-0">
              {getImageSrc(galleryGrid.row1?.position1) && !isVideo(galleryGrid.row1?.position1) && (
                <Image 
                  src={getImageSrc(galleryGrid.row1?.position1)!} 
                  alt="Portfolio Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {getVideoSrc(galleryGrid.row1?.position1) && (
                <VideoPlayer 
                  src={getVideoSrc(galleryGrid.row1?.position1)!} 
                  poster={getPosterSrc(galleryGrid.row1?.position1)} 
                  className="object-cover w-full h-full" 
                />
              )}
              {/* Icon1 for food portfolio goes on position1 */}
              {portfolioType === 'food' && portfolioIcons.icon1}
            </div>

            <div className="gallery-item h-[600px] relative mb-0 p-0">
              {getImageSrc(galleryGrid.row1?.position2) && !isVideo(galleryGrid.row1?.position2) && (
                <Image 
                  src={getImageSrc(galleryGrid.row1?.position2)!} 
                  alt="Portfolio Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {getVideoSrc(galleryGrid.row1?.position2) && (
                <VideoPlayer 
                  src={getVideoSrc(galleryGrid.row1?.position2)!} 
                  poster={getPosterSrc(galleryGrid.row1?.position2)} 
                  className="object-cover w-full h-full" 
                />
              )}
              {/* Icon1 for business, corporate-events, portraits, products goes on position2 */}
              {(['business', 'corporate-events', 'portraits', 'products'].includes(portfolioType)) && portfolioIcons.icon1}
            </div>

            <div className="gallery-item h-[400px] mb-0 relative p-0">
              {getImageSrc(galleryGrid.row1?.position3) && !isVideo(galleryGrid.row1?.position3) && (
                <Image 
                  src={getImageSrc(galleryGrid.row1?.position3)!} 
                  alt="Portfolio Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {getVideoSrc(galleryGrid.row1?.position3) && (
                <VideoPlayer 
                  src={getVideoSrc(galleryGrid.row1?.position3)!} 
                  poster={getPosterSrc(galleryGrid.row1?.position3)} 
                  className="object-cover w-full h-full" 
                />
              )}
            </div>

            {/* Second row (3-2-3) */}
            <div className="gallery-item h-[600px] mb-0 relative p-0">
              {getImageSrc(galleryGrid.row2?.position4) && !isVideo(galleryGrid.row2?.position4) && (
                <Image 
                  src={getImageSrc(galleryGrid.row2?.position4)!} 
                  alt="Portfolio Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {getVideoSrc(galleryGrid.row2?.position4) && (
                <VideoPlayer src={getVideoSrc(galleryGrid.row2?.position4)!} className="object-cover w-full h-full" />
              )}
            </div>

            <div className="gallery-item h-[400px] mb-0 relative p-0">
              {getImageSrc(galleryGrid.row2?.position5) && !isVideo(galleryGrid.row2?.position5) && (
                <Image 
                  src={getImageSrc(galleryGrid.row2?.position5)!} 
                  alt="Portfolio Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {getVideoSrc(galleryGrid.row2?.position5) && (
                <VideoPlayer src={getVideoSrc(galleryGrid.row2?.position5)!} className="object-cover w-full h-full" />
              )}
            </div>

            <div className="gallery-item h-[600px] relative mb-0 p-0">
              {getImageSrc(galleryGrid.row2?.position6) && !isVideo(galleryGrid.row2?.position6) && (
                <Image 
                  src={getImageSrc(galleryGrid.row2?.position6)!} 
                  alt="Portfolio Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {getVideoSrc(galleryGrid.row2?.position6) && (
                <VideoPlayer src={getVideoSrc(galleryGrid.row2?.position6)!} className="object-cover w-full h-full" />
              )}
            </div>

            {/* Third row (2-3-3) */}
            <div className="gallery-item h-[400px] mb-0 relative p-0">
              {getImageSrc(galleryGrid.row3?.position7) && !isVideo(galleryGrid.row3?.position7) && (
                <Image 
                  src={getImageSrc(galleryGrid.row3?.position7)!} 
                  alt="Portfolio Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {getVideoSrc(galleryGrid.row3?.position7) && (
                <VideoPlayer src={getVideoSrc(galleryGrid.row3?.position7)!} className="object-cover w-full h-full" />
              )}
            </div>

            <div className="gallery-item h-[600px] mb-0 relative p-0">
              {getImageSrc(galleryGrid.row3?.position8) && !isVideo(galleryGrid.row3?.position8) && (
                <Image 
                  src={getImageSrc(galleryGrid.row3?.position8)!} 
                  alt="Portfolio Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {getVideoSrc(galleryGrid.row3?.position8) && (
                <VideoPlayer src={getVideoSrc(galleryGrid.row3?.position8)!} className="object-cover w-full h-full" />
              )}
              {/* Icon1 for short-content goes on position8 */}
              {portfolioType === 'short-content' && portfolioIcons.icon1}
            </div>

            <div className="gallery-item h-[600px] mb-0 relative p-0">
              {getImageSrc(galleryGrid.row3?.position9) && !isVideo(galleryGrid.row3?.position9) && (
                <Image 
                  src={getImageSrc(galleryGrid.row3?.position9)!} 
                  alt="Portfolio Photography" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" 
                  className="object-cover" 
                />
              )}
              {getVideoSrc(galleryGrid.row3?.position9) && (
                <VideoPlayer src={getVideoSrc(galleryGrid.row3?.position9)!} className="object-cover w-full h-full" />
              )}
            </div>
          </Masonry>

          {/* First Banner */}
          <Image src={bannerImage?.url || "/images/banner.svg"} alt="banner" width={1920} height={200} className="w-full h-52 md:h-auto object-cover" />

          {/* Custom Layout Section - Hide for products and short-content portfolio */}
          {portfolioType !== 'products' && portfolioType !== 'short-content' && (
            <div className="w-full space-y-0">
              <div className="flex flex-col md:flex-row justify-between items-start gap-0">
                <div className="w-full md:w-1/3 self-stretch flex flex-col space-y-0">
                  <div className="bg-white h-[600px] flex items-center justify-center gallery-item relative p-0">
                    {getImageSrc(galleryGrid.row4?.position10) && !isVideo(galleryGrid.row4?.position10) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row4?.position10)!} 
                        alt="Portfolio Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover" 
                      />
                    )}
                    {getVideoSrc(galleryGrid.row4?.position10) && (
                      <VideoPlayer src={getVideoSrc(galleryGrid.row4?.position10)!} className="object-cover w-full h-full" />
                    )}
                  </div>
                  <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative p-0">
                    {getImageSrc(galleryGrid.row4?.position11) && !isVideo(galleryGrid.row4?.position11) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row4?.position11)!} 
                        alt="Portfolio Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover" 
                      />
                    )}
                    {getVideoSrc(galleryGrid.row4?.position11) && (
                      <VideoPlayer src={getVideoSrc(galleryGrid.row4?.position11)!} className="object-cover w-full h-full" />
                    )}
                    {/* Icon2 for business and portraits goes on position11 */}
                    {(['business', 'portraits'].includes(portfolioType)) && portfolioIcons.icon2}
                  </div>
                  <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative p-0">
                    {getImageSrc(galleryGrid.row5?.position12) && !isVideo(galleryGrid.row5?.position12) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row5?.position12)!} 
                        alt="Portfolio Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover" 
                      />
                    )}
                    {getVideoSrc(galleryGrid.row5?.position12) && (
                      <VideoPlayer src={getVideoSrc(galleryGrid.row5?.position12)!} className="object-cover w-full h-full" />
                    )}
                  </div>
                  <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative p-0">
                    {getImageSrc(galleryGrid.row5?.position13) && !isVideo(galleryGrid.row5?.position13) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row5?.position13)!} 
                        alt="Portfolio Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover" 
                      />
                    )}
                    {getVideoSrc(galleryGrid.row5?.position13) && (
                      <VideoPlayer src={getVideoSrc(galleryGrid.row5?.position13)!} className="object-cover w-full h-full" />
                    )}
                    {/* Icon2 for corporate-events goes on position13 */}
                    {portfolioType === 'corporate-events' && portfolioIcons.icon2}
                  </div>
                  <div className="bg-white h-[600px] flex items-center justify-center gallery-item relative p-0">
                    {getImageSrc(galleryGrid.row6?.position14) && !isVideo(galleryGrid.row6?.position14) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row6?.position14)!} 
                        alt="Portfolio Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover" 
                      />
                    )}
                    {getVideoSrc(galleryGrid.row6?.position14) && (
                      <VideoPlayer src={getVideoSrc(galleryGrid.row6?.position14)!} className="object-cover w-full h-full" />
                    )}
                  </div>
                  <div className="bg-white h-[405px] flex items-center justify-center gallery-item relative p-0">
                    {getImageSrc(galleryGrid.row6?.position15) && !isVideo(galleryGrid.row6?.position15) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row6?.position15)!} 
                        alt="Portfolio Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover" 
                      />
                    )}
                    {getVideoSrc(galleryGrid.row6?.position15) && (
                      <VideoPlayer src={getVideoSrc(galleryGrid.row6?.position15)!} className="object-cover w-full h-full" />
                    )}
                  </div>
                </div>

                <div className="w-full md:w-2/3 mt-0 space-y-0">
                  <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative p-0">
                    {getImageSrc(galleryGrid.row6?.position16) && !isVideo(galleryGrid.row6?.position16) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row6?.position16)!} 
                        alt="Portfolio Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 67vw" 
                        className="object-cover" 
                      />
                    )}
                    {getVideoSrc(galleryGrid.row6?.position16) && (
                      <VideoPlayer src={getVideoSrc(galleryGrid.row6?.position16)!} className="object-cover w-full h-full" />
                    )}
                    {/* Icon2 for products goes on position16 */}
                    {portfolioType === 'products' && portfolioIcons.icon2}
                  </div>
                  <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative p-0">
                    {getImageSrc(galleryGrid.row7?.position17) && !isVideo(galleryGrid.row7?.position17) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row7?.position17)!} 
                        alt="Portfolio Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 67vw" 
                        className="object-cover" 
                      />
                    )}
                    {getVideoSrc(galleryGrid.row7?.position17) && (
                      <VideoPlayer src={getVideoSrc(galleryGrid.row7?.position17)!} className="object-cover w-full h-full" />
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row gap-0">
                    <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative p-0">
                      {getImageSrc(galleryGrid.row7?.position18) && !isVideo(galleryGrid.row7?.position18) && (
                        <Image 
                          src={getImageSrc(galleryGrid.row7?.position18)!} 
                          alt="Portfolio Photography" 
                          fill 
                          sizes="(max-width: 768px) 100vw, 33vw" 
                          className="object-cover" 
                        />
                      )}
                      {getVideoSrc(galleryGrid.row7?.position18) && (
                        <VideoPlayer src={getVideoSrc(galleryGrid.row7?.position18)!} className="object-cover w-full h-full" />
                      )}
                      {/* Icon2 for short-content goes on position18 */}
                      {portfolioType === 'short-content' && portfolioIcons.icon2}
                    </div>
                    <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative p-0">
                      {getImageSrc(galleryGrid.row7?.position19) && !isVideo(galleryGrid.row7?.position19) && (
                        <Image 
                          src={getImageSrc(galleryGrid.row7?.position19)!} 
                          alt="Portfolio Photography" 
                          fill 
                          sizes="(max-width: 768px) 100vw, 33vw" 
                          className="object-cover" 
                        />
                      )}
                      {getVideoSrc(galleryGrid.row7?.position19) && (
                        <VideoPlayer src={getVideoSrc(galleryGrid.row7?.position19)!} className="object-cover w-full h-full" />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-0">
                    <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative p-0">
                      {getImageSrc(galleryGrid.row7?.position20) && !isVideo(galleryGrid.row7?.position20) && (
                        <Image 
                          src={getImageSrc(galleryGrid.row7?.position20)!} 
                          alt="Portfolio Photography" 
                          fill 
                          sizes="(max-width: 768px) 100vw, 33vw" 
                          className="object-cover" 
                        />
                      )}
                      {getVideoSrc(galleryGrid.row7?.position20) && (
                        <VideoPlayer src={getVideoSrc(galleryGrid.row7?.position20)!} className="object-cover w-full h-full" />
                      )}
                    </div>
                    <div className="w-full md:w-1/2 space-y-0">
                      <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative p-0">
                        {getImageSrc(galleryGrid.row7?.position21) && !isVideo(galleryGrid.row7?.position21) && (
                          <Image 
                            src={getImageSrc(galleryGrid.row7?.position21)!} 
                            alt="Portfolio Photography" 
                            fill 
                            sizes="(max-width: 768px) 100vw, 33vw" 
                            className="object-cover" 
                          />
                        )}
                        {getVideoSrc(galleryGrid.row7?.position21) && (
                          <VideoPlayer src={getVideoSrc(galleryGrid.row7?.position21)!} className="object-cover w-full h-full" />
                        )}
                        {/* Icon2 for food goes on position21 */}
                        {portfolioType === 'food' && portfolioIcons.icon2}
                      </div>
                      <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative p-0">
                        {getImageSrc(galleryGrid.row8?.position22) && !isVideo(galleryGrid.row8?.position22) && (
                          <Image 
                            src={getImageSrc(galleryGrid.row8?.position22)!} 
                            alt="Portfolio Photography" 
                            fill 
                            sizes="(max-width: 768px) 100vw, 33vw" 
                            className="object-cover" 
                          />
                        )}
                        {getVideoSrc(galleryGrid.row8?.position22) && (
                          <VideoPlayer src={getVideoSrc(galleryGrid.row8?.position22)!} className="object-cover w-full h-full" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative p-0">
                    {getImageSrc(galleryGrid.row8?.position23) && !isVideo(galleryGrid.row8?.position23) && (
                      <Image 
                        src={getImageSrc(galleryGrid.row8?.position23)!} 
                        alt="Portfolio Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 67vw" 
                        className="object-cover" 
                      />
                    )}
                    {getVideoSrc(galleryGrid.row8?.position23) && (
                      <VideoPlayer src={getVideoSrc(galleryGrid.row8?.position23)!} className="object-cover w-full h-full" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTE: Update your database to only provide 23 items per portfolio! */}
        </div>
      </div>
    </div>
  );
}

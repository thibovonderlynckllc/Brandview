import MasonryGallery from './components/MasonryGallery';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {

  return (
    <div>
      <div className="px-8 sm:px-16 bg-blue pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/portfolio/short-content" className="cursor-pointer transform transition-transform duration-300 hover:scale-102 group">
                        <div className="relative pt-6">
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                        <span className="text-[23px] font-medium whitespace-nowrap transition-colors duration-300 group-hover:text-blue">Short content</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/portfolio/food" className="cursor-pointer transform transition-transform duration-300 hover:scale-102 group">
                        <div className="relative pt-6">
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                        <span className="text-[23px] font-medium whitespace-nowrap transition-colors duration-300 group-hover:text-blue">food</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/portfolio/portraits" className="cursor-pointer transform transition-transform duration-300 hover:scale-102 z-10 group">
                        <div className="relative pt-6">
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                        <span className="text-[23px] font-medium whitespace-nowrap transition-colors duration-300 group-hover:text-blue">portraits</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 -right-6 lg:-right-26 sm:-right-15 sm:-bottom-5 lg:-bottom-23 w-32 sm:w-40 lg:w-48 rotate-10 z-10 transition-transform duration-300 group-hover:rotate-12">
                                    <Image 
                                        src="/images/icons/camera.svg" 
                                        alt="Camera" 
                                        width={192}
                                        height={192}
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/portfolio/business" className="cursor-pointer transform transition-transform duration-300 hover:scale-102 group">
                        <div className="relative pt-6">
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                        <span className="text-[23px] font-medium whitespace-nowrap transition-colors duration-300 group-hover:text-blue">business</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <h2 className="text-[2.5rem] font-thin py-10 max-w-[100%] lg:max-w-[60%] leading-none">
                Hire brandview for short content, (corporate) events, portraits, product, business and food photography. And so much more...
                </h2>
            </div>
            
            
            <div className="bg-blue">
                <MasonryGallery />
            </div>
        </div>
    );
}

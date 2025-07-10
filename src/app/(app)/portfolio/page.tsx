import Image from 'next/image';
import Link from 'next/link';

const PortfolioPage = () => {
    return (
        <div className="bg-blue">
            <div className="px-8 sm:px-16 pt-1">
                {/* Portfolio grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/portfolio/business" className="cursor-pointer transform transition-transform duration-300 hover:scale-102 group">
                        <div className="relative pt-6">
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                        <span className="text-[23px] font-medium text-red whitespace-nowrap transition-colors duration-300 group-hover:text-blue">business</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/portfolio/corporate-events" className="cursor-pointer transform transition-transform duration-300 hover:scale-102 group">
                        <div className="relative pt-6">
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                        <span className="text-[23px] font-medium text-red whitespace-nowrap transition-colors duration-300 group-hover:text-blue">(corporate) events</span>
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
                                        <span className="text-[23px] font-medium text-red whitespace-nowrap transition-colors duration-300 group-hover:text-blue">food</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/portfolio/portraits" className="cursor-pointer transform transition-transform duration-300 hover:scale-102 group">
                        <div className="relative pt-6">
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                        <span className="text-[23px] font-medium text-red whitespace-nowrap transition-colors duration-300 group-hover:text-blue">portraits</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/portfolio/products" className="cursor-pointer transform transition-transform duration-300 hover:scale-102 z-10 group">
                        <div className="relative pt-6">
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                        <span className="text-[23px] font-medium text-red whitespace-nowrap transition-colors duration-300 group-hover:text-blue">products</span>
                                    </div>
                                </div>
                                <div className="absolute -right-5 md:-right-28 -top-25 sm:-top-30 md:-top-32 w-32 sm:w-42 md:w-48 rotate-10 z-10 transition-transform duration-300 group-hover:rotate-12">
                                    <Image src="/images/icons/camera.svg" alt="Camera" width={192} height={192} />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/portfolio/short-content" className="cursor-pointer transform transition-transform duration-300 hover:scale-102 group">
                        <div className="relative pt-6">
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                        <span className="text-[23px] font-medium text-red whitespace-nowrap transition-colors duration-300 group-hover:text-blue">short content</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <Image src="/images/banner.svg" alt="banner" width={1920} height={200} className="w-full h-52 md:h-auto pt-10 object-cover" />
        </div>
    )
}

export default PortfolioPage;
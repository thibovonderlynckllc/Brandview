import Image from 'next/image';

const AboutPage = () => {
    return (
        <div>
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-6xl font-medium">Less posing. More presence. <br />
                    We capture the real story behind your brand.</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">about us</p>
            </div>
            <div className="bg-blue pt-10">
                <div className="px-8 sm:px-16">
                    <h1 className="text-4xl md:text-6xl font-light text-center mb-15">what sets us apart…</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center pb-10">
                        <div className="relative pt-6 h-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-28 bg-blue rounded-full border-[2px] border-red flex items-center justify-center z-10">
                                <span className="text-[5.3rem] font-light leading-none flex items-center justify-center">1</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-[1.5px] border-red relative p-8 pt-18 flex flex-col">
                                <h2 className="text-4xl font-medium text-red text-center mb-6">young & driven</h2>
                                <p className="text-[23px] font-light text-red">We&apos;re a young team raised in the world of TikTok, Instagram and fast-paced visual culture. We understand what works on screen and in the scroll. And we bring that fresh perspective to every project.</p>
                            </div>
                        </div>
                        <div className="relative pt-6 h-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-28 bg-blue rounded-full border-[2px] border-red flex items-center justify-center z-10">
                                <span className="text-[5.3rem] font-light leading-none flex items-center justify-center">2</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-[1.5px] border-red relative p-8 pt-18 flex flex-col">
                                <h2 className="text-4xl font-medium text-red text-center mb-6">small team, big focus</h2>
                                <p className="text-[23px] font-light text-red">Being a small team means smooth communication and hands-on production. No slow approvals or unclear contacts. You work directly with the maker who shapes your content.</p>
                            </div>
                        </div>
                        <div className="relative pt-6 h-full md:col-span-2 lg:col-span-1">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-28 bg-blue rounded-full border-[2px] border-red flex items-center justify-center z-10">
                                <span className="text-[5.3rem] font-light leading-none flex items-center justify-center">3</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-[1.5px] border-red relative p-8 pt-18 flex flex-col">
                                <h2 className="text-4xl font-medium text-red text-center mb-6">from concept to creation</h2>
                                <p className="text-[23px] font-light text-red">We&apos;re not just executors, we help shape the idea too. Whether you need one visual or a full campaign, we think creatively and deliver with technical precision to make your content cohesive and effective.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-4 mb-20 xl:mb-40 px-8 sm:px-16 xl:pl-0 xl:pr-16">
                    <div className="w-full xl:w-1/2 flex justify-center">
                        <div className="w-full aspect-square gallery-item relative">
                            <Image 
                                src="/images/icons/brandview.svg" 
                                alt="Brandview logo" 
                                width={80} 
                                height={80} 
                                className="absolute -bottom-10 rotate-8 -right-5 md:-bottom-20 xl:-bottom-40 xl:-right-20 w-22 sm:w-32 md:w-52 lg:w-62"
                            />
                            <Image 
                                src="/images/icons/person.svg" 
                                alt="Brandview logo" 
                                width={80} 
                                height={80} 
                                className="absolute left-65 -bottom-30 md:left-90 xl:left-35 xl:-bottom-30 w-22 lg:w-62 2xl:w-62 2xl:left-60 2xl:-bottom-50 hidden sm:block"
                            />
                        </div>
                    </div>
                    <div className="w-full xl:w-1/2 flex flex-col gap-4 mt-6 xl:mt-0 justify-center">
                        <p className="text-xl xl:text-[23px] font-light font-medium">creative force & founder</p>
                        <h1 className="text-4xl md:text-6xl font-medium">Reinout Ghijs</h1>
                        <p className="text-lg xl:text-[23px] font-light leading-tight">A visual storyteller with a sharp eye for detail and a passion for purposeful content. I create short-form content, guide video productions and contribute to concept development and visual strategy.<br /> <br />At Foodphoto Ghent, I worked on projects for brands like Alpro, Lotus, Danone, Quick, and Vandemoortele. That experience shaped my professional approach to content. Efficient, creative, and always visually polished. <br /> <br />With Brandview, I focus on delivering sharp, brand-driven visuals that make an impact. From short video stories to styled photography, I merge technical skill with creative intuition to help businesses stand out.</p>
                    </div>
                </div>

                <div className="flex flex-col-reverse xl:flex-row gap-4 mt-6 px-8 sm:px-16 xl:pl-16 xl:pr-0">
                    <div className="w-full xl:w-1/2 flex flex-col gap-4 justify-center">
                        <h1 className="text-4xl md:text-6xl font-medium">what we do</h1>
                        <p className="text-lg xl:text-[23px] font-light leading-tight mb-4">At Brandview, we offer a versatile and focused range of services to help businesses grow through strong visual communication:</p>
                        <div>
                            <p className="font-medium text-xl xl:text-[23px]">business photography</p>
                            <p className="text-lg xl:text-[23px] font-light">Professional imagery that reflects and enhances your brand identity.</p>
                        </div>
                        <div>
                            <p className="font-medium text-xl xl:text-[23px]">(corporate) event photography</p>
                            <p className="text-lg xl:text-[23px] font-light">Candid, atmospheric images that capture key moments and energy.</p>
                        </div>
                        <div>
                            <p className="font-medium text-xl xl:text-[23px]">food photography</p>
                            <p className="text-lg xl:text-[23px] font-light">Mouthwatering visuals that make your dishes stand out.</p>
                        </div>
                        <div>
                            <p className="font-medium text-xl xl:text-[23px]">product photography</p>
                            <p className="text-lg xl:text-[23px] font-light">Clean, scroll-stopping shots for webshops, ads or catalogues.</p>
                        </div>
                        <div>
                            <p className="font-medium text-xl xl:text-[23px]">portraits</p>
                            <p className="text-lg xl:text-[23px] font-light">Authentic and approachable images of you or your team.</p>
                        </div>
                        <div>
                            <p className="font-medium text-xl xl:text-[23px]">short content</p>
                            <p className="text-lg xl:text-[23px] font-light">Fast-paced, engaging videos tailor-made for social media. 
                            From concept to final edit.</p>
                        </div>
                    </div>
                    <div className="w-full xl:w-1/2 flex justify-center">
                        <div className="w-full aspect-square gallery-item relative">
                            <Image 
                                src="/images/icons/bulb.svg" 
                                alt="Bulb icon" 
                                width={80} 
                                height={80} 
                                className="absolute -top-15 xl:-top-40 xl:left-15 -rotate-3 left-15 w-22 xl:w-62"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-8 sm:px-16 pt-10">
                    <div className="h-[2px] bg-red w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;
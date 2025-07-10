import Image from 'next/image';

const ContactPage = () => {
    return (
        <div>
            {/* Hero section */}
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium">Big ideas start with a simple hello.</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">contact</p>
            </div>

            <div className="px-8 sm:px-16 py-10 bg-blue relative">
                <div className="flex flex-col lg:flex-row justify-between gap-16">
                    {/* Form Section */}
                    <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-lg md:text-[23px] mb-2 font-medium">first name <span className="font-light">(required)</span></label>
                                <input type="text" className="w-full px-4 py-4 md:py-6 rounded-3xl border-2 border-red bg-white focus:outline-none focus:border-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300" />
                            </div>
                            <div>
                                <label className="block text-lg md:text-[23px] mb-2 font-medium">last name <span className="font-light">(required)</span></label>
                                <input type="text" className="w-full px-4 py-4 md:py-6 rounded-3xl border-2 border-red bg-white focus:outline-none focus:border-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300" />
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <label className="block text-lg md:text-[23px] mb-2 font-medium">phone number <span className="font-light">(required)</span></label>
                            <input type="tel" className="w-full px-4 py-4 md:py-6 rounded-3xl border-2 border-red bg-white focus:outline-none focus:border-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300" />
                        </div>

                        <div className="mb-8">
                            <label className="block text-lg md:text-[23px] mb-2 font-medium">email <span className="font-light">(required)</span></label>
                            <input type="email" className="w-full px-4 py-4 md:py-6 rounded-3xl border-2 border-red bg-white focus:outline-none focus:border-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300" />
                        </div>

                        <div className="mb-8">
                            <label className="block text-lg md:text-[23px] mb-2 font-medium">message</label>
                            <textarea className="w-full px-4 py-4 md:py-6 rounded-3xl border-2 border-red bg-white h-40 resize-none focus:outline-none focus:border-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300"></textarea>
                        </div>

                        <div className="flex justify-center">
                            <button className="bg-red text-blue text-xl md:text-[2.5rem] px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-opacity-90 transition-colors font-medium">send it off</button>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="text-lg md:text-[23px] pt-4 w-full lg:w-[300px]">
                        <h1 className="text-4xl md:text-5xl xl:text-6xl mb-4">brandview</h1>
                        
                        <div className="space-y-6 text-lg md:text-[23px]">
                            <div>
                                <h2 className="font-medium mb-2">phone number</h2>
                                <a href="tel:+32471460708" className="font-light relative w-fit group cursor-pointer block">
                                    (+32) 471 46 07 08
                                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>

                            <div>
                                <h2 className="font-medium mb-2">email address</h2>
                                <a href="mailto:collab@brandview.be" className="font-light relative w-fit group cursor-pointer block">
                                    collab@brandview.be
                                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>

                            <div>
                                <h2 className="font-medium mb-2">address</h2>
                                <a 
                                    href="https://www.google.com/maps/search/?api=1&query=Brugse+Heirweg+111,+8211+Aartrijke" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="group cursor-pointer"
                                >
                                    <div className="relative w-fit">
                                        <p className="font-light">Brugse Heirweg 111</p>
                                        <p className="font-light">8211 Aartrijke</p>
                                        <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Laptop Illustration */}
                        <div className="hidden lg:block absolute bottom-20 w-32 md:w-42 lg:w-62">
                            <Image src="/images/icons/laptop.svg" alt="Laptop" width={248} height={200} className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </div>
            <Image src="/images/banner.svg" alt="banner" width={1920} height={200} className="w-full h-52 md:h-auto object-cover" />
        </div>
    )
}

export default ContactPage;
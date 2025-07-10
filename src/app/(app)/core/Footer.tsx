import Link from 'next/link'

const Footer = () => {
    return (
        <div className="bg-blue">
            <footer className="px-28 py-10 flex flex-col lg:flex-row justify-between lg:items-start gap-10 lg:gap-5 xl:gap-0 max-w-screen-2xl mx-auto w-full">
                {/* Tagline section */}
                <div className="text-center">
                    <h1 className="font-light text-5xl xl:text-6xl text-red">Quick, clever and<br />sharp short content.</h1>
                </div>

                {/* Explore more section */}
                <div className="text-center">
                    <h2 className="font-medium text-4xl text-red mb-3">explore more</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center">
                        <ul className="space-y-3 text-red font-light text-[23px] py-2">
                            <li>
                                <Link href="/" className="cursor-pointer text-center relative group inline-block">
                                    <span>home</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="cursor-pointer text-center relative group inline-block">
                                    <span>services</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="cursor-pointer text-center relative group inline-block">
                                    <span>portfolio</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        </ul>
                        <div className="hidden sm:block mx-8 h-32 w-[2px] bg-red"></div>
                        <ul className="space-y-3 text-red font-light text-[23px] py-2">
                            <li>
                                <Link href="/about" className="cursor-pointer text-center relative group inline-block">
                                    <span>about us</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/rates" className="cursor-pointer text-center relative group inline-block">
                                    <span>our rates</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="cursor-pointer text-center relative group inline-block">
                                    <span>contact</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Let's connect section */}
                <div className="text-center">
                    <h2 className="font-medium text-4xl text-red mb-3">let&apos;s connect</h2>
                    <ul className="space-y-3 text-red font-light text-[23px]">
                        <li className="cursor-pointer text-center flex justify-center">
                            <span className="relative group inline-block">
                                <span>Instagram</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </li>
                        <li className="cursor-pointer text-center flex justify-center">
                            <span className="relative group inline-block">
                                <span>Facebook</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </li>
                        <li className="cursor-pointer text-center flex justify-center">
                            <span className="relative group inline-block">
                                <span>LinkedIn</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
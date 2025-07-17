"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(path);
    };

    const getNavItemClasses = (path: string) => {
        const baseClasses = "border border-red border-[1.5px] rounded-full px-4 xl:px-6 py-[6.5px] transition-all duration-300 flex items-center";
        const activeClasses = "bg-red text-blue";
        const inactiveClasses = "hover:bg-red hover:text-blue";
        
        return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
    };

    const getMobileNavItemClasses = (path: string) => {
        const baseClasses = "border border-red border-[1.5px] rounded-full px-6 py-[6.5px] transition-all duration-300 flex items-center";
        const activeClasses = "bg-red text-blue";
        const inactiveClasses = "hover:bg-red hover:text-blue";
        
        return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
    };

    return (
        <div className="bg-blue sticky top-0 z-50">
            <nav className="px-14 py-6">
                <div className="flex justify-between items-center max-w-[1600px] mx-auto">
                    <div className="w-[200px] lg:w-[220px] xl:w-[330px]">
                        <Link href="/">
                            <Image src="/images/logo.svg" width={380} height={380} alt="Brandview Logo" className="w-full h-auto" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block flex-1 pl-8">
                        <ul className="flex gap-3 xl:gap-6 font-medium text-[1.1rem] xl:text-[1.2rem] cursor-pointer justify-end">
                            <li className={getNavItemClasses("/")}>
                                <Link href="/" className="w-full">home</Link>
                            </li>
                            <li className={getNavItemClasses("/services")}>
                                <Link href="/services" className="w-full">services</Link>
                            </li>
                            <li className={getNavItemClasses("/portfolio")}>
                                <Link href="/portfolio" className="w-full">portfolio</Link>
                            </li>
                            <li className={getNavItemClasses("/about")}>
                                <Link href="/about" className="w-full">about us</Link>
                            </li>
                            <li className={getNavItemClasses("/rates")}>
                                <Link href="/rates" className="w-full">our packages</Link>
                            </li>
                            <li className={getNavItemClasses("/contact")}>
                                <Link href="/contact" className="w-full">contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="lg:hidden"
                        aria-label="Toggle mobile menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Mobile Menu Overlay */}
                    <div 
                        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                        onClick={() => setIsOpen(false)} 
                    />

                    {/* Mobile Menu Panel */}
                    <div className={`fixed top-0 left-0 h-full w-[300px] bg-blue z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="flex justify-between items-center px-6 py-8 border-b">
                            <Link href="/">
                                <Image src="/images/logo.svg" width={200} height={200} alt="Brandview Logo" className="w-auto h-11" />
                            </Link>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="hover:text-red transition-colors"
                                aria-label="Close mobile menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <ul className="flex flex-col gap-4 font-medium text-[1.4rem] cursor-pointer">
                                <li className={getMobileNavItemClasses("/")}>
                                    <Link href="/" className="w-full" onClick={() => setIsOpen(false)}>home</Link>
                                </li>
                                <li className={getMobileNavItemClasses("/services")}>
                                    <Link href="/services" className="w-full" onClick={() => setIsOpen(false)}>services</Link>
                                </li>
                                <li className={getMobileNavItemClasses("/portfolio")}>
                                    <Link href="/portfolio" className="w-full" onClick={() => setIsOpen(false)}>portfolio</Link>
                                </li>
                                <li className={getMobileNavItemClasses("/about")}>
                                    <Link href="/about" className="w-full" onClick={() => setIsOpen(false)}>about us</Link>
                                </li>
                                <li className={getMobileNavItemClasses("/rates")}>
                                    <Link href="/rates" className="w-full" onClick={() => setIsOpen(false)}>our packages</Link>
                                </li>
                                <li className={getMobileNavItemClasses("/contact")}>
                                    <Link href="/contact" className="w-full" onClick={() => setIsOpen(false)}>contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;

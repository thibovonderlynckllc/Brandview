import Image from 'next/image';

const RatesPage = () => {
    return (
        <div>
            {/* Hero section */}
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium">A fixed package or customized?</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">our rates</p>
            </div>

            <div className="bg-blue pt-10">
                <div className="px-8 sm:px-16">
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-light text-center mb-2">content plans</h1>
                    <p className="text-lg md:text-[23px] font-light text-center mb-8 md:mb-15">monthly packages (min. 6 months)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-6 text-center pb-10">
                        {/* Starter pack */}
                        <div className="relative pt-6 h-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue border-[2px] border-red flex items-center justify-center z-10 px-4 sm:px-8 py-4 sm:py-6 rounded-full">
                                <span className="text-2xl sm:text-3xl md:text-[3rem] font-medium leading-none whitespace-nowrap">starter pack</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-2 border-red relative py-8 px-4 md:px-15 pt-16 flex flex-col">
                                <p className="text-lg md:text-[23px] font-light text-center mb-4 pb-4 border-b-2 border-red">= basic package</p>
                                <div className="flex flex-col gap-2 text-base sm:text-lg md:text-[23px] font-light">
                                    <p>2 shortform videos (max. 30 sec)</p>
                                    <p>8 edited photos</p>
                                    <p>professional lightning</p>
                                    <p>Simple image correction & color editing</p>
                                    <p>Basic post-processing in your house style</p>
                                    <p className="mb-4">Delivery within 14 working days</p>
                                </div>
                                <div className="mt-auto border-t-2 border-red">
                                    <p className="text-lg md:text-[23px] font-light pt-4">€ 950 exclusive btw</p>
                                </div>
                            </div>
                        </div>
                        {/* Brand builder */}
                        <div className="relative pt-6 h-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue border-[2px] border-red flex items-center justify-center z-10 px-4 sm:px-8 py-4 sm:py-6 rounded-full">
                                <span className="text-2xl sm:text-3xl md:text-[3rem] font-medium leading-none whitespace-nowrap">brand builder</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-2 border-red relative py-8 px-4 md:px-15 pt-16 flex flex-col">
                                <p className="text-lg md:text-[23px] font-light text-center mb-4 pb-4 border-b-2 border-red">= pro package</p>
                                <div className="flex flex-col gap-2 text-base sm:text-lg md:text-[23px] font-light">
                                    <p>12 edited photos</p>
                                    <p>4 shortform video (max. 30 sec)</p>
                                    <p>creative on set</p>
                                    <p>Simple image correction & color editing</p>
                                    <p>Basic post-processing in your house style</p>
                                    <p className="mb-4">Delivery within 14 working days</p>
                                </div>
                                <div className="mt-auto border-t-2 border-red">
                                    <p className="text-lg md:text-[23px] font-light pt-4">€ 1.470 exclusive btw</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-light text-center mb-2">flash deals</h1>
                    <p className="text-lg md:text-[23px] font-light text-center mb-8 md:mb-15">one-time collaboration (1 month)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-6 text-center pb-10">
                        {/* Focus */}
                        <div className="relative pt-6 h-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue border-[2px] border-red flex items-center justify-center z-10 px-4 sm:px-8 py-4 sm:py-6 rounded-full">
                                <span className="text-2xl sm:text-3xl md:text-[3rem] font-medium leading-none whitespace-nowrap">focus</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-2 border-red relative py-8 px-4 md:px-15 pt-16 flex flex-col">
                                <p className="text-lg md:text-[23px] font-light text-center mb-4 pb-4 border-b-2 border-red">= basic package</p>
                                <div className="flex flex-col gap-2 text-base sm:text-lg md:text-[23px] font-light">
                                    <p>2 shortform videos (max. 30 sec)</p>
                                    <p>8 edited photos</p>
                                    <p>professional lightning</p>
                                    <p>Simple image correction & color editing</p>
                                    <p>Basic post-processing in your house style</p>
                                    <p className="mb-4">Delivery within 14 working days</p>
                                </div>
                                <div className="mt-auto border-t-2 border-red">
                                    <p className="text-lg md:text-[23px] font-light pt-4">€ 1.100 exclusive btw</p>
                                </div>
                            </div>
                        </div>
                        {/* Full frame */}
                        <div className="relative pt-6 h-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue border-[2px] border-red flex items-center justify-center z-10 px-4 sm:px-8 py-4 sm:py-6 rounded-full">
                                <span className="text-2xl sm:text-3xl md:text-[3rem] font-medium leading-none whitespace-nowrap">full frame</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-2 border-red relative py-8 px-4 md:px-15 pt-16 flex flex-col">
                                <p className="text-lg md:text-[23px] font-light text-center mb-4 pb-4 border-b-2 border-red">= pro package</p>
                                <div className="flex flex-col gap-2 text-base sm:text-lg md:text-[23px] font-light">
                                    <p>12 edited photos</p>
                                    <p>4 shortform video (max. 30 sec)</p>
                                    <p>creative on set</p>
                                    <p>Simple image correction & color editing</p>
                                    <p>Basic post-processing in your house style</p>
                                    <p className="mb-4">Delivery within 14 working days</p>
                                </div>
                                <div className="mt-auto border-t-2 border-red">
                                    <p className="text-lg md:text-[23px] font-light pt-4">€ 1.570 exclusive btw</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-light text-center mb-2">add-ons</h1>
                    <p className="text-lg md:text-[23px] font-light text-center mb-8 md:mb-15">optional extras</p>
                    <div className="flex justify-center pb-10">
                        {/* Boosters */}
                        <div className="relative pt-6 w-full md:w-[min(100%,800px)]">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue border-[2px] border-red flex items-center justify-center z-10 px-4 sm:px-8 py-4 sm:py-6 rounded-full">
                                <span className="text-2xl sm:text-3xl md:text-[3rem] font-medium leading-none whitespace-nowrap">boosters</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-2 border-red relative py-8 px-4 md:px-15 pt-16 flex flex-col">
                                <div className="absolute -top-20 right-0 md:-right-10 md:-top-40 lg:-right-25 w-18 sm:w-24 lg:w-52 md:w-42 2xl:w-64 2xl:-top-48 2xl:-right-54">
                                    <Image src="/images/icons/megaphone.svg" alt="Megaphone" width={256} height={256} />
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-base sm:text-lg md:text-[23px] font-light relative">
                                    <div className="flex flex-col items-end gap-4 pr-4 md:pr-8">
                                        <p>extra video</p>
                                        <p>10 extra photo&apos;s</p>
                                        <p>fast delivery 48h</p>
                                        <p>fast delivery 72h</p>
                                        <p>stylist on set</p>
                                        <p className="mb-4">subtitles</p>
                                    </div>
                                    <div className="flex flex-col items-start gap-4 pl-4 md:pl-8 border-l-2 border-red">
                                        <p>€ 450 exclusive btw</p>
                                        <p>€ 150 exclusive btw</p>
                                        <p>€ 100 exclusive btw</p>
                                        <p>€ 150 exclusive btw</p>
                                        <p>€ 500 exclusive btw</p>
                                        <p className="mb-4">€ 50 exclusive btw</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 sm:px-16">
                    <div className="h-[2px] bg-red w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default RatesPage;
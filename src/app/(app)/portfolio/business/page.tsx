import BusinessMasonryGallery from '../../components/BusinessGallery';

const BusinessPage = () => {
    return (
        <div>
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-6xl font-medium">Professional doesn&apos;t mean generic.</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">business photography</p>
            </div>

            <div className="bg-blue">
                <BusinessMasonryGallery />
            </div>
        </div>
    )
}

export default BusinessPage;
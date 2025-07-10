import ShortContentMasonryGallery from '../../components/ShortContentGallery';

const ShortContentPage = () => {
    return (
        <div>
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-6xl font-medium">Big impact, short format.</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">short content </p>
            </div>

            <div className="bg-blue">
                <ShortContentMasonryGallery />
            </div>
        </div>
    )
}

export default ShortContentPage; 
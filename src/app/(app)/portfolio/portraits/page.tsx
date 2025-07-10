import PortraitsMasonryGallery from '../../components/PortraitsGallery';

const PortraitsPage = () => {
    return (
        <div>
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-6xl font-medium">Less posing. More presence.</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">portraits</p>
            </div>

            <div className="bg-blue">
                <PortraitsMasonryGallery />
            </div>
        </div>
    )
}

export default PortraitsPage; 
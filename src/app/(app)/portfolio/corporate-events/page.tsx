import CorporateEventsMasonryGallery from '../../components/CorporateEventsGallery';

const CorporateEventsPage = () => {
    return (
        <div>
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-6xl font-medium">We don&apos;t capture the event, we frame the energy.</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">(corporate) events</p>
            </div>

            <div className="bg-blue">
                <CorporateEventsMasonryGallery />
            </div>
        </div>
    )
}

export default CorporateEventsPage; 
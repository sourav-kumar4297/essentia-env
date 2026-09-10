import React from 'react'
import PageHeroSection from '../Components/PageHeroSection'
import MediaCard from '../Components/mediaSections/MediaCard';


function Media() {
    return (
        <div className="min-h-screen bg-black text-white font-lato">
            <PageHeroSection
                image="/Media/media-hero.webp"
                title="media"
                clastyle="object-top"
            />
            <MediaCard />
        </div>
    )
}

export default Media;

import React from 'react'
import WhyBuildWithEssentia from '../Components/careerSections/WhyBuildWithEssentia';
import PageHeroSection from '../Components/PageHeroSection';
import CareerForm from '../Components/careerSections/CareerForm';


function Career() {
    return (
        <div className="min-h-screen bg-black text-white font-lato">
            <PageHeroSection
                image="/CareerImgs/career-hero.webp"
                title={<>Join us in building <br /> the future</>}
                titleSize="text-[50px] md:text-[65px]"

            />

            <WhyBuildWithEssentia />
            <CareerForm />
        </div>
    )
}

export default Career;

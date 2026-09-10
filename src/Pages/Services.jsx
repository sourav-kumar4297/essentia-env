import React from 'react'
import ServDetails from '../Components/servicesSections/ServDetails';
import ServicesPage from '../Components/servicesSections/ServicesPage';
import PageHeroSection from '../Components/PageHeroSection';


function Services() {
    return (
        <div className="min-h-screen bg-black text-white font-lato">
            <PageHeroSection
                image="/service.webp"
                title="services"
            />
            <ServDetails />
            <ServicesPage />
        </div>
    )
}

export default Services;

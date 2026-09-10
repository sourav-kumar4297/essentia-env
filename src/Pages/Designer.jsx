import React from 'react'
import PageHeroSection from '../Components/PageHeroSection';
import DesingerTeam from '../Components/designer/DesingerTeam';

function Designer() {
 return (
 <div className="min-h-screen bg-black text-white font-lato">
 <PageHeroSection
 image="/Designer/designer-hero.webp"
 title="designer"
 clastyle =" object-bottom"
 />
 <DesingerTeam />
 
 </div>
 )
}

export default Designer;

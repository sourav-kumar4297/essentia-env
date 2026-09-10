import React from 'react'
import ProCard from '../Components/ProjectSection/ProCrad';
import PageHeroSection from '../Components/PageHeroSection';



function Projects() {
 return (
 <div className="min-h-screen bg-black text-white font-lato">
 <PageHeroSection
 image="ProImgs/project-hero.webp"
 title="projects"
 clastyle=""
 />
 <ProCard />
 </div>
 )
}

export default Projects;

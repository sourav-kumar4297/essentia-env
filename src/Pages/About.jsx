import React from 'react'
import AboutContent from '../Components/aboutSection/AboutContent'
import AboutDetails from '../Components/aboutSection/AboutDetails'
import PageHeroSection from '../Components/PageHeroSection'
import FaqSection from '../Components/aboutSection/FaqSection'
import MeetFounders from '../Components/aboutSection/MeetFounders'
// import TeamSection from '../Components/aboutSection/TeamSection'
import TeamImgSection from '../Components/aboutSection/TeamImgSection'
import CoreTeam from '../Components/aboutSection/CoreTeam'

function About() {
 return (
 <div className="min-h-screen bg-black text-white font-lato">
 <PageHeroSection
 image="/AboutImgs/about-hero.webp"
 title="about us"
 clastyle=""
 />

 <AboutContent />
 <AboutDetails />
 <MeetFounders />
 {/* <TeamSection /> */}
 <CoreTeam />
 <TeamImgSection />
 <FaqSection />
 </div>
 )
}

export default About

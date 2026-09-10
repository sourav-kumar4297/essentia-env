import React from 'react'
import PageHeroSection from '../Components/PageHeroSection'
import BlogList from '../Components/bloagSection/BlogList';


function Blog() {
    return (
        <div className="min-h-screen bg-black text-white font-lato">
            <PageHeroSection
                image="/ProImgs/leeford/leeford2_result.webp"
                title="blogs"
            />
            <BlogList />
        </div>
    )
}

export default Blog;

// BlogList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from './blogData';

const BlogList = () => {
 const itemVariants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease:"easeOut" } }
 };

 return (
 <section className="bg-black py-20 px-6 md:px-16 font-lato min-h-screen">
 <div className="max-w-[1400px] mx-auto">
 
 {/* Page Header */}
 <div className="mb-16">
 <p className="text-zinc-500 font-light text-sm md:text-lg max-w-xl lowercase">
 Explore our latest thoughts on global trends, interior design, and the evolving aesthetics of modern living.
 </p>
 </div>

 {/* Blog Cards Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {blogPosts.map((blog, index) => (
 <motion.div
 key={blog.id}
 variants={itemVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 transition={{ delay: index * 0.1 }}
 className="group relative md:aspect-[4/5] aspect-[4/6] overflow-hidden bg-zinc-900 cursor-pointer"
 >
 <Link to={`/blogs/${blog.slug}`} className="block w-full h-full">
 {/* Background Image */}
 <img
 src={blog.image}
 alt={blog.title}
 loading="lazy"
 decoding="async"
 className="w-full h-full object-cover opacity-70 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-100"
 />

 {/* Content Overlay */}
 <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
 <span className="text-white border border-white/30 px-3 py-1 text-[10px] lowercase tracking-widest w-fit mb-4">
 {blog.category}
 </span>
 <h3 className="text-white font-light text-xl md:text-2xl lowercase leading-tight line-clamp-3">
 {blog.title}
 </h3>
 
 {/* Read More Text on Hover */}
 <div className="overflow-hidden mt-4">
 <p className="text-zinc-400 text-xs lowercase tracking-[0.2em] transform translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
 read full blog &rarr;
 </p>
 </div>
 </div>
 </Link>
 </motion.div>
 ))}
 </div>

 </div>
 </section>
 );
};

export default BlogList;
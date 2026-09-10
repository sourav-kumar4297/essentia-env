import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from './projectsData';
import Button from '../Button';

const ProCard = () => {
 const [filter, setFilter] = useState('all');
 const [isMobile, setIsMobile] = useState(false);

 // Filter Logic - Case sensitive hota hai isliye dhyan rakhein
 const filteredProjects = filter === 'all'
 ? projectsData
 : projectsData.filter(proj => proj.category.toLowerCase() === filter.toLowerCase());

 // Image ke hisaab se nayi categories
 const categories = [
 'all',
 'residence',
 'corporate office',
 'sales gallery',
 'club house',
 'retail space'
 ];

 return (
 <section className="bg-black py-10 px-6 md:px-16 font-lato overflow-hidden">
 <div className="max-w-[1400px] mx-auto">

 <div className="text-center mb-16">
 <p className="text-zinc-400 italic font-light mb-8 tracking-[0.1em] text-2xl md:text-4xl">
 spectacular structural creations
 </p>

 {/* Filter Buttons - 'flex-wrap' add kiya hai taaki mobile par layout tute na */}
 <div className="flex flex-wrap justify-center gap-4">
 {categories.map((cat) => (
 <button
 key={cat}
 onClick={() => setFilter(cat)}
 className={`px-4 md:px-5 py-1.5 md:py-1.2 border text-[9.5px] md:text-[13px] lowercase tracking-[0.2em] transition-all duration-500 ${filter === cat
 ? 'border-white text-white bg-zinc-900'
 : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'
 }`}
 >
 {cat}
 </button>
 ))}
 </div>
 </div>

 <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-24">
 <AnimatePresence mode='popLayout'>
 {filteredProjects.map((project) => (
 <Link to={project.slug} key={project.id}>
 <motion.div
 layout
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.9 }}
 transition={{ duration: 0.5 }}
 className="relative group aspect-[1/1] overflow-hidden bg-zinc-900 cursor-pointer"
 >
 <img
 src={project.image}
 alt={project.title}
 loading="lazy"
 decoding="async"
 className="w-full h-full transition-all duration-1000 group-hover:scale-110 group-hover:blur-[2px]"
 />

 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500" />

 <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
 <h3 className="text-white text-[28px] md:text-5xl font-light lowercase text-center transition-transform duration-700 group-hover:-translate-y-6">
 {project.title}
 </h3>

 <div className="absolute bottom-10 left-0 w-full flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0">
 <Button
 to={project.slug}
 text="view more"
 className="mt-0 mx-auto md:mx-0 mb-5 hidden md:block"
 size={isMobile ?"sm" :"sm"}
 />

 <div className="w-full px-12">
 <p className="text-zinc-300 text-[11px] tracking-[0.3em] font-light lowercase border-t border-white/20 pt-4 text-center">
 {project.details}
 </p>
 </div>
 </div>
 </div>
 </motion.div>
 </Link>
 ))}
 </AnimatePresence>
 </motion.div>
 </div>
 </section>
 );
};

export default ProCard;
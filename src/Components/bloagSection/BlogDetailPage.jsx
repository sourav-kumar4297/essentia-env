import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from './blogData';
import PageHeroSection from '../PageHeroSection';

const fadeUp = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease:"easeOut" } }
};

const BlogDetailPage = () => {
 const { slug } = useParams();
 const article = blogPosts.find((item) => item.slug === slug);

 const [currentSlide, setCurrentSlide] = useState(0);
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
 window.scrollTo({ top: 0, behavior: 'instant' });
 
 const checkMobile = () => {
 const mobile = window.innerWidth < 768;
 setIsMobile(mobile);
 if (!mobile) setCurrentSlide(0); 
 };
 
 checkMobile();
 window.addEventListener('resize', checkMobile);
 return () => window.removeEventListener('resize', checkMobile);
 }, [slug]);

 if (!article) {
 return (
 <div className="text-white bg-black h-screen flex flex-col items-center justify-center gap-4 lowercase tracking-widest font-light">
 <p>Article not found</p>
 <Link to="/blogs" className="text-zinc-500 text-xs underline hover:text-white transition-colors">
 back to all blogs
 </Link>
 </div>
 );
 }

 const latestPosts = blogPosts
 .filter((post) => post.id !== article.id)
 .slice(0, 3);

 const onDragEnd = (event, info) => {
 const swipeThreshold = 50;
 const swipeVelocity = 500;
 const offset = info.offset.x;
 const velocity = info.velocity.x;

 if (offset < -swipeThreshold || velocity < -swipeVelocity) {
 if (currentSlide < latestPosts.length - 1) setCurrentSlide(s => s + 1);
 } else if (offset > swipeThreshold || velocity > swipeVelocity) {
 if (currentSlide > 0) setCurrentSlide(s => s - 1);
 }
 };

 return (
 <main className="bg-black text-white font-lato min-h-screen">

 {/* ================= 1. HERO SECTION ================= */}
 <PageHeroSection
 image={article.heroImg}
 title={article.herotitle}
 category={article.category}
 titleSize="text-4xl md:text-5xl lg:text-6xl"
 />

 {/* ================= 2. BLOG CONTENT AREA ================= */}
 <article className="max-w-5xl mx-auto py-20 px-6 md:px-8">
 <motion.h1
 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
 className="text-xl md:text-4xl text-zinc-300 font-medium leading-relaxed mb-16 lowercase"
 >
 {article.title}
 </motion.h1>

 <motion.p
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 className="text-sm md:text-xl text-zinc-300 font-light leading-relaxed mb-16 whitespace-pre-line lowercase"
 >
 {article.intro}
 </motion.p>
 
 {article.sections.map((section, index) => (
 <React.Fragment key={index}>
 <motion.div
 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
 className="mb-12"
 >
 <h3 className="text-2xl md:text-3xl font-light lowercase mb-6 text-white">
 {section.heading}
 </h3>
 
 {section.content && (
 <p className="text-sm md:text-lg text-zinc-400 font-light leading-loose whitespace-pre-line lowercase">
 {section.content}
 </p>
 )}

 {section.blocks && section.blocks.map((block, bIndex) => {
 if (block.type === 'text') {
 return (
 <p key={bIndex} className=" text-sm md:text-lg text-zinc-400 font-light leading-loose whitespace-pre-line mb-6 lowercase">
 {block.content}
 </p>
 );
 }
 
 if (block.type === 'list') {
 return (
 <ul key={bIndex} className="list-disc pl-6 mb-8 text-sm md:text-lg text-zinc-400 font-light leading-loose marker:text-zinc-600 lowercase">
 {block.items.map((item, i) => (
 <li key={i} className="mb-2 pl-2">{item}</li>
 ))}
 </ul>
 );
 }

 if (block.type === 'table') {
 return (
 <div key={bIndex} className="overflow-x-auto mb-10 mt-4 border border-zinc-800 rounded-sm">
 <table className="w-full text-left border-collapse">
 <thead className="bg-zinc-900 text-zinc-300 text-sm lowercase tracking-widest font-light">
 <tr>
 {block.headers.map((header, i) => (
 <th key={i} className="px-6 py-4 border-b border-zinc-800 lowercase">{header}</th>
 ))}
 </tr>
 </thead>
 <tbody className="text-zinc-400 font-light">
 {block.rows.map((row, rIndex) => (
 <tr key={rIndex} className="hover:bg-zinc-900/50 transition-colors lowercase">
 {row.map((cell, cIndex) => (
 <td key={cIndex} className="px-6 py-4 border-b border-zinc-800/50">
 {cell}
 </td>
 ))}
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 );
 }
 
 return null;
 })}
 </motion.div>

 {/* ================= DYNAMIC INLINE IMAGES LOGIC (IMPROVED) ================= */}
 {/* Pehli image: Index 0 ke baad render hogi, agar valid image URL hai */}
 {index === 0 && article.inlineImages && article.inlineImages[0] && article.inlineImages[0].trim() !=="" && (
 <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="my-16 aspect-video bg-zinc-900 overflow-hidden">
 <img src={article.inlineImages[0]} alt="Blog visual" className="w-full h-full object-cover opacity-80" />
 </motion.div>
 )}
 
 {/* Dusri image: Index 2 ke baad render hogi, agar valid image URL hai */}
 {index === 2 && article.inlineImages && article.inlineImages[1] && article.inlineImages[1].trim() !=="" && (
 <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="my-16 aspect-[4/3] bg-zinc-900 overflow-hidden">
 <img src={article.inlineImages[1]} alt="Blog visual" className="w-full h-full object-cover opacity-80" />
 </motion.div>
 )}
 </React.Fragment>
 ))}

 {/* Conclusion Logic */}
 {(article.conclusionHeading || article.conclusionText) && (
 <motion.div
 variants={fadeUp} 
 initial="hidden" 
 whileInView="visible" 
 viewport={{ once: true }}
 className="mt-20 pt-12 border-t border-zinc-900"
 >
 {article.conclusionHeading && (
 <h3 className="text-2xl md:text-3xl font-light lowercase mb-6 text-white">
 {article.conclusionHeading}
 </h3>
 )}
 
 {article.conclusionText && (
 <p className=" text-sm md:text-lg text-zinc-400 font-light leading-loose whitespace-pre-line lowercase">
 {article.conclusionText}
 </p>
 )}
 </motion.div>
 )}

 </article>

 {/* ================= 3. LATEST BLOGS CARDS SECTION ================= */}
 {latestPosts.length > 0 && (
 <section className="max-w-[1400px] mx-auto py-20 border-t border-zinc-900 overflow-hidden">
 <div className="px-6 md:px-16 mb-12 flex justify-between items-end">
 <div>
 <h4 className="text-zinc-500 italic text-sm lowercase tracking-wide mb-2">keep reading</h4>
 <h2 className="text-3xl md:text-4xl font-light lowercase text-white">Latest blogs</h2>
 </div>
 <Link to="/blogs" className="hidden md:block text-sm lowercase tracking-widest text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
 view all &rarr;
 </Link>
 </div>

 <div className="relative">
 {/* Desktop View */}
 <div className="hidden md:grid grid-cols-3 gap-8 px-16">
 {latestPosts.map((blog, index) => (
 <motion.div
 key={blog.id}
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 transition={{ delay: index * 0.15 }}
 className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 cursor-pointer rounded-sm"
 >
 <Link to={`/blogs/${blog.slug}`} className="block w-full h-full">
 <img
 src={blog.heroImg}
 alt={blog.title}
 className="w-full h-full object-cover opacity-70 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-100"
 />
 <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
 <span className="text-white border border-white/30 px-3 py-1 text-[10px] lowercase tracking-widest w-fit mb-4">
 {blog.category}
 </span>
 <h3 className="text-white font-light text-xl md:text-2xl lowercase leading-tight line-clamp-3">
 {blog.title}
 </h3>
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

 {/* Mobile View */}
 <div className="md:hidden">
 <motion.div
 drag="x"
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={0.2}
 onDragEnd={onDragEnd}
 animate={{ x:`calc(-${currentSlide * 82}% )` }}
 style={{ marginLeft:"9%", width:"100%" }}
 transition={{ type:"spring", stiffness: 200, damping: 25 }}
 className="flex cursor-grab active:cursor-grabbing"
 >
 {latestPosts.map((blog, index) => (
 <motion.div
 key={blog.id}
 className="w-[82%] flex-shrink-0 pr-5"
 animate={{ 
 opacity: currentSlide === index ? 1 : 0.3,
 scale: currentSlide === index ? 1 : 0.92 
 }}
 transition={{ duration: 0.4 }}
 >
 <div className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 cursor-pointer rounded-sm">
 <Link to={`/blogs/${blog.slug}`} className="block w-full h-full">
 <img
 src={blog.heroImg}
 alt={blog.title}
 className="w-full h-full object-cover opacity-70 transition-transform duration-1000 ease-out"
 />
 <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
 <span className="text-white border border-white/30 px-3 py-1 text-[10px] lowercase tracking-widest w-fit mb-4">
 {blog.category}
 </span>
 <h3 className="text-white font-light text-xl lowercase leading-tight line-clamp-3">
 {blog.title}
 </h3>
 </div>
 </Link>
 </div>
 </motion.div>
 ))}
 </motion.div>

 <div className="flex flex-col items-center gap-4 mt-10">
 <div className="flex gap-2">
 {latestPosts.map((_, i) => (
 <motion.div
 key={i}
 className="h-[2px] bg-white"
 animate={{ 
 width: currentSlide === i ? 30 : 8,
 opacity: currentSlide === i ? 1 : 0.2 
 }}
 />
 ))}
 </div>
 </div>
 </div>
 </div>

 <div className="mt-10 text-center md:hidden">
 <Link to="/blogs" className="text-xs lowercase tracking-widest text-zinc-400 hover:text-white transition-colors border-b border-zinc-500 pb-1">
 view all blogs
 </Link>
 </div>
 </section>
 )}

 </main>
 );
};

export default BlogDetailPage;
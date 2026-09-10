import React from"react";
import { useParams } from"react-router-dom";
import { projectsData } from"./projectsData";
import { motion } from"framer-motion";
import PageHeroSection from"../PageHeroSection";

// ==============================================
// PROJECT DETAIL PAGE (PREMIUM ANIMATIONS + FULL GALLERY)
// ==============================================
const ProjectDetail = () => {
 const { slug } = useParams();
 const project = projectsData.find((p) => p.slug === slug);

 // const hideDetailsFor = ['jaipur-residence'];
 const hideDetailsFor = [
 'jaipur-clubhouse', 'adani-clubhouse', 'hyderabad-clubhouse', 'mapsko-clubhouse', 'suncity-anamtam',
 'bhumika-sales-gallery', 'elan-sales-gallery',
 'amritsar-office', 'elan-office', 'essentia-office', 'homeland-office',
 'mgp-office', 'navraj-office-gurgaon', 'reach-office', 'schueco-office',
 'aralias-residence', 'camelias-residence-1', 'camelias-residence-2', 'camelias-residence-3',
 'new-delhi-farmhouse', 'jaipur-residence','aryan-realty',
 ];
 const showDetails = !hideDetailsFor.includes(project?.slug);

 // Premium Custom Easing for that smooth, high-end feel
 const premiumEasing = [0.22, 1, 0.36, 1];

 if (!project) {
 return (
 <div className="min-h-screen bg-black text-white flex items-center justify-center">
 <div className="text-center">
 <h2 className="text-4xl font-light mb-4">project not found</h2>
 <p className="text-gray-400">
 the project you're looking for doesn't exist.
 </p>
 </div>
 </div>
 );
 }

 return (
 <main className="bg-black">
 {/* ========================================== */}
 {/* HERO (Priority Image) */}
 {/* ========================================== */}
 <PageHeroSection
 image={project.heroImg}
 title={project.title}
 titleSize="text-[55px] md:text-[65px]"
 clastyle=""
 imageProps={{
 fetchPriority:"high",
 loading:"eager",
 decoding:"async",
 width: 1920,
 height: 1080,
 }}
 />

 {/* ========================================== */}
 {/* PROJECT DETAILS */}
 {/* ========================================== */}
 <section className="bg-black text-white py-16 md:py-20 overflow-hidden">
 <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

 {/* LEFT CONTENT (Smooth Fade Up) - hidden for specific projects */}
 {showDetails && (
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin:"-100px" }}
 transition={{ duration: 0.8, ease: premiumEasing }}
 className="flex flex-col order-2 md:order-1"
 >
 <h2 className="text-3xl md:text-4xl font-light mb-8 lowercase">
 project details
 </h2>

 <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12 lowercase">
 {project.description}
 </p>

 <div className="w-full h-[1px] bg-white/20 mb-12" />

 <div className="grid grid-cols-2 gap-y-10 lowercase">
 {(project.stats || []).map((stat, index) => (
 <div key={index} className="flex flex-col gap-1">
 <span className="text-white text-xl md:text-2xl font-light lowercase">
 {stat.label}
 </span>
 <span className="text-gray-500 text-lg md:text-xl font-light lowercase">
 {stat.value}
 </span>
 </div>
 ))}
 </div>
 </motion.div>
 )}

 {/* RIGHT IMAGE (Smooth Scale & Fade) */}
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true, margin:"-100px" }}
 transition={{ duration: 0.9, ease: premiumEasing, delay: 0.1 }}
 className={`relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-sm order-1 md:order-2 ${!showDetails ? 'lg:col-span-2' : ''}`}
 >
 <motion.img
 src={project.mainImg || project.heroImg || project.gridImages?.[0]?.image}
 alt={project.title}
 loading="lazy"
 decoding="async"
 fetchPriority="low"
 width="900"
 height="1100"
 className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
 />
 </motion.div>
 </div>
 </div>
 </section>

 {/* ========================================== */}
 {/* IMAGE GRID & GALLERY (Smooth Scroll Reveals) */}
 {/* ========================================== */}
 <section className="bg-black text-white py-8 md:py-10 overflow-hidden">
 <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
 {project.gridImages?.length > 0 && (
 <div className="flex flex-col gap-6 md:gap-8">

 {/* TOP WIDE IMAGE */}
 {/* <motion.div
 initial={{ opacity: 0, y: 50 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin:"-100px" }}
 transition={{ duration: 1, ease: premiumEasing }}
 className="relative w-full aspect-[21/9] overflow-hidden rounded-sm"
 >
 <img
 src={project.mainImg}
 alt={project.title}
 loading="lazy"
 decoding="async"
 fetchPriority="low"
 width="1600"
 height="700"
 className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
 />
 </motion.div> */}

 {/* BOTTOM GRID (Existing 2 Squares) */}
 {project.gridImages.length > 1 && (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
 {project.gridImages.slice(1, 3).map((img, idx) => (
 <motion.div
 key={idx}
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin:"-100px" }}
 transition={{ duration: 0.8, ease: premiumEasing, delay: idx * 0.15 }}
 className="relative aspect-square overflow-hidden rounded-sm"
 >
 <img
 src={img.image}
 alt={`${project.title} featured ${idx + 1}`}
 loading="lazy"
 decoding="async"
 fetchPriority="low"
 width="800"
 height="800"
 className="w-full h-full object-cover transition-transform duration-1000 scale-110 hover:scale-115"
 />
 </motion.div>
 ))}
 </div>
 )}

 {/* ========================================== */}
 {/* FULL EXTENDED GALLERY (Remaining 15-20 Images) */}
 {/* ========================================== */}
 {project.gridImages.length > 3 && (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-2 md:mt-6">
 {project.gridImages.slice(3).map((img, idx) => (
 <motion.div
 key={`gallery-${idx}`}
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin:"-50px" }}
 // Staggering effect specifically for 3-column layout
 transition={{
 duration: 0.8,
 ease: premiumEasing,
 delay: (idx % 3) * 0.15
 }}
 className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-sm group"
 >
 <img
 src={img.image}
 alt={`${project.title} gallery ${idx + 4}`}
 loading="lazy"
 decoding="async"
 className="w-full h-full object-cover transition-transform duration-1000 scale-106 group-hover:scale-110"
 />
 {/* Premium subtle overlay on hover */}
 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
 </motion.div>
 ))}
 </div>
 )}

 </div>
 )}
 </div>
 </section>
 </main>
 );
};

export default ProjectDetail;
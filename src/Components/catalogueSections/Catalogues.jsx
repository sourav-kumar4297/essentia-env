import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen } from 'lucide-react';
import PageHeroSection from '../../Components/PageHeroSection';

// ==========================================
// 1. MOCK DATA FOR 9 CATALOGUES
// ==========================================
const catalogueData = [
 { id: 1, title:"furniture catalogue", category:"furniture", size:"4.2 mb", coverImg:"/catalogue/img/furniture_result.webp", pdfLink:"/catalogue/furniture.pdf" },
 { id: 2, title:"bed catalogue", category:"furniture", size:"4.2 mb", coverImg:"/catalogue/img/bed_result.webp", pdfLink:"/catalogue/bed.pdf" },
 { id: 3, title:"bench catalogue", category:"interiors", size:"3.1 mb", coverImg:"/catalogue/img/bench_result.webp", pdfLink:"/catalogue/bench.pdf" },
 { id: 4, title:"chair catalogue", category:"storage", size:"2.8 mb", coverImg:"/catalogue/img/chair_result.webp", pdfLink:"/catalogue/chair.pdf" },
 { id: 5, title:"coffee table catalogue", category:"commercial", size:"5.5 mb", coverImg:"/catalogue/img/coffee table_result.webp", pdfLink:"/catalogue/coffee table.pdf" },
 { id: 6, title:"console catalogue", category:"exterior", size:"3.9 mb", coverImg:"/catalogue/img/console_result.webp", pdfLink:"/catalogue/console.pdf" },
 { id: 7, title:"dining chair catalogue", category:"furniture", size:"4.0 mb", coverImg:"/catalogue/img/dining chair_result.webp", pdfLink:"/catalogue/dining chair.pdf" },
 { id: 8, title:"dining table catalogue", category:"decor", size:"1.5 mb", coverImg:"/catalogue/img/dining table_result.webp", pdfLink:"/catalogue/dining table.pdf" },
 { id: 9, title:"end table catalogue", category:"interiors", size:"2.2 mb", coverImg:"/catalogue/img/end table_result.webp", pdfLink:"/catalogue/end table.pdf" },
 { id: 10, title:"sofa catalogue", category:"decor", size:"3.4 mb", coverImg:"/catalogue/img/sofa_result.webp", pdfLink:"/catalogue/sofa.pdf" },
];

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const fadeUpVariant = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
const Catalogues = () => {

 useEffect(() => {
 window.scrollTo({ top: 0, behavior: 'instant' });
 }, []);

 return (
 <main className="bg-black min-h-screen text-white font-lato lowercase pb-24">

 {/* Hero Section */}
 <PageHeroSection
 image="/ServImgs/interior/inter3.webp"
 title="Our Catalogues"
 category="furniture"
 />

 <section className="max-w-[1400px] mx-auto px-6 md:px-16 pt-16 md:pt-24">

 {/* Intro Text */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeUpVariant}
 className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
 >
 <div className="max-w-5xl">
 <h2 className="text-3xl md:text-5xl font-light mb-6 tracking-wide">explore our exclusive furniture collections</h2>
 <p className="text-zinc-400 text-lg font-light leading-relaxed">
 browse through our meticulously crafted furniture volumes. from statement sofas to elegant dining sets, download our catalogues to find the perfect pieces for your space.
 </p>
 </div>
 <div className="text-zinc-600 tracking-[0.2em] text-sm">
 01 — {catalogueData.length < 10 ?`0${catalogueData.length}` : catalogueData.length}
 </div>
 </motion.div>

 {/* Catalogues Grid */}
 <motion.div
 variants={staggerContainer}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
 >
 {catalogueData.map((item) => (
 <motion.div key={item.id} variants={fadeUpVariant} className="group">

 {/* Card Container */}
 <div className="relative aspect-[3/4] bg-[#0c0c0c] overflow-hidden rounded-sm cursor-pointer mb-6 border border-white/5">

 {/* Cover Image: Full color on mobile, & opacity on desktop until hovered */}
 <img
 src={item.coverImg}
 alt={item.title}
 loading="lazy"
 className="w-full h-full object-cover opacity-100 md:opacity-60 md:group-hover:opacity-100 md:group-hover:scale-105 transition-all duration-700 ease-out"
 />

 {/* Dark Overlay for Text Readability */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

 {/* Content Overlay */}
 <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">

 {/* Title */}
 <h3 className="text-2xl md:text-3xl font-light text-white leading-tight mb-2">
 {item.title}
 </h3>

 {/* Action Buttons: Visible by default on mobile, slide up on hover on desktop */}
 <div className="overflow-hidden mt-4">
 <div className="flex gap-3 transform translate-y-0 opacity-100 md:translate-y-[120%] md:opacity-0 transition-all duration-500 ease-[0.16,1,0.3,1] md:group-hover:translate-y-0 md:group-hover:opacity-100">

 {/* View Online Button */}
 <a
 href={item.pdfLink}
 target="_blank"
 rel="noopener noreferrer"
 className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3 px-4 hover:bg-zinc-200 transition-colors text-sm tracking-widest font-medium"
 >
 <BookOpen size={16} strokeWidth={1.5} /> view
 </a>

 {/* Download Button */}
 <a
 href={item.pdfLink}
 download
 className="flex-none flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20 text-white py-3 px-4 hover:bg-white/10 transition-colors"
 title="Download PDF"
 >
 <Download size={18} strokeWidth={1.5} />
 </a>

 </div>
 </div>

 </div>
 </div>

 </motion.div>
 ))}
 </motion.div>

 </section>
 </main>
 );
};

export default Catalogues;
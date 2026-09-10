import React, { useState, useEffect } from"react";
import Button from"../Button";
import { motion, AnimatePresence } from"framer-motion";

const WhatWeDoSection = () => {
 const [hoveredItem, setHoveredItem] = useState(null);
 const [mobileOpenItem, setMobileOpenItem] = useState(null);
 const [isMobile, setIsMobile] = useState(false);

 // mobile detect
 useEffect(() => {
 const checkMobile = () => setIsMobile(window.innerWidth < 768);
 checkMobile();
 window.addEventListener("resize", checkMobile);
 return () => window.removeEventListener("resize", checkMobile);
 }, []);

 const projectServices = [
 {
 id:"01/",
 title:"design",
 description:"Architecture, Interior, Exterior and Landscape.",
 images: [
"/HomeImgs/whatwedo/design2.webp",
"/HomeImgs/whatwedo/design1.webp",
"/HomeImgs/whatwedo/design3.webp",
 ],
 labels: ["interior","exterior","landscape"],
 link:"/services#design",
 },
 {
 id:"02/",
 title:"build",
 description:"Civil, Structural, and Turnkey Construction.",
 images: [
"/HomeImgs/whatwedo/build1.webp",
"/HomeImgs/whatwedo/build2.webp",

 ],
 labels: ["pmc","contractor"],
 link:"/services#build",
 },
 {
 id:"03/",
 title:"furniture",
 description:"Bespoke Furniture and Décor.",
 images: [
"/HomeImgs/whatwedo/furniture1.webp",
"/HomeImgs/whatwedo/furniture2.webp",
"/HomeImgs/whatwedo/furniture3.webp",
 ],
 labels: ["catalogues","designers","bespoke"],
 link:"/services#furniture",
 },
 ];

 const toggleMobileItem = (index) => {
 if (mobileOpenItem === index) {
 setMobileOpenItem(null);
 } else {
 setMobileOpenItem(index);
 }
 };

 return (
 <section className="relative z-[99] w-full bg-black py-8 md:py-10 px-4 md:px-16 lg:px-24">
 <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
 {/* Left Side: Heading */}
 <div className="flex flex-col justify-start">
 <div className="flex items-center gap-2 mb-1">
 {/* <span className="w-2 h-2 bg-white rounded-full mt-3"></span> */}
 <span className="text-white text-3xl md:text-5xl font-light tracking-tighter lowercase">
 what we do
 </span>
 </div>
 <div className="w-full">
 {/* <h2 className="w-full md:w-[60%] text-3xl md:text-4xl lg:text-5xl font-light leading-tight lowercase">
 Crafting Form with Purpose
 <br />
 </h2> */}
 </div>
 </div>

 <div className="flex flex-col">
 <ul className="divide-y divide-white/20 border-b border-white/20">
 {projectServices.map((service, index) => (
 <li
 key={index}
 onMouseEnter={() => setHoveredItem(index)}
 onMouseLeave={() => setHoveredItem(null)}
 onClick={() =>
 window.innerWidth < 768 && toggleMobileItem(index)
 }
 className={`relative group py-6 md:py-6 px-0 transition-all duration-500 cursor-pointer border-b border-white/20 ${hoveredItem === index ?"z-50" :"z-10"
 }`}
 >
 {/* Title Part */}
 <div className="flex items-baseline gap-4 md:gap-6 transition-all duration-500 group-hover:pl-4">
 <span
 className={`text-lg md:text-xl lg:text-2xl font-light transition-colors duration-300 ${hoveredItem === index || mobileOpenItem === index
 ?"text-white"
 :"text-white/50"
 }`}
 >
 {service.id}
 </span>
 <div className="flex items-center justify-between flex-1">
 <span className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight lowercase">
 {service.title}
 </span>
 {/* Mobile Toggle Icon */}
 <span className="md:hidden text-white/50 text-2xl">
 {mobileOpenItem === index ?"−" :"+"}
 </span>
 </div>
 </div>

 {/* Desktop Hover Content */}
 <div
 className={`hidden md:block absolute left-0 top-[90%] w-full bg-black border border-white/10 shadow-2xl transition-all duration-500 ease-out ${hoveredItem === index
 ?"opacity-100 translate-y-2 visible pointer-events-auto"
 :"opacity-0 translate-y-0 invisible pointer-events-none"
 }`}
 style={{ zIndex: 999 }}
 onMouseEnter={() => setHoveredItem(index)}
 >
 <div className="p-5">
 <p className="text-white/70 text-lg md:text-xl font-light max-w-md mb-6 leading-relaxed lowercase">
 {service.description}
 </p>

 <div className="grid grid-cols-3 gap-4">
 {service.images.map((img, i) => (
 <div
 key={i}
 className="group/img relative aspect-[3/2] overflow-hidden bg-zinc-900"
 >
 <img
 src={img}
 alt={service.labels[i]}
 loading="lazy"
 className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
 />
 <div className="absolute bottom-2 left-2 text-[10px] md:text-xs lowercase tracking-tighter bg-black/50 px-2 py-1">
 {service.labels[i]}
 </div>
 </div>
 ))}
 </div>

 <Button
 to={service.link}
 text="view more"
 className="mt-8"
 size={isMobile ?"sm" :"sm"}
 />
 </div>
 </div>

 {/* Mobile Expandable Content - Desktop hover jaisa hi */}
 <AnimatePresence>
 {mobileOpenItem === index && (
 <motion.div
 initial={{ opacity: 0, height: 0, marginTop: 0 }}
 animate={{
 opacity: 1,
 height:"auto",
 marginTop:"1rem",
 }}
 exit={{ opacity: 0, height: 0, marginTop: 0 }}
 transition={{ duration: 0.3, ease:"easeInOut" }}
 className="md:hidden bg-black border border-white/10 rounded-lg overflow-hidden"
 >
 <div className="p-4">
 <p className="text-white/70 text-base font-light mb-4 leading-relaxed lowercase">
 {service.description}
 </p>

 <div className="grid grid-cols-3 gap-3">
 {service.images.map((img, i) => (
 <div
 key={i}
 className="relative aspect-[3/2] overflow-hidden bg-zinc-900 rounded"
 >
 <img
 src={img}
 alt={service.labels[i]}
 className="w-full h-full object-cover"
 loading="lazy"
 />
 <div className="absolute bottom-1 left-1 text-[8px] md:text-xs lowercase font-extralight tracking-tighter bg-black/50 px-1 py-0.5">
 {service.labels[i]}
 </div>
 </div>
 ))}
 </div>

 <Button
 to={service.link}
 text="view more"
 className="mt-8"
 size={isMobile ?"sm" :"md"}
 />
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </section>
 );
};

export default WhatWeDoSection;

import React, { useState, useEffect } from"react";
import { motion, AnimatePresence } from"framer-motion";

const founders = [
 {
 id: 1,
 name:"Hardesh Chawla",
 role:"Director",
 quote:"The hand that holds everything in place is never always visible, but you can always feel it.",
 desc1:"Founder of Essentia, Hardesh Chawla has played a defining role in shaping the company’s integrated design-to-build model since 1999. With a background in financial services and an MBA from INSEAD, he brought a structured, systems-led approach to an industry that was traditionally fragmented. He oversees the build, execution, and operational side of the business, ensuring that every project is delivered with consistency and accountability.",
 desc2:"Under his leadership, Essentia has grown into one of India’s leading full-service design and build firms, known for its scale, precision, and vertically integrated capabilities.",
 image:"/AboutImgs/founder/hardesh-chawla_result.webp",
 instagram:" https://www.instagram.com/hardeshchawla/",
 linkedin:" https://www.linkedin.com/in/hardesh?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
 },
 {
 id: 2,
 name:"Monica Chawla",
 role:"Creative Head",
 quote:"the rooms worth making are never the ones trying to be remembered! they are the ones trying are the ones trying to be right. right for the light through a specific window, right for the light accumulating the life they were always going to hold. those rooms do not ask to be noticed. they simply last.",
 desc1:"As the Creative Head of Essentia, Monica Chawla leads the brand’s creative vision across interiors, furniture, and styling. Her approach is rooted in spatial balance, material sensitivity, and an intuitive understanding of how people experience spaces. She is known for creating environments that feel layered, warm, and deeply connected to natural light and texture.",
 desc2:"Over the years, she has shaped a distinct design language that blends global influences with a strong understanding of Indian living. Her work continues to define the visual identity and creative direction of Essentia across projects and product collections.",
 image:"/AboutImgs/founder/monica-chawla_result.webp",
 instagram:"https://www.instagram.com/monicachawla_/",
 youtube:"https://youtube.com/@monicachawla-x3g?si=l4Vqr_nd6ZAgMLSc",
 },
 {
 id: 3,
 name:"Hridik Chawla",
 role:"Co-Founder",
 quote:"the gap between what is imagined and what arrives on site is where trust goes to die. essentia exists, in part, to close it.",
 desc1:"Hridik Chawla leads the next generation of Essentia, bringing a contemporary perspective to the brand’s evolving design and retail landscape. Closely involved in product development, brand positioning, and expansion, he has played a key role in shaping Essentia Home into a destination for furniture and design-led living. His approach balances operational clarity with a strong understanding of aesthetics, allowing the brand to grow while maintaining a consistent design philosophy.",
 desc2:"With a focus on innovation, collaborations, and modern living, he continues to expand Essentia’s presence across both residential and retail spaces.",
 image:"/AboutImgs/founder/hridik-chawla_result.webp",
 instagram:"https://www.instagram.com/hridikchawla_/",
 linkedin:"https://www.linkedin.com/in/hridik-chawla-47010b173/",
 },
];

const MeetFounders = () => {
 const [current, setCurrent] = useState(0);
 const [direction, setDirection] = useState(1);

 // Function to change slides manually
 const paginate = (dir) => {
 setDirection(dir);
 setCurrent((c) => (c + dir + founders.length) % founders.length);
 };

 // Auto-play interval (Runs every 5 seconds)
 useEffect(() => {
 const timer = setInterval(() => {
 setDirection(1); // Auto-slide direction is always forward (left)
 setCurrent((prev) => (prev + 1) % founders.length);
 }, 5000);

 return () => clearInterval(timer); // Cleanup on unmount
 }, []);

 // Framer motion drag handler for touch swipe
 const handleDragEnd = (event, info) => {
 const swipeThreshold = 50; // Minimum distance to trigger swipe
 if (info.offset.x < -swipeThreshold) {
 paginate(1); // Swiped left -> next slide
 } else if (info.offset.x > swipeThreshold) {
 paginate(-1); // Swiped right -> previous slide
 }
 };

 const variants = {
 enter: (dir) => ({ x: dir > 0 ?"50%" :"-50%", opacity: 0 }),
 center: { x: 0, opacity: 1 },
 exit: (dir) => ({ x: dir > 0 ?"-50%" :"50%", opacity: 0 }),
 };

 const member = founders[current];

 return (
 <section className="bg-black text-white pb-10 pt-8 overflow-hidden">
 <div className="max-w-[1400px] mx-auto">

 {/* HEADER */}
 <div className="flex flex-col md:flex-row justify-center md:justify-between gap-6 md:gap-10 mb-8 md:mb-10 px-6 md:px-16">
 <motion.h2
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="text-3xl md:text-5xl text-center font-light max-w-2xl lowercase"
 >
 Meet the Principals
 </motion.h2>
 <motion.p
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.15, duration: 0.8 }}
 className="text-gray-300 max-w-md text-center hidden md:block md:text-right text-sm md:text-lg font-light lowercase"
 >
 The visionaries behind essentia environments
 </motion.p>
 </div>

 {/* <div className="flex items-center justify-center mb-8 -mt-5 md:my-16 px-6 md:px-16 lg:px-24">
 <p className="text-gray-400 text-center max-w-6xl text-sm md:text-lg font-light lowercase">
 A collective of curious, intuitive thought leaders stands at the heart of WITHIN. Bringing together diverse strengths in design and craft, systems and strategy, their combined vision guides the studio's practice and its continuous pursuit of thoughtful, refined work.
 </p>
 </div> */}

 {/* CAROUSEL */}
 <div className="relative flex items-center">

 {/* LEFT ARROW (Hidden on Mobile) */}
 <button
 onClick={() => paginate(-1)}
 aria-label="Previous"
 className="hidden md:flex absolute left-4 lg:left-6 z-10 items-center justify-center w-10 h-10 text-white/70 hover:text-white bg-black/20 md:bg-transparent rounded-full transition-colors duration-300"
 >
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
 <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 </button>

 {/* SLIDE WRAPPER */}
 <div className="w-full overflow-hidden px-6 md:px-14 lg:px-18 py-2">
 <AnimatePresence custom={direction} mode="wait">
 <motion.div
 key={current}
 custom={direction}
 variants={variants}
 initial="enter"
 animate="center"
 exit="exit"
 transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
 drag="x"
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={0.2}
 onDragEnd={handleDragEnd}
 className="flex flex-col md:flex-row items-stretch h-auto md:h-[540px] cursor-grab active:cursor-grabbing"
 >
 {/* LEFT — IMAGE */}
 <div className="w-full md:w-[45%] flex-shrink-0 h-[300px] md:h-full pointer-events-none">
 <img
 src={member.image}
 alt={member.name}
 className="w-full h-full object-cover object-top"
 />
 </div>

 {/* RIGHT — CONTENT */}
 <div className="w-full md:w-[55%] flex flex-col justify-center px-5 md:px-10 lg:px-12 py-6 md:py-8 bg-[#0a0a0a] border border-white/5">
 {/* Quote block */}
 <div className="mb-4 md:mb-7">
 <span className="text-5xl font-serif text-white/20 leading-none select-none">"</span>
 <p className="text-sm md:text-lg italic font-light leading-relaxed text-white/85 mt-1 lowercase">
 {member.quote}
 </p>
 </div>

 {/* Name, Role */}
 <div className="text-right mb-4 md:mb-7">
 <h3 className="text-xl md:text-2xl font-light lowercase tracking-wide">{member.name}</h3>
 <p className="text-[12px] tracking-[0.25em] text-zinc-500 mt-1 lowercase">{member.role}</p>
 </div>

 {/* Divider */}
 <div className="w-10 h-px bg-white/20 mx-auto mb-4 md:mb-7" />

 {/* Description paragraphs */}
 <p className="text-xs md:text-sm text-zinc-400 leading-relaxed text-center mb-3 lowercase">
 {member.desc1}
 </p>
 <p className="text-xs md:text-sm text-zinc-400 leading-relaxed text-center lowercase">
 {member.desc2}
 </p>

 {/* Social Icons — Moved below description */}
 <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
 {member.instagram && (
 <a
 href={member.instagram}
 target="_blank"
 rel="noopener noreferrer"
 className="text-zinc-600 hover:text-white transition-colors duration-300 mb-5"
 aria-label="Instagram"
 >
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
 <circle cx="12" cy="12" r="4" />
 <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
 </svg>
 </a>
 )}
 {member.linkedin && (
 <a
 href={member.linkedin}
 target="_blank"
 rel="noopener noreferrer"
 className="text-zinc-600 hover:text-white transition-colors duration-300 mb-5"
 aria-label="LinkedIn"
 >
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
 <rect x="2" y="9" width="4" height="12" />
 <circle cx="4" cy="4" r="2" />
 </svg>
 </a>
 )}
 {member.youtube && (
 <a
 href={member.youtube}
 target="_blank"
 rel="noopener noreferrer"
 className="text-zinc-600 hover:text-white transition-colors duration-300 mb-5"
 aria-label="YouTube"
 >
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
 <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
 </svg>
 </a>
 )}
 </div>
 </div>
 </motion.div>
 </AnimatePresence>
 </div>

 {/* RIGHT ARROW (Hidden on Mobile) */}
 <button
 onClick={() => paginate(1)}
 aria-label="Next"
 className="hidden md:flex absolute right-4 lg:right-6 z-10 items-center justify-center w-10 h-10 text-white/70 hover:text-white bg-black/20 md:bg-transparent rounded-full transition-colors duration-300"
 >
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
 <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 </button>
 </div>

 {/* PROGRESS INDICATORS */}
 <div className="flex justify-center items-center gap-3 mt-8 md:mt-6">
 {founders.map((_, i) => (
 <button
 key={i}
 onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
 className={`h-px transition-all duration-500 ${i === current ?"w-10 bg-white" :"w-5 bg-white/25"}`}
 />
 ))}
 </div>

 </div>
 </section>
 );
};

export default MeetFounders;
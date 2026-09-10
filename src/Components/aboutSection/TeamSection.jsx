import React, { useState, useEffect } from"react";
import { motion, AnimatePresence } from"framer-motion";

const TeamSection = () => {
 const [activeMember, setActiveMember] = useState(null);
 const [hoveredMember, setHoveredMember] = useState(null);
 const [isMobile, setIsMobile] = useState(false);
 const [currentSlide, setCurrentSlide] = useState(0);

 // Updated Data for General Team Members
 const teamMembers = [
 { id: 1, name:"deepak jain", role:"project manager", desc:"Arjun oversees all operations at essentia, ensuring that every project is delivered with precision and on schedule. His expertise lies in bridging the gap between design vision and flawless execution, coordinating teams to maintain the highest standards of quality.", image:"/AboutImgs/teammember/deepak-jain.webp" },
 { id: 2, name:"dhruv", role:"client relations", desc:"Priya is the voice of essentia, dedicated to understanding and translating client needs into actionable insights. She ensures a seamless, transparent, and collaborative experience from the first consultation to the final handover.", image:"/AboutImgs/teammember/dhruv.webp" },
 { id: 3, name:"ravineet singh marwah", role:"lead engineer", desc:"Rohan brings technical rigor to the creative process. He specializes in structural integrity and material sciences, ensuring that essentia's designs are not only beautiful but robust, sustainable, and built to last.", image:"/AboutImgs/teammember/ravineet-singh-marwah.webp" },
 { id: 4, name:"vijay yadav", role:"procurement head", desc:"Meera travels globally to source the finest materials and bespoke elements. Her keen eye for detail and uncompromising standards guarantee that every texture, fabric, and finish meets essentia's premium benchmark.", image:"/AboutImgs/teammember/vijay-yadav.webp" },
 { id: 5, name:"vishakha", role:"site supervisor", desc:"Kabir is the driving force on the ground. He translates blueprints into reality, managing daily site operations, coordinating with craftsmen, and ensuring that every architectural detail is executed with absolute precision.", image:"/AboutImgs/teammember/vishakha.webp" },
 { id: 6, name:"yogi", role:"senior architect manager", desc:"Ananya ensures the smooth architect operation of the studio. By managing resources efficiently and maintaining transparent budgeting for clients, she provides the stability needed for creative excellence to thrive.", image:"/AboutImgs/teammember/yogi.webp" },
 ];

 useEffect(() => {
 const checkMobile = () => {
 const mobile = window.innerWidth < 768;
 setIsMobile(mobile);
 if (!mobile) {
 setCurrentSlide(0);
 setActiveMember(null);
 }
 };
 checkMobile();
 window.addEventListener("resize", checkMobile);
 return () => window.removeEventListener("resize", checkMobile);
 }, []);

 // Mobile Swipe Logic
 const onDragEnd = (event, info) => {
 const swipeThreshold = 50;
 const velocityThreshold = 500;
 if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
 if (currentSlide < teamMembers.length - 1) setCurrentSlide(s => s + 1);
 } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
 if (currentSlide > 0) setCurrentSlide(s => s - 1);
 }
 setActiveMember(null);
 };

 return (
 <section className="bg-black text-white pb-8 md:pb-16 pt-5 overflow-hidden">
 <div className="max-w-[1400px] mx-auto">

 {/* HEADER */}
 <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10 mb-12 md:mb-16 px-6 md:px-16 lg:px-24">
 <motion.h2
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="text-3xl md:text-5xl font-light lowercase max-w-sm"
 >
 Our Core<br />Team
 </motion.h2>

 <motion.p
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.15, duration: 0.8 }}
 className="text-gray-400 max-w-md md:text-right lowercase text-sm md:text-lg font-light"
 >
 The dedicated professionals who turn vision into reality. From management to execution, meet the backbone of essentia.
 </motion.p>
 </div>

 {/* DESKTOP VIEW (GRID) */}
 {!isMobile ? (
 <div className="flex flex-wrap justify-center gap-12 px-6 md:px-16 lg:px-24 lowercase">
 {teamMembers.map((member, index) => (
 <motion.div
 key={member.id}
 className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(25%-2.25rem)]"
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8, delay: index * 0.1 }}
 >
 <TeamMemberCard
 member={member}
 isActive={activeMember === member.id || hoveredMember === member.id}
 setActiveMember={setActiveMember}
 setHoveredMember={setHoveredMember}
 isMobile={false}
 />
 </motion.div>
 ))}
 </div>
 ) : (
 /* MOBILE VIEW (SLIDER) */
 <div className="relative">
 <motion.div
 drag="x"
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={0.2}
 onDragEnd={onDragEnd}
 animate={{ x:`calc(-${currentSlide * 80}% )` }}
 style={{ marginLeft:"10%", width:"100%" }}
 transition={{ type:"spring", stiffness: 200, damping: 25 }}
 className="flex cursor-grab active:cursor-grabbing"
 >
 {teamMembers.map((member, index) => (
 <motion.div
 key={member.id}
 className="w-[80%] flex-shrink-0 pr-6"
 animate={{
 opacity: currentSlide === index ? 1 : 0.3,
 scale: currentSlide === index ? 1 : 0.92
 }}
 >
 <TeamMemberCard
 member={member}
 isActive={activeMember === member.id}
 setActiveMember={setActiveMember}
 setHoveredMember={() => { }}
 isMobile={true}
 />
 </motion.div>
 ))}
 </motion.div>

 {/* PROGRESS INDICATOR */}
 <div className="mt-12 flex flex-col items-center gap-4">
 <div className="flex gap-2 flex-wrap justify-center px-6">
 {teamMembers.map((_, i) => (
 <motion.div
 key={i}
 className="h-[1px] bg-white mb-2"
 animate={{
 width: currentSlide === i ? 30 : 10,
 opacity: currentSlide === i ? 1 : 0.2
 }}
 />
 ))}
 </div>
 </div>
 </div>
 )}
 </div>
 </section>
 );
};

/* TEAM CARD COMPONENT */
const TeamMemberCard = ({ member, isActive, setActiveMember, setHoveredMember, isMobile }) => {
 return (
 <div
 // HIDDEN FOR NOW: Desktop Hover Logic
 // onMouseEnter={() => !isMobile && setHoveredMember(member.id)}
 // onMouseLeave={() => !isMobile && setHoveredMember(null)}
 className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] group cursor-default" // cursor-pointer changed to cursor-default
 // HIDDEN FOR NOW: Mobile Click Logic
 // onClick={() => isMobile && setActiveMember(isActive ? null : member.id)}
 >
 {/* BACKGROUND IMAGE ALWAYS IN DOM FOR BLUR EFFECT */}
 <img
 src={member.image}
 alt={member.name}
 className={`absolute inset-0 w-full h-full lowercase object-cover object-top transition-transform duration-[1500ms] ease-[0.22,1,0.36,1] ${!isMobile && 'group-hover:scale-110'}`}
 />

 <AnimatePresence mode="wait">
 {!isActive ? (
 <motion.div
 key="front"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0, transition: { duration: 0.3 } }}
 className="absolute inset-0 flex flex-col justify-end"
 >
 {/* Front Gradient Overlay */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end transition-opacity duration-500">
 <motion.h4
 initial={{ y: 10, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ duration: 0.5, ease:"easeOut" }}
 className="text-white text-lg font-light lowercase"
 >
 {member.name}
 </motion.h4>
 <motion.p
 initial={{ y: 10, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ duration: 0.5, delay: 0.1, ease:"easeOut" }}
 className="text-zinc-400 text-[13px] lowercase tracking-widest mt-1"
 >
 {member.role}
 </motion.p>
 </div>

 {/* HIDDEN FOR NOW: Plus Icon - Only visible on Mobile when inactive */}
 {/* {isMobile && (
 <button
 onClick={(e) => {
 e.stopPropagation();
 setActiveMember(member.id);
 }}
 className="absolute top-4 right-4 bg-black/20 backdrop-blur-md p-3 rounded-full border border-black/20 z-10 hover:bg-black/30 transition-colors"
 >
 <span className="block w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
 </button>
 )} */}
 </motion.div>
 ) : (
 <motion.div
 key="back"
 initial={{ opacity: 0, backdropFilter:"blur(0px)" }}
 animate={{ opacity: 1, backdropFilter:"blur(20px)" }}
 exit={{ opacity: 0, backdropFilter:"blur(0px)" }}
 transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
 className="absolute inset-0 w-full h-full bg-black/50 text-white p-6 flex flex-col justify-start z-20"
 >
 {/* Close Cross Icon - Only visible on Mobile when active */}
 {isMobile && (
 <motion.button
 initial={{ opacity: 0, rotate: -90 }}
 animate={{ opacity: 1, rotate: 0 }}
 transition={{ duration: 0.4, delay: 0.2 }}
 onClick={(e) => {
 e.stopPropagation();
 setActiveMember(null);
 }}
 className="absolute top-4 right-4 p-2 z-30 opacity-70 hover:opacity-100"
 >
 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
 </svg>
 </motion.button>
 )}

 {/* STAGGERED TEXT REVEAL */}
 <div className="relative z-10 flex justify-start items-start flex-col">
 <motion.h4
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
 className="font-medium text-xl md:text-2xl lowercase"
 >
 {member.name}
 </motion.h4>

 <motion.p
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
 className="text-[10px] lowercase text-zinc-300 tracking-[0.2em] mb-4 mt-1"
 >
 {member.role}
 </motion.p>

 <motion.div
 initial={{ width: 0 }}
 animate={{ width:"3rem" }}
 transition={{ duration: 0.6, delay: 0.2, ease:"easeOut" }}
 className="h-[1px] bg-white/30 mb-5"
 />

 <motion.p
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
 className="text-xs italic leading-relaxed text-white/90 font-light"
 >
"{member.desc}"
 </motion.p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
};

export default TeamSection;
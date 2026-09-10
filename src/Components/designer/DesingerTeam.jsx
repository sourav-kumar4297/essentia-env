import React, { useState, useEffect } from"react";
import { motion, AnimatePresence } from"framer-motion";

const DesingerTeam = () => {
 const [activeMember, setActiveMember] = useState(null);
 const [hoveredMember, setHoveredMember] = useState(null);
 const [isMobile, setIsMobile] = useState(false);

 const teamMembers = [
 { id: 13, name:"Vishakha Singh Arora", role:"designer", desc:"A magician of form & function at Essentia, guided by Monica Chawla, transforms everyday objects into striking & balanced forms. She creates spaces that serve as thoughtful backdrops to life, overseeing every stage of production to ensure cohesion and quality. Her designs explore the interplay of contrasts masculine and feminine, celebrating the tension that gives each piece its unique voice.", image:"/AboutImgs/teamdesigner/vishakha.webp" },
 { id: 2, name:"Ahmad Bazazo", role:"designer", desc:"Ahmad Bazazo works across interiors, objects, and experiential design, reinforcing Essentia’s focus on functional clarity paired with refined craftsmanship. Guided by the brand’s design philosophy, his work emphasizes balance—between precision and warmth, tradition and contemporary expression—creating spaces and objects that feel intentional, nuanced, and enduring.", image:"/AboutImgs/teamdesigner/Ahmad Bazazo.webp" },
 { id: 4, name:"Ferriani & Sbolgi", role:"designer", desc:"As a member of Essentia’s design team, Ferriani Sbolgi focuses on thoughtful minimalism and refined storytelling. Her approach aligns with the philosophy of clarity and understated elegance, composing objects to create lasting impressions. Her work celebrates design as a subtle dialogue between material, form, and function.", image:"/AboutImgs/teamdesigner/Ferriani Sblogi.webp" },
 { id: 5, name:"Pascal Hien", role:"designer", desc:"Working within the Essentia studio, Pascal Hien applies a process-driven approach emphasizing precision, balance, and material integrity. His contribution reflects the philosophy of contemporary design rooted in craftsmanship and longevity. His disciplined design language helps shape objects that feel calm, deliberate, and quietly expressive.", image:"/AboutImgs/teamdesigner/pascal.webp" },
 { id: 6, name:"Luis Gimeno", role:"designer", desc:"Luis Gimeno strengthens the collective’s focus on timeless design through refined proportions, form, and materiality. His practice aligns with Essentia’s design philosophy of creating pieces that transcend trends, blending contemporary sensibilities with enduring craftsmanship. His work adds to a cohesive language of subtlety, depth, and lasting resonance.", image:"/AboutImgs/teamdesigner/Luis Gimeno.webp" },
 { id: 7, name:"Harsh Bisht", role:"designer", desc:"As part of Essentia’s design network, Harsh Bisht, guided by Monica Chawla, brings an intuitive approach inspired by rhythm, balance, and everyday rituals. His work reflects the philosophy of creating objects that feel natural, tactile, and emotionally grounded. Through restraint and careful detailing, he contributes to designs that are quietly meaningful.", image:"/AboutImgs/teamdesigner/harsh.webp" },
 { id: 8, name:"Nitush & Arosh", role:"designer", desc:"Within Essentia, Nitush & Arosh collaborate on material exploration and experimental craftsmanship. Their work embodies the philosophy of innovation guided by restraint, transforming materials through thoughtful processes rather than excess. Together, they advance Essentia’s vision of contemporary design that is refined, tactile, and enduring.", image:"/AboutImgs/teamdesigner/nitus aroosh.webp" },
 { id: 9, name:"Anna Ignatenko", role:"designer", desc:"Known for her thoughtful approach to proportion and detail, Anna Ignatenko brings a calm, human sensibility to interiors. Her work balances softness with structure, creating spaces that feel composed yet deeply personal. For Essentia Home, Anna’s designs serve as subtle backdrops for everyday life, where material, light, and restraint come together to allow character and warmth to emerge naturally.", image:"/AboutImgs/teamdesigner/Anna Ignatenko.webp" },
 { id: 10, name:"Tom & maya", role:"designer", desc:"Working at the intersection of form and function, Tom & maya focuses on creating pieces that feel grounded, intentional, and quietly expressive. Their collaboration with Essentia Home reflects a shared belief in thoughtful craftsmanship and enduring design. Each creation is guided by clarity and purpose, offering moments of refinement that elevate interiors without overpowering them.", image:"/AboutImgs/teamdesigner/tom maya.webp" },
 { id: 11, name:"Vincent Mazenauer", role:"designer", desc:"Vincent Mazenauer explores the dialogue between traditional craftsmanship and contemporary living. His work is defined by precision, tactile materials, and a deep respect for process. For Essentia Home, Vincent creates pieces that feel timeless yet relevant. Objects that reveal their quality through detail, balance, and an understated sense of sophistication.", image:"/AboutImgs/teamdesigner/vincent mazenauer.webp" },
 { id: 12, name:"Dohn & Hass", role:"designer", desc:"Blending Asian and European design sensibilities, Dohn & Hass bring a nuanced perspective to furniture and objects for Essentia Home. Their work emphasizes harmony between form, material, and function, resulting in pieces that feel both considered and effortless. Each design reflects a quiet cultural dialogue, where craftsmanship and restraint shape enduring interiors.", image:"/AboutImgs/teamdesigner/dohn hass.webp" },
 { id: 3, name:"Artur De Menezes", role:"designer", desc:"Part of the Essentia design collective, Artur De Menezes brings a practice centered on emotion, narrative, and material depth. His work embodies the philosophy of creating objects with quiet meaning rather than overt expression. Through a restrained yet poetic sensibility, he contributes to designs that feel personal, tactile, and timeless.", image:"/AboutImgs/teamdesigner/Artur de Menezes.webp" },
 { id: 1, name:"Armaan Bansal", role:"designer", desc:"Within the Essentia design framework, Armaan Bansal contributes a practice rooted in material sensitivity and conceptual clarity. His approach reflects the philosophy of thoughtful restraint, where form emerges through careful exploration of process, detail, and narrative. His design language shapes timeless objects that evoke emotion while remaining grounded in function and craft.", image:"/AboutImgs/teamdesigner/arman bansal.webp" },
 ];

 useEffect(() => {
 const checkMobile = () => {
 const mobile = window.innerWidth < 768;
 setIsMobile(mobile);
 if (!mobile) {
 setActiveMember(null);
 }
 };
 checkMobile();
 window.addEventListener("resize", checkMobile);
 return () => window.removeEventListener("resize", checkMobile);
 }, []);

 return (
 // FIX: Removed"overflow-hidden" from section so sticky can work
 <section className="bg-black text-white pb-8 md:pb-16 pt-16">
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
 Meet the people behind the process
 </motion.h2>

 <motion.p
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.15, duration: 0.8 }}
 className="text-gray-400 max-w-md md:text-right lowercase text-sm md:text-lg font-light"
 >
 Exceptional design is a team effort. We collaborate closely to bring aligned, thoughtful results.
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
 <TeamCard
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
 /* MOBILE VIEW (STICKY STACKING SCROLL) */
 <div className="flex flex-col px-6 relative pb-10">
 {teamMembers.map((member, index) => (
 <motion.div
 key={member.id}
 initial={{ opacity: 0, y: 50 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin:"-50px" }}
 transition={{ duration: 0.6 }}
 // EXACTLY like your review section logic
 className="sticky bg-[#0c0c0c] border border-white/5 rounded-2xl shadow-[0_-15px_30px_-5px_rgba(0,0,0,0.6)] overflow-hidden"
 style={{ 
 top:`${100 + (index * 20)}px`, // Card rukne ki jagah (ek ke niche ek)
 marginBottom:"80px", // Scroll karne ke liye sufficient gap
 zIndex: index // Naya card purane ke upar aayega
 }}
 >
 <TeamCard
 member={member}
 isActive={activeMember === member.id}
 setActiveMember={setActiveMember}
 setHoveredMember={() => {}}
 isMobile={true}
 />
 </motion.div>
 ))}
 </div>
 )}
 </div>
 </section>
 );
};

/* TEAM CARD COMPONENT (Same as before) */
const TeamCard = ({ member, isActive, setActiveMember, setHoveredMember, isMobile }) => {
 return (
 <div
 onMouseEnter={() => !isMobile && setHoveredMember(member.id)}
 onMouseLeave={() => !isMobile && setHoveredMember(null)}
 className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] group cursor-pointer"
 onClick={() => isMobile && setActiveMember(isActive ? null : member.id)}
 >
 <img
 src={member.image}
 alt={member.name}
 className={`absolute inset-0 w-full h-full lowercase object-cover transition-transform duration-[1500ms] ease-[0.22,1,0.36,1] ${!isMobile && 'group-hover:scale-110'}`}
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

 {isMobile && (
 <button
 onClick={(e) => {
 e.stopPropagation();
 setActiveMember(member.id);
 }}
 className="absolute top-4 right-4 bg-black/20 backdrop-blur-md p-3 rounded-full border border-black/20 z-10 hover:bg-black/30 transition-colors"
 >
 <span className="block w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
 </button>
 )}
 </motion.div>
 ) : (
 <motion.div
 key="back"
 initial={{ opacity: 0, backdropFilter:"blur(0px)" }}
 animate={{ opacity: 1, backdropFilter:"blur(20px)" }}
 exit={{ opacity: 0, backdropFilter:"blur(0px)" }}
 transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
 className="absolute inset-0 w-full h-full bg-black/60 text-white p-6 flex flex-col justify-start z-20"
 >
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
 <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
 </svg>
 </motion.button>
 )}

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

export default DesingerTeam;
// import React, { useEffect, useState } from"react";
// import { useParams, Link } from"react-router-dom";
// import { servicesData } from"./servicesData";
// import PageHeroSection from"../PageHeroSection";
// import { ArrowBigLeftIcon, ArrowUpRight, Plus } from"lucide-react";
// import { motion } from"framer-motion";
// import Button from"../Button";
// import ReviewSection from"../homeSections/ReviewSection";
// import ServiceReviews from"./ServiceReviews";

// const ServiceDetailPages = () => {
// const { slug } = useParams();
// const service = servicesData.find((s) => s.slug === slug);
// const [isMobile, setIsMobile] = useState(false);

// useEffect(() => {
// const checkMobile = () => setIsMobile(window.innerWidth < 768);
// checkMobile();
// window.addEventListener("resize", checkMobile);
// return () => window.removeEventListener("resize", checkMobile);
// }, []);

// useEffect(() => {
// window.scrollTo(0, 0);
// }, [slug]);

// if (!service) return <div className="bg-black h-screen" />;

// return (
// <main className="bg-black text-white font-lato">
// {/* HERO */}
// <PageHeroSection
// image={service.heroImg}
// title={service.title}
// titleSize="text-5xl md:text-8xl pb-10 font-extralight tracking-tight"
// />

// <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-8 md:py-16">
// {/* INTRO IMAGE */}
// <motion.section
// initial={{ opacity: 0, y: 40 }}
// whileInView={{ opacity: 1, y: 0 }}
// transition={{ duration: 0.8, ease:"easeOut" }}
// viewport={{ once: true }}
// className="mb-10 md:mb-16"
// >
// <h2 className="text-base md:text-3xl font-light mb-4 md:mb-10 text-zinc-200 lowercase">
// {service.introTitle}
// </h2>

// <motion.div
// initial={{ scale: 1.08, opacity: 0 }}
// whileInView={{ scale: 1, opacity: 1 }}
// transition={{ duration: 1.2, ease:"easeOut" }}
// viewport={{ once: true }}
// className="overflow-hidden"
// >
// <img
// src={service.mainIntroImg}
// alt="intro"
// className="w-full h-[250px] md:h-[450px] object-cover"
// />
// </motion.div>
// </motion.section>

// {/* WHY + INCLUDES */}
// <motion.section
// initial="hidden"
// whileInView="visible"
// viewport={{ once: true }}
// variants={{
// visible: { transition: { staggerChildren: 0.15 } },
// }}
// className="flex flex-col gap-6 md:gap-8 mb-12 md:mb-16 max-w-[850px]"
// >
// <motion.div
// variants={{
// hidden: { opacity: 0, x: -30 },
// visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
// }}
// >
// <h3 className="text-xl md:text-2xl font-light mb-3 md:mb-4 lowercase">why choose us?</h3>
// <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed lowercase">
// {service.whyChoose}
// </p>
// </motion.div>

// <motion.div
// variants={{
// hidden: { opacity: 0, y: 30 },
// visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
// }}
// >
// <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 lowercase">services include:</h3>
// <ul className="space-y-2 md:space-y-3">
// {service.includes.map((item, i) => (
// <motion.li
// key={i}
// initial={{ opacity: 0, x: -10 }}
// whileInView={{ opacity: 1, x: 0 }}
// transition={{ delay: i * 0.05 }}
// viewport={{ once: true }}
// className="flex items-center gap-3 text-zinc-400 text-sm md:text-[15px]"
// >
// <span className="w-1 h-1 bg-zinc-500 rounded-full flex-shrink-0" />
// <span className="flex lowercase">{item}</span>
// </motion.li>
// ))}
// </ul>
// </motion.div>
// </motion.section>

// {/* OTHER SERVICES */}
// <motion.section
// initial={{ opacity: 0, y: 60 }}
// whileInView={{ opacity: 1, y: 0 }}
// transition={{ duration: 0.9, ease:"easeOut" }}
// viewport={{ once: true }}
// className="flex flex-col md:flex-row bg-[#161616] rounded-sm overflow-hidden mb-12 md:mb-20 md:h-[400px]"
// >
// <div className="md:w-[45%] h-[200px] md:h-auto">
// <img
// src={service.otherServicesImg}
// className="w-full h-full object-cover"
// alt="other services"
// />
// </div>

// <div className="md:w-[55%] p-6 md:p-12 flex flex-col justify-center">
// <h4 className="text-xl md:text-2xl font-light mb-6 md:mb-8 text-zinc-200">
// other services we provide
// </h4>

// <div className="divide-y divide-zinc-800 border-b border-zinc-800">
// {service.otherServices?.map((item, index) => (
// <Link
// to={item.link}
// key={index}
// className="flex justify-between items-center py-3 md:py-4 group"
// >
// <span className="text-zinc-400 text-sm transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
// {item.title}
// </span>
// <ArrowUpRight size={20} className="text-zinc-600 group-hover:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
// </Link>
// ))}
// </div>

// <motion.div
// initial={{ opacity: 0, x: -20 }}
// whileInView={{ opacity: 1, x: 0 }}
// transition={{ duration: 0.7 }}
// viewport={{ once: true }}
// className="mt-6 md:mt-8"
// >
// <Button to="/services" text="explore now" size="sm" />
// </motion.div>
// </div>
// </motion.section>

// {/* PROCESS – STACKING STICKY CARDS */}
// <section className="relative mt-6 md:mt-10">
// {/* Header */}
// <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-0 mb-4 md:mb-5 border-b border-zinc-900 pb-4">
// <h4 className=" lowercase text-lg tracking-[0.4em] text-zinc-500">
// our process
// </h4>
// <p className="text-sm md:text-lg font-light text-zinc-400 lowercase">
// Our four-phase process for flawlessly bringing<br className="hidden md:block" />
// imaginative designs to life
// </p>
// </div>

// <motion.div
// initial={{ opacity: 0, x: 20 }}
// whileInView={{ opacity: 1, x: 0 }}
// transition={{ duration: 0.7 }}
// viewport={{ once: true }}
// className="flex justify-start md:justify-end mb-10 md:mb-16"
// >
// <Button to="/contact" text="Start your project" size="sm" />
// </motion.div>

// {/* SCROLL CONTAINER */}
// <div className="relative md:min-h-[220vh]">
// {service.process.map((step, i) => (
// <motion.div
// key={step.step}
// initial={{ opacity: 30, y: 60 }}
// whileInView={{ opacity: 1, y: 0 }}
// transition={{ duration: 0.8, ease:"easeOut" }}
// viewport={{ once: true }}
// className="md:sticky top-28 bg-[#121212] p-6 md:p-10 border border-zinc-900 rounded-sm flex flex-col md:flex-row gap-6 md:gap-12 mb-4 md:mb-8"
// style={isMobile ? {} : {
// top:`${120 + i * 40}px`,
// zIndex: service.process.length + i
// }}
// >
// {/* LEFT */}
// <div className="md:w-1/2">
// <span className="text-zinc-600 text-sm lowercase tracking-widest block">
// step
// </span>
// <span className="text-3xl md:text-4xl font-light text-zinc-500">
// {step.step}
// </span>

// <div className="mt-4 h-[180px] md:h-[250px] overflow-hidden border border-zinc-800">
// <img
// src={step.img}
// alt=""
// className="w-full h-full object-cover scale-105 hover:scale-100 transition-all duration-[1200ms]"
// />
// </div>
// </div>

// {/* RIGHT */}
// <div className="md:w-1/2 md:pt-16">
// <h3 className="text-lg md:text-xl font-light text-zinc-300 mb-3 md:mb-4 lowercase">
// {step.title}
// </h3>
// <p className="text-zinc-500 text-xs md:text-sm max-w-[500px] lowercase">
// {step.desc}
// </p>
// </div>
// </motion.div>
// ))}
// </div>
// </section>
// </div>

// <div className="-mt-6 md:-mt-10">
// <ServiceReviews reviews={service.reviews} />
// </div>
// </main>
// );
// };

// export default ServiceDetailPages;




import React, { useEffect, useState } from"react";
import { useParams, Link } from"react-router-dom";
import { servicesData } from"./servicesData";
import PageHeroSection from"../PageHeroSection";
import { ArrowBigLeftIcon, ArrowUpRight, Plus } from"lucide-react";
import { motion } from"framer-motion";
import Button from"../Button";
import ReviewSection from"../homeSections/ReviewSection";
import ServiceReviews from"./ServiceReviews";

const ServiceDetailPages = () => {
 const { slug } = useParams();
 const service = servicesData.find((s) => s.slug === slug);
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
 const checkMobile = () => setIsMobile(window.innerWidth < 768);
 checkMobile();
 window.addEventListener("resize", checkMobile);
 return () => window.removeEventListener("resize", checkMobile);
 }, []);

 useEffect(() => {
 window.scrollTo(0, 0);
 }, [slug]);

 if (!service) return <div className="bg-black h-screen" />;

 return (
 <main className="bg-black text-white font-lato">
 {/* HERO */}
 <PageHeroSection
 image={service.heroImg}
 title={service.title}
 titleSize="text-5xl md:text-8xl pb-10 font-extralight tracking-tight"
 />

 <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-8 md:py-16">
 {/* INTRO IMAGE */}
 <motion.section
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease:"easeOut" }}
 viewport={{ once: true }}
 className="mb-10 md:mb-16"
 >
 <h2 className="text-base md:text-3xl font-light mb-4 md:mb-10 text-zinc-200 lowercase">
 {service.introTitle}
 </h2>

 <motion.div
 initial={{ scale: 1.08, opacity: 0 }}
 whileInView={{ scale: 1, opacity: 1 }}
 transition={{ duration: 1.2, ease:"easeOut" }}
 viewport={{ once: true }}
 className="overflow-hidden"
 >
 <img
 src={service.mainIntroImg}
 alt="intro"
 className="w-full h-[250px] md:h-[450px] object-cover"
 />
 </motion.div>
 </motion.section>

 {/* WHY + INCLUDES */}
 <motion.section
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={{
 visible: { transition: { staggerChildren: 0.15 } },
 }}
 className="flex flex-col gap-6 md:gap-8 mb-12 md:mb-16 w-full"
 >
 <motion.div
 variants={{
 hidden: { opacity: 0, x: -30 },
 visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
 }}
 >
 {/* <h3 className="text-xl md:text-2xl font-light mb-3 md:mb-4 lowercase">why choose us?</h3> */}
 <div className="text-zinc-400 text-sm md:text-[18px] text-justify leading-relaxed lowercase space-y-4">
 {Array.isArray(service.whyChoose) ? (
 service.whyChoose.map((paragraph, index) => (
 <p key={index}>{paragraph}</p>
 ))
 ) : (
 <p>{service.whyChoose}</p>
 )}
 </div>
 </motion.div>

 <motion.div
 variants={{
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
 }}
 >
 {/* <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 lowercase">services include:</h3> */}
 <ul className="space-y-2 md:space-y-3">
 {service.includes.map((item, i) => (
 <motion.li
 key={i}
 initial={{ opacity: 0, x: -10 }}
 whileInView={{ opacity: 1, x: 0 }}
 transition={{ delay: i * 0.05 }}
 viewport={{ once: true }}
 className="flex items-center gap-3 text-zinc-400 text-sm md:text-[15px]"
 >
 <span className="w-1 h-1 bg-zinc-500 rounded-full flex-shrink-0" />
 <span className="flex lowercase">{item}</span>
 </motion.li>
 ))}
 </ul>
 </motion.div>
 </motion.section>

 {/* OTHER SERVICES */}
 <motion.section
 initial={{ opacity: 0, y: 60 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.9, ease:"easeOut" }}
 viewport={{ once: true }}
 className="flex flex-col md:flex-row bg-[#161616] rounded-sm overflow-hidden mb-12 md:mb-20 md:h-[400px]"
 >
 <div className="md:w-[45%] h-[200px] md:h-auto">
 <img
 src={service.otherServicesImg}
 className="w-full h-full object-cover"
 alt="other services"
 />
 </div>

 <div className="md:w-[55%] p-6 md:p-12 flex flex-col justify-center">
 <h4 className="text-xl md:text-2xl font-light mb-6 md:mb-8 text-zinc-200">
 other services we provide
 </h4>

 <div className="divide-y divide-zinc-800 border-b border-zinc-800">
 {service.otherServices?.map((item, index) => (
 <Link
 to={item.link}
 key={index}
 className="flex justify-between items-center py-3 md:py-4 group"
 >
 <span className="text-zinc-400 text-sm transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
 {item.title}
 </span>
 <ArrowUpRight size={20} className="text-zinc-600 group-hover:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
 </Link>
 ))}
 </div>

 <motion.div
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.7 }}
 viewport={{ once: true }}
 className="mt-6 md:mt-8"
 >
 <Button to="/services" text="explore now" size="sm" />
 </motion.div>
 </div>
 </motion.section>

 {/* PROCESS – STACKING STICKY CARDS */}
 <section className="relative mt-6 md:mt-10">
 {/* Header */}
 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-0 mb-4 md:mb-5 border-b border-zinc-900 pb-4">
 <h4 className=" lowercase text-lg tracking-[0.4em] text-zinc-500" >
 {/* DYNAMIC FALLBACK: Agar processHeading h toh wo dikhao, warna 'our process' */}
 {service.processHeading ||"our process"}
 </h4>
 <p className="text-sm md:text-lg font-light md:w-[50%] md:text-right text-zinc-400 lowercase">
 {/* DYNAMIC FALLBACK: Agar processSubHeading h toh wo dikhao, warna purana text */}
 {service.processSubHeading ? (
 service.processSubHeading
 ) : (
 <>
 Our four-phase process for flawlessly bringing<br className="hidden md:block" />
 imaginative designs to life
 </>
 )}
 </p>
 </div>

 <motion.div
 initial={{ opacity: 0, x: 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.7 }}
 viewport={{ once: true }}
 className="flex justify-start md:justify-end mb-10 md:mb-16"
 >
 {/* DYNAMIC FALLBACK: Agar ctaText h toh wo dikhao, warna 'Start your project' */}
 <Button to="/contact" text={service.ctaText ||"Start your project"} size="sm" />
 </motion.div>

 {/* SCROLL CONTAINER */}
 <div className="relative md:min-h-[220vh]">
 {service.process.map((step, i) => (
 <motion.div
 key={step.step}
 initial={{ opacity: 30, y: 60 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease:"easeOut" }}
 viewport={{ once: true }}
 className="md:sticky top-28 bg-[#121212] p-6 md:p-10 border border-zinc-900 rounded-sm flex flex-col md:flex-row gap-6 md:gap-12 mb-4 md:mb-8"
 style={isMobile ? {} : {
 top:`${120 + i * 40}px`,
 zIndex: service.process.length + i
 }}
 >
 {/* LEFT */}
 <div className="md:w-1/2">
 <span className="text-zinc-600 text-sm lowercase tracking-widest block">
 step
 </span>
 <span className="text-3xl md:text-4xl font-light text-zinc-500">
 {step.step}
 </span>

 <div className="mt-4 h-[180px] md:h-[250px] overflow-hidden border border-zinc-800">
 <img
 src={step.img}
 alt=""
 className="w-full h-full object-cover scale-105 hover:scale-100 transition-all duration-[1200ms]"
 />
 </div>
 </div>

 {/* RIGHT */}
 <div className="md:w-1/2 md:pt-16">
 <h3 className="text-lg md:text-xl font-light text-zinc-300 mb-3 md:mb-4 lowercase">
 {step.title}
 </h3>
 <p className="text-zinc-500 text-xs md:text-sm max-w-[500px] lowercase">
 {step.desc}
 </p>
 </div>
 </motion.div>
 ))}
 </div>
 </section>
 </div>

 <div className="-mt-6 md:-mt-10">
 {/* <ServiceReviews reviews={service.reviews} /> */}
 </div>
 </main>
 );
};

export default ServiceDetailPages;
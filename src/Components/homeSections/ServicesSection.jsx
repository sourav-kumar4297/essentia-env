// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const ServicesSection = () => {
//     // 6 Items add kar diye gaye hain
//     const serviceData = [
//         { id: "01", title: "architectural Design", img: "/ServImgs/architechure/arch1.webp", desc: "We provide comprehensive architectural design services from concept to execution-ready documentation. Our process combines creativity with technical precision to deliver spaces that are " },
//         { id: "02", title: "interior Design", img: "/ServImgs/interior/inter4.webp", desc: "Our interior design focuses on creating curated living environments that feel calm, intuitive, and purposeful. Through thoughtful spatial planning, material selection, and natural light, " },
//         { id: "03", title: "landscape Design", img: "/ServImgs/landscape/land5.webp", desc: "We design landscapes that thoughtfully connect architecture with nature. By considering sunlight, movement, greenery, and views, we create outdoor spaces that feel harmonious, inviting, " },
//         { id: "04", title: "design to build execution", img: "/ServImgs/design/design2.webp", desc: "Our design-to-build approach ensures seamless transition from concept to on-site realization. With in-house coordination and attention to detail, we deliver spaces that reflect " },
//         { id: "05", title: "exterior design", img: "/ServImgs/exterior/ext4.webp", desc: "End-to-end project management and execution, ensuring every detail of the design is realized exactly as envisioned without the stress of coordinating multiple contractors." },
//         { id: "06", title: "Bespoke furniture", img: "/ServImgs/bespoke/Bespoke furniture.webp", desc: "Bespoke furniture design tailored specifically to your space. We craft unique pieces that perfectly match the architectural language and elevate the overall interior experience." },
//     ];

//     const [currentSlide, setCurrentSlide] = useState(0);

//     // Auto slide for mobile
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prev) => (prev + 1) % serviceData.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [serviceData.length]);

//     const goToSlide = (index) => {
//         setCurrentSlide(index);
//     };

//     return (
//         <section className="w-full bg-black py-10 px-4 md:px-16 lg:px-24 overflow-hidden">
//             <div className="max-w-[1400px] mx-auto">
//                 <div className="mb-12 md:px-0">
//                     <h2 className="text-white text-3xl md:text-5xl font-light tracking-tighter lowercase">
//                         services we deliver
//                     </h2>
//                 </div>

//                 <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-0 relative">
//                     {/* Vertical Background Lines */}
//                     <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/10 z-0"></div>
//                     <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10 z-0"></div>
//                     <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/10 z-0"></div>

//                     {/* Horizontal Background Lines (Updated for 3 rows) */}
//                     <div className="absolute top-[33.33%] left-0 w-full h-[1px] bg-white/10 z-0"></div>
//                     <div className="absolute top-[66.66%] left-0 w-full h-[1px] bg-white/10 z-0"></div>

//                     {serviceData.map((item, index) => {
//                         // Dynamically adjust padding based on row position for a clean look
//                         let paddingClass = "py-8 md:py-12";
//                         if (index < 2) paddingClass = "md:pb-12 md:pt-4 py-8"; // Top row
//                         else if (index > 3) paddingClass = "md:pt-12 md:pb-4 py-8"; // Bottom row

//                         return (
//                             <div
//                                 key={index}
//                                 className={`group flex flex-col md:flex-row relative z-10 
//                                     ${paddingClass} border-b border-white/10 md:border-none`}
//                             >
//                                 <div className="w-full md:w-1/2 px-4 md:px-6">
//                                     <div className="aspect-square w-full overflow-hidden bg-zinc-900 shadow-xl">
//                                         <img
//                                             src={item.img}
//                                             alt={item.title}
//                                             loading="lazy"
//                                             className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="w-full md:w-1/2 flex flex-col justify-between px-6 md:px-8 pt-6 md:pt-0">
//                                     <div>
//                                         <span className="text-white/40 text-xs font-light block mb-1">{item.id}</span>
//                                         <h3 className="text-white text-xl md:text-2xl font-light lowercase leading-tight transition-all duration-500">
//                                             {item.title}
//                                         </h3>
//                                     </div>
//                                     <p className="text-white/50 text-[12px] md:text-[14px] font-light leading-relaxed mt-4 md:mt-0 w-[280px] lowercase">
//                                         {item.desc}
//                                     </p>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 <div className="md:hidden relative h-[30vh] my-10">
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={currentSlide}
//                             initial={{ opacity: 0, x: 50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: -50 }}
//                             transition={{ duration: 0.4 }}
//                             className="flex flex-row w-full h-full gap-4 items-center"
//                         >
//                             <div className="w-[50%] h-full">
//                                 <div className="w-full h-[30vh] overflow-hidden bg-zinc-900 shadow-xl">
//                                     <img
//                                         src={serviceData[currentSlide].img}
//                                         alt={serviceData[currentSlide].title}
//                                         className="w-full h-full object-cover"
//                                         loading="lazy"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="w-[50%] flex flex-col h-[30vh] justify-center">
//                                 <div className="my-2 mb-8">
//                                     <span className="text-white/40 text-[11px] font-light block mb-1 tracking-wider">
//                                         {serviceData[currentSlide].id}
//                                     </span>
//                                     <h3 className="text-white text-[18px] font-light lowercase leading-[1.15] tracking-tight">
//                                         {serviceData[currentSlide].title}
//                                     </h3>
//                                 </div>

//                                 <div className="flex-grow flex items-center">
//                                     <p className="text-white/60 text-[12px] font-light leading-[1.55] tracking-tight">
//                                         {serviceData[currentSlide].desc}
//                                     </p>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </AnimatePresence>
//                 </div>

//                 <div className="md:hidden mt-6">
//                     <div className="h-[1px] w-full bg-white/10 relative">
//                         <motion.div
//                             key={currentSlide}
//                             initial={{ width: "0%" }}
//                             animate={{ width: "100%" }}
//                             transition={{ duration: 5, ease: "linear" }}
//                             className="absolute top-0 left-0 h-full bg-white"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ServicesSection;






import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ServicesSection = () => {
    // 6 Items add kar diye gaye hain
    const serviceData = [
        { id: "01", title: "architectural Design", img: "/architectural.webp", desc: "We provide comprehensive architectural design services from concept to execution-ready documentation. Our process combines creativity with technical precision to deliver spaces that are " },
        { id: "02", title: "interior Design", img: "/interior.webp", desc: "Our interior design focuses on creating curated living environments that feel calm, intuitive, and purposeful. Through thoughtful spatial planning, material selection, and natural light, " },
        { id: "03", title: "landscape Design", img: "/LANDSCAPE/1.webp", desc: "We design landscapes that thoughtfully connect architecture with nature. By considering sunlight, movement, greenery, and views, we create outdoor spaces that feel harmonious, inviting, " },
        { id: "04", title: "design to build execution", img: "/design to build.webp", desc: "Our design-to-build approach ensures seamless transition from concept to on-site realization. With in-house coordination and attention to detail, we deliver spaces that reflect " },
        { id: "05", title: "exterior design", img: "/exterior.webp", desc: "End-to-end project management and execution, ensuring every detail of the design is realized exactly as envisioned without the stress of coordinating multiple contractors." },
        { id: "06", title: "Bespoke furniture", img: "/furniture/25.webp", desc: "Bespoke furniture design tailored specifically to your space. We craft unique pieces that perfectly match the architectural language and elevate the overall interior experience." },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slide for mobile
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % serviceData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [serviceData.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="w-full bg-black py-10 px-4 md:px-16 lg:px-24 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-12 md:px-0">
                    <h2 className="text-white text-3xl md:text-5xl font-light tracking-tighter lowercase">
                        our design disciplines
                    </h2>
                </div>

                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-0 relative">
                    {/* Vertical Background Lines */}
                    <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/10 z-0"></div>
                    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10 z-0"></div>
                    <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/10 z-0"></div>

                    {/* Horizontal Background Lines (Updated for 3 rows) */}
                    <div className="absolute top-[33.33%] left-0 w-full h-[1px] bg-white/10 z-0"></div>
                    <div className="absolute top-[66.66%] left-0 w-full h-[1px] bg-white/10 z-0"></div>

                    {serviceData.map((item, index) => {
                        // Dynamically adjust padding based on row position for a clean look
                        let paddingClass = "py-8 md:py-12";
                        if (index < 2) paddingClass = "md:pb-12 md:pt-4 py-8"; // Top row
                        else if (index > 3) paddingClass = "md:pt-12 md:pb-4 py-8"; // Bottom row

                        return (
                            <div
                                key={index}
                                className={`group flex flex-col md:flex-row relative z-10 
                                    ${paddingClass} border-b border-white/10 md:border-none`}
                            >
                                <div className="w-full md:w-1/2 px-4 md:px-6">
                                    <div className="aspect-square w-full overflow-hidden bg-zinc-900 shadow-xl">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 flex flex-col justify-between px-6 md:px-8 pt-6 md:pt-0">
                                    <div>
                                        <span className="text-white/40 text-xs font-light block mb-1">{item.id}</span>
                                        <h3 className="text-white text-xl md:text-2xl font-light lowercase leading-tight transition-all duration-500">
                                            {item.title}
                                        </h3>
                                    </div>
                                    {/* FIX APPLIED HERE: Removed w-[280px], added w-full, max-w-[280px] and pr-4 for safe spacing */}
                                    <p className="text-white/50 text-[12px] md:text-[14px] font-light leading-relaxed mt-4 md:mt-0 w-full max-w-xs xl:max-w-[280px] pr-2 lowercase">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="md:hidden relative h-[30vh] my-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-row w-full h-full gap-4 items-center"
                        >
                            <div className="w-[50%] h-full">
                                <div className="w-full h-[30vh] overflow-hidden bg-zinc-900 shadow-xl">
                                    <img
                                        src={serviceData[currentSlide].img}
                                        alt={serviceData[currentSlide].title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            <div className="w-[50%] flex flex-col h-[30vh] justify-center">
                                <div className="my-2 mb-8">
                                    <span className="text-white/40 text-[11px] font-light block mb-1 tracking-wider">
                                        {serviceData[currentSlide].id}
                                    </span>
                                    <h3 className="text-white text-[18px] font-light lowercase leading-[1.15] tracking-tight">
                                        {serviceData[currentSlide].title}
                                    </h3>
                                </div>

                                <div className="flex-grow flex items-center pr-2"> {/* Added slight padding right */}
                                    {/* FIX APPLIED HERE: Mobile description text behavior */}
                                    <p className="text-white/60 text-[12px] font-light leading-[1.55] tracking-tight line-clamp-6">
                                        {serviceData[currentSlide].desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="md:hidden mt-6">
                    <div className="h-[1px] w-full bg-white/10 relative">
                        <motion.div
                            key={currentSlide}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="absolute top-0 left-0 h-full bg-white"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
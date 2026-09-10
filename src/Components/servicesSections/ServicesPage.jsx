import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../Button';
import { useLocation } from 'react-router-dom';

// --- LIGHTBOX COMPONENT ---
const Lightbox = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 transition-colors z-50" onClick={onClose}>
        <X size={28} />
      </button>
      <button className="absolute left-4 md:left-10 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition-colors z-50" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
        <ChevronLeft size={32} />
      </button>
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          loading="lazy"
          decoding="async"
          className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
        />
        <p className="text-white/50 text-center mt-4 text-sm tracking-widest font-light">
          {currentIndex + 1} / {images.length}
        </p>
      </motion.div>
      <button className="absolute right-4 md:right-10 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition-colors z-50" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
        <ChevronRight size={32} />
      </button>
    </motion.div>
  );
};

// --- SERVICE ITEM COMPONENT ---
const ServiceItem = ({ title, desc, features, images, link, openLightbox, categoryType, hideSubText }) => {
  const titleParts = title.split(':');
  const mainTitle = titleParts[0];
  const subTitle = titleParts.length > 1 ? titleParts[1] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className="mb-20 md:mb-32 group"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        <div className={`${features && features.length > 0 ? 'md:col-span-7' : 'md:col-span-12'} pr-4`}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            className="text-3xl md:text-[42px] font-light mb-5 md:mb-8 text-white lowercase"
          >
            <span className="italic font-light opacity-80">{mainTitle}</span>
            
            {!hideSubText && categoryType ? ` ${categoryType}` : ""}

            {subTitle && (
              <span className="block mt-2 text-xl md:text-2xl text-zinc-500 font-light tracking-widest not-italic">
                {subTitle}
              </span>
            )}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: 0.1 }}
            className={`text-zinc-400 text-base md:text-lg font-light text-justify leading-relaxed mb-8 md:mb-10 lowercase ${features && features.length > 0 ? 'max-w-xl' : ''}`}
          >
            {desc}
          </motion.p>

          {link && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: 0.2 }}
            >
              <Button to={link} text="view more" className="mt-0" size="sm" />
            </motion.div>
          )}
        </div>

        {features && features.length > 0 && (
          <div className="md:col-span-5 pt-0 md:pt-4 overflow-hidden">
            <ul className="space-y-0">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                  whileHover={{ x: 10 }}
                  className="py-3 md:py-5 border-b border-zinc-800 text-zinc-300 text-lg md:text-xl font-light tracking-wide first:pt-0 hover:text-white cursor-default transition-colors duration-300 lowercase"
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {images && images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: idx === 0 ? 1.02 : 0.98 }}
              className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-sm bg-zinc-900 cursor-pointer group/img"
              onClick={() => openLightbox(images, idx)}
            >
              <img
                src={img}
                alt={`${title} visual ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-1000 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
const ServicesPage = () => {
  const location = useLocation();
  const [lightboxData, setLightboxData] = useState({ isOpen: false, images: [], initialIndex: 0 });

  // Handle Hash Scrolling
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const openLightbox = (images, initialIndex) => {
    setLightboxData({ isOpen: true, images, initialIndex });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
    document.body.style.overflow = 'unset';
  };

  // ================= STRUCTURED DATA =================
  const categorizedServices = {
    design: {
      categoryName: "design",
      catDesc: "",
      subText: "design",
      services: [
        {
          title: "architectural",
          desc: "We approach architecture as the foundation of how a space is experienced, not just how it looks. Each project begins with a deep understanding of site, climate, and the way the client lives, allowing the built form to respond naturally to its context. From spatial planning and structural logic to material selection and façade articulation, every element is carefully considered. The process is collaborative and detail-driven, ensuring that the architecture is not only visually compelling but also intuitive to inhabit. The result is a structure that feels coherent, purposeful, and built to stand the test of time. ",
          // features: ["3d renders", "building code compliance", "accessibility consulting"],
          images: ["/architectrual/Manglam_Elevation_Front_View01.webp", "/architectrual/Manglam_Elevation_Left_View01.webp", "/architectrual/Bansal Office_Elevation front.webp"],
          link: "/services/architectural-design"
        },
        {
          title: "interior",
          desc: "Interior design at Essentia is rooted in creating spaces that feel personal, layered, and easy to live in. The focus goes beyond aesthetics to consider proportion, movement, light, and materiality, shaping environments that evolve with their users. Each space is approached holistically, with furniture, finishes, lighting, and detailing developed as part of a larger narrative. The team works closely with clients to translate their lifestyles into thoughtfully designed interiors that balance comfort with refinement. The outcome is a home or space that feels complete, where every element sits in quiet harmony with the next. ",
          // features: ["3d renders", "material selection", "lighting design"],
          images: ["/INTERIOR DESIGN/1.webp", "/INTERIOR DESIGN/2.webp", "/INTERIOR DESIGN/3.webp"],
          link: "/services/interior-design"
        },
        // {
        //   title: "exterior",
        //   desc: "The exterior of a space sets the tone for everything that follows, and we treat it as an extension of the architectural narrative. Façades are developed with a strong emphasis on proportion, material contrast, and longevity, ensuring they remain relevant over time. The interplay of textures, finishes, and structural elements is carefully balanced to create a distinct yet cohesive identity. Attention is also given to how the exterior interacts with light and surroundings, allowing the building to sit comfortably within its environment. The result is an elevation that is both striking and grounded, making a lasting first impression without excess.",
        //   // features: ["facade design", "exterior lighting", "material & texture selection"],
        //   images: ["/ServImgs/exterior/ext1.webp", "/ServImgs/exterior/ext2.webp", "/ServImgs/exterior/ext3.webp"],
        //   link: "/services/exterior-design"
        // },
        {
          title: "landscape",
          desc: "Landscape design is about shaping outdoor spaces that feel as considered as the interiors they accompany. The approach integrates natural elements with built structures, creating a seamless transition between indoors and outdoors. Plant palettes, hardscaping, water features, and lighting are all curated to suit the climate and the rhythm of the space. Each landscape is designed to be both functional and calming, whether it’s for entertaining, relaxation, or everyday use. Over time, these spaces mature and evolve, adding depth and character to the overall environment while remaining easy to maintain.",
          // features: ["virtual visualizations", "regulatory standards adherence", "biodiversity restoration"],
          images: ["/LANDSCAPE/1.webp", "/LANDSCAPE/2.webp", "/LANDSCAPE/3.webp"],
          link: "/services/landscape-design"
        },
        {
          title: "Lighting",
          desc: "Lighting at Essentia is treated as an integral layer of design, shaping how spaces are perceived and experienced across the day. The approach balances natural and artificial light, using both to enhance materiality, define volumes, and create mood. Each scheme is carefully planned, from ambient and task lighting to accent and feature installations, ensuring that every element serves a purpose. Technical precision is paired with a strong design sensibility, resulting in environments that feel warm, inviting, and visually balanced. The outcome is lighting that quietly elevates the space without drawing unnecessary attention to itself. ",
          // features: ["project management", "quality control", "vendor coordination"],
images: [ "/lighting design/1.webp", "/lighting design/9.webp", "/lighting design/3.webp"],
          link: "/services/lighting"
        },
        {
          title: "PMC: Project Management Consultancy",
          desc: "Essentia’s PMC service ensures that every project moves from concept to completion with clarity and control. Acting as a central point of coordination, the team oversees timelines, budgets, consultants, and on-site execution, aligning all moving parts under a unified vision. The focus is on proactive planning and transparent communication, anticipating challenges before they arise and resolving them efficiently. With a strong understanding of both design intent and technical execution, Essentia ensures that the final outcome remains true to the original vision, delivered with precision and accountability at every stage. ",
          // features: ["curated accessories", "art & wall styling", "soft furnishings", "lighting as decor"],
          images: ["/turnkey pmc/1.webp", "/turnkey pmc/2.webp", "/turnkey pmc/3.webp"],
          link: "/services/pmc",
          
        },
        {
          title: "Styling & Staging ",
          desc: "Styling and staging at Essentia bring the final layer of a space together, adding depth, character, and a sense of completion. This process involves curating furniture, art, objects, and soft furnishings that align with the overall design narrative while introducing subtle moments of contrast and interest. Each element is placed with intention, considering scale, proportion, and visual flow. Whether for a lived-in home or a presentation-ready space, the focus is on creating environments that feel cohesive and inviting. The result is a space that not only looks resolved but also feels thoughtfully inhabited.",
          // features: ["curated accessories", "art & wall styling", "soft furnishings", "lighting as decor"],
          images: ["/Styling/01.webp", "/Styling/2.webp", "/Styling/3.webp"],
          link: "/services/styling",
          
        },
        {
          title: "MEP: Mechanical, Electrical & Plumbing ",
          desc: "MEP at Essentia is approached with a focus on performance, efficiency, and seamless integration within the larger design framework. Systems are carefully planned to support comfort, safety, and long-term functionality without disrupting the visual integrity of the space. From HVAC and electrical layouts to plumbing networks and automation, every component is coordinated with architectural and interior elements from the outset. This ensures that technical systems remain unobtrusive yet highly effective. The result is a space that functions effortlessly behind the scenes, supporting everyday living without compromise.",
          // features: ["curated accessories", "art & wall styling", "soft furnishings", "lighting as decor"],
          images: ["/ServImgs/decor/decor1.webp", "/ServImgs/decor/decor2.webp", "/ServImgs/decor/decor3.webp"],
          link: "/services/mep",
          
        }
      ]
    },
    build: {
      categoryName: "Build & Execution",
      catDesc: "",
      subText: "",
      services: [
        {
          title: "High-End Projects: residential / corporate",
          desc: "Essentia undertakes high-end projects with a focus on precision, detailing, and complete alignment with the design intent. Whether it is a private residence or a corporate environment, each project is executed with close attention to materials, finishes, and on-site craftsmanship. The team works with skilled specialists and trusted vendors to ensure that every element is delivered to the highest standard. Coordination across disciplines remains seamless, allowing complex ideas to be translated into built form without compromise. The result is a space that feels resolved in every detail, reflecting both the vision and the level of execution it demands.",
          // features: ["budget estimation", "timeline management", "site supervision"],
          images: ["/high end projects/1.webp", "/high end projects/2.webp", "/high end projects/3.webp"],
          link: "/services/high-end-projects"
        },
        {
          title: "Volume Projects: corporate / hotel / developers / fit-out leasing ",
          desc: "For large-scale and volume-driven projects, Essentia brings structure, efficiency, and consistency without diluting quality. The approach is rooted in strong planning, streamlined processes, and the ability to manage multiple sites or units simultaneously. Whether working on corporate offices, hospitality environments, or developer-led projects, the focus remains on delivering within defined timelines while maintaining design integrity. Essentia has undertaken large-scale developments in partnership with leading developers such as M3M India, Westin Whiteland, Suncity Projects, and Elan Group, bringing the same level of coordination and attention to detail across every project. The firm also offers fit-out solutions on a lease basis, enabling clients to access fully executed environments with greater flexibility. Standardisation is balanced with thoughtful detailing, ensuring each space feels considered rather than repetitive. The strength lies in execution at scale, where coordination, speed, and quality come together seamlessly. ",
          // features: ["civil construction", "MEP services", "finishing works"],
          images: ["/volume projects/1.webp", "/volume projects/2.webp", "/volume projects/3.webp"],
          link: "/services/volume-projects"
        },
        {
          title: "PMC: Execution Phase",
          desc: "During the execution phase, Essentia’s PMC services ensure that the design is carried through to site with accuracy and discipline. The team closely monitors construction progress, contractor performance, and material implementation, maintaining strict control over timelines and budgets. Regular site reviews and detailed reporting allow for clear visibility at every stage, while any deviations are addressed promptly. With a strong understanding of both design and build, Essentia acts as a bridge between intent and execution. This ensures that what is envisioned on paper is realised on site with clarity and consistency. ",
          // features: ["civil construction", "MEP services", "finishing works"],
          images: ["/turnkey pmc/4.webp", "/turnkey pmc/5.webp", "/turnkey pmc/6.webp"],
          link: "/services/pmc-execution"
        },
        {
          title: "Turnkey Solutions",
          desc: "Essentia’s turnkey approach offers clients a single point of responsibility from concept to completion. Every stage, from design development and procurement to construction and final handover, is managed under one integrated framework. This allows for greater control, reduced complexities, and a smoother overall process. The team ensures that all elements are aligned, eliminating the need for multiple points of coordination. With a focus on timelines, quality, and accountability, Essentia delivers fully realised spaces that are ready for immediate use, allowing clients to step into environments that are complete in every sense.",
          // features: ["civil construction", "MEP services", "finishing works"],
          images: ["/turnkey pmc/1.webp", "/turnkey pmc/2.webp", "/turnkey pmc/3.webp"],
          link: "/services/turnkey"
        }
      ]
    },
furniture: {
  categoryName: "Furniture",
  catDesc: "",
  services: [
    {
      title: "Products Overview",
      desc: "Essentia’s furniture and décor offering extends into a curated retail experience through Essentia Home, where clients can explore a wide range of products across categories. From statement furniture to everyday essentials, the collection reflects the same design sensibility and material focus seen across Essentia’s projects. The range brings together in-house creations, international collaborations, and carefully sourced pieces, offering both ready selections and customisable options. This platform allows clients, architects, and designers to engage with the brand’s product language more directly, while remaining seamlessly connected to Essentia’s larger design and build ecosystem.",
      images: [
        "furniture/1.webp",
        "furniture/2.webp",
        "furniture/3.webp"
      ],
      link: "/services/furniture-overview"
    }
  ]
}
  };

  return (
    <main className="bg-black min-h-screen font-lato overflow-x-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        <div>

          {/* ====== 1. DESIGN SECTION ====== */}
          <section id="design" className="mb-10 pt-10 scroll-mt-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="border-b border-white/20 pb-4 mb-16"
            >
              <h2 className="text-4xl md:text-5xl text-white font-light lowercase tracking-widest">01. Design</h2>
              <p className='text-base md:text-lg px-2 py-4 leading-relaxed text-zinc-400 font-light lowercase'>{categorizedServices.design.catDesc}</p>
            </motion.div>
            {categorizedServices.design.services.map((service, index) => (
              <ServiceItem key={index} {...service} categoryType={categorizedServices.design.subText} openLightbox={openLightbox} />
            ))}
          </section>

          {/* ====== 2. BUILD SECTION ====== */}
          <section id="build" className="mb-10 pt-10 scroll-mt-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="border-b border-white/20 pb-4 mb-16"
            >
              <h2 className="text-4xl md:text-5xl text-white font-light lowercase tracking-widest">02. Build</h2>
              <p className='text-base md:text-lg px-2 py-4 leading-relaxed text-zinc-400 font-light lowercase'>{categorizedServices.build.catDesc}</p>

            </motion.div>
            {categorizedServices.build.services.map((service, index) => (
              <ServiceItem key={index} {...service} categoryType={categorizedServices.build.subText} openLightbox={openLightbox} />
            ))}
          </section>

          {/* ====== 3. FURNITURE SECTION ====== */}
          <section id="furniture" className="mb-10 pt-10 scroll-mt-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="border-b border-white/20 pb-4 mb-16"
            >
              <h2 className="text-4xl md:text-5xl text-white font-light lowercase tracking-widest">03. Furniture</h2>
              <p className='text-base md:text-lg px-2 py-4 leading-relaxed text-zinc-400 font-light lowercase'>{categorizedServices.furniture.catDesc}</p>

            </motion.div>
            {categorizedServices.furniture.services.map((service, index) => (
              <ServiceItem key={index} {...service} categoryType={categorizedServices.furniture.subText} openLightbox={openLightbox} />
            ))}
          </section>

        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxData.isOpen && (
          <Lightbox images={lightboxData.images} initialIndex={lightboxData.initialIndex} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default ServicesPage;
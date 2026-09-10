import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    id: 1,
    question: "What services does essentia environments offer?",
    answer: "essentia environments is a multidisciplinary design and build practice offering services across architecture, interior design, exterior design, landscape planning, and turnkey project execution. Our team manages every stage of a project from concept development to final completion."
  },
  {
    id: 2,
    question: "What does a design-build approach mean?",
    answer: "Our design-build approach brings architecture, design, and execution together within a single integrated process. This allows for greater efficiency, seamless coordination, and consistent quality throughout the lifecycle of a project."
  },
  {
    id: 3,
    question: "Do you provide end-to-end turnkey solutions?",
    answer: "Yes. We provide turnkey solutions where our team oversees the entire journey from concept and design to manufacturing, on-site execution, and final handover."
  },
  {
    id: 4,
    question: "What types of projects do you undertake?",
    answer: "We work on a diverse range of projects including residences, villas, apartments, commercial offices, and hospitality spaces, delivering fully integrated architectural and interior environments."
  },
  {
    id: 5,
    question: "Are projects customized according to client needs?",
    answer: "Absolutely. Every project is uniquely designed to reflect the client’s vision, lifestyle, and spatial requirements while maintaining our standards of craftsmanship and design excellence."
  },
  {
    id: 6,
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on the scope, size, and complexity of the project. Once the design and project parameters are finalized, our team provides a clear execution schedule."
  },
  {
    id: 7,
    question: "Can clients visit your experience center?",
    answer: "Yes. Clients can visit our experience center to explore materials, finishes, design solutions, and our range of interior offerings."
  },
  {
    id: 8,
    question: "How do I start a project with essentia environments?",
    answer: "You can connect with our team through the website contact form, schedule a consultation, or visit our experience center to discuss your project requirements."
  },
  {
    id: 9,
    question: "Does essentia environments focus on sustainable design?",
    answer: "Yes. Sustainability is an integral part of our approach. We emphasize responsible sourcing, efficient manufacturing, and design practices that support long-term environmental well-being."
  }
];

const FaqSection = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFaq = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-black text-white py-8 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">

        {/* Header Section */}
        <div className="mb-12 md:mb-18">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-500 lowercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-4"
          >
            insights & information
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light lowercase tracking-tighter"
          >
            frequently asked questions
          </motion.h2>
        </div>

        {/* FAQs List */}
        <div className="flex flex-col border-t border-white/10">
          {faqData.map((faq, index) => {
            const isActive = activeId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-6 md:py-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  {/* Lowercase applied here */}
                  <h3 className={`text-base md:text-2xl font-light lowercase pr-6 md:pr-8 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {faq.question}
                  </h3>

                  {/* Animated Plus/Minus Icon */}
                  <div className="relative w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0">
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute w-full h-[1px] bg-white"
                    />
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 90, opacity: isActive ? 0 : 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute w-full h-[1px] bg-white"
                    />
                  </div>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      {/* Lowercase applied here */}
                      <p className="pb-8 md:pb-10 text-zinc-400 text-sm md:text-base font-light lowercase leading-relaxed max-w-[100%] md:max-w-[90%]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
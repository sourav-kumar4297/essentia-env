import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeroSection from "../PageHeroSection";
import { salesKitData } from "./salesKitData";

export default function SalesKitDetail() {
  const { slug } = useParams();
  const item = salesKitData.find((s) => s.slug === slug);
  const ease = [0.22, 1, 0.36, 1];

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-light mb-4">not found</h2>
          <p className="text-gray-400">this sales kit entry doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-black">
      <PageHeroSection
        image={item.image}
        title={item.title}
        titleSize="text-[55px] md:text-[65px]"
        clastyle="grayscale-0"
      />
      {item.description && (
        <section className="bg-black text-white py-16 md:py-20 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease }}
                className="flex flex-col order-2 md:order-1"
              >
                <h2 className="text-3xl md:text-4xl font-light mb-8 lowercase">project details</h2>
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12 lowercase">
                  {item.description}
                </p>
                <div className="w-full h-[1px] bg-white/20 mb-12" />
                <div className="grid grid-cols-2 gap-y-10 lowercase">
                  {(item.stats || []).map((s, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-white text-xl md:text-2xl font-light lowercase">{s.label}</span>
                      <span className="text-gray-500 text-lg md:text-xl font-light lowercase">{s.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease, delay: 0.1 }}
                className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-sm order-1 md:order-2"
              >
                <img
                  src={item.images[1] || item.images[0]}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}
      <section className="bg-black text-white py-8 md:py-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {item.images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease, delay: (i % 3) * 0.15 }}
                className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-sm group"
              >
                <img
                  src={src}
                  alt={`${item.title} ${i + 1}`}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

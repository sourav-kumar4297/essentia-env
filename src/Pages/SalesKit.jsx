import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageHeroSection from "../Components/PageHeroSection";
import Button from "../Components/Button";
import { salesKitData } from "../Components/salesKit/salesKitData";

const Grid = () => {
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const filtered =
    filter === "all"
      ? salesKitData
      : salesKitData.filter((t) => t.category.toLowerCase() === filter.toLowerCase());
  const visible = showAll ? filtered : filtered.slice(0, 8);
  const tabs = ["all", "residence", "corporate office", "commercial space"];

  return (
    <section className="bg-black py-10 px-6 md:px-16 font-lato overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-zinc-400 italic font-light mb-8 tracking-[0.1em] text-2xl md:text-4xl">
            our client presentations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setFilter(t);
                  setShowAll(false);
                }}
                className={`px-4 md:px-5 py-1.5 md:py-1.2 border text-[9.5px] md:text-[13px] lowercase tracking-[0.2em] transition-all duration-500 ${
                  filter === t
                    ? "border-white text-white bg-zinc-900"
                    : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-24">
          <AnimatePresence mode="popLayout">
            {visible.map((t) => (
              <Link key={t.id} to={`/sales-kit/${t.slug}`}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative group aspect-square overflow-hidden bg-zinc-900 cursor-pointer"
                >
                  <img
                    src={t.image}
                    alt={t.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <h3 className="text-white text-lg md:text-2xl font-light lowercase text-center transition-transform duration-700 group-hover:-translate-y-6">
                      {t.title}
                    </h3>
                  </div>
                  <div className="absolute bottom-10 left-0 w-full flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0">
                    <Button
                      to={`/sales-kit/${t.slug}`}
                      text="view more"
                      className="mt-0 mx-auto md:mx-0 mb-5 hidden md:block"
                      size="sm"
                    />
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>
        {!showAll && filtered.length > 8 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="px-10 py-3 border border-zinc-700 text-zinc-400 hover:border-white hover:text-white text-sm lowercase tracking-[0.2em] transition-all duration-300"
            >
              view more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default function SalesKit() {
  return (
    <div className="min-h-screen bg-black text-white font-lato">
      <PageHeroSection
        image="/SalesKitImgs/sales-kit-hero.webp"
        title="sales kit"
        clastyle="grayscale-0"
      />
      <Grid />
    </div>
  );
}

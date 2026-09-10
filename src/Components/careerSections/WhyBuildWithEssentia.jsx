import React from 'react';
import { motion } from 'framer-motion';
import { Sun, MousePointerClick, TrendingUp, Globe } from 'lucide-react';

const WhyBuildWithEssentia = () => {
    const features = [
        {
            icon: <Sun size={24} className="text-zinc-400" />,
            title: "great culture",
            desc: "Collaborative and friendly environment."
        },
        {
            icon: <MousePointerClick size={24} className="text-zinc-400" />,
            title: "flexible hours",
            desc: "Focus on output, not hours."
        },
        {
            icon: <TrendingUp size={24} className="text-zinc-400" />,
            title: "high growth",
            desc: "Work on enterprise-level projects."
        },
        {
            icon: <Globe size={24} className="text-zinc-400" />,
            title: "learning",
            desc: "Direct access to seniors & premium courses."
        }
    ];

    return (
        <section className="bg-black py-8 md:py-10 px-6 font-lato">
            <div className="max-w-[1400px] mx-auto text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-white text-3xl md:text-5xl font-light mb-6 tracking-tight lowercase"
                >
                    Why Build With <span className="font-normal italic">essentia?</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-400 max-w-xl mx-auto text-sm md:text-lg font-light leading-relaxed lowercase"
                >
                    We are not just a firm. We are a tech lab. Join us to build high-performance
                    products, not just interiors.
                </motion.p>
            </div>

            {/* Features Grid */}
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lowercase">
                {features.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="p-5 border border-zinc-800 rounded-sm bg-[#050505] flex flex-col gap-4 hover:border-zinc-600 transition-colors"
                    >
                        {/* Icon Box */}
                        <div className='flex justify-start items-center gap-4'>
                            <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center rounded-sm">
                                {item.icon}
                            </div>
                            <h3 className="text-white text-xl font-light lowercase tracking-widest mb-3">
                                {item.title}
                            </h3>

                        </div>


                        {/* Content */}
                        <div>

                            <p className=" w-[80%] text-zinc-400 text-base md:text-lg font-light leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyBuildWithEssentia;
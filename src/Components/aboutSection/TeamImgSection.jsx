import React from 'react'
import { motion } from 'framer-motion'

export default function TeamImgSection() {
    return (
        <section className="relative w-full overflow-hidden py-8 lg:py-16">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 pointer-events-none" />

            <motion.img
                src="/AboutImgs/essentia-team.webp"
                alt="team image"
                className="w-full h-[250px] sm:h-[320px] md:h-[550px] object-cover shadow-2xl shadow-black/20"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
            />
        </section>
    )
}

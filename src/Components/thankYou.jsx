import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Ya useRouter agr Next.js hai
import Button from './Button';

const ThankYou = () => {
    const navigate = useNavigate();

    // Dynamically add 'noindex' meta tag for this page
    useEffect(() => {
        const meta = document.createElement('meta');
        meta.name = "robots";
        meta.content = "noindex, nofollow";
        document.head.appendChild(meta);

        return () => {
            document.head.removeChild(meta);
        };
    }, []);

    return (
        <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 md:mx-36 md:mt-36 md:mb-20 rounded-2xl lowercase font-lato relative overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-5xl w-full py-20 px-8 md:px-16 flex flex-col items-center text-center"
            >
                {/* Decorative Borders styling based on image */}
                <div className="absolute top-0 right-0 w-full max-w-[60%] h-[60%] border-t border-r border-white/20 rounded-tr-[40px] pointer-events-none" 
                     style={{ maskImage: 'linear-gradient(to bottom left, black 20%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to bottom left, black 20%, transparent 80%)' }} />
                
                <div className="absolute bottom-0 left-0 w-full max-w-[60%] h-[60%] border-b border-l border-white/20 rounded-bl-[40px] pointer-events-none" 
                     style={{ maskImage: 'linear-gradient(to top right, black 20%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to top right, black 20%, transparent 80%)' }} />

                {/* Typography & Content */}
                <h1 className="text-white text-5xl md:text-8xl font-light italic mb-4 tracking-wider">
                    thank you
                </h1>
                
                <p className="text-zinc-300 text-lg md:text-xl font-light mb-12">
                    Thank you for reaching out to Essentia.
                </p>

                <div className="space-y-6 max-w-3xl mx-auto text-zinc-400 font-light text-base md:text-[17px] leading-relaxed tracking-wide">
                    <p>
                        "Your enquiry has been received, and our team will review your requirements with care and attention. A member of our team will be in touch with you shortly to take the conversation forward.
                    </p>

                    <p>
                        At Essentia, every project begins with understanding — we look forward to learning more about your vision and shaping it into a thoughtfully realised space.
                    </p>

                    <p>
                        In the meantime, you may continue exploring our work and design philosophy across our website"
                    </p>
                </div>

                {/* Call to Action Button */}
                <Button text="Continue Exploring" to={"/services"} className="mt-12 flex items-center gap-2 group-hover:gap-3 transition-all duration-300" />

            </motion.div>
        </section>
    );
};

export default ThankYou;
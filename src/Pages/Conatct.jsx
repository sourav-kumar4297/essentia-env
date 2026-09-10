import React, { useState, useEffect, useCallback } from 'react';
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeroSection from '../Components/PageHeroSection';
import {
    Linkedin,
    Youtube,
    Instagram,
    Facebook,
} from "lucide-react";

const PinterestIcon = ({ size = 24, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.433 2.986 7.433 6.942 0 4.156-2.618 7.502-6.258 7.502-1.221 0-2.369-.634-2.763-1.383l-.752 2.865c-.272 1.043-.999 2.348-1.49 3.141 1.11.328 2.29.504 3.513.504 6.627 0 11.989-5.365 11.989-11.988C24.017 5.367 18.644 0 12.017 0z" />
    </svg>
);

const ContactForm = () => {
    const navigate   = useNavigate();
    const location   = useLocation();

    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', subject: '', message: ''
    });
    const [status, setStatus]               = useState('');
    const [isSubmitting, setIsSubmitting]   = useState(false);
    const [aiPrefilled, setAiPrefilled]     = useState(false);
    const [autoSubmitCountdown, setAutoSubmitCountdown] = useState(null);
    const [errors, setErrors]               = useState({});

    // Indian mobile: 10 digits starting 6-9, optionally prefixed with 0/91/+91
    const isValidPhone = (value) => /^(?:\+?91[\-\s]?|0)?[6-9]\d{9}$/.test(value.trim());
    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value.trim());

    const validate = (data) => {
        const errs = {};
        if (!data.name.trim()) errs.name = 'full name is required';
        if (!data.phone.trim()) errs.phone = 'phone number is required';
        else if (!isValidPhone(data.phone)) errs.phone = 'enter a valid 10-digit phone number';
        if (!data.email.trim()) errs.email = 'email is required';
        else if (!isValidEmail(data.email)) errs.email = 'enter a valid email address';
        if (!data.message.trim()) errs.message = 'message is required';
        return errs;
    };

    const submitFormData = useCallback(async (data) => {
        setIsSubmitting(true);
        setStatus('sending...');
        try {
            const response = await fetch('https://essentia-backend-mail.vercel.app/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                navigate('/thank-you');
            } else {
                setStatus('failed to send message.');
                setTimeout(() => setStatus(''), 5000);
            }
        } catch (error) {
            console.error("Error submitting form: ", error);
            setStatus('server error. please try again.');
            setTimeout(() => setStatus(''), 5000);
        } finally {
            setIsSubmitting(false);
        }
    }, [navigate]);

    // Detect AI pre-fill from chatbot navigation state
    useEffect(() => {
        if (location.state?.formData) {
            const aiData = location.state.formData;
            const filled = {
                name:    aiData.name    || '',
                phone:   aiData.phone   || '',
                email:   aiData.email   || '',
                subject: aiData.subject || 'consultation inquiry',
                message: aiData.message || '',
            };
            setFormData(filled);
            setAiPrefilled(true);

            if (location.state.aiSubmit && filled.name && filled.email && filled.message) {
                setAutoSubmitCountdown(3);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Countdown then auto-submit — re-validate first so an AI-prefilled bad
    // phone/email can't slip through without ever hitting handleSubmit's checks
    useEffect(() => {
        if (autoSubmitCountdown === null) return;
        if (autoSubmitCountdown === 0) {
            setAutoSubmitCountdown(null);
            const errs = validate(formData);
            if (Object.keys(errs).length > 0) {
                setErrors(errs);
                return;
            }
            submitFormData(formData);
            return;
        }
        const t = setTimeout(() => setAutoSubmitCountdown(c => c - 1), 1000);
        return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoSubmitCountdown, formData, submitFormData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAutoSubmitCountdown(null);
        const errs = validate(formData);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        await submitFormData(formData);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const fieldVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <section className="bg-black py-12 md:py-24 px-6 md:px-16 font-lato overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full min-h-[500px] aspect-[4/5] bg-zinc-900 overflow-hidden order-2 lg:order-1 relative"
                >
                    <img
                        src="/contact-side.webp"
                        alt="contact Studio"
                        className="w-full h-full object-cover hover:scale-103 transition-transform duration-[1500ms]"
                    />
                </motion.div>

                <div className="order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-10 sm:mb-12"
                    >
                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light lowercase tracking-tighter mb-4 sm:mb-6 leading-tight">
                            we are ready to <br className="hidden lg:block" /> build together
                        </h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-zinc-500 text-base sm:text-lg md:text-xl font-light max-w-xl leading-relaxed lowercase"
                        >
                            From initial concept to final delivery, our expert team is one message away from making it happen.
                        </motion.p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 text-left"
                    >
                        {aiPrefilled && (
                            <motion.div
                                variants={fieldVariants}
                                className="sm:col-span-2 flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-none px-4 py-3"
                            >
                                <svg className="w-4 h-4 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.7-1.406 2.34l-1.586-.396a.75.75 0 01-.52-.64V17.5m-9.6-2.2l-1.402 1.402c-1 1-.03 2.7 1.406 2.34l1.586-.396a.75.75 0 00.52-.64V15.3" />
                                </svg>
                                <div className="flex-1 min-w-0">
                                    <p className="text-zinc-300 text-xs lowercase tracking-wide">
                                        this form was pre-filled by essentia ai assistant
                                    </p>
                                    {autoSubmitCountdown !== null && autoSubmitCountdown > 0 && (
                                        <p className="text-zinc-500 text-[11px] lowercase mt-0.5">
                                            auto-submitting in {autoSubmitCountdown}s — or edit fields below
                                        </p>
                                    )}
                                </div>
                                {autoSubmitCountdown !== null && autoSubmitCountdown > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setAutoSubmitCountdown(null)}
                                        className="text-[11px] text-zinc-500 border border-zinc-700 px-3 py-1 hover:border-white/40 hover:text-white transition-colors lowercase tracking-wide shrink-0"
                                    >
                                        cancel auto
                                    </button>
                                )}
                            </motion.div>
                        )}

                        <motion.div variants={fieldVariants} className="flex flex-col gap-2">
                            <label className="text-zinc-400 text-[10px] sm:text-[13px] lowercase tracking-widest ml-1">full name <span className="text-white/40 ml-1">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="enter full name"
                                className="bg-zinc-900/50 border border-zinc-800 text-white p-3 sm:p-4 text-sm focus:border-white outline-none transition-all placeholder:text-zinc-700 rounded-none"
                            />
                        </motion.div>
                        <motion.div variants={fieldVariants} className="flex flex-col gap-2">
                            <label className="text-zinc-400 text-[10px] sm:text-[13px] lowercase tracking-widest ml-1">phone <span className="text-white/40 ml-1">*</span></label>
                            <input
                                type="tel"
                                name="phone"
                                inputMode="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="enter phone number"
                                aria-invalid={!!errors.phone}
                                className={`bg-zinc-900/50 border text-white p-3 sm:p-4 text-sm outline-none transition-all placeholder:text-zinc-700 rounded-none ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-white'}`}
                            />
                            {errors.phone && <span className="text-red-500 text-[11px] lowercase ml-1">{errors.phone}</span>}
                        </motion.div>
                        <motion.div variants={fieldVariants} className="flex flex-col gap-2 sm:col-span-2">
                            <label className="text-zinc-400 text-[10px] sm:text-[13px] lowercase tracking-widest ml-1">email address <span className="text-white/40 ml-1">*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="enter email address"
                                aria-invalid={!!errors.email}
                                className={`bg-zinc-900/50 border text-white p-3 sm:p-4 text-sm outline-none transition-all placeholder:text-zinc-700 rounded-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-white'}`}
                            />
                            {errors.email && <span className="text-red-500 text-[11px] lowercase ml-1">{errors.email}</span>}
                        </motion.div>
                        <motion.div variants={fieldVariants} className="flex flex-col gap-2 sm:col-span-2">
                            <label className="text-zinc-400 text-[10px] sm:text-[13px] lowercase tracking-widest ml-1">subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="write subject"
                                className="bg-zinc-900/50 border border-zinc-800 text-white p-3 sm:p-4 text-sm focus:border-white outline-none transition-all placeholder:text-zinc-700 rounded-none"
                            />
                        </motion.div>
                        <motion.div variants={fieldVariants} className="flex flex-col gap-2 sm:col-span-2">
                            <label className="text-zinc-400 text-[10px] sm:text-[13px] lowercase tracking-widest ml-1">message <span className="text-white/40 ml-1">*</span></label>
                            <textarea
                                rows="4"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="tell us about your project..."
                                className="bg-zinc-900/50 border border-zinc-800 text-white p-3 sm:p-4 text-sm focus:border-white outline-none transition-all placeholder:text-zinc-700 resize-none rounded-none"
                            />
                        </motion.div>

                        <motion.div variants={fieldVariants} className="sm:col-span-2 mt-2 sm:mt-4">
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                className={`w-full py-4 sm:py-5 px-6 text-[12px] sm:text-[14px] lowercase tracking-[0.2em] font-bold transition-all duration-300 rounded-none ${status.includes('success')
                                    ? 'bg-green-600 text-white border border-green-500'
                                    : 'bg-white hover:backdrop-blur-sm text-black hover:bg-zinc-200'
                                    }`}
                            >
                                {status ? status : 'send a message'}
                            </motion.button>
                        </motion.div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

const ContactInfo = () => {
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    };

    const locationsData = [
        {
            id: 1,
            title: " 432/6 b mehrauli gurgaon rd, sultanpur, new delhi 110030",
            phone: "+91-9810088877",
            email: "info@essentia.in",
            hours: "10am - 7pm",
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.443982265592!2d77.15263297529552!3d28.49628697573935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1fad42fbcfe1%3A0xe991f73569730262!2sessentia%20home!5e0!3m2!1sen!2sin!4v1774005554926!5m2!1sen!2sin"
        },
        {
            id: 2,
            title: "Building No. 06, Maharaja Ranjeet Singh Marg, Sector 34, Gurugram, Haryana 122004",
            phone: "+91-9810088877",
            email: "info@essentia.in",
            hours: "10am - 7pm",
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.501303555221!2d77.00935807528148!3d28.43430097577356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19376d00001b%3A0x481f7bccb176ef9d!2sessentia!5e0!3m2!1sen!2sin!4v1774003785708!5m2!1sen!2sin"
        },
        {
            id: 3,
            title: "matulya centre, lower parel, mumbai, maharashtra 400013",
            phone: "+91-9810088877",
            email: "info@essentia.in",
            hours: "10am - 7pm",
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.485523375744!2d72.82486547498793!3d18.998315482190467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf84044ab49d%3A0x1187b43c8d8a1bb4!2sessentia%20home%20-%20mumbai!5e0!3m2!1sen!2sin!4v1774005651705!5m2!1sen!2sin"
        }
    ];

    return (
        <section className="bg-black py-12 md:py-10 px-6 md:px-16 border-t border-zinc-900 font-lato">
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="max-w-[1400px] mx-auto"
            >
                <motion.div variants={itemVariants} className="text-start mb-16 md:mb-10">
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-light lowercase tracking-tighter">
                        visit us <br /> our location
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-20">
                    {locationsData.map((loc) => (
                        <motion.div key={loc.id} variants={itemVariants} className="flex flex-col gap-6">
                            <div className="w-full h-[250px] bg-zinc-900 border border-zinc-800 overflow-hidden group">
                                <iframe
                                    src={loc.mapSrc}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={loc.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                ></iframe>
                            </div>

                            <div className="flex flex-col gap-4 pl-2">
                                <h4 className="text-white text-xl md:text-2xl font-light border-l-2 border-white/20 pl-3 lowercase">
                                    {loc.title}
                                </h4>

                                <div className="space-y-1 mt-2">
                                    <p className="text-zinc-500 text-[12px] tracking-[0.2em] lowercase">phone</p>
                                    <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="text-white text-lg font-light hover:text-zinc-400 transition-colors lowercase inline-block">
                                        {loc.phone}
                                    </a>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-zinc-500 text-[12px] tracking-[0.2em] lowercase">email</p>
                                    <a href={`mailto:${loc.email}`} className="text-white text-lg font-light hover:text-zinc-400 transition-colors lowercase inline-block">
                                        {loc.email}
                                    </a>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-zinc-500 text-[12px] tracking-[0.2em] lowercase">hours</p>
                                    <p className="text-white text-lg font-light lowercase">mon-fri <span className="text-zinc-600 mx-2">|</span> {loc.hours}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

const Contact = () => {
    return (
        <main className="bg-black">
            <PageHeroSection
                image="/contact.webp"
                title="contact us"
            />
            <ContactForm />
            <ContactInfo />
        </main>
    );
};

export default Contact;
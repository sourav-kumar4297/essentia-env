// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Paperclip, CheckCircle } from 'lucide-react';

// const CareerForm = () => {
//     const categories = [
//         "architectural designers",
//         "interior designers",
//         "3d designers",
//         "business development executives",
//     ];

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         category: '',
//         portfolio: '',
//         message: ''
//     });

//     const [fileName, setFileName] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleTextareaInput = (e) => {
//         handleChange(e);
//         e.target.style.height = 'auto';
//         e.target.style.height = `${e.target.scrollHeight}px`;
//     };

//     const handleCategorySelect = (category) => {
//         setFormData({ ...formData, category });
//     };

//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setFileName(e.target.files[0].name);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!formData.category) {
//             alert("please select a role you are applying for.");
//             return;
//         }

//         setIsSubmitting(true);

//         setTimeout(() => {
//             setIsSubmitting(false);
//             setIsSubmitted(true);
//         }, 2000);
//     };

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: { staggerChildren: 0.1 }
//         }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 15 },
//         show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
//     };

//     return (
//         <section className="bg-black py-10 md:py-16 font-lato overflow-hidden">
//             <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

//                 <div className="flex flex-col items-center w-full">

//                     {/* Top Header & Text */}
//                     <div className="w-full mb-12 md:mb-20">
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.8 }}
//                             className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 md:gap-12"
//                         >
//                             <div className="w-full md:w-1/2">
//                                 <h2 className="text-white text-4xl md:text-6xl font-light lowercase tracking-tighter leading-[1.1] mb-0">
//                                     shape the <br className="hidden md:block" /> future of design.
//                                 </h2>
//                             </div>

//                             <div className="w-full md:w-1/2 flex md:justify-end">
//                                 <p className="text-zinc-400 text-sm md:text-base md:text-end font-light lowercase leading-relaxed max-w-md pb-2 md:pb-0">
//                                     we are always looking for visionary architects, designers, and creators. select your expertise, attach your portfolio, and let's build something exceptional together.
//                                 </p>
//                             </div>
//                         </motion.div>
//                     </div>

//                     {/* Bottom Side: The Form */}
//                     <div className="w-full lg:w-[90%]">
//                         <AnimatePresence mode="wait">
//                             {!isSubmitted ? (
//                                 <motion.form
//                                     key="form"
//                                     variants={containerVariants}
//                                     initial="hidden"
//                                     whileInView="show"
//                                     viewport={{ once: true }}
//                                     onSubmit={handleSubmit}
//                                     className="flex flex-col gap-6 md:gap-8"
//                                 >
//                                     {/* Categories */}
//                                     <motion.div variants={itemVariants} className="flex flex-col gap-3 mb-2">
//                                         <label className="text-zinc-300 text-xs tracking-widest lowercase">i am applying for *</label>
//                                         <div className="flex flex-wrap gap-3">
//                                             {categories.map((cat) => (
//                                                 <button
//                                                     key={cat}
//                                                     type="button"
//                                                     onClick={() => handleCategorySelect(cat)}
//                                                     className={`px-3 md:px-5 py-3 rounded-sm text-xs md:text-sm font-light lowercase transition-all duration-300 border ${
//                                                         formData.category === cat
//                                                             ? 'bg-white text-black border-white'
//                                                             : 'bg-[#0a0a0a] text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
//                                                     }`}
//                                                 >
//                                                     {cat}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </motion.div>

//                                     {/* Name & Email Row */}
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//                                         <motion.div variants={itemVariants} className="flex flex-col gap-3">
//                                             <label className="text-zinc-300 text-xs tracking-widest lowercase">full name *</label>
//                                             <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="enter full name"
//                                                 className="w-full bg-[#0a0a0a] border border-zinc-800 p-4 text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors lowercase" />
//                                         </motion.div>
//                                         <motion.div variants={itemVariants} className="flex flex-col gap-3">
//                                             <label className="text-zinc-300 text-xs tracking-widest lowercase">email address *</label>
//                                             <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="enter email address"
//                                                 className="w-full bg-[#0a0a0a] border border-zinc-800 p-4 text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors lowercase" />
//                                         </motion.div>
//                                     </div>

//                                     {/* Phone & Portfolio Row */}
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//                                         <motion.div variants={itemVariants} className="flex flex-col gap-3">
//                                             <label className="text-zinc-300 text-xs tracking-widest lowercase">phone <span className="text-zinc-600">(optional)</span></label>
//                                             <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="enter phone number"
//                                                 className="w-full bg-[#0a0a0a] border border-zinc-800 p-4 text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors lowercase" />
//                                         </motion.div>
//                                         <motion.div variants={itemVariants} className="flex flex-col gap-3">
//                                             <label className="text-zinc-300 text-xs tracking-widest lowercase">portfolio *</label>
//                                             <input type="url" name="portfolio" required value={formData.portfolio} onChange={handleChange} placeholder="portfolio link (linkedin/website)"
//                                                 className="w-full bg-[#0a0a0a] border border-zinc-800 p-4 text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors lowercase" />
//                                         </motion.div>
//                                     </div>

//                                     {/* Message */}
//                                     <motion.div variants={itemVariants} className="flex flex-col gap-3">
//                                         <label className="text-zinc-300 text-xs tracking-widest lowercase">message *</label>
//                                         <textarea name="message" value={formData.message} onChange={handleTextareaInput} placeholder="tell us about your project..." required
//                                             className="w-full bg-[#0a0a0a] border border-zinc-800 p-4 text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors lowercase resize-none min-h-[120px] overflow-hidden" 
//                                         />
//                                     </motion.div>

//                                     {/* File Upload & Submit Button */}
//                                     <motion.div variants={itemVariants} className="flex flex-col gap-8 pt-2">

//                                         {/* Boxed File Upload */}
//                                         <div className="relative w-full">
//                                             <input type="file" id="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" className="hidden" required />
//                                             <label htmlFor="resume" className="cursor-pointer flex flex-col items-center justify-center gap-3 w-full border border-dashed border-zinc-700 bg-[#0a0a0a] p-8 hover:bg-[#111] hover:border-zinc-500 transition-all">
//                                                 <Paperclip size={24} className="text-zinc-500" />
//                                                 <div className="flex flex-col items-center text-center">
//                                                     <span className={`text-sm font-light lowercase transition-colors ${fileName ? 'text-white' : 'text-zinc-400'}`}>
//                                                         {fileName ? fileName : "click to attach resume / cv *"}
//                                                     </span>
//                                                     {fileName && <span className="text-green-500/70 text-[13px] lowercase tracking-widest mt-2">✓ file selected</span>}
//                                                 </div>
//                                             </label>
//                                         </div>

//                                         {/* Full Width White Button matching the image */}
//                                         <button
//                                             type="submit"
//                                             disabled={isSubmitting}
//                                             className="w-full bg-white text-black py-5 text-xs md:text-sm font-medium tracking-[0.3em] lowercase hover:bg-zinc-200 transition-colors disabled:opacity-70"
//                                         >
//                                             {isSubmitting ? 'submitting...' : 'submit application'}
//                                         </button>
//                                     </motion.div>
//                                 </motion.form>
//                             ) : (
//                                 /* Success State */
//                                 <motion.div
//                                     key="success"
//                                     initial={{ opacity: 0, scale: 0.95 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//                                     className="h-full min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center text-center p-8 md:p-10 bg-[#0a0a0a] border border-zinc-800"
//                                 >
//                                     <motion.div
//                                         initial={{ scale: 0 }}
//                                         animate={{ scale: 1 }}
//                                         transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
//                                     >
//                                         <CheckCircle size={56} className="text-white mb-8" strokeWidth={1} />
//                                     </motion.div>

//                                     <h3 className="text-3xl md:text-5xl text-white font-light lowercase tracking-tighter mb-4">
//                                         application received.
//                                     </h3>
//                                     <p className="text-zinc-400 text-sm md:text-base font-light lowercase max-w-md leading-relaxed">
//                                         thank you for applying to the <span className="text-white">"{formData.category}"</span> role. our team will review your profile and reach out to you shortly.
//                                     </p>

//                                     <button
//                                         onClick={() => {
//                                             setIsSubmitted(false);
//                                             setFormData({ name: '', email: '', phone: '', category: '', portfolio: '', message: '' });
//                                             setFileName("");
//                                         }}
//                                         className="mt-12 text-[13px] text-zinc-500 lowercase tracking-[0.2em] border-b border-zinc-800 hover:text-white hover:border-white pb-1 transition-all"
//                                     >
//                                         submit another application
//                                     </button>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </div>

//                 </div>
//             </div>
//         </section>
//     );
// };

// export default CareerForm;





import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, CheckCircle } from 'lucide-react';

const CareerForm = () => {
    const categories = [
        "architectural designers",
        "interior designers",
        "3d designers",
        "business development executives",
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: '',
        portfolio: '',
        message: ''
    });

    const [fileName, setFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); // File store karne ke liye naya state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTextareaInput = (e) => {
        handleChange(e);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleCategorySelect = (category) => {
        setFormData({ ...formData, category });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
            setSelectedFile(e.target.files[0]); // Actual file ko state me save kiya
        }
    };

    // NAYA SUBMIT LOGIC (Backend API integration)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.category) {
            alert("please select a role you are applying for.");
            return;
        }

        if (!selectedFile) {
            alert("please attach your resume/cv.");
            return;
        }

        setIsSubmitting(true);

        // FormData API ka use (Kyunki hum file bhej rahe hain)
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('email', formData.email);
        submitData.append('phone', formData.phone);
        submitData.append('category', formData.category);
        submitData.append('portfolio', formData.portfolio);
        submitData.append('message', formData.message);
        submitData.append('resume', selectedFile); // Ye backend mein upload.single('resume') se match hona chahiye

        try {
            // const response = await fetch('http://localhost:5000/api/career', {
            //     method: 'POST',
            //     // Dhyan de: Yahan Content-Type header set NAHI karna hai. Browser FormData ke sath khud set karta hai.
            //     body: submitData
            // });

            const response = await fetch('https://essentia-backend-mail.vercel.app/api/career', {
                method: 'POST',
                body: submitData
            });

            const result = await response.json();

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                // Agar backend error de (jaise 500 ya 404), toh message dikhayega
                alert("Failed to submit application: " + (result.message || result.error));
            }
        } catch (error) {
            console.error("Error submitting form: ", error);
            alert("Server Error. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <section className="bg-black py-10 md:py-16 font-lato overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

                <div className="flex flex-col items-center w-full">

                    {/* Top Header & Text */}
                    <div className="w-full mb-12 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 md:gap-12"
                        >
                            <div className="w-full md:w-1/2">
                                <h2 className="text-white text-4xl md:text-6xl font-light lowercase tracking-tighter leading-[1.1] mb-0">
                                    shape the <br className="hidden md:block" /> future of design.
                                </h2>
                            </div>

                            <div className="w-full md:w-1/2 flex md:justify-end">
                                <p className="text-zinc-400 text-sm md:text-base md:text-end font-light lowercase leading-relaxed max-w-md pb-2 md:pb-0">
                                    we are always looking for visionary architects, designers, and creators. select your expertise, attach your portfolio, and let's build something exceptional together.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Side: The Form */}
                    <div className="w-full lg:w-[90%]">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form
                                    key="form"
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-6 md:gap-8"
                                >
                                    {/* Categories */}
                                    <motion.div variants={itemVariants} className="flex flex-col gap-3 mb-2">
                                        <label className="text-zinc-300 text-xs tracking-widest lowercase">i am applying for *</label>
                                        <div className="flex flex-wrap gap-3">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => handleCategorySelect(cat)}
                                                    className={`px-3 md:px-5 py-3 rounded-sm text-xs md:text-sm font-light lowercase transition-all duration-300 border ${formData.category === cat
                                                        ? 'bg-white text-black border-white'
                                                        : 'bg-[#0a0a0a] text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Name & Email Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <motion.div variants={itemVariants} className="flex flex-col gap-3">
                                            <label className="text-zinc-300 text-xs tracking-widest lowercase">full name *</label>
                                            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="enter full name"
                                                className="w-full bg-[#0a0a0a] border border-zinc-800 p-4 text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors lowercase" />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="flex flex-col gap-3">
                                            <label className="text-zinc-300 text-xs tracking-widest lowercase">email address *</label>
                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="enter email address"
                                                className="w-full bg-[#0a0a0a] border border-zinc-800 p-4 text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors lowercase" />
                                        </motion.div>
                                    </div>

                                    {/* Phone & Portfolio Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <motion.div variants={itemVariants} className="flex flex-col gap-3">
                                            <label className="text-zinc-300 text-xs tracking-widest lowercase">phone <span className="text-zinc-600">(optional)</span></label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="enter phone number"
                                                className="w-full bg-[#0a0a0a] border border-zinc-800 p-4 text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors lowercase" />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="flex flex-col gap-3">
                                            <label className="text-zinc-300 text-xs tracking-widest lowercase">portfolio *</label>
                                            <input type="url" name="portfolio" required value={formData.portfolio} onChange={handleChange} placeholder="portfolio link (linkedin/website)"
                                                className="w-full bg-[#0a0a0a] border border-zinc-800 p-4 text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors lowercase" />
                                        </motion.div>
                                    </div>

                                    {/* Message */}
                                    <motion.div variants={itemVariants} className="flex flex-col gap-3">
                                        <label className="text-zinc-300 text-xs tracking-widest lowercase">message *</label>
                                        <textarea name="message" value={formData.message} onChange={handleTextareaInput} placeholder="tell us about your project..." required
                                            className="w-full bg-[#0a0a0a] border border-zinc-800 p-4 text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors lowercase resize-none min-h-[120px] overflow-hidden"
                                        />
                                    </motion.div>

                                    {/* File Upload & Submit Button */}
                                    <motion.div variants={itemVariants} className="flex flex-col gap-8 pt-2">

                                        {/* Boxed File Upload */}
                                        <div className="relative w-full">
                                            {/* File Input */}
                                            <input type="file" id="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" className="hidden" />
                                            <label htmlFor="resume" className="cursor-pointer flex flex-col items-center justify-center gap-3 w-full border border-dashed border-zinc-700 bg-[#0a0a0a] p-8 hover:bg-[#111] hover:border-zinc-500 transition-all">
                                                <Paperclip size={24} className="text-zinc-500" />
                                                <div className="flex flex-col items-center text-center">
                                                    <span className={`text-sm font-light lowercase transition-colors ${fileName ? 'text-white' : 'text-zinc-400'}`}>
                                                        {fileName ? fileName : "click to attach resume / cv *"}
                                                    </span>
                                                    {fileName && <span className="text-green-500/70 text-[13px] lowercase tracking-widest mt-2">✓ file selected</span>}
                                                </div>
                                            </label>
                                        </div>

                                        {/* Full Width White Button matching the image */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-white text-black py-5 text-xs md:text-sm font-medium tracking-[0.3em] lowercase hover:bg-zinc-200 transition-colors disabled:opacity-70"
                                        >
                                            {isSubmitting ? 'submitting...' : 'submit application'}
                                        </button>
                                    </motion.div>
                                </motion.form>
                            ) : (
                                /* Success State */
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-full min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center text-center p-8 md:p-10 bg-[#0a0a0a] border border-zinc-800"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    >
                                        <CheckCircle size={56} className="text-white mb-8" strokeWidth={1} />
                                    </motion.div>

                                    <h3 className="text-3xl md:text-5xl text-white font-light lowercase tracking-tighter mb-4">
                                        application received.
                                    </h3>
                                    <p className="text-zinc-400 text-sm md:text-base font-light lowercase max-w-md leading-relaxed">
                                        thank you for applying to the <span className="text-white">"{formData.category}"</span> role. our team will review your profile and reach out to you shortly.
                                    </p>

                                    <button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            // Reset everything when they click to submit another
                                            setFormData({ name: '', email: '', phone: '', category: '', portfolio: '', message: '' });
                                            setFileName("");
                                            setSelectedFile(null);
                                        }}
                                        className="mt-12 text-[13px] text-zinc-500 lowercase tracking-[0.2em] border-b border-zinc-800 hover:text-white hover:border-white pb-1 transition-all"
                                    >
                                        submit another application
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CareerForm;
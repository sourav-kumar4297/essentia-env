import React from "react";
import { Link } from "react-router-dom";
import {
  Linkedin,
  Youtube,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Facebook,
} from "lucide-react"; // Pinterest yahan se hata diya gaya hai
import { motion } from "framer-motion";

// Custom Pinterest SVG Component
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

const Footer = () => {
  const links = [
    { name: "about us", path: "/about" },
    { name: "services", path: "/services" },
    { name: "projects", path: "/projects" },
    { name: "career", path: "/career" },
    { name: "media", path: "/media" },
    { name: "blogs", path: "/blogs" },
    { name: "testimonials", path: "/testimonials" },
    // { name: "contact us", path: "/contact" },
  ];

  return (
    <footer className="relative w-full bg-black text-white pt-20 pb-6 px-6 md:px-12 overflow-hidden font-lato">
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="/footer.png"
          alt="Architecture Background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left Column: Info Section */}
          <div className="flex flex-col space-y-8">
            <div>
              <Link
                to="/"
                className="text-white text-3xl md:text-4xl font-extralight tracking-tighter hover:opacity-90 transition-opacity"
              >
                <img src="/essentia R W.webp" alt="" className="w-40 h-7 mb-5" />
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <Phone size={18} className="mt-1 text-zinc-500" />
                <div>
                  <p className="text-zinc-300 text-lg font-light lowercase">
                    phone
                  </p>
                  <motion.a
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    href="tel:+919810088877"
                    className="text-zinc-500 text-sm hover:text-zinc-400 transition-all duration-300"
                  >
                    +91-9810088877
                  </motion.a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <Mail size={18} className="mt-1 text-zinc-500" />
                <div>
                  <p className="text-zinc-300 text-lg font-light lowercase">
                    mail
                  </p>
                  <motion.a
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    href="mailto:info@essentia.in"
                    className="text-zinc-500 text-sm hover:text-zinc-400 transition-all duration-300"
                  >
                    info@essentia.in
                  </motion.a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <MapPin size={18} className="mt-1 text-zinc-500" />
                <div>
                  <p className="text-zinc-300 text-lg font-light lowercase">
                    address
                  </p>
                  <motion.a
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    href="https://maps.app.goo.gl/AELFC7CmvYxa4p8V7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-zinc-500 text-sm leading-relaxed lowercase hover:text-zinc-400 transition-all duration-300"
                  >
                    essentia, Building No. 06, Maharaja Ranjeet Singh Marg,
                    <br />
                    Sector 34, Gurugram, Haryana 122004
                  </motion.a>
                  <div className="mt-3">
                    <p className="text-zinc-400 text-[10px] tracking-widest lowercase mb-2">find us at</p>
                    <div className="flex flex-wrap items-center gap-x-1 text-[10px]">
                      <a href="https://maps.app.goo.gl/AELFC7CmvYxa4p8V7" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">gurugram</a>
                      <span className="text-zinc-700">&nbsp;·&nbsp;</span>
                      <a href="https://maps.app.goo.gl/KQqoWkYNmVpZ6pkn8" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">delhi</a>
                      <span className="text-zinc-700">&nbsp;·&nbsp;</span>
                      <a href="https://maps.app.goo.gl/jgVvFeE2xa6qDLav5" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">mumbai</a>
                      <span className="text-zinc-700">&nbsp;·&nbsp;</span>
                      <span className="text-zinc-500">hyderabad <span className="text-zinc-600">(coming Soon)</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex gap-6">
                <a
                  href="https://www.instagram.com/essentiaenvironments?igsh=andybGV5ZGRiMjhy"
                  target="_blank"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <Instagram size={22} strokeWidth={1.5} />
                </a>
                <a
                  href="https://www.facebook.com/essentiaenvironment/"
                  target="_blank"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <Facebook size={22} strokeWidth={1.5} />
                </a>
                <a
                  href="https://www.linkedin.com/company/essentia-environments/" // Update ho sakta hai
                  target="_blank"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <Linkedin size={22} strokeWidth={1.5} />
                </a>
                <a
                  href="https://in.pinterest.com/essentiaenvironments/" // Update ho sakta hai
                  target="_blank"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {/* Yahan custom Pinterest icon use ho raha hai */}
                  <PinterestIcon size={22} />
                </a>
                <a
                  href="https://www.youtube.com/@essentiaenvironments"
                  target="_blank"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <Youtube size={26} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Links Section */}
          <div className="flex flex-col justify-between">
  <nav>
    <ul className="space-y-0">
      {links.map((link) => (
        <li 
          key={link.name} 
          // Yahan 'last:border-b-0' add kiya gaya hai
          className="border-b border-zinc-800 last:border-b-0" 
        >
          <Link
            to={link.path}
            className="flex justify-between items-center py-3 text-zinc-300 hover:text-white transition-colors group"
          >
            <span className="text-xl font-light lowercase tracking-wide">
              {link.name}
            </span>
            <ArrowUpRight
              size={20}
              className="text-zinc-600 group-hover:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </li>
      ))}
    </ul>
  </nav>
</div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] lowercase tracking-[0.2em] text-zinc-600 font-medium">
          <div className="flex gap-8">
            <a href="#" className="hover:text-zinc-400 transition-colors">
              privacy policy
            </a>
            <a href="#" className="hover:text-zinc-400 transition-colors">
              terms & conditions
            </a>
          </div>
          <div>legal policies @ 2026 essentia environments</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from 'react';
// import { motion } from 'framer-motion';

// const Footer = () => {
//   const sitemap = ['design', 'projects', 'build', 'furniture', 'media', 'contact us'];
//   const projects = ['building', 'projects', 'build', 'furniture', 'media', 'contact us'];

//   return (
//     <footer className="w-full bg-black text-white pt-20 overflow-hidden font-lato">
//       <div className="w-full">

//         {/* 1. Main Grid (Address, Sitemap, Projects) - Image 7 Match */}
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 px-18">

//           {/* Address Column */}
//           <div className="md:col-span-5">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-2 h-2 bg-white rounded-full"></div>
//               <span className="text-zinc-400 text-lg font-light lowercase">address</span>
//             </div>
//             <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-sm ml-4">
//               Building 6, Hero Honda Chowk, Block B, <br />
//               Sector 34, Gurugram, Haryana 122001
//             </p>
//           </div>

//           {/* Sitemap Column */}
//           <div className="md:col-span-3">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-2 h-2 bg-white rounded-full"></div>
//               <span className="text-zinc-400 text-lg font-light lowercase">sitemap</span>
//             </div>
//             <ul className="space-y-1 ml-4">
//               {sitemap.map((item) => (
//                 <li key={item} className="text-zinc-500 text-lg font-light hover:text-white transition-colors cursor-pointer lowercase">
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Projects Column (Same as sitemap as per image) */}
//           <div className="md:col-span-3">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-2 h-2 bg-white rounded-full"></div>
//               <span className="text-zinc-400 text-lg font-light lowercase">projects</span>
//             </div>
//             <ul className="space-y-1 ml-4">
//               {projects.map((item) => (
//                 <li key={item + 'proj'} className="text-zinc-500 text-lg font-light hover:text-white transition-colors cursor-pointer lowercase">
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* 2. Divider & Policies - Image 7 Bottom Section */}
//         <div className="border-t border-zinc-800 py-6 flex gap-8 px-18">
//           <a href="#" className="text-zinc-500 text-sm font-light hover:text-white transition-colors lowercase">privacy policy</a>
//           <a href="#" className="text-zinc-500 text-sm font-light hover:text-white transition-colors lowercase">terms of use</a>
//         </div>
//       </div>

//       {/* 3. Giant Scrolling Marquee - Image 7 Bottom-most Match */}
//       {/* <div className="relative w-full border-t border-zinc-900 bg-black py-4 select-none pointer-events-none">
//         <motion.div
//           initial={{ x: 0 }}
//           animate={{ x: "-50%" }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="flex whitespace-nowrap"
//         >
//           {[1, 2, 3, 4].map((i) => (
//             <span key={i} className="text-[80px] md:text-[120px] font-extralight text-white leading-none tracking-tighter inline-block px-10 lowercase">
//               essentia essentia essentia
//             </span>
//           ))}
//         </motion.div>
//       </div> */}
//     </footer>
//   );
// };

// export default Footer;

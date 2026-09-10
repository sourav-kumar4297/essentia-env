import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react'; // ChevronRight add kiya nested arrow ke liye

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [openNestedMobileDropdown, setOpenNestedMobileDropdown] = useState(null); // Naya state nested mobile menu ke liye

  // Desktop dropdown ke liye tap/click support (iPad/touch devices ke liye, jaha hover kaam nahi karta)
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);
  const [openDesktopNested, setOpenDesktopNested] = useState(null);
  const desktopNavRef = useRef(null);

  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // Desktop dropdown ko band karein jab bahar tap/click ho
  useEffect(() => {
    const handleOutsideInteraction = (e) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target)) {
        setOpenDesktopDropdown(null);
        setOpenDesktopNested(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideInteraction);
    document.addEventListener('touchstart', handleOutsideInteraction);
    return () => {
      document.removeEventListener('mousedown', handleOutsideInteraction);
      document.removeEventListener('touchstart', handleOutsideInteraction);
    };
  }, []);

  // Route badalne par dropdown band kar dein
  useEffect(() => {
    setOpenDesktopDropdown(null);
    setOpenDesktopNested(null);
  }, [location.pathname]);

  // Scroll lock jab menu open ho
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 80);
      if (currentScrollY < 80) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data structure updated: Furniture is back inside Services
  const menuItems = [
    { name: 'home', path: '/' },
  {
  name: 'about us',
  path: '/about',
  subItems: [
    { name: 'about us', path: '/about' },
    { name: 'company profile', path: '/company-profile' },
  ]
},
    {
      name: 'services',
      path: '/services',
      subItems: [
        { name: 'design', path: '/services#design' },
        { name: 'build', path: '/services#build' },
        {
          name: 'furniture',
          path: '/services#furniture',
          // Dropdown ke andar dropdown (Nested SubItems)
          subItems: [
            { name: 'catalogues', path: 'https://www.essentiahome.com/pages/catalogues' },
            { name: 'products', path: 'https://www.essentiahome.com/collections/furniture' }
          ]
        },
      ]
    },
    { name: 'projects', path: '/projects' },
    { name: 'career', path: '/career' },
    {
      name: 'media',
      path: '/media',
      subItems: [
        { name: 'press release', path: '/media' },
        { name: 'testimonials', path: '/testimonials' },
        { name: 'essentia edits', path: '/essentia edits' },
        { name: 'blogs', path: '/blogs' },
        { name: 'sales kit', path: '/sales-kit' },
      ]
    },
    { name: 'contact us', path: '/contact' },
  ];

  // Header Load Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Mobile Menu Variants
  const menuVariants = {
    initial: { x: "100%" },
    animate: {
      x: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      x: "100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const navLinkVariants = {
    initial: { y: 80, opacity: 0 },
    animate: i => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.3 + (i * 0.1), duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }),
    exit: i => ({
      y: 80,
      opacity: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeIn" }
    })
  };

  return (
    <>
      <motion.div
        animate={{ y: visible ? 0 : '-100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full fixed top-0 z-[60]"
      >
      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        // Top gradient for text visibility
        className="w-full h-25 flex items-center relative"
      >
        {/* Blur overlay as a sibling — not ancestor — of dropdowns, so their backdrop-blur works independently */}
        <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${isScrolled ? 'bg-white/5 backdrop-blur-lg' : 'bg-gradient-to-b from-black/40 via-black/30 to-transparent'}`} />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 flex justify-between items-center">

          {/* Logo Section */}
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <Link to="/" className="text-white text-3xl md:text-4xl font-extralight tracking-tighter hover:opacity-90 transition-opacity">
              <img src="/essentia R W.webp" alt="Essentia Logo" className='w-45 md:w-50' />
            </Link>
          </motion.div>

          {/* Navigation Menu (Desktop) */}
          <nav className="hidden lg:block" ref={desktopNavRef}>
            <ul className="flex items-center space-x-6 lg:space-x-8">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isDropdownOpen = openDesktopDropdown === item.name;
                return (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    className="relative group flex items-center h-10"
                  >
                    <Link
                      to={item.path}
                      onClick={() => { setOpenDesktopDropdown(null); setOpenDesktopNested(null); }}
                      className="relative flex items-center gap-1 pb-1.5 cursor-pointer"
                    >

                      <div className="relative block h-6 overflow-hidden font-lato mt-1">
                        <div className="relative flex flex-col h-full transition-transform duration-400 group-hover:-translate-y-full">
                          <span className={`flex items-center h-6 text-[15px] xl:text-[17px] lowercase tracking-[0.2em] font-light ${isActive ? 'text-white' : 'text-white/70'}`}>
                            {item.name}
                          </span>
                          <span className="flex items-center h-6 text-white text-[15px] xl:text-[17px] tracking-[0.2em] font-medium">
                            {item.name}
                          </span>
                        </div>
                      </div>

                      {/* Hover Line */}
                      <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-white transform transition-transform duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                    </Link>

                    {/* Level 1 Chevron Toggle - separate button taaki tap (touch/iPad) se bhi dropdown khule */}
                    {item.subItems && (
                      <button
                        type="button"
                        aria-label={`Toggle ${item.name} menu`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDesktopDropdown(isDropdownOpen ? null : item.name);
                          setOpenDesktopNested(null);
                        }}
                        className="p-1 -m-1 ml-0.5"
                      >
                        <ChevronDown
                          size={14}
                          className={`text-zinc-400 group-hover:text-white transition-transform duration-300 mt-1 ${isDropdownOpen ? 'rotate-180 text-white' : 'group-hover:rotate-180'}`}
                        />
                      </button>
                    )}

                    {/* Desktop Dropdown Level 1 */}
                    {item.subItems && (
                      <div
                        className={`absolute top-[100%] left-0 pt-2 transition-all duration-500 ease-out z-50 ${
                          isDropdownOpen
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                        }`}
                      >
                        <div className="bg-[#00000095] backdrop-blur-md border border-zinc-700/50 rounded-sm p-6 flex flex-col gap-5 min-w-[220px] shadow-2xl">
                          {item.subItems.map((sub) => {
                            const isNestedOpen = openDesktopNested === sub.name;
                            return (
                            <div key={sub.name} className="relative group/nested w-full">

                              {/* Check if it has a nested menu (e.g. Furniture) */}
                              {sub.subItems ? (
                                <>
                                  <div className="flex items-center justify-between gap-3 w-full">
                                    <Link
                                      to={sub.path}
                                      onClick={() => { setOpenDesktopDropdown(null); setOpenDesktopNested(null); }}
                                      className="flex-1 text-zinc-300 hover:text-white text-sm lowercase tracking-[0.2em] transition-colors relative inline-flex font-lato"
                                    >
                                      <span>{sub.name}</span>
                                      <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-white/50 scale-x-0 group-hover/nested:scale-x-100 transition-transform origin-left duration-300" />
                                    </Link>
                                    <button
                                      type="button"
                                      aria-label={`Toggle ${sub.name} submenu`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenDesktopNested(isNestedOpen ? null : sub.name);
                                      }}
                                      className="p-1 -m-1"
                                    >
                                      <ChevronRight
                                        size={14}
                                        className={`text-zinc-500 group-hover/nested:text-white transition-colors ${isNestedOpen ? 'text-white rotate-90' : ''}`}
                                      />
                                    </button>
                                  </div>

                                  {/* Desktop Dropdown Level 2 (Nested) */}
                                  <div
                                    className={`absolute top-[-16px] left-[100%] pl-2 transition-all duration-500 ease-out z-50 ${
                                      isNestedOpen
                                        ? 'opacity-100 visible translate-x-0'
                                        : 'opacity-0 invisible -translate-x-4 group-hover/nested:opacity-100 group-hover/nested:visible group-hover/nested:translate-x-0'
                                    }`}
                                  >
                                    <div className="bg-[#00000095] backdrop-blur-md border border-zinc-700/50 rounded-sm p-[22px] flex flex-col gap-5 min-w-[200px] shadow-2xl ml-4">
                                      {sub.subItems.map((nested) => (
                                        <Link
                                          key={nested.name}
                                          to={nested.path}
                                          onClick={() => { setOpenDesktopDropdown(null); setOpenDesktopNested(null); }}
                                          className="text-zinc-400 hover:text-white text-sm lowercase tracking-[0.2em] transition-colors relative inline-block w-fit group/subnested font-lato"
                                        >
                                          {nested.name}
                                          <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-white/50 scale-x-0 group-hover/subnested:scale-x-100 transition-transform origin-left duration-300" />
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                /* Normal Dropdown Link */
                                <Link
                                  to={sub.path}
                                  onClick={() => { setOpenDesktopDropdown(null); setOpenDesktopNested(null); }}
                                  className="text-zinc-300 hover:text-white text-sm lowercase tracking-[0.2em] transition-colors relative inline-block w-fit group/sub font-lato"
                                >
                                  {sub.name}
                                  <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-white/50 scale-x-0 group-hover/sub:scale-x-100 transition-transform origin-left duration-300" />
                                </Link>
                              )}

                            </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Hamburger Icon (Mobile) */}
          <motion.div
            variants={itemVariants}
            className="lg:hidden z-[70] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-4 flex flex-col justify-between relative">
              <span className={`w-full h-[1px] bg-white transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-[1px] bg-white transition-all duration-500 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-[1px] bg-white transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </motion.div>
        </div>
      </motion.header>
      </motion.div>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black z-[55] flex flex-col justify-center px-6 md:px-10 overflow-y-auto overflow-x-hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full border-l border-zinc-800 ml-[20%]" />
            </div>

            <nav className="relative z-10 flex flex-col space-y-6 my-auto pt-24 pb-12">
              {menuItems.map((item, i) => (
                <div key={item.name} className="relative">
                  <motion.div
                    custom={i}
                    variants={navLinkVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col"
                  >
                    <div className="flex justify-start items-center gap-2 w-fit relative z-[60]">
                      {location.pathname === item.path && <span className="text-[#ffffff] text-5xl pb-4">.</span>}

                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl md:text-6xl font-light text-white lowercase tracking-tighter hover:italic transition-all"
                      >
                        {item.name}
                      </Link>

                      {/* Expand Arrow for Level 1 */}
                      {item.subItems && (
                        <button
                          className="p-2 ml-1 focus:outline-none"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenMobileDropdown(openMobileDropdown === item.name ? null : item.name);
                            setOpenNestedMobileDropdown(null); // Reset nested menu when closing main
                          }}
                        >
                          <ChevronDown
                            size={32}
                            strokeWidth={1}
                            className={`text-zinc-500 transition-transform duration-500 ${openMobileDropdown === item.name ? '-rotate-90 text-white' : ''}`}
                          />
                        </button>
                      )}

                      {/* Mobile Level 1 Flyout Panel */}
                      <AnimatePresence>
                        {openMobileDropdown === item.name && item.subItems && (
                          <motion.div
                            initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -10, filter: 'blur(5px)' }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute top-1/2 -translate-y-1/2 left-full ml-0 sm:ml-8 min-w-[180px] bg-[#0c0c0c]/90 backdrop-blur-xl border border-zinc-800 rounded-xl p-5 shadow-2xl flex flex-col gap-4 z-[100]"
                          >
                            {item.subItems.map((sub) => (
                              <div key={sub.name} className="flex flex-col">

                                {sub.subItems ? (
                                  <>
                                    {/* Item with Nested Dropdown (Furniture) */}
                                    <div className="flex justify-between items-center">
                                      <Link
                                        to={sub.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-xl text-zinc-400 hover:text-white font-light lowercase transition-colors whitespace-nowrap"
                                      >
                                        {sub.name}
                                      </Link>
                                      <button
                                        className="p-1 focus:outline-none"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenNestedMobileDropdown(openNestedMobileDropdown === sub.name ? null : sub.name);
                                        }}
                                      >
                                        <ChevronDown
                                          size={22}
                                          strokeWidth={1.5}
                                          className={`text-zinc-500 transition-transform duration-300 ${openNestedMobileDropdown === sub.name ? 'rotate-180 text-white' : ''}`}
                                        />
                                      </button>
                                    </div>

                                    {/* Mobile Level 2 Accordion (Catalogues/Designers) */}
                                    <AnimatePresence>
                                      {openNestedMobileDropdown === sub.name && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="flex flex-col gap-3 mt-3 ml-2 border-l border-zinc-800 pl-4 overflow-hidden"
                                        >
                                          {sub.subItems.map((nested) => (
                                            <Link
                                              key={nested.name}
                                              to={nested.path}
                                              onClick={() => setIsOpen(false)}
                                              className="text-base text-zinc-500 hover:text-white font-light lowercase transition-colors whitespace-nowrap"
                                            >
                                              {nested.name}
                                            </Link>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </>
                                ) : (
                                  /* Normal Flyout Link */
                                  <Link
                                    to={sub.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl text-zinc-400 hover:text-white font-light lowercase transition-colors whitespace-nowrap"
                                  >
                                    {sub.name}
                                  </Link>
                                )}

                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                </div>
              ))}
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default Header;


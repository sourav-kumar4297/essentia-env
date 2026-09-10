import React, { useState, useEffect, useRef } from "react";
// IMPORT ME 'useInView' ADD KIYA HAI
import { motion, useAnimation, useMotionValue, AnimatePresence, useInView } from "framer-motion";
import PageHeroSection from '../Components/PageHeroSection';
import { Link, useNavigate } from "react-router-dom";


// ==========================================
// ANIMATION VARIANTS
// ==========================================
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// ==========================================
// 2. VIDEO TESTIMONIALS GRID
// ==========================================
const gridVideosData = [
  { id: 1, src: "/Testimonial/vid/vid1.mp4", },
  { id: 2, src: "/Testimonial/vid/vid2.mp4", },
  { id: 3, src: "/Testimonial/vid/vid3.mp4", },
  { id: 4, src: "/Testimonial/vid/vid4.mp4", },
  { id: 5, src: "/Testimonial/vid/vid5.mp4", },
  { id: 6, src: "/Testimonial/vid/vid6.mp4", },
  { id: 7, src: "/Testimonial/vid/vid7.mp4", },
  { id: 8, src: "/Testimonial/vid/vid8.mp4", },
  { id: 9, src: "/Testimonial/vid/vid9.mp4", },
  { id: 10, src: "/Testimonial/vid/vid10.mp4", },
  { id: 11, src: "/Testimonial/vid/vid11.mp4", },
  { id: 12, src: "/Testimonial/vid/vid12.mp4", },
  { id: 13, src: "/Testimonial/vid/vid13.mp4", },
];

const GridVideoItem = ({ video, onClick }) => {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { margin: "50px 0px 50px 0px", amount: 0.1 });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <motion.div
      className="relative h-[400px] w-[300px] md:w-[350px] lg:w-[400px] bg-[#0c0c0c] overflow-hidden cursor-pointer group border border-zinc-800 shrink-0"
      onClick={() => onClick(video)}
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-11 h-11 rounded-full bg-black/50 border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
        <p className="text-zinc-300 text-xs lowercase tracking-widest">click to watch</p>
      </div>
    </motion.div>
  );
};

export const VideoGridSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    const updateSize = () => {
      if (carouselRef.current && trackRef.current) {
        setWidth(trackRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    updateSize();
    setTimeout(updateSize, 500);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (isInteracting || width === 0) return;
    const interval = setInterval(() => {
      const currentX = x.get();
      let step = 320;
      if (trackRef.current && trackRef.current.children.length > 0) {
        const cardWidth = trackRef.current.children[0].offsetWidth;
        const gap = window.innerWidth < 768 ? 16 : 24;
        step = cardWidth + gap;
      }
      let nextX = currentX - step;
      if (nextX < -width) nextX = 0;
      controls.start({ x: nextX, transition: { duration: 0.8, ease: "easeInOut" } });
    }, 3000);
    return () => clearInterval(interval);
  }, [isInteracting, width, controls, x]);

  useEffect(() => {
    if (selectedVideo) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedVideo]);

  return (
    <section className="bg-black text-white pt-10 md:py-16 px-4 md:px-8 font-lato overflow-hidden lowercase">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-[1400px] mx-auto mb-16"
      >
        <motion.span variants={fadeUpVariant} className="text-7xl font-serif text-zinc-500 block -mb-8 leading-none">"</motion.span>
        <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-5xl font-light tracking-tight lowercase">testimonials</motion.h2>
        <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl font-light text-zinc-400 mt-4 max-w-2xl leading-snug">
          watch what our clients have to say
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1400px] mx-auto relative cursor-grab active:cursor-grabbing"
      >
        <div ref={carouselRef} className="overflow-hidden">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            style={{ x }}
            animate={controls}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
            onDragStart={() => setIsInteracting(true)}
            onDragEnd={() => setIsInteracting(false)}
            className="flex gap-4 md:gap-6"
          >
            {gridVideosData.map((video) => (
              <GridVideoItem key={video.id} video={video} onClick={setSelectedVideo} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              className="absolute top-6 right-6 text-white text-4xl hover:text-zinc-400 transition-colors z-[1000]"
              onClick={() => setSelectedVideo(null)}
            >
              &times;
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl md:aspect-video aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedVideo.src}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ... (Baaki aapka ReviewSection, ContactBanner aur Testimonials component same rahega)

// ==========================================
// TRANSCRIPT TESTIMONIALS DATA
// ==========================================
const transcriptData = [
  {
    event: "design pov 2026",
    testimonials: [
      { name: "ridhi khosla jalan", company: "interior stylist", quote: "They do a great job with sofas and marble tables, and they always have pieces that feel very different. The aesthetic is unique to Essentia and the quality is something I can always rely on." },
      { name: "palak ladhani", company: "palak ladhani design studio", quote: "They've showcased different types of furniture and artefacts, and a lot of their pieces are super interesting — the bespoke centre tables and console tables especially. It's really nice to see what they're doing." },
      { name: "reza kabul", company: "reza kabul architects", quote: "Really excited to see all the furniture and products displayed by Essentia. I really like the finish and the designs they're doing." },
      { name: "mita mehta", company: "mita mehta studio", quote: "Let me tell you about Kitchen — they have amazing textures and German machines. You can never go wrong with German engineering." },
      { name: "siddhi phondekar", company: "studio nirmanika", quote: "I just love the vibe here — the place is designed and styled so beautifully." },
      { name: "utsav kamboj", company: "upscale architects", quote: "I love the kind of tactile experience that's been created this time. It's a beautiful blend of stone and fabric — I think that's an expertise of Essentia. A lot of pieces are really refreshing to look at, very refreshing to experience." },
      { name: "komal", company: "komal solanki designs", quote: "I love the vibe Essentia that you've created at Design POV. The furniture, the new launches — everything looks amazing." },
      { name: "love choudhary", company: "and studio", quote: "This is amazing — just to see the way they've explored natural materials. The finishes are very, very nice — in terms of the red, the grey — you would fall in love with them." },
      { name: "yash & anuja", company: "one habitat studio", quote: "We loved it — it's too good. The detailing for the stone and the fabric is so phenomenal. It's so crisp, it is so minimalistic yet so detailed. The pieces are very luxurious." },
      { name: "tina ahuja", company: "stylist", quote: "This console has such a cute detail in a house. I also loved the Nolte set that's there with their clean lines. Everything is centred and nothing is off-centred." },
      { name: "saransh anand", company: "arrcoat", quote: "We work with them on their projects for surfaces. They were just designers and now with this whole space, Essentia Homes that they're building — to learn growth hacks from them was fantastic." },
      { name: "dhruvi shah", company: "hiren patel architects", quote: "I'm here at Essentia right now and everything is made in house. It's really great to see that designers have stretched their image to a different end." },
      { name: "sonal bhatia", company: "sbid", quote: "They understand the detail, the depth at which we designers design. The finishes are impeccable. It's very, very nicely put up and I am very impressed with their quality." },
      { name: "karan anand", company: "the last goldfish design studio", quote: "It's an absolutely beautiful space. I feel like it goes far beyond being simply a product — it is architecture, it is design, it is art, it is interiors and everything in between." },
      { name: "shruti sethi", company: "niche living designs", quote: "It's absolutely brilliant, absolutely mind blowing, and spoke like how they say it." },
      { name: "isha narayan", company: "architect narayan", quote: "One of the pieces that I really like is this stone table — it's a complete ripped marble done. The way it has been placed and the shape turned out well, and they go perfectly into larger homes." },
      { name: "tanmay bhat", company: "youtuber", quote: "I am never leaving — it's too comfortable. So if you stop rolling, I'm gonna sleep on this any second." },
      { name: "amrita singh", company: "home anand", quote: "I just came to see all the designs and this one was really fabulous. The whole space, the way the layering has been done, and the way the wood and the materials complement each other — absolutely fabulous." },
    ]
  },
  {
    event: "eh store mumbai launch 2026",
    testimonials: [
      { name: "akif habib", company: "atelier habib", quote: "Fabulous collection by Hardesh and Hridik. I think they're going to do really well — very, very creative collection." },
      { name: "ira", company: "elara", quote: "I'm very excited to see Essentia in Mumbai. I'm super excited for people to explore the space and see all the offerings." },
      { name: "ali baldiwala", company: "baldiwala edge", quote: "I love this space — it's huge to have a space like this in Bombay, it's a blessing. Congratulations and very good luck." },
      { name: "vaishali pandya masaun", company: "interior stylist", quote: "As we enter, this spot has caught my attention. The way it's beautifully done — the green console, the in-house painting. Beautifully curated design. I love every corner of this space." },
    ]
  },
  {
    event: "id delhi 2026",
    testimonials: [
      { name: "arjun verma", company: "innovations", quote: "I'm here at India Design, looking at the beautiful Essentia Home pavilion, and I must say the finishing looks absolutely impeccable. The consoles are my absolute favourite — the kind of consoles they've made look absolutely stunning." },
      { name: "vasheena mittal", company: "vasheena mittal architects", quote: "I'm really excited to be here at India Design — the Essentia Homes booth is lovely. I love how a lot of natural materials are used in the furniture. Very excited to collaborate with Essentia in the future." },
      { name: "avinash", company: "directions", quote: "I'm here at the Essentia booth and loving it. It's a tiny space they have, but they've really tried to showcase whatever they can. All the best to the complete team — to Hardesh, Monica, everybody." },
      { name: "rajeev", company: "red architects", quote: "There's a beautiful towering lamp — that and the bench are something I'm really excited to see. It's a super large scale piece. They've done a fabulous job with the finishing." },
      { name: "aashna", company: "nirmals furnishings", quote: "I've been to the stall and it's really amazing. The collection is very nice, and the palettes and colours are very soothing." },
      { name: "joytri", company: "studio earth", quote: "There's a beautiful coffee table that looks really lovely. Especially the centre piece that's been created with the glass and metal combination." },
      { name: "amit porwal", company: "ipipl", quote: "To me Essentia Homes stands out for the way they work with marble, stone, and outdoor pieces. Goodness to Essentia Homes, and looking forward." },
      { name: "jolsna mathew", company: "teal story studio", quote: "What I liked most were the materials you've used. Some collections for the outdoor chair were pretty brilliant." },
      { name: "rashmi mehta", company: "aventia automation", quote: "They have this exclusive space here with striking furniture pieces, art pieces — it's an end-to-end solution. The ergonomics are beautiful, so are the textures." },
      { name: "adviya gupta", company: "ika designs", quote: "I love, love, love the new collection. Everything is so unique — it's not boring. You see different shapes, the use of organic, soft shapes. My personal favourite is this bench." },
      { name: "shlok jhamb", company: "sj made", quote: "Essentia Homes is always something that catches my eye. I love how aesthetically pleasing the place is and how they create this space. I'm just in love with them." },
      { name: "murchana das", company: "83 corner stone", quote: "I love, love your work. I've been here every year at India Design and I love, love your work. Great work Essentia, great work." },
      { name: "leena monga", company: "agnom designs", quote: "Essentia is my go-to name and brand for anything minimalistic and modern that brings amazing craftsmanship." },
      { name: "kanwar khurana", company: "ideal arch", quote: "I found the collection and the design very contemporary. I wish them all the best." },
      { name: "shivani", company: "reliance", quote: "All the pieces have a very earthy touch to them. I love the console, I love the coffee table. It gives a nice stacking vibe. I just love it." },
      { name: "aleena", company: "align", quote: "It's always a pleasure to come down to Essentia Homes. My favourite part is how they bring the space together with the décor elements and natural elements. I think no one does it better than Essentia at India Design." },
      { name: "vivek gupta", company: "arvind vivek associates", quote: "It's always such a pleasure each time one comes to anything touched by Essentia. The sense of aesthetics is so delicate, so refined, that it's really calming to all the senses." },
      { name: "aroosh", company: "nitush aroosh", quote: "It's a lovely booth, lovely designs. The colours are fabulous and very warm. I think everybody should come and check out Essentia at India Design." },
      { name: "satyajit & pashmin", company: "amoeba design", quote: "My favourite product from Essentia Homes would be the sling lamp I'm standing right under. I think they're bringing a lot of character to this space." },
      { name: "bani arora", company: "bani arora designs", quote: "I'm very impressed with how they've played with neutral colours and the textures and the warmth here. I love the finishes. I love how they've played with stone." },
    ]
  },
  {
    event: "nolte store launch sultanpur 2026",
    testimonials: [
      { name: "varnika", company: "the style list", quote: "I'm at Essentia and it has been a beautiful curation. The in-house work, especially the artisanal pieces that comprise marble and a lot of fabric work, really stand out to me." },
      { name: "shreya", company: "living etc india", quote: "I really love the space. It doesn't seem like eleven kitchen setups have been fitted so seamlessly in this space. The craftsmanship and the German technology are impressive." },
      { name: "rohan", company: "the hollywood reporter", quote: "It's been a pleasant experience visiting the store. Especially seeing Essentia partnering with Nolte — the design and functionality is quite amazing." },
      { name: "aditi syal", company: "four magazine india", quote: "I'm really glad to see the difference in design. People need more peaceful design than a lot of clutter, and that's something I really like. The ambiance here is amazing." },
      { name: "trisha kapoor", company: "india today", quote: "I really like the fact that you can cater to 1,500 kitchens in a day, with different materials. I love the designs." },
      { name: "kritika juneja", company: "interior exterior", quote: "The kitchens are beautiful, customizable, minimalistic, and feel totally effortless with the colours, designs, and handle-to-door options." },
      { name: "avinash parimoo", company: "directions", quote: "I think I've taken the right step in collaborating with Nolte and Essentia. It's a win-win for both of them and a great result for architects." },
      { name: "kritika goswamy malik", company: "house of december", quote: "I love the whole space and how it's been done. Every pantry or kitchen has been displayed really well with extensive use of different kinds of materials and finishes." },
      { name: "natasha n kochhar", company: "ltdf architecture", quote: "Adding kitchens to the entire storytelling of a complete lifestyle has really added to the experience a homeowner can have by investing in and with Essentia." },
      { name: "manish mehta", company: "nouveau design group", quote: "They've got some exciting and amazing products. The kind of functionality they're bringing into the kitchen is something very unique." },
    ]
  },
  {
    event: "design milestone december 2025",
    testimonials: [
      { name: "team ravoh", company: "", quote: "What really got our attention is the fireplace they've done — we love it. Also, this bench with the red travertine is stunning, stunning." },
      { name: "sham salim", company: "aslamsham architects", quote: "There are a lot of great products here. Essentia feels like more than just a store — it's thoughtfully placed, like a one-stop space." },
      { name: "ankita gupta", company: "lynx premium marketing", quote: "We love the ambiance. The fireplace they've done is very authentic. I love the winter vibe here — the fireplace gives this warm, vibrant feel to the whole place." },
      { name: "radhika", company: "monochrome design studio", quote: "Every time we come to their store or one of their stalls, it's completely different — a new vibe, very different curation. We're again mesmerized by the products and the curation." },
      { name: "ali tambawala", company: "airspace designs", quote: "The collection here is wonderful, especially the fold collection. What I really like is how even metal has been bent and crafted — this corrugated look has been created so seamlessly." },
      { name: "prashant chauhan", company: "zero 9", quote: "This doesn't feel like a stall at all — it feels like a living room, a home. It has so much warmth, and the experimentation in stone is brilliant, absolutely brilliant." },
      { name: "priyanka mehra", company: "ps design", quote: "They've used a lot of travertine, which is one of my favourite stones, and I love the hint of colour they've brought into the entire collection. Essentia has aced it." },
      { name: "simran boparai", company: "simran boparai archtelier", quote: "You're always blown away by the creativity they bring to design. When you're looking for a home, everything is so well coordinated — it all syncs. From furnishings to furniture pieces to paneling, everything runs in a theme." },
    ]
  },
  {
    event: "architecture + design young icons 2025",
    testimonials: [
      { name: "nachikt shelat", company: "new space design studio", quote: "I think the ambiance is great. I'm almost speechless — there's so much to say about this amazing, exquisite detailing and the fine furniture pieces." },
      { name: "priyanka singh", company: "chop studio", quote: "I got this beautiful marble trophy with really nice detailing — fabulous job. I look forward to working with all of you again." },
      { name: "taniya chutani", company: "pantone collective design studio", quote: "We're honoured to be a part of the Youth Icons here with Essentia. It's so good for Essentia to bring all of us together, appreciate our work, and give us this platform." },
      { name: "navya aggarwal", company: "navya & a quarter", quote: "It's a lovely space and a lovely event by A+D. There's something here for everyone. It's absolutely lovely to see the versatility of design that we have here." },
      { name: "maha", company: "design doodle studio", quote: "Essentia has a very cloud-like aesthetic — it feels like a nice fluffy cloud because the furniture just seems so inviting, so fluffy, so comfortable." },
      { name: "saliki saraf", company: "unorthodox designs", quote: "It's always a delight to be at Essentia. It's really comfortable, it's chic. I love how they use Indian marble — you see how an Indian material can be used in a different way." },
    ]
  },
  {
    event: "few more from magazine",
    testimonials: [
      { name: "zafar choudhary", company: "monika zafar", quote: "Always a pleasure to see essentia at exhibitions like these. they bring something fresh and interesting every single time, beautifully put together with incredible quality, colours, and textures. kudos to monica, hardesh, and hridik." },
      { name: "akif habib", company: "atelier habib", quote: "An impressive use of indian marble and stone at scale. the materiality feels elevated, the quality uncompromising, showcasing how local resources can achieve a truly world-class expression." },
      { name: "kiran gala", company: "kiran gala & associates", quote: "It's unbelievable to witness something like this. the concept, the material palette, and the way every mood has been thoughtfully brought to life is truly remarkable." },
      { name: "aamir sharma", company: "aamir hameeda", quote: "The maze bench is a standout, with consoles that feel bold and distinctive. the millwork is finely detailed, reflecting a strong balance of craftsmanship and confident design thinking." },
      { name: "amit porwal", company: "icon projects inspace pvt ltd", quote: "A thoughtful exploration of marble and stone, especially in the outer pieces. the detailing and finish reflect a strong design sensibility, kudos to essentia home for this execution." },
      { name: "simran boparai", company: "space 5 architects", quote: "A seamless sense of coordination flows from ceiling to walls, where every detail feels in sync. there's a distinct character to the space, layered, expressive, and reminiscent of a refined, global design sensibility." },
      { name: "rajiv parekh", company: "red architects", quote: "The towering bench stands as a striking highlight, bold in scale and impeccably finished. a piece that captures attention instantly, reflecting both ambition and precision in its making." },
      { name: "zubin master", company: "design matrix", quote: "A notable shift in material language, from wood to stone paired with leather and fabric. the stonework feels innovative, highly usable, and refreshingly contemporary in its expression." },
      { name: "natasha kochhar", company: "ltdf studio", quote: "A design language that feels emotive and refined, where every element speaks with intention. there's a quiet poetry here, a sense of love translated seamlessly into space and form." },
      { name: "nikhil mehra", company: "shantanu nikhil", quote: "The travertino, along with the entire colour palette, resonates beautifully with indian sensibility, warm, grounded, and refined. it captures a mood that feels both contemporary and deeply rooted in its context." },
      { name: "vivek gupta", company: "arvind vivek & associates", quote: "A notable shift in material language, from wood to stone paired with leather and fabric. the stonework feels innovative, highly usable, and refreshingly contemporary in its expression." },
      { name: "sanjay puri", company: "sanjay puri architects", quote: "A compelling expression of international standards, thoughtfully realised within india. the level of execution, detail, and finish reflects a design language that feels both global and forward-looking." },
    ]
  },
];

// ==========================================
// TRANSCRIPT TESTIMONIALS COMPONENT
// ==========================================
const TranscriptTestimonials = () => {
  return (
    <section className="bg-black text-white py-16 px-4 md:px-8 font-lato lowercase">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-7xl font-serif text-zinc-700 block -mb-8 leading-none">"</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight lowercase">what they said</h2>
          <p className="text-xl font-light text-zinc-400 mt-4 max-w-2xl leading-snug">
            voices from our events, exhibitions & store launches
          </p>
        </motion.div>

        <div className="flex flex-col gap-20">
          {transcriptData.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              {/* Event Title */}
              <div className="flex items-center gap-6 mb-10">
                <div className="h-[1px] w-8 bg-white/30" />
                <h3 className="text-xs tracking-[0.3em] text-zinc-400">{section.event}</h3>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.testimonials.map((t, ti) => (
                  <motion.div
                    key={ti}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: (ti % 3) * 0.1 }}
                    className="border border-white/10 p-6 flex flex-col gap-4 hover:border-white/25 transition-colors duration-500"
                  >
                    <div>
                      <p className="text-white text-sm font-light lowercase tracking-wide">{t.name}</p>
                      {t.company && (
                        <p className="text-zinc-500 text-[11px] tracking-[0.15em] mt-0.5">{t.company}</p>
                      )}
                    </div>
                    <p className="text-zinc-400 text-[13px] leading-relaxed font-light lowercase flex-1">
                      "{t.quote}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3. REVIEWS DATA
// ==========================================
const reviewsData = [
  {
    id: 1,
    name: "Dr. Ravineet Singh Marwah",
    quote: "I absolutely love Essentia Environments! The way they bring luxury and comfort together is truly unmatched. Every project reflects perfection, attention to detail, and timeless elegance. What I admire most is their end-to-end expertise from design to execution to custom furniture through Essentia Home. Walking into an Essentia space always feels soulful, refined, and inspiring. For me, Essentia Environments is not just about interiors, it’s about creating a lifestyle of true luxury.",
    avatar: "",
    bgImg: "/ProImgs/kowori/kowori3.webp",
  },
  {
    id: 2,
    name: "Ravi Ranjan",
    quote: "One-place stop for all your architecture, interior designing, and decorations; be it Offices, Condominiums, Clubs, 5-7 Star Hotels, & Resorts.",
    avatar: "",
    bgImg: "/ProImgs/mahaDelhi/maha3.webp",
  },
  {
    id: 3,
    name: "Anubhav Arora",
    quote: "The office space is designed very beautiful and architecturally good. The landscaping is done very nicely. The admin staff is really very cooperative. The interior and furniture placement is quite impressive. Its really the best interior firm in Gurgaon. The quality of work they give to their clients is well appreciated. Furniture design are very new and with rich royal look. At last the firm is quite impressive to me.",
    avatar: "",
    bgImg: "/ProImgs/mehrotra/mehrotra2.webp",
  },
  {
    id: 4,
    name: "Sam Shaw",
    quote: "Great experience, with awesome work and design if u want to make any office or house defiantly contact once",
    avatar: "",
    bgImg: "/ProImgs/panchseel/panchseel3.webp",
  },
  {
    id: 5,
    name: "Amritpal Singh",
    quote: "Perfection in every form of architecture, interior designing, furniture designing and execution.",
    avatar: "",
    bgImg: "/ProImgs/panchseel/panchseel3.webp",
  },
  {
    id: 6,
    name: "Digambari Patra",
    quote: "It was such a pleasure to visit this office, highly impressive Interiors....Loved it ❤️",
    avatar: "",
    bgImg: "/ProImgs/mehrotra/mehrotra2.webp",
  },
  {
    id: 7,
    name: "Rajeev Mittal",
    quote: "One of the best interiors company in town. Very tasteful and classy. Mostly High to very high end.",
    avatar: "",
    bgImg: "/ProImgs/kowori/kowori3.webp",
  },
  {
    id: 8,
    name: "Ravi Ranjan",
    quote: "One-place stop for all your architecture, interior designing, and decorations; be it Offices, Condominiums, Clubs, 5-7 Star Hotels, & Resorts.",
    avatar: "",
    bgImg: "/ProImgs/panchseel/panchseel1.webp",
  },
  {
    id: 9,
    name: "Debasis Mohapatra",
    quote: "Best interior firm in north India. Very good work culture. Very cooperative staffs...",
    avatar: "",
    bgImg: "/ProImgs/mahaDelhi/maha3.webp",
  },
  {
    id: 10,
    name: "Naina Singhal",
    quote: "It's rare to find a firm that excels in both macro-level architecture and micro-level interior styling. They truly offer a complete, luxurious package.",
    avatar: "",
    bgImg: "/ProImgs/mahaDelhi/maha2.webp",
  }
];

// ==========================================
// 3. AUTO-SLIDING REVIEW SECTION
// ==========================================
const ReviewSection = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (carouselRef.current && trackRef.current) {
        setWidth(trackRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };

    updateSize();
    setTimeout(updateSize, 500);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (isInteracting || width === 0) return;

    const interval = setInterval(() => {
      const currentX = x.get();

      let step = 320;
      if (trackRef.current && trackRef.current.children.length > 0) {
        const cardWidth = trackRef.current.children[0].offsetWidth;
        const gap = window.innerWidth < 768 ? 16 : 24;
        step = cardWidth + gap;
      }

      let nextX = currentX - step;

      if (nextX < -width) {
        nextX = 0;
      }

      controls.start({
        x: nextX,
        transition: { duration: 0.8, ease: "easeInOut" }
      });

    }, 3000);

    return () => clearInterval(interval);
  }, [isInteracting, width, controls, x]);

  const handleToggle = (id) => {
    if (isMobile) {
      setActiveCard(activeCard === id ? null : id);
    }
  };

  return (
    <section className="bg-black text-white pt-10 md:py-16 px-4 md:px-8 font-lato overflow-hidden lowercase">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-[1400px] mx-auto mb-16"
      >
        <motion.span variants={fadeUpVariant} className="text-7xl font-serif text-zinc-500 block -mb-8 leading-none">“</motion.span>
        <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-5xl font-light tracking-tight lowercase">reviews</motion.h2>
        <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl font-light text-zinc-400 mt-4 max-w-2xl leading-snug">
          see what our clients have to say about partnering with us on custom architectural projects
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1400px] mx-auto relative cursor-grab active:cursor-grabbing"
      >
        <div ref={carouselRef} className="overflow-hidden">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            style={{ x }}
            animate={controls}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
            onDragStart={() => setIsInteracting(true)}
            onDragEnd={() => setIsInteracting(false)}
            className="flex gap-4 md:gap-6"
          >
            {reviewsData.map((review) => (
              <motion.div
                key={review.id}
                initial="initial"
                animate={isMobile && activeCard === review.id ? "hover" : "initial"}
                whileHover={!isMobile ? "hover" : ""}
                onClick={() => handleToggle(review.id)}
                className="relative h-[400px] w-[300px] md:w-[350px] lg:w-[400px] bg-[#0c0c0c] overflow-hidden group border border-zinc-800 shrink-0"
              >
                <motion.div
                  variants={{
                    initial: { filter: "blur(0px)", opacity: 1 },
                    hover: { filter: "blur(2px)", opacity: 0.7 }
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative z-0 p-6 flex flex-col h-full bg-[#0c0c0c]"
                >
                  <div className="flex gap-3 mb-4 items-center lowercase">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        loading="lazy"
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover shrink-0 lowercase"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 text-xl font-light shrink-0 lowercase">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <p className="text-[16px] lowercase tracking-tighter text-zinc-400 leading-tight">
                      {review.name}
                    </p>
                  </div>

                  <p className="text-[13px] leading-relaxed font-light text-zinc-300 lowercase line-clamp-6">
                    "{review.quote}"
                  </p>

                  <div className="mt-auto text-right">
                    <p className="text-[11px] tracking-widest text-zinc-600 lowercase">-{review.name}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    initial: { height: "100px", y: 0 },
                    hover: { height: "82%", y: 0 }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] bg-black"
                >
                  <img
                    src={review.bgImg}
                    alt=""
                    className="w-full h-full object-cover transition-all duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// ==========================================
// 5. CONTACT BANNER COMPONENT
// ==========================================
const ContactBanner = () => {
  const navigate = useNavigate();
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full relative py-10 my-16 font-lato overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 bg-[#296f72]"
        style={{
          backgroundImage: "url('/Testimonial/test.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'bottom'
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl lg:text-4xl font-light text-white max-w-sm leading-snug text-center md:text-left lowercase"
        >
          share your expricnce with us
        </motion.h2>

        <motion.button
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          onClick={() => navigate('/contact')}
          className="backdrop-blur-md bg-white/10 border border-white/30 hover:bg-white/20 text-white font-light text-xl px-6 py-3 md:px-10 md:py-4 rounded-xl transition-all duration-300 shrink-0 shadow-lg cursor-pointer lowercase"
        >
          review us
        </motion.button>
      </div>
    </motion.section>
  );
};

// ==========================================
// 6. MAIN PAGE EXPORT
// ==========================================
function Testimonials() {
  return (
    <div className="min-h-screen bg-black text-white font-lato">
      <PageHeroSection
        image="/Testimonial/test-hero.webp"
        title="Testimonials"
      />

      <TranscriptTestimonials />

      <VideoGridSection />

      <ReviewSection />
      <ContactBanner />
    </div>
  );
}

export default Testimonials;

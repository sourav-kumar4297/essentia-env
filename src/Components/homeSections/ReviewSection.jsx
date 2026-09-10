import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";

const eventTitle = "design pov 2026";

const reviews = [
  // DESIGN POV 2026
  { name: "ridhi khosla jalan", company: "interior stylist", quote: "They do a great job with sofas and marble tables, and they always have pieces that feel very different. The aesthetic is unique to Essentia and the quality is something I can always rely on." },
  { name: "palak ladhani", company: "palak ladhani design studio", quote: "They've showcased different types of furniture and artefacts, and a lot of their pieces are super interesting, the bespoke centre tables and console tables especially. It's really nice to see what they're doing." },
  { name: "reza kabul", company: "reza kabul architects", quote: "Really excited to see all the furniture and products displayed by Essentia. I really like the finish and the designs they're doing." },
  { name: "mita mehta", company: "mita mehta studio", quote: "Let me tell you about Kitchen, they have amazing textures and German machines. You can never go wrong with German engineering." },
  { name: "siddhi phondekar", company: "studio nirmanika", quote: "I just love the vibe here, the place is designed and styled so beautifully." },
  { name: "utsav kamboj", company: "upscale architects", quote: "I love the kind of tactile experience that's been created this time. It's a beautiful blend of stone and fabric, I think that's an expertise of Essentia. A lot of pieces are really refreshing to look at, very refreshing to experience." },
  { name: "komal", company: "komal solanki designs", quote: "I love the vibe Essentia that you've created at Design POV. The furniture, the new launches, everything looks amazing." },
  { name: "love choudhary", company: "and studio", quote: "This is amazing just to see the way they've explored natural materials. The finishes are very, very nice in terms of the red, the grey, you would fall in love with them." },
  { name: "yash & anuja", company: "one habitat studio", quote: "We loved it it's too good. The detailing for the stone and the fabric is so phenomenal. It's so crisp, it is so minimalistic yet so detailed. The pieces are very luxurious. The detailing with the stone, with the fabric, we love the pieces." },
  { name: "tina ahuja", company: "stylist", quote: "This console has such a cute detail in a house. I also loved the Nolte set that's there with their clean lines. Everything is centred and nothing is off-centred." },
  { name: "saransh anand", company: "arrcoat", quote: "We work with them on their projects for surfaces and we've known Hardesh Chawla and the family for the past two years now. We've worked very closely with them and we've learned so much about the multiplication of their consortium. They were designers, then contractors, design-build, and now furniture. To learn growth hacks from them was fantastic." },
  { name: "dhruvi shah", company: "hiren patel architects", quote: "I'm here at Essentia right now and everything is made in house. It's really great to see that designers have stretched their image to a different end." },
  { name: "sonal bhatia", company: "sbid", quote: "They understand the detail, the depth at which we designers design. My most favourite piece is this one. I love this little connector they put to connect this piece, also the finishes are impeccable." },
  { name: "karan anand", company: "the last goldfish design studio", quote: "It's an absolutely beautiful space. I've been very closely associated with the brand and the people involved in it. I feel like it goes far beyond being simply a product, it is architecture, it is design, it is art, it is interiors and everything in between." },
  { name: "shruti sethi", company: "niche living designs", quote: "It's absolutely brilliant, absolutely mind blowing, and spoke like how they say it." },
  { name: "isha narayan", company: "architect narayan", quote: "The wonderful news is that they have opened up in Bombay. One of the pieces that I really like is this stone table. The way it has been placed, the shape is turned out well, and they go perfectly into larger homes." },
  { name: "tanmay bhat", company: "youtuber", quote: "I am never leaving, it's too comfortable. So if you stop rolling, I'm gonna sleep on this any second." },
  { name: "amrita singh", company: "home anand", quote: "I just came to see all the designs and this one was really fabulous. We love the entire setup. I really like the lounge that's been created, it's beautifully done. The whole space is absolutely fabulous." },
  // EH STORE MUMBAI LAUNCH 2026
  { name: "akif habib", company: "atelier habib", quote: "Fabulous collection by Hardesh and Hridik. I think they're going to do really well, very, very creative collection." },
  { name: "ira", company: "elara", quote: "I'm very excited to see Essentia in Mumbai. I'm super excited for people to explore the space and see all the offerings, and yeah excited to work together with them as well." },
  { name: "ali baldiwala", company: "baldiwala edge", quote: "I love this space it's huge to have a space like this in Bombay, it's a blessing. Congratulations and very good luck." },
  { name: "vaishali pandya masaun", company: "interior stylist", quote: "As we enter, this spot has caught my attention. The way it's beautifully done the green console, the in-house painting, and that tint of colour they've used just to break it up. Beautifully curated design. I love every corner of this space." },
  // ID DELHI 2026
  { name: "arjun verma", company: "innovations", quote: "I'm here at India Design, looking at the beautiful Essentia Home pavilion, and I must say the finishing looks absolutely impeccable. The products are very interesting. The consoles are my absolute favourite, the kind of consoles they've made look absolutely stunning." },
  { name: "vasheena mittal", company: "vasheena mittal architects", quote: "I'm really excited to be here at India Design the Essentia Homes booth is lovely. I love how a lot of natural materials are used in the furniture. Very excited to collaborate with Essentia in the future." },
  { name: "avinash", company: "directions", quote: "I'm here at the Essentia booth and loving it. It's a tiny space they have, but they've really tried to showcase whatever they can. All the best to the complete team to Hardesh, Monica, everybody." },
  { name: "rajeev", company: "red architects", quote: "I'm here at the Essentia Homes VIP lounge at India Design and it's lovely to be here. There's a beautiful towering lamp and the bench that I'm really excited to see. It's a super large scale piece, and I'm just enjoying things that are larger than life." },
  { name: "aashna", company: "nirmals furnishings", quote: "I've been to the stall and it's really amazing. The collection is very nice, and the palettes and colours are very soothing. Glad to be part of it." },
  { name: "joytri", company: "studio earth", quote: "We visited the store today, at this exhibition, and there's a beautiful coffee table that looks really lovely. Especially the centre piece that's been created with the glass and metal combination." },
  { name: "amit porwal", company: "ipipl", quote: "Essentia Homes is an upcoming brand, and for the last four to five years we've been continuously understanding the kind of evolution they're trying to bring to the furniture industry. I love the outdoor pieces and the way they work with marble and stone." },
  { name: "jolsna mathew", company: "teal story studio", quote: "What I liked most were the materials you've used. Some collections for the outdoor chair were pretty brilliant. It was so nice to see materials we had used years back." },
  { name: "rashmi mehta", company: "aventia automation", quote: "They have this exclusive space here with striking furniture pieces, art pieces you name it. It's an end-to-end solution for the whole interior. The ergonomics are beautiful, so are the textures." },
  { name: "adviya gupta", company: "ika designs", quote: "I love, love, love the new collection. Everything is so unique it's not boring. You see different shapes, the use of organic, soft shapes. My personal favourite is this bench." },
  { name: "shlok jhamb", company: "sj made", quote: "Essentia Homes is always something that catches my eye whenever I'm at India Design. I love how aesthetically pleasing the place is and how they create this space. I'm just in love with them." },
  { name: "murchana das", company: "83 corner stone", quote: "I love, love your work, especially this and that. I love the production done here. I've been here every year at India Design and I love, love your work." },
  { name: "leena monga", company: "agnom designs", quote: "Essentia is my go-to name and brand for anything minimalistic and modern that brings amazing craftsmanship. So anybody who is looking to make a house on those lines, this is the place to be." },
  { name: "kanwar khurana", company: "ideal arch", quote: "Today I visited this booth done by Essentia Homes at India Design and I found the collection and the design very contemporary. I wish them all the best." },
  { name: "shivani", company: "reliance", quote: "I entered the space and it's quite nice you feel earthy. All the pieces have a very earthy touch to them, so good for so many outdoor spaces. I love the console, I love the coffee table." },
  { name: "aleena", company: "align", quote: "It's always a pleasure to come down to Essentia Homes. We absolutely love the work they do and the material selection. They really bring out nature into your home. You can smell the spices, it's really nice." },
  { name: "vivek gupta", company: "arvind vivek associates", quote: "It's always such a pleasure each time one comes to anything touched by Essentia. Each time you're pushing the boundary. The sense of aesthetics is so delicate, so refined. It's really calming to all the senses." },
  { name: "aroosh", company: "nitush aroosh", quote: "I'm here at Essentia today. It's a lovely booth, lovely designs. The colours are fabulous and very warm. I think everybody should come and check out Essentia at India Design." },
  { name: "satyajit & pashmin", company: "amoeba design", quote: "We're at Essentia Homes right now and enjoying their new products they've introduced yeah, pretty, pretty amazing stuff. My favourite product would be the sling lamp. We're in love with oversized lamps." },
  { name: "bani arora", company: "bani arora designs", quote: "The first impression when I entered here was the colour scheme. I'm very impressed with how they've played with neutral colours and the textures and the warmth. I love the finishes. I love this lamp here which has a very good height." },
  // NOLTE STORE LAUNCH SULTANPUR 2026
  { name: "varnika", company: "the style list", quote: "I'm at Essentia and it has been a beautiful curation. The in-house work, especially the artisanal pieces that comprise marble and a lot of fabric work, really stand out to me." },
  { name: "shreya", company: "living etc india", quote: "I really love the space. It doesn't seem like eleven kitchen setups have been fitted so seamlessly in this space. The craftsmanship and the German technology are impressive." },
  { name: "rohan", company: "the hollywood reporter", quote: "It's been a pleasant experience visiting the store. The moment I stepped in, the design speaks for itself. Especially seeing Essentia partnering with Nolte the design and functionality is quite amazing." },
  { name: "aditi syal", company: "four magazine india", quote: "I'm really glad to see the difference in design that you can clearly see, with the elegance of colours and monotones. People need more peaceful design than a lot of clutter. The ambiance here is amazing." },
  { name: "trisha kapoor", company: "india today", quote: "We're at the lovely launch of Nolte with The Home. I really like the fact that you can cater to 1,500 kitchens in a day, with different materials. I love the designs there's also availability for cabinets." },
  { name: "kritika juneja", company: "interior exterior", quote: "We're here at Nolte Kitchen. In collaboration, the kitchens are beautiful, customizable, minimalistic, and feel totally effortless with the colours, designs, and handle-to-door options." },
  { name: "avinash parimoo", company: "directions", quote: "I think I've taken the right step in collaborating with Nolte and Essentia. It's a win-win for both of them and a great result for architects, because under one umbrella we can really see the best of both worlds." },
  { name: "kritika goswamy malik", company: "house of december", quote: "I think it's a very, very good move with the introduction of Nolte in India, and I think it can't be a better place than The Home. I love the whole space and how it's been done." },
  { name: "natasha n kochhar", company: "ltdf architecture", quote: "I'm really happy to be here at Essentia today for the Nolte launch. Adding kitchens to the entire storytelling of a complete lifestyle has really added to the experience a homeowner can have." },
  { name: "manish mehta", company: "nouveau design group", quote: "I'm very excited to be here at the showroom launch. They've got some exciting and amazing products. The kind of functionality they're bringing into the kitchen is something very unique." },
  // DESIGN MILESTONE DECEMBER 2025
  { name: "team ravoh", company: "team ravoh", quote: "We just came to the centre booth and what really got our attention is the fireplace they've done we love it. Also, this bench with the red travertine is stunning, stunning." },
  { name: "sham salim", company: "aslamsham architect", quote: "There are a lot of great products here. Essentia feels like more than just a store it's thoughtfully placed, like a one-stop space. I'm glad the show is opening up in Mumbai as well." },
  { name: "ankita gupta", company: "lynx premium marketing", quote: "We're here at The Essentia Home stall and we love the ambiance. The fireplace they've done is very authentic. I love the winter vibe here it feels like winter already." },
  { name: "radhika", company: "monochrome design studio", quote: "Every time we come to their store or one of their stalls, it's completely different a new vibe, very different curation. We're again mesmerized by the products and the curation." },
  { name: "ali tambawala", company: "airspace designs", quote: "The collection here is wonderful, especially the fold collection. What I really like is how even metal has been bent and crafted this corrugated look has been created so seamlessly." },
  { name: "prashant chauhan", company: "zero 9", quote: "I'm absolutely loving the connection at Essentia Homes. This doesn't feel like a stall at all it feels like a living room, a home. It has so much warmth, and especially the lovely materials." },
  { name: "priyanka mehra", company: "ps design", quote: "I'm here at Essentia Homes and I love what they've created this time. They've used a lot of travertine, which is one of my favourite stones. The fold design and the way they've treated the fireplace is fantastic." },
  { name: "simran boparai", company: "simran boparai archtelier", quote: "I'm at Essentia Homes and, as always, they've done something very different and unique. When you're looking for a home, everything is so well coordinated it all syncs." },
  // ARCHITECTURE + DESIGN YOUNG ICONS 2025
  { name: "nachikt shelat", company: "new space design studio", quote: "I think the ambiance is great. I'm almost speechless there's so much to say about this amazing, exquisite detailing and the fine furniture pieces." },
  { name: "priyanka singh", company: "chop studio", quote: "I got this beautiful marble trophy with really nice detailing fabulous job. Thank you again for having me here, and I look forward to working with all of you again." },
  { name: "taniya chutani", company: "pantone collective design studio", quote: "We're honoured to be a part of the Youth Icons here with Essentia, alongside so much great talent. It's so good for Essentia to bring all of us together and give us this platform." },
  { name: "navya aggarwal", company: "navya & a quarter", quote: "It's a lovely space and a lovely event by A+D. Super excited to be here. There's so much happening in so many different pockets there's something here for everyone." },
  { name: "maha", company: "design doodle studio", quote: "I'm really happy to be here at the Essentia Home Store for A+D Young Icons 2025. It's an honour. Essentia has a very cloud-like aesthetic it feels like a nice fluffy cloud." },
  { name: "saliki saraf", company: "unorthodox designs", quote: "We're here at Essentia today it's being hosted by Essentia and AD, and it's a beautiful set up. It's always a delight to be at Essentia. I love how they use Indian marble." },
  // MAGAZINE FEATURES
  { name: "zafar choudhary & monika zafar", company: "magazine", quote: "Always a pleasure to see Essentia at exhibitions like these. They bring something fresh and interesting every single time, beautifully put together with incredible quality, colours, and textures." },
  { name: "akif habib", company: "atelier habib", quote: "An impressive use of indian marble and stone at scale. The materiality feels elevated, the quality uncompromising, showcasing how local resources can achieve a truly world-class expression." },
  { name: "kiran gala", company: "kiran gala & associates", quote: "It's unbelievable to witness something like this. The concept, the material palette, and the way every mood has been thoughtfully brought to life is truly remarkable." },
  { name: "aamir sharma", company: "aamir hameeda", quote: "The maze bench is a standout, with consoles that feel bold and distinctive. The millwork is finely detailed, reflecting a strong balance of craftsmanship and confident design thinking." },
  { name: "amit porwal", company: "icon projects inspace pvt ltd", quote: "A thoughtful exploration of marble and stone, especially in the outer pieces. The detailing and finish reflect a strong design sensibility, kudos to essentia home for this execution." },
  { name: "simran boparai", company: "space 5 architects", quote: "A seamless sense of coordination flows from ceiling to walls, where every detail feels in sync. There's a distinct character to the space, layered, expressive, and reminiscent of refined design sensibility." },
  { name: "rajiv parekh", company: "red architects", quote: "The towering bench stands as a striking highlight, bold in scale and impeccably finished. A piece that captures attention instantly, reflecting both ambition and precision." },
  { name: "zubin master", company: "design matrix", quote: "A notable shift in material language, from wood to stone paired with leather and fabric. The stonework feels innovative, highly usable, and refreshingly contemporary in its expression." },
  { name: "natasha kochhar", company: "ltdf studio", quote: "A design language that feels emotive and refined, where every element speaks with intention. There's a quiet poetry here, a sense of love translated seamlessly into space and form." },
  { name: "nikhil mehra", company: "shantanu nikhil", quote: "The travertino, along with the entire colour palette, resonates beautifully with indian sensibility, warm, grounded, and refined. It captures a mood that feels both contemporary and deeply rooted." },
  { name: "vivek gupta", company: "arvind vivek & associates", quote: "A notable shift in material language, from wood to stone paired with leather and fabric. The stonework feels innovative, highly usable, and refreshingly contemporary in its expression." },
  { name: "sanjay puri", company: "sanjay puri architects", quote: "A compelling expression of international standards, thoughtfully realised within india. The level of execution, detail, and finish reflects a design language that feels both global and forward-looking." },
];

const ReviewSection = () => {
  const navigate = useNavigate();

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

  return (
    <section className="bg-black text-white py-5 md:py-10 px-4 md:px-8 font-lato overflow-hidden lowercase">
      <div className="max-w-[1400px] mx-auto mb-16">
        <span className="text-7xl font-serif text-zinc-700 block -mb-8 leading-none">"</span>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight lowercase">testimonials</h2>
        <p className="text-xl md:text-2xl font-light text-zinc-400 mt-4 max-w-2xl leading-snug">
          see what our clients have to say about partnering with us on custom architectural projects
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto mb-8 flex items-center gap-6">
        <div className="h-[1px] w-8 bg-white/30" />
        <h3 className="text-xs tracking-[0.3em] text-zinc-400">{eventTitle}</h3>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>

      <div className="max-w-[1400px] mx-auto relative cursor-grab active:cursor-grabbing">
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
            {reviews.map((review, i) => (
              <div
                key={i}
                className="relative h-[400px] w-[300px] md:w-[350px] lg:w-[400px] bg-[#0c0c0c] overflow-hidden border border-white/10 hover:border-white/25 transition-colors duration-500 shrink-0 p-6 flex flex-col gap-4"
              >
                <div>
                  <p className="text-white text-base md:text-lg font-light lowercase tracking-wide">{review.name}</p>
                  {review.company && (
                    <p className="text-zinc-500 text-[11px] tracking-[0.15em] mt-0.5">{review.company}</p>
                  )}
                </div>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light lowercase flex-1 overflow-y-auto">
                  "{review.quote}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-12 flex justify-center">
        <button
          onClick={() => navigate("/testimonials")}
          className="border border-white/30 hover:bg-white hover:text-black text-white font-light text-sm md:text-base px-8 py-3 md:px-10 md:py-4 tracking-widest lowercase transition-all duration-300 cursor-pointer"
        >
          view more
        </button>
      </div>
    </section>
  );
};

export default ReviewSection;

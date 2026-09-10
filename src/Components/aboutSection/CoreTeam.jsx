// import React from"react";

// // Top row array (6 members)
// const topRowData = [
// { id: 1, name:"deepak\njain", img:"/AboutImgs/teammember/deepak_jain_result.webp" },
// { id: 2, name:"vishakha\nsingh arora", img:"/AboutImgs/teammember/vishakha_singh_arora_result.webp" },
// { id: 3, name:"preeti\nvashist", img:"/AboutImgs/teammember/preeti_vashist_result.webp" },
// { id: 4, name:"dhruv\nkeayla", img:"/AboutImgs/teammember/dhruv_keayla_result.webp" },
// { id: 5, name:"neeru\nbajaj", img:"/AboutImgs/teammember/neeru_bajaj_result.webp" },
// { id: 6, name:"ravineet\nsingh marwah", img:"/AboutImgs/teammember/ravineet_singh_marwah_result.webp" },
// ];

// // Bottom row array (9 members)
// const bottomRowData = [
// { id: 7, name:"khushpreet\narora", img:"/AboutImgs/teammember/khushpreet_arora_result.webp" },
// { id: 8, name:"shipra\nsharma", img:"/AboutImgs/teammember/shipra_sharma_result.webp" },
// { id: 9, name:"amit\nahluwalia", img:"/AboutImgs/teammember/amit_ahluwalia_result.webp" },
// { id: 10, name:"roopdeep\nkaur", img:"/AboutImgs/teammember/roopdeep_kaur_result.webp" },
// { id: 11, name:"hriday gagan\nsingh", img:"/AboutImgs/teammember/hriday_gagan_singh_result.webp" },
// { id: 12, name:"yoginder\njyoti", img:"/AboutImgs/teammember/yoginder_singh_&_jyoti_yadav_result.webp" },
// { id: 13, name:"akshin\nkumar", img:"/AboutImgs/teammember/akshin_kumar_result.webp" },
// { id: 14, name:"shivani\ndusturia", img:"/AboutImgs/teammember/shivani_dusturia_result.webp" },
// { id: 15, name:"surbhi\nchauhan", img:"/AboutImgs/teammember/surbhi_chauhan_result.webp" },
// ];

// const CoreTeam = () => {
// return (
// <section className="w-full bg-[#111] text-white overflow-hidden my-8 md:my-12">
 
// {/* --- HEADER SECTION ABOVE IMAGES --- */}
// <div className="w-full bg-black text-white px-6 md:px-16 pb-10 md:pb-20 relative overflow-hidden">
// <div className="max-w-[1400px] mx-auto">
 
// <div className="flex flex-col max-w-xl">
// {/*"core" and Horizontal Line */}
// <div className="flex items-center w-full relative">
// <h2 className="text-5xl md:text-7xl font-light tracking-tight lowercase">
// core
// </h2>
// {/* Responsive left positioning for the line */}
// <div className="h-[1px] bg-white flex-grow ml-4 mt-6 md:mt-12 w-[200vw] absolute left-[105px] md:left-[190px] lg:left-[220px]"></div>
// </div>
 
// {/*"team essentia" with Logo */}
// <div className="flex items-center gap-2 md:gap-3 mt-1">
// <span className="text-2xl md:text-4xl font-light lowercase">
// team
// </span>
// <img 
// src="/essentia R W.webp" 
// alt="essentia logo" 
// className="h-5 md:h-7 object-contain" 
// />
// </div>
// </div>

// </div>
// </div>

// {/* --- TOP ROW (6 Images) --- */}
// {/* Changed to Grid on mobile, Flex on desktop */}
// <div className="grid grid-cols-2 sm:grid-cols-3 md:flex w-full">
// {topRowData.map((member) => (
// <div 
// key={member.id} 
// className="relative md:flex-1 h-[250px] sm:h-[300px] md:h-[350px] group overflow-hidden border-b md:border-b-0 border-r border-black/20"
// >
// <img
// src={member.img}
// alt={member.name.replace('\n', ' ')}
// className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
// />
// {/* Overlay Gradient for better text readability */}
// <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
 
// {/* Name Text */}
// <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
// <p className="text-white text-[13px] md:text-[16px] font-light lowercase whitespace-pre-wrap leading-tight drop-shadow-md">
// {member.name}
// </p>
// </div>
// </div>
// ))}
// </div>

// {/* --- BOTTOM ROW (9 Images) --- */}
// {/* Changed to Grid (3 columns) on mobile, Flex on desktop */}
// <div className="grid grid-cols-3 md:flex w-full">
// {bottomRowData.map((member) => (
// <div 
// key={member.id} 
// className="relative md:flex-1 h-[180px] sm:h-[220px] md:h-[250px] group overflow-hidden border-b md:border-b-0 border-r border-black/20"
// >
// <img
// src={member.img}
// alt={member.name.replace('\n', ' ')}
// className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
// />
// {/* Overlay Gradient */}
// <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
 
// {/* Name Text */}
// <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
// <p className="text-white text-[10px] sm:text-[11px] md:text-[14px] font-light lowercase whitespace-pre-wrap leading-tight drop-shadow-md">
// {member.name}
// </p>
// </div>
// </div>
// ))}
// </div>

// </section>
// );
// };

// export default CoreTeam;


import React, { useState } from"react";

// Top row array (6 members)
const topRowData = [
 { 
 id: 1, 
 name:"deepak\njain", 
 designation:"Chief Advisor",
 description:"Deepak Jain serves as Chief Advisor at Essentia, bringing strategic insight and industry experience to the organisation’s growth and long-term direction. His guidance supports key business decisions across operations, expansion, and brand development.",
 img:"/AboutImgs/teammember/deepak_jain_result.webp" 
 },
 { 
 id: 2, 
 name:"vishakha\nsingh arora", 
 designation:"Head, Interior Design",
 description:"Vishaka Singh Arora leads Essentia’s interior design team, shaping residences and commercial spaces through a refined understanding of proportion, materiality, and spatial flow. Her approach balances functionality with a strong design narrative tailored to each client.",
 img:"/AboutImgs/teammember/vishakha_singh_arora_result.webp" 
 },
 { 
 id: 3, 
 name:"preeti\nvashist", 
 designation:"Head of Business Development",
 description:"Preeti leads business development at Essentia, driving strategic growth through client relationships, partnerships, and new opportunities. Her understanding of both design and execution allows her to build collaborations aligned with the brand’s long-term vision.",
 img:"/AboutImgs/teammember/preeti_vashist_result.webp" 
 },
 { 
 id: 4, 
 name:"dhruv\nkeayla", 
 designation:"CRM Team Head",
 description:"Dhruv Keayla is part of Essentia’s CRM leadership team, managing client communication and coordination across projects. His role focuses on ensuring a smooth and responsive experience throughout the design and execution journey.",
 img:"/AboutImgs/teammember/dhruv_keayla_result.webp" 
 },
 { 
 id: 5, 
 name:"neeru\nbajaj", 
 designation:"CRM Team Head",
 description:"",
 img:"/AboutImgs/teammember/neeru_bajaj_result.webp" 
 },
 { 
 id: 6, 
 name:"ravineet\nsingh marwah", 
 designation:"Marketing Head",
 description:"",
 img:"/AboutImgs/teammember/ravineet_singh_marwah_result.webp" 
 },
];

// Bottom row array (9 members)
const bottomRowData = [
 { 
 id: 7, 
 name:"khushpreet\narora", 
 designation:"Head of Production",
 description:"",
 img:"/AboutImgs/teammember/khushpreet_arora_result.webp" 
 },
 { 
 id: 8, 
 name:"shipra\nsharma", 
 designation:"Head of PPC",
 description:"Shipra Sharma oversees production planning and control at Essentia, ensuring operational precision across timelines, manufacturing, and execution. Her structured approach plays a critical role in maintaining consistency and efficiency at scale.",
 img:"/AboutImgs/teammember/shipra_sharma_result.webp" 
 },
 { 
 id: 9, 
 name:"amit\nahluwalia", 
 designation:"Business Head, Essentia Home",
 description:"Amit Ahluwalia leads the business operations of Essentia Home, overseeing growth, retail strategy, and brand expansion. His focus lies in strengthening Essentia Home’s position as a destination for globally informed furniture and décor.",
 img:"/AboutImgs/teammember/amit_ahluwalia_result.webp" 
 },
 { 
 id: 10, 
 name:"roopdeep\nkaur", 
 designation:"Head, Furniture and Finishings",
 description:"",
 img:"/AboutImgs/teammember/roopdeep_kaur_result.webp" 
 },
 { 
 id: 11, 
 name:"hriday gagan\nsingh", 
 designation:"Head of 3D",
 description:"Hriday Gagan Singh heads Essentia’s 3D visualisation division, translating concepts into immersive spatial narratives with precision and clarity. His work plays a key role in bridging design intent and execution, allowing clients to experience spaces before they are built.",
 img:"/AboutImgs/teammember/hriday_gagan_singh_result.webp" 
 },
 { 
 id: 12, 
 name:"yoginder\njyoti", 
 designation:"Architecture & WIO Heads",
 description:"Yoginder Singh – Head of Architecture\nJyoti Yadav – Head of WIO",
 img:"/AboutImgs/teammember/yoginder_singh_&_jyoti_yadav_result.webp" 
 },
 { 
 id: 13, 
 name:"akshin\nkumar", 
 designation:"Creative Manager, Marketing",
 description:"Akshin Kumar leads creative marketing at Essentia, shaping the visual language and storytelling behind the brand’s projects, campaigns, and experiences. His work reflects the design sensibility and atmosphere that define Essentia’s world.",
 img:"/AboutImgs/teammember/akshin_kumar_result.webp" 
 },
 { 
 id: 14, 
 name:"shivani\ndusturia", 
 designation:"Head of Decor",
 description:"Shivani Dasturia leads the décor vertical at Essentia, shaping spaces through a layered approach to styling, accessories, and collectible design. Her eye for detail and material harmony brings warmth, character, and individuality to each project.",
 img:"/AboutImgs/teammember/shivani_dusturia_result.webp" 
 },
 { 
 id: 15, 
 name:"surbhi\nchauhan", 
 designation:"Executive Assistant",
 description:"Surbhi Chauhan – Executive Assistant to Monica Chawla",
 img:"/AboutImgs/teammember/surbhi_chauhan_result.webp" 
 },
];

const CoreTeam = () => {
 // State to handle the selected member for the mobile popup
 const [selectedMember, setSelectedMember] = useState(null);

 // Close popup function
 const closePopup = () => setSelectedMember(null);

 return (
 <section className="w-full bg-[#111] text-white overflow-hidden my-8 md:my-12">
 
 {/* --- HEADER SECTION ABOVE IMAGES --- */}
 <div className="w-full bg-black text-white px-6 md:px-16 pb-10 md:pb-20 relative overflow-hidden">
 <div className="max-w-[1400px] mx-auto">
 
 <div className="flex flex-col max-w-xl">
 {/*"core" and Horizontal Line */}
 <div className="flex items-center w-full relative">
 <h2 className="text-5xl md:text-7xl font-light tracking-tight lowercase">
 core
 </h2>
 {/* Responsive left positioning for the line */}
 <div className="h-[1px] bg-white flex-grow ml-0 mt-6 md:mt-12 w-[200vw] absolute left-[105px] md:left-[190px] lg:left-[150px]"></div>
 </div>
 
 {/*"team essentia" with Logo */}
 <div className="flex items-center gap-2 md:gap-3 mt-1">
 <span className="text-2xl md:text-4xl font-light lowercase">
 team
 </span>
 <img 
 src="/essentia R W.webp" 
 alt="essentia logo" 
 className="h-5 md:h-7 object-contain" 
 />
 </div>
 </div>

 </div>
 </div>

 {/* --- TOP ROW (6 Images) --- */}
 <div className="grid grid-cols-2 sm:grid-cols-3 md:flex w-full">
 {topRowData.map((member) => (
 <div 
 key={member.id} 
 onClick={() => setSelectedMember(member)}
 className="relative md:flex-1 h-[250px] sm:h-[300px] md:h-[350px] group overflow-hidden border-b md:border-b-0 border-r border-black/20 cursor-pointer md:cursor-default"
 >
 <img
 src={member.img}
 alt={member.name.replace('\n', ' ')}
 className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
 />
 
 {/* Base Overlay Gradient */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />

 {/* Hover Details Overlay (Hidden on touch devices, triggers on hover for desktop) */}
 <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6 z-10 hidden md:flex">
 <h4 className="text-white text-sm md:text-base font-light lowercase mb-2 tracking-wide">
 {member.designation}
 </h4>
 {member.description && (
 <p className="text-gray-300 text-[10px] md:text-xs font-light lowercase leading-relaxed whitespace-pre-wrap line-clamp-6">
 {member.description}
 </p>
 )}
 </div>
 
 {/* Name Text (Fades out on hover) */}
 <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-0">
 <p className="text-white text-[13px] md:text-[16px] font-light lowercase whitespace-pre-wrap leading-tight drop-shadow-md">
 {member.name}
 </p>
 </div>
 </div>
 ))}
 </div>

 {/* --- BOTTOM ROW (9 Images) --- */}
 <div className="grid grid-cols-3 md:flex w-full">
 {bottomRowData.map((member) => (
 <div 
 key={member.id} 
 onClick={() => setSelectedMember(member)}
 className="relative md:flex-1 h-[180px] sm:h-[220px] md:h-[250px] group overflow-hidden border-b md:border-b-0 border-r border-black/20 cursor-pointer md:cursor-default"
 >
 <img
 src={member.img}
 alt={member.name.replace('\n', ' ')}
 className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
 />
 
 {/* Base Overlay Gradient */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />

 {/* Hover Details Overlay (Desktop only) */}
 <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3 md:p-4 z-10 hidden md:flex">
 <h4 className="text-white text-[11px] md:text-sm font-light lowercase mb-1 md:mb-2 tracking-wide leading-tight">
 {member.designation}
 </h4>
 {member.description && (
 <p className="text-gray-300 text-[9px] md:text-[10px] font-light lowercase leading-snug whitespace-pre-wrap line-clamp-4">
 {member.description}
 </p>
 )}
 </div>
 
 {/* Name Text (Fades out on hover) */}
 <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-0">
 <p className="text-white text-[10px] sm:text-[11px] md:text-[14px] font-light lowercase whitespace-pre-wrap leading-tight drop-shadow-md">
 {member.name}
 </p>
 </div>
 </div>
 ))}
 </div>

 {/* --- MOBILE POPUP MODAL --- */}
 {selectedMember && (
 <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:hidden">
 
 <div className="relative w-full max-w-[90%] bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl overflow-hidden">
 
 {/* Close Button */}
 <button 
 onClick={closePopup}
 className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white border border-white/10 transition-colors"
 >
 &#x2715;
 </button>
 
 {/* Popup Content */}
 <div className="flex flex-col items-center mt-2">
 <img 
 src={selectedMember.img} 
 alt={selectedMember.name.replace('\n', ' ')} 
 className="w-24 h-24 rounded-full object-cover object-top border border-white/30 mb-4 shadow-lg"
 />
 
 {/* NAME */}
 <h3 className="text-white text-xl font-light lowercase text-center leading-tight mb-1">
 {selectedMember.name.replace('\n', ' ')}
 </h3>
 
 {/* DESIGNATION - Border dynamically added ONLY if description exists */}
 <h4 className={`text-gray-300 text-xs font-light lowercase text-center w-full ${selectedMember.description ? 'mb-4 border-b border-white/20 pb-3' : 'mb-2'}`}>
 {selectedMember.designation}
 </h4>
 
 {/* DESCRIPTION - Rendered only if it exists */}
 {selectedMember.description && (
 <div className="max-h-[35vh] overflow-y-auto w-full pr-1">
 <p className="text-gray-200 text-[12px] font-light lowercase leading-relaxed text-center">
 {selectedMember.description}
 </p>
 </div>
 )}
 </div>

 </div>
 </div>
 )}

 </section>
 );
};

export default CoreTeam;
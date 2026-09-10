import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { buildSystemPrompt } from './websiteKnowledge';
import { projectsData } from '../ProjectSection/projectsData';
import { Linkedin, Youtube, Instagram, Facebook, Phone, Mail, MapPin } from"lucide-react";

const STORAGE_KEY = 'essentia_chat_session';
const LEADS_KEY = 'essentia_leads';
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const WHATSAPP_NUMBER = '919810088877';

const INITIAL_MESSAGE = {
 role: 'bot',
 content:"welcome to essentia environments. i am your ai design consultant. ask me anything about our luxury interiors, architectural projects, or how we can transform your space — or tell me about your project and i'll guide you.",
};

const saveLead = (data) => {
 try {
 const leads = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]');
 const alreadyExists = leads.some(l => l.email && l.email === data.email);
 if (!alreadyExists) {
 leads.push({ ...data, id: Date.now(), timestamp: new Date().toISOString(), page: window.location.pathname });
 localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
 }
 } catch (_) {}
};

const loadHistory = () => {
 const navType = performance.getEntriesByType?.('navigation')[0]?.type;
 if (navType === 'reload') {
 sessionStorage.removeItem(STORAGE_KEY);
 return [INITIAL_MESSAGE];
 }
 try {
 const saved = sessionStorage.getItem(STORAGE_KEY);
 if (saved) return JSON.parse(saved);
 } catch (_) {}
 return [INITIAL_MESSAGE];
};

const saveHistory = (msgs) => {
 try {
 sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-40)));
 } catch (_) {}
};

const parseResponse = (text) => {
 const redirectMatch = text.match(/\[\[REDIRECT:([^\]]+)\]\]/i);
 const fillMatch = text.match(/\[\[FILL_FORM:([\s\S]*?)\]\]/i);
 const projectMatch = text.match(/\[\[SHOW_PROJECT:([^\]]+)\]\]/i);
 const serviceMatch = text.match(/\[\[SHOW_SERVICES:([^\]]+)\]\]/i);

 const clean = text
 .replace(/\[\[REDIRECT:[^\]]+\]\]/ig, '')
 .replace(/\[\[FILL_FORM:[\s\S]*?\]\]/ig, '')
 .replace(/\[\[SHOW_PROJECT:[^\]]+\]\]/ig, '')
 .replace(/\[\[SHOW_SERVICES:[^\]]+\]\]/ig, '')
 .trim();

 let formData = null;
 if (fillMatch) {
 try {
 formData = JSON.parse(fillMatch[1].trim());
 } catch (_) {
 const raw = fillMatch[1];
 const get = (key) => { const m = raw.match(new RegExp(`"${key}"\\s*:\\s*"([^"]*)"`, 'i')); return m ? m[1] : ''; };
 const name = get('name'), email = get('email'), phone = get('phone');
 if (name || email || phone) {
 formData = { name, email, phone, subject: get('subject') || 'consultation inquiry', message: get('message') };
 }
 }
 }

 const projectSlugs = projectMatch ? projectMatch[1].split(',').map(s => s.trim()).filter(Boolean) : [];
 const serviceTypes = serviceMatch ? serviceMatch[1].split(',').map(s => s.trim()).filter(Boolean) : [];

 return { reply: clean, redirectTo: redirectMatch?.[1]?.trim() ?? null, formData, projectSlugs, serviceTypes };
};

const buildHistory = (messages) =>
 messages
 .filter(m => m.role === 'bot' || m.role === 'user')
 .slice(-10)
 .map(m => ({
 role: m.role === 'bot' ? 'assistant' : 'user',
 content: m.content.replace(/\[\[[\s\S]*?\]\]/ig, '').trim(),
 }));

const callClaude = async (userText, history, systemPrompt) => {
 const url = import.meta.env.DEV ? '/api/groq-chat' : 'https://api.groq.com/openai/v1/chat/completions'
 const headers = { 'Content-Type': 'application/json' }
 if (!import.meta.env.DEV) headers.Authorization = `Bearer ${API_KEY}`
 const res = await fetch(url, {
 method: 'POST',
 headers,
 body: JSON.stringify({
 model: 'openai/gpt-oss-20b',
 max_tokens: 600,
 messages: [
 { role: 'system', content: systemPrompt },
 ...history,
 { role: 'user', content: userText },
 ],
 }),
 });
 if (!res.ok) {
 const e = await res.json().catch(() => ({}));
 throw new Error(e?.error?.message ||`api error ${res.status}`);
 }
 const data = await res.json();
 return data.choices[0].message.content;
};

const MessageContent = ({ text }) => {
 const parts = text.split(/(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[a-z]{2,}|\+?\d[\d\s\-]{7,}\d)/gi);
 return (
 <>
 {parts.map((part, i) => {
 if (/^https?:\/\//i.test(part))
 return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-zinc-400 hover:text-white break-all lowercase">{part}</a>;
 if (/^[\w.+-]+@[\w-]+\.[a-z]{2,}$/i.test(part))
 return <a key={i} href={`mailto:${part}`} className="underline underline-offset-2 text-zinc-400 hover:text-white lowercase">{part}</a>;
 if (/^\+?\d[\d\s\-]{7,}\d$/.test(part.trim()))
 return <a key={i} href={`tel:${part.replace(/[\s-]/g, '')}`} className="underline underline-offset-2 text-zinc-400 hover:text-white lowercase">{part}</a>;
 return <span key={i} className="lowercase">{part}</span>;
 })}
 </>
 );
};

const ProjectCard = ({ slug, onNavigate }) => {
 const unique = projectsData.filter((p, i, a) => a.findIndex(x => x.id === p.id) === i);
 const project = unique.find(p => p.slug === slug);
 if (!project) return null;

 const type = project.stats?.find(i => i.label.toLowerCase().includes('type'))?.value ?? 'luxury design';
 const size = project.stats?.find(i => i.label.toLowerCase().includes('size'))?.value ?? '';

 return (
 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
 onClick={() => onNavigate(`/projects/${slug}`)}
 className="bg-[#111111]/90 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 w-full h-full shadow-xl font-lato cursor-pointer group flex flex-col justify-between hover:border-white/40 transition-colors">
 <div className="h-[120px] shrink-0 overflow-hidden relative">
 <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
 </div>
 <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
 <div>
 <p className="text-white text-[13px] font-semibold tracking-wide leading-tight lowercase line-clamp-1">{project.title}</p>
 <p className="text-zinc-400 text-[11px] mt-1 lowercase">{project.category}</p>
 </div>
 <div className="flex gap-1.5 flex-wrap">
 <span className="text-[9px] text-zinc-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 tracking-wide lowercase">{type}</span>
 {size && <span className="text-[9px] text-zinc-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 lowercase">{size}</span>}
 </div>
 </div>
 </motion.div>
 );
};

const ServiceCard = ({ type }) => {
 const servicesMap = {
 design: { title: '01. design', cat: 'architecture & interiors', img: '/ServImgs/interior/inter6.webp', link: '/services#design' },
 build: { title: '02. build', cat: 'turnkey execution', img: '/ServImgs/design/design1.webp', link: '/services#build' },
 furniture: { title: '03. furniture', cat: 'integrated vertical', img: '/ServImgs/decor/decor2.webp', link: '/services#furniture' }
 };

 const service = servicesMap[type.toLowerCase()];
 if (!service) return null;

 return (
 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
 onClick={() => { window.location.href = service.link; }}
 className="bg-[#111111]/90 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 w-full h-full shadow-xl font-lato cursor-pointer group flex flex-col justify-between hover:border-white/40 transition-colors">
 <div className="h-[120px] shrink-0 overflow-hidden relative">
 <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
 </div>
 <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between lowercase">
 <div>
 <p className="text-white text-[13px] font-semibold tracking-wide leading-tight lowercase line-clamp-1">{service.title}</p>
 <p className="text-zinc-400 text-[11px] mt-1 lowercase">{service.cat}</p>
 </div>
 <div className="flex gap-1.5 flex-wrap">
 <span className="text-[9px] text-zinc-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 tracking-wide lowercase">view details</span>
 </div>
 </div>
 </motion.div>
 );
};

const ContactCard = () => (
 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
 className="bg-[#111111]/90 backdrop-blur-md rounded-xl border border-white/10 p-4 w-[260px] shadow-xl font-lato space-y-4">
 <h4 className="text-white text-[13px] font-semibold tracking-wide lowercase border-b border-white/10 pb-2">contact details</h4>
 <div className="space-y-3.5">
 <div className="flex items-center gap-3">
 <Phone size={14} className="text-zinc-400" />
 <a href="tel:+919810088877" className="text-zinc-300 text-xs hover:text-white transition-colors lowercase">+91-9810088877</a>
 </div>
 <div className="flex items-center gap-3">
 <Mail size={14} className="text-zinc-400" />
 <a href="mailto:info@essentia.in" className="text-zinc-300 text-xs hover:text-white transition-colors lowercase">info@essentia.in</a>
 </div>
 <div className="flex items-start gap-3">
 <MapPin size={14} className="text-zinc-400 mt-0.5 shrink-0" />
 <div className="text-zinc-300 text-[11px] space-y-1.5 lowercase">
 <p>• gurugram: sector 34</p>
 <p>• delhi: sultanpur</p>
 <p>• mumbai: lower parel</p>
 </div>
 </div>
 </div>
 <div className="flex gap-4 pt-3 border-t border-white/10">
 <a href="https://www.instagram.com/essentiaenvironments?igsh=andybGV5ZGRiMjhy" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors"><Instagram size={15} /></a>
 <a href="https://www.facebook.com/essentiaenvironment/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors"><Facebook size={15} /></a>
 <a href="https://www.linkedin.com/company/essentia-environments/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors"><Linkedin size={15} /></a>
 <a href="https://www.youtube.com/@essentiaenvironments" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors"><Youtube size={15} /></a>
 </div>
 </motion.div>
);

const FormConfirmCard = ({ data, onConfirm, onCancel, handled }) => (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-[#111111]/90 backdrop-blur-md rounded-xl border border-white/10 p-4 w-full max-w-[300px] shadow-xl font-lato space-y-3">
 <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
 <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 inline-block" />
 <h4 className="text-white text-[12px] font-semibold tracking-wide lowercase">form ready to submit</h4>
 </div>
 <p className="text-zinc-400 text-[11px] lowercase leading-relaxed">
 i've collected your details. shall i navigate to the contact page and submit this for you?
 </p>
 <div className="space-y-1.5 bg-white/[0.03] rounded-lg p-3 border border-white/5">
 {data.name && <div className="flex gap-2 text-[11px]"><span className="text-zinc-500 w-14 shrink-0">name</span><span className="text-zinc-200 lowercase">{data.name}</span></div>}
 {data.email && <div className="flex gap-2 text-[11px]"><span className="text-zinc-500 w-14 shrink-0">email</span><span className="text-zinc-200 lowercase">{data.email}</span></div>}
 {data.phone && <div className="flex gap-2 text-[11px]"><span className="text-zinc-500 w-14 shrink-0">phone</span><span className="text-zinc-200 lowercase">{data.phone}</span></div>}
 {data.message && <div className="flex gap-2 text-[11px]"><span className="text-zinc-500 w-14 shrink-0">note</span><span className="text-zinc-200 lowercase line-clamp-2">{data.message}</span></div>}
 </div>
 {!handled ? (
 <div className="flex gap-2 pt-0.5">
 <button onClick={onConfirm}
 className="flex-1 text-[11px] bg-white text-black py-2 rounded-lg font-semibold hover:bg-zinc-200 transition-colors lowercase tracking-wide">
 yes, submit
 </button>
 <button onClick={onCancel}
 className="flex-1 text-[11px] border border-white/20 text-zinc-400 py-2 rounded-lg hover:border-white/40 hover:text-white transition-colors lowercase tracking-wide">
 cancel
 </button>
 </div>
 ) : (
 <p className="text-zinc-500 text-[10px] lowercase tracking-widest text-center pt-0.5">handled ✓</p>
 )}
 </motion.div>
);

const DEFAULT_SUGGESTIONS = [
"show me projects",
"what are your services?",
"i want to start a project",
];

const CONFIRM_SUGGESTIONS = [
"yes, submit it",
"no, cancel",
];

const ChatbotWidget = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState(loadHistory);
 const [input, setInput] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [pendingFormData, setPendingFormData] = useState(null);
 const [awaitingSubmitConfirm, setAwaitingSubmitConfirm] = useState(false);
 const [handledConfirmIds, setHandledConfirmIds] = useState(new Set());

 const messagesEndRef = useRef(null);
 const messagesContainerRef = useRef(null);
 const inputRef = useRef(null);
 const navigate = useNavigate();
 const location = useLocation();

 useEffect(() => {
 messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 }, [messages]);

 useEffect(() => {
 if (isOpen) {
 setTimeout(() => {
 messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
 inputRef.current?.focus();
 }, 300);
 }
 }, [isOpen]);

 useEffect(() => { saveHistory(messages); }, [messages]);

 const addMsg = useCallback((msg) => setMessages(prev => [...prev, msg]), []);

 const handleFormConfirm = useCallback((data, msgIndex) => {
 setAwaitingSubmitConfirm(false);
 setPendingFormData(null);
 setHandledConfirmIds(prev => new Set([...prev, msgIndex]));
 saveLead({ ...data, source: 'ai_chatbot_confirm' });
 addMsg({ role: 'bot', content: 'perfect. navigating to the contact page and submitting your details now.' });
 setTimeout(() => navigate('/contact', { state: { formData: data, aiSubmit: true } }), 800);
 }, [navigate, addMsg]);

 const handleFormCancel = useCallback((msgIndex) => {
 setAwaitingSubmitConfirm(false);
 setPendingFormData(null);
 setHandledConfirmIds(prev => new Set([...prev, msgIndex]));
 addMsg({ role: 'bot', content: 'no problem — your details have been cleared. feel free to ask anything else or start over.' });
 }, [addMsg]);

 const handleSuggestionClick = (s) => {
 if (s ==="contact details") {
 addMsg({ role: 'user', content: s });
 addMsg({ role: 'contact_card' });
 setTimeout(() => { navigate('/contact'); }, 1800);
 return;
 }
 sendMessage(s);
 };

 const sendMessage = useCallback(async (text) => {
 const userText = (text || input).trim();
 if (!userText || isLoading) return;

 const userLower = userText.toLowerCase();
 addMsg({ role: 'user', content: userLower });
 setInput('');

 // Handle awaiting submit confirmation via typed text
 if (awaitingSubmitConfirm && pendingFormData) {
 const isYes = /^(yes|han|haan|haa|confirm|submit|go ahead|ok|sure|do it|fill it|send|submit it|yes submit)/i.test(userLower);
 const isNo = /^(no|nahi|nah|nahin|cancel|stop|don'?t|skip|clear)/i.test(userLower);

 if (isYes) {
 const lastConfirmIdx = messages.reduce((acc, m, i) => m.role === 'form_confirm' ? i : acc, -1);
 handleFormConfirm(pendingFormData, lastConfirmIdx);
 return;
 }
 if (isNo) {
 const lastConfirmIdx = messages.reduce((acc, m, i) => m.role === 'form_confirm' ? i : acc, -1);
 handleFormCancel(lastConfirmIdx);
 return;
 }
 }

 if (!import.meta.env.DEV && !API_KEY) {
 addMsg({ role: 'bot', content: 'api key missing. please add vite_groq_api_key to your .env file.' });
 return;
 }

 setIsLoading(true);

 try {
 const rawReply = await callClaude(userText, buildHistory(messages), buildSystemPrompt(location.pathname));
 const { reply, redirectTo, formData, projectSlugs, serviceTypes } = parseResponse(rawReply);

 if (reply) addMsg({ role: 'bot', content: reply.toLowerCase() });

 if (projectSlugs.length > 0) {
 addMsg({ role: 'projects', slugs: projectSlugs });
 }

 if (serviceTypes.length > 0) {
 addMsg({ role: 'services', services: serviceTypes });
 }

 if (formData) {
 const msgIdx = messages.length + (reply ? 1 : 0) + (projectSlugs.length > 0 ? 1 : 0) + (serviceTypes.length > 0 ? 1 : 0);
 setPendingFormData(formData);
 setAwaitingSubmitConfirm(true);
 addMsg({ role: 'form_confirm', data: formData, id: Date.now() });
 }

 if (redirectTo && !formData) {
 const targetPath = redirectTo.split('?')[0];
 if (targetPath !== location.pathname) {
 setTimeout(() => { navigate(targetPath); }, 1800);
 }
 }
 } catch (err) {
 console.error('chatbot error:', err);
 addMsg({ role: 'bot', content: 'something went wrong. please try again in a moment.' });
 } finally {
 setIsLoading(false);
 }
 }, [input, isLoading, messages, location.pathname, navigate, addMsg, awaitingSubmitConfirm, pendingFormData, handleFormConfirm, handleFormCancel]);

 const handleSubmit = (e) => { e.preventDefault(); sendMessage(); };

 const currentSuggestions = awaitingSubmitConfirm ? CONFIRM_SUGGESTIONS : DEFAULT_SUGGESTIONS;

 const waMessage = encodeURIComponent("hi essentia environments, i am interested in your luxury interior design and architectural services.");
 const waLink =`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

 return (
 <div className="fixed bottom-6 right-6 z-[100] font-lato">
 <AnimatePresence>
 {isOpen && (
 <motion.div
 initial={{ opacity: 0, y: 30, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 30, scale: 0.95 }}
 transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
 className="absolute bottom-[76px] right-0 w-[90vw] max-w-[400px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
 style={{ maxHeight: 'calc(100vh - 120px)', height: '620px' }}
 >
 {/* Header */}
 <div className="bg-white/[0.03] backdrop-blur-md border-b border-white/10 px-5 py-4 flex items-center justify-between flex-shrink-0">
 <div className="flex items-center gap-3.5">
 <div className="relative">
 <div className="w-9 h-9 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center shadow-inner">
 <img src="/essentia.png" alt="" className="w-5 h-5 opacity-80" />
 </div>
 <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-black" />
 </div>
 <div>
 <p className="text-white text-sm font-semibold tracking-wider lowercase">essentia assistant</p>
 <p className="text-zinc-400 text-[10px] tracking-widest lowercase mt-0.5">powered by groq</p>
 </div>
 </div>
 <button onClick={() => setIsOpen(false)}
 className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5">
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 </div>

 {/* Messages Container */}
 <div ref={messagesContainerRef}
 className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 chat-scroll bg-gradient-to-b from-transparent to-black/30 w-full"
 style={{ overscrollBehavior: 'contain' }}
 onWheel={(e) => e.stopPropagation()}>

 {messages.map((msg, i) => {
 if (msg.role === 'projects') {
 return (
 <div key={i} className="flex overflow-x-auto gap-3 py-1 snap-x slider-scroll w-full pb-3">
 {msg.slugs.slice(0, 5).map(slug => (
 <div key={slug} className="snap-start shrink-0 w-[200px] h-[220px]">
 <ProjectCard slug={slug} onNavigate={navigate} />
 </div>
 ))}
 </div>
 );
 }
 if (msg.role === 'services') {
 return (
 <div key={i} className="flex overflow-x-auto gap-3 py-1 snap-x slider-scroll w-full pb-3">
 {msg.services.map(type => (
 <div key={type} className="snap-start shrink-0 w-[200px] h-[220px]">
 <ServiceCard type={type} />
 </div>
 ))}
 </div>
 );
 }
 if (msg.role === 'contact_card') {
 return (
 <div key={i} className="flex justify-start py-1">
 <ContactCard />
 </div>
 );
 }
 if (msg.role === 'form_confirm') {
 const isHandled = handledConfirmIds.has(i) || handledConfirmIds.has(msg.id);
 return (
 <div key={i} className="flex justify-start py-1">
 <FormConfirmCard
 data={msg.data}
 handled={isHandled}
 onConfirm={() => handleFormConfirm(msg.data, i)}
 onCancel={() => handleFormCancel(i)}
 />
 </div>
 );
 }
 if (msg.role === 'lead') return null;

 return (
 <motion.div key={i}
 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
 className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
 <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap shadow-md lowercase ${
 msg.role === 'user'
 ? 'bg-white text-black rounded-tr-none font-normal'
 : 'bg-white/[0.04] border border-white/10 text-zinc-200 rounded-tl-none font-light'
 }`}>
 {msg.role === 'bot' ? <MessageContent text={msg.content} /> : msg.content}
 </div>
 </motion.div>
 );
 })}

 {isLoading && (
 <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
 <div className="bg-white/[0.04] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
 {[0, 0.15, 0.3].map((delay, i) => (
 <motion.span key={i} className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
 animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay }} />
 ))}
 </div>
 </motion.div>
 )}
 <div ref={messagesEndRef} />
 </div>

 {/* Suggestion Chips */}
 <AnimatePresence mode="wait">
 {!isLoading && (
 <motion.div
 key={awaitingSubmitConfirm ? 'confirm' : 'default'}
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 className="px-4 pb-3 pt-2.5 flex flex-wrap gap-2 flex-shrink-0 border-t border-white/5 bg-black/20 lowercase">
 {currentSuggestions.map((s) => (
 <button key={s} onClick={() => handleSuggestionClick(s)}
 className={`text-[11px] border rounded-full px-3.5 py-1.5 transition-all bg-white/[0.02] tracking-wide font-light lowercase ${
 awaitingSubmitConfirm && s === 'yes, submit it'
 ? 'text-white border-white/40 hover:bg-white/10'
 : 'text-zinc-400 border-white/10 hover:border-white hover:text-white'
 }`}>
 {s}
 </button>
 ))}
 </motion.div>
 )}
 </AnimatePresence>

 {/* Input Bar */}
 <form onSubmit={handleSubmit} className="px-4 pt-3 pb-2.5 bg-black/60 border-t border-white/10 flex gap-2.5 flex-shrink-0">
 <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)}
 placeholder={awaitingSubmitConfirm ?"type yes to submit or no to cancel..." :"ask anything or describe your project..."}
 disabled={isLoading}
 className="flex-1 bg-white/[0.03] border border-white/10 text-white text-[13px] px-4 py-3 rounded-xl focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-500 disabled:opacity-50 font-light lowercase" />
 <button type="submit" disabled={isLoading || !input.trim()}
 className="bg-white text-black px-4 py-3 rounded-xl text-sm font-medium hover:bg-zinc-200 transition-colors flex-shrink-0 shadow-lg disabled:opacity-40">
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
 </svg>
 </button>
 </form>

 {/* Powered by */}
 <div className="bg-black/60 pb-3 flex justify-center flex-shrink-0">
 <p className="text-[10px] text-zinc-500 tracking-widest lowercase font-light">
 powered by groq
 </p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Trigger Button */}
 <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(o => !o)}
 className="w-14 h-14 bg-white text-black rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center justify-center border border-white/20 relative group">
 <AnimatePresence mode="wait">
 {isOpen ? (
 <motion.svg key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.25 }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </motion.svg>
 ) : (
 <motion.svg key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.25 }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
 </motion.svg>
 )}
 </AnimatePresence>
 {!isOpen && <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />}
 </motion.button>

 <style>{`
 .chat-scroll { scrollbar-width: none; }
 .chat-scroll::-webkit-scrollbar { display: none; }
 .slider-scroll {
 overflow-x: auto;
 overflow-y: hidden;
 scrollbar-width: thin;
 scrollbar-color: rgba(255,255,255,0.3) rgba(255,255,255,0.02);
 }
 .slider-scroll::-webkit-scrollbar { height: 6px; }
 .slider-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 10px; margin: 0 10px; }
 .slider-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
 .slider-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.6); }
`}</style>
 </div>
 );
};

export default ChatbotWidget;

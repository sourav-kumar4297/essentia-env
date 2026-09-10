import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeroSection from '../Components/PageHeroSection';

const API_BASE = import.meta.env.VITE_API_URL || 'https://essentia-backend-mail.vercel.app';
const LIMIT = 24;

const gridItem = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const TABS = ['carousel', 'reels', 'all'];

// ==========================================
// POST CARD
// ==========================================
const PostCard = ({ post, onClick, index }) => {
    const isVideo = post.media_type === 'VIDEO';
    const isCarousel = post.media_type === 'CAROUSEL_ALBUM';
    const thumb = isVideo ? post.thumbnail_url : post.media_url;
    const isEager = index < 8;

    const handleClick = () => {
        // Full image preload karo click ke saath hi
        if (!isVideo) {
            const img = new Image();
            img.src = post.media_url;
        }
        onClick(post);
    };

    return (
        <motion.div
            variants={gridItem}
            initial="hidden"
            animate="visible"
            className="relative aspect-square overflow-hidden bg-zinc-900 cursor-pointer group border border-white/5"
            onClick={handleClick}
            whileHover={{ scale: 1.01 }}
        >
            <img
                src={thumb}
                alt={post.caption?.slice(0, 40) || ''}
                loading={isEager ? "eager" : "lazy"}
                decoding={isEager ? "sync" : "async"}
                fetchPriority={isEager ? "high" : "low"}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
                style={{ willChange: 'transform' }}
            />

            {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-black/50 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <polygon points="5,3 19,12 5,21" />
                        </svg>
                    </div>
                </div>
            )}

            {isCarousel && (
                <div className="absolute top-2 right-2 pointer-events-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <rect x="2" y="2" width="9" height="9"/><rect x="13" y="2" width="9" height="9"/>
                        <rect x="2" y="13" width="9" height="9"/><rect x="13" y="13" width="9" height="9"/>
                    </svg>
                </div>
            )}

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                {post.caption && (
                    <p className="text-white text-xs font-light lowercase line-clamp-2 leading-relaxed">
                        {post.caption}
                    </p>
                )}
                <div className="flex gap-3 mt-1.5 text-white/60 text-xs">
                    {post.like_count !== undefined && <span>♥ {post.like_count?.toLocaleString()}</span>}
                    {post.comments_count !== undefined && <span>💬 {post.comments_count}</span>}
                </div>
            </div>
        </motion.div>
    );
};

// ==========================================
// LIGHTBOX
// ==========================================
const LightboxModal = ({ post, onClose }) => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const isCarousel = post.media_type === 'CAROUSEL_ALBUM';
    const children = post.children || [];
    const currentMedia = isCarousel && children.length > 0 ? children[carouselIndex] : post;
    const isCurrentVideo = currentMedia.media_type === 'VIDEO';

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);

    // Next/prev images preload karo carousel mein
    useEffect(() => {
        if (isCarousel && children.length > 0) {
            const next = children[carouselIndex + 1];
            const prev = children[carouselIndex - 1];
            [next, prev].forEach(item => {
                if (item && item.media_url) {
                    const img = new Image();
                    img.src = item.media_url;
                }
            });
        }
    }, [carouselIndex, children, isCarousel]);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <button
                className="absolute top-5 right-6 text-white text-4xl hover:text-zinc-400 z-[1000] font-thin"
                onClick={onClose}
            >
                &times;
            </button>

            <motion.div
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-5xl flex flex-col md:flex-row bg-[#0c0c0c] border border-white/10 overflow-hidden max-h-[90vh]"
                onClick={e => e.stopPropagation()}
            >
                {/* Media Side */}
                <div className="relative md:w-3/5 aspect-square md:aspect-auto bg-black flex items-center justify-center">
                    {isCurrentVideo ? (
                        <video
                            src={currentMedia.media_url}
                            controls autoPlay playsInline
                            className="w-full h-full object-contain max-h-[70vh] md:max-h-[90vh]"
                        />
                    ) : (
                        <img
                            src={currentMedia.media_url}
                            alt=""
                            fetchPriority="high"
                            className="w-full h-full object-contain max-h-[70vh] md:max-h-[90vh]"
                        />
                    )}

                    {isCarousel && children.length > 1 && (
                        <>
                            <button
                                onClick={() => setCarouselIndex(i => Math.max(0, i - 1))}
                                disabled={carouselIndex === 0}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white text-xl disabled:opacity-30"
                            >‹</button>
                            <button
                                onClick={() => setCarouselIndex(i => Math.min(children.length - 1, i + 1))}
                                disabled={carouselIndex === children.length - 1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white text-xl disabled:opacity-30"
                            >›</button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {children.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCarouselIndex(i)}
                                        className={`h-1.5 rounded-full transition-all ${i === carouselIndex ? 'bg-white w-4' : 'bg-white/40 w-1.5'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Info Side */}
                <div className="md:w-2/5 flex flex-col p-6 overflow-y-auto max-h-[40vh] md:max-h-[90vh]">
                    <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs lowercase tracking-widest transition-colors mb-5"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        view on instagram
                    </a>

                    {post.caption && (
                        <p className="text-zinc-300 text-sm font-light leading-relaxed lowercase mb-6 flex-1">
                            {post.caption}
                        </p>
                    )}

                    <div className="flex gap-6 text-zinc-500 text-sm pt-4 border-t border-white/10">
                        {post.like_count !== undefined && <span>♥ {post.like_count?.toLocaleString()}</span>}
                        {post.comments_count !== undefined && <span>💬 {post.comments_count}</span>}
                    </div>

                    {post.timestamp && (
                        <p className="text-zinc-600 text-xs mt-3 lowercase tracking-widest">
                            {new Date(post.timestamp).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'long', year: 'numeric'
                            })}
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ==========================================
// MAIN PAGE
// ==========================================
function EssentiaEdits() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedPost, setSelectedPost] = useState(null);
    const loaderRef = useRef(null);
    const fetchingRef = useRef(false);

    const fetchPage = useCallback(async (pageNum) => {
        if (fetchingRef.current) return;
        fetchingRef.current = true;
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/instagram/all-posts?page=${pageNum}&limit=${LIMIT}`);
            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            // Dedup safety net — backend ke half-warm fallback se duplicate IDs aa sakti hain
            setPosts(prev => {
                if (pageNum === 1) return data.data;
                const seen = new Set(prev.map(p => p.id));
                return [...prev, ...data.data.filter(p => !seen.has(p.id))];
            });
            setHasMore(data.hasMore);
            if (data.total) setTotal(data.total);
        } catch (err) {
            setError('Could not load posts.');
        } finally {
            setLoading(false);
            setInitialLoad(false);
            fetchingRef.current = false;
        }
    }, []);

    // Initial load
    useEffect(() => { fetchPage(1); }, [fetchPage]);

    // Infinite scroll — observer sirf page increment kare (pure)
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading && !fetchingRef.current) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.1, rootMargin: '200px' }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading]);

    // page change pe hi fetch (page 1 initial effect handle karta hai)
    useEffect(() => {
        if (page > 1) fetchPage(page);
    }, [page, fetchPage]);

    const filtered = activeTab === 'all' ? posts
        : activeTab === 'reels' ? posts.filter(p => p.media_type === 'VIDEO')
        : posts.filter(p => p.media_type === 'CAROUSEL_ALBUM');

    return (
        <div className="min-h-screen bg-black text-white font-lato">
            <PageHeroSection
                image="/Media/media-hero.webp"
                title="essentia edits"
                category="our world through the lens"
            />

            <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">

                {/* Header */}
                <div className="mb-12">
                    <span className="text-7xl font-serif text-zinc-700 block -mb-8 leading-none">"</span>
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight lowercase">our instagram</h2>
                    <p className="text-xl font-light text-zinc-400 mt-4 lowercase">
                        {total ? `${total} posts · ` : ''}follow us @essentiaenvironments
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-3 flex-wrap mb-10">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 text-sm lowercase tracking-widest border transition-all duration-300 ${
                                activeTab === tab
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-white hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Skeleton */}
                {initialLoad && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div key={i} className="aspect-square bg-zinc-900 animate-pulse" />
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && !initialLoad && (
                    <div className="text-center py-32">
                        <p className="text-zinc-500 text-sm lowercase tracking-widest">{error}</p>
                    </div>
                )}

                {/* Grid */}
                {!initialLoad && !error && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
                        {filtered.map((post, index) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onClick={setSelectedPost}
                                index={index}
                            />
                        ))}
                    </div>
                )}

                {/* Infinite Scroll Loader */}
                <div ref={loaderRef} className="py-10 flex justify-center">
                    {loading && !initialLoad && (
                        <div className="flex items-center gap-3 text-zinc-500 text-sm lowercase tracking-widest">
                            <div className="w-5 h-5 border border-white/20 border-t-white rounded-full animate-spin" />
                            loading more...
                        </div>
                    )}
                    {!hasMore && posts.length > 0 && (
                        <p className="text-zinc-600 text-xs lowercase tracking-widest">
                            all {total || posts.length} posts loaded
                        </p>
                    )}
                </div>

                {/* Instagram CTA */}
                <div className="text-center mt-8">
                    <a
                        href="https://www.instagram.com/essentiaenvironments"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 border border-zinc-700 hover:border-white text-zinc-400 hover:text-white px-8 py-4 text-sm lowercase tracking-widest transition-all duration-300"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        follow @essentiaenvironments
                    </a>
                </div>
            </section>

            <AnimatePresence>
                {selectedPost && (
                    <LightboxModal post={selectedPost} onClose={() => setSelectedPost(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default EssentiaEdits;
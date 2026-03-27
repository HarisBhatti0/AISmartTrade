import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaAward,
  FaArrowRight,
  FaStar,
  FaShoppingBag,
  FaPercentage,
  FaLayerGroup,
  FaBolt,
} from "react-icons/fa";
import API from "../../../api/axiosInstance";
import heroBackground from "../../../assets/HeroBackgroun.jpeg";

/* ─── Inline styles & keyframes injected once ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --neon-blue:   #00d4ff;
    --neon-purple: #7c3aed;
    --neon-cyan:   #06ffd4;
    --neon-pink:   #f000ff;
    --glass-bg:    rgba(255,255,255,0.04);
    --glass-border:rgba(255,255,255,0.12);
    --dark-base:   #050810;
  }

  /* ---------- KEYFRAMES ---------- */
  @keyframes heroFloat {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    33%     { transform: translateY(-12px) rotate(1deg); }
    66%     { transform: translateY(-6px) rotate(-1deg); }
  }
  @keyframes floatBadge {
    0%,100% { transform: rotate(6deg) translateY(0); }
    50%     { transform: rotate(6deg) translateY(-8px); }
  }
  @keyframes floatBadge2 {
    0%,100% { transform: rotate(-6deg) translateY(0); }
    50%     { transform: rotate(-6deg) translateY(-10px); }
  }
  @keyframes neonPulse {
    0%,100% { box-shadow: 0 0 8px var(--neon-blue), 0 0 20px rgba(0,212,255,0.3); }
    50%     { box-shadow: 0 0 16px var(--neon-blue), 0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.15); }
  }
  @keyframes scanLine {
    0%   { transform: translateY(-100%); opacity: 0; }
    10%  { opacity: 0.6; }
    90%  { opacity: 0.6; }
    100% { transform: translateY(900%); opacity: 0; }
  }
  @keyframes gridPulse {
    0%,100% { opacity: 0.04; }
    50%     { opacity: 0.08; }
  }
  @keyframes statReveal {
    0%   { opacity:0; transform:translateY(20px) scale(0.9); }
    100% { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes searchGlow {
    0%,100% { box-shadow: 0 0 0 0 rgba(0,212,255,0); }
    50%     { box-shadow: 0 0 0 3px rgba(0,212,255,0.2), 0 0 20px rgba(0,212,255,0.15); }
  }
  @keyframes orbMove {
    0%,100% { transform: translate(0,0) scale(1); }
    25%     { transform: translate(30px,-20px) scale(1.05); }
    75%     { transform: translate(-20px,15px) scale(0.97); }
  }
  @keyframes dotBlink {
    0%,100% { opacity:1; transform:scale(1); }
    50%     { opacity:0.4; transform:scale(0.7); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes featureIn {
    0%   { opacity:0; transform:translateY(30px); }
    100% { opacity:1; transform:translateY(0); }
  }

  /* ---------- HERO WRAPPER ---------- */
  .hero-futuristic {
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    background: var(--dark-base);
    color: #fff;
    min-height: 100vh;
  }

  /* Animated grid overlay */
  .hero-futuristic::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridPulse 4s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  /* Scan line */
  .hero-scan-line {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--neon-blue), transparent);
    animation: scanLine 6s linear infinite;
    z-index: 2;
    pointer-events: none;
  }

  /* Glowing orbs */
  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 1;
  }
  .hero-orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%);
    top: -150px; left: -100px;
    animation: orbMove 12s ease-in-out infinite;
  }
  .hero-orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(0,212,255,0.25) 0%, transparent 70%);
    top: 100px; right: -80px;
    animation: orbMove 15s ease-in-out infinite reverse;
  }
  .hero-orb-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(6,255,212,0.18) 0%, transparent 70%);
    bottom: 50px; left: 40%;
    animation: orbMove 10s ease-in-out infinite 2s;
  }

  /* BG image + overlay */
  .hero-bg-img {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    z-index: 0;
  }
  .hero-bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(5,8,16,0.92) 0%,
      rgba(12,10,30,0.88) 40%,
      rgba(5,8,16,0.85) 100%);
    z-index: 0;
  }

  /* ---------- BADGE ---------- */
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: rgba(0,212,255,0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0,212,255,0.25);
    border-radius: 50px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--neon-blue);
    margin-bottom: 24px;
  }
  .hero-badge-dot {
    width: 7px; height: 7px;
    background: var(--neon-cyan);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--neon-cyan);
    animation: dotBlink 1.5s ease-in-out infinite;
  }

  /* ---------- HEADING ---------- */
  .hero-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2rem, 5vw, 3.8rem);
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -1px;
    margin: 0 0 20px;
  }
  .hero-title-gradient {
    background: linear-gradient(135deg, var(--neon-blue) 0%, var(--neon-cyan) 50%, var(--neon-purple) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
    display: block;
  }

  /* ---------- SEARCH BAR ---------- */
  .hero-search-wrap {
    position: relative;
    max-width: 560px;
    margin-bottom: 16px;
  }
  .hero-search-input {
    width: 100%;
    padding: 16px 140px 16px 52px;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0,212,255,0.2);
    border-radius: 16px;
    color: #fff;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
  }
  .hero-search-input::placeholder { color: rgba(255,255,255,0.35); }
  .hero-search-input:focus {
    border-color: var(--neon-blue);
    box-shadow: 0 0 0 3px rgba(0,212,255,0.15), 0 0 30px rgba(0,212,255,0.1);
    animation: searchGlow 2s ease-in-out infinite;
  }
  .hero-search-icon {
    position: absolute;
    left: 18px; top: 50%;
    transform: translateY(-50%);
    color: rgba(0,212,255,0.7);
    font-size: 16px;
    pointer-events: none;
  }
  .hero-search-btn {
    position: absolute;
    right: 6px; top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    font-weight: 600;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: transform 0.2s, box-shadow 0.3s;
    box-shadow: 0 0 16px rgba(0,212,255,0.4);
    white-space: nowrap;
  }
  .hero-search-btn:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 0 28px rgba(0,212,255,0.6), 0 0 60px rgba(124,58,237,0.3);
  }

  /* Trending tags */
  .trending-tag {
    font-size: 11px;
    background: rgba(0,212,255,0.06);
    border: 1px solid rgba(0,212,255,0.15);
    color: rgba(255,255,255,0.7);
    padding: 4px 12px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.25s;
    white-space: nowrap;
  }
  .trending-tag:hover {
    background: rgba(0,212,255,0.15);
    border-color: var(--neon-blue);
    color: var(--neon-blue);
    box-shadow: 0 0 12px rgba(0,212,255,0.2);
    transform: translateY(-1px);
  }

  /* ---------- STATS ---------- */
  .stat-card {
    text-align: center;
    animation: statReveal 0.6s ease-out both;
  }
  .stat-icon-wrap {
    width: 52px; height: 52px;
    background: rgba(0,212,255,0.08);
    border: 1px solid rgba(0,212,255,0.2);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 10px;
    transition: all 0.3s;
  }
  .stat-card:hover .stat-icon-wrap {
    background: rgba(0,212,255,0.15);
    border-color: var(--neon-blue);
    box-shadow: 0 0 20px rgba(0,212,255,0.3);
    transform: scale(1.08);
  }
  .stat-number {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--neon-blue);
  }
  .stat-label { font-size: 11px; color: rgba(255,255,255,0.5); letter-spacing: 0.5px; }

  /* ---------- 3D GLASS CARD ---------- */
  .hero-card-3d {
    position: relative;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 28px;
    padding: 36px 32px;
    width: 100%;
    max-width: 380px;
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out, box-shadow 0.3s;
    animation: heroFloat 7s ease-in-out infinite;
    box-shadow:
      0 0 0 1px rgba(0,212,255,0.1),
      0 20px 60px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.08);
    animation: neonPulse 3s ease-in-out infinite, heroFloat 7s ease-in-out infinite;
  }
  .hero-card-3d::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 28px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(0,212,255,0.4), transparent 50%, rgba(124,58,237,0.4));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .card-exclusive-badge {
    position: absolute;
    top: -14px; right: 16px;
    background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
    color: #fff;
    padding: 5px 14px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: 0 0 20px rgba(0,212,255,0.5);
    white-space: nowrap;
  }

  .card-icon-wrap {
    width: 72px; height: 72px;
    background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
    border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    box-shadow: 0 0 30px rgba(0,212,255,0.4), 0 10px 30px rgba(124,58,237,0.3);
  }

  .card-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
    margin: 0 0 4px;
  }
  .card-subtitle { text-align:center; color: rgba(255,255,255,0.5); font-size:13px; margin-bottom:20px; }

  .pricing-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 13px;
    margin-bottom: 6px;
    transition: background 0.2s;
  }
  .pricing-row:hover { background: rgba(0,212,255,0.06); }
  .pricing-row.highlighted {
    background: rgba(0,212,255,0.08);
    border: 1px solid rgba(0,212,255,0.2);
  }
  .pricing-label { color: rgba(255,255,255,0.6); }
  .pricing-label.bright { color: #fff; font-weight: 600; }
  .pricing-discount { color: #00ff94; font-weight: 700; font-size: 13px; }

  .card-cta-btn {
    width: 100%;
    margin-top: 20px;
    padding: 14px;
    background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15));
    border: 1px solid rgba(0,212,255,0.3);
    color: var(--neon-blue);
    border-radius: 14px;
    font-weight: 700;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
    letter-spacing: 0.5px;
  }
  .card-cta-btn:hover {
    background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
    color: #fff;
    border-color: transparent;
    box-shadow: 0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(124,58,237,0.3);
    transform: translateY(-2px);
  }

  /* Floating mini cards */
  .float-badge {
    position: absolute;
    background: rgba(10,12,25,0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 12px 16px;
    display: flex; align-items: center; gap: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    z-index: 20;
    white-space: nowrap;
  }
  .float-badge-left {
    top: 20px; left: -30px;
    animation: floatBadge 3.5s ease-in-out infinite;
  }
  .float-badge-right {
    bottom: 20px; right: -30px;
    animation: floatBadge2 4s ease-in-out infinite;
  }
  .float-icon-wrap {
    width: 38px; height: 38px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
  }
  .float-label { font-weight: 700; font-size: 13px; color: #fff; }
  .float-sub { font-size: 10px; color: rgba(255,255,255,0.45); }

  /* Card glow backdrop */
  .card-glow-wrap {
    position: absolute;
    inset: -40px;
    background: radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    pointer-events: none;
  }

  /* ---------- FEATURES STRIP ---------- */
  .features-strip {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 40px 0 32px;
  }
  .feature-item {
    text-align: center;
    padding: 16px 8px;
    border-radius: 16px;
    transition: all 0.3s;
    animation: featureIn 0.6s ease-out both;
    cursor: default;
  }
  .feature-item:hover {
    background: rgba(0,212,255,0.05);
    transform: translateY(-4px);
  }
  .feature-icon-wrap {
    width: 56px; height: 56px;
    background: rgba(0,212,255,0.07);
    border: 1px solid rgba(0,212,255,0.15);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 12px;
    font-size: 20px;
    color: var(--neon-blue);
    transition: all 0.3s;
  }
  .feature-item:hover .feature-icon-wrap {
    background: rgba(0,212,255,0.15);
    border-color: var(--neon-blue);
    box-shadow: 0 0 20px rgba(0,212,255,0.3);
    transform: scale(1.1) rotate(-3deg);
  }
  .feature-title { font-weight: 600; font-size: 14px; margin-bottom: 4px; color: #fff; }
  .feature-desc { font-size: 12px; color: rgba(255,255,255,0.45); }

  /* ---------- WAVE ---------- */
  .hero-wave { color: #fff; }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 768px) {
    .hero-card-3d { max-width: 100%; }
    .float-badge-left { left: -10px; top: 10px; }
    .float-badge-right { right: -10px; bottom: 10px; }
    .hero-title { font-size: clamp(1.6rem, 8vw, 2.4rem); }
  }
`;

/* ─── 3D Tilt Hook ─── */
function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = (clientX - cx) / (rect.width / 2);
      const dy = (clientY - cy) / (rect.height / 2);
      el.style.transform = `perspective(800px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg) scale(1.02)`;
      el.style.animationPlayState = "paused";
    };
    const handleLeave = () => {
      el.style.transform = "";
      el.style.animationPlayState = "running";
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("touchmove", handleMove, { passive: true });
    el.addEventListener("touchend", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);
}

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cardRef = useRef(null);
  useTilt(cardRef);

  const featuredStats = [
    { number: "10K+", label: "Happy Customers", icon: FaStar },
    { number: "5K+", label: "Products", icon: FaShoppingBag },
    { number: "100+", label: "Brands", icon: FaAward },
    { number: "24/7", label: "Support", icon: FaHeadset },
  ];

  const features = [
    { icon: FaShippingFast, title: "Free Shipping", description: "Free delivery on orders" },
    { icon: FaShieldAlt, title: "Secure Payment", description: "100% secure processing" },
    { icon: FaAward, title: "Quality Assured", description: "30-day return policy" },
    { icon: FaHeadset, title: "24/7 Support", description: "Always here for you" },
  ];

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const response = await API.get("/products/trending/products?limit=6");
        if (response.data.trendingProducts?.length > 0) {
          setTrendingSearches(response.data.trendingProducts.map((p) => p.name));
        } else throw new Error();
      } catch {
        setTrendingSearches(["Wireless Headphones", "Smart Watches", "Fitness Trackers", "Home Decor"]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };
  const handleTrendingSearch = (s) => {
    setSearchTerm(s);
    navigate(`/products?search=${encodeURIComponent(s)}`);
  };
  const handleBusinessPricing = () => navigate("/products?bulkPricing=yes");

  return (
    <>
      <style>{STYLES}</style>

      <div className="hero-futuristic" style={{ backgroundImage: "none" }}>
        {/* BG image */}
        <div
          className="hero-bg-img"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="hero-bg-overlay" />

        {/* Orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        {/* Scan line */}
        <div className="hero-scan-line" />

        {/* ═══ MAIN CONTENT ═══ */}
        <div style={{ position: "relative", zIndex: 5 }}>
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "48px",
                alignItems: "center",
                minHeight: "85vh",
                paddingTop: 80,
                paddingBottom: 40,
              }}
            >
              {/* ── LEFT COLUMN ── */}
              <div style={{ zIndex: 10 }}>
                {/* Badge */}
                <div className="hero-badge">
                  <div className="hero-badge-dot" />
                  Welcome to AISmartTrade
                </div>

                {/* Title */}
                <h1 className="hero-title">
                  Discover Amazing
                  <span className="hero-title-gradient">Products & Deals</span>
                </h1>

                <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontSize: 16, marginBottom: 36, maxWidth: 520 }}>
                  Shop from thousands of verified B2B sellers. Find the best prices, exclusive bulk offers, and quality products delivered worldwide.
                </p>

                {/* Search */}
                <div className="hero-search-wrap">
                  <form onSubmit={handleSearch}>
                    <FaSearch className="hero-search-icon" />
                    <input
                      type="text"
                      placeholder="Search products, brands, categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="hero-search-input"
                    />
                    <button type="submit" className="hero-search-btn">
                      Search <FaArrowRight size={11} />
                    </button>
                  </form>

                  {/* Trending */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 1, textTransform: "uppercase" }}>Trending:</span>
                    {loading
                      ? [0,1,2,3].map((i) => (
                          <div key={i} style={{ height: 24, width: 80, background: "rgba(255,255,255,0.06)", borderRadius: 50, animation: "gridPulse 1.5s ease-in-out infinite" }} />
                        ))
                      : trendingSearches.slice(0, 4).map((s, i) => (
                          <button key={i} onClick={() => handleTrendingSearch(s)} className="trending-tag">
                            {s.length > 15 ? s.substring(0, 15) + "…" : s}
                          </button>
                        ))}
                  </div>
                </div>

                {/* Stats */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 16,
                    marginTop: 40,
                  }}
                >
                  {featuredStats.map((stat, i) => (
                    <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="stat-icon-wrap">
                        <stat.icon style={{ color: "var(--neon-blue)", fontSize: 20 }} />
                      </div>
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT COLUMN: 3D Card ── */}
              <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                <div style={{ position: "relative", width: "100%", maxWidth: 400 }}>
                  {/* Glow backdrop */}
                  <div className="card-glow-wrap" />

                  {/* Main 3D card */}
                  <div ref={cardRef} className="hero-card-3d">
                    <div className="card-exclusive-badge">🏢 B2B Exclusive</div>

                    <div className="card-icon-wrap">
                      <FaLayerGroup style={{ color: "#fff", fontSize: 28 }} />
                    </div>

                    <div className="card-title">Bulk Pricing</div>
                    <div className="card-subtitle">Scale Your Business</div>

                    {[
                      { range: "10–49 units", disc: "15% OFF", highlight: false },
                      { range: "50–99 units", disc: "25% OFF", highlight: false },
                      { range: "100+ units",  disc: "40% OFF", highlight: true  },
                    ].map((row, i) => (
                      <div key={i} className={`pricing-row ${row.highlight ? "highlighted" : ""}`}>
                        <span className={`pricing-label ${row.highlight ? "bright" : ""}`}>{row.range}</span>
                        <span className="pricing-discount">{row.disc}</span>
                      </div>
                    ))}

                    <button onClick={handleBusinessPricing} className="card-cta-btn">
                      <FaBolt style={{ marginRight: 6 }} />
                      Browse Bulk Deals
                    </button>
                  </div>

                  {/* Floating badge — top left */}
                  <div className="float-badge float-badge-left">
                    <div className="float-icon-wrap" style={{ background: "rgba(0,255,148,0.12)" }}>
                      <FaShieldAlt style={{ color: "#00ff94" }} />
                    </div>
                    <div>
                      <div className="float-label">Verified</div>
                      <div className="float-sub">Suppliers</div>
                    </div>
                  </div>

                  {/* Floating badge — bottom right */}
                  <div className="float-badge float-badge-right">
                    <div className="float-icon-wrap" style={{ background: "rgba(0,212,255,0.12)" }}>
                      <FaPercentage style={{ color: "var(--neon-blue)" }} />
                    </div>
                    <div>
                      <div className="float-label">Save 60%</div>
                      <div className="float-sub">Max Discount</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── FEATURES STRIP ── */}
            <div className="features-strip">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: 12,
                }}
              >
                {features.map((f, i) => (
                  <div key={i} className="feature-item" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                    <div className="feature-icon-wrap">
                      <f.icon />
                    </div>
                    <div className="feature-title">{f.title}</div>
                    <div className="feature-desc">{f.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── WAVE ── */}
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "100%", height: 48, display: "block" }}>
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".08" fill="currentColor"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".15" fill="currentColor"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
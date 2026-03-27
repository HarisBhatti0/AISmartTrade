import React, { useState, useEffect, useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaStore,
  FaClock,
  FaRobot,
  FaSync,
  FaExclamationTriangle,
  FaEye,
  FaMousePointer,
  FaPercentage,
  FaFire,
  FaCrown,
  FaGem,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import API from "../../../api/axiosInstance";

/* ─── Styles ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --nb: #00d4ff;
    --np: #7c3aed;
    --nc: #06ffd4;
    --ng: #00ff94;
    --dark: #060912;
    --glass: rgba(255,255,255,0.04);
    --gb: rgba(0,212,255,0.12);
  }

  @keyframes acPulse {
    0%,100%{ box-shadow:0 0 12px rgba(0,212,255,0.3),0 0 40px rgba(0,212,255,0.1); }
    50%    { box-shadow:0 0 24px rgba(0,212,255,0.6),0 0 80px rgba(124,58,237,0.25); }
  }
  @keyframes acScan {
    0%  { transform:translateX(-100%); }
    100%{ transform:translateX(200%); }
  }
  @keyframes acOrb {
    0%,100%{ transform:translate(0,0) scale(1); }
    50%    { transform:translate(20px,-15px) scale(1.06); }
  }
  @keyframes acGrid {
    0%,100%{ opacity:.035; }
    50%    { opacity:.07; }
  }
  @keyframes acDot {
    0%,100%{ opacity:.4; transform:scale(.8); }
    50%    { opacity:1;  transform:scale(1.3); }
  }
  @keyframes acShimmer {
    0%  { background-position:-400px 0; }
    100%{ background-position:400px 0; }
  }
  @keyframes acSpin {
    to{ transform:rotate(360deg); }
  }
  @keyframes acFadeUp {
    from{ opacity:0; transform:translateY(20px); }
    to  { opacity:1; transform:translateY(0); }
  }
  @keyframes acGlow {
    0%,100%{ box-shadow:0 0 8px rgba(0,212,255,.4); }
    50%    { box-shadow:0 0 20px rgba(0,212,255,.9),0 0 40px rgba(124,58,237,.4); }
  }

  /* ── wrapper ── */
  .ac-root {
    width:100%;
    background:var(--dark);
    border:1px solid var(--gb);
    border-radius:24px;
    overflow:hidden;
    position:relative;
    font-family:'Inter',sans-serif;
    animation:acPulse 4s ease-in-out infinite;
  }
  .ac-root::before {
    content:'';
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px);
    background-size:48px 48px;
    animation:acGrid 4s ease-in-out infinite;
    pointer-events:none; z-index:0;
  }
  /* gradient border */
  .ac-root::after {
    content:'';
    position:absolute; inset:-1px;
    border-radius:24px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.35),transparent 50%,rgba(124,58,237,.35));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    pointer-events:none; z-index:0;
  }

  /* orbs */
  .ac-orb {
    position:absolute; border-radius:50%;
    filter:blur(70px); pointer-events:none; z-index:0;
  }

  /* ── image area ── */
  .ac-img-wrap {
    position:relative;
    width:100%; overflow:hidden;
    cursor:pointer;
  }
  /* scan sweep on image */
  .ac-img-wrap::after {
    content:'';
    position:absolute; top:0; bottom:0; left:0;
    width:35%;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,.07),transparent);
    animation:acScan 3s ease-in-out infinite;
    pointer-events:none; z-index:3;
  }

  /* ── metrics chip ── */
  .ac-metrics {
    position:absolute; top:14px; left:14px; z-index:10;
    background:rgba(5,8,16,.75);
    backdrop-filter:blur(16px);
    border:1px solid rgba(0,212,255,.2);
    border-radius:14px;
    padding:10px 14px;
    display:grid; grid-template-columns:repeat(3,1fr); gap:12px;
    animation:acFadeUp .5s ease both;
  }
  .ac-metric-col { display:flex; flex-direction:column; align-items:center; gap:2px; }
  .ac-metric-val {
    font-family:'Orbitron',sans-serif;
    font-size:13px; font-weight:700; color:#fff;
  }
  .ac-metric-lbl { font-size:9px; color:rgba(255,255,255,.45); letter-spacing:.5px; text-transform:uppercase; }

  /* ── top-right controls ── */
  .ac-controls {
    position:absolute; top:14px; right:14px; z-index:10;
    display:flex; align-items:center; gap:8px;
  }
  .ac-auto-btn {
    padding:5px 14px;
    border-radius:50px;
    font-size:11px; font-weight:700; letter-spacing:1px;
    border:none; cursor:pointer;
    font-family:'Inter',sans-serif;
    transition:all .3s;
  }
  .ac-auto-on  { background:linear-gradient(135deg,var(--nc),var(--nb)); color:#060912; box-shadow:0 0 16px rgba(6,255,212,.4); }
  .ac-auto-off { background:rgba(255,255,255,.08); color:rgba(255,255,255,.6); border:1px solid rgba(255,255,255,.1); }
  .ac-counter {
    background:rgba(5,8,16,.65);
    backdrop-filter:blur(12px);
    border:1px solid rgba(255,255,255,.15);
    border-radius:50px;
    padding:5px 12px;
    font-family:'Orbitron',sans-serif;
    font-size:12px; color:var(--nb);
  }

  /* ── hover overlay (desktop) ── */
  .ac-hover-overlay {
    position:absolute; bottom:0; left:0; right:0;
    background:linear-gradient(to top, rgba(5,8,16,.97) 0%, rgba(5,8,16,.8) 60%, transparent 100%);
    padding:24px 28px;
    transform:translateY(100%);
    transition:transform .4s cubic-bezier(.4,0,.2,1);
    z-index:8;
  }
  .ac-img-wrap:hover .ac-hover-overlay { transform:translateY(0); }

  /* ── overlay inner ── */
  .ac-tag {
    display:inline-flex; align-items:center;
    padding:4px 14px; border-radius:50px;
    font-size:11px; font-weight:700; letter-spacing:.5px;
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff;
    box-shadow:0 0 16px rgba(0,212,255,.35);
  }
  .ac-seller {
    display:flex; align-items:center; gap:6px;
    font-size:13px; color:rgba(255,255,255,.8); font-weight:500;
  }
  .ac-timer {
    display:flex; align-items:center; gap:6px;
    background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.15);
    border-radius:50px;
    padding:4px 12px;
    font-size:12px; font-weight:700;
    color:#ffd700;
  }
  .ac-ad-title {
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1rem,2.5vw,1.6rem);
    font-weight:900; color:#fff; line-height:1.15;
    margin:10px 0 8px;
    text-shadow:0 0 30px rgba(0,212,255,.3);
  }
  .ac-desc {
    color:rgba(255,255,255,.75);
    font-size:14px; line-height:1.6;
    overflow:hidden;
    transition:max-height .35s ease;
  }
  .ac-read-btn {
    background:none; border:none; cursor:pointer;
    color:var(--nb); font-size:12px; font-weight:600;
    display:inline-flex; align-items:center; gap:4px;
    padding:4px 0; margin-top:4px;
    font-family:'Inter',sans-serif;
    transition:color .2s;
  }
  .ac-read-btn:hover { color:var(--nc); }
  .ac-engagement {
    display:flex; align-items:center; gap:8px;
    background:rgba(255,255,255,.07);
    border:1px solid rgba(255,255,255,.12);
    border-radius:50px; padding:6px 14px;
    font-size:12px; font-weight:600;
  }
  .ac-shop-btn {
    display:flex; align-items:center; gap:8px;
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff; border:none;
    padding:10px 22px; border-radius:12px;
    font-weight:700; font-size:14px;
    font-family:'Inter',sans-serif;
    cursor:pointer;
    box-shadow:0 0 24px rgba(0,212,255,.45);
    transition:transform .2s, box-shadow .3s;
  }
  .ac-shop-btn:hover {
    transform:scale(1.05);
    box-shadow:0 0 40px rgba(0,212,255,.7),0 0 80px rgba(124,58,237,.3);
  }

  /* ── nav arrows ── */
  .ac-arrow {
    position:absolute; top:50%; transform:translateY(-50%);
    width:40px; height:40px; border-radius:50%;
    background:rgba(5,8,16,.7);
    backdrop-filter:blur(12px);
    border:1px solid rgba(0,212,255,.25);
    display:flex; align-items:center; justify-content:center;
    color:#fff; cursor:pointer;
    transition:all .25s; z-index:9;
    opacity:0;
  }
  .ac-img-wrap:hover .ac-arrow { opacity:1; }
  .ac-arrow:hover {
    background:rgba(0,212,255,.15);
    border-color:var(--nb);
    box-shadow:0 0 20px rgba(0,212,255,.4);
    transform:translateY(-50%) scale(1.1);
  }
  .ac-arrow-l { left:14px; }
  .ac-arrow-r { right:14px; }

  /* ── dots ── */
  .ac-dots {
    position:absolute; bottom:14px; left:50%;
    transform:translateX(-50%);
    display:flex; gap:6px; z-index:9;
  }
  .ac-dot {
    height:5px; border-radius:50px;
    background:rgba(255,255,255,.35);
    border:none; cursor:pointer;
    transition:all .3s;
  }
  .ac-dot.active {
    width:22px; background:var(--nb);
    box-shadow:0 0 10px rgba(0,212,255,.6);
  }
  .ac-dot:not(.active) { width:5px; }
  .ac-dot:hover:not(.active) { background:rgba(255,255,255,.6); }

  /* ── mobile panel ── */
  .ac-mobile-panel {
    background:linear-gradient(180deg,rgba(8,10,22,.98),rgba(5,8,16,1));
    border-top:1px solid rgba(0,212,255,.12);
    padding:18px 18px 14px;
    position:relative; z-index:5;
  }

  /* ── footer ── */
  .ac-footer {
    padding:14px 22px;
    background:rgba(255,255,255,.02);
    border-top:1px solid rgba(0,212,255,.08);
    display:flex; align-items:center; justify-content:space-between;
    flex-wrap:wrap; gap:10px;
    position:relative; z-index:5;
  }
  .ac-footer-logo {
    width:32px; height:32px;
    background:linear-gradient(135deg,var(--nb),var(--np));
    border-radius:50%; display:flex; align-items:center; justify-content:center;
    box-shadow:0 0 14px rgba(0,212,255,.4);
    animation:acGlow 3s ease-in-out infinite;
    flex-shrink:0;
  }
  .ac-footer-label { font-size:13px; font-weight:600; color:#fff; }
  .ac-footer-sub   { font-size:10px; color:rgba(255,255,255,.4); letter-spacing:.3px; }
  .ac-ai-badge {
    display:flex; align-items:center; gap:6px;
    background:linear-gradient(135deg,var(--np),#f000ff);
    color:#fff; padding:6px 14px; border-radius:50px;
    font-size:12px; font-weight:700;
    box-shadow:0 0 16px rgba(124,58,237,.4);
  }
  .ac-powered {
    font-size:11px; color:rgba(255,255,255,.35);
    font-family:'Orbitron',sans-serif; letter-spacing:.5px;
  }

  /* ── error / empty states ── */
  .ac-state {
    width:100%;
    background:rgba(5,8,16,.9);
    border:1px solid var(--gb);
    border-radius:24px;
    padding:56px 24px;
    text-align:center;
    position:relative; overflow:hidden;
  }
  .ac-state-title {
    font-family:'Orbitron',sans-serif;
    font-size:18px; font-weight:700; color:#fff;
    margin:16px 0 8px;
  }
  .ac-state-sub { font-size:14px; color:rgba(255,255,255,.4); margin-bottom:24px; }
  .ac-state-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:12px 26px; border-radius:14px; border:none;
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff; font-weight:700; font-size:14px;
    font-family:'Inter',sans-serif; cursor:pointer;
    box-shadow:0 0 24px rgba(0,212,255,.4);
    transition:transform .2s, box-shadow .3s;
  }
  .ac-state-btn:hover {
    transform:scale(1.05);
    box-shadow:0 0 40px rgba(0,212,255,.6);
  }
  .ac-gem-wrap {
    width:72px; height:72px;
    background:linear-gradient(135deg,var(--nb),var(--np));
    border-radius:20px;
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 16px;
    box-shadow:0 0 30px rgba(0,212,255,.4);
    animation:acGlow 3s ease-in-out infinite;
  }
  .ac-crown-row { display:flex; gap:6px; justify-content:center; margin-top:8px; }
  .ac-crown-icon { color:var(--nb); font-size:20px; animation:acDot 1.5s ease-in-out infinite; }
  .ac-crown-icon:nth-child(2){ animation-delay:.2s; }
  .ac-crown-icon:nth-child(3){ animation-delay:.4s; }

  /* ── responsive ── */
  @media(max-width:768px){
    .ac-hover-overlay{ display:none; }
    .ac-arrow{ display:none; }
  }
  @media(min-width:769px){
    .ac-mobile-panel{ display:none; }
  }
`;

/* ─── helpers ─── */
const getImageUrl = (imageData) => {
  if (!imageData) return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop";
  if (typeof imageData === "string") {
    if (imageData.startsWith("http")) return imageData;
    if (imageData.startsWith("/uploads/")) return `https://nextrade-backend-production-a486.up.railway.app${imageData}`;
    return `https://nextrade-backend-production-a486.up.railway.app/uploads/${imageData}`;
  }
  if (Array.isArray(imageData) && imageData.length > 0) return getImageUrl(imageData[0]);
  if (typeof imageData === "object") {
    if (imageData.url) return getImageUrl(imageData.url);
    if (imageData.secure_url) return imageData.secure_url;
    if (imageData.path) return getImageUrl(imageData.path);
  }
  return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop";
};

const getAdImage = (ad) => {
  if (!ad) return null;
  for (const src of [ad.images, ad.image, ad.imageUrl, ad.image_url].filter(Boolean)) {
    const url = getImageUrl(src);
    if (url) return url;
  }
  return null;
};

const getSellerName = (ad) => ad.seller?.name || ad.seller?.businessName || "Verified Partner";

const getRemainingDays = (endDate) => {
  const diff = new Date(endDate) - new Date();
  return Math.max(0, Math.ceil(diff / 86400000));
};

const getEngagementData = (ad) => {
  const impressions = ad.impressions || 0;
  const clicks = ad.clicks || 0;
  const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : "0.0";
  const level = parseFloat(ctr) > 5 ? "Hot 🔥" : parseFloat(ctr) > 2 ? "Trending" : "Growing";
  const color = parseFloat(ctr) > 5 ? "var(--ng)" : parseFloat(ctr) > 2 ? "#f97316" : "rgba(255,255,255,.5)";
  return { impressions, clicks, ctr, level, color };
};

/* ═══════════════════════════════════════════ */
const BuyerAdCarousel = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [recommendationSource, setRecommendationSource] = useState("");
  const [trackedImpressions, setTrackedImpressions] = useState(new Set());
  const [expandedDescription, setExpandedDescription] = useState(false);
  const carouselRef = useRef(null);

  /* ── fetch ── */
  const fetchAds = async () => {
    try {
      setError(null);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.id) {
        try {
          const res = await API.post(`/ai/ads/recommend_ads/${user.id}`);
          if (res.data?.recommendedAds?.length > 0) {
            setAds(res.data.recommendedAds);
            setRecommendationSource(res.data.source);
            return;
          }
        } catch {}
      }
      const fb = await API.get("/ads");
      setAds(fb.data || []);
      setRecommendationSource("popular");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { fetchAds(); }, []);
  useEffect(() => { setTrackedImpressions(new Set()); }, [ads]);
  useEffect(() => { if (ads.length > 0) recordImpression(ads[0]._id); }, [ads.length]);

  /* ── auto-rotate ── */
  useEffect(() => {
    if (!isAutoPlaying || ads.length <= 1) return;
    const id = setInterval(nextAd, 5000);
    return () => clearInterval(id);
  }, [isAutoPlaying, ads.length]);

  /* ── tracking ── */
  const getUserFingerprint = () => {
    let fp = localStorage.getItem("userFingerprint");
    if (!fp) { fp = navigator.userAgent + Math.random().toString(36).slice(2); localStorage.setItem("userFingerprint", fp); }
    return fp;
  };

  const recordImpression = async (adId) => {
    if (!adId || trackedImpressions.has(adId)) return;
    try {
      const res = await API.post(`/ads/${adId}/impression`, {}, { headers: { "User-Fingerprint": getUserFingerprint() } });
      if (res.data.isNewImpression) setTrackedImpressions(p => new Set([...p, adId]));
    } catch {}
  };

  const recordClick = async (adId) => {
    if (!adId) return;
    try { await API.post(`/ads/${adId}/click`, {}, { headers: { "User-Fingerprint": getUserFingerprint() } }); } catch {}
  };

  /* ── nav ── */
  const navigate = (newIndex) => {
    if (ads[newIndex] && !trackedImpressions.has(ads[newIndex]._id)) recordImpression(ads[newIndex]._id);
    setCurrentAdIndex(newIndex);
    setExpandedDescription(false);
  };
  const nextAd = () => navigate((currentAdIndex + 1) % ads.length);
  const prevAd = () => navigate((currentAdIndex - 1 + ads.length) % ads.length);
  const goToAd  = (i) => navigate(i);

  const handleAdClick = async (ad) => {
    await recordClick(ad._id);
    if (ad.link) window.open(ad.link, "_blank");
  };

  /* ── states ── */
  if (error && ads.length === 0) return (
    <>
      <style>{STYLES}</style>
      <div className="ac-state">
        <div className="ac-orb" style={{ width:300, height:300, background:"radial-gradient(circle,rgba(239,68,68,.2) 0%,transparent 70%)", top:-100, left:"50%", transform:"translateX(-50%)" }} />
        <FaExclamationTriangle style={{ fontSize:36, color:"#ef4444", marginBottom:16 }} />
        <div className="ac-state-title">Temporary Interruption</div>
        <div className="ac-state-sub">Having trouble loading promotions</div>
        <button className="ac-state-btn" onClick={fetchAds}><FaSync /> Refresh Offers</button>
      </div>
    </>
  );

  if (ads.length === 0) return (
    <>
      <style>{STYLES}</style>
      <div className="ac-state">
        <div className="ac-orb" style={{ width:350, height:350, background:"radial-gradient(circle,rgba(0,212,255,.12) 0%,transparent 70%)", top:-100, left:"50%", transform:"translateX(-50%)" }} />
        <div className="ac-gem-wrap"><FaGem style={{ color:"#fff", fontSize:28 }} /></div>
        <div className="ac-state-title">Premium Promotions</div>
        <div className="ac-state-sub">Exclusive deals loading soon</div>
        <div className="ac-crown-row">
          <FaCrown className="ac-crown-icon" /><FaCrown className="ac-crown-icon" /><FaCrown className="ac-crown-icon" />
        </div>
      </div>
    </>
  );

  const ad = ads[currentAdIndex];
  const engagement = getEngagementData(ad);
  const days = getRemainingDays(ad.endDate);
  const seller = getSellerName(ad);
  const imgUrl = getAdImage(ad);

  return (
    <>
      <style>{STYLES}</style>
      <div className="ac-root" ref={carouselRef}>
        {/* Orbs */}
        <div className="ac-orb" style={{ width:400, height:400, background:"radial-gradient(circle,rgba(124,58,237,.18) 0%,transparent 70%)", top:-150, left:-100 }} />
        <div className="ac-orb" style={{ width:300, height:300, background:"radial-gradient(circle,rgba(0,212,255,.12) 0%,transparent 70%)", bottom:-80, right:-60 }} />

        {/* ── IMAGE AREA ── */}
        <div className="ac-img-wrap" style={{ height: "clamp(200px,40vw,420px)" }}
          onClick={() => handleAdClick(ad)}>

          {/* Blurred BG */}
          <div style={{
            position:"absolute", inset:0, zIndex:0,
            backgroundImage:`url(${imgUrl})`,
            backgroundSize:"cover", backgroundPosition:"center",
            filter:"blur(22px) brightness(.6)", transform:"scale(1.1)"
          }} />
          <div style={{ position:"absolute", inset:0, background:"rgba(5,8,16,.45)", zIndex:1 }} />

          {/* Sharp image */}
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
            <img src={imgUrl} alt={ad.title}
              style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain" }} />
          </div>

          {/* Metrics */}
          <div className="ac-metrics">
            {[
              { icon:<FaEye style={{ color:"var(--nb)", fontSize:12 }} />, val:engagement.impressions, lbl:"Views" },
              { icon:<FaMousePointer style={{ color:"var(--nc)", fontSize:12 }} />, val:engagement.clicks, lbl:"Clicks" },
              { icon:<FaPercentage style={{ color:"#c084fc", fontSize:12 }} />, val:`${engagement.ctr}%`, lbl:"CTR" },
            ].map((m,i) => (
              <div key={i} className="ac-metric-col">
                {m.icon}
                <span className="ac-metric-val">{m.val}</span>
                <span className="ac-metric-lbl">{m.lbl}</span>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="ac-controls">
            <button className={`ac-auto-btn ${isAutoPlaying ? "ac-auto-on" : "ac-auto-off"}`}
              onClick={e => { e.stopPropagation(); setIsAutoPlaying(p => !p); }}>
              {isAutoPlaying ? "AUTO" : "MANUAL"}
            </button>
            <div className="ac-counter">{currentAdIndex + 1}/{ads.length}</div>
          </div>

          {/* Desktop hover overlay */}
          <div className="ac-hover-overlay">
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"center", marginBottom:10 }}>
              <span className="ac-tag">{ad.targetCategory?.name || "PREMIUM"}</span>
              <div className="ac-seller">
                <FaStore style={{ color:"var(--nb)", fontSize:12 }} />
                {seller}
              </div>
              <div className="ac-timer">
                <FaClock style={{ fontSize:11 }} />
                {days} DAYS LEFT
              </div>
            </div>

            <div className="ac-ad-title">{ad.title}</div>

            <div className="ac-desc" style={{ maxHeight: expandedDescription ? "none" : "3em" }}>
              {ad.description}
            </div>
            {ad.description?.length > 100 && (
              <button className="ac-read-btn" onClick={e => { e.stopPropagation(); setExpandedDescription(p => !p); }}>
                {expandedDescription ? <><FaChevronUp />Read Less</> : <><FaChevronDown />Read More</>}
              </button>
            )}

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:16, flexWrap:"wrap", gap:10 }}>
              <div className="ac-engagement">
                <FaFire style={{ color: engagement.color }} />
                <span style={{ color: engagement.color }}>{engagement.level}</span>
                <span style={{ color:"rgba(255,255,255,.5)", fontSize:12 }}>Engagement</span>
              </div>
              <button className="ac-shop-btn" onClick={e => { e.stopPropagation(); handleAdClick(ad); }}>
                <FaExternalLinkAlt /> Shop Now
              </button>
            </div>
          </div>

          {/* Nav arrows */}
          {ads.length > 1 && (
            <>
              <button className="ac-arrow ac-arrow-l" onClick={e => { e.stopPropagation(); prevAd(); }}><FaChevronLeft /></button>
              <button className="ac-arrow ac-arrow-r" onClick={e => { e.stopPropagation(); nextAd(); }}><FaChevronRight /></button>
            </>
          )}

          {/* Dots */}
          {ads.length > 1 && (
            <div className="ac-dots">
              {ads.map((_, i) => (
                <button key={i} className={`ac-dot ${i === currentAdIndex ? "active" : ""}`}
                  onClick={e => { e.stopPropagation(); goToAd(i); }} />
              ))}
            </div>
          )}
        </div>

        {/* ── MOBILE PANEL ── */}
        <div className="ac-mobile-panel">
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:12 }}>
            <span className="ac-tag" style={{ fontSize:10 }}>{ad.targetCategory?.name || "PREMIUM"}</span>
            <div className="ac-seller" style={{ fontSize:12 }}>
              <FaStore style={{ color:"var(--nb)", fontSize:11 }} />{seller}
            </div>
            <div className="ac-timer" style={{ fontSize:11 }}>
              <FaClock style={{ fontSize:10 }} />{days} DAYS LEFT
            </div>
          </div>

          <div style={{ fontFamily:"'Orbitron',sans-serif", fontWeight:700, fontSize:16, color:"#fff", marginBottom:8, lineHeight:1.2 }}>
            {ad.title}
          </div>

          <div style={{ fontSize:13, color:"rgba(255,255,255,.65)", lineHeight:1.6, overflow:"hidden", maxHeight: expandedDescription ? "none" : "2.8em" }}>
            {ad.description}
          </div>
          {ad.description?.length > 100 && (
            <button className="ac-read-btn" onClick={e => { e.stopPropagation(); setExpandedDescription(p => !p); }}>
              {expandedDescription ? <><FaChevronUp />Read Less</> : <><FaChevronDown />Read More</>}
            </button>
          )}

          <div style={{ display:"flex", gap:8, marginTop:14, alignItems:"center" }}>
            <button onClick={e => { e.stopPropagation(); prevAd(); }}
              style={{ flex:1, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", borderRadius:50, padding:"10px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <FaChevronLeft style={{ color:"#fff" }} />
            </button>
            <button className="ac-shop-btn" style={{ flex:3 }} onClick={() => handleAdClick(ad)}>
              <FaExternalLinkAlt /> Shop Now
            </button>
            <button onClick={e => { e.stopPropagation(); nextAd(); }}
              style={{ flex:1, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", borderRadius:50, padding:"10px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <FaChevronRight style={{ color:"#fff" }} />
            </button>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="ac-footer">
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div className="ac-footer-logo"><FaCrown style={{ color:"#fff", fontSize:14 }} /></div>
            <div>
              <div className="ac-footer-label">Premium Ad</div>
              <div className="ac-footer-sub">By {seller}</div>
            </div>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
            {recommendationSource === "ai" && (
              <div className="ac-ai-badge"><FaRobot style={{ fontSize:13 }} /> AI Personalized</div>
            )}
            <span className="ac-powered">AISmartTrade</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerAdCarousel;
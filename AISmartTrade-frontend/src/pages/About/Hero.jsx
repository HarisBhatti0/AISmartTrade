import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight, FaSearch, FaChartLine,
  FaPercentage, FaRobot, FaBolt,
} from "react-icons/fa";
import heroBackground from "../../assets/HeroBackgroun.jpeg";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap');

  :root{
    --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4; --ng:#00ff94;
    --dark:#060912;
  }

  @keyframes ahGrid  { 0%,100%{opacity:.04} 50%{opacity:.08} }
  @keyframes ahOrb   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-16px) scale(1.06)} }
  @keyframes ahShim  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes ahScan  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes ahDot   { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes ahPulse { 0%,100%{box-shadow:0 0 12px rgba(0,212,255,.3),0 0 0 0 rgba(0,212,255,0)} 50%{box-shadow:0 0 28px rgba(0,212,255,.65),0 0 60px rgba(124,58,237,.25)} }
  @keyframes ahFloat { 0%,100%{transform:translateY(0) rotate(6deg)} 50%{transform:translateY(-8px) rotate(6deg)} }
  @keyframes ahFloat2{ 0%,100%{transform:translateY(0) rotate(-6deg)} 50%{transform:translateY(-10px) rotate(-6deg)} }
  @keyframes ahTilt  { 0%,100%{transform:perspective(800px) rotateY(0deg) rotateX(0deg)} 50%{transform:perspective(800px) rotateY(4deg) rotateX(-2deg)} }

  /* ── wrapper ── */
  .ah-root {
    position:relative; color:#fff; overflow:hidden;
    background:var(--dark);
    font-family:'Inter',sans-serif;
  }

  /* BG image */
  .ah-bg {
    position:absolute; inset:0;
    background-size:cover; background-position:center;
    z-index:0;
  }
  .ah-bg-overlay {
    position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(5,8,16,.92) 0%,rgba(12,10,30,.88) 40%,rgba(5,8,16,.85) 100%);
    z-index:0;
  }

  /* grid */
  .ah-grid {
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px);
    background-size:54px 54px;
    animation:ahGrid 5s ease-in-out infinite;
    pointer-events:none; z-index:1;
  }

  /* orbs */
  .ah-orb {
    position:absolute; border-radius:50%;
    filter:blur(80px); pointer-events:none; z-index:1;
  }

  /* scan line */
  .ah-scan {
    position:absolute; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,var(--nb),transparent);
    animation:ahScan 6s linear infinite; z-index:2; pointer-events:none;
  }

  /* inner */
  .ah-inner {
    position:relative; z-index:5;
    max-width:1280px; margin:0 auto;
    padding:80px 24px 100px;
  }

  /* grid layout */
  .ah-layout {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:48px; align-items:center;
  }
  @media(max-width:768px){
    .ah-layout { grid-template-columns:1fr; gap:32px; }
    .ah-inner  { padding:60px 20px 80px; }
  }

  /* ── LEFT COLUMN ── */

  /* badge */
  .ah-badge {
    display:inline-flex; align-items:center; gap:8px;
    padding:6px 16px; border-radius:50px;
    background:rgba(0,212,255,.08);
    border:1px solid rgba(0,212,255,.22);
    font-size:12px; font-weight:600; letter-spacing:1px;
    color:var(--nb); text-transform:uppercase; margin-bottom:22px;
  }
  .ah-badge-dot {
    width:7px; height:7px; border-radius:50%;
    background:var(--nc); box-shadow:0 0 8px var(--nc);
    animation:ahDot 1.5s ease-in-out infinite;
  }

  /* heading */
  .ah-h1 {
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1.8rem,4vw,3.2rem); font-weight:900;
    line-height:1.1; margin:0 0 20px;
    color:#fff;
  }
  .ah-h1-grad {
    background:linear-gradient(135deg,var(--nb) 0%,var(--nc) 50%,var(--np) 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation:ahShim 3s linear infinite; display:block;
  }

  /* description glass box */
  .ah-desc-box {
    background:rgba(255,255,255,.04);
    backdrop-filter:blur(16px);
    border:1px solid rgba(0,212,255,.14);
    border-radius:16px; padding:20px 22px;
    margin-bottom:28px; position:relative; overflow:hidden;
  }
  .ah-desc-box::after {
    content:''; position:absolute; top:0; bottom:0; left:0; width:35%;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,.04),transparent);
    animation:ahScan 3.5s ease-in-out infinite; pointer-events:none;
  }
  .ah-desc-main {
    font-size:15px; color:rgba(255,255,255,.8); line-height:1.75; margin:0 0 10px;
  }
  .ah-desc-main strong { color:#fff; font-weight:600; }
  .ah-desc-sub {
    font-size:13px; color:rgba(255,255,255,.45); line-height:1.7; margin:0;
  }

  /* CTA buttons */
  .ah-btns { display:flex; flex-wrap:wrap; gap:12px; }
  .ah-btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    padding:13px 26px; border-radius:14px; border:none;
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff; font-weight:700; font-size:14px;
    font-family:'Inter',sans-serif; cursor:pointer;
    box-shadow:0 0 28px rgba(0,212,255,.45);
    transition:transform .25s, box-shadow .3s; text-decoration:none;
  }
  .ah-btn-primary:hover {
    transform:scale(1.05);
    box-shadow:0 0 50px rgba(0,212,255,.65),0 0 90px rgba(124,58,237,.3);
  }
  .ah-btn-secondary {
    display:inline-flex; align-items:center; gap:8px;
    padding:12px 24px; border-radius:14px;
    background:rgba(0,212,255,.07);
    border:1px solid rgba(0,212,255,.28);
    color:var(--nb); font-weight:700; font-size:14px;
    font-family:'Inter',sans-serif; cursor:pointer;
    transition:all .25s; text-decoration:none;
  }
  .ah-btn-secondary:hover {
    background:rgba(0,212,255,.15); border-color:var(--nb);
    box-shadow:0 0 24px rgba(0,212,255,.3); transform:scale(1.04);
  }

  /* ── RIGHT COLUMN ── */

  /* glass card */
  .ah-card {
    background:rgba(255,255,255,.04);
    backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
    border:1px solid rgba(0,212,255,.14);
    border-radius:24px; padding:28px;
    position:relative; overflow:hidden;
    animation:ahPulse 4s ease-in-out infinite, ahTilt 8s ease-in-out infinite;
  }
  .ah-card::before {
    content:''; position:absolute; inset:-1px; border-radius:24px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.3),transparent 50%,rgba(124,58,237,.3));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
  }

  .ah-card-title {
    font-family:'Orbitron',sans-serif;
    font-size:15px; font-weight:700; color:#fff; margin:0 0 4px; text-align:center;
  }
  .ah-card-sub {
    font-size:12px; color:rgba(255,255,255,.35);
    text-align:center; margin:0 0 20px;
  }

  /* feature rows */
  .ah-feature {
    display:flex; align-items:flex-start; gap:12px;
    padding:12px 14px; border-radius:14px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(0,212,255,.08);
    margin-bottom:10px; cursor:pointer;
    transition:all .3s;
  }
  .ah-feature:hover {
    background:rgba(0,212,255,.07);
    border-color:rgba(0,212,255,.22);
    transform:translateX(4px);
  }
  .ah-feature-icon {
    width:42px; height:42px; border-radius:13px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center; font-size:17px;
    transition:all .3s;
  }
  .ah-feature:hover .ah-feature-icon { box-shadow:0 0 18px rgba(0,212,255,.35); transform:scale(1.08); }
  .ah-feature-icon.purple { background:rgba(124,58,237,.12); border:1px solid rgba(124,58,237,.25); color:#a78bfa; }
  .ah-feature-icon.blue   { background:rgba(0,212,255,.1);   border:1px solid rgba(0,212,255,.22);  color:var(--nb); }
  .ah-feature-icon.green  { background:rgba(0,255,148,.1);   border:1px solid rgba(0,255,148,.22);  color:var(--ng); }
  .ah-feature-name {
    font-size:13px; font-weight:600; color:#fff; margin:0 0 3px; line-height:1.3;
  }
  .ah-feature-desc {
    font-size:11.5px; color:rgba(255,255,255,.4); line-height:1.6; margin:0;
  }
  .ah-feature-tag {
    display:inline-flex; align-items:center;
    padding:2px 8px; border-radius:50px;
    background:rgba(0,212,255,.1); border:1px solid rgba(0,212,255,.2);
    font-size:10px; font-weight:700; color:var(--nb);
    margin-top:4px;
  }

  /* view all btn */
  .ah-view-all {
    width:100%; margin-top:14px; padding:12px;
    background:rgba(0,212,255,.07);
    border:1px solid rgba(0,212,255,.22);
    border-radius:13px; color:var(--nb);
    font-weight:700; font-size:13px;
    font-family:'Inter',sans-serif; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:7px;
    transition:all .25s;
  }
  .ah-view-all:hover {
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff; border-color:transparent;
    box-shadow:0 0 24px rgba(0,212,255,.4);
    transform:scale(1.02);
  }

  /* floating badges */
  .ah-float-badge {
    position:absolute; z-index:10;
    background:rgba(6,9,18,.9); backdrop-filter:blur(16px);
    border:1px solid rgba(0,212,255,.2);
    border-radius:14px; padding:10px 14px;
    display:flex; align-items:center; gap:10px;
    box-shadow:0 8px 28px rgba(0,0,0,.5);
  }
  .ah-float-badge.tl { top:-16px; left:-16px; animation:ahFloat  3.5s ease-in-out infinite; }
  .ah-float-badge.br { bottom:-16px; right:-16px; animation:ahFloat2 4s   ease-in-out infinite; }
  .ah-fb-icon {
    width:32px; height:32px; border-radius:9px;
    display:flex; align-items:center; justify-content:center;
    font-size:12px; font-weight:900; flex-shrink:0;
    font-family:'Orbitron',sans-serif;
  }
  .ah-fb-icon.ai   { background:linear-gradient(135deg,var(--nb),var(--np)); color:#fff; box-shadow:0 0 12px rgba(0,212,255,.4); }
  .ah-fb-icon.b2b  { background:linear-gradient(135deg,var(--ng),#00c97a);   color:#060912; box-shadow:0 0 12px rgba(0,255,148,.3); }
  .ah-fb-label { font-size:12px; font-weight:700; color:#fff; }
  .ah-fb-sub   { font-size:10px; color:rgba(255,255,255,.38); }

  /* ── wave ── */
  .ah-wave { color:#fff; }
`;

const features = [
  {
    icon: <FaRobot />,
    iconClass: "purple",
    name: "AI-Powered Recommendations",
    desc: "Smart product suggestions based on your business needs",
    tag: null,
    onClick: null,
  },
  {
    icon: <FaChartLine />,
    iconClass: "blue",
    name: "Exclusive Bulk Deals",
    desc: "Volume pricing with up to 60% discounts on large orders",
    tag: "15–40% OFF",
    onClick: "bulk",
  },
  {
    icon: <FaPercentage />,
    iconClass: "green",
    name: "Competitive Pricing",
    desc: "Direct manufacturer prices eliminating middlemen",
    tag: null,
    onClick: null,
  },
];

const AboutHero = () => {
  const navigate = useNavigate();

  const handleExplorePlatform = () => navigate("/");
  const handleBulkDeals = () => navigate("/products?bulkPricing=yes");

  return (
    <>
      <style>{STYLES}</style>

      <div className="ah-root">
        {/* BG */}
        <div className="ah-bg" style={{ backgroundImage:`url(${heroBackground})` }} />
        <div className="ah-bg-overlay" />

        {/* Grid + orbs */}
        <div className="ah-grid" />
        <div className="ah-orb" style={{ width:500, height:500, background:"radial-gradient(circle,rgba(124,58,237,.22) 0%,transparent 70%)", top:-160, left:-120, animation:"ahOrb 13s ease-in-out infinite" }} />
        <div className="ah-orb" style={{ width:380, height:380, background:"radial-gradient(circle,rgba(0,212,255,.15) 0%,transparent 70%)", top:80, right:-80, animation:"ahOrb 16s ease-in-out infinite reverse" }} />
        <div className="ah-orb" style={{ width:260, height:260, background:"radial-gradient(circle,rgba(6,255,212,.1) 0%,transparent 70%)", bottom:60, left:"40%", animation:"ahOrb 11s ease-in-out infinite 2s" }} />

        {/* Scan line */}
        <div className="ah-scan" />

        {/* Content */}
        <div className="ah-inner">
          <div className="ah-layout">

            {/* ── LEFT ── */}
            <div>
              <div className="ah-badge">
                <div className="ah-badge-dot" />
                Welcome to AISmartTrade
              </div>

              <h1 className="ah-h1">
                Revolutionizing
                <span className="ah-h1-grad">B2B Wholesale Trade</span>
              </h1>

              <div className="ah-desc-box">
                <p className="ah-desc-main">
                  AISmartTrade is an intelligent B2B marketplace platform that
                  <strong> connects manufacturers, wholesalers, and retailers </strong>
                  through AI-powered recommendations, competitive bulk pricing,
                  and seamless trade experiences.
                </p>
                <p className="ah-desc-sub">
                  Founded to transform traditional wholesale trading, we empower
                  businesses to scale efficiently with data-driven insights and
                  exclusive bulk deals.
                </p>
              </div>

              <div className="ah-btns">
                <button className="ah-btn-primary" onClick={handleExplorePlatform}>
                  <FaSearch size={12} />
                  Explore Platform
                  <FaArrowRight size={11} />
                </button>
                <Link to="/register" className="ah-btn-secondary">
                  Register Your Business
                </Link>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div style={{ position:"relative" }}>
              <div className="ah-card">
                <div className="ah-card-title">Why Choose AISmartTrade?</div>
                <div className="ah-card-sub">Intelligent features for business growth</div>

                {features.map((f, i) => (
                  <div
                    key={i}
                    className="ah-feature"
                    onClick={f.onClick === "bulk" ? handleBulkDeals : undefined}
                  >
                    <div className={`ah-feature-icon ${f.iconClass}`}>{f.icon}</div>
                    <div>
                      <p className="ah-feature-name">{f.name}</p>
                      <p className="ah-feature-desc">{f.desc}</p>
                      {f.tag && <span className="ah-feature-tag"><FaBolt size={8} style={{ marginRight:4 }} />{f.tag}</span>}
                    </div>
                  </div>
                ))}

                <button className="ah-view-all" onClick={handleBulkDeals}>
                  <FaArrowRight size={11} /> View All Features
                </button>
              </div>

              {/* Floating badges */}
              <div className="ah-float-badge tl">
                <div className="ah-fb-icon ai">AI</div>
                <div>
                  <div className="ah-fb-label">AI Powered</div>
                  <div className="ah-fb-sub">Smart Platform</div>
                </div>
              </div>

              <div className="ah-float-badge br">
                <div className="ah-fb-icon b2b">B2B</div>
                <div>
                  <div className="ah-fb-label">Wholesale</div>
                  <div className="ah-fb-sub">Verified Sellers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="ah-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width:"100%", height:48, display:"block" }}>
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".08" fill="currentColor" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".15" fill="currentColor" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default AboutHero;
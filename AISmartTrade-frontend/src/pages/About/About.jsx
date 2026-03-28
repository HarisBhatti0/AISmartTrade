import React from "react";
import { Link } from "react-router-dom";
import {
  FaLayerGroup, FaStore
} from "react-icons/fa";
import AboutHeroSection from "./Hero";
import AboutUsSection from "./AboutUs";
import WhyChooseUs from "./WhyChooseUs";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;600;700&display=swap');

  :root{ --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4; --dark:#060912; }

  @keyframes apGrid  { 0%,100%{opacity:.04} 50%{opacity:.08} }
  @keyframes apOrb   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-15px) scale(1.06)} }
  @keyframes apShim  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes apDot   { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes apScan  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes apPulse { 0%,100%{box-shadow:0 0 12px rgba(0,212,255,.3),0 0 40px rgba(0,212,255,.1)} 50%{box-shadow:0 0 28px rgba(0,212,255,.65),0 0 80px rgba(124,58,237,.25)} }

  .ap-cta-sec {
    position:relative; padding:100px 24px;
    background:#060912; overflow:hidden;
    font-family:'Inter',sans-serif;
  }
  .ap-cta-sec::before {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px);
    background-size:54px 54px;
    animation:apGrid 5s ease-in-out infinite; pointer-events:none;
  }
  .ap-orb {
    position:absolute; border-radius:50%;
    filter:blur(80px); pointer-events:none;
  }
  .ap-cta-card {
    position:relative; max-width:780px; margin:0 auto;
    background:rgba(255,255,255,.04);
    backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
    border-radius:32px; padding:64px 48px;
    text-align:center;
    animation:apPulse 4s ease-in-out infinite;
    overflow:hidden; border:1px solid rgba(0,212,255,.1);
  }
  .ap-cta-card::before {
    content:''; position:absolute; inset:-1px; border-radius:32px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.4),transparent 50%,rgba(124,58,237,.4));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
  }
  .ap-cta-card::after {
    content:''; position:absolute; top:0; bottom:0; left:0; width:35%;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,.05),transparent);
    animation:apScan 4s ease-in-out infinite; pointer-events:none;
  }
  .ap-inner-orb {
    position:absolute; width:400px; height:400px; border-radius:50%;
    background:radial-gradient(circle,rgba(0,212,255,.07) 0%,transparent 70%);
    top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none;
  }
  .ap-badge {
    display:inline-flex; align-items:center; gap:8px;
    padding:5px 18px; border-radius:50px;
    background:rgba(0,212,255,.08); border:1px solid rgba(0,212,255,.22);
    font-size:11px; font-weight:600; letter-spacing:1px;
    color:#00d4ff; text-transform:uppercase; margin-bottom:22px;
  }
  .ap-badge-dot {
    width:7px; height:7px; border-radius:50%;
    background:#06ffd4; box-shadow:0 0 8px #06ffd4;
    animation:apDot 1.5s ease-in-out infinite;
  }
  .ap-cta-title {
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1.6rem,4vw,2.6rem); font-weight:900;
    color:#fff; line-height:1.15; margin:0 0 16px;
  }
  .ap-cta-grad {
    background:linear-gradient(135deg,#00d4ff 0%,#06ffd4 50%,#7c3aed 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation:apShim 3s linear infinite; display:block;
  }
  .ap-cta-sub {
    font-size:16px; color:rgba(255,255,255,.45);
    max-width:540px; margin:0 auto 40px; line-height:1.75;
  }
  .ap-btns { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; }
  .ap-btn-primary {
    display:inline-flex; align-items:center; gap:9px;
    padding:15px 32px; border-radius:14px;
    background:linear-gradient(135deg,#00d4ff,#7c3aed);
    color:#fff; font-weight:700; font-size:14px;
    font-family:'Inter',sans-serif; text-decoration:none;
    box-shadow:0 0 28px rgba(0,212,255,.45);
    transition:transform .25s,box-shadow .3s;
  }
  .ap-btn-primary:hover {
    transform:scale(1.06);
    box-shadow:0 0 50px rgba(0,212,255,.65),0 0 90px rgba(124,58,237,.3);
    color:#fff; text-decoration:none;
  }
  .ap-btn-secondary {
    display:inline-flex; align-items:center; gap:9px;
    padding:14px 30px; border-radius:14px;
    background:rgba(0,212,255,.07); border:1px solid rgba(0,212,255,.28);
    color:#00d4ff; font-weight:700; font-size:14px;
    font-family:'Inter',sans-serif; text-decoration:none;
    transition:all .25s;
  }
  .ap-btn-secondary:hover {
    background:rgba(0,212,255,.15); border-color:#00d4ff;
    box-shadow:0 0 24px rgba(0,212,255,.3); transform:scale(1.04);
    color:#00d4ff; text-decoration:none;
  }
  .ap-stats {
    display:flex; flex-wrap:wrap; gap:14px;
    justify-content:center; margin-top:44px;
    padding-top:36px;
    border-top:1px solid rgba(0,212,255,.08);
  }
  .ap-stat {
    display:flex; align-items:center; gap:10px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(0,212,255,.12);
    border-radius:14px; padding:12px 20px;
    transition:all .3s;
  }
  .ap-stat:hover {
    background:rgba(0,212,255,.07); border-color:rgba(0,212,255,.25);
    transform:translateY(-2px);
  }
  .ap-stat-icon {
    width:36px; height:36px; border-radius:10px; flex-shrink:0;
    background:rgba(0,212,255,.1); border:1px solid rgba(0,212,255,.2);
    display:flex; align-items:center; justify-content:center;
    font-size:14px; color:#00d4ff;
  }
  .ap-stat-num {
    font-family:'Orbitron',sans-serif; font-size:15px; font-weight:700;
    color:#00d4ff; line-height:1; margin-bottom:2px;
  }
  .ap-stat-lbl { font-size:10px; color:rgba(255,255,255,.35); letter-spacing:.5px; text-transform:uppercase; }

  @media(max-width:640px){
    .ap-cta-card { padding:44px 24px; }
    .ap-btn-primary,.ap-btn-secondary { width:100%; justify-content:center; }
  }
`;

const ctaStats = [
  { icon:"🏢", num:"10K+", lbl:"Businesses" },
  { icon:"📦", num:"5K+",  lbl:"Products"   },
  { icon:"🌍", num:"50+",  lbl:"Countries"  },
  { icon:"⭐", num:"4.9",  lbl:"Avg Rating" },
];

const AboutPage = () => (
  <>
    <style>{STYLES}</style>

    <div style={{ minHeight:"100vh", background:"#060912" }}>
      <AboutHeroSection />
      <AboutUsSection />
      <WhyChooseUs />

      {/* ── CTA Section ── */}
      <section className="ap-cta-sec">
        <div className="ap-orb" style={{ width:520, height:520, background:"radial-gradient(circle,rgba(124,58,237,.22) 0%,transparent 70%)", top:-180, left:-130, animation:"apOrb 13s ease-in-out infinite" }} />
        <div className="ap-orb" style={{ width:400, height:400, background:"radial-gradient(circle,rgba(0,212,255,.15) 0%,transparent 70%)", bottom:-100, right:-80, animation:"apOrb 16s ease-in-out infinite reverse" }} />
        <div className="ap-orb" style={{ width:280, height:280, background:"radial-gradient(circle,rgba(6,255,212,.1) 0%,transparent 70%)", top:"40%", left:"50%", transform:"translateX(-50%)", animation:"apOrb 11s ease-in-out infinite 2s" }} />

        <div className="ap-cta-card">
          <div className="ap-inner-orb" />

          <div className="ap-badge">
            <div className="ap-badge-dot" />
            Wholesale Platform
          </div>

          <h2 className="ap-cta-title">
            Ready to Grow
            <span className="ap-cta-grad">Your Business?</span>
          </h2>

          <p className="ap-cta-sub">
            Join thousands of successful businesses that trust AISmartTrade for
            their wholesale needs. Get better prices, better quality, and better
            service — all in one place.
          </p>

          <div className="ap-btns">
            <Link to="/products" className="ap-btn-primary">
              <FaLayerGroup size={13} />
              Start Bulk Shopping
            </Link>
            <Link to="/register" className="ap-btn-secondary">
              <FaStore size={13} />
              Become a Seller
            </Link>
          </div>

          <div className="ap-stats">
            {ctaStats.map((s, i) => (
              <div key={i} className="ap-stat">
                <div className="ap-stat-icon">{s.icon}</div>
                <div>
                  <div className="ap-stat-num">{s.num}</div>
                  <div className="ap-stat-lbl">{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </>
);

export default AboutPage;
import React from "react";
import { Link } from "react-router-dom";
import { FaLayerGroup, FaStore } from "react-icons/fa";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;600;700&display=swap');

  @keyframes ctaOrb  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-15px) scale(1.06)} }
  @keyframes ctaGrid { 0%,100%{opacity:.04} 50%{opacity:.08} }
  @keyframes ctaGlow {
    0%,100%{ box-shadow:0 0 12px rgba(0,212,255,.3), 0 0 40px rgba(0,212,255,.1); }
    50%    { box-shadow:0 0 28px rgba(0,212,255,.65), 0 0 80px rgba(124,58,237,.25); }
  }
  @keyframes ctaShim { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes ctaDot  { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes ctaScan { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes ctaFloat{ 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }

  /* ── section ── */
  .cta-sec {
    position: relative;
    padding: 100px 24px;
    background: #060912;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  /* animated grid */
  .cta-sec::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,.05) 1px, transparent 1px);
    background-size: 54px 54px;
    animation: ctaGrid 5s ease-in-out infinite;
    pointer-events: none;
  }

  /* orbs */
  .cta-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }

  /* ── glass card ── */
  .cta-card {
    position: relative;
    max-width: 780px;
    margin: 0 auto;
    background: rgba(255,255,255,.04);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 32px;
    padding: 64px 48px;
    text-align: center;
    animation: ctaGlow 4s ease-in-out infinite;
    overflow: hidden;
    border: 1px solid rgba(0,212,255,.1);
  }

  /* gradient border mask */
  .cta-card::before {
    content: '';
    position: absolute; inset: -1px;
    border-radius: 32px; padding: 1px;
    background: linear-gradient(135deg, rgba(0,212,255,.4), transparent 50%, rgba(124,58,237,.4));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none;
  }

  /* scan sweep */
  .cta-card::after {
    content: '';
    position: absolute; top: 0; bottom: 0; left: 0;
    width: 35%;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,.05), transparent);
    animation: ctaScan 4s ease-in-out infinite;
    pointer-events: none;
  }

  /* inner glow orb */
  .cta-inner-orb {
    position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(0,212,255,.07) 0%, transparent 70%);
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  /* ── badge ── */
  .cta-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 5px 18px; border-radius: 50px;
    background: rgba(0,212,255,.08);
    border: 1px solid rgba(0,212,255,.22);
    font-size: 11px; font-weight: 600;
    letter-spacing: 1px; color: #00d4ff;
    text-transform: uppercase;
    margin-bottom: 22px;
  }
  .cta-badge-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #06ffd4;
    box-shadow: 0 0 8px #06ffd4;
    animation: ctaDot 1.5s ease-in-out infinite;
  }

  /* ── heading ── */
  .cta-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.6rem, 4vw, 2.6rem);
    font-weight: 900;
    color: #fff;
    line-height: 1.15;
    margin: 0 0 16px;
  }
  .cta-title-grad {
    background: linear-gradient(135deg, #00d4ff 0%, #06ffd4 50%, #7c3aed 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ctaShim 3s linear infinite;
    display: block;
  }

  /* ── subtext ── */
  .cta-sub {
    font-size: 16px;
    color: rgba(255,255,255,.45);
    max-width: 540px;
    margin: 0 auto 40px;
    line-height: 1.75;
  }

  /* ── buttons ── */
  .cta-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    justify-content: center;
  }

  .cta-btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 15px 32px; border-radius: 14px;
    background: linear-gradient(135deg, #00d4ff, #7c3aed);
    color: #fff; font-weight: 700; font-size: 14px;
    font-family: 'Inter', sans-serif;
    text-decoration: none;
    box-shadow: 0 0 28px rgba(0,212,255,.45);
    transition: transform .25s, box-shadow .3s;
    border: none; cursor: pointer;
    letter-spacing: .3px;
  }
  .cta-btn-primary:hover {
    transform: scale(1.06);
    box-shadow: 0 0 50px rgba(0,212,255,.65), 0 0 90px rgba(124,58,237,.3);
    color: #fff;
    text-decoration: none;
  }

  .cta-btn-secondary {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 14px 30px; border-radius: 14px;
    background: rgba(0,212,255,.07);
    border: 1px solid rgba(0,212,255,.28);
    color: #00d4ff; font-weight: 700; font-size: 14px;
    font-family: 'Inter', sans-serif;
    text-decoration: none;
    transition: all .25s;
    cursor: pointer;
    letter-spacing: .3px;
  }
  .cta-btn-secondary:hover {
    background: rgba(0,212,255,.15);
    border-color: #00d4ff;
    box-shadow: 0 0 24px rgba(0,212,255,.3);
    transform: scale(1.04);
    color: #00d4ff;
    text-decoration: none;
  }

  /* ── floating stat chips ── */
  .cta-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    justify-content: center;
    margin-top: 44px;
    padding-top: 36px;
    border-top: 1px solid rgba(0,212,255,.08);
  }
  .cta-stat {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(0,212,255,.12);
    border-radius: 14px;
    padding: 12px 20px;
    transition: all .3s;
  }
  .cta-stat:hover {
    background: rgba(0,212,255,.07);
    border-color: rgba(0,212,255,.25);
    transform: translateY(-2px);
  }
  .cta-stat-icon {
    width: 36px; height: 36px;
    background: rgba(0,212,255,.1);
    border: 1px solid rgba(0,212,255,.2);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; color: #00d4ff;
    flex-shrink: 0;
  }
  .cta-stat-num {
    font-family: 'Orbitron', sans-serif;
    font-size: 16px; font-weight: 700;
    color: #00d4ff;
    line-height: 1;
    margin-bottom: 2px;
  }
  .cta-stat-label {
    font-size: 11px;
    color: rgba(255,255,255,.38);
    letter-spacing: .4px;
    text-transform: uppercase;
  }

  /* ── responsive ── */
  @media (max-width: 640px) {
    .cta-card { padding: 44px 24px; }
    .cta-btn-primary,
    .cta-btn-secondary { width: 100%; justify-content: center; }
    .cta-stat { flex: 1; min-width: 130px; }
  }
`;

const stats = [
  { icon: "🏢", number: "10K+", label: "Businesses" },
  { icon: "📦", number: "5K+",  label: "Products" },
  { icon: "🌍", number: "50+",  label: "Countries" },
  { icon: "⭐", number: "4.9",  label: "Avg Rating" },
];

const CTASection = () => {
  return (
    <>
      <style>{STYLES}</style>

      <section className="cta-sec">
        {/* Ambient orbs */}
        <div
          className="cta-orb"
          style={{
            width: 520, height: 520,
            background: "radial-gradient(circle, rgba(124,58,237,.22) 0%, transparent 70%)",
            top: -180, left: -130,
            animation: "ctaOrb 13s ease-in-out infinite",
          }}
        />
        <div
          className="cta-orb"
          style={{
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(0,212,255,.15) 0%, transparent 70%)",
            bottom: -100, right: -80,
            animation: "ctaOrb 16s ease-in-out infinite reverse",
          }}
        />
        <div
          className="cta-orb"
          style={{
            width: 280, height: 280,
            background: "radial-gradient(circle, rgba(6,255,212,.1) 0%, transparent 70%)",
            top: "40%", left: "50%",
            transform: "translateX(-50%)",
            animation: "ctaOrb 11s ease-in-out infinite 2s",
          }}
        />

        {/* Glass card */}
        <div className="cta-card">
          <div className="cta-inner-orb" />

          {/* Badge */}
          <div className="cta-badge">
            <div className="cta-badge-dot" />
            Wholesale Platform
          </div>

          {/* Heading */}
          <h2 className="cta-title">
            Ready to Grow
            <span className="cta-title-grad">Your Business?</span>
          </h2>

          {/* Subtext */}
          <p className="cta-sub">
            Join thousands of successful businesses that trust AISmartTrade for
            their wholesale needs. Get better prices, better quality, and better
            service — all in one place.
          </p>

          {/* Buttons */}
          <div className="cta-btns">
            <Link to="/products" className="cta-btn-primary">
              <FaLayerGroup size={13} />
              Start Bulk Shopping
            </Link>
            <Link to="/register" className="cta-btn-secondary">
              <FaStore size={13} />
              Become a Seller
            </Link>
          </div>

          {/* Stats strip */}
          {/* <div className="cta-stats">
            {stats.map((s, i) => (
              <div key={i} className="cta-stat">
                <div className="cta-stat-icon">{s.icon}</div>
                <div>
                  <div className="cta-stat-num">{s.number}</div>
                  <div className="cta-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </>
  );
};

export default CTASection;
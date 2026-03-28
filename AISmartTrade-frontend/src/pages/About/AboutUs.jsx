import React from "react";
import { FaChartLine, FaShieldAlt, FaLayerGroup, FaRobot } from "react-icons/fa";
import aboutUsImage from "../../assets/About-us.png";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap');

  :root{
    --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4; --ng:#00ff94;
    --dark:#060912;
  }

  @keyframes auGrid  { 0%,100%{opacity:.04} 50%{opacity:.08} }
  @keyframes auOrb   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-14px) scale(1.05)} }
  @keyframes auShim  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes auDot   { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes auScan  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes auPulse { 0%,100%{box-shadow:0 0 10px rgba(0,212,255,.2),0 0 40px rgba(0,212,255,.06)} 50%{box-shadow:0 0 26px rgba(0,212,255,.5),0 0 70px rgba(124,58,237,.18)} }
  @keyframes auFloat { 0%,100%{transform:translateY(0) rotate(6deg)} 50%{transform:translateY(-8px) rotate(6deg)} }
  @keyframes auGlow  { 0%,100%{box-shadow:0 0 8px rgba(0,212,255,.3)} 50%{box-shadow:0 0 22px rgba(0,212,255,.7),0 0 44px rgba(124,58,237,.3)} }
  @keyframes auIn    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

  /* ── section ── */
  .au-section {
    background:#060912; padding:90px 0;
    position:relative; overflow:hidden;
    font-family:'Inter',sans-serif; color:#fff;
  }
  .au-section::before {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px);
    background-size:54px 54px;
    animation:auGrid 5s ease-in-out infinite; pointer-events:none;
  }
  .au-orb {
    position:absolute; border-radius:50%;
    filter:blur(80px); pointer-events:none;
  }
  .au-inner {
    max-width:1280px; margin:0 auto; padding:0 24px;
    position:relative; z-index:1;
  }

  /* ── two-col layout ── */
  .au-grid {
    display:grid; grid-template-columns:1fr 1fr;
    gap:56px; align-items:center;
  }
  @media(max-width:768px){
    .au-grid { grid-template-columns:1fr; gap:40px; }
    .au-section { padding:64px 0; }
  }

  /* ── LEFT — image column ── */
  .au-img-col {
    position:relative; display:flex;
    align-items:center; justify-content:center;
  }
  .au-img-wrap {
    position:relative; width:100%; max-width:480px;
    animation:auIn .6s ease both;
  }

  /* glow behind image */
  .au-img-glow {
    position:absolute; inset:-20px;
    background:radial-gradient(ellipse at center,rgba(0,212,255,.12) 0%,transparent 70%);
    border-radius:50%; z-index:0; pointer-events:none;
    animation:auPulse 4s ease-in-out infinite;
  }

  /* image itself */
  .au-img {
    width:100%; position:relative; z-index:1;
    filter:drop-shadow(0 0 32px rgba(0,212,255,.2));
    transition:transform .5s ease;
  }
  .au-img-wrap:hover .au-img { transform:scale(1.02); }

  /* scan sweep over image */
  .au-img-scan {
    position:absolute; inset:0; z-index:2;
    overflow:hidden; border-radius:16px; pointer-events:none;
  }
  .au-img-scan::after {
    content:''; position:absolute; top:0; bottom:0; left:0; width:40%;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,.07),transparent);
    animation:auScan 3s ease-in-out infinite;
  }

  /* B2B float badge */
  .au-float-badge {
    position:absolute; top:-16px; right:-16px; z-index:10;
    background:rgba(6,9,18,.88); backdrop-filter:blur(16px);
    border:1px solid rgba(0,212,255,.25); border-radius:14px;
    padding:10px 14px; display:flex; align-items:center; gap:10px;
    box-shadow:0 8px 28px rgba(0,0,0,.5);
    animation:auFloat 3.5s ease-in-out infinite;
  }
  .au-fb-icon {
    width:36px; height:36px; border-radius:10px;
    background:linear-gradient(135deg,var(--nb),var(--np));
    display:flex; align-items:center; justify-content:center;
    font-family:'Orbitron',sans-serif; font-size:11px; font-weight:700;
    color:#fff; box-shadow:0 0 14px rgba(0,212,255,.4);
  }
  .au-fb-label { font-size:12px; font-weight:700; color:#fff; }
  .au-fb-sub   { font-size:10px; color:rgba(255,255,255,.38); }

  /* stats chip */
  .au-stats-chip {
    position:absolute; bottom:-22px; left:50%; transform:translateX(-50%);
    background:rgba(6,9,18,.9); backdrop-filter:blur(16px);
    border:1px solid rgba(0,212,255,.2); border-radius:16px;
    padding:14px 20px; display:flex; gap:20px;
    box-shadow:0 8px 32px rgba(0,0,0,.5);
    white-space:nowrap; z-index:10;
    animation:auGlow 3s ease-in-out infinite;
  }
  .au-stat { text-align:center; }
  .au-stat-num {
    font-family:'Orbitron',sans-serif; font-size:16px; font-weight:700;
    color:var(--nb); display:block; line-height:1;
    text-shadow:0 0 14px rgba(0,212,255,.4);
  }
  .au-stat-label {
    font-size:10px; color:rgba(255,255,255,.35);
    letter-spacing:.5px; text-transform:uppercase; margin-top:3px; display:block;
  }
  .au-stat-div {
    width:1px; background:rgba(0,212,255,.15); align-self:stretch;
  }

  /* ── RIGHT — text column ── */
  .au-text-col { display:flex; flex-direction:column; gap:24px; }

  /* badge */
  .au-badge {
    display:inline-flex; align-items:center; gap:8px;
    padding:6px 16px; border-radius:50px;
    background:rgba(0,212,255,.08); border:1px solid rgba(0,212,255,.22);
    font-size:11px; font-weight:700; letter-spacing:1px;
    color:var(--nb); text-transform:uppercase;
  }
  .au-badge-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--nc); box-shadow:0 0 7px var(--nc);
    animation:auDot 1.5s ease-in-out infinite;
  }

  /* heading */
  .au-heading {
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1.5rem,3vw,2.4rem); font-weight:900;
    color:#fff; line-height:1.15; margin:0;
  }
  .au-heading-grad {
    background:linear-gradient(135deg,var(--nb) 0%,var(--nc) 50%,var(--np) 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation:auShim 3s linear infinite; display:block;
  }

  /* paragraphs */
  .au-para-1 { font-size:16px; color:rgba(255,255,255,.7); line-height:1.8; margin:0; }
  .au-para-1 strong { color:#fff; font-weight:600; }
  .au-para-2 { font-size:14px; color:rgba(255,255,255,.45); line-height:1.8; margin:0; }

  /* divider */
  .au-divider {
    height:1px;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,.2),transparent);
  }

  /* feature row */
  .au-features { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:480px){ .au-features{ grid-template-columns:1fr; } }

  .au-feature {
    display:flex; align-items:flex-start; gap:12px;
    padding:14px; border-radius:14px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(0,212,255,.09);
    transition:all .3s;
  }
  .au-feature:hover {
    background:rgba(0,212,255,.07);
    border-color:rgba(0,212,255,.22);
    transform:translateY(-3px);
  }
  .au-feat-icon {
    width:40px; height:40px; border-radius:12px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center; font-size:16px;
    transition:all .3s;
  }
  .au-feature:hover .au-feat-icon { box-shadow:0 0 16px rgba(0,212,255,.3); transform:scale(1.08); }
  .au-feat-icon.blue  { background:rgba(0,212,255,.1);   border:1px solid rgba(0,212,255,.2);  color:var(--nb); }
  .au-feat-icon.green { background:rgba(0,255,148,.1);   border:1px solid rgba(0,255,148,.2);  color:var(--ng); }
  .au-feat-icon.purple{ background:rgba(124,58,237,.1);  border:1px solid rgba(124,58,237,.2); color:#a78bfa; }
  .au-feat-icon.gold  { background:rgba(255,215,0,.08);  border:1px solid rgba(255,215,0,.2);  color:#ffd700; }
  .au-feat-name { font-size:13px; font-weight:700; color:#fff; margin:0 0 3px; }
  .au-feat-desc { font-size:11.5px; color:rgba(255,255,255,.38); line-height:1.5; margin:0; }
`;

const features = [
  { icon:<FaChartLine />, cls:"blue",   name:"Growth Focused",  desc:"Scale your business efficiently" },
  { icon:<FaShieldAlt />, cls:"green",  name:"Secure Trading",  desc:"Protected transactions" },
  { icon:<FaRobot />,     cls:"purple", name:"AI Powered",      desc:"Smart recommendations" },
  { icon:<FaLayerGroup />,cls:"gold",   name:"Bulk Deals",      desc:"Up to 60% savings" },
];

const AboutUs = () => (
  <>
    <style>{STYLES}</style>

    <section className="au-section">
      {/* Orbs */}
      <div className="au-orb" style={{ width:480, height:480, background:"radial-gradient(circle,rgba(124,58,237,.18) 0%,transparent 70%)", top:-140, left:-100, animation:"auOrb 14s ease-in-out infinite" }} />
      <div className="au-orb" style={{ width:360, height:360, background:"radial-gradient(circle,rgba(0,212,255,.13) 0%,transparent 70%)", top:80, right:-80, animation:"auOrb 17s ease-in-out infinite reverse" }} />
      <div className="au-orb" style={{ width:260, height:260, background:"radial-gradient(circle,rgba(6,255,212,.09) 0%,transparent 70%)", bottom:-40, left:"45%", animation:"auOrb 11s ease-in-out infinite 2s" }} />

      <div className="au-inner">
        <div className="au-grid">

          {/* ── LEFT: Image ── */}
          <div className="au-img-col">
            <div className="au-img-wrap">
              <div className="au-img-glow" />

              <img
                src={aboutUsImage}
                alt="AISmartTrade B2B Marketplace Platform"
                className="au-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.querySelector(".au-img-fallback").style.display = "flex";
                }}
              />

              {/* Fallback */}
              <div className="au-img-fallback" style={{
                display:"none", width:"100%", height:380,
                background:"linear-gradient(135deg,rgba(0,212,255,.08),rgba(124,58,237,.12))",
                borderRadius:16, alignItems:"center", justifyContent:"center",
                border:"1px solid rgba(0,212,255,.15)"
              }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:18, fontWeight:700, color:"#fff", marginBottom:6 }}>AISmartTrade</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,.4)" }}>B2B Wholesale Marketplace</div>
                </div>
              </div>

              {/* Scan overlay */}
              <div className="au-img-scan" />

              {/* B2B Float badge */}
              <div className="au-float-badge">
                <div className="au-fb-icon">B2B</div>
                <div>
                  <div className="au-fb-label">Wholesale</div>
                  <div className="au-fb-sub">Verified Platform</div>
                </div>
              </div>

              {/* Stats chip */}
              <div className="au-stats-chip">
                <div className="au-stat">
                  <span className="au-stat-num">10K+</span>
                  <span className="au-stat-label">Products</span>
                </div>
                <div className="au-stat-div" />
                <div className="au-stat">
                  <span className="au-stat-num">500+</span>
                  <span className="au-stat-label">Businesses</span>
                </div>
                <div className="au-stat-div" />
                <div className="au-stat">
                  <span className="au-stat-num">60%</span>
                  <span className="au-stat-label">Savings</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Text ── */}
          <div className="au-text-col">
            <div className="au-badge">
              <div className="au-badge-dot" />
              About AISmartTrade
            </div>

            <h2 className="au-heading">
              Transforming{" "}
              <span className="au-heading-grad">Wholesale Commerce</span>
            </h2>

            <p className="au-para-1">
              AISmartTrade is more than just a marketplace — it's a comprehensive
              B2B ecosystem that{" "}
              <strong>bridges the gap between manufacturers, wholesalers, and retailers</strong>{" "}
              through intelligent technology.
            </p>

            <p className="au-para-2">
              We provide businesses with AI-powered product recommendations,
              transparent bulk pricing, and secure trade environments to help them
              scale efficiently and profitably. Our platform simplifies wholesale
              trading, eliminates middlemen, and ensures that businesses of all
              sizes get access to the best deals and reliable suppliers.
            </p>

            <div className="au-divider" />

            <div className="au-features">
              {features.map((f, i) => (
                <div key={i} className="au-feature">
                  <div className={`au-feat-icon ${f.cls}`}>{f.icon}</div>
                  <div>
                    <p className="au-feat-name">{f.name}</p>
                    <p className="au-feat-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  </>
);

export default AboutUs;
import React from "react";

/* ─── Shared keyframes & skeleton styles ─── */
const SKELETON_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

  :root {
    --neon-blue:    #00d4ff;
    --neon-purple:  #7c3aed;
    --neon-cyan:    #06ffd4;
    --dark-base:    #050810;
    --glass-bg:     rgba(255,255,255,0.03);
    --glass-border: rgba(0,212,255,0.12);
  }

  @keyframes skShimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes skPulse {
    0%,100% { opacity: 0.4; }
    50%     { opacity: 0.8; }
  }
  @keyframes skScan {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes skOrb {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(20px,-15px) scale(1.08); }
  }
  @keyframes skSpin {
    to { transform: rotate(360deg); }
  }
  @keyframes skGlow {
    0%,100% { box-shadow: 0 0 8px rgba(0,212,255,0.3); }
    50%     { box-shadow: 0 0 24px rgba(0,212,255,0.7), 0 0 48px rgba(124,58,237,0.3); }
  }
  @keyframes skDot {
    0%,100% { opacity: 0.3; transform: scale(0.8); }
    50%     { opacity: 1;   transform: scale(1.2); }
  }

  /* ── shimmer bone ── */
  .sk-bone {
    background: linear-gradient(
      90deg,
      rgba(0,212,255,0.04) 0%,
      rgba(0,212,255,0.12) 40%,
      rgba(124,58,237,0.08) 60%,
      rgba(0,212,255,0.04) 100%
    );
    background-size: 800px 100%;
    animation: skShimmer 1.8s linear infinite;
    border-radius: 8px;
  }

  /* ── glass card shell ── */
  .sk-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    backdrop-filter: blur(12px);
  }
  .sk-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(0,212,255,0.2), transparent 60%, rgba(124,58,237,0.2));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* scan line sweep inside card */
  .sk-card-scan::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,0.06), transparent);
    width: 60%;
    animation: skScan 2.2s ease-in-out infinite;
    pointer-events: none;
  }

  /* ── section wrapper ── */
  .sk-section {
    padding: 64px 0;
    background: #050810;
    position: relative;
    overflow: hidden;
  }
  .sk-section-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
  .sk-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  /* heading bones */
  .sk-heading {
    text-align: center;
    margin-bottom: 48px;
  }
  .sk-h1 { height: 28px; width: 280px; margin: 0 auto 14px; }
  .sk-sub { height: 14px; width: 360px; margin: 0 auto; }

  /* image placeholder */
  .sk-img {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: rgba(0,212,255,0.04);
  }
  .sk-img-scan::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0; left: 0;
    width: 40%;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,0.08), transparent);
    animation: skScan 1.8s ease-in-out infinite;
  }

  /* neon spinner */
  .sk-spinner {
    width: 52px; height: 52px;
    border: 2px solid rgba(0,212,255,0.15);
    border-top-color: var(--neon-blue);
    border-radius: 50%;
    animation: skSpin 0.9s linear infinite, skGlow 2s ease-in-out infinite;
    margin: 0 auto 20px;
  }

  /* dot loader */
  .sk-dots { display: flex; gap: 8px; align-items: center; justify-content: center; margin-top: 12px; }
  .sk-dot {
    width: 6px; height: 6px;
    background: var(--neon-blue);
    border-radius: 50%;
    animation: skDot 1.2s ease-in-out infinite;
  }

  /* tag bones */
  .sk-tag { height: 28px; border-radius: 50px; }

  /* ── grid helpers ── */
  .sk-grid-3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
  .sk-grid-4 { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
`;

let injected = false;
function InjectStyles() {
  if (injected) return null;
  injected = true;
  return <style>{SKELETON_STYLES}</style>;
}

/* ════════════════════════════════════════════
   1. CategoryLoadingSkeleton
   ════════════════════════════════════════════ */
export const CategoryLoadingSkeleton = () => (
  <section className="sk-section">
    <InjectStyles />
    {/* Ambient orbs */}
    <div className="sk-section-orb" style={{ width:500, height:500, background:"radial-gradient(circle,rgba(124,58,237,0.2) 0%,transparent 70%)", top:-150, left:-100 }} />
    <div className="sk-section-orb" style={{ width:350, height:350, background:"radial-gradient(circle,rgba(0,212,255,0.15) 0%,transparent 70%)", top:80, right:-80 }} />

    <div className="sk-inner">
      {/* Section heading */}
      <div className="sk-heading">
        <div className="sk-bone sk-h1" />
        <div className="sk-bone sk-sub" style={{ marginTop:12 }} />
      </div>

      {/* 6 category cards */}
      <div className="sk-grid-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="sk-card sk-card-scan" style={{ animationDelay:`${i*0.15}s` }}>
            {/* Image */}
            <div className="sk-img sk-img-scan" style={{ height:192 }} />

            {/* Body */}
            <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:12 }}>
              <div className="sk-bone" style={{ height:20, width:"70%" }} />
              <div className="sk-bone" style={{ height:13, width:"100%" }} />
              <div className="sk-bone" style={{ height:13, width:"55%" }} />

              {/* Tags row */}
              <div style={{ display:"flex", gap:8, marginTop:4 }}>
                <div className="sk-bone sk-tag" style={{ width:64 }} />
                <div className="sk-bone sk-tag" style={{ width:48 }} />
                <div className="sk-bone sk-tag" style={{ width:72 }} />
              </div>

              {/* CTA bone */}
              <div className="sk-bone" style={{ height:44, borderRadius:12, marginTop:8 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════
   2. AILoadingSkeleton
   ════════════════════════════════════════════ */
export const AILoadingSkeleton = () => (
  <section className="sk-section">
    <InjectStyles />
    <div className="sk-section-orb" style={{ width:400, height:400, background:"radial-gradient(circle,rgba(6,255,212,0.12) 0%,transparent 70%)", bottom:0, left:"30%" }} />
    <div className="sk-section-orb" style={{ width:300, height:300, background:"radial-gradient(circle,rgba(0,212,255,0.18) 0%,transparent 70%)", top:0, right:0 }} />

    <div className="sk-inner">
      {/* AI badge heading */}
      <div className="sk-heading">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:14 }}>
          {/* Tiny AI pulse dot */}
          <div style={{
            width:10, height:10, borderRadius:"50%",
            background:"var(--neon-cyan)",
            boxShadow:"0 0 12px var(--neon-cyan)",
            animation:"skDot 1.4s ease-in-out infinite"
          }} />
          <div className="sk-bone sk-h1" style={{ margin:0 }} />
        </div>
        <div className="sk-bone sk-sub" />
      </div>

      {/* 8 product cards */}
      <div className="sk-grid-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="sk-card sk-card-scan" style={{ display:"flex", flexDirection:"column" }}>
            {/* Image */}
            <div className="sk-img sk-img-scan" style={{ height:192 }} />

            {/* Body */}
            <div style={{ padding:"16px", display:"flex", flexDirection:"column", gap:10, flex:1 }}>
              <div className="sk-bone" style={{ height:15 }} />
              <div className="sk-bone" style={{ height:12, width:"75%" }} />

              {/* Price */}
              <div className="sk-bone" style={{ height:18, width:"45%", background:"linear-gradient(90deg,rgba(0,212,255,0.15),rgba(124,58,237,0.1),rgba(0,212,255,0.15))", backgroundSize:"800px 100%", animation:"skShimmer 1.8s linear infinite" }} />

              {/* Buttons */}
              <div style={{ display:"flex", gap:8, marginTop:"auto" }}>
                <div className="sk-bone" style={{ height:38, flex:1, borderRadius:10 }} />
                <div className="sk-bone" style={{ height:38, width:38, borderRadius:10 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════
   3. AdLoadingSkeleton
   ════════════════════════════════════════════ */
export const AdLoadingSkeleton = () => (
  <>
    <InjectStyles />
    <div
      style={{
        width:"100%",
        background:"rgba(255,255,255,0.02)",
        backdropFilter:"blur(20px)",
        border:"1px solid rgba(0,212,255,0.15)",
        borderRadius:24,
        padding:"64px 24px",
        textAlign:"center",
        position:"relative",
        overflow:"hidden",
      }}
    >
      {/* Sweep shimmer */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(90deg, transparent, rgba(0,212,255,0.04), transparent)",
        animation:"skScan 2s ease-in-out infinite",
        pointerEvents:"none",
      }} />

      {/* Spinner */}
      <div className="sk-spinner" />

      {/* Text */}
      <p style={{
        fontFamily:"'Orbitron', sans-serif",
        fontWeight:600,
        fontSize:16,
        color:"var(--neon-blue)",
        letterSpacing:1,
        marginBottom:8,
        textShadow:"0 0 20px rgba(0,212,255,0.5)",
      }}>
        Discovering Premium Deals
      </p>
      <p style={{ color:"rgba(255,255,255,0.35)", fontSize:13, letterSpacing:0.5 }}>
        Powered by AI · Picked for you
      </p>

      {/* Dot row */}
      <div className="sk-dots">
        {[0,1,2].map(i => (
          <div key={i} className="sk-dot" style={{ animationDelay:`${i*0.2}s` }} />
        ))}
      </div>
    </div>
  </>
);

/* ════════════════════════════════════════════
   4. CategoryListingSkeleton
   ════════════════════════════════════════════ */
export const CategoryListingSkeleton = () => (
  <div style={{ minHeight:"100vh", background:"#050810", paddingTop:32, paddingBottom:64 }}>
    <InjectStyles />
    <div className="sk-section-orb" style={{ position:"fixed", width:600, height:600, background:"radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%)", top:-200, left:-150, zIndex:0 }} />
    <div className="sk-section-orb" style={{ position:"fixed", width:400, height:400, background:"radial-gradient(circle,rgba(0,212,255,0.1) 0%,transparent 70%)", bottom:0, right:0, zIndex:0 }} />

    <div className="sk-inner">
      {/* Page header */}
      <div style={{ marginBottom:32 }}>
        <div className="sk-bone" style={{ height:28, width:260, marginBottom:12 }} />
        <div className="sk-bone" style={{ height:13, width:380, marginBottom:16 }} />
        {/* Banner strip */}
        <div className="sk-bone" style={{ height:72, borderRadius:16 }} />
      </div>

      {/* Search bar */}
      <div style={{ marginBottom:40 }}>
        <div className="sk-bone" style={{ height:48, width:"100%", maxWidth:420, borderRadius:14 }} />
      </div>

      {/* ── Featured section ── */}
      <div style={{ marginBottom:48 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div className="sk-bone" style={{ height:22, width:180 }} />
          <div className="sk-bone" style={{ height:14, width:110 }} />
        </div>
        <div className="sk-grid-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="sk-card sk-card-scan">
              <div className="sk-img sk-img-scan" style={{ height:192 }} />
              <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:10 }}>
                <div className="sk-bone" style={{ height:20, width:"70%" }} />
                <div className="sk-bone" style={{ height:13 }} />
                <div className="sk-bone" style={{ height:13, width:"50%" }} />
                {/* neon featured badge */}
                <div className="sk-bone sk-tag" style={{ width:90, background:"linear-gradient(90deg,rgba(0,212,255,0.15),rgba(124,58,237,0.1),rgba(0,212,255,0.15))", backgroundSize:"800px 100%", animation:"skShimmer 1.8s linear infinite" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── All categories ── */}
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div className="sk-bone" style={{ height:22, width:150 }} />
          <div className="sk-bone" style={{ height:14, width:180 }} />
        </div>
        <div className="sk-grid-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="sk-card sk-card-scan">
              <div className="sk-img sk-img-scan" style={{ height:152 }} />
              <div style={{ padding:"16px", display:"flex", flexDirection:"column", gap:8 }}>
                <div className="sk-bone" style={{ height:17, width:"70%" }} />
                <div className="sk-bone" style={{ height:12 }} />
                <div className="sk-bone" style={{ height:12, width:"50%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
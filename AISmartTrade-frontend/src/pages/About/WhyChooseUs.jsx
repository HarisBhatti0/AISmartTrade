import React from "react";
import {
  FaRobot,
  FaPercentage,
  FaShieldAlt,
  FaUsers,
  FaTruck,
  FaHeadset,
} from "react-icons/fa";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap');

  :root{
    --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4; --ng:#00ff94;
    --dark:#060912;
  }

  @keyframes wcGrid  { 0%,100%{opacity:.04} 50%{opacity:.08} }
  @keyframes wcOrb   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-14px) scale(1.05)} }
  @keyframes wcShim  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes wcDot   { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes wcIn    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes wcPulse { 0%,100%{box-shadow:0 0 10px rgba(0,212,255,.22),0 0 0 0 rgba(0,212,255,0)} 50%{box-shadow:0 0 26px rgba(0,212,255,.55),0 0 60px rgba(124,58,237,.2)} }
  @keyframes wcScan  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes wcCounter{ from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  /* ── section ── */
  .wc-section {
    background:#060912; padding:90px 0;
    position:relative; overflow:hidden;
    font-family:'Inter',sans-serif; color:#fff;
  }
  .wc-section::before {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px);
    background-size:54px 54px;
    animation:wcGrid 5s ease-in-out infinite; pointer-events:none;
  }
  .wc-orb {
    position:absolute; border-radius:50%;
    filter:blur(80px); pointer-events:none;
  }
  .wc-inner {
    max-width:1280px; margin:0 auto; padding:0 24px;
    position:relative; z-index:1;
  }

  /* ── heading ── */
  .wc-heading-wrap { text-align:center; margin-bottom:56px; }
  .wc-badge {
    display:inline-flex; align-items:center; gap:8px;
    padding:6px 18px; border-radius:50px;
    background:rgba(0,212,255,.08); border:1px solid rgba(0,212,255,.22);
    font-size:11px; font-weight:700; letter-spacing:1px;
    color:var(--nb); text-transform:uppercase; margin-bottom:18px;
  }
  .wc-badge-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--nc); box-shadow:0 0 7px var(--nc);
    animation:wcDot 1.5s ease-in-out infinite;
  }
  .wc-h2 {
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1.5rem,3.5vw,2.5rem); font-weight:900;
    color:#fff; line-height:1.15; margin:0 0 14px;
  }
  .wc-h2-grad {
    background:linear-gradient(135deg,var(--nb) 0%,var(--nc) 50%,var(--np) 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation:wcShim 3s linear infinite;
  }
  .wc-sub {
    font-size:15px; color:rgba(255,255,255,.42);
    max-width:520px; margin:0 auto; line-height:1.7;
  }

  /* ── card grid ── */
  .wc-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
    gap:20px;
  }

  /* ── feature card ── */
  .wc-card {
    position:relative;
    background:rgba(255,255,255,.04);
    backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
    border:1px solid rgba(0,212,255,.1);
    border-radius:22px; padding:28px;
    overflow:hidden;
    transition:border-color .35s, box-shadow .35s, transform .35s;
    animation:wcIn .5s ease both;
  }
  /* gradient border mask */
  .wc-card::before {
    content:''; position:absolute; inset:-1px; border-radius:22px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.18),transparent 55%,rgba(124,58,237,.18));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    pointer-events:none; transition:opacity .35s;
  }
  /* scan sweep on hover */
  .wc-card::after {
    content:''; position:absolute; top:0; bottom:0; left:0; width:40%;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,.05),transparent);
    animation:wcScan 2.8s ease-in-out infinite;
    opacity:0; transition:opacity .3s; pointer-events:none;
  }
  .wc-card:hover {
    border-color:rgba(0,212,255,.3);
    box-shadow:0 0 0 1px rgba(0,212,255,.1),0 20px 56px rgba(0,0,0,.6),0 0 36px rgba(0,212,255,.07);
    transform:translateY(-6px);
  }
  .wc-card:hover::before { opacity:1.8; }
  .wc-card:hover::after  { opacity:1; }

  /* pill badge */
  .wc-pill {
    position:absolute; top:18px; right:18px;
    padding:4px 11px; border-radius:50px;
    font-size:10px; font-weight:700; letter-spacing:.5px;
  }

  /* icon wrap */
  .wc-icon-wrap {
    width:56px; height:56px; border-radius:16px;
    display:flex; align-items:center; justify-content:center;
    font-size:22px; margin-bottom:18px;
    transition:all .3s;
  }
  .wc-card:hover .wc-icon-wrap { transform:scale(1.1) rotate(-4deg); }

  /* card title */
  .wc-card-title {
    font-family:'Orbitron',sans-serif;
    font-size:14px; font-weight:700; color:#fff;
    margin:0 0 10px; line-height:1.3;
    transition:color .25s;
  }
  .wc-card:hover .wc-card-title { color:var(--nb); text-shadow:0 0 20px rgba(0,212,255,.3); }

  .wc-card-desc {
    font-size:13px; color:rgba(255,255,255,.42);
    line-height:1.7; margin:0;
  }

  /* bottom divider on card */
  .wc-card-foot {
    margin-top:20px; padding-top:16px;
    border-top:1px solid rgba(0,212,255,.07);
    transition:border-color .3s;
  }
  .wc-card:hover .wc-card-foot { border-color:rgba(0,212,255,.18); }

  /* colour themes */
  /* purple */
  .wc-t-purple .wc-icon-wrap { background:rgba(124,58,237,.12); border:1px solid rgba(124,58,237,.25); color:#a78bfa; }
  .wc-t-purple .wc-pill      { background:rgba(124,58,237,.12); border:1px solid rgba(124,58,237,.25); color:#a78bfa; }
  .wc-t-purple:hover          { box-shadow:0 0 0 1px rgba(124,58,237,.15),0 20px 56px rgba(0,0,0,.6),0 0 36px rgba(124,58,237,.08) !important; }
  .wc-t-purple:hover .wc-icon-wrap { box-shadow:0 0 18px rgba(124,58,237,.4); }

  /* blue */
  .wc-t-blue .wc-icon-wrap { background:rgba(0,212,255,.1);   border:1px solid rgba(0,212,255,.22);  color:var(--nb); }
  .wc-t-blue .wc-pill      { background:rgba(0,212,255,.1);   border:1px solid rgba(0,212,255,.22);  color:var(--nb); }
  .wc-t-blue:hover .wc-icon-wrap  { box-shadow:0 0 18px rgba(0,212,255,.4); }

  /* green */
  .wc-t-green .wc-icon-wrap { background:rgba(0,255,148,.1);  border:1px solid rgba(0,255,148,.22);  color:var(--ng); }
  .wc-t-green .wc-pill      { background:rgba(0,255,148,.1);  border:1px solid rgba(0,255,148,.22);  color:var(--ng); }
  .wc-t-green:hover          { box-shadow:0 0 0 1px rgba(0,255,148,.12),0 20px 56px rgba(0,0,0,.6),0 0 36px rgba(0,255,148,.06) !important; }
  .wc-t-green:hover .wc-icon-wrap { box-shadow:0 0 18px rgba(0,255,148,.35); }

  /* orange/gold */
  .wc-t-orange .wc-icon-wrap { background:rgba(255,215,0,.08);  border:1px solid rgba(255,215,0,.22);  color:#ffd700; }
  .wc-t-orange .wc-pill      { background:rgba(255,215,0,.08);  border:1px solid rgba(255,215,0,.22);  color:#ffd700; }
  .wc-t-orange:hover .wc-icon-wrap { box-shadow:0 0 18px rgba(255,215,0,.3); }

  /* indigo */
  .wc-t-indigo .wc-icon-wrap { background:rgba(99,102,241,.12); border:1px solid rgba(99,102,241,.25); color:#818cf8; }
  .wc-t-indigo .wc-pill      { background:rgba(99,102,241,.12); border:1px solid rgba(99,102,241,.25); color:#818cf8; }
  .wc-t-indigo:hover .wc-icon-wrap { box-shadow:0 0 18px rgba(99,102,241,.35); }

  /* cyan */
  .wc-t-cyan .wc-icon-wrap { background:rgba(6,255,212,.08);  border:1px solid rgba(6,255,212,.22);  color:var(--nc); }
  .wc-t-cyan .wc-pill      { background:rgba(6,255,212,.08);  border:1px solid rgba(6,255,212,.22);  color:var(--nc); }
  .wc-t-cyan:hover .wc-icon-wrap { box-shadow:0 0 18px rgba(6,255,212,.35); }

  /* ── stats banner ── */
  .wc-stats {
    margin-top:56px; padding:40px 36px;
    background:rgba(255,255,255,.03);
    backdrop-filter:blur(18px);
    border:1px solid rgba(0,212,255,.12);
    border-radius:24px; position:relative; overflow:hidden;
    animation:wcPulse 4s ease-in-out infinite;
  }
  .wc-stats::before {
    content:''; position:absolute; inset:-1px; border-radius:24px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.28),transparent 50%,rgba(124,58,237,.28));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
  }
  /* inner orb */
  .wc-stats-orb {
    position:absolute; width:320px; height:320px; border-radius:50%;
    background:radial-gradient(circle,rgba(0,212,255,.07) 0%,transparent 70%);
    top:50%; left:50%; transform:translate(-50%,-50%);
    pointer-events:none;
  }
  .wc-stats-grid {
    display:grid; grid-template-columns:repeat(4,1fr); gap:20px;
    position:relative; z-index:1;
  }
  @media(max-width:640px){ .wc-stats-grid{ grid-template-columns:repeat(2,1fr); } }

  .wc-stat { text-align:center; animation:wcCounter .6s ease both; }
  .wc-stat-num {
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1.6rem,3vw,2.4rem); font-weight:900;
    color:var(--nb); display:block; line-height:1;
    text-shadow:0 0 20px rgba(0,212,255,.4);
    background:linear-gradient(135deg,var(--nb),var(--nc));
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
  }
  .wc-stat-label {
    display:block; font-size:12px; color:rgba(255,255,255,.38);
    letter-spacing:.5px; text-transform:uppercase; margin-top:6px;
  }
  .wc-stat-div {
    width:1px; background:linear-gradient(180deg,transparent,rgba(0,212,255,.2),transparent);
    align-self:stretch; margin:auto 0;
  }
  @media(max-width:640px){ .wc-stat-div{ display:none; } }
`;

const features = [
  {
    icon: FaRobot,
    theme: "purple",
    title: "AI-Powered Recommendations",
    description:
      "Smart algorithms suggest products based on your business needs and market trends.",
    badge: "Intelligent",
  },
  {
    icon: FaPercentage,
    theme: "blue",
    title: "Best Bulk Pricing",
    description:
      "Volume-based discounts with transparent pricing. Save up to 60% on orders.",
    badge: "Save 60%",
  },
  {
    icon: FaShieldAlt,
    theme: "green",
    title: "Verified Suppliers",
    description:
      "All suppliers are thoroughly verified for authenticity and reliability.",
    badge: "Verified",
  },
  {
    icon: FaUsers,
    theme: "orange",
    title: "Business Network",
    description:
      "Connect with manufacturers, wholesalers, and retailers in your industry.",
    badge: "Network",
  },
  {
    icon: FaTruck,
    theme: "indigo",
    title: "Reliable Logistics",
    description:
      "Integrated logistics partners for seamless shipping and delivery tracking.",
    badge: "Fast",
  },
  {
    icon: FaHeadset,
    theme: "cyan",
    title: "24/7 Support",
    description:
      "Dedicated business support team available round the clock for assistance.",
    badge: "24/7",
  },
];

const stats = [
  { num: "98%", label: "Satisfaction Rate" },
  { num: "10K+", label: "Active Products" },
  { num: "60%", label: "Average Savings" },
  { num: "24/7", label: "Support Available" },
];

const WhyChooseUs = () => (
  <>
    <style>{STYLES}</style>

    <section className="wc-section">
      {/* Orbs */}
      <div
        className="wc-orb"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle,rgba(124,58,237,.2) 0%,transparent 70%)",
          top: -160,
          left: -120,
          animation: "wcOrb 13s ease-in-out infinite",
        }}
      />
      <div
        className="wc-orb"
        style={{
          width: 380,
          height: 380,
          background:
            "radial-gradient(circle,rgba(0,212,255,.14) 0%,transparent 70%)",
          top: 100,
          right: -80,
          animation: "wcOrb 16s ease-in-out infinite reverse",
        }}
      />
      <div
        className="wc-orb"
        style={{
          width: 260,
          height: 260,
          background:
            "radial-gradient(circle,rgba(6,255,212,.09) 0%,transparent 70%)",
          bottom: -40,
          left: "40%",
          animation: "wcOrb 11s ease-in-out infinite 2s",
        }}
      />

      <div className="wc-inner">
        {/* ── Heading ── */}
        <div className="wc-heading-wrap">
          <div className="wc-badge">
            <div className="wc-badge-dot" />
            Why Choose Us
          </div>
          <h2 className="wc-h2">
            The <span className="wc-h2-grad">AISmartTrade Advantage</span>
          </h2>
          <p className="wc-sub">
            Discover why businesses choose AISmartTrade for intelligent
            wholesale trading
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="wc-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className={`wc-card wc-t-${f.theme}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Pill badge */}
              <span className="wc-pill">{f.badge}</span>

              {/* Icon */}
              <div className="wc-icon-wrap">
                <f.icon />
              </div>

              {/* Text */}
              <h3 className="wc-card-title">{f.title}</h3>
              <p className="wc-card-desc">{f.description}</p>

              {/* Footer line */}
              <div className="wc-card-foot" />
            </div>
          ))}
        </div>

        {/* ── Stats banner ── */}
        <div className="wc-stats">
          <div className="wc-stats-orb" />
          <div className="wc-stats-grid">
            {stats.map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="wc-stat-div" />}
                <div
                  className="wc-stat"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <span className="wc-stat-num">{s.num}</span>
                  <span className="wc-stat-label">{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default WhyChooseUs;

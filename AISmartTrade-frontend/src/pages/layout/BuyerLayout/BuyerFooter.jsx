import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLayerGroup,
} from "react-icons/fa";
import MainLogo from "../../../assets/White Logo.png";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Inter:wght@400;500;600&display=swap');

  :root{
    --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4;
    --dark:#060912; --glass:rgba(255,255,255,0.03); --gb:rgba(0,212,255,0.1);
  }

  @keyframes ftGrid { 0%,100%{opacity:.035} 50%{opacity:.065} }
  @keyframes ftOrb  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-14px) scale(1.05)} }
  @keyframes ftDot  { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes ftShim { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes ftScan { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes ftGlow { 0%,100%{box-shadow:0 0 8px rgba(0,212,255,.2)} 50%{box-shadow:0 0 20px rgba(0,212,255,.5),0 0 40px rgba(124,58,237,.2)} }
  @keyframes ftArrow{ 0%,100%{transform:translateX(0)} 50%{transform:translateX(4px)} }
  @keyframes ftSocUp{ 0%{transform:translateY(0)} 100%{transform:translateY(-110%)} }
  @keyframes ftSocDn{ 0%{transform:translateY(110%)} 100%{transform:translateY(0)} }

  /* ── footer wrapper ── */
  .ft-root {
    position: relative;
    background: #060912;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    color: #fff;
  }

  /* grid overlay */
  .ft-root::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,.045) 1px, transparent 1px);
    background-size: 54px 54px;
    animation: ftGrid 5s ease-in-out infinite;
    pointer-events: none;
  }

  /* ambient orbs */
  .ft-orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px); pointer-events: none;
  }

  /* inner container */
  .ft-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 72px 24px 0;
    position: relative; z-index: 1;
  }

  /* ── top divider line ── */
  .ft-top-line {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,.3), rgba(124,58,237,.3), transparent);
    margin-bottom: 56px;
  }

  /* ── grid layout ── */
  .ft-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 48px;
    margin-bottom: 56px;
  }
  @media(max-width:768px){
    .ft-grid { grid-template-columns: 1fr; gap: 36px; }
  }

  /* ── brand column ── */
  .ft-logo-row {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 16px;
  }
  .ft-logo-img { height: 38px; }
  .ft-brand-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 18px; font-weight: 700;
    background: linear-gradient(135deg, var(--nb), var(--nc));
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ftShim 3s linear infinite;
  }
  .ft-tagline {
    font-size: 13px; color: rgba(255,255,255,.42);
    line-height: 1.7; max-width: 360px;
    margin-bottom: 24px;
  }

  /* ── newsletter ── */
  .ft-newsletter {
    display: flex; gap: 0;
    max-width: 360px;
    margin-bottom: 28px;
  }
  .ft-nl-input {
    flex: 1;
    padding: 11px 16px;
    background: rgba(0,212,255,.05);
    border: 1px solid rgba(0,212,255,.18);
    border-right: none;
    border-radius: 10px 0 0 10px;
    color: #fff; font-size: 13px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color .25s, box-shadow .25s;
  }
  .ft-nl-input::placeholder { color: rgba(255,255,255,.3); }
  .ft-nl-input:focus {
    border-color: var(--nb);
    box-shadow: 0 0 0 2px rgba(0,212,255,.12);
  }
  .ft-nl-btn {
    padding: 11px 16px;
    background: linear-gradient(135deg, var(--nb), var(--np));
    border: none; border-radius: 0 10px 10px 0;
    color: #fff; cursor: pointer;
    display: flex; align-items: center;
    box-shadow: 0 0 16px rgba(0,212,255,.35);
    transition: box-shadow .25s, transform .2s;
  }
  .ft-nl-btn:hover {
    box-shadow: 0 0 28px rgba(0,212,255,.6);
    transform: scale(1.05);
  }
  .ft-nl-btn:hover .ft-nl-arrow { animation: ftArrow .5s ease-in-out infinite; }

  /* ── social icons ── */
  .ft-socials { display: flex; gap: 10px; }
  .ft-soc-btn {
    position: relative;
    width: 42px; height: 42px;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(0,212,255,.06);
    border: 1px solid rgba(0,212,255,.18);
    cursor: pointer;
    text-decoration: none;
    display: block;
    transition: border-color .25s, box-shadow .25s;
  }
  .ft-soc-btn:hover {
    border-color: rgba(0,212,255,.4);
    box-shadow: 0 0 14px rgba(0,212,255,.25);
  }
  .ft-soc-default,
  .ft-soc-hover {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    transition: transform .3s ease;
  }
  .ft-soc-default { transform: translateY(0); }
  .ft-soc-hover   { transform: translateY(110%); }
  .ft-soc-btn:hover .ft-soc-default { transform: translateY(-110%); }
  .ft-soc-btn:hover .ft-soc-hover   { transform: translateY(0); }

  /* ── section headings ── */
  .ft-col-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 13px; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--nb);
    margin-bottom: 20px;
    display: flex; align-items: center; gap: 8px;
  }
  .ft-col-title-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--nc); box-shadow: 0 0 6px var(--nc);
    animation: ftDot 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }

  /* ── links ── */
  .ft-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
  .ft-link {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 13px; color: rgba(255,255,255,.45);
    text-decoration: none;
    transition: color .2s, gap .2s;
  }
  .ft-link-arrow {
    font-size: 10px; opacity: 0;
    transition: opacity .2s, transform .2s;
    color: var(--nb);
  }
  .ft-link:hover {
    color: var(--nb); gap: 10px;
  }
  .ft-link:hover .ft-link-arrow {
    opacity: 1; transform: translateX(2px);
  }

  /* ── contact items ── */
  .ft-contacts { display: flex; flex-direction: column; gap: 14px; }
  .ft-contact-item {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 13px; color: rgba(255,255,255,.45);
    line-height: 1.5;
  }
  .ft-contact-icon {
    width: 30px; height: 30px; flex-shrink: 0;
    background: rgba(0,212,255,.07);
    border: 1px solid rgba(0,212,255,.15);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: var(--nb); font-size: 12px;
    margin-top: 1px;
    transition: all .25s;
  }
  .ft-contact-item:hover .ft-contact-icon {
    background: rgba(0,212,255,.15);
    border-color: var(--nb);
    box-shadow: 0 0 12px rgba(0,212,255,.25);
  }
  .ft-contact-item:hover { color: rgba(255,255,255,.7); }

  /* ── bottom bar ── */
  .ft-bottom {
    border-top: 1px solid rgba(0,212,255,.08);
    padding: 20px 0 24px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 12px;
    position: relative; z-index: 1;
  }
  .ft-copyright {
    font-size: 12px; color: rgba(255,255,255,.28);
    letter-spacing: .3px;
  }
  .ft-legal-links {
    display: flex; gap: 20px;
  }
  .ft-legal-link {
    font-size: 12px; color: rgba(255,255,255,.28);
    text-decoration: none;
    transition: color .2s;
  }
  .ft-legal-link:hover { color: var(--nb); }

  /* powered by row */
  .ft-powered {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; color: rgba(255,255,255,.2);
    letter-spacing: .5px;
    font-family: 'Orbitron', sans-serif;
  }
  .ft-powered-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--nb); box-shadow: 0 0 6px var(--nb);
    animation: ftDot 2s ease-in-out infinite;
  }
`;

const quickLinks = [
  { label: "All Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "About Us", to: "/about" },
  { label: "Register", to: "/register" },
  { label: "Login", to: "/login" },
];

const socialLinks = [
  {
    icon: <FaTwitter size={15} />,
    href: "https://twitter.com/",
    hoverBg: "#000",
    label: "Twitter",
  },
  {
    icon: <FaInstagram size={15} />,
    href: "https://www.instagram.com/haris.bhatti.33671/",
    hoverBg: "linear-gradient(72deg,#ff7a00,#ff0169,#d300c5)",
    label: "Instagram",
  },
  {
    icon: <FaFacebook size={15} />,
    href: "https://www.facebook.com/haris.bhatti.33671",
    hoverBg: "#316ff6",
    label: "Facebook",
  },
  {
    icon: <FaLinkedin size={15} />,
    href: "https://www.linkedin.com/in/haris-saeed-824a1332b/",
    hoverBg: "linear-gradient(180deg,#812290,#4d227c)",
    label: "LinkedIn",
  },
];

const BuyerFooter = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <>
      <style>{STYLES}</style>

      <footer className="ft-root">
        {/* Ambient orbs */}
        <div
          className="ft-orb"
          style={{
            width: 450,
            height: 450,
            background:
              "radial-gradient(circle,rgba(124,58,237,.15) 0%,transparent 70%)",
            top: -150,
            left: -100,
            animation: "ftOrb 14s ease-in-out infinite",
          }}
        />
        <div
          className="ft-orb"
          style={{
            width: 350,
            height: 350,
            background:
              "radial-gradient(circle,rgba(0,212,255,.1) 0%,transparent 70%)",
            bottom: -80,
            right: -60,
            animation: "ftOrb 17s ease-in-out infinite reverse",
          }}
        />

        <div className="ft-inner">
          {/* Top accent line */}
          <div className="ft-top-line" />

          {/* Main grid */}
          <div className="ft-grid">
            {/* ── Brand Column ── */}
            <div>
              <div className="ft-logo-row">
                <img
                  src={MainLogo}
                  alt="AISmartTrade Logo"
                  className="ft-logo-img"
                />
                <span className="ft-brand-name">AISmartTrade</span>
              </div>

              <p className="ft-tagline">
                Your trusted digital marketplace for wholesale trading. Connect
                with verified sellers and discover quality products in bulk.
              </p>

              {/* Newsletter */}
              <form className="ft-newsletter" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ft-nl-input"
                />
                <button type="submit" className="ft-nl-btn">
                  <FaArrowRight className="ft-nl-arrow" size={13} />
                </button>
              </form>

              {/* Socials */}
              <div className="ft-socials">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ft-soc-btn"
                    aria-label={s.label}
                  >
                    <div
                      className="ft-soc-default"
                      style={{ color: "rgba(255,255,255,.7)" }}
                    >
                      {s.icon}
                    </div>
                    <div
                      className="ft-soc-hover"
                      style={{ background: s.hoverBg, color: "#fff" }}
                    >
                      {s.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <div className="ft-col-title">
                <div className="ft-col-title-dot" />
                Quick Links
              </div>
              <ul className="ft-links">
                {quickLinks.map((lnk, i) => (
                  <li key={i}>
                    <Link to={lnk.to} className="ft-link">
                      <FaArrowRight className="ft-link-arrow" />
                      {lnk.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact ── */}
            <div>
              <div className="ft-col-title">
                <div
                  className="ft-col-title-dot"
                  style={{ animationDelay: ".3s" }}
                />
                Contact
              </div>
              <div className="ft-contacts">
                <div className="ft-contact-item">
                  <div className="ft-contact-icon">
                    <FaEnvelope />
                  </div>
                  <span>harisbhatti07726@gmail.com</span>
                </div>
                <div className="ft-contact-item">
                  <div className="ft-contact-icon">
                    <FaPhone />
                  </div>
                  <span>+92 306 5278287</span>
                </div>
                <div className="ft-contact-item">
                  <div className="ft-contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <span>Green International University</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="ft-bottom">
            <p className="ft-copyright">
              © 2025 AISmartTrade. All rights reserved.
            </p>

            <div className="ft-powered">
              <div className="ft-powered-dot" />
              Developer: Haris Saeed
            </div>

            <div className="ft-legal-links">
              <Link to="/privacy" className="ft-legal-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="ft-legal-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default BuyerFooter;

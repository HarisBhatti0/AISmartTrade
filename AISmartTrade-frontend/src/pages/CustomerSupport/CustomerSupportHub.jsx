import React, { useState } from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaHeadset,
  FaTimes,
  FaShieldAlt,
  FaBoxOpen,
  FaLayerGroup,
  FaQuestionCircle,
} from "react-icons/fa";
import ContactFormModal from "./ContactFormModal";
import { useRoute } from "../../context/RouteContext";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4; --ng:#00ff94;
    --dark:#060912;
  }

  @keyframes cshPing  { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.2);opacity:0} }
  @keyframes cshPulse { 0%,100%{box-shadow:0 0 12px rgba(0,212,255,.5),0 0 0 0 rgba(0,212,255,0)} 50%{box-shadow:0 0 24px rgba(0,212,255,.8),0 0 0 8px rgba(0,212,255,.08)} }
  @keyframes cshIn    { from{opacity:0;transform:translateY(12px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes cshDot   { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes cshShim  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes cshSpin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }

  /* ── FAB button ── */
  .csh-fab {
    position:relative;
    width:58px; height:58px; border-radius:50%;
    background:linear-gradient(135deg,var(--nb),var(--np));
    border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    color:#fff; font-size:24px;
    box-shadow:0 0 24px rgba(0,212,255,.55), 0 8px 32px rgba(0,0,0,.4);
    animation:cshPulse 3s ease-in-out infinite;
    transition:transform .2s;
    z-index:2;
  }
  .csh-fab:hover { transform:scale(1.1); }

  /* ping ring */
  .csh-ping {
    position:absolute; inset:0; border-radius:50%;
    background:rgba(0,212,255,.25);
    animation:cshPing 2s ease-out infinite;
    z-index:1; pointer-events:none;
  }

  /* tooltip */
  .csh-tooltip {
    position:absolute; bottom:68px;
    background:rgba(6,9,18,.95);
    backdrop-filter:blur(12px);
    border:1px solid rgba(0,212,255,.2);
    border-radius:10px;
    padding:5px 12px;
    font-family:'Orbitron',sans-serif;
    font-size:10px; font-weight:600;
    color:var(--nb); letter-spacing:.5px;
    white-space:nowrap;
    opacity:0; pointer-events:none;
    transition:opacity .2s;
    box-shadow:0 0 14px rgba(0,212,255,.2);
  }
  .csh-fab:hover + .csh-ping + .csh-tooltip,
  .csh-fab-wrap:hover .csh-tooltip { opacity:1; }

  /* ── expanded panel ── */
  .csh-panel {
    position:absolute; bottom:72px;
    width:268px;
    background:#060912;
    border:1px solid rgba(0,212,255,.15);
    border-radius:20px;
    overflow:hidden;
    box-shadow:0 16px 60px rgba(0,0,0,.7), 0 0 0 1px rgba(0,212,255,.06);
    animation:cshIn .22s ease-out;
    z-index:10000;
  }

  /* gradient border mask */
  .csh-panel::before {
    content:'';
    position:absolute; inset:-1px; border-radius:20px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.3),transparent 50%,rgba(124,58,237,.3));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    pointer-events:none;
  }

  /* panel header */
  .csh-panel-header {
    padding:14px 16px 12px;
    border-bottom:1px solid rgba(0,212,255,.08);
    display:flex; align-items:center; justify-content:space-between;
    position:relative;
  }
  /* scan line on header */
  .csh-panel-header::after {
    content:'';
    position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,var(--nb),var(--nc),var(--np),transparent);
    background-size:200% 100%;
    animation:cshShim 3s linear infinite;
  }
  .csh-panel-title {
    font-family:'Orbitron',sans-serif;
    font-size:11px; font-weight:700;
    letter-spacing:1px; color:var(--nb);
    display:flex; align-items:center; gap:7px;
  }
  .csh-panel-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--nc); box-shadow:0 0 6px var(--nc);
    animation:cshDot 1.5s ease-in-out infinite;
  }
  .csh-close-btn {
    width:28px; height:28px; border-radius:8px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);
    color:rgba(255,255,255,.5); cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:all .2s; font-size:11px;
  }
  .csh-close-btn:hover {
    background:rgba(255,77,109,.1);
    border-color:rgba(255,77,109,.3);
    color:#ff4d6d;
  }

  /* panel body */
  .csh-panel-body { padding:12px 14px 14px; display:flex; flex-direction:column; gap:8px; }

  /* section label */
  .csh-section-label {
    font-size:9px; font-weight:700; letter-spacing:1.5px;
    color:rgba(255,255,255,.28); text-transform:uppercase;
    margin-bottom:2px; padding:0 2px;
  }

  /* WhatsApp option buttons */
  .csh-wa-btn {
    width:100%; padding:10px 12px;
    background:rgba(0,255,148,.05);
    border:1px solid rgba(0,255,148,.15);
    border-radius:11px;
    display:flex; align-items:center; gap:9px;
    cursor:pointer; transition:all .22s;
    text-align:left;
    font-family:'Inter',sans-serif;
  }
  .csh-wa-btn:hover {
    background:rgba(0,255,148,.1);
    border-color:rgba(0,255,148,.3);
    transform:translateX(3px);
  }
  .csh-wa-icon {
    width:30px; height:30px; border-radius:9px; flex-shrink:0;
    background:rgba(0,255,148,.1);
    border:1px solid rgba(0,255,148,.2);
    display:flex; align-items:center; justify-content:center;
    color:var(--ng); font-size:14px;
    transition:all .22s;
  }
  .csh-wa-btn:hover .csh-wa-icon {
    background:rgba(0,255,148,.18);
    box-shadow:0 0 12px rgba(0,255,148,.3);
  }
  .csh-wa-label { font-size:12px; font-weight:600; color:#fff; }
  .csh-wa-sub   { font-size:10px; color:rgba(255,255,255,.35); }

  /* Option icons map */
  .csh-wa-btn[data-type="order"]   .csh-wa-icon { color:#00ff94; }
  .csh-wa-btn[data-type="product"] .csh-wa-icon { color:var(--nb); background:rgba(0,212,255,.1); border-color:rgba(0,212,255,.2); }
  .csh-wa-btn[data-type="product"]:hover .csh-wa-icon { background:rgba(0,212,255,.18); box-shadow:0 0 12px rgba(0,212,255,.3); }
  .csh-wa-btn[data-type="bulk"]    .csh-wa-icon { color:#a78bfa; background:rgba(124,58,237,.1); border-color:rgba(124,58,237,.2); }
  .csh-wa-btn[data-type="bulk"]:hover .csh-wa-icon { background:rgba(124,58,237,.18); box-shadow:0 0 12px rgba(124,58,237,.3); }
  .csh-wa-btn[data-type="general"] .csh-wa-icon { color:var(--nb); }

  /* divider */
  .csh-divider {
    height:1px;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,.15),transparent);
    margin:2px 0;
  }

  /* email support btn */
  .csh-email-btn {
    width:100%; padding:11px 14px;
    background:linear-gradient(135deg,var(--nb),var(--np));
    border:none; border-radius:12px;
    display:flex; align-items:center; justify-content:center; gap:8px;
    cursor:pointer; transition:all .25s;
    font-family:'Inter',sans-serif;
    font-size:12px; font-weight:700; color:#fff;
    box-shadow:0 0 20px rgba(0,212,255,.35);
  }
  .csh-email-btn:hover {
    transform:scale(1.03);
    box-shadow:0 0 34px rgba(0,212,255,.6),0 0 60px rgba(124,58,237,.3);
  }

  /* footer note */
  .csh-footer-note {
    text-align:center; font-size:10px;
    color:rgba(255,255,255,.22);
    padding-top:4px; letter-spacing:.3px;
  }
`;

const optionIcons = {
  order: <FaBoxOpen />,
  product: <FaShieldAlt />,
  bulk: <FaLayerGroup />,
  general: <FaQuestionCircle />,
};

const optionSubs = {
  order: "Track, return, or modify",
  product: "Specs, availability, pricing",
  bulk: "Wholesale & B2B inquiries",
  general: "Anything else",
};

const CustomerSupportHub = () => {
  const { getUserType } = useRoute();
  const userType = getUserType();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const whatsappNumber = "923124416437";

  const supportOptions = [
    {
      key: "order",
      label: "Order Help",
      message: "Hello! I need help with my order.",
    },
    {
      key: "product",
      label: "Product Info",
      message: "Hello! I have a question about a product.",
    },
    {
      key: "bulk",
      label: "Bulk Order",
      message: "Hello! I want to place a bulk order.",
    },
    {
      key: "general",
      label: "General Help",
      message: "Hello! I need general assistance.",
    },
  ];

  const isLeft = userType === "seller";

  const positionStyle = {
    position: "fixed",
    bottom: 24,
    [isLeft ? "left" : "right"]: 24,
    zIndex: 9999,
  };

  const panelStyle = {
    [isLeft ? "left" : "right"]: 0,
  };

  const tooltipStyle = {
    [isLeft ? "left" : "right"]: 0,
  };

  const handleWhatsAppClick = (message = "Hello! I need help.") => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setIsExpanded(false);
  };

  const handleContactFormClick = () => {
    setShowContactForm(true);
    setIsExpanded(false);
  };

  if (userType === "admin") return null;
  if (userType !== "buyer" && userType !== "seller") return null;

  return (
    <>
      <style>{STYLES}</style>

      <div style={positionStyle}>
        {/* ── Expanded panel ── */}
        {isExpanded && (
          <div className="csh-panel" style={panelStyle}>
            {/* Header */}
            <div className="csh-panel-header">
              <div className="csh-panel-title">
                <div className="csh-panel-dot" />
                Customer Service
              </div>
              <button
                className="csh-close-btn"
                onClick={() => setIsExpanded(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="csh-panel-body">
              <div className="csh-section-label">WhatsApp — Instant Reply</div>

              {supportOptions.map((opt) => (
                <button
                  key={opt.key}
                  data-type={opt.key}
                  className="csh-wa-btn"
                  onClick={() => handleWhatsAppClick(opt.message)}
                >
                  <div className="csh-wa-icon">{optionIcons[opt.key]}</div>
                  <div>
                    <div className="csh-wa-label">{opt.label}</div>
                    <div className="csh-wa-sub">{optionSubs[opt.key]}</div>
                  </div>
                </button>
              ))}

              <div className="csh-divider" />

              <button
                className="csh-email-btn"
                onClick={handleContactFormClick}
              >
                <FaEnvelope size={12} />
                Email Support
              </button>

              <div className="csh-footer-note">
                Choose your preferred support method
              </div>
            </div>
          </div>
        )}

        {/* ── FAB wrapper ── */}
        <div
          className="csh-fab-wrap"
          style={{ position: "relative", display: "inline-block" }}
        >
          <button
            className="csh-fab"
            onClick={() => setIsExpanded((v) => !v)}
            title="Customer Service"
          >
            <FaHeadset />
          </button>

          {/* Ping ring */}
          <div className="csh-ping" />

          {/* Tooltip */}
          <div className="csh-tooltip" style={tooltipStyle}>
            Customer Service
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />
    </>
  );
};

export default CustomerSupportHub;

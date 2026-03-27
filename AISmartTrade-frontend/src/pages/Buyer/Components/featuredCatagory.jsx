import React, { useState, useEffect, memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaShoppingBag,
  FaMobile,
  FaHome,
  FaTshirt,
  FaUtensils,
  FaFutbol,
  FaBriefcase,
  FaStar,
  FaChartLine,
  FaLayerGroup,
  FaPercentage,
  FaTags,
} from "react-icons/fa";
import API from "../../../api/axiosInstance";
import { getImageUrl } from "../../../../utils/imageHelper";

/* ─── Icon map ─── */
const iconMap = {
  Electronics: FaMobile,
  "Clothing & Fashion": FaTshirt,
  "Home & Kitchen": FaHome,
  "Food & Beverages": FaUtensils,
  "Sports & Fitness": FaFutbol,
  "Office Supplies": FaBriefcase,
};
const getCategoryIcon = (name) => iconMap[name] || FaShoppingBag;

const cache = new Map();

/* ─── Styles ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap');

  :root{
    --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4; --ng:#00ff94;
    --dark:#060912; --glass:rgba(255,255,255,0.04); --gb:rgba(0,212,255,0.12);
  }

  @keyframes fcGrid { 0%,100%{opacity:.04} 50%{opacity:.08} }
  @keyframes fcOrb  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-16px) scale(1.06)} }
  @keyframes fcGlow { 0%,100%{box-shadow:0 0 10px rgba(0,212,255,.3)} 50%{box-shadow:0 0 28px rgba(0,212,255,.7),0 0 56px rgba(124,58,237,.3)} }
  @keyframes fcIn   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fcShim { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes fcDot  { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.2)} }
  @keyframes fcPulse{ 0%,100%{box-shadow:0 0 8px rgba(0,212,255,.25),inset 0 0 8px rgba(0,212,255,.05)}
                      50%{box-shadow:0 0 22px rgba(0,212,255,.5),inset 0 0 14px rgba(0,212,255,.1)} }
  @keyframes fcArrow{ 0%,100%{transform:translateX(0)} 50%{transform:translateX(4px)} }
  @keyframes fcScan { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes fcBadge{ from{opacity:0;transform:translateY(-6px) scale(.9)} to{opacity:1;transform:translateY(0) scale(1)} }

  /* ── section ── */
  .fc-section{
    padding:80px 0;
    background:var(--dark);
    position:relative; overflow:hidden;
  }
  .fc-section::before{
    content:'';
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px);
    background-size:56px 56px;
    animation:fcGrid 5s ease-in-out infinite;
    pointer-events:none;
  }
  .fc-orb{
    position:absolute; border-radius:50%;
    filter:blur(80px); pointer-events:none; z-index:0;
  }
  .fc-inner{ max-width:1280px; margin:0 auto; padding:0 24px; position:relative; z-index:1; }

  /* ── section heading ── */
  .fc-badge{
    display:inline-flex; align-items:center; gap:8px;
    padding:6px 18px; border-radius:50px;
    background:rgba(0,212,255,.08);
    border:1px solid rgba(0,212,255,.22);
    font-size:12px; font-weight:600; letter-spacing:1px;
    color:var(--nb); text-transform:uppercase;
    margin-bottom:18px;
  }
  .fc-badge-dot{
    width:7px; height:7px; border-radius:50%;
    background:var(--nc); box-shadow:0 0 8px var(--nc);
    animation:fcDot 1.6s ease-in-out infinite;
  }
  .fc-heading{
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1.6rem,4vw,2.6rem);
    font-weight:900; color:#fff;
    line-height:1.15; margin:0 0 14px;
    text-align:center;
  }
  .fc-heading-grad{
    background:linear-gradient(135deg,var(--nb) 0%,var(--nc) 50%,var(--np) 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:fcShim 3s linear infinite;
  }
  .fc-subtext{ font-size:16px; color:rgba(255,255,255,.45); max-width:560px; margin:0 auto; line-height:1.7; text-align:center; }

  /* ── grid ── */
  .fc-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
    gap:24px;
    margin-top:48px;
  }

  /* ── card ── */
  .fc-card-wrap{
    position:relative;
    animation:fcIn .6s ease both;
  }
  .fc-card{
    display:flex; flex-direction:column;
    background:var(--glass);
    backdrop-filter:blur(18px);
    border-radius:22px;
    border:1px solid var(--gb);
    overflow:hidden; height:100%;
    text-decoration:none; color:inherit;
    transition:border-color .35s, box-shadow .35s, transform .35s;
    position:relative;
  }
  .fc-card::before{
    content:'';
    position:absolute; inset:-1px; border-radius:22px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.2),transparent 55%,rgba(124,58,237,.2));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    pointer-events:none; transition:opacity .35s;
  }
  .fc-card:hover{
    border-color:rgba(0,212,255,.35);
    box-shadow:0 0 0 1px rgba(0,212,255,.15),0 20px 60px rgba(0,0,0,.6),0 0 40px rgba(0,212,255,.08);
    transform:translateY(-6px);
  }
  .fc-card:hover::before{ opacity:2; }

  /* image */
  .fc-img-wrap{
    height:192px; overflow:hidden;
    position:relative; flex-shrink:0;
    background:rgba(0,212,255,.04);
  }
  .fc-img-wrap img{ width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
  .fc-card:hover .fc-img-wrap img{ transform:scale(1.06); }

  /* scan on image hover */
  .fc-img-scan{
    position:absolute; inset:0; pointer-events:none;
    overflow:hidden;
  }
  .fc-img-scan::after{
    content:''; position:absolute; top:0; bottom:0; left:0;
    width:40%;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,.07),transparent);
    animation:fcScan 2.5s ease-in-out infinite;
    opacity:0; transition:opacity .3s;
  }
  .fc-card:hover .fc-img-scan::after{ opacity:1; }

  /* icon chip */
  .fc-icon-chip{
    position:absolute; top:14px; left:14px;
    background:rgba(5,8,16,.75);
    backdrop-filter:blur(14px);
    border:1px solid rgba(0,212,255,.22);
    border-radius:12px; padding:10px;
    display:flex; align-items:center; justify-content:center;
    transition:all .3s;
  }
  .fc-card:hover .fc-icon-chip{
    background:rgba(0,212,255,.12);
    border-color:var(--nb);
    box-shadow:0 0 16px rgba(0,212,255,.35);
  }

  /* bulk badge */
  .fc-bulk-badge{
    position:absolute; top:14px; right:14px;
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff; padding:5px 12px; border-radius:50px;
    font-size:11px; font-weight:700; letter-spacing:.5px;
    display:flex; align-items:center; gap:5px;
    box-shadow:0 0 16px rgba(0,212,255,.4);
  }

  /* body */
  .fc-body{ padding:22px; display:flex; flex-direction:column; flex:1; }

  .fc-cat-name{
    font-family:'Orbitron',sans-serif;
    font-size:15px; font-weight:700; color:#fff;
    margin:0 0 8px; letter-spacing:.3px;
    transition:color .3s;
  }
  .fc-card:hover .fc-cat-name{ color:var(--nb); text-shadow:0 0 20px rgba(0,212,255,.4); }

  .fc-desc{ font-size:13px; color:rgba(255,255,255,.45); line-height:1.65; flex:1; margin-bottom:16px; }

  /* tags row */
  .fc-tags{ display:flex; flex-wrap:wrap; gap:7px; margin-bottom:14px; }
  .fc-tag{
    display:inline-flex; align-items:center; gap:5px;
    padding:4px 11px; border-radius:50px;
    font-size:11px; font-weight:600;
    border:1px solid;
  }
  .fc-tag-blue{ background:rgba(0,212,255,.07); border-color:rgba(0,212,255,.2); color:var(--nb); }
  .fc-tag-green{ background:rgba(0,255,148,.07); border-color:rgba(0,255,148,.2); color:var(--ng); }

  /* pricing strip */
  .fc-pricing{
    border-radius:12px; padding:12px 14px;
    margin-bottom:16px;
    display:flex; align-items:center; justify-content:space-between;
    border:1px solid;
  }
  .fc-pricing-bulk{
    background:rgba(0,255,148,.05);
    border-color:rgba(0,255,148,.18);
  }
  .fc-pricing-std{
    background:rgba(0,212,255,.05);
    border-color:rgba(0,212,255,.15);
  }
  .fc-pricing-label{ font-size:12px; font-weight:600; }
  .fc-pricing-val  { font-size:13px; font-weight:700; font-family:'Orbitron',sans-serif; }
  .fc-pricing-note { font-size:10px; margin-top:3px; opacity:.6; }

  /* explore row */
  .fc-explore{
    display:flex; align-items:center; justify-content:space-between;
    padding-top:14px;
    border-top:1px solid rgba(255,255,255,.06);
    margin-top:auto;
    transition:border-color .3s;
  }
  .fc-card:hover .fc-explore{ border-color:rgba(0,212,255,.15); }
  .fc-explore-label{
    font-size:13px; font-weight:600; color:rgba(255,255,255,.5);
    transition:color .3s;
  }
  .fc-card:hover .fc-explore-label{ color:var(--nb); }
  .fc-arrow-wrap{
    width:34px; height:34px; border-radius:50%;
    background:rgba(0,212,255,.08);
    border:1px solid rgba(0,212,255,.2);
    display:flex; align-items:center; justify-content:center;
    color:var(--nb); font-size:13px;
    transition:all .3s;
  }
  .fc-card:hover .fc-arrow-wrap{
    background:linear-gradient(135deg,var(--nb),var(--np));
    border-color:transparent; color:#fff;
    box-shadow:0 0 16px rgba(0,212,255,.45);
  }
  .fc-card:hover .fc-arrow-icon{ animation:fcArrow .6s ease-in-out infinite; }

  /* hover star badge */
  .fc-star-badge{
    position:absolute; top:-10px; right:-10px; z-index:20;
    background:rgba(5,8,16,.85);
    backdrop-filter:blur(12px);
    border:1px solid rgba(0,212,255,.3);
    color:var(--nb);
    padding:5px 12px; border-radius:50px;
    font-size:11px; font-weight:700; letter-spacing:.5px;
    display:flex; align-items:center; gap:5px;
    animation:fcBadge .25s ease both;
    box-shadow:0 0 16px rgba(0,212,255,.3);
  }

  /* ── empty state ── */
  .fc-empty{
    text-align:center; padding:64px 24px;
    background:var(--glass);
    border:1px solid var(--gb);
    border-radius:22px; max-width:420px; margin:0 auto;
    position:relative; overflow:hidden;
  }
  .fc-empty-icon{
    width:64px; height:64px;
    background:rgba(0,212,255,.08);
    border:1px solid rgba(0,212,255,.2);
    border-radius:18px;
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 18px; font-size:24px; color:var(--nb);
  }

  /* ── CTA banner ── */
  .fc-cta{
    margin-top:56px; padding:40px 32px;
    background:var(--glass);
    backdrop-filter:blur(18px);
    border:1px solid var(--gb);
    border-radius:22px;
    text-align:center; position:relative; overflow:hidden;
    animation:fcPulse 4s ease-in-out infinite;
  }
  .fc-cta::before{
    content:'';
    position:absolute; inset:-1px; border-radius:22px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.3),transparent 50%,rgba(124,58,237,.3));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
  }
  .fc-cta-title{
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1.1rem,2.5vw,1.5rem);
    font-weight:700; color:#fff; margin-bottom:10px;
  }
  .fc-cta-sub{ font-size:14px; color:rgba(255,255,255,.45); margin-bottom:28px; }
  .fc-cta-btn{
    display:inline-flex; align-items:center; gap:10px;
    padding:14px 32px; border-radius:14px; border:none;
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff; font-weight:700; font-size:15px;
    font-family:'Inter',sans-serif; cursor:pointer;
    box-shadow:0 0 28px rgba(0,212,255,.45);
    transition:transform .25s, box-shadow .3s;
    text-decoration:none;
  }
  .fc-cta-btn:hover{
    transform:scale(1.05);
    box-shadow:0 0 50px rgba(0,212,255,.65),0 0 90px rgba(124,58,237,.3);
  }
  .fc-empty-btn{
    display:inline-flex; align-items:center; gap:8px;
    padding:11px 24px; border-radius:12px; border:none;
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff; font-weight:700; font-size:13px;
    font-family:'Inter',sans-serif; cursor:pointer;
    box-shadow:0 0 20px rgba(0,212,255,.35);
    transition:transform .2s, box-shadow .3s;
    text-decoration:none;
  }
  .fc-empty-btn:hover{
    transform:scale(1.04);
    box-shadow:0 0 35px rgba(0,212,255,.6);
  }
`;

/* ═══════════════════════════════════════════ */
const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = useCallback((i) => setHoveredCard(i), []);
  const handleMouseLeave = useCallback(() => setHoveredCard(null), []);

  useEffect(() => {
    const fetchCategories = async () => {
      const key = "featured-categories";
      if (cache.has(key)) {
        setCategories(cache.get(key));
        return;
      }
      try {
        const res = await API.get("/categories/featured/with-stats");
        const data = res.data || [];
        setCategories(data);
        cache.set(key, data);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const go = (path) => {
    navigate(path, { state: { scrollToTop: true } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCategoryClick = (e, id) => {
    e.preventDefault();
    go(`/products?category=${id}`);
  };
  const handleViewAll = (e) => {
    e.preventDefault();
    go("/categories");
  };

  /* ── Card ── */
  const CategoryCard = memo(({ category, index }) => {
    const Icon = getCategoryIcon(category.name);
    const isHovered = hoveredCard === index;

    return (
      <div
        className="fc-card-wrap"
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to={`/products?category=${category._id}`}
          onClick={(e) => handleCategoryClick(e, category._id)}
          className="fc-card"
        >
          {/* Image */}
          <div className="fc-img-wrap">
            <img src={getImageUrl(category.image)} alt={category.name} />
            <div className="fc-img-scan" />

            {/* Icon chip */}
            <div className="fc-icon-chip">
              <Icon style={{ color: "var(--nb)", fontSize: 18 }} />
            </div>

            {/* Bulk badge */}
            {category.isBulkEnabled && (
              <div className="fc-bulk-badge">
                <FaPercentage style={{ fontSize: 10 }} />
                Bulk Deals
              </div>
            )}
          </div>

          {/* Body */}
          <div className="fc-body">
            <div className="fc-cat-name">{category.name}</div>
            <p className="fc-desc">
              {category.description || "Explore our premium collection"}
            </p>

            {/* Tags */}
            <div className="fc-tags">
              <span className="fc-tag fc-tag-blue">
                <FaChartLine style={{ fontSize: 10 }} />
                {category.productCount} products
              </span>
              {category.isBulkEnabled && (
                <span className="fc-tag fc-tag-green">
                  <FaLayerGroup style={{ fontSize: 10 }} />
                  {category.bulkProducts} bulk
                </span>
              )}
            </div>

            {/* Pricing strip */}
            <div
              className={`fc-pricing ${category.isBulkEnabled ? "fc-pricing-bulk" : "fc-pricing-std"}`}
            >
              <div>
                <div
                  className="fc-pricing-label"
                  style={{
                    color: category.isBulkEnabled ? "var(--ng)" : "var(--nb)",
                  }}
                >
                  {category.isBulkEnabled ? "Bulk Discount" : "Pricing"}
                </div>
                {!category.isBulkEnabled && (
                  <div
                    className="fc-pricing-note"
                    style={{ color: "var(--nb)" }}
                  >
                    Contact for wholesale
                  </div>
                )}
              </div>
              <div
                className="fc-pricing-val"
                style={{
                  color: category.isBulkEnabled ? "var(--ng)" : "var(--nb)",
                }}
              >
                {category.isBulkEnabled
                  ? category.discountRange
                  : "Competitive"}
              </div>
            </div>

            {/* Explore row */}
            <div className="fc-explore">
              <span className="fc-explore-label">Explore Category</span>
              <div className="fc-arrow-wrap">
                <FaArrowRight className="fc-arrow-icon" />
              </div>
            </div>
          </div>
        </Link>

        {/* Hover star badge */}
        {isHovered && (
          <div className="fc-star-badge">
            <FaStar style={{ color: "var(--nc)", fontSize: 11 }} />
            Featured
          </div>
        )}
      </div>
    );
  });
  CategoryCard.displayName = "CategoryCard";

  return (
    <section className="fc-section">
      <style>{STYLES}</style>

      {/* Ambient orbs */}
      <div
        className="fc-orb"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle,rgba(124,58,237,.2) 0%,transparent 70%)",
          top: -180,
          left: -120,
          animation: "fcOrb 13s ease-in-out infinite",
        }}
      />
      <div
        className="fc-orb"
        style={{
          width: 380,
          height: 380,
          background:
            "radial-gradient(circle,rgba(0,212,255,.15) 0%,transparent 70%)",
          top: 100,
          right: -100,
          animation: "fcOrb 16s ease-in-out infinite reverse",
        }}
      />
      <div
        className="fc-orb"
        style={{
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle,rgba(6,255,212,.1) 0%,transparent 70%)",
          bottom: -60,
          left: "40%",
          animation: "fcOrb 11s ease-in-out infinite 2s",
        }}
      />

      <div className="fc-inner">
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 0 }}>
          <div className="fc-badge">
            <div className="fc-badge-dot" />
            B2B Bulk Categories
          </div>
          <h2 className="fc-heading">
            Featured{" "}
            <span className="fc-heading-grad">Business Categories</span>
          </h2>
          <p className="fc-subtext">
            Discover wholesale opportunities with competitive pricing across all
            major product categories
          </p>
        </div>

        {/* Empty state */}
        {categories.length === 0 ? (
          <div style={{ marginTop: 48 }}>
            <div className="fc-empty">
              <div className="fc-empty-icon">
                <FaTags />
              </div>
              <div
                style={{
                  fontFamily: "'Orbitron',sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                No Featured Categories
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,.4)",
                  marginBottom: 22,
                }}
              >
                Check back later for featured categories
              </p>
              <Link
                to="/categories"
                onClick={handleViewAll}
                className="fc-empty-btn"
              >
                <FaLayerGroup /> View All Categories
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="fc-grid">
              {categories.map((cat, i) => (
                <CategoryCard key={cat._id} category={cat} index={i} />
              ))}
            </div>

            {/* CTA banner */}
            <div className="fc-cta">
              {/* Glow orb inside */}
              <div
                style={{
                  position: "absolute",
                  width: 300,
                  height: 300,
                  background:
                    "radial-gradient(circle,rgba(0,212,255,.08) 0%,transparent 70%)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />

              <div className="fc-cta-title">Ready to Scale Your Business?</div>
              <p className="fc-cta-sub">
                Get access to competitive pricing and wholesale deals across all
                categories
              </p>
              <Link
                to="/categories"
                onClick={handleViewAll}
                className="fc-cta-btn"
              >
                <FaLayerGroup />
                View All Categories
                <FaArrowRight />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaEye,
  FaSync,
  FaRobot,
  FaExclamationTriangle,
  FaHeart,
  FaChartLine,
  FaPercentage,
  FaLayerGroup,
  FaArrowRight,
  FaBolt,
  FaStore,
  FaShieldAlt,
  FaTag,
} from "react-icons/fa";
import API, { SERVER_URL } from "../../../api/axiosInstance";
import { toast } from "react-toastify";

/* ─── Styles ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap');

  :root{
    --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4; --ng:#00ff94;
    --nr:#ff4d6d; --ny:#ffd700;
    --dark:#060912; --glass:rgba(255,255,255,0.04); --gb:rgba(0,212,255,0.12);
  }

  @keyframes arGrid { 0%,100%{opacity:.04} 50%{opacity:.08} }
  @keyframes arOrb  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(22px,-16px) scale(1.06)} }
  @keyframes arShim { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes arIn   { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
  @keyframes arDot  { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes arScan { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes arPulse{ 0%,100%{box-shadow:0 0 10px rgba(0,212,255,.25)} 50%{box-shadow:0 0 28px rgba(0,212,255,.6),0 0 56px rgba(124,58,237,.25)} }
  @keyframes arBadge{ from{opacity:0;transform:scale(.85) translateY(-4px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes arHeart{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.35)} }
  @keyframes arFlyCart{
    0%  {transform:translateY(0) scale(1); opacity:1;}
    60% {transform:translateY(-16px) scale(.8); opacity:.7;}
    100%{transform:translateY(0) scale(1); opacity:1;}
  }
  @keyframes arGlow { 0%,100%{box-shadow:0 0 8px rgba(0,212,255,.3)} 50%{box-shadow:0 0 22px rgba(0,212,255,.7),0 0 44px rgba(124,58,237,.3)} }

  /* ── section ── */
  .ar-section{
    padding:80px 0; background:var(--dark);
    position:relative; overflow:hidden;
  }
  .ar-section::before{
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px);
    background-size:54px 54px;
    animation:arGrid 5s ease-in-out infinite; pointer-events:none;
  }
  .ar-orb{
    position:absolute; border-radius:50%;
    filter:blur(80px); pointer-events:none; z-index:0;
  }
  .ar-inner{ max-width:1280px; margin:0 auto; padding:0 24px; position:relative; z-index:1; }

  /* ── heading ── */
  .ar-badge{
    display:inline-flex; align-items:center; gap:8px;
    padding:6px 18px; border-radius:50px;
    background:rgba(0,212,255,.08); border:1px solid rgba(0,212,255,.22);
    font-size:12px; font-weight:600; letter-spacing:1px; color:var(--nb);
    text-transform:uppercase; margin-bottom:18px;
  }
  .ar-badge-dot{
    width:7px; height:7px; border-radius:50%;
    background:var(--nc); box-shadow:0 0 8px var(--nc);
    animation:arDot 1.5s ease-in-out infinite;
  }
  .ar-heading{
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1.5rem,3.5vw,2.5rem); font-weight:900;
    color:#fff; line-height:1.15; margin:0 0 12px;
    text-align:center;
  }
  .ar-heading-grad{
    background:linear-gradient(135deg,var(--nb) 0%,var(--nc) 50%,var(--np) 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:arShim 3s linear infinite;
  }
  .ar-subtext{ font-size:15px; color:rgba(255,255,255,.42); max-width:540px; margin:0 auto; line-height:1.7; text-align:center; }

  /* ── error banner ── */
  .ar-err-banner{
    margin-bottom:24px; padding:12px 18px; border-radius:12px;
    background:rgba(255,193,7,.07); border:1px solid rgba(255,193,7,.25);
    font-size:13px; color:rgba(255,193,7,.85); text-align:center;
  }

  /* ── grid ── */
  .ar-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(230px,1fr));
    gap:20px; margin-top:48px;
  }

  /* ── card wrap ── */
  .ar-card-wrap{
    position:relative;
    animation:arIn .55s ease both;
  }

  /* ── product card ── */
  .ar-card{
    display:flex; flex-direction:column; height:100%;
    background:var(--glass); backdrop-filter:blur(18px);
    border:1px solid var(--gb); border-radius:20px; overflow:hidden;
    transition:border-color .35s, box-shadow .35s, transform .35s;
    position:relative; cursor:default;
  }
  .ar-card::before{
    content:''; position:absolute; inset:-1px; border-radius:20px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.18),transparent 55%,rgba(124,58,237,.18));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none; transition:opacity .35s;
  }
  .ar-card:hover{
    border-color:rgba(0,212,255,.32);
    box-shadow:0 0 0 1px rgba(0,212,255,.12),0 18px 55px rgba(0,0,0,.6),0 0 35px rgba(0,212,255,.07);
    transform:translateY(-5px);
  }
  .ar-card:hover::before{ opacity:1.8; }

  /* image */
  .ar-img-wrap{
    height:192px; overflow:hidden;
    position:relative; flex-shrink:0; background:rgba(0,212,255,.03);
  }
  .ar-img-wrap img{ width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
  .ar-card:hover .ar-img-wrap img{ transform:scale(1.07); }

  /* scan on hover */
  .ar-img-scan{ position:absolute; inset:0; pointer-events:none; overflow:hidden; }
  .ar-img-scan::after{
    content:''; position:absolute; top:0; bottom:0; left:0; width:40%;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,.07),transparent);
    animation:arScan 2.4s ease-in-out infinite; opacity:0; transition:opacity .3s;
  }
  .ar-card:hover .ar-img-scan::after{ opacity:1; }

  /* image overlay */
  .ar-img-overlay{
    position:absolute; inset:0;
    background:linear-gradient(to top,rgba(5,8,16,.45) 0%,transparent 60%);
    pointer-events:none;
  }

  /* pill badges on image */
  .ar-img-pill{
    position:absolute; display:inline-flex; align-items:center; gap:4px;
    padding:4px 10px; border-radius:50px;
    font-size:10px; font-weight:700; letter-spacing:.4px;
  }
  .ar-pill-ai{
    top:12px; left:12px;
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff; box-shadow:0 0 12px rgba(0,212,255,.45);
  }
  .ar-pill-discount{
    top:12px; right:12px;
    background:var(--nr); color:#fff;
    box-shadow:0 0 10px rgba(255,77,109,.4);
  }
  .ar-pill-verified{
    bottom:12px; right:12px;
    background:rgba(0,255,148,.12); border:1px solid rgba(0,255,148,.3);
    color:var(--ng);
  }
  .ar-pill-bulk{
    bottom:12px; right:12px;
    background:rgba(0,212,255,.1); border:1px solid rgba(0,212,255,.25);
    color:var(--nb);
  }
  .ar-pill-bulk-v{ bottom:40px; }
  .ar-pill-featured{
    bottom:12px; left:12px;
    background:rgba(255,215,0,.12); border:1px solid rgba(255,215,0,.3);
    color:var(--ny);
  }

  /* wishlist btn */
  .ar-wish-btn{
    position:absolute; top:12px; right:48px; z-index:5;
    width:30px; height:30px; border-radius:50%;
    background:rgba(5,8,16,.6); backdrop-filter:blur(8px);
    border:1px solid rgba(255,255,255,.12);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; opacity:0; transition:opacity .2s, transform .2s;
  }
  .ar-card:hover .ar-wish-btn{ opacity:1; }
  .ar-wish-btn:hover{ transform:scale(1.15); }
  .ar-wish-btn.wished{ opacity:1; }
  .ar-wish-btn.wished svg{ animation:arHeart .4s ease; }

  /* body */
  .ar-body{ padding:16px; display:flex; flex-direction:column; flex:1; }

  .ar-cat{
    font-size:10px; color:rgba(255,255,255,.35);
    text-transform:uppercase; letter-spacing:1px; margin-bottom:6px; font-weight:500;
  }
  .ar-name{
    font-size:13px; font-weight:600; color:#fff;
    line-height:1.45; min-height:2.6em;
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
    margin-bottom:10px; transition:color .25s;
  }
  .ar-card:hover .ar-name{ color:var(--nb); }

  /* stars */
  .ar-stars{ display:flex; align-items:center; gap:6px; margin-bottom:10px; }
  .ar-star-count{ font-size:10px; color:rgba(255,255,255,.35); }

  /* price */
  .ar-price-row{ margin-bottom:10px; }
  .ar-price{
    font-family:'Orbitron',sans-serif; font-size:16px; font-weight:700;
    color:var(--nb); text-shadow:0 0 14px rgba(0,212,255,.35);
  }
  .ar-price-orig{ font-size:12px; color:rgba(255,255,255,.3); text-decoration:line-through; margin-left:7px; }

  /* stock */
  .ar-stock-row{ display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
  .ar-stock-pill{
    font-size:10px; font-weight:600; padding:3px 10px; border-radius:50px;
  }
  .ar-stock-in { background:rgba(0,255,148,.1); border:1px solid rgba(0,255,148,.25); color:var(--ng); }
  .ar-stock-low{ background:rgba(255,77,109,.1); border:1px solid rgba(255,77,109,.25); color:var(--nr); }
  .ar-bulk-pill{
    font-size:10px; font-weight:600; padding:3px 10px; border-radius:50px;
    background:rgba(0,212,255,.08); border:1px solid rgba(0,212,255,.2); color:var(--nb);
  }

  /* action buttons */
  .ar-actions{ display:flex; gap:8px; margin-top:auto; }
  .ar-btn-view{
    flex:1; padding:9px 0; border-radius:10px; font-size:12px; font-weight:600;
    background:rgba(0,212,255,.07); border:1px solid rgba(0,212,255,.22);
    color:var(--nb); display:flex; align-items:center; justify-content:center; gap:5px;
    text-decoration:none; transition:all .25s;
    font-family:'Inter',sans-serif;
  }
  .ar-btn-view:hover{
    background:rgba(0,212,255,.15); border-color:var(--nb);
    box-shadow:0 0 16px rgba(0,212,255,.25); transform:scale(1.03);
  }
  .ar-btn-cart{
    flex:1; padding:9px 0; border-radius:10px; font-size:12px; font-weight:600;
    background:linear-gradient(135deg,var(--nb),var(--np));
    border:none; color:#fff; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:5px;
    transition:all .25s; box-shadow:0 0 14px rgba(0,212,255,.3);
    font-family:'Inter',sans-serif;
  }
  .ar-btn-cart:hover{
    box-shadow:0 0 28px rgba(0,212,255,.55),0 0 55px rgba(124,58,237,.25);
    transform:scale(1.03);
  }
  .ar-btn-cart:active .ar-cart-icon{ animation:arFlyCart .4s ease; }

  /* smart match badge */
  .ar-smart-badge{
    position:absolute; top:-10px; right:-10px; z-index:20;
    background:rgba(5,8,16,.88); backdrop-filter:blur(12px);
    border:1px solid rgba(0,212,255,.3); color:var(--nb);
    padding:5px 11px; border-radius:50px;
    font-size:10px; font-weight:700; letter-spacing:.5px;
    display:flex; align-items:center; gap:4px;
    animation:arBadge .2s ease both;
    box-shadow:0 0 14px rgba(0,212,255,.3);
  }

  /* ── state screens ── */
  .ar-state{
    text-align:center; padding:64px 24px;
    background:var(--glass); border:1px solid var(--gb);
    border-radius:22px; max-width:480px; margin:0 auto; position:relative; overflow:hidden;
  }
  .ar-state-icon{
    width:70px; height:70px; border-radius:20px;
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 20px; font-size:28px;
  }
  .ar-state-title{
    font-family:'Orbitron',sans-serif; font-size:17px; font-weight:700;
    color:#fff; margin-bottom:10px;
  }
  .ar-state-sub{ font-size:13px; color:rgba(255,255,255,.4); margin-bottom:26px; line-height:1.6; }
  .ar-state-btn{
    display:inline-flex; align-items:center; gap:8px;
    padding:12px 26px; border-radius:14px; border:none;
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff; font-weight:700; font-size:13px;
    font-family:'Inter',sans-serif; cursor:pointer;
    box-shadow:0 0 22px rgba(0,212,255,.4); text-decoration:none;
    transition:transform .2s, box-shadow .3s;
  }
  .ar-state-btn:hover{ transform:scale(1.05); box-shadow:0 0 38px rgba(0,212,255,.65); }

  /* ── footer CTA ── */
  .ar-cta{
    margin-top:56px; padding:36px 28px;
    background:var(--glass); backdrop-filter:blur(18px);
    border:1px solid var(--gb); border-radius:22px; text-align:center;
    position:relative; overflow:hidden;
    animation:arPulse 4s ease-in-out infinite;
  }
  .ar-cta::before{
    content:''; position:absolute; inset:-1px; border-radius:22px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.25),transparent 50%,rgba(124,58,237,.25));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
  }
  .ar-cta-title{
    font-family:'Orbitron',sans-serif; font-size:clamp(1rem,2vw,1.35rem);
    font-weight:700; color:#fff; margin-bottom:8px;
  }
  .ar-cta-sub{ font-size:13px; color:rgba(255,255,255,.42); margin-bottom:24px; }
  .ar-cta-btn{
    display:inline-flex; align-items:center; gap:8px;
    padding:13px 28px; border-radius:14px; border:none;
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff; font-weight:700; font-size:14px;
    font-family:'Inter',sans-serif; cursor:pointer;
    box-shadow:0 0 24px rgba(0,212,255,.4); text-decoration:none;
    transition:transform .25s, box-shadow .3s;
  }
  .ar-cta-btn:hover{ transform:scale(1.05); box-shadow:0 0 44px rgba(0,212,255,.65),0 0 80px rgba(124,58,237,.3); }

  /* footer note */
  .ar-foot-note{
    margin-top:20px; text-align:center;
    font-size:11px; color:rgba(255,255,255,.28);
    display:flex; align-items:center; justify-content:center; gap:7px;
    letter-spacing:.4px;
  }
`;

/* ─── helpers ─── */
const mapProductData = (p) => ({
  _id: p._id,
  name: p.name,
  price: p.price,
  salePrice: p.salePrice,
  images: p.images || ["Image Error"],
  averageRating: p.averageRating || 0,
  numReviews: p.numReviews || 0,
  category: p.category || { name: "General" },
  seller: p.seller || { name: "Seller", storeName: "Store", role: "seller" },
  stock: p.stock || 0,
  description: p.description || "Quality product for your business",
  bulkPricingEnabled: p.bulkPricingEnabled || false,
  featured: p.featured || false,
  tags: p.tags || [],
});

const getImgSrc = (images) => {
  if (!images?.length)
    return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop";
  const img = images[0];
  if (typeof img === "string")
    return img.startsWith("http") ? img : `${SERVER_URL}${img}`;
  return (
    img?.url ||
    img?.secure_url ||
    img?.path ||
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
  );
};

const calcDiscount = (p) => {
  if (!p?.salePrice || p.salePrice >= p.price) return 0;
  return Math.round(((p.price - p.salePrice) / p.price) * 100);
};

const Stars = ({ rating }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        size={11}
        style={{
          color:
            i < Math.floor(rating || 0) ? "var(--ny)" : "rgba(255,255,255,.18)",
        }}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════ */
const AIRecommendations = ({
  title = "AI Recommended For Your Business",
  showViewAll = true,
}) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [wished, setWished] = useState({});
  const [cartAnim, setCartAnim] = useState({});

  const fetchAIRecommendations = async () => {
    try {
      setError(null);
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
      if (userData?.id) {
        try {
          const res = await API.get(
            `/ai/products/recommend/home/${userData.id}`,
          );
          if (res.data?.data?.length > 0) {
            setProducts(res.data.data.map(mapProductData));
            return;
          }
        } catch {}
      }
      const tr = await API.get("/products/trending/products?limit=8");
      if (tr.data?.trendingProducts?.length > 0) {
        setProducts(tr.data.trendingProducts.map(mapProductData));
      } else throw new Error("No products available");
    } catch (err) {
      setError(err.message);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchAIRecommendations();
  }, []);

  const handleAddToCart = async (product) => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) {
      toast.error("Please login to add items to cart");
      return;
    }
    // fly-to-cart anim
    setCartAnim((p) => ({ ...p, [product._id]: true }));
    setTimeout(() => setCartAnim((p) => ({ ...p, [product._id]: false })), 450);
    try {
      await API.post("/cart", {
        userId: u.id,
        productId: product._id,
        quantity: 1,
      });
      toast.success("Product added to cart!");
    } catch {
      toast.error("Failed to add product to cart");
    }
  };

  const handleToggleWishlist = (id) => {
    setWished((p) => ({ ...p, [id]: !p[id] }));
    toast.info("Wishlist feature coming soon!");
  };

  /* ── Error state ── */
  if (error && products.length === 0)
    return (
      <section className="ar-section">
        <style>{STYLES}</style>
        <div className="ar-inner">
          <div className="ar-state">
            <div
              className="ar-state-icon"
              style={{
                background: "rgba(255,77,109,.1)",
                border: "1px solid rgba(255,77,109,.25)",
              }}
            >
              <FaExclamationTriangle style={{ color: "var(--nr)" }} />
            </div>
            <div className="ar-state-title">Unable to Load Recommendations</div>
            <p className="ar-state-sub">{error}</p>
            <button className="ar-state-btn" onClick={fetchAIRecommendations}>
              <FaSync /> Try Again
            </button>
          </div>
        </div>
      </section>
    );

  /* ── Empty state ── */
  if (products.length === 0)
    return (
      <section className="ar-section">
        <style>{STYLES}</style>
        <div className="ar-inner">
          <div className="ar-state">
            <div
              className="ar-state-icon"
              style={{
                background: "rgba(0,212,255,.08)",
                border: "1px solid rgba(0,212,255,.2)",
                animation: "arGlow 3s ease-in-out infinite",
              }}
            >
              <FaRobot style={{ color: "var(--nb)" }} />
            </div>
            <div className="ar-state-title">
              {user ? "No Recommendations Yet" : "Popular Products"}
            </div>
            <p className="ar-state-sub">
              {user
                ? "Start browsing products to get personalized recommendations"
                : "Discover trending products from our marketplace"}
            </p>
            <Link to="/products" className="ar-state-btn">
              <FaArrowRight /> Browse All Products
            </Link>
          </div>
        </div>
      </section>
    );

  return (
    <section className="ar-section">
      <style>{STYLES}</style>

      {/* Orbs */}
      <div
        className="ar-orb"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle,rgba(124,58,237,.2) 0%,transparent 70%)",
          top: -160,
          left: -120,
          animation: "arOrb 13s ease-in-out infinite",
        }}
      />
      <div
        className="ar-orb"
        style={{
          width: 380,
          height: 380,
          background:
            "radial-gradient(circle,rgba(0,212,255,.14) 0%,transparent 70%)",
          top: 80,
          right: -90,
          animation: "arOrb 16s ease-in-out infinite reverse",
        }}
      />
      <div
        className="ar-orb"
        style={{
          width: 280,
          height: 280,
          background:
            "radial-gradient(circle,rgba(6,255,212,.1) 0%,transparent 70%)",
          bottom: -40,
          left: "38%",
          animation: "arOrb 11s ease-in-out infinite 2s",
        }}
      />

      <div className="ar-inner">
        {/* Heading */}
        <div style={{ textAlign: "center" }}>
          <div className="ar-badge">
            <div className="ar-badge-dot" />
            {user ? "AI-Powered Recommendations" : "Trending Products"}
          </div>
          <h2 className="ar-heading">
            {user ? "Smart " : "Popular "}
            <span className="ar-heading-grad">
              {user ? "Business Picks" : "Products"}
            </span>
          </h2>
          <p className="ar-subtext">
            {user
              ? "AI-curated products tailored to maximise your business savings"
              : "Discover the most popular products in our marketplace"}
          </p>
        </div>

        {/* Error banner (partial data) */}
        {error && products.length > 0 && (
          <div className="ar-err-banner">⚠ Using limited data: {error}</div>
        )}

        {/* Grid */}
        <div className="ar-grid">
          {products.map((product, index) => {
            const discount = calcDiscount(product);
            const hasDiscount = discount > 0;
            const isHovered = hoveredProduct === index;

            return (
              <div
                key={product._id}
                className="ar-card-wrap"
                style={{ animationDelay: `${index * 80}ms` }}
                onMouseEnter={() => setHoveredProduct(index)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="ar-card">
                  {/* Image */}
                  <div className="ar-img-wrap">
                    <img src={getImgSrc(product.images)} alt={product.name} />
                    <div className="ar-img-scan" />
                    <div className="ar-img-overlay" />

                    {/* Wishlist */}
                    <button
                      className={`ar-wish-btn ${wished[product._id] ? "wished" : ""}`}
                      onClick={() => handleToggleWishlist(product._id)}
                    >
                      <FaHeart
                        size={12}
                        style={{
                          color: wished[product._id]
                            ? "var(--nr)"
                            : "rgba(255,255,255,.6)",
                        }}
                      />
                    </button>

                    {user && (
                      <span className="ar-img-pill ar-pill-ai">
                        <FaBolt size={8} /> AI PICK
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="ar-img-pill ar-pill-discount">
                        {discount}% OFF
                      </span>
                    )}
                    {product.seller?.role === "seller_approved" && (
                      <span
                        className={`ar-img-pill ar-pill-verified ${product.bulkPricingEnabled ? "ar-pill-bulk-v" : ""}`}
                      >
                        <FaShieldAlt size={8} /> Verified
                      </span>
                    )}
                    {product.bulkPricingEnabled && (
                      <span className="ar-img-pill ar-pill-bulk">
                        <FaLayerGroup size={8} /> Bulk
                      </span>
                    )}
                    {product.featured && (
                      <span className="ar-img-pill ar-pill-featured">
                        <FaStar size={8} /> Featured
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="ar-body">
                    {product.category && (
                      <div className="ar-cat">{product.category.name}</div>
                    )}
                    <div className="ar-name">{product.name}</div>

                    <div className="ar-stars">
                      <Stars rating={product.averageRating} />
                      <span className="ar-star-count">
                        ({product.numReviews})
                      </span>
                    </div>

                    <div className="ar-price-row">
                      <span className="ar-price">
                        Rs {hasDiscount ? product.salePrice : product.price}
                      </span>
                      {hasDiscount && (
                        <span className="ar-price-orig">
                          Rs {product.price}
                        </span>
                      )}
                    </div>

                    <div className="ar-stock-row">
                      <span
                        className={`ar-stock-pill ${product.stock > 10 ? "ar-stock-in" : "ar-stock-low"}`}
                      >
                        {product.stock > 10 ? "In Stock" : "Low Stock"}
                      </span>
                      {product.bulkPricingEnabled && (
                        <span className="ar-bulk-pill">Bulk Available</span>
                      )}
                    </div>

                    <div className="ar-actions">
                      <Link
                        to={`/product/${product._id}`}
                        className="ar-btn-view"
                      >
                        <FaEye size={11} /> View
                      </Link>
                      <button
                        className="ar-btn-cart"
                        onClick={() => handleAddToCart(product)}
                        style={{
                          animation: cartAnim[product._id]
                            ? "arFlyCart .4s ease"
                            : "none",
                        }}
                      >
                        <FaShoppingCart className="ar-cart-icon" size={11} />{" "}
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Smart match badge on hover */}
                {user && isHovered && (
                  <div className="ar-smart-badge">
                    <FaChartLine size={9} /> Smart Match
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="ar-cta">
          <div
            style={{
              position: "absolute",
              width: 250,
              height: 250,
              background:
                "radial-gradient(circle,rgba(0,212,255,.07) 0%,transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <div className="ar-cta-title">
            {user ? "Want Better Recommendations?" : "Discover More Products"}
          </div>
          <p className="ar-cta-sub">
            {user
              ? "Our AI learns from your browsing to provide smarter suggestions"
              : "Explore our complete catalogue of amazing products"}
          </p>
          <Link to="/products" className="ar-cta-btn">
            <FaStore size={13} /> Browse All Products <FaArrowRight size={11} />
          </Link>
        </div>

        {/* Footer note */}
        <div className="ar-foot-note">
          <FaLayerGroup style={{ color: "var(--nb)", fontSize: 11 }} />
          {user
            ? "Personalised based on your business needs and market trends"
            : "Featured products based on popularity and customer ratings"}
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;

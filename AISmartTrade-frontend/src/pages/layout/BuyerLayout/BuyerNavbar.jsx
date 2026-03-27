import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChevronDown,
  FaBoxOpen,
  FaReceipt,
} from "react-icons/fa";
import MainLogo from "../../../assets/Main Logo.png";
import { useAuth } from "../../../context/AuthContext";
import API from "../../../api/axiosInstance";

/* ─────────────────────────────────────────────
   Inject scoped styles once (avoids Tailwind
   collisions for the glassmorphism extras)
───────────────────────────────────────────── */
const NAV_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Syne:wght@400;500;600&display=swap');

  :root {
    --nav-glass: rgba(8, 12, 28, 0.72);
    --nav-border: rgba(99, 179, 237, 0.18);
    --nav-glow: #38bdf8;
    --nav-accent: #818cf8;
    --nav-surface: rgba(15, 23, 42, 0.85);
    --nav-pill: rgba(30, 41, 70, 0.7);
    --nav-text: #e2e8f0;
    --nav-muted: #94a3b8;
    --nav-danger: #f87171;
  }

  /* Navbar root */
  .fng-nav {
    background: var(--nav-glass);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid var(--nav-border);
    box-shadow: 0 4px 40px rgba(56, 189, 248, 0.08), 0 1px 0 rgba(129, 140, 248, 0.1);
    font-family: 'Syne', sans-serif;
    position: sticky;
    top: 0;
    z-index: 9999;
  }

  /* Animated top line */
  .fng-nav::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--nav-glow), var(--nav-accent), var(--nav-glow), transparent);
    background-size: 200% 100%;
    animation: fng-scan 4s linear infinite;
  }

  @keyframes fng-scan {
    0%   { background-position: -100% 0; }
    100% { background-position: 200%  0; }
  }

  /* Logo wordmark */
  .fng-wordmark {
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    font-size: 1.1rem;
    background: linear-gradient(120deg, var(--nav-glow) 0%, var(--nav-accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.04em;
  }

  .fng-badge {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--nav-glow);
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 2px 7px;
    border-radius: 99px;
    text-transform: uppercase;
    margin-left: 8px;
    vertical-align: middle;
  }

  /* Search */
  .fng-search-wrap {
    position: relative;
    width: 100%;
  }
  .fng-search-wrap input {
    width: 100%;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid var(--nav-border);
    border-radius: 10px;
    padding: 9px 16px 9px 42px;
    font-size: 0.8rem;
    color: var(--nav-text);
    font-family: 'Syne', sans-serif;
    outline: none;
    transition: border-color 0.25s, box-shadow 0.25s;
  }
  .fng-search-wrap input::placeholder { color: var(--nav-muted); }
  .fng-search-wrap input:focus {
    border-color: var(--nav-glow);
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.12), 0 0 20px rgba(56, 189, 248, 0.08);
  }
  .fng-search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--nav-muted);
    font-size: 0.75rem;
    pointer-events: none;
  }

  /* Nav links */
  .fng-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--nav-muted);
    letter-spacing: 0.03em;
    border: 1px solid transparent;
    transition: color 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s;
    text-decoration: none;
    white-space: nowrap;
  }
  .fng-link:hover {
    color: var(--nav-glow);
    background: rgba(56, 189, 248, 0.07);
    border-color: rgba(56, 189, 248, 0.2);
    box-shadow: 0 0 12px rgba(56, 189, 248, 0.1);
  }

  /* Cart button */
  .fng-cart {
    position: relative;
  }
  .fng-cart-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: linear-gradient(135deg, var(--nav-glow), var(--nav-accent));
    color: #fff;
    font-size: 0.6rem;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
    animation: fng-pulse 2s ease-in-out infinite;
  }
  @keyframes fng-pulse {
    0%, 100% { box-shadow: 0 0 8px rgba(56, 189, 248, 0.6); }
    50%       { box-shadow: 0 0 16px rgba(56, 189, 248, 0.9); }
  }

  /* Profile button */
  .fng-profile-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 14px;
    background: var(--nav-pill);
    border: 1px solid var(--nav-border);
    border-radius: 10px;
    cursor: pointer;
    color: var(--nav-text);
    font-size: 0.8rem;
    font-family: 'Syne', sans-serif;
    font-weight: 500;
    transition: border-color 0.2s, box-shadow 0.2s;
    min-width: 140px;
  }
  .fng-profile-btn:hover {
    border-color: rgba(56, 189, 248, 0.35);
    box-shadow: 0 0 16px rgba(56, 189, 248, 0.1);
  }

  .fng-avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid rgba(56, 189, 248, 0.4);
  }
  .fng-avatar-fallback {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(56,189,248,0.15), rgba(129,140,248,0.15));
    border: 1px solid rgba(56, 189, 248, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--nav-glow);
    font-size: 0.65rem;
  }

  /* Profile dropdown */
  .fng-dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    width: 220px;
    background: rgba(10, 15, 35, 0.92);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid var(--nav-border);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.05);
    animation: fng-dropIn 0.18s ease-out;
    z-index: 9999;
  }
  @keyframes fng-dropIn {
    from { opacity: 0; transform: translateY(-6px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  .fng-dropdown-header {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(99,179,237,0.1);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .fng-dropdown-header .fng-avatar-lg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid rgba(56,189,248,0.4);
  }
  .fng-dropdown-header .fng-avatar-lg-fallback {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(56,189,248,0.15), rgba(129,140,248,0.15));
    border: 1px solid rgba(56,189,248,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--nav-glow);
  }
  .fng-dd-name {
    font-weight: 600;
    font-size: 0.83rem;
    color: var(--nav-text);
    max-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fng-dd-email {
    font-size: 0.7rem;
    color: var(--nav-muted);
    max-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .fng-dd-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 11px 16px;
    font-size: 0.8rem;
    font-family: 'Syne', sans-serif;
    font-weight: 500;
    color: var(--nav-muted);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s, background 0.2s;
    text-align: left;
    text-decoration: none;
  }
  .fng-dd-item:hover {
    color: var(--nav-glow);
    background: rgba(56, 189, 248, 0.06);
  }
  .fng-dd-item.danger {
    color: var(--nav-danger);
    border-top: 1px solid rgba(99,179,237,0.08);
  }
  .fng-dd-item.danger:hover { background: rgba(248, 113, 113, 0.06); }

  /* Auth buttons */
  .fng-btn-ghost {
    padding: 8px 18px;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: 'Syne', sans-serif;
    color: var(--nav-muted);
    background: none;
    border: 1px solid var(--nav-border);
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s, border-color 0.2s;
  }
  .fng-btn-ghost:hover { color: var(--nav-text); border-color: rgba(99,179,237,0.35); }

  .fng-btn-primary {
    padding: 8px 18px;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
    color: #0f172a;
    background: linear-gradient(135deg, var(--nav-glow) 0%, var(--nav-accent) 100%);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.25);
  }
  .fng-btn-primary:hover {
    opacity: 0.9;
    box-shadow: 0 0 28px rgba(56, 189, 248, 0.4);
  }

  /* Mobile drawer */
  .fng-mobile-drawer {
    background: rgba(8, 12, 28, 0.97);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-top: 1px solid var(--nav-border);
    animation: fng-slideDown 0.2s ease-out;
  }
  @keyframes fng-slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fng-mobile-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 16px;
    font-size: 0.82rem;
    font-weight: 500;
    font-family: 'Syne', sans-serif;
    color: var(--nav-muted);
    border-radius: 8px;
    text-decoration: none;
    border: 1px solid transparent;
    transition: color 0.2s, background 0.2s, border-color 0.2s;
  }
  .fng-mobile-link:hover {
    color: var(--nav-glow);
    background: rgba(56,189,248,0.07);
    border-color: rgba(56,189,248,0.18);
  }
  .fng-mobile-link.danger { color: var(--nav-danger); }
  .fng-mobile-link.danger:hover { background: rgba(248,113,113,0.07); border-color: rgba(248,113,113,0.2); }

  .fng-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,179,237,0.2), transparent);
    margin: 6px 0;
  }

  .fng-mobile-user-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    margin-bottom: 4px;
    background: rgba(56,189,248,0.04);
    border: 1px solid rgba(56,189,248,0.1);
    border-radius: 10px;
  }

  /* Chevron rotation */
  .fng-chevron {
    font-size: 0.65rem;
    color: var(--nav-muted);
    margin-left: auto;
    transition: transform 0.2s;
  }
  .fng-chevron.open { transform: rotate(180deg); }
`;

/* Inject styles */
if (typeof document !== "undefined" && !document.getElementById("fng-nav-styles")) {
  const tag = document.createElement("style");
  tag.id = "fng-nav-styles";
  tag.textContent = NAV_STYLES;
  document.head.appendChild(tag);
}

/* ─── Component ─── */
const BuyerNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [profileImage, setProfileImage] = useState("");
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getProfileImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `https://nextrade-backend-production-a486.up.railway.app/uploads/profiles/${imagePath.replace(/^\/+/, "")}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.id) {
        try {
          const cartResponse = await API.get(`/cart/${user.id}`);
          if (cartResponse.data?.products && Array.isArray(cartResponse.data.products)) {
            setCartItemsCount(cartResponse.data.products.reduce((t, i) => t + (i.quantity || 1), 0));
          } else setCartItemsCount(0);

          const profileResponse = await API.get("/profile/me");
          if (profileResponse.data?.profileImage) {
            setProfileImage(profileResponse.data.profileImage);
            setImgError(false);
          } else setProfileImage("");
        } catch {
          setCartItemsCount(0);
          setProfileImage("");
        }
      } else {
        setCartItemsCount(0);
        setProfileImage("");
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    if (!user?.id) return;
    const refreshCartCount = async () => {
      try {
        const res = await API.get(`/cart/${user.id}`);
        if (res.data?.products && Array.isArray(res.data.products))
          setCartItemsCount(res.data.products.reduce((t, i) => t + (i.quantity || 1), 0));
        else setCartItemsCount(0);
      } catch { setCartItemsCount(0); }
    };
    window.addEventListener("popstate", refreshCartCount);
    const interval = setInterval(refreshCartCount, 30000);
    return () => { window.removeEventListener("popstate", refreshCartCount); clearInterval(interval); };
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileDropdownOpen && !e.target.closest(".fng-profile-wrap"))
        setIsProfileDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileDropdownOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setCartItemsCount(0);
    setProfileImage("");
    navigate("/");
  };

  const navLinks = [
    { to: "/products", label: "Products", icon: <FaBoxOpen style={{ fontSize: "0.75rem" }} /> },
    { to: "/orders",   label: "Orders",   icon: <FaReceipt  style={{ fontSize: "0.75rem" }} /> },
  ];

  /* ── Avatar helper ── */
  const Avatar = ({ size = "sm" }) => {
    const cls = size === "lg" ? "fng-avatar-lg" : "fng-avatar";
    const fbCls = size === "lg" ? "fng-avatar-lg-fallback" : "fng-avatar-fallback";
    return profileImage && !imgError ? (
      <img src={getProfileImageUrl(profileImage)} alt="Profile" className={cls} onError={() => setImgError(true)} />
    ) : (
      <div className={fbCls}><FaUser style={{ fontSize: size === "lg" ? "0.9rem" : "0.6rem" }} /></div>
    );
  };

  return (
    <nav className="fng-nav">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: "4px" }}>
            <img src={MainLogo} alt="Logo" style={{ height: "36px", marginRight: "4px" }} />
            <span className="fng-wordmark">AISmartTrade</span>
            <span className="fng-badge">B2B</span>
          </Link>

          {/* ── Search — Desktop ── */}
          <div style={{ display: "none", flex: "1", maxWidth: "420px", margin: "0 32px" }} className="fng-desktop-search">
            <form onSubmit={handleSearch} className="fng-search-wrap">
              <FaSearch className="fng-search-icon" />
              <input
                type="text"
                placeholder="Search products, brands, categories…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {/* ── Desktop Nav ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="fng-desktop-nav">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="fng-link">
                {link.icon}
                {link.label}
              </Link>
            ))}

            {/* Cart */}
            <Link to="/cart" className="fng-link fng-cart" style={{ position: "relative" }}>
              <FaShoppingCart style={{ fontSize: "0.9rem" }} />
              Cart
              {cartItemsCount > 0 && (
                <span className="fng-cart-badge">{cartItemsCount}</span>
              )}
            </Link>

            {/* Profile or Auth */}
            {user ? (
              <div className="fng-profile-wrap" style={{ position: "relative", marginLeft: "6px" }}>
                <button className="fng-profile-btn" onClick={() => setIsProfileDropdownOpen((v) => !v)}>
                  <Avatar />
                  <span style={{ flex: 1, textAlign: "left", maxWidth: "90px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.name || "Account"}
                  </span>
                  <FaChevronDown className={`fng-chevron ${isProfileDropdownOpen ? "open" : ""}`} />
                </button>

                {isProfileDropdownOpen && (
                  <div className="fng-dropdown">
                    <div className="fng-dropdown-header">
                      <Avatar size="lg" />
                      <div>
                        <div className="fng-dd-name">{user.name || "User"}</div>
                        <div className="fng-dd-email">{user.email || ""}</div>
                      </div>
                    </div>
                    <button className="fng-dd-item" onClick={() => { setIsProfileDropdownOpen(false); navigate("/profile"); }}>
                      <FaUser style={{ fontSize: "0.75rem" }} /> My Profile
                    </button>
                    <button className="fng-dd-item danger" onClick={handleLogout}>
                      <FaSignOutAlt style={{ fontSize: "0.75rem" }} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "6px" }}>
                <Link to="/login"    className="fng-btn-ghost">Sign In</Link>
                <Link to="/register" className="fng-btn-primary">Register</Link>
              </div>
            )}
          </div>

          {/* ── Mobile right ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="fng-mobile-right">
            <Link to="/cart" className="fng-link fng-cart" style={{ position: "relative", padding: "8px" }}>
              <FaShoppingCart style={{ fontSize: "1rem" }} />
              {cartItemsCount > 0 && <span className="fng-cart-badge">{cartItemsCount}</span>}
            </Link>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="fng-link"
              style={{ padding: "8px", border: "1px solid var(--nav-border)", borderRadius: "8px", background: "var(--nav-pill)", cursor: "pointer" }}
            >
              {isMenuOpen ? <FaTimes style={{ fontSize: "1rem", color: "var(--nav-glow)" }} /> : <FaBars style={{ fontSize: "1rem" }} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {isMenuOpen && (
        <div className="fng-mobile-drawer">
          <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="fng-search-wrap" style={{ marginBottom: "12px" }}>
              <FaSearch className="fng-search-icon" />
              <input
                type="text"
                placeholder="Search products…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="fng-mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon} {link.label}
              </Link>
            ))}

            <div className="fng-divider" />

            {user ? (
              <>
                <div className="fng-mobile-user-card">
                  <Avatar size="lg" />
                  <div>
                    <div className="fng-dd-name">{user.name || "User"}</div>
                    <div className="fng-dd-email">{user.email || ""}</div>
                  </div>
                </div>

                <Link to="/profile" className="fng-mobile-link" onClick={() => setIsMenuOpen(false)}>
                  <FaUser style={{ fontSize: "0.75rem" }} /> My Profile
                </Link>
                <button className="fng-mobile-link danger" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%" }} onClick={handleLogout}>
                  <FaSignOutAlt style={{ fontSize: "0.75rem" }} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login"    className="fng-mobile-link" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="fng-btn-primary"
                  style={{ textAlign: "center", borderRadius: "8px", padding: "11px 16px", display: "block" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Responsive overrides — replaces Tailwind hidden/flex */}
      <style>{`
        @media (min-width: 1024px) {
          .fng-desktop-search { display: flex !important; }
          .fng-desktop-nav    { display: flex !important; }
          .fng-mobile-right   { display: none  !important; }
        }
        @media (max-width: 1023px) {
          .fng-desktop-search { display: none  !important; }
          .fng-desktop-nav    { display: none  !important; }
          .fng-mobile-right   { display: flex  !important; }
        }
      `}</style>
    </nav>
  );
};

export default BuyerNavbar;
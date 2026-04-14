import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "Certificates", to: "/certificates" },
  { label: "Blog", to: "/blog" },
  { label: "Resume", to: "/resume" },
  { label: "About me", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        .nav-desktop-links {
          display: flex;
          justify-content: center;
          gap: 1.8rem;
          align-items: center;
          flex-grow: 1;
        }
        .hamburger-btn {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          flex-direction: column;
          gap: 5px;
          z-index: 200;
        }
        .hamburger-btn span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger-btn.open span:nth-child(2) { opacity: 0; }
        .hamburger-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100vh;
          background: rgba(5, 5, 9, 0.97);
          backdrop-filter: blur(16px);
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .mobile-nav-link {
          font-size: 1.5rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          padding: 16px 40px;
          width: 100%;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s, background 0.2s;
          display: block;
        }
        .mobile-nav-link:hover { color: var(--accent); background: rgba(255,255,255,0.03); }
        .mobile-nav-link.active-mobile { color: var(--accent); }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>

      <nav
        className="nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.8rem 2rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 150,
        }}
      >
        {/* Left: Logo + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <motion.div
            className="logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ fontWeight: "bold", fontSize: "1.4rem", color: "var(--accent)" }}
          >
            VA
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ margin: 0, fontSize: 14 }}>VENKATESWARAN A</h1>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>• Software Developer</div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="nav-desktop-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              style={{ position: "relative", fontSize: "0.95rem", textDecoration: "none", color: "white", fontWeight: 500 }}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.1, color: "var(--accent)", textShadow: "0 0 8px var(--accent)" }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <motion.span animate={{ color: isActive ? "var(--accent)" : "white" }} transition={{ duration: 0.3 }}>
                    {l.label}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: "70%", height: "2px", marginTop: "4px", borderRadius: "1px", backgroundColor: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className={`hamburger-btn${menuOpen ? " open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={closeMenu}
              style={{ position: "absolute", top: "1.2rem", right: "1.5rem", background: "transparent", border: "none", color: "#fff", fontSize: "2rem", cursor: "pointer", lineHeight: 1 }}
              aria-label="Close menu"
            >×</button>
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ width: "100%" }}
              >
                <NavLink
                  to={l.to}
                  end
                  onClick={closeMenu}
                  className={({ isActive }) => `mobile-nav-link${isActive ? " active-mobile" : ""}`}
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { languageOptions } from "../data/samaConfig";

export default function Header({ config, language, setLanguage, page, setPage, onReserve }) {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [serviceOffset, setServiceOffset] = useState(0);
  const lastScrollY = useRef(0);
  const serviceOffsetRef = useRef(0);
  const ticking = useRef(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 980;
  });

  useEffect(() => {
    const syncViewport = () => {
      const nextIsMobile = window.innerWidth <= 980;
      setIsMobile(nextIsMobile);
      if (!nextIsMobile) setOpen(false);
    };
    const mediaQuery = window.matchMedia("(max-width: 980px)");

    window.addEventListener("resize", syncViewport);
    window.visualViewport?.addEventListener("resize", syncViewport);
    mediaQuery.addEventListener("change", syncViewport);
    syncViewport();
    return () => {
      window.removeEventListener("resize", syncViewport);
      window.visualViewport?.removeEventListener("resize", syncViewport);
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useEffect(() => {
    setLanguageOpen(false);
  }, [language]);

  useEffect(() => {
    const serviceHeight = 32;
    lastScrollY.current = window.scrollY;

    const syncServiceBar = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      if (currentY <= 2) {
        serviceOffsetRef.current = 0;
      } else if (delta > 0) {
        serviceOffsetRef.current = Math.min(serviceHeight, serviceOffsetRef.current + delta);
      } else if (delta < 0) {
        serviceOffsetRef.current = Math.max(0, serviceOffsetRef.current + delta);
      }

      setServiceOffset(Math.round(serviceOffsetRef.current));
      ticking.current = false;
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(syncServiceBar);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (target) => {
    setOpen(false);
    setLanguageOpen(false);
    if (target === "menu" || target === "reserve") {
      setPage(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPage("home");
    requestAnimationFrame(() => {
      const element = document.getElementById(target);
      if (!element) return;
      const navOffset = document.querySelector(".sticky-header")?.getBoundingClientRect().height || 92;
      const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  };

  return (
    <div className="sticky-header" style={{ "--service-offset": `${serviceOffset}px`, "--service-progress": 1 - serviceOffset / 32 }}>
      <div className="top-service-bar" aria-hidden={serviceOffset >= 31}>
        <span>{config.service.hours}</span>
        <strong>{config.service.line}</strong>
        <span>{config.service.place}</span>
      </div>
      <header className="site-header">
        <a className="brand-lockup" href="#home" onClick={(event) => { event.preventDefault(); goTo("home"); }}>
          <span>
            <strong>{config.brand.name}</strong>
            <small>{config.brand.subtitle}</small>
          </span>
        </a>

        <nav className="desktop-nav">
          {config.nav.map((link) => (
            <button key={link.target} className={page === link.target ? "active" : ""} onClick={() => goTo(link.target)}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switcher">
            <button className="ghost-action language-trigger" type="button" onClick={() => setLanguageOpen((value) => !value)}>
              {languageOptions.find((option) => option.code === language)?.short || "EN"}
              <span aria-hidden="true" />
            </button>
            <AnimatePresence>
              {languageOpen && (
                <motion.div className="language-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                  {languageOptions.map((option) => (
                    <button key={option.code} className={language === option.code ? "active" : ""} type="button" onClick={() => { setLanguage(option.code); setLanguageOpen(false); }}>
                      {option.short}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className="primary-action" onClick={onReserve}>{config.visit.reserve}</button>
        </div>

        <button className={`menu-toggle ${open ? "is-open" : ""}`} type="button" onClick={() => setOpen((value) => !value)} aria-label="Open navigation">
          <span />
          <span />
        </button>

        <AnimatePresence>
          {open && isMobile && (
            <motion.nav
              className="mobile-nav"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {config.nav.map((link) => (
                <button key={link.target} onClick={() => goTo(link.target)}>{link.label}</button>
              ))}
              <div className="mobile-language-row">
                {languageOptions.map((option) => (
                  <button key={option.code} className={language === option.code ? "active" : ""} type="button" onClick={() => setLanguage(option.code)}>
                    {option.short}
                  </button>
                ))}
              </div>
              <button className="primary-action" onClick={() => { setOpen(false); onReserve(); }}>{config.hero.reserve}</button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}

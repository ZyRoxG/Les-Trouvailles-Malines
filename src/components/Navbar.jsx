import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Pièce par pièce", to: "/piece-par-piece" },
  { label: "Trouvailles", to: "/trouvailles" },
  { label: "Inspirations", to: "/inspirations" },
  { label: "À propos", to: "/a-propos" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 120 && y > last) setHidden(true);
      else setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/inspirations?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`transition-colors duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/60"
            : "bg-background/40 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <Logo onClick={() => navigate("/")} />

          <div className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`editorial-link text-[0.82rem] tracking-wide transition-colors duration-300 ${
                    active ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="text-foreground/70 transition-colors hover:text-foreground"
              aria-label="Rechercher"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="text-foreground/70 transition-colors hover:text-foreground"
              aria-label="Rechercher"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="text-foreground/80"
              aria-label="Menu"
            >
              {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>

        {/* search bar */}
        {searchOpen && (
          <div className="border-t border-border/40 bg-background/90 backdrop-blur-md">
            <form onSubmit={submitSearch} className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 md:px-10">
              <Search size={17} strokeWidth={1.5} className="text-foreground/50" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une trouvaille, une inspiration…"
                className="w-full bg-transparent text-[0.95rem] text-foreground placeholder:text-foreground/40 focus:outline-none"
              />
              <button type="submit" className="label-caps text-foreground/60 hover:text-foreground">
                Chercher
              </button>
            </form>
          </div>
        )}

        {/* mobile menu */}
        {open && (
          <div className="border-t border-border/40 bg-background/95 backdrop-blur-md md:hidden">
            <div className="flex flex-col px-5 py-3">
              {NAV_LINKS.map((l) => {
                const active = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`border-b border-border/40 py-3 font-display text-xl ${
                      active ? "text-foreground" : "text-foreground/75"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
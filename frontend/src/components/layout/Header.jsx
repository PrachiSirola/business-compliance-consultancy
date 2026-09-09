import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SERVICES } from "../../data/business";
import Icon from "../common/Icon";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const headerRef = useRef(null);

  // Close the services dropdown on outside click — matches the original
  // document-level click listener in initNav().
  useEffect(() => {
    function onDocClick(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // NavLink sets aria-current="page" on the active link automatically,
  // which is exactly what the original CSS (.nav__link[aria-current="page"])
  // targets — so a plain static className is all that's needed here.
  const navLinkClass = "nav__link";

  return (
    <header className="site-header" id="site-header" ref={headerRef}>
      <div className="container">
        <nav className="nav" aria-label="Primary">
          <Link className="brand" to="/" aria-label="Suits home">
            <span>
              <span className="brand__word">Suits</span>
              <span className="brand__tag">Compliance, simplified</span>
            </span>
          </Link>

          <button
            className="nav__toggle"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <ul className={"nav__links" + (menuOpen ? " open" : "")}>
            <li>
              <NavLink className={navLinkClass} to="/" end onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className={"nav__item" + (dropdownOpen ? " open" : "")}>
              <button
                className="nav__link"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen((o) => !o);
                }}
              >
                Services <Icon name="chev" className="chev" />
              </button>
              <div className="dropdown">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    className="dropdown__item"
                    to={`/${s.slug}`}
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="dropdown__ico">
                      <Icon name={s.icon} className="" />
                    </span>
                    <span className="dropdown__t">{s.title}</span>
                    <Icon name="chev" className="dropdown__chev" />
                  </Link>
                ))}
                <Link
                  className="dropdown__item"
                  to="/services"
                  style={{ borderTop: "1px solid var(--line)", marginTop: 6, paddingTop: 14 }}
                  onClick={() => {
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  <span className="dropdown__ico" style={{ background: "var(--sand)" }}>
                    <Icon name="arrow" className="" />
                  </span>
                  <span className="dropdown__t">All services</span>
                  <Icon name="chev" className="dropdown__chev" />
                </Link>
              </div>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/about" onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
            <li>
              <Link className="btn btn--primary nav__cta" to="/contact" onClick={() => setMenuOpen(false)}>
                Get started <Icon name="arrow" className="ico" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
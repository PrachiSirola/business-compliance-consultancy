import { Link } from "react-router-dom";
import { BUSINESS, SERVICES } from "../../data/business";
import Icon from "../common/Icon";

function SocialIcon({ href, label, paths }) {
  return (
    <a className="footer__social" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" dangerouslySetInnerHTML={{ __html: paths }} />
    </a>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to}>
        {children}
        <svg className="footer__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer__main">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link className="brand" to="/">
              <span className="brand__word">Suits</span>
            </Link>
            <span className="footer__tagline">Compliance, simplified</span>
            <p>
              A full-service company-secretarial practice led by CS Deepika —
              corporate law, FEMA, and trademark, serving clients across India.
            </p>
            <div className="footer__socials">
              <SocialIcon href="#" label="LinkedIn" paths='<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' />
              <SocialIcon href="#" label="Instagram" paths='<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2"/>' />
              <SocialIcon href={`mailto:${BUSINESS.email}`} label="Email" paths='<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>' />
            </div>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              {SERVICES.map((s) => (
                <FooterLink key={s.slug} to={`/${s.slug}`}>{s.title}</FooterLink>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <ul>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/testimonials">Testimonials</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Get in touch</h4>
            <ul className="footer__contact">
              <li>
                <Icon name="phone" className="" />
                <a href={`tel:+91${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>
              </li>
              <li>
                <Icon name="mail" className="" />
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </li>
              <li>
                <Icon name="clock" className="" />
                <span>{BUSINESS.hours}</span>
              </li>
              <li>
                <Icon name="pin" className="" />
                <span>{BUSINESS.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span>© {new Date().getFullYear()} Suits. All rights reserved.</span>
          <span>
            <Link to="/privacy">Privacy</Link> · Corporate compliance, made simple.
          </span>
        </div>
      </div>
    </footer>
  );
}
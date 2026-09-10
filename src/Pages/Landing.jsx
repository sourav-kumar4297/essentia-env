import React from "react";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-root">
      <nav className="nav">
        <div className="nav-logo">
          <img src="/essentia R W.webp" alt="Essentia Logo" />
        </div>
        <div className="nav-est">Est. 1999 · Gurugram, India</div>
      </nav>
      <section className="hero">
        <div className="arc arc-1" />
        <div className="arc arc-2" />
        <div className="arc arc-3" />
        <div className="hero-content">
          <p className="hero-eyebrow">Essentia Group · Est. 1999 · Gurugram, India</p>
          <h1 className="hero-headline">
            <span className="line line-1">We Design It.</span>
            <span className="line line-2">We Build It.</span>
            <span className="line line-3">We Make It.</span>
            <span className="line line-4">You Live In It.</span>
          </h1>
          <div className="hero-desc">
            <p className="hero-desc-main">
              India's only fully integrated design, build, manufacture and retail group
            </p>
            <p className="hero-desc-types">
              Residences · Corporate Campuses · Developer Fit-Outs · Hospitality
            </p>
          </div>
          <div className="copper-line" />
          <p className="hero-cities">Gurugram · Delhi · Mumbai</p>
        </div>
        <div className="scroll-hint">
          <span>Explore</span>
          <div className="scroll-bar" />
        </div>
      </section>
      <section className="verticals-section">
        <div className="verticals-grid">
          <div className="vertical">
            <p className="v-tag">For Spaces</p>
            <h2 className="v-name">
              Essentia
              <br />
              Environments
            </h2>
            <p className="v-services">Architecture · Interiors · Execution</p>
            <p className="v-desc">
              One team. One brief. One point of accountability from the first conversation to the final handover. We design, engineer, manufacture and deliver spaces that are built to last and built to perform.
            </p>
            <a href="/" className="v-cta">
              Enter <span className="v-arrow" />
            </a>
          </div>
          <div className="v-divider" />
          <div className="vertical">
            <p className="v-tag">For Living</p>
            <h2 className="v-name">
              Essentia
              <br />
              Home
            </h2>
            <p className="v-services">Furniture · Décor · European Brands · E-Commerce</p>
            <p className="v-desc">
              Internationally designed. India made. Exclusively curated. Our stores and e-commerce platform bring the world's finest design brands alongside our own manufactured range to every home that deserves it.
            </p>
            <a href="https://www.essentiahome.com" className="v-cta">
              Enter <span className="v-arrow" />
            </a>
          </div>
        </div>
      </section>
      <div className="credentials-section">
        <div className="credentials-grid">
          <div className="cred">
            <div className="cred-num">
              26<sup>+</sup>
            </div>
            <div className="cred-label">Years</div>
          </div>
          <div className="cred">
            <div className="cred-num">
              1,000<sup>+</sup>
            </div>
            <div className="cred-label">Projects Delivered</div>
          </div>
          <div className="cred">
            <div className="cred-num">
              800<sup>+</sup>
            </div>
            <div className="cred-label">Professionals</div>
          </div>
        </div>
      </div>
      <div className="trust-section">
        <div className="trust-inner">
          <span className="trust-mark">"</span>
          <p className="trust-text">
            Every space we have ever touched has been designed to last, built to perform, and furnished to feel like{" "}
            <em>home</em>. That is the only standard we have ever known.
          </p>
        </div>
      </div>
      <div className="contact-section">
        <div className="contact-inner">
          <div>
            <p className="contact-tag">Get in Touch</p>
            <h3 className="contact-heading">
              Talk to
              <br />
              Essentia Group
            </h3>
            <p className="contact-subtext">
              For project enquiries, partnerships,
              <br />
              press and investor relations.
            </p>
          </div>
          <div className="contact-details">
            <div>
              <p className="contact-item-label">Email</p>
              <a href="mailto:info@essentia.in" className="contact-item-value">
                info@essentia.in
              </a>
            </div>
            <div>
              <p className="contact-item-label">Phone</p>
              <a href="tel:+918800996500" className="contact-item-value">
                +91 8800 996 500
              </a>
            </div>
            <div>
              <p className="contact-item-label">Headquarters</p>
              <span className="contact-item-value small">National Highway 8, Gurugram, Haryana</span>
              <div className="contact-offices" style={{ marginTop: "10px" }}>
                <a href="https://maps.app.goo.gl/AELFC7CmvYxa4p8V7" target="_blank" rel="noopener noreferrer" className="contact-city">
                  Gurugram
                </a>
                <span className="contact-dot"> · </span>
                <a href="https://maps.app.goo.gl/KQqoWkYNmVpZ6pkn8" target="_blank" rel="noopener noreferrer" className="contact-city">
                  Delhi
                </a>
                <span className="contact-dot"> · </span>
                <a href="https://maps.app.goo.gl/jgVvFeE2xa6qDLav5" target="_blank" rel="noopener noreferrer" className="contact-city">
                  Mumbai
                </a>
                <span className="contact-dot"> · </span>
                <span className="contact-city coming-soon">Hyderabad (Coming Soon)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <img src="/essentia R W.webp" alt="Essentia Logo" className="footer-logo" />
        <div className="footer-links">
          <a href="/" className="footer-link">
            Essentia Environments
          </a>
          <a href="https://www.essentiahome.com" className="footer-link">
            Essentia Home
          </a>
        </div>
        <div className="footer-copy">© Essentia Group 2026. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="portfolio-hero" aria-labelledby="hero-heading">
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-topline" aria-hidden="true">
        <span>PERSONAL PORTFOLIO / 2026</span>
        <span>CODE. CONNECT. CREATE.</span>
      </div>
      <div className="hero-copy">
        <div className="hero-status"><span /> SYSTEM ONLINE <b>•</b> IT ENGINEER</div>
        <h1 id="hero-heading"><span className="hero-greeting">Hello, I&apos;m</span><span>Sipan</span><span className="hero-surname">Danielyan<span className="hero-period">.</span></span></h1>
        <p className="hero-role">IT Programmer &amp; Network Engineer <span>from Armenia <span className="armenia-flag" role="img" aria-label="Armenia" /></span></p>
        <p className="hero-description">IT programmer and network engineer with 3 years of hands-on experience in software, servers, networks, and video surveillance.</p>
        <div className="hero-tags"><span><b>03</b> <span>3 years of experience</span></span><span>IT Programmer</span><span>Network Engineer</span></div>
        <div className="hero-actions">
          <a className="hero-button hero-button-primary" href="#projects" data-magnetic><span>View My Work</span><span aria-hidden="true">↗</span></a>
          <a className="hero-button hero-button-secondary" href="#resume" data-magnetic><span>View CV</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M14 3H6v18h12V7l-4-4Z M14 3v5h5 M9 13h6 M9 17h4" /></svg></a>
        </div>
      </div>
      <div className="scene-caption" aria-hidden="true"><span className="scene-caption-cross">+</span><div>THE NETWORK CORE<small>INTERACTIVE PARTICLE SYSTEM / 01</small></div></div>
      <div className="hero-bottomline"><a href="#about"><span className="scroll-indicator" aria-hidden="true">↓</span><span>Scroll to explore</span></a><span className="hero-discipline">SOFTWARE <i /> INFRASTRUCTURE <i /> NETWORKS</span><span className="hero-location">BASED IN ARMENIA <span>AM</span></span></div>
    </section>
  );
}

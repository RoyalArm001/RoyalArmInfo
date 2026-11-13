import PrismOrbit from "./PrismOrbit";

export default function Hero() {
  return (
    <section id="home" className="systems-hero" aria-labelledby="hero-heading">
      <div className="systems-intro">
        <p className="systems-role">IT Technician · Network Engineer</p>
        <h1 id="hero-heading"><span>Sipan</span> <span>Danielyan</span></h1>
        <p className="systems-summary">I work as an IT technician at Mota-Engil and build tools for networks and servers in Armenia.</p>
        <div className="systems-links">
          <a href="#projects">View My Work <span aria-hidden="true">↗</span></a>
          <a href="#resume">View CV</a>
          <a href="https://ai.royalarm.uk/">RoyalArm AI</a>
        </div>
      </div>
      <PrismOrbit />
    </section>
  );
}

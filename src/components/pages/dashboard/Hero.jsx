import 'remixicon/fonts/remixicon.css';
import '../../../assets/css/hero.css';
import gsap from 'gsap';
import { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    // Animasi GSAP untuk hero-title
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: -50 }, // Properti awal
      { opacity: 1, y: 0, duration: 1.8, ease: 'power3.out' } // Properti akhir
    );
    
    gsap.fromTo(
      '.hero-image',
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1.8, ease: 'power3.out' }
    );

  }, []);

  return (
    <div className="hero">
      {/* Navigation bar */}
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">CoPop</a>
          </div>
          <div className="nav__menu__btn" id="menu-btn">
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <ul className="nav__links" id="nav-links">
          <li><a href="#">HOME</a></li>
          <li><a href="#">COMPARE</a></li>
          <li><a href="#">CONTACT</a></li>
        </ul>
        <div className="nav__btns">
          <button className="btn"><i className="ri-search-line"></i></button>
        </div>
      </nav>

      {/* Hero content */}
      <div className="container hero-content">
        <div className="container__left">
          <h1 className="hero-title">Open Your Mindset</h1>
          <div className="container__btn">
            <button className="btn">LEARN NOW</button>
          </div>
        </div>
        <div className="container__right">
          <div className="images">
            <img
              src="https://images.unsplash.com/photo-1541377638253-5a0b78067768?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDg4fHxwZXJzb258ZW58MHx8MHx8fDA%3D"
              alt="image 1"
              className="hero-image img1"
            />
            <img
              src="https://images.unsplash.com/photo-1578403881967-084f9885be74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFwfGVufDB8fDB8fHww"
              alt="image 2"
              className="hero-image img2"
            />
          </div>
          <div className="content">
            <div className="ml-4">
              <h4>Country | Population</h4>
              <h2>Number of People</h2>
              <h3>Your Study Buddy</h3>
              <p>
                Crafted for those who value human existence, our global population embodies remarkable cultural diversity. As it grows, it faces challenges and opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

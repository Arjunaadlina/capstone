import 'remixicon/fonts/remixicon.css';
import '../../../assets/css/hero.css';
import gsap from 'gsap';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Animation from './Animation';

const Hero = () => {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 50) { 
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };
  }, []);
  useEffect(() => {
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.8, ease: 'power3.out' }
    );
    
    gsap.fromTo(
      '.hero-image',
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1.8, ease: 'power3.out' }
    );

  }, []);

  return (
    <div className="sm:px-16 ">
      <div className='absolute left-40 w-40 h-w-40'>
        
      </div>
      <div className="container hero-content ">
        <div className="container__left">
          
          <h1 className="hero-title">Open Y<span className='inline-block w-20 h-20 relative top-6 mx-[-18px]'><Animation /></span>ur Mindset</h1>
          <div className="container__btn">
            <Link to="/rank" className='btn'>Learn More</Link>
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
              className="hero-image img2 relative lg:top-[-25px] left-[-10px] top-10 "
            />
          </div>
          <div className="content">
            <div className="lg:ml-4 mt-10 lg:mt-0">
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

import 'remixicon/fonts/remixicon.css';
import '../assets/css/hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <nav>
      <div class="nav__header">
        <div class="nav__logo">
          <a href="#">CoPop</a>
        </div>
        <div class="nav__menu__btn" id="menu-btn">
          <i class="ri-menu-line"></i>
        </div>
      </div>
      <ul class="nav__links" id="nav-links">
        <li><a href="#">HOME</a></li>
        <li><a href="#">ABOUT US</a></li>
        <li><a href="#">CONTACT</a></li>
      </ul>
      <div class="nav__btns">
        <button class="btn"><i class="ri-search-line"></i></button>
      </div>
    </nav>

      <div className="container">
        <div className="container__left">
          <h1>Open Your Mindset</h1>
          <div class="container__btn">
            <button class="btn">LEARN NOW</button>
          </div>
        </div>
        <div className="container__right">
          <div className="images">
            <img
              src="https://images.unsplash.com/photo-1541377638253-5a0b78067768?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDg4fHxwZXJzb258ZW58MHx8MHx8fDA%3D"
              alt="image 1"
              className="img1"
            />
            <img
              src="https://images.unsplash.com/photo-1578403881967-084f9885be74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFwfGVufDB8fDB8fHww"
              alt="image 2"
              className="img2"
            />
          </div>
          <div className="content">
            <div className='ml-4'>
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

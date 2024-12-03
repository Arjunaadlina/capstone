import React from 'react'
import 'remixicon/fonts/remixicon.css';
import '../../../assets/css/hero.css';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Nav() {
    return (
        <div>
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
                    <li><Link to={'/'}>HOME</Link></li>
                    <li><Link to={'/rank'}>RANK</Link></li>
                    <li><Link to={'/compare'}>COMPARE</Link></li>
                    <li><Link to={'/'}>NEWS</Link></li>
                </ul>
                <div className="nav__btns">
                    <button className="btn"><i className="ri-search-line"></i></button>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Nav
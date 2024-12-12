import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/pages/dashboard/Footer';

function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className=" sticky top-0 left-0 right-0 z-50 bg-primary-brown md:bg-white w-full flex items-center justify-center">
                <div className="flex items-center justify-between py-3 md:py-7 w-[1200px] lg:px-4 px-8 ">
                    <div className="text-2xl font-bold text-white md:text-primary-brown">
                        <a href="#">CoPop</a>
                    </div>
                    <div className="text-2xl md:hidden" onClick={toggleMenu}>
                        <i className="ri-menu-line text-white"></i>
                    </div>
                    <ul className="hidden md:flex gap-6 text-lg font-medium">
                        <li><Link to="/" className="hover:text-primary-cream ">HOME</Link></li>
                        <li><Link to="/rank" className="hover:text-primary-cream ">RANK</Link></li>
                        <li><Link to="/compare" className="hover:text-primary-cream ">COMPARE</Link></li>
                        <li><Link to="/news" className="hover:text-primary-cream ">NEWS</Link></li>
                    </ul>
                    <div className="hidden md:block">
                        <button className="text-2xl hover:text-primary-cream">
                            <i className="ri-search-line"></i>
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-md fixed top-0 right-0 w-52 z-50 ${isMenuOpen ? 'scale-100 mt-16' : 'scale-100'}`}>
                <ul className="flex flex-col items-start p-4">
                    <li className="py-2"><Link to="/" className="hover:text-primary-cream font-semibold">HOME</Link></li>
                    <li className="py-2"><Link to="/rank" className="hover:text-primary-cream font-semibold">RANK</Link></li>
                    <li className="py-2"><Link to="/compare" className="hover:text-primary-cream font-semibold">COMPARE</Link></li>
                    <li className="py-2"><Link to="/" className="hover:text-primary-cream font-semibold">NEWS</Link></li>
                </ul>
            </div>

            {/* Main Content */}
            <main className="">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Layout;

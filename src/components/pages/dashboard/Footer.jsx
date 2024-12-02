import React from 'react';
import 'ionicons/dist/ionicons.js';

function Footer() {
    return (
        <footer className="bg-primary-brown text-gray-300 mt-36" >
            <div className="py-12" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="flex gap-8">
                    <div className="w-1/3">
                        <p className="font-semibold">
                            CoPop is a website to find out the population differences in each country throughout the world
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-semibold mb-4 relative after:block after:w-12 after:h-1 after:bg-primary-cream after:mt-2">
                            Contact
                        </h4>
                        <p className="mb-6">
                            Don't hesitate to contact us
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <a href="https://wa.me/6285794214136" className="text-gray-300 hover:text-white">+62 857-9421-4136</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <a href="mailto:arjunaadlinamartha@gmail.com" className="text-gray-300 hover:text-white">arjunaadlinamartha@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <address className="not-italic">Wringinanom, Gresik</address>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="mb-4">
                            Subscribe to get more recent population news updates!
                        </p>
                        <form action="" className="flex flex-col space-y-4">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter Your Email" 
                                required 
                                className="bg-white text-gray-800 text-base px-4 py-2 rounded-full focus:ring-2 focus:bg-white focus:outline-none"
                            />
                            <button type="submit" className="bg-primary-cream text-primary-brown font-bold px-6 py-2 rounded-full hover:bg-primary-cream">
                                Subscribe 
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

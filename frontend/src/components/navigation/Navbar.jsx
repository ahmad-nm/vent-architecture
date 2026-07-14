import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "@/assets/images/logo.png";
import homeLogo from "@/assets/icons/home.png";
import projectsLogo from "@/assets/icons/projects.png";
import aboutLogo from "@/assets/icons/about.png";
import contactLogo from "@/assets/icons/contact.png";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className="w-full fixed top-0 left-0 z-50 bg-[#0b0b0f]/80 backdrop-blur border-b border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center text-lg tracking-widest uppercase"
                    >
                        <img src={logo} alt="Logo" className="w-6 inline-block mr-2" />
                        VENT
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8 text-sm text-white/70">
                        <Link to="/" className="hover:text-white transition">
                            Home
                        </Link>
                        <Link to="/projects" className="hover:text-white transition">
                            Projects
                        </Link>
                        <Link to="/about" className="hover:text-white transition">
                            About
                        </Link>
                        <Link to="/contact" className="hover:text-white transition">
                            Contact
                        </Link>
                    </nav>

                    {/* Hamburger Menu */}
                    <button
                        type="button"
                        className="md:hidden text-white/70 focus:outline-none relative z-50"
                        aria-label="Toggle navigation menu"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />
            {/* Mobile Menu - 50% width, full height */}
            <nav
                className={`fixed top-0 right-0 h-screen w-[60%] bg-[#0b0b0f]/95 backdrop-blur border-r border-white/5 z-40 md:hidden overflow-y-auto transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="px-6 sm:px-8 py-10 flex flex-col items-start gap-7 text-white/80 mt-16">
                    <Link
                        to="/"
                        className="text-lg hover:text-white transition flex items-center justify-start"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <img src={homeLogo} alt="Logo" className="w-6 inline-block mr-3" />
                        Home
                    </Link>
                    <Link
                        to="/projects"
                        className="text-lg hover:text-white transition flex items-center justify-start"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <img src={projectsLogo} alt="Projects" className="w-6 inline-block mr-3" />
                        Projects
                    </Link>
                    <Link
                        to="/about"
                        className="text-lg hover:text-white transition flex items-center justify-start"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <img src={aboutLogo} alt="About" className="w-6 inline-block mr-3" />
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="text-lg hover:text-white transition flex items-center justify-start"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <img src={contactLogo} alt="Contact" className="w-6 inline-block mr-3" />
                        Contact
                    </Link>
                </div>
            </nav>
        </>
    );
}

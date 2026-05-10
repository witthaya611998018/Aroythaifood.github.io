import { useState } from "react";
import { Link } from "react-router-dom";

import smoothScrollTo from "@/shared/lib/smoothScrollTo";

const AppHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#1f2429] text-white" id="HOME">
      <div className="mx-auto max-w-7xl p-3 md:flex md:items-center md:justify-between md:p-4 lg:px-auto">
        <div className="flex items-center justify-between">
          <a
            className="flex items-center text-xl font-bold text-[#ffc107]"
            href="/"
          >
            <i className="fas fa-utensils me-2" />
            AROY THAI FOOD
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="rounded-lg border border-white/30 p-2 text-white/90 transition-colors hover:bg-white/10 md:hidden"
          >
            <svg
              className={`h-6 w-6 transition-transform duration-500 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0 max-h-0"} md:pointer-events-auto md:flex md:max-h-none md:translate-y-0 md:items-center md:overflow-visible md:opacity-100 md:transition-none`}
        >
          <nav className="grid space-y-3 px-1 py-3 text-base font-medium transition-colors [&_a]:text-white [&_a]:transition-colors [&_a:hover]:text-[#ffc107] md:flex md:items-center md:gap-6 md:space-y-0 md:px-0 md:py-0">
            <a href="#">HOME</a>
            <a href="#">MENU</a>
            <a href="#">SPECIALS</a>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                smoothScrollTo("contact", 800);
                if (isOpen) setIsOpen(false);
              }}
            >
              CONTACT
            </a>
            <Link to="/login">LOGIN</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

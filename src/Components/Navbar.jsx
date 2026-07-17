import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Home/logo.png";
import phnicon from "../assets/Home/phn icon.png";

const links = [
  { name: "Home", href: "/" },
  { name: "Booking", href: "/booking" },
  { name: "About", href: "/#about" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Contact", href: "/#contact" },
];

const scrollToSection = (hash) => {
  const section = document.getElementById(hash.replace("#", ""));

  if (!section) return;

  const navbarHeight = document.querySelector("header")?.offsetHeight || 0;
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: sectionTop - navbarHeight,
    behavior: "smooth",
  });
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") return undefined;

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(location.hash);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  const handleNavigation = (event, link) => {
    event.preventDefault();
    setMenuOpen(false);

    const [targetPath, targetId] = link.href.split("#");
    const targetHash = targetId ? `#${targetId}` : "";

    if (
      location.pathname === targetPath &&
      location.hash === targetHash
    ) {
      if (targetHash) {
        scrollToSection(targetHash);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    navigate(link.href);
  };

  const isLinkActive = (link) => {
    if (link.href === "/booking") {
      return location.pathname.startsWith("/booking");
    }

    if (location.pathname !== "/") return false;

    if (link.href === "/") {
      return !location.hash || location.hash === "#home";
    }

    return location.hash === link.href.replace("/", "");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <nav
        className="
          relative mx-auto flex min-h-[74px] w-full max-w-[1200px]
          items-center justify-between px-5
          sm:px-8
          md:min-h-[90px]
          lg:grid lg:min-h-[105px]
          lg:grid-cols-[1fr_auto_1fr]
          lg:px-12 lg:py-[17px]
          xl:px-0
        "
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex justify-start">
          <a
            href="/"
            onClick={(event) => handleNavigation(event, links[0])}
            className="inline-flex cursor-pointer items-center"
            aria-label="Wash Panda home"
          >
            <img
              src={logo}
              alt="Wash Panda"
              className="
                h-[52px] w-[49px] object-contain
                md:h-[75px] md:w-[86px]
                lg:h-[110px] lg:w-[104px]
              "
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden h-[34px] w-[510px] items-center justify-between lg:flex">
          {links.map((link) => {
            const isActive = isLinkActive(link);

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavigation(event, link)}
                className={`
                  relative cursor-pointer rounded-[7px]
                  flex h-[34px] items-center px-3
                  font-sans text-[20px] font-normal uppercase
                  leading-none tracking-[0]
                  transition-all duration-300 hover:-translate-y-0.5

                  ${
                    isActive
                      ? "bg-[#5195D5] text-white shadow-[0_6px_16px_rgba(81,149,213,0.3)]"
                      : "text-[#202020]"
                  }

                  hover:bg-[#5195D5]
                  hover:text-white
                `}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop Contact */}
        <div className="hidden items-center justify-end gap-4 lg:flex xl:absolute xl:left-[993px] xl:top-[50px] xl:gap-[15px]">
          <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[7px] bg-[#5195D5]">
            <img
              src={phnicon}
              alt="Phone"
              className="h-[26px] w-[26px] object-contain"
            />
          </div>

          <div className="text-left xl:relative xl:-top-px xl:h-[46px] xl:w-[148px] xl:shrink-0">
            <p className="text-[14px] font-normal leading-none text-[#202020]">
              Have any Question?
            </p>

            <a
              href="tel:+923455467549"
              className="mt-3 block cursor-pointer whitespace-nowrap text-[19px] font-medium leading-none text-[#202020] transition-colors duration-300 hover:text-[#5195D5]"
            >
              +92 (345) 5467549
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="
            grid h-11 w-11 cursor-pointer place-items-center
            rounded-lg bg-[#5195D5] text-white
            transition duration-300
            hover:bg-[#3f82c3]
            lg:hidden
          "
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6 6 12 12M18 6 6 18"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        className={`
          overflow-hidden bg-white
          transition-all duration-300
          lg:hidden
          ${
            menuOpen
              ? "visible max-h-[420px] opacity-100"
              : "invisible max-h-0 pointer-events-none opacity-0"
          }
        `}
      >
        <div className="flex flex-col gap-2 px-5 py-5 sm:px-8">
          {links.map((link) => {
            const isActive = isLinkActive(link);

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavigation(event, link)}
                className={`
                  relative cursor-pointer rounded-lg
                  px-4 py-4 font-sans text-[18px]
                  font-normal uppercase leading-none tracking-[0]
                  transition-all duration-300

                  ${
                    isActive
                      ? "bg-[#5195D5] text-white"
                      : "text-[#202020] hover:bg-[#5195D5] hover:text-white"
                  }
                `}
              >
                {link.name}
              </a>
            );
          })}

        </div>
      </div>
    </header>
  );
};

export default Navbar;

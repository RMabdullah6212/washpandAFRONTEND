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
          xl:grid xl:min-h-[120px]
          xl:grid-cols-[1fr_auto_1fr]
          xl:px-8 xl:py-3
          min-[1440px]:min-h-[144px]
          min-[1440px]:px-0 min-[1440px]:py-[17px]
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
                xl:h-[96px] xl:w-[90px]
                min-[1440px]:h-[110px] min-[1440px]:w-[104px]
              "
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden h-8 w-[470px] items-center justify-between xl:flex min-[1440px]:h-[34px] min-[1440px]:w-[510px]">
          {links.map((link) => {
            const isActive = isLinkActive(link);

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavigation(event, link)}
                className={`
                  relative cursor-pointer rounded-[7px]
                  flex h-8 items-center px-2
                  font-sans text-[18px] font-normal uppercase
                  leading-none tracking-[0]
                  transition-colors duration-300
                  min-[1440px]:h-[34px] min-[1440px]:px-3
                  min-[1440px]:text-[20px]

                  ${
                    isActive
                      ? "text-[#5195D5] underline decoration-2 underline-offset-[9px]"
                      : "text-[#202020]"
                  }

                  hover:text-[#5195D5]
                `}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop Contact */}
        <div className="hidden -translate-y-1 items-center justify-self-end gap-3 xl:flex min-[1440px]:absolute min-[1440px]:left-[993px] min-[1440px]:top-[45px] min-[1440px]:translate-y-0 min-[1440px]:gap-[15px]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px] bg-[#5195D5] min-[1440px]:h-[44px] min-[1440px]:w-[44px]">
            <img
              src={phnicon}
              alt="Phone"
              className="h-6 w-6 object-contain min-[1440px]:h-[26px] min-[1440px]:w-[26px]"
            />
          </div>

          <div className="shrink-0 text-left min-[1440px]:relative min-[1440px]:-top-px min-[1440px]:h-[46px] min-[1440px]:w-[148px]">
            <p className="whitespace-nowrap text-[13px] font-normal leading-none text-[#202020] min-[1440px]:text-[14px]">
              Have any Question?
            </p>

            <a
              href="tel:+923455467549"
              className="mt-2.5 block cursor-pointer whitespace-nowrap text-[16px] font-medium leading-none text-[#202020] transition-colors duration-300 hover:text-[#5195D5] min-[1440px]:mt-3 min-[1440px]:text-[19px]"
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
            grid h-10 w-10 cursor-pointer place-items-center
            rounded-[7px] bg-[#5195D5] text-white
            transition duration-300
            hover:bg-[#3f82c3]
            sm:h-11 sm:w-11 sm:rounded-lg
            md:h-12 md:w-12
            xl:hidden
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
              className="h-[22px] w-[22px] sm:h-6 sm:w-6 md:h-[26px] md:w-[26px]"
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
              className="h-[22px] w-[22px] sm:h-6 sm:w-6 md:h-[26px] md:w-[26px]"
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
          xl:hidden
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
                      ? "text-[#5195D5] underline decoration-2 underline-offset-8"
                      : "text-[#202020] hover:text-[#5195D5]"
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


import { useLocation, useNavigate } from "react-router-dom";

import heroImage from "../../assets/Home/hero image.jpg";
import bookHeroImage from "../../assets/Home/bookhero.jpg";

const HeroSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isBookingPage = location.pathname.startsWith("/booking");

  const handleBookNow = () => {
    navigate("/booking");
  };

  return (
    <>
      {isBookingPage ? (
        // Booking page hero
        <section
          id="booking-hero"
          className="relative flex h-[257px] w-full items-center justify-center overflow-hidden bg-[length:590px_257px] bg-center bg-no-repeat sm:h-[440px] sm:bg-cover md:h-[540px] lg:h-[627px]"
          style={{
            backgroundImage: `url(${bookHeroImage})`,
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Booking hero content */}
          <div className="relative z-10 px-4 text-center text-white">
            <h1 className="text-[32px] font-extrabold uppercase leading-tight sm:text-[38px] md:text-[44px] lg:text-[48px]">
              Book Your Wash
            </h1>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium uppercase sm:text-sm">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="transition hover:text-[#4d96d1]"
              >
                Home
              </button>

              <span>&gt;</span>

              <span>Booking</span>
            </div>
          </div>
        </section>
      ) : (
        // Home page hero
        <section id="home" className="w-full bg-white lg:pt-[40px]">
          <p className="mx-auto pt-3 text-center text-[14px] font-medium uppercase leading-none text-black opacity-100 sm:pt-4 sm:text-lg lg:h-[25px] lg:w-[263px] lg:pt-0 lg:text-[20px] lg:leading-[100%] lg:tracking-[0]">
            Welcome to Wash Panda
          </p>

          <div className="relative mx-auto w-full overflow-hidden lg:mt-[26px]">
            <img
              src={heroImage}
              alt="WashPanda car wash service"
              className="mt-[55px] block h-auto w-full object-contain sm:mt-0"
            />

            <div className="absolute inset-x-0 top-2 flex flex-col items-center px-4 text-center">
              <p className="w-full max-w-[334px] text-[20px] font-extrabold uppercase leading-[1.12] text-black sm:max-w-5xl sm:text-3xl sm:leading-tight md:text-5xl lg:text-6xl">
                Your Car is Always in Great
                <br />
                Hands With Us
              </p>

              <button
                type="button"
                onClick={handleBookNow}
                className="mt-3 flex h-[34px] w-[86px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[5px] bg-[#4d96d1] px-4 py-2 text-[10px] leading-none text-white opacity-100 transition hover:bg-[#347fbc] sm:h-[46px] sm:w-[115px] sm:px-[26px] sm:py-[14px] sm:text-xs lg:mt-4 lg:h-[51px] lg:w-[133px] lg:text-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;

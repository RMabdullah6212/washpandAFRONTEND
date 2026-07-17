
import { useLocation, useNavigate } from "react-router-dom";

import heroImage from "../assets/Home/hero image.jpg";
import bookHeroImage from "../assets/Home/bookhero.jpg";

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
          className="relative flex h-[280px] w-full items-center justify-center overflow-hidden bg-cover bg-[position:52%_center] bg-no-repeat sm:h-[380px] sm:bg-center md:h-[480px] lg:h-[560px] xl:h-[627px]"
          style={{
            backgroundImage: `url(${bookHeroImage})`,
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Booking hero content */}
          <div className="relative z-10 w-full px-5 text-center text-white sm:px-8">
            <h1 className="text-[30px] font-extrabold uppercase leading-none sm:text-[36px] md:text-[42px] lg:text-[46px] xl:text-[48px]">
              Book Your Wash
            </h1>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase sm:mt-4 sm:text-[13px] md:text-sm">
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
        <section
          id="home"
          className="w-full overflow-hidden bg-white pt-4 sm:pt-5 md:pt-6 lg:pt-8 xl:pt-10"
        >
          <p className="mx-auto px-5 text-center text-[14px] font-medium uppercase leading-none tracking-[0] text-black sm:text-[16px] md:text-[18px] lg:text-[20px]">
            Welcome to Wash Panda
          </p>

          <div className="relative mx-auto mt-3 w-full overflow-hidden pt-[92px] sm:mt-4 sm:pt-[76px] md:mt-5 md:pt-[52px] lg:mt-[26px] lg:pt-0">
            <img
              src={heroImage}
              alt="WashPanda car wash service"
              className="block h-auto w-full object-contain"
            />

            <div className="absolute inset-x-0 top-0 flex flex-col items-center px-5 text-center sm:px-8">
              <h1 className="w-full max-w-[350px] text-[22px] font-extrabold uppercase leading-[1.12] text-black sm:max-w-[620px] sm:text-[32px] md:max-w-[820px] md:text-[42px] lg:max-w-[1000px] lg:text-[50px] xl:text-[56px]">
                Your Car is Always in Great
                <br />
                Hands With Us
              </h1>

              <button
                type="button"
                onClick={handleBookNow}
                className="mt-3 flex h-[36px] min-w-[94px] items-center justify-center whitespace-nowrap rounded-[5px] bg-[#4d96d1] px-4 text-[11px] font-medium uppercase leading-none text-white transition hover:bg-[#347fbc] sm:h-[42px] sm:min-w-[108px] sm:px-5 sm:text-[12px] md:mt-4 md:h-[46px] md:min-w-[118px] md:text-[14px] lg:h-[51px] lg:min-w-[133px] lg:px-[26px] lg:text-[16px]"
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

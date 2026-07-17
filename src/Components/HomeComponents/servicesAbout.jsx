

import srvcabt from "../../assets/Home/servicesabout.png";
import nc from "../../assets/Home/naturalcleaner.png";
import ts from "../../assets/Home/tireshines.png";
import mw from "../../assets/Home/matwashing.png";

const ServicesAbout = () => {
  return (
    <section className="flex w-full flex-col pt-12 md:flex-row">
      {/* Left content section */}
      <div className="w-full bg-[#4d92d4] px-5 py-10 text-white sm:px-8 md:w-1/2 md:px-10 lg:min-h-[571px] lg:px-16 xl:pl-[120px] xl:pr-[60px]">
        <p className="text-[18px] sm:text-[20px]">
          Find who we are
        </p>

        <h2 className="mt-4 text-[30px] font-semibold uppercase leading-[1.2] sm:text-[36px] lg:text-[40px]">
          We only provide quality care services
        </h2>

        {/* Natural Cleaner */}
        <div className="mt-7 flex w-full items-start gap-5">
          <div className="h-[55px] w-[55px] shrink-0 sm:h-[60px] sm:w-[60px]">
            <img
              src={nc}
              alt="Natural cleaner"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="w-full">
            <h3 className="text-[21px] font-medium sm:text-[25px]">
              Natural Cleaner
            </h3>

            <p className="mt-2 text-[15px] leading-6 sm:text-[16px]">
              WashPanda Hand Wash is an eco-friendly, hand car wash and based
              in Portland. Our company was founded.
            </p>
          </div>
        </div>

        {/* Tire Shine */}
        <div className="mt-7 flex w-full items-start gap-5">
          <div className="h-[55px] w-[55px] shrink-0 sm:h-[60px] sm:w-[60px]">
            <img
              src={ts}
              alt="Tire shine"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="w-full">
            <h3 className="text-[21px] font-medium sm:text-[25px]">
              Tire Shine
            </h3>

            <p className="mt-2 text-[15px] leading-6 sm:text-[16px]">
              WashPanda Hand Wash is an eco-friendly, hand car wash and based
              in Portland. Our company was founded.
            </p>
          </div>
        </div>

        {/* Mat Washing */}
        <div className="mt-7 flex w-full items-start gap-5">
          <div className="h-[55px] w-[55px] shrink-0 sm:h-[60px] sm:w-[60px]">
            <img
              src={mw}
              alt="Mat washing"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="w-full">
            <h3 className="text-[21px] font-medium sm:text-[25px]">
              Mat Washing
            </h3>

            <p className="mt-2 text-[15px] leading-6 sm:text-[16px]">
              WashPanda Hand Wash is an eco-friendly, hand car wash and based
              in Portland. Our company was founded.
            </p>
          </div>
        </div>
      </div>

      {/* Right image section */}
      <div className="h-[350px] w-full sm:h-[450px] md:h-auto md:w-1/2 lg:min-h-[571px]">
        <img
          src={srvcabt}
          alt="Wash Panda services"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default ServicesAbout;



import Aboutimg from "../../assets/home/about image.png";

const About = () => {
  const services = [
    "We offer multiple services at a great value",
    "We offer multiple services at a great value",
    "We offer multiple services at a great value",
    "We offer multiple services at a great value",
    "We offer multiple services at a great value",
  ];

  return (
    <section id="about" className="mt-2 w-full bg-white py-6 lg:pt-[62px]">
      <div className="mx-auto w-full max-w-[440px] px-5 lg:max-w-[1200px] lg:px-0">
        {/* Heading */}
        <h1 className="mx-auto mb-2 text-center text-[24px] font-semibold uppercase leading-none text-[#222] opacity-100 sm:text-4xl lg:mb-[40px] lg:h-[50px] lg:w-[412px] lg:text-[40px] lg:leading-[100%] lg:tracking-[0]">
          Who Is Wash Panda
        </h1>

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[500px_1fr] lg:gap-[50px]">
          {/* Image */}
          <div className="order-2 w-full lg:order-1">
            <img
              src={Aboutimg}
              alt="Wash Panda cleaning a car"
              className="h-[440px] w-full rounded-[10px] object-cover object-center opacity-100 lg:h-[550px] lg:w-[500px]"
            />
          </div>

          {/* Right content */}
          <div className="order-1 text-left lg:order-2 lg:pt-[55px]">
            <p className="w-full text-[12px] font-normal leading-[20px] tracking-[0] text-gray-600 opacity-100 lg:h-[189px] lg:w-[572px] lg:text-[16px] lg:leading-[27px]">
              WashPanda Hand Wash is an eco-friendly, hand car wash and
              detailing service based in Portland. Our company was founded back
              in 2005 by a team of experts with more than 10 years of
              professional car wash experience. We operate three car washes
              throughout the Portland area. Our goal is to provide our
              customers with the friendliest, most convenient hand car wash
              experience possible. We use the most modern and up-to-date water
              reclamation modules as a part of our car wash systems. Our
              products are all biodegradable and eco-friendly.
            </p>

            {/* Bottom columns */}
            <div className="mt-2 grid grid-cols-1 gap-3 lg:mt-7 lg:grid-cols-2 lg:gap-[30px]">
              <div>
                <h3 className="text-[15px] font-medium leading-[27px] tracking-[0] text-[#222] lg:text-[20px]">
                  The Best Car Wash
                </h3>

                <div>
                  {services.map((service, index) => (
                    <p
                      key={`service-${index}`}
                      className="text-[12px] font-normal leading-[20px] tracking-[0] text-gray-600 lg:text-[16px] lg:leading-[27px]"
                    >
                      {service}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[15px] font-medium leading-[27px] tracking-[0] text-[#222] lg:text-[20px]">
                  Contacting Us
                </h3>

                <div>
                  {services.map((service, index) => (
                    <p
                      key={`contact-${index}`}
                      className="text-[12px] font-normal leading-[20px] tracking-[0] text-gray-600 lg:text-[16px] lg:leading-[27px]"
                    >
                      {service}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

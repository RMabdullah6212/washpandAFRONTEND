import { useEffect, useState } from "react";

const reviews = [
  {
    review:
      "Lorem ipsum dolor sit amet. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    name: "Liam Nohkan",
    vehicle: "Toyota V8",
    initials: "LN",
  },
  {
    review:
      "The service was excellent and the team handled my car professionally. The final result was clean, polished, and better than expected.",
    name: "Daniel Carter",
    vehicle: "Honda Civic",
    initials: "DC",
  },
  {
    review:
      "Very friendly staff and great attention to detail. My car looked fresh and spotless after the complete wash service.",
    name: "Sophia Martin",
    vehicle: "BMW X5",
    initials: "SM",
  },
  {
    review:
      "Quick, affordable, and professional car care. I was impressed by the quality of the wash and the customer service.",
    name: "Oliver James",
    vehicle: "Audi A6",
    initials: "OJ",
  },
];

const ClientReviews = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const previousIndex =
    (activeIndex - 1 + reviews.length) % reviews.length;

  const nextIndex = (activeIndex + 1) % reviews.length;

  const visibleReviews = [
    {
      ...reviews[previousIndex],
      index: previousIndex,
      position: "left",
    },
    {
      ...reviews[activeIndex],
      index: activeIndex,
      position: "center",
    },
    {
      ...reviews[nextIndex],
      index: nextIndex,
      position: "right",
    },
  ];

  return (
    <section className="w-full overflow-hidden bg-white py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <h1 className="mb-10 text-center text-[28px] font-semibold uppercase leading-none text-[#202020] sm:text-[34px] lg:text-[40px]">
          Client Reviews
        </h1>

        {/* Mobile */}
        <div className="block md:hidden">
          <article
            key={activeIndex}
            className="review-mobile-enter mx-auto w-full max-w-[420px] px-1"
          >
            <div className="relative min-h-[260px] rounded-[10px] bg-[#5195d5] px-5 pb-14 pt-16 text-center text-white shadow-[0_18px_45px_rgba(45,110,170,0.25)] sm:px-7">
              <span className="absolute left-1/2 top-1 -translate-x-1/2 font-serif text-[78px] font-bold leading-none text-white/20">
                “
              </span>

              <p className="relative z-10 text-[15px] font-normal leading-[25px] sm:text-[16px] sm:leading-[27px]">
                {reviews[activeIndex].review}
              </p>
            </div>

            <div className="relative z-10 -mt-7 flex flex-col items-center">
              <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-[4px] border-white bg-[#1f2937] text-[14px] font-semibold text-white shadow-md">
                {reviews[activeIndex].initials}
              </div>

              <h3 className="mt-3 text-center text-[21px] font-semibold leading-none text-[#202020] sm:text-[23px]">
                {reviews[activeIndex].name}
              </h3>

              <p className="mt-2 text-center text-[14px] font-normal leading-none text-[#777777] sm:text-[15px]">
                {reviews[activeIndex].vehicle}
              </p>
            </div>
          </article>
        </div>

        {/* Tablet and desktop */}
        <div className="relative hidden min-h-[410px] md:block lg:min-h-[430px]">
          {visibleReviews.map((review) => {
            const isCenter = review.position === "center";

            return (
              <article
                key={`${review.index}-${review.position}`}
                onClick={() => setActiveIndex(review.index)}
                className={`
                  review-card-reveal absolute top-0 cursor-pointer transition-all duration-700 ease-in-out
                  ${
                    review.position === "left"
                      ? `
                        left-[-12%] z-10 w-[44%] translate-y-8
                        lg:left-[1%] lg:w-[32%]
                      `
                      : ""
                  }
                  ${
                    review.position === "center"
                      ? `
                        left-1/2 z-30 w-[48%] -translate-x-1/2 -translate-y-1
                        lg:w-[34%] lg:-translate-y-4
                      `
                      : ""
                  }
                  ${
                    review.position === "right"
                      ? `
                        right-[-12%] z-10 w-[44%] translate-y-8
                        lg:right-[1%] lg:w-[32%]
                      `
                      : ""
                  }
                `}
              >
                <div
                  className={`
                    relative flex items-center justify-center rounded-[8px] text-center
                    transition-all duration-700
                    ${
                      isCenter
                        ? `
                          min-h-[250px] bg-[#5195d5] px-7 pb-14 pt-16 text-white
                          shadow-[0_18px_45px_rgba(45,110,170,0.28)]
                          lg:min-h-[250px] lg:px-10
                        `
                        : `
                          min-h-[220px] bg-white px-6 pb-12 pt-14 text-[#555555]
                          shadow-[0_8px_30px_rgba(0,0,0,0.09)]
                          lg:min-h-[220px] lg:px-9
                        `
                    }
                  `}
                >
                  <span
                    className={`
                      absolute left-1/2 top-2 -translate-x-1/2
                      font-serif text-[74px] font-bold leading-none
                      lg:text-[84px]
                      ${
                        isCenter
                          ? "text-white/20"
                          : "text-[#d9d9d9]/70"
                      }
                    `}
                  >
                    “
                  </span>

                  <p
                    className={`
                      relative z-10 font-normal tracking-normal
                      ${
                        isCenter
                          ? "text-[16px] leading-[26px] lg:text-[18px] lg:leading-[28px]"
                          : "text-[14px] leading-[23px] lg:text-[16px] lg:leading-[26px]"
                      }
                    `}
                  >
                    {review.review}
                  </p>
                </div>

                <div className="relative z-40 mx-auto -mt-7 flex flex-col items-center">
                  <div
                    className={`
                      flex items-center justify-center rounded-full border-[4px]
                      border-white font-semibold shadow-md
                      ${
                        isCenter
                          ? "h-[60px] w-[60px] bg-[#1f2937] text-[15px] text-white"
                          : "h-[54px] w-[54px] bg-[#dceafb] text-[14px] text-[#1f2937]"
                      }
                    `}
                  >
                    {review.initials}
                  </div>

                  <h3
                    className={`
                      mt-3 text-center font-semibold leading-none text-[#202020]
                      ${
                        isCenter
                          ? "text-[23px] lg:text-[25px]"
                          : "text-[19px] lg:text-[22px]"
                      }
                    `}
                  >
                    {review.name}
                  </h3>

                  <p
                    className={`
                      mt-2 text-center font-normal leading-none text-[#777777]
                      ${
                        isCenter
                          ? "text-[15px] lg:text-[16px]"
                          : "text-[13px] lg:text-[15px]"
                      }
                    `}
                  >
                    {review.vehicle}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-[7px] md:mt-2 lg:mt-5">
          {reviews.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show review ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`
                rounded-full transition-all duration-300
                ${
                  activeIndex === index
                    ? "h-[10px] w-[10px] bg-[#5195d5]"
                    : "h-[7px] w-[7px] bg-[#d8d8d8] hover:bg-[#a9a9a9]"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;

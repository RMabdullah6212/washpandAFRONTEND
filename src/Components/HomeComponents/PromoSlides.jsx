const PromoSlides = () => {
  const promoText =
    "EXPERIENCE TOP-QUALITY CAR CARE FOR LESS TODAY!";

  return (
    <section className="relative h-[430px] w-full overflow-hidden bg-white">
      {/* Blue moving slide */}
      <div className="absolute left-[-5%] top-[120px] z-10 w-[110%] rotate-[4deg] bg-[#4d93d2] py-8">
        <div className="promo-slide-left flex w-max items-center whitespace-nowrap">
          {[1, 2, 3, 4].map((item) => (
            <p
              key={item}
              className="mx-5 text-[38px] font-black uppercase italic text-white md:text-[52px]"
            >
              {promoText}
            </p>
          ))}
        </div>
      </div>

      {/* Light grey moving slide */}
      <div className="absolute left-[-5%] top-[255px] z-20 w-[110%] rotate-[-3deg] bg-[#eeeeee] py-8">
        <div className="promo-slide-right flex w-max items-center whitespace-nowrap">
          {[1, 2, 3, 4].map((item) => (
            <p
              key={item}
              className="mx-5 text-[36px] font-black uppercase text-[#202020] md:text-[50px]"
            >
              {promoText}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSlides;
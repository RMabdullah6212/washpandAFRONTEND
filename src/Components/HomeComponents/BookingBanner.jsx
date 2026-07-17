import book from "../../assets/Home/book.jpg";

const BookingBanner = () => {
  return (
    <section
      className="relative flex  w-full items-center overflow-hidden bg-cover bg-center bg-no-repeat sm:min-h-[280px] lg:h-[198px]"
      style={{ backgroundImage: `url(${book})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-8 px-5 py-12 text-center sm:px-8 md:flex-row md:text-left lg:px-12 xl:px-0">
        <h2 className="max-w-[1050px] text-[28px] font-semibold uppercase leading-[1.15] text-white sm:text-[36px] md:text-[42px] lg:text-[48px]">
          Easy Online Car Wash Booking System
        </h2>

        <button
          type="button"
          className="shrink-0 rounded-[7px] bg-white px-6 py-3 text-[15px] font-medium text-[#5195d5] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#5195d5] hover:text-white sm:px-7 sm:py-3.5 sm:text-[16px] lg:px-8 lg:py-4 lg:text-[18px]"
        >
          Book Now
        </button>
      </div>
    </section>
  );
};

export default BookingBanner;

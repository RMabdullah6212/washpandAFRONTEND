import first from "../../assets/Home/1.png";
import second from "../../assets/Home/2.png";
import third from "../../assets/Home/3.png";
import fourth from "../../assets/Home/4.png";
import fifth from "../../assets/Home/5.png";
import sixth from "../../assets/Home/6.png";
import logo from "../../assets/Home/logo.png";

const Gallery = () => {
  const images = [first, second, third, fourth, fifth, sixth];

  return (
    <section id="gallery" className="w-full overflow-hidden bg-white py-10">
      <h1 className="mb-10 text-center text-[28px] font-semibold uppercase leading-none text-[#202020] sm:text-[34px] lg:text-[40px]">
        Gallery
      </h1>

      <div className="gallery-slider w-full overflow-hidden">
        <div className="gallery-track flex w-max">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className="grid w-screen shrink-0 grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6"
              aria-hidden={setIndex === 1}
            >
              {images.map((image, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="relative h-[340px] w-full overflow-hidden rounded-[6px] sm:h-[460px] lg:h-[560px]"
                >
                  <img
                    src={image}
                    alt={
                      setIndex === 0
                        ? `Car wash gallery ${index + 1}`
                        : ""
                    }
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />

                  <img
                    src={logo}
                    alt={setIndex === 0 ? "Wash Panda logo" : ""}
                    className="absolute left-1/2 top-4 z-10 w-[60px] -translate-x-1/2 object-contain md:top-5 md:w-[75px]"
                  />

                  <div className="absolute inset-0 bg-black/5 transition-colors duration-300 hover:bg-black/10" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

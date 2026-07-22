import { useEffect, useState } from "react";
import { api } from "../../services/api";
import logo from "../../assets/Home/logo.png";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let active = true;

    api
      .getGallery()
      .then((items) => {
        if (active) setImages(Array.isArray(items) ? items.slice(0, 6) : []);
      })
      .catch(() => {
        if (active) setImages([]);
      });

    return () => {
      active = false;
    };
  }, []);

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="w-full overflow-hidden bg-white py-10">
      <h1 className="mb-10 text-center text-[28px] font-semibold uppercase leading-none text-[#202020] sm:text-[34px] lg:text-[40px]">
        Gallery
      </h1>

      <div className="gallery-slider w-full overflow-hidden">
        <div className="gallery-track flex w-max flex-nowrap">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className="flex shrink-0 flex-nowrap gap-1 pr-1"
              aria-hidden={setIndex === 1}
            >
              {images.map((image) => (
                <div
                  key={`${setIndex}-${image._id}`}
                  className="group relative h-[300px] w-[190px] shrink-0 overflow-hidden rounded-xl sm:h-[380px] sm:w-[240px] md:h-[460px] md:w-[280px] lg:h-[560px] lg:w-[23vw] lg:rounded-[14px]"
                >
                  <img
                    src={image.thumbnailUrl || image.mediaUrl}
                    alt={setIndex === 0 ? image.altText || image.title : ""}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <img
                    src={logo}
                    alt=""
                    className="absolute left-1/2 top-4 z-10 w-[60px] -translate-x-1/2 object-contain md:top-5 md:w-[75px]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/10" />
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

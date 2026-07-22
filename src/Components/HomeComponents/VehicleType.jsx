import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../services/api";

const VehicleType = ({ onVehicleSelect, items, selectedVehicleId = "" }) => {
  const location = useLocation();
  const [homeVehicles, setHomeVehicles] = useState([]);

  const isBookingPage = location.pathname.startsWith("/booking");

  useEffect(() => {
    if (items !== undefined) return undefined;

    let active = true;
    api.getCatalog()
      .then((catalog) => {
        if (active) setHomeVehicles(catalog.vehicleTypes || []);
      })
      .catch(() => {
        if (active) setHomeVehicles([]);
      });

    return () => {
      active = false;
    };
  }, [items]);

  const displayedVehicles = (items !== undefined ? items : homeVehicles).map((vehicle) => ({
    ...vehicle,
    id: vehicle.code || vehicle._id,
    name: vehicle.name || "Vehicle Type",
  }));

  const handleVehicleSelect = (vehicle) => {
    if (!isBookingPage) return;

    onVehicleSelect?.(vehicle);
  };

  return (
    <section
      id="booking"
      className={`w-full bg-white ${
        isBookingPage ? "pb-5 pt-7 sm:pb-6 sm:pt-8" : "py-10"
      }`}
    >
      <div
        className="mx-auto w-full max-w-[1200px] px-4 xl:px-0"
      >
        {isBookingPage ? (
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#4d92d4] text-sm font-semibold text-white sm:h-14 sm:w-14 sm:text-base">
              1/5
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#222] sm:text-xl">
                Vehicle Type
              </h2>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-[13px]">
                Select vehicle type below
              </p>
            </div>
          </div>
        ) : (
          <h1 className="mb-8 text-center font-sans text-[40px] font-semibold uppercase leading-none tracking-[0] text-[#222]">
            Wash Packages
          </h1>
        )}

        <div
          className={`grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-[repeat(5,228px)] ${
            isBookingPage ? "w-full lg:gap-3" : "lg:gap-[15px]"
          }`}
        >
          {displayedVehicles.map((vehicle) => {
            const isSelected = selectedVehicleId === vehicle.id;
            const CardElement = isBookingPage ? "button" : "div";

            return (
              <CardElement
                key={vehicle.id}
                type={isBookingPage ? "button" : undefined}
                onClick={
                  isBookingPage ? () => handleVehicleSelect(vehicle) : undefined
                }
                aria-pressed={isBookingPage ? isSelected : undefined}
                className={`flex w-full flex-col items-center justify-center rounded-xl border bg-white text-center transition-all duration-200 ${
                  isBookingPage
                    ? "min-h-[112px] cursor-pointer rounded-[5px] px-3 py-3 hover:border-[#4d92d4] hover:shadow-sm sm:min-h-[124px]"
                    : "h-[156px]  px-3 py-3 xl:w-[228px]"
                } ${
                  isSelected
                    ? "border-2 border-[#4d92d4] bg-blue-50 shadow-sm"
                    : "border-gray-300"
                }`}
              >
                <div
                  className={`flex w-full items-center justify-center ${
                    isBookingPage ? "h-[58px]" : "h-[88px]"
                  }`}
                >
                  <img
                    src={vehicle.imageUrl}
                    alt={`${vehicle.name} vehicle`}
                    className={`w-full object-contain ${
                      isBookingPage
                        ? "max-h-[54px]"
                        : "max-h-[76px]"
                    }`}
                  />
                </div>

                <h3
                  className={`mt-3 font-semibold ${
                    isBookingPage
                      ? "text-xs sm:text-sm"
                      : "text-xl"
                  } ${
                    isSelected ? "text-[#4d92d4]" : "text-[#222]"
                  }`}
                >
                  {vehicle.name}
                </h3>
              </CardElement>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VehicleType;

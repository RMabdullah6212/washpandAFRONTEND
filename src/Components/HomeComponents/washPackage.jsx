// import { useState } from 'react'
// import { FaCheck } from "react-icons/fa";

// const packages = [
//     {
//         id: 1,
//         name: "Basic Wash",
//         price: 999,
//         currency: "PKR",
//         features: [
//             "Lorem ipsum dolor amet submit",
//             "Lorem ipsum dolor amet submit",
//             "Lorem ipsum dolor amet submit",
//             "Lorem ipsum dolor amet submit",
//         ],
//         recommended: false,
//     },
    
//     {
//         id: 3,
//         name: "Ultimate Shine",
//         price: 1499,
//         currency: "PKR",
//         features: [
//             "Lorem ipsum dolor amet submit",
//             "Lorem ipsum dolor amet submit",
//             "Lorem ipsum dolor amet submit",
//             "Lorem ipsum dolor amet submit",
//             "Lorem ipsum dolor amet submit",
//             "Lorem ipsum dolor amet submit",
//         ],
//         recommended: false,
//     },
// ];
// const WashPackage = () => {

//     return (
//         <section id="booking" className="flex pl-4 pr-4 bg-white w-full items-center justify-center">
//             <div className="flex  mx-auto max-w-6xl items-center justify-center">
                

//                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
//                     {packages.map((pkg) => (
//                         <div
//                             key={pkg.id}
//                             className="rounded-[30px] border-t-4 border-[#5A9BDA] bg-white p-8 shadow-lg"
//                         >
//                             {/* Package Name */}
//                             <h3
//                                 className={`text-3xl font-bold uppercase ${pkg.recommended ? "text-black" : "text-[#5A9BDA]"
//                                     }`}
//                             >
//                                 {pkg.name}
//                             </h3>

//                             {/* Price */}
//                             <p className="mt-8 text-2xl text-[#2E2E2E]">Starting From</p>

//                             <div className="mt-2 flex items-end">
//                                 <span
//                                     className={`text-7xl font-bold ${pkg.recommended ? "text-[#5A9BDA]" : "text-black"
//                                         }`}
//                                 >
//                                     {pkg.price}
//                                 </span>

//                                 <span className="mb-2 ml-2 text-4xl font-medium text-gray-500">
//                                     {pkg.currency}
//                                 </span>
//                             </div>

//                             <hr className="my-10" />

//                             {/* Features */}
//                             <div className="space-y-6">
//                                 {pkg.features.map((feature, index) => (
//                                     <div key={index} className="flex items-center gap-4">
//                                         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4FE]">
//                                             <FaCheck className="text-[#5A9BDA]" />
//                                         </div>

//                                         <p className="text-lg text-[#2E2E2E]">{feature}</p>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Button */}
//                             <button
//                                 className={`mt-12 w-full rounded-xl border-2 py-4 text-2xl cursor-pointer font-medium transition ${pkg.recommended
//                                         ? "border-[#5A9BDA] bg-[#5A9BDA] text-white"
//                                         : "border-[#5A9BDA] bg-white text-[#5A9BDA] hover:bg-[#5A9BDA] hover:text-white"
//                                     }`}
//                             >
//                                 Select Plan
//                             </button>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     )
// }

// export default WashPackage


import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const homePackages = [
  {
    id: "basic",
    name: "Basic Wash",
    price: 999,
    currency: "PKR",
    features: [
      "Exterior Detailed Wash",
      "Interior Cleaning (Vacuum/Dusting)",
      "Tire & Rim Cleaning",
      "Dashboard Wipe",
      "Towel Hand Dry",
    ],
    recommended: false,
  },
  {
    id: "deluxe",
    name: "Deluxe Wash",
    price: 1499,
    currency: "PKR",
    features: [
      "Exterior Detailed Wash",
      "Interior Cleaning (Vacuum/Dusting)",
      "Tire & Rim Cleaning",
      "Dashboard Wipe",
      "Towel Hand Dry",
      "Premium Body Waxing",
    ],
    recommended: true,
  },
  {
    id: "ultimate",
    name: "Ultimate Shine",
    price: 1999,
    currency: "PKR",
    features: [
      "Exterior Detailed Wash",
      "Interior Deep Cleaning",
      "Tire & Rim Cleaning",
      "Dashboard Wipe",
      "Premium Body Waxing",
      "Window Polishing",
      "Engine Degreasing",
    ],
    recommended: false,
  },
];

const bookingPackages = [
  {
    id: "basic",
    name: "Basic Wash",
    price: 999,
    currency: "PKR",
    features: [
      "Exterior Detailed Wash",
      "Interior Cleaning",
      "Tire & Rim Cleaning",
      "Dashboard Wipe",
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe Wash",
    price: 1499,
    currency: "PKR",
    features: [
      "Exterior Detailed Wash",
      "Interior Cleaning",
      "Tire & Rim Cleaning",
      "Dashboard Wipe",
      "Premium Body Waxing",
    ],
  },
  {
    id: "ultimate",
    name: "Ultimate Shine",
    price: 1999,
    currency: "PKR",
    features: [
      "Exterior Detailed Wash",
      "Interior Deep Cleaning",
      "Tire & Rim Cleaning",
      "Dashboard Wipe",
      "Premium Body Waxing",
      "Window Polishing",
      "Engine Degreasing",
    ],
  },
];

const WashPackage = ({
  onPackageSelect,
  items,
  vehicleSelected = false,
  loading = false,
}) => {
  const location = useLocation();

  const isBookingPage = location.pathname.startsWith("/booking");

  const [selectedPackage, setSelectedPackage] = useState("");

  const packages = isBookingPage
    ? (items || []).map((pkg) => {
        const tierCode = pkg.code?.split("-").at(-1);
        const placeholder = bookingPackages.find((item) => item.id === tierCode);

        return {
          ...(placeholder || {}),
          ...pkg,
          id: pkg.code,
          name: pkg.name || "Wash Package",
          price: pkg.basePrice ?? 0,
          currency: pkg.currency || "PKR",
          features:
            pkg.features?.length
              ? pkg.features
              : placeholder?.features || ["Package details will be available soon"],
        };
      })
    : homePackages;

  const handlePackageSelect = (pkg) => {
    if (!isBookingPage) return;

    setSelectedPackage(pkg.id);
    onPackageSelect?.(pkg);
  };

  return (
    <section
      id="wash-packages"
      className={`w-full bg-white ${
        isBookingPage ? "py-5 sm:py-6" : "px-4 py-10"
      }`}
    >
      <div
        className={`mx-auto w-full ${
          isBookingPage
            ? "max-w-none px-4 sm:px-6 xl:px-[120px]"
            : "max-w-[1200px]"
        }`}
      >
        {/* Booking page heading */}
        {isBookingPage && (
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#4d92d4] text-sm font-semibold text-white sm:h-14 sm:w-14 sm:text-base">
              2/5
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#222] sm:text-xl">
                Wash Packages
              </h2>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-[13px]">
                Which wash is best for your vehicle?
              </p>
            </div>
          </div>
        )}

        {isBookingPage && (!vehicleSelected || loading) && (
          <div className="rounded-[5px] border border-dashed border-gray-300 px-4 py-8 text-center text-xs text-gray-500">
            {loading
              ? "Loading packages for the selected vehicle..."
              : "Select a vehicle type to view its wash packages."}
          </div>
        )}

        <div
          className="mx-auto grid w-full grid-cols-1 items-start gap-4 md:grid-cols-3"
        >
          {packages.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`flex flex-col rounded-[10px] border-t-4 border-[#5A9BDA] bg-white p-5 shadow-lg transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-[#5A9BDA] ring-offset-2"
                    : ""
                }`}
              >
                {/* Package Name */}
                <h3 className="text-xs font-bold uppercase text-[#5A9BDA] sm:text-[18px] lg:text-[18px]">
                  {pkg.name}
                </h3>

                {/* Starting From */}
                <p className="mt-3 text-[16px] text-[#2E2E2E]">
                  Starting From
                </p>

                {/* Price */}
                <div className="mt-1 flex items-end">
                  <span
                    className={`text-[40px] font-bold leading-none sm:text-[50px] lg:text-[50px] ${
                      (isBookingPage && pkg.id?.endsWith("-deluxe")) ||
                      (!isBookingPage && pkg.recommended)
                        ? "text-[#5A9BDA]"
                        : "text-black"
                    }`}
                  >
                    {pkg.price}
                  </span>

                  <span className="mb-0.5 ml-1 text-[18px] font-medium text-gray-500 sm:text-[18px] lg:text-[18px]">
                    {pkg.currency}
                  </span>
                </div>

                <hr className="my-4" />

                {/* Features */}
                <div className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF4FE]"
                      >
                        <FaCheck className="text-[8px] text-[#5A9BDA]" />
                      </div>

                      <p className="text-xs leading-5 text-[#2E2E2E] sm:text-[14px] sm:leading-6 lg:text-[16px] lg:leading-6">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Select button */}
                <button
                  type="button"
                  onClick={() => handlePackageSelect(pkg)}
                  className={`mt-5 w-full cursor-pointer rounded-[2px] border-2 border-[#5A9BDA] py-2.5 text-xs font-medium transition-all duration-200 ${
                    isSelected || (!isBookingPage && pkg.recommended)
                      ? "bg-[#5A9BDA] text-white"
                      : "bg-white text-[#5A9BDA] hover:bg-[#5A9BDA] hover:text-white"
                  }`}
                >
                  {isSelected ? "Selected" : "Select Plan"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WashPackage;

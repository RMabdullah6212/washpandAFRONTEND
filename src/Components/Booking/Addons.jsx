import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Addons = ({
  onAddonSelect,
  onAddMoreCar,
  items = [],
  loading = false,
  error = "",
  canAddMoreCar = false,
}) => {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [addonsSkipped, setAddonsSkipped] = useState(false);
  const addons = items.map((addon) => ({
    ...addon,
    id: addon.code || addon._id,
    name: addon.name || "Add-on",
    price: addon.price ?? 0,
    currency: addon.currency || "PKR",
  }));

  const handleAddonSelect = (addon) => {
    const isAlreadySelected = selectedAddons.includes(addon.id);

    const updatedAddons = isAlreadySelected
      ? selectedAddons.filter((id) => id !== addon.id)
      : [...selectedAddons, addon.id];

    setSelectedAddons(updatedAddons);
    setAddonsSkipped(false);

    onAddonSelect?.({
      addon,
      selected: !isAlreadySelected,
      selectedAddons: updatedAddons,
    });
  };

  const handleNotRequired = () => {
    setSelectedAddons([]);
    setAddonsSkipped(true);
    onAddonSelect?.({
      addon: null,
      selected: false,
      selectedAddons: [],
    });
  };

  const handleAddMoreCar = () => {
    const wasAdded = onAddMoreCar?.();
    if (wasAdded === false) return;

    setSelectedAddons([]);
    setAddonsSkipped(false);
    onAddonSelect?.({
      addon: null,
      selected: false,
      selectedAddons: [],
    });
  };

  return (
    <section id="addons" className="w-full bg-white py-5 sm:py-6">
      <div className="mx-auto w-full max-w-none px-4 sm:px-6 xl:px-[120px]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#4d96d1] text-sm font-semibold text-white sm:h-14 sm:w-14 sm:text-base">
              3/5
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-[#222] sm:text-xl">
                Addons
              </h2>

              <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                Choose extra touches to give your car the care it deserves!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNotRequired}
            aria-pressed={addonsSkipped}
            className={`shrink-0 rounded-[3px] border px-3 py-1.5 text-[10px] font-medium transition sm:px-4 ${
              addonsSkipped
                ? "border-[#4d96d1] bg-blue-50 text-[#4d96d1]"
                : "border-gray-300 bg-white text-gray-500 hover:border-[#4d96d1] hover:text-[#4d96d1]"
            }`}
          >
            {addonsSkipped ? "Add-ons Skipped" : "Not Required"}
          </button>
        </div>

        {addonsSkipped && (
          <p className="mb-3 rounded-[4px] bg-blue-50 px-3 py-2 text-xs text-[#4d96d1]">
            No add-ons will be included for this vehicle. You can still select
            an add-on below to change this choice.
          </p>
        )}

        {loading && (
          <div className="rounded-[5px] border border-dashed border-gray-300 px-4 py-8 text-center text-xs text-gray-500">
            Loading add-ons...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 text-center text-xs text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && addons.length === 0 && (
          <div className="rounded-[5px] border border-dashed border-gray-300 px-4 py-8 text-center text-xs text-gray-500">
            No add-ons are currently available.
          </div>
        )}

        {!loading && !error && addons.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {addons.map((addon) => {
            const isSelected = selectedAddons.includes(addon.id);

            return (
              <button
                type="button"
                key={addon.id}
                onClick={() => handleAddonSelect(addon)}
                className={`flex min-h-[82px] flex-col items-center justify-center rounded-[5px] border px-2 py-2.5 text-center transition-all duration-200 ${
                  isSelected
                    ? "border-[#4d96d1] bg-blue-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-[#4d96d1] hover:shadow-sm"
                }`}
              >
                <h3 className="text-[10px] font-medium leading-4 text-gray-500 sm:text-[14px] lg:text-[18px]">
                  {addon.name}
                </h3>

                {(addon.description || addon.name === "Windows In & Out") && (
                  <span className="text-[9px] leading-3 text-[#4d96d1]">
                    {addon.description || "More..."}
                  </span>
                )}

                <div className="mt-1 flex items-end justify-center">
                  <span className="text-sm font-semibold text-[#222] sm:text-[20px] lg:text-[24px]">
                    {addon.price}
                  </span>

                  <span className="mb-px ml-0.5 text-[9px] font-medium text-[#222]">
                    {addon.currency}
                  </span>
                </div>

                {isSelected && (
                  <span className="mt-1 text-[9px] font-medium text-[#4d96d1]">
                    Selected
                  </span>
                )}
              </button>
            );
          })}
          </div>
        )}

        <button
          type="button"
          onClick={handleAddMoreCar}
          disabled={!canAddMoreCar}
          className="mt-4 flex items-center justify-center gap-2 rounded-[4px] bg-[#4d96d1] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#347fbc] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <FaPlus className="text-sm" />
          Add More Car
        </button>
      </div>
    </section>
  );
};

export default Addons;

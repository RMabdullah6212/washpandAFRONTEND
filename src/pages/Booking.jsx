import { useEffect, useState } from "react";
import VehicleType from "../Components/HomeComponents/VehicleType";
import HeroSection from "../Components/HeroSection";
import WashPackage from "../Components/HomeComponents/washPackage";
import AddOns from "../Components/Booking/Addons";
import BookingForm from "../Components/Booking/BookingForm";
import { api } from "../services/api";

const Booking = () => {
  const [catalog, setCatalog] = useState({
    vehicleTypes: [],
    packages: [],
    addons: [],
    timeSlots: [],
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [quote, setQuote] = useState(null);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState("");
  const [allPackages, setAllPackages] = useState([]);
  const [addonResetKey, setAddonResetKey] = useState(0);

  useEffect(() => {
    api
      .getCatalog()
      .then((data) => {
        const initialVehicle =
          data.vehicleTypes.find((vehicle) => vehicle.code === "hatchback") ||
          data.vehicleTypes[0] ||
          null;
        const initialPackages = initialVehicle
          ? data.packages.filter(
              (pkg) => String(pkg.vehicleTypeId) === String(initialVehicle._id)
            )
          : [];

        setAllPackages(data.packages || []);
        setSelectedVehicle(initialVehicle);
        setCatalog({ ...data, packages: initialPackages });
      })
      .catch((error) => {
        setCatalogError(error.message || "Unable to load add-ons from the server.");
      })
      .finally(() => setCatalogLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedVehicle) return;

    let active = true;

    api
      .getPackages(selectedVehicle.code || selectedVehicle.id)
      .then((result) => {
        if (active) {
          setCatalog((previous) => ({
            ...previous,
            packages: result.packages || [],
          }));
        }
      })
      .catch(() => {
        if (active) {
          const cachedPackages = allPackages.filter(
            (pkg) =>
              String(pkg.vehicleTypeId) ===
              String(selectedVehicle._id || selectedVehicle.vehicleTypeId)
          );
          setCatalog((previous) => ({
            ...previous,
            packages: cachedPackages,
          }));
        }
      })
      .finally(() => {
        if (active) setPackagesLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedVehicle, allPackages]);

  useEffect(() => {
    const currentVehicle =
      selectedVehicle && selectedPackage
        ? {
            vehicleTypeId: selectedVehicle.code || selectedVehicle.id,
            packageId: selectedPackage.code || selectedPackage.id,
            addonIds: selectedAddons,
          }
        : null;
    const vehicles = [
      ...savedVehicles.map((vehicle) => ({
        vehicleTypeId: vehicle.vehicleTypeId,
        packageId: vehicle.packageId,
        addonIds: vehicle.addonIds,
      })),
      ...(currentVehicle ? [currentVehicle] : []),
    ];

    if (vehicles.length === 0) return;

    api
      .getQuote(vehicles)
      .then(setQuote)
      .catch(() => setQuote(null));
  }, [selectedVehicle, selectedPackage, selectedAddons, savedVehicles]);

  const selectedAddonTotal = selectedAddons.reduce((total, addonId) => {
    const addon = catalog.addons.find(
      (item) => item.code === addonId || item.id === addonId
    );
    return total + (addon?.price || (addonId === "bike" ? 500 : 0));
  }, 0);
  const currentVehicleTotal =
    (selectedPackage?.basePrice || selectedPackage?.price || 0) +
    selectedAddonTotal;
  const placeholderTotal = savedVehicles.reduce(
    (total, vehicle) => total + vehicle.estimatedTotal,
    currentVehicleTotal
  );
  const currentVehicleIsComplete = Boolean(selectedVehicle && selectedPackage);
  const selectedVehicleCount =
    savedVehicles.length + (currentVehicleIsComplete ? 1 : 0);

  const handleVehicleSelect = (vehicle) => {
    const cachedPackages = allPackages.filter(
      (pkg) =>
        String(pkg.vehicleTypeId) === String(vehicle._id || vehicle.vehicleTypeId)
    );

    setSelectedVehicle(vehicle);
    setSelectedPackage(null);
    setQuote(null);
    setPackagesLoading(cachedPackages.length === 0);
    setCatalog((previous) => ({ ...previous, packages: cachedPackages }));
  };

  const handleAddMoreCar = () => {
    if (!selectedVehicle || !selectedPackage) return false;

    setSavedVehicles((previous) => [
      ...previous,
      {
        vehicleTypeId: selectedVehicle.code || selectedVehicle.id,
        packageId: selectedPackage.code || selectedPackage.id,
        addonIds: selectedAddons,
        estimatedTotal: currentVehicleTotal,
      },
    ]);
    setSelectedVehicle(null);
    setSelectedPackage(null);
    setSelectedAddons([]);
    setQuote(null);
    setCatalog((previous) => ({ ...previous, packages: [] }));
    setAddonResetKey((key) => key + 1);

    window.requestAnimationFrame(() => {
      document.getElementById("booking")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return true;
  };

  const handleConfirmBooking = async (bookingData) => {
    if (selectedVehicle && !selectedPackage) {
      throw new Error("Please select a wash package for the current vehicle.");
    }

    const currentVehicle = currentVehicleIsComplete
      ? {
          vehicleTypeId: selectedVehicle.code || selectedVehicle.id,
          packageId: selectedPackage.code || selectedPackage.id,
          addonIds: selectedAddons,
        }
      : null;
    const vehicles = [
      ...savedVehicles.map((vehicle) => ({
        vehicleTypeId: vehicle.vehicleTypeId,
        packageId: vehicle.packageId,
        addonIds: vehicle.addonIds,
      })),
      ...(currentVehicle ? [currentVehicle] : []),
    ];

    if (vehicles.length === 0) {
      throw new Error("Please select at least one vehicle and wash package.");
    }

    return api.createBooking({
      serviceDate: bookingData.serviceDate,
      timeSlotId: bookingData.timeSlotId,
      paymentMethod: bookingData.customer.paymentMethod,
      note: bookingData.customer.note,
      customer: {
        fullName: bookingData.customer.fullName,
        email: bookingData.customer.email,
        phone: bookingData.customer.phone,
        address: bookingData.customer.address,
      },
      vehicles: vehicles.map((vehicle, index) => ({
        ...vehicle,
        makeAndModel:
          index === vehicles.length - 1
            ? bookingData.customer.vehicleModel
            : "",
      })),
    });
  };

  return (
    <div>
      <HeroSection />

      <VehicleType
        items={catalog.vehicleTypes}
        selectedVehicleId={selectedVehicle?.code || selectedVehicle?.id}
        onVehicleSelect={handleVehicleSelect}
      />
      <WashPackage
        key={selectedVehicle?.code || selectedVehicle?.id || "no-vehicle"}
        items={catalog.packages}
        vehicleSelected={Boolean(selectedVehicle)}
        loading={packagesLoading}
        onPackageSelect={setSelectedPackage}
      />
      <AddOns
        key={addonResetKey}
        items={catalog.addons}
        loading={catalogLoading}
        error={catalogError}
        canAddMoreCar={currentVehicleIsComplete}
        onAddMoreCar={handleAddMoreCar}
        onAddonSelect={({ selectedAddons: addonIds }) => setSelectedAddons(addonIds)}
      />
      <BookingForm
        totalAmount={quote?.totalAmount ?? placeholderTotal}
        numberOfCars={quote?.numberOfCars ?? (selectedVehicleCount || 1)}
        timeSlots={catalog.timeSlots}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
};

export default Booking;

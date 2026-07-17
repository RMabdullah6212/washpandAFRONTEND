import { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCar,
  FaClipboardList,
} from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const placeholderTimeSlots = [
  { code: "morning", title: "Morning", startTime: "09:00", endTime: "12:00" },
  { code: "noon", title: "Noon", startTime: "12:00", endTime: "15:00" },
  { code: "evening", title: "Evening", startTime: "15:00", endTime: "18:00" },
  { code: "night", title: "Night", startTime: "18:00", endTime: "21:00" },
  { code: "mid-night", title: "Mid Night", startTime: "21:00", endTime: "23:59" },
];

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  vehicleModel: "",
  paymentMethod: "",
  note: "",
};

const toDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatSlotTime = (slot) => {
  if (slot.code === "mid-night") return "After 9pm";

  const formatTime = (value) => {
    const [hours, minutes] = value.split(":").map(Number);
    const suffix = hours >= 12 ? "pm" : "am";
    const hour = hours % 12 || 12;
    return `${hour}${minutes ? `:${String(minutes).padStart(2, "0")}` : ""}${suffix}`;
  };

  return `${formatTime(slot.startTime)} to ${formatTime(slot.endTime)}`;
};

const BookingForm = ({
  totalAmount = 0,
  numberOfCars = 1,
  timeSlots = [],
  onConfirmBooking,
}) => {
  const navigate = useNavigate();
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("evening");
  const [availability, setAvailability] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const displaySlots = useMemo(
    () => (timeSlots.length ? timeSlots : placeholderTimeSlots),
    [timeSlots]
  );
  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const visibleDates = useMemo(() => {
    const isCurrentMonth =
      currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() === today.getMonth();
    const startDay = isCurrentMonth ? today.getDate() : 1;

    return Array.from(
      { length: 8 },
      (_, index) =>
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), startDay + index)
    );
  }, [currentMonth, today]);

  useEffect(() => {
    let active = true;

    Promise.all(
      visibleDates.map(async (date) => {
        const dateKey = toDateKey(date);
        if (date < today) return [dateKey, []];

        try {
          const result = await api.getAvailability(dateKey);
          return [dateKey, result.slots];
        } catch {
          return [
            dateKey,
            displaySlots.map((slot) => ({
              ...slot,
              available: true,
              remainingCapacity: null,
            })),
          ];
        }
      })
    ).then((entries) => {
      if (active) setAvailability(Object.fromEntries(entries));
    });

    return () => {
      active = false;
    };
  }, [visibleDates, today, displaySlots]);

  const selectedSlot =
    availability[toDateKey(selectedDate)]?.find(
      (slot) => slot.code === selectedTimeSlot
    ) || displaySlots.find((slot) => slot.code === selectedTimeSlot);

  const formattedSummaryDate = selectedDate
    ? `${selectedDate.getDate()},${selectedDate.toLocaleDateString("en-US", {
        month: "long",
      })}-${selectedSlot?.title || ""}`
    : "Select Date And Time";

  const handlePreviousMonth = () => {
    const previousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    const earliestMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (previousMonth >= earliestMonth) setCurrentMonth(previousMonth);
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    if (!selectedDate || !selectedTimeSlot) {
      setMessage({ type: "error", text: "Please select an available date and time." });
      return;
    }

    setSubmitting(true);
    try {
      const booking = await onConfirmBooking({
        serviceDate: toDateKey(selectedDate),
        timeSlotId: selectedTimeSlot,
        customer: formData,
      });

      setConfirmedBooking(booking);
      setFormData(initialFormData);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white pb-8 pt-5 sm:pb-10 sm:pt-6">
      <div className="mx-auto w-full max-w-none px-4 sm:px-6 xl:px-[120px]">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#4d96d1] text-sm font-semibold text-white sm:h-14 sm:w-14 sm:text-base">
            4/5
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#222] sm:text-xl">
              Select Date And Time
            </h2>
            <p className="mt-0.5 text-xs text-gray-500 sm:text-[13px]">
              Click on any time to make a booking.
            </p>
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-2">
          <button
            type="button"
            onClick={handlePreviousMonth}
            className="flex h-8 w-8 items-center justify-center rounded-[3px] text-[10px] text-gray-600 transition hover:bg-gray-50 hover:text-[#4d96d1]"
            aria-label="Previous month"
          >
            <FaArrowLeft />
          </button>
          <h3 className="text-xs font-medium text-[#222] sm:text-[14px] lg:text-[18px]">
            {monthName}
          </h3>
          <button
            type="button"
            onClick={handleNextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-[3px] bg-[#4d96d1] text-[10px] text-white transition hover:bg-[#347fbc]"
            aria-label="Next month"
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="grid min-w-[920px] grid-cols-8 border-b border-gray-100">
            {visibleDates.map((date) => {
              const dateKey = toDateKey(date);
              const isSelected = toDateKey(selectedDate) === dateKey;
              const dateSlots = availability[dateKey] || displaySlots;

              return (
                <div
                  key={dateKey}
                  className="min-w-0 border-r border-gray-100 bg-white first:border-l"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className="flex w-full flex-col items-center justify-center border-b border-gray-100 px-1 py-1.5 transition hover:bg-blue-50/40"
                  >
                    <span className="mb-1 text-[8px] font-medium text-gray-500 sm:text-[14px] lg:text-[18px]">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                    <span
                      className={`flex h-6 min-w-6 items-center justify-center rounded-[3px] px-1 text-xs font-semibold sm:h-8 sm:min-w-8 sm:text-[14px] lg:h-9 lg:min-w-9 lg:text-[18px] ${
                        isSelected
                          ? "bg-[#4d96d1] text-white"
                          : "text-[#222]"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </button>

                  <div>
                    {dateSlots.map((slot) => {
                      const isAvailable = slot.available !== false;
                      const isTimeSelected =
                        isSelected && selectedTimeSlot === slot.code;

                      return (
                        <button
                          key={slot.code}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedTimeSlot(slot.code);
                          }}
                          className={`min-h-[44px] w-full border-b border-gray-100 px-1 py-1.5 text-center transition last:border-b-0 ${
                            isTimeSelected
                              ? "bg-blue-50 text-[#4d96d1]"
                              : isAvailable
                                ? "bg-white text-[#333] hover:bg-blue-50/50 hover:text-[#4d96d1]"
                                : "cursor-not-allowed bg-gray-50 text-gray-300"
                          }`}
                        >
                          <span className="block text-[9px] font-medium leading-[11px] sm:text-[14px] sm:leading-5 lg:text-[18px] lg:leading-6">
                            {slot.title}
                          </span>
                          <span className="mt-0.5 block text-[7px] leading-[10px] sm:text-[14px] sm:leading-5 lg:text-[18px] lg:leading-6">
                            {formatSlotTime(slot)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-5 mt-7 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#4d96d1] text-sm font-semibold text-white sm:h-14 sm:w-14 sm:text-base">
            5/5
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#222] sm:text-xl">
              Booking Summary
            </h2>
            <p className="mt-0.5 text-xs text-gray-500 sm:text-[13px]">
              Please provide us with your contact information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 border-y border-gray-200 md:grid-cols-2">
          <div className="flex items-center gap-3 border-b border-gray-200 px-3 py-3 md:border-b-0 md:border-r">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-[#4d96d1] text-sm text-white">
              <FaCalendarAlt />
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-sm font-medium text-[#4d96d1] sm:text-base">
                {formattedSummaryDate}
              </h3>
              <p className="mt-0.5 text-[10px] text-gray-500">
                Booking Date & Time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-[#4d96d1] text-sm text-white">
              <FaClipboardList />
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-sm font-medium text-[#4d96d1] sm:text-base">
                {totalAmount}
                <span className="ml-1 text-[10px] font-medium">PKR</span>
              </h3>
              <p className="mt-0.5 text-[10px] text-gray-500">
                Total Amount
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-gray-200 px-3 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-[#4d96d1] text-sm text-white">
              <FaCar />
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-sm font-medium text-[#4d96d1] sm:text-base">
                {String(numberOfCars).padStart(2, "0")}
              </h3>
              <p className="mt-0.5 text-[10px] text-gray-500">
                Number of Cars
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
            {[
              ["fullName", "Full Name*", "text", "Enter full name", true],
              ["email", "Email Optional", "email", "Enter email", false],
              ["phone", "Phone Number*", "tel", "Enter phone number", true],
              ["address", "Address*", "text", "Enter address", true],
              [
                "vehicleModel",
                "Vehicle Make & Model Optional",
                "text",
                "Enter vehicle make & model",
                false,
              ],
            ].map(([name, label, type, placeholder, required]) => (
              <div key={name}>
                <label className="mb-1 block text-[11px] font-medium text-[#222]">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  required={required}
                  className="h-9 w-full rounded-[3px] border border-gray-200 px-3 text-[11px] outline-none transition focus:border-[#4d96d1]"
                />
              </div>
            ))}

            <div>
              <label className="mb-1 block text-[11px] font-medium text-[#222]">
                Payment Method*
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
                className="h-9 w-full rounded-[3px] border border-gray-200 bg-white px-3 text-[11px] text-gray-600 outline-none transition focus:border-[#4d96d1]"
              >
                <option value="">Select payment method</option>
                <option value="cash">Cash on Service</option>
                <option value="bank">Bank Transfer</option>
                <option value="card">Card Payment</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="mb-1 block text-[11px] font-medium text-[#222]">
                Note
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Enter note"
                rows="3"
                className="w-full resize-none rounded-[3px] border border-gray-200 px-3 py-2 text-[11px] outline-none transition focus:border-[#4d96d1]"
              />
            </div>
          </div>

          {message?.type === "error" && (
            <div
              className="mt-4 rounded-[3px] bg-red-50 px-3 py-2 text-xs text-red-700"
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full rounded-[3px] bg-[#4d96d1] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#347fbc] disabled:cursor-not-allowed disabled:opacity-60 md:max-w-[430px]"
          >
            {submitting ? "Confirming Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>

      {confirmedBooking && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-confirmation-title"
        >
          <div className="flex h-auto min-h-[369px] w-full max-w-[516px] flex-col items-center justify-center rounded-[15px] bg-white px-6 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:px-12">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#075c4d] text-white">
              <FaCheck className="text-[42px]" />
            </div>

            <h2
              id="booking-confirmation-title"
              className="mt-6 text-[24px] font-semibold leading-[1.3] text-[#1f1f1f] sm:text-[28px]"
            >
              Thank you!
              <br />
              Your Booking has been confirmed.
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Wash Panda team will contact you shortly.
            </p>

            <p className="mt-3 text-sm font-semibold text-[#075c4d]">
              Booking ID: {confirmedBooking.bookingId}
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-7 min-w-[145px] rounded-[10px] border border-[#075c4d] bg-white px-6 py-3 text-sm font-medium text-[#075c4d] transition hover:bg-[#075c4d] hover:text-white"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingForm;

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://washpanda-backend.vercel.app/api"
    : "http://localhost:5000/api");

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Something went wrong. Please try again.");
  }

  return payload.data;
}

export const api = {
  getGallery: () => request("/gallery"),
  getCatalog: () => request("/catalog"),
  getPackages: (vehicleType) =>
    request(`/catalog/packages?vehicleType=${encodeURIComponent(vehicleType)}`),
  getAvailability: (date) =>
    request(`/catalog/availability?date=${encodeURIComponent(date)}`),
  getQuote: (vehicles) =>
    request("/bookings/quote", {
      method: "POST",
      body: JSON.stringify({ vehicles }),
    }),
  createBooking: (booking) =>
    request("/bookings", {
      method: "POST",
      body: JSON.stringify(booking),
    }),
  sendContact: (message) =>
    request("/contact", {
      method: "POST",
      body: JSON.stringify(message),
    }),
};

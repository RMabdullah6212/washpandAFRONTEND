import { useState } from "react";
import contactf from "../../assets/Home/contactf.jpg";
import { api } from "../../services/api";

const QuickContact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, message: "", error: false });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, message: "", error: false });
    try {
      await api.sendContact(formData);
      setFormData({ fullName: "", email: "", phone: "", message: "" });
      setStatus({ loading: false, message: "Your message has been sent.", error: false });
    } catch (error) {
      setStatus({ loading: false, message: error.message, error: true });
    }
  };

  return (
    <section id="contact" className="w-full bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
  <div className="mx-auto max-w-[1200px]">
    <h1 className="mb-10 text-center text-[28px] font-semibold uppercase leading-none text-[#202020] sm:text-[34px] lg:text-[40px]">
      Quick Contact
    </h1>

    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Contact image */}
      <div className="h-[320px] overflow-hidden rounded-[12px] sm:h-[430px] lg:h-[560px]">
        <img
          src={contactf}
          alt="Wash Panda customer support"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Contact form */}
      <form onSubmit={handleSubmit} className="flex h-full flex-col">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-[17px] font-medium leading-none text-[#202020] sm:text-[19px]"
            >
              Full Name*
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="h-[52px] w-full rounded-[6px] border border-[#dddddd] px-5 text-[16px] outline-none transition placeholder:text-[#777777] focus:border-[#5195d5] focus:ring-2 focus:ring-[#5195d5]/15 sm:h-[56px] lg:h-[52px]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[17px] font-medium leading-none text-[#202020] sm:text-[19px]"
            >
              Email*
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="h-[52px] w-full rounded-[6px] border border-[#dddddd] px-5 text-[16px] outline-none transition placeholder:text-[#777777] focus:border-[#5195d5] focus:ring-2 focus:ring-[#5195d5]/15 sm:h-[56px] lg:h-[52px]"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-[17px] font-medium leading-none text-[#202020] sm:text-[19px]"
            >
              Phone Number*
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="h-[52px] w-full rounded-[6px] border border-[#dddddd] px-5 text-[16px] outline-none transition placeholder:text-[#777777] focus:border-[#5195d5] focus:ring-2 focus:ring-[#5195d5]/15 sm:h-[56px] lg:h-[52px]"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-[17px] font-medium leading-none text-[#202020] sm:text-[19px]"
            >
              Message*
            </label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter message"
              required
              rows={5}
              className="min-h-[130px] w-full resize-none rounded-[6px] border border-[#dddddd] px-5 py-4 text-[16px] outline-none transition placeholder:text-[#777777] focus:border-[#5195d5] focus:ring-2 focus:ring-[#5195d5]/15 sm:min-h-[145px] lg:min-h-[130px]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="mt-6 w-full rounded-[6px] bg-[#5195d5] px-8 py-[14px] text-[17px] font-medium text-white transition duration-300 hover:bg-[#3d82c3] sm:w-fit sm:min-w-[190px]"
        >
          {status.loading ? "Sending..." : "Send Message"}
        </button>
        {status.message && (
          <p className={`mt-4 ${status.error ? "text-red-600" : "text-green-600"}`}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  </div>
</section>
  );
};

export default QuickContact;

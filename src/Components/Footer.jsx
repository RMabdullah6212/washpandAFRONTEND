import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiInstagram,
} from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import logo from '../assets/Home/logo.png'


const Footer = () => {
    return (
        <footer className="w-full">
            {/* Top black section */}
            {/* Top black section */}
            <div className="bg-[#222222] px-5 py-7 text-white lg:h-[131px] lg:px-8 lg:py-0">
                <div className="mx-auto grid h-full w-full max-w-[1200px] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
                    {/* Phone */}
                    <div className="flex items-center justify-start gap-4 lg:justify-center lg:gap-5">
                        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#343434] sm:h-[68px] sm:w-[68px]">
                            <FiPhone className="text-[26px] sm:text-[28px]" />
                        </div>

                        <div>
                            <h3 className="text-[21px] font-semibold leading-none sm:text-[24px] lg:text-[26px]">
                                Phone Number
                            </h3>

                            <a
                                href="tel:+923455467549"
                                className="mt-3 block text-[15px] font-normal transition duration-300 hover:text-[#5195d5] sm:text-[17px] lg:text-[18px]"
                            >
                                +92 (345) 5467549
                            </a>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-start gap-4 lg:justify-center lg:gap-5">
                        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#343434] sm:h-[68px] sm:w-[68px]">
                            <FiMail className="text-[27px] sm:text-[30px]" />
                        </div>

                        <div>
                            <h3 className="text-[21px] font-semibold leading-none sm:text-[24px] lg:text-[26px]">
                                Mail Info
                            </h3>

                            <a
                                href="mailto:info@washpanda.com"
                                className="mt-3 block text-[15px] font-normal transition duration-300 hover:text-[#5195d5] sm:text-[17px] lg:text-[18px]"
                            >
                                info@washpanda.com
                            </a>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center justify-start gap-4 sm:col-span-2 lg:col-span-1 lg:justify-center lg:gap-5">
                        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#343434] sm:h-[68px] sm:w-[68px]">
                            <FiMapPin className="text-[27px] sm:text-[29px]" />
                        </div>

                        <div>
                            <h3 className="text-[21px] font-semibold leading-none sm:text-[24px] lg:text-[26px]">
                                Address
                            </h3>

                            <p className="mt-3 text-[15px] font-normal sm:text-[17px] lg:text-[18px]">
                                Johar Town, Lahore
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom blue section */}
            <div className="bg-[#5195d5] px-5 text-white lg:h-[227px] lg:px-10">
                <div className="mx-auto flex h-full max-w-[1200px] flex-col justify-between py-8 lg:py-0">
                    <div className="flex flex-col items-center justify-between gap-8 lg:h-[165px] lg:flex-row">
                        {/* Logo */}
                        <a href="/" className="shrink-0">
                            <img
                                src={logo}
                                alt="Wash Panda"
                                className="h-[105px] w-[120px] object-contain lg:h-[125px] lg:w-[135px]"
                            />
                        </a>

                        {/* Navigation */}
                        <nav aria-label="Footer navigation">
                            <ul className="flex max-w-[850px] flex-wrap items-center justify-center gap-y-3 text-center text-[15px] font-normal sm:text-[17px] lg:text-[19px]">
                                <li>
                                    <a
                                        href="/"
                                        className="transition duration-300 hover:text-[#222222]"
                                    >
                                        Home
                                    </a>
                                </li>

                                <li className="mx-2 text-white/80 sm:mx-3">|</li>

                                <li>
                                    <a
                                        href="/booking"
                                        className="transition duration-300 hover:text-[#222222]"
                                    >
                                        Booking
                                    </a>
                                </li>

                                <li className="mx-2 text-white/80 sm:mx-3">|</li>

                                <li>
                                    <a
                                        href="/about"
                                        className="transition duration-300 hover:text-[#222222]"
                                    >
                                        About
                                    </a>
                                </li>

                                <li className="mx-2 text-white/80 sm:mx-3">|</li>

                                <li>
                                    <a
                                        href="/gallery"
                                        className="transition duration-300 hover:text-[#222222]"
                                    >
                                        Gallery
                                    </a>
                                </li>

                                <li className="mx-2 text-white/80 sm:mx-3">|</li>

                                <li>
                                    <a
                                        href="/privacy-policy"
                                        className="transition duration-300 hover:text-[#222222]"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>

                                <li className="mx-2 text-white/80 sm:mx-3">|</li>

                                <li>
                                    <a
                                        href="/terms-and-conditions"
                                        className="transition duration-300 hover:text-[#222222]"
                                    >
                                        Terms & Conditions
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* Social links */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white text-white transition duration-300 hover:bg-white hover:text-[#5195d5] sm:h-[62px] sm:w-[62px]"
                            >
                                <FaFacebookF className="text-[23px] sm:text-[27px]" />
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white text-white transition duration-300 hover:bg-white hover:text-[#5195d5] sm:h-[62px] sm:w-[62px]"
                            >
                                <FiInstagram className="text-[24px] sm:text-[28px]" />
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X"
                                className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[#5195d5] transition duration-300 hover:bg-[#222222] hover:text-white sm:h-[62px] sm:w-[62px]"
                            >
                                <FaXTwitter className="text-[23px] sm:text-[27px]" />
                            </a>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-7 flex min-h-[62px] items-center justify-center border-t border-white/80 text-center lg:mt-0">
                        <p className="pt-5 text-[14px] font-normal sm:text-[16px] lg:pt-0 lg:text-[18px]">
                            Wash Panda © 2025. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

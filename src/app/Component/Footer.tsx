import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:">
          <div className="space-y-6">
            <img
              src="/tomocaLogo.png"
              alt="Tomoca Coffee"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <p className="text-sm text-gray-300">
              Est. 1953, TOMOCA Ethiopia&apos;s coffee pioneer, adds value to
              its golden treasure globally. Our branded coffee shops cultivate a
              distinctive culture, delighting customers daily with unique drinks
              and products.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Menu", "Shop", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    ☕ {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Working Hours</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <span className="text-[#ff4d4d]">Monday - Friday</span>
                <br />
                08:30 am - 05:30pm
              </li>
              <li>
                <span className="text-[#ff4d4d]">Saturday</span>
                <br />
                08:30 am - 12:30pm
              </li>
              <li>
                <span className="text-[#ff4d4d]">sunday</span>
                <br />
                Closed
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff4d4d]" />
                <span>
                  <span className="text-[#ff4d4d]">HQ Location :</span>
                  <br />
                  22 Around Yilma Sega Bet
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff4d4d]" />
                <span>
                  <span className="text-[#ff4d4d]">Email Address :</span>
                  <br />
                  info@tomocacoffeeethiopia.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff4d4d]" />
                <span>
                  <span className="text-[#ff4d4d]">Phone Number :</span>
                  <br />
                  +251-11-689-4064
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          Copyright © {new Date().getFullYear()} Tomoca Coffee. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}

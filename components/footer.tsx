import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-6 md:py-8">
        {/* Top section: links + logos */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Navigation links */}
          <ul className="flex flex-wrap justify-center sm:justify-start items-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>

          {/* Logos */}
          <div className="flex justify-center sm:justify-end items-center gap-4">
            <img
              src="/edify.png"
              alt="Edify"
              className="w-16 h-16 object-contain"
            />
            <img
              src="/logo_iitmd.png"
              alt="IITMD"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Bottom copyright */}
        <div className="text-center sm:text-right">
          <span className="block text-sm text-gray-500 dark:text-gray-400">
            © 2025{" "}
            <a href="/" className="hover:underline">
              RealID
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

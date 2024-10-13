import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 bg-gray-100">
      <div className="max-auto max-w-7wl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          &copy; {currentYear} Booko. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

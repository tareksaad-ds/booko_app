import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-2 bg-gray-100">
      <div className="max-auto max-w-7wl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          &copy; {currentYear} Booko. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

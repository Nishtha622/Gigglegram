import React from 'react';

const PaymentPage = ({ isDarkMode }) => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold">Proceed with Payment</h1>
        <p className="mt-2 text-lg">Scan the QR code to complete the payment.</p>
      </header>

      {/* QR Code Section */}
      <div className="text-center mt-8">
        <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Scan the QR Code
        </p>
        <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Use your preferred payment app to scan the QR code below and proceed with the payment.
        </p>
        <div className="mt-6">
          <img
            src="/qrcode.jpg" // Ensure the QR code image is in the public folder
            alt="QR Code for Payment"
            className="mx-auto rounded-lg shadow-lg"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
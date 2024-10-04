"use client";

import React, { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    if (error) {
      setErrorDetails({
        message: error.message,
        stack: error.stack,
      });
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center h-full relative">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 space-y-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <h1 className="text-2xl font-bold text-red-600">Application Error</h1>

        {errorDetails ? (
          <>
            <p className="text-lg text-[#444]">
              <strong>Error Message:</strong> {errorDetails.message}
            </p>
          </>
        ) : (
          <p>No error details available.</p>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}

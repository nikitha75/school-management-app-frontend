import React from "react";

export const Error = () => {
  return (
    <div className="p-4 h-[100vh]">
      <div className="h-full p-4 bg-[#eeffed] rounded-xl">
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="text-6xl text-gray-600">404</h1>
          <h1 className="mt-4 text-gray-600 font-bold text-xl">
            Sorry, the page you've requested is not found!
          </h1>
          <p className="mt-2 text-gray-500">Please check the URL and retry</p>
        </div>
      </div>
    </div>
  );
};

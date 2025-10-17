import React from "react";

const Architecture = () => {
  return (
    <section
      id="#architecture"
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-24 text-center"
    >
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
        Architecture
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl"></p>

      <div className="flex-1 w-full h-full">
        <img
          src="/arch.png"
          alt=""
          className="w-[90%] mx-auto border rounded-xl h-full"
        />
      </div>
    </section>
  );
};

export default Architecture;

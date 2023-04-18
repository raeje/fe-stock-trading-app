import React from "react";

const TitleContainer = ({ title, info }) => {
  return (
    //<div className="bg-custom-white border-yellow-500 border-2 shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2 flex place-content-between w-full px-8">
    <div className="flex place-content-between w-full px-4">
      <span className="text-2xl sm:text-3xl leading-none font-bold text-white">
        {title}
      </span>
      <span className="text-2xl sm:text-3xl leading-none font-bold text-white">
        {title.toUpperCase() === "ORDERS" ? "Balance: " : ""}
        {info ? `$ ${info}` : ""}
      </span>
    </div>
  );
};

const ContentTemplate = ({ title, info, children }) => {
  return (
    <div
      id="main-content"
      className="bg-custom-dark h-full w-full min-h-screen relative overflow-y-auto lg:ml-64"
    >
      <main>
        <div className="pt-10 px-8">
          <div className="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 pb-6">
            <TitleContainer title={title} info={info} />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentTemplate;

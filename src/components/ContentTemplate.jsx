import React from "react";

const TitleContainer = ({ title, info, admin }) => {
  return (
    <div className="flex place-content-between w-full px-4">
      <span className="text-2xl sm:text-3xl leading-none font-bold text-black">
        {title}
      </span>
      {admin ? (
        <span className="text-2xl sm:text-3xl leading-none font-bold text-black tracking-wide">
          {info ? `Total: ${info}` : ""}
        </span>
      ) : (
        <span className="text-2xl sm:text-3xl leading-none font-bold text-black tracking-wide">
          {info ? `Balance: $ ${info}` : ""}
        </span>
      )}
    </div>
  );
};

const ContentTemplate = ({ title, info, admin = false, children }) => {
  return (
    <div
      id="main-content"
      className="bg-custom-yellow h-full w-full min-h-screen relative overflow-y-auto lg:ml-64"
    >
      <main>
        <div className="pt-10 px-8">
          <div className="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 pb-6">
            <TitleContainer title={title} info={info} admin={admin} />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentTemplate;

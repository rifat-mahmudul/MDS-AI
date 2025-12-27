import React from "react";

const AppTopBar = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div>
      <h1 className="font-semibold text-3xl">{title}</h1>
      <p className="opacity-70 mt-1">{desc}</p>
    </div>
  );
};

export default AppTopBar;

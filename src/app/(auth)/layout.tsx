import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{ backgroundImage: 'url("/auth-doctor.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur" />

      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default layout;

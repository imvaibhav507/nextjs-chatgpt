import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-neutral-800">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={200}
        height={200}
        className="animate-pulse"
      />
    </div>
  );
}

export default Loading;

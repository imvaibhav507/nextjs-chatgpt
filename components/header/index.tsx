import { UserButton } from "@clerk/clerk-react";
import React from "react";
import SelectModel from "./SelectModel";

function Header() {
  return (
    <div className="flex h-[100px] justify-between p-5">
      {/* <MobileSidebar/> */}
      <SelectModel />
      <UserButton />
    </div>
  );
}

export default Header;

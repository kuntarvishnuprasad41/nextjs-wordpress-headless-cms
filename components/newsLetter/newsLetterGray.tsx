import React from "react";
import { Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

function NewsLetteGray() {
  return (
    <div className="container mx-auto w-full p-3 text-black">
      <div className="bg-[#F6F6F6] rounded-t-xl p-6 border  border-t-[#D1D1D1]  flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <div className="bg-[#2250fc] p-2  px-4">
            <span className=" text-6xl font-bold text-white">&</span>
          </div>
          <div>
            <h2 className="text-black font-bold text-xl">
              ProCo Stories newsletter
            </h2>
            <p className="text-black text-sm">
              Bringing you weekly curated insights and analysis on the global
              issues that matter.
            </p>
          </div>
        </div>
        <button className="bg-transparent border border-black text-black rounded-full px-4 py-1 text-sm">
          Subscribe now
        </button>
      </div>
      <div className="w-full border border-t-black h-[25px] bg-white z-100 "></div>
      <div className="bg-[#F6F6F6] rounded-b-xl  border  border-b-[#D1D1D1]  p-4 -mt-6 mb-8 flex justify-between items-center">
        <p className="text-black">Follow us whenever you get your content</p>
        <div className="flex gap-4">
          <Linkedin className="text-black w-5 h-5" />
          <Instagram className="text-black w-5 h-5" />
          <Facebook className="text-black w-5 h-5" />
          <Twitter className="text-black w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default NewsLetteGray;

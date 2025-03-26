import React from "react";
import { Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

function NewsLetterGray() {
  return (
    <div className="container mx-auto">
      <div className="bg-[#121b59] rounded-xl p-6   flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <div className="bg-[#F6F6F6] p-2 rounded-md">
            <span className="text-white text-2xl font-bold">&</span>
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">
              ProCo Stories newsletter
            </h2>
            <p className="text-white text-sm">
              Bringing you weekly curated insights and analysis on the global
              issues that matter.
            </p>
          </div>
        </div>
        <button className="bg-transparent border border-white text-white rounded-full px-4 py-1 text-sm">
          Subscribe now
        </button>
      </div>
      <div className="w-full border border-t-black "></div>
      <div className="bg-[#121b59] rounded-b-xl p-4 -mt-6 mb-8 flex justify-between items-center">
        <p className="text-white">Follow us whenever you get your content</p>
        <div className="flex gap-4">
          <Linkedin className="text-white w-5 h-5" />
          <Instagram className="text-white w-5 h-5" />
          <Facebook className="text-white w-5 h-5" />
          <Twitter className="text-white w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default NewsLetterGray;

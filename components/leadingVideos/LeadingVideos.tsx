"use client";

import Image from "next/image";
import React, { useState } from "react";

function LeadingVideos() {
  return (
    <div className="">
      <div className="bg-gradient-to-b from-[#121b59]  via-[#121b59] to-white   py-12 px-6 mb-12">
        <div className="container ">
          <h2 className="text-white text-3xl font-bold mb-2">Leading videos</h2>
          <p className="text-white mb-8">
            Understand the perspectives of leaders and change-makers in
            business, politics and civil society.
          </p>

          <div className=" grid grid-cols-1 md:grid-cols-5 gap-4">
            <VideoCard
              videoId="V2XvgUcbUFE"
              // imageUrl="/placeholder.svg?height=200&width=300"
              // bgColor="bg-yellow-700"
              // videoUrl="https://www.youtube.com/embed/V2XvgUcbUFE"
            />
            <VideoCard
              videoId="V2XvgUcbUFE"
              // imageUrl="/placeholder.svg?height=200&width=300"
              // bgColor="bg-gray-700"
              // videoUrl="https://www.youtube.com/embed/V2XvgUcbUFE"
            />
            <VideoCard
              videoId="V2XvgUcbUFE"

              // imageUrl="/placeholder.svg?height=200&width=300"
              // bgColor="bg-blue-700"
              // videoUrl="https://www.youtube.com/embed/V2XvgUcbUFE"
            />
            <VideoCard
              videoId="V2XvgUcbUFE"

              // imageUrl="/placeholder.svg?height=200&width=300"
              // bgColor="bg-green-700"
              // videoUrl="https://www.youtube.com/embed/V2XvgUcbUFE"
            />
            <VideoCard
              videoId="V2XvgUcbUFE"

              // imageUrl="/placeholder.svg?height=200&width=300"
              // bgColor="bg-teal-700"
              // videoUrl="https://www.youtube.com/embed/V2XvgUcbUFE"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadingVideos;

function VideoCard({ videoId }: { videoId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative">
      {!isPlaying ? (
        <div
          className="relative h-80 bg-black cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          {/* YouTube Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Video thumbnail"
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent rounded-b-lg"></div>
        </div>
      ) : (
        <div className="relative">
          <iframe
            className="w-full h-80 rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&playsinline=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
          {/* Gradient Overlay for iframe */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent rounded-b-lg"></div>
        </div>
      )}
      {/* Video Title and Description */}
      <div className="absolute bottom-4  left-2 text-white z-10">
        <p className="text-xs font-medium">MARK KEIERLEBER</p>
        <p className="text-sm font-medium">
          Tariffs, globalization, and democracy, with Harvard economist Dani
          Rodrik
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";
import React from "react";

function CategoryCarousel() {
  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <h3 className="text-sm font-medium uppercase tracking-wider">
          VITTORIO ELLIOT
        </h3>
      </div>

      {/* Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <ArticleCard
          category="Business"
          bgColor="#000000"
          imageUrl="/placeholder.svg?height=300&width=400"
          imageAlt="Silhouette of hands on keyboard with green glow"
        />
        <ArticleCard
          category="Cybersecurity"
          bgColor="#2250fc"
          imageUrl="/placeholder.svg?height=300&width=400"
          imageAlt="Modern building with Google logo"
        />
        <ArticleCard
          category="Business"
          bgColor="#f6f6f6"
          textColor="#000000"
          imageUrl="/placeholder.svg?height=300&width=400"
          imageAlt="Modern building structure"
        />
      </div>
    </div>
  );
}

export default CategoryCarousel;

function ArticleCard({
  category,
  bgColor = "#000000",
  textColor = "#ffffff",
  imageUrl,
  imageAlt,
}: {
  category: string;
  bgColor?: string;
  textColor?: string;
  imageUrl: string;
  imageAlt: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden relative">
      {/* Gradient Overlay on Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${bgColor} 62%, transparent 80%)`,
        }}
      />

      {/* Content Box */}
      <div className="p-6 relative z-10" style={{ color: textColor }}>
        <h3 className="text-2xl font-bold mb-2">{category}</h3>
        <p className="mb-4 text-sm">
          Engineers between 19 and 24, most linked to Musk's companies, are
          playing a key role as he seizes control of federal infrastructure.
          Engineers between 19 and 24, most linked to Musk's companies.
        </p>
        <button
          className="bg-transparent border rounded-full px-4 py-1 text-sm"
          style={{ borderColor: textColor, color: textColor }}
        >
          Subscribe now
        </button>
      </div>

      {/* Image */}
      <div className="h-48 relative">
        <Image
          src={"/images/p1.png"}
          alt={imageAlt}
          fill
          className="object-cover z-2"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${bgColor} 1%, transparent 30%)`,
            // backgroundImage: `radial-gradient(circle, transparent 80%, ${bgColor} 100%)`,
          }}
        />
      </div>
    </div>
  );
}

function VideoCard({
  imageUrl,
  bgColor,
}: {
  imageUrl: string;
  bgColor: string;
}) {
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        00:52
      </div>
      <div className="relative h-40 mb-2">
        <Image
          src={"/images/p2.png"}
          alt="Video thumbnail"
          fill
          className={`object-cover ${bgColor}`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-black border-b-[6px] border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
      <div className="text-white">
        <p className="text-xs font-medium mb-1">MARK KEIERLEBER</p>
        <p className="text-sm font-medium">
          Tariffs, globalization, and democracy, with Harvard economist Dani
          Rodrik
        </p>
      </div>
    </div>
  );
}

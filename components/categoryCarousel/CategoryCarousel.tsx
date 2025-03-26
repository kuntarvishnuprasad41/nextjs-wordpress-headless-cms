import Image from "next/image";
import React from "react";

function CategoryCarousel() {
  return (
    <div className="container   mx-auto mt-8 px-4 ">
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
          Engineers between 19 and 24, most linked to Musk&apos;s companies, are
          playing a key role as he seizes control of federal infrastructure.
          Engineers between 19 and 24, most linked to Musk&apos;s companies.
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

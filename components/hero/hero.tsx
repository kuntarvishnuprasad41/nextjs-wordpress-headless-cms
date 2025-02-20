import Image from "next/image";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NavTabs from "../searchTabs/NavTabs";

export default function Hero() {
  return (
    <div
      className="min-h-screen  p-2  bg-gradient-to-b from-black via-gray-950 to-white
 text-white"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-8 py-8 max-w-6xl">
        <div className="flex gap-14">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              The Young, Inexperienced Engineers Aiding Elon Musk&apos;s
              Government Takeover
            </h1>
            <p className="text-gray-400 text-lg">
              Engineers between 19 and 24, most linked to Musk&apos;s companies,
              are playing a key role as he seizes control of federal
              infrastructure.
            </p>
            <Button variant="secondary" className="mt-4 rounded-full">
              Read more
            </Button>
          </div>
          <div className="relative h-[370px] lg:h-[600px] rounded-xl overflow-hidden">
            <Image
              src="/images/flags.png"
              alt="International flags on display"
              width={1160}
              height={672}
              //   fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Search and Navigation */}
      <NavTabs />

      {/* Articles Carousel */}
      <section className="container mx-auto px-4 py-8">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full select-none"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {[
              {
                title: "The growing complexity of global cybersecurity",
                image: "",
                description:
                  "Engineers between 19 and 24, most linked to Musk&apos;s companies, are playing a key role as he seizes control of federal infrastructure.",
              },
              {
                title: "The growing complexity of global cybersecurity",
                image: "/images/p1.png",
                description:
                  "Engineers between 19 and 24, most linked to Musk&apos;s companies, are playing a key role as he seizes control of federal infrastructure.",
              },
              {
                title: "Moving from challenges to action",
                image: "/images/p2.png",
                description:
                  "Engineers between 19 and 24, most linked to Musk&apos;s companies, are playing a key role as he seizes control of federal infrastructure.",
              },
              {
                title: "The growing complexity of global cybersecurity",
                image: "/images/p1.png",
                description:
                  "Engineers between 19 and 24, most linked to Musk&apos;s companies, are playing a key role as he seizes control of federal infrastructure.",
              },
              {
                title: "The growing complexity of global cybersecurity",
                image: "/images/p2.png",
                description:
                  "Engineers between 19 and 24, most linked to Musk&apos;s companies, are playing a key role as he seizes control of federal infrastructure.",
              },
              {
                title: "The growing complexity of global cybersecurity",
                image: "/images/p1.png",
                description:
                  "Engineers between 19 and 24, most linked to Musk&apos;s companies, are playing a key role as he seizes control of federal infrastructure.",
              },
              {
                title: "The growing complexity of global cybersecurity",
                image: "/images/p2.png",
                description:
                  "Engineers between 19 and 24, most linked to Musk&apos;s companies, are playing a key role as he seizes control of federal infrastructure.",
              },
              {
                title: "The growing complexity of global cybersecurity",
                image: "/images/p1.png",
                description:
                  "Engineers between 19 and 24, most linked to Musk&apos;s companies, are playing a key role as he seizes control of federal infrastructure.",
              },
            ].map((article, i) => (
              <CarouselItem
                key={i}
                className={`pl-2 md:pl-4 ${
                  i === 0
                    ? "md:basis-[35%] lg:basis-1/5 h-72"
                    : "md:basis-1/6 lg:basis-1/5 h-72"
                }`}
              >
                <Card
                  className={`bg-gray-800 flex flex-col justify-between h-full bg-cover bg-center ${
                    i !== 0
                      ? "text-white border-gray-700"
                      : "bg-white text-black"
                  }`}
                  style={
                    i !== 0
                      ? {
                          backgroundImage: `url(${
                            article.image || "/images/p1.png"
                          })`,
                        }
                      : {}
                  }
                >
                  <CardContent
                    className={`relative p-4 ${i > 0 ? "mt-auto" : ""}`}
                  >
                    <h2
                      className={`text-xl font-bold mb-2 ${
                        i !== 0 ? "text-white" : "text-black"
                      }`}
                    >
                      {article.title}
                    </h2>

                    {i === 0 && (
                      <p className="text-sm text-gray-600">
                        {article.description}
                      </p>
                    )}
                  </CardContent>

                  {i === 0 && (
                    <CardFooter className="relative p-4 pt-0">
                      <Button
                        variant="ghost"
                        className="px-0 text-black hover:text-gray-700"
                      >
                        Read more <span className="ml-2">→</span>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
}

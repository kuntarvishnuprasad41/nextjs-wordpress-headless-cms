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
      <section className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              The Young, Inexperienced Engineers Aiding Elon Musk's Government
              Takeover
            </h1>
            <p className="text-gray-400 text-lg">
              Engineers between 19 and 24, most linked to Musk's companies, are
              playing a key role as he seizes control of federal infrastructure.
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
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {[
              {
                title: "The growing complexity of global cybersecurity",
                image: "/placeholder.svg",
                description:
                  "Engineers between 19 and 24, most linked to Musk's companies, are playing a key role as he seizes control of federal infrastructure.",
              },
              {
                title: "The growing complexity of global cybersecurity",
                image: "/placeholder.svg",
                description:
                  "Engineers between 19 and 24, most linked to Musk's companies, are playing a key role as he seizes control of federal infrastructure.",
              },
              {
                title: "Moving from challenges to action",
                image: "/placeholder.svg",
                description:
                  "Engineers between 19 and 24, most linked to Musk's companies, are playing a key role as he seizes control of federal infrastructure.",
              },
              {
                title: "The growing complexity of global cybersecurity",
                image: "/placeholder.svg",
                description:
                  "Engineers between 19 and 24, most linked to Musk's companies, are playing a key role as he seizes control of federal infrastructure.",
              },
            ].map((article, i) => (
              <CarouselItem
                key={i}
                className={`pl-2 md:pl-4 ${
                  i === 0
                    ? "md:basis-1/2 lg:basis-2/5 h-30"
                    : "md:basis-1/4 lg:basis-1/5 h-30"
                }`}
              >
                <Card className="bg-gray-800 flex flex-col justify-between h-full border-gray-700 ">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                    <p className="text-gray-400 text-sm">
                      {article.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="ghost"
                      className="text-gray-400 hover:text-white px-0"
                    >
                      Read more <span className="ml-2">→</span>
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
}

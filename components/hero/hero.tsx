import Image from "next/image";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function Hero() {
  return (
    <div className="min-h-screen  p-2   bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              The Young, Inexperienced Engineers Aiding Elon Musk's Government
              Takeover
            </h1>
            <p className="text-gray-400 text-lg">
              Engineers between 19 and 24, most linked to Musk's companies, are
              playing a key role as he seizes control of federal infrastructure.
            </p>
            <Button variant="secondary" className="mt-4">
              Read more
            </Button>
          </div>
          <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/images/flags.png"
              alt="International flags on display"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Search and Navigation */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-[300px]">
              <Input
                placeholder="How can I help you?"
                className="pl-10 bg-gray-800 border-gray-700 rounded-full text-sm"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Tabs defaultValue="recent" className="w-full sm:w-auto">
              <TabsList className="bg-transparent space-x-2">
                <TabsTrigger
                  value="recent"
                  className="data-[state=active]:bg-white data-[state=active]:text-black rounded-full px-4 py-2 text-sm"
                >
                  Recent stories
                </TabsTrigger>
                <TabsTrigger
                  value="top"
                  className="data-[state=active]:bg-white data-[state=active]:text-black rounded-full px-4 py-2 text-sm"
                >
                  Top stories
                </TabsTrigger>
                <TabsTrigger
                  value="featured"
                  className="data-[state=active]:bg-white data-[state=active]:text-black rounded-full px-4 py-2 text-sm"
                >
                  Featured stories
                </TabsTrigger>
                <TabsTrigger
                  value="proco"
                  className="data-[state=active]:bg-white data-[state=active]:text-black rounded-full px-4 py-2 text-sm"
                >
                  ProCo stories
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

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
                    ? "md:basis-1/2 lg:basis-2/5"
                    : "md:basis-1/3 lg:basis-1/5"
                }`}
              >
                <Card className="bg-gray-800 border-gray-700">
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
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
          </div>
        </Carousel>
      </section>
    </div>
  );
}

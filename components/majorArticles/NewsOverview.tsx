import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function NewsOverview() {
  return (
    <div className="  p-0    overflow-hidden">
      <section className="md:container mx-auto px:0 py-8 max-w-10xl px-0 w-full ">
        <div className="flex flex-col mx-auto md:-ml-3   md:flex-row px-5  md:px-0  gap-14 sm:gap-2 w-full  ">
          <div className=" overflow-hidden rounded-lg">
            <Image
              src="/images/plane.png"
              alt="Stylized illustration of an airplane over Paris"
              width={1920}
              height={872}
              className=""
              priority
            />
          </div>
          <div className="flex flex-col justify-between w-full">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold leading-tight justify-normal">
                The Young, Inexperienced Engineers Aiding Elon Musk&apos;s
                Government Takeover
              </h1>
              <p className="text-[16px] text-black">VITTORIO ELLIOT</p>
            </div>
            <p className="text-lg text-muted-foreground">
              Engineers between 19 and 24, most linked to Musk&apos;s companies,
              are playing a key role as he seizes control of federal
              infrastructure. Engineers between 19 and 24, most linked to
              Musk&apos;s companies.
            </p>
          </div>
        </div>
        <br />

        {/* Related Articles */}
        <div className=" flex  flex-col md:flex-row gap-2 items-stretch  w-full max-w-10xl md:gap-0 md:-ml-9 sm:ml-0">
          {[
            {
              title:
                "The Young, Inexperienced Engineers Aiding Elon Musk's Government",
              image: "/images/plane.png",
              author: "VITTORIO ELLIOT",
            },
            {
              title: "Control of federal infrastructure.",
              image: "/images/plane.png",
              author: "VITTORIO ELLIOT",
            },
            {
              title:
                "Engineers between 19 and 24, most linked to Musk's companies",
              image: "/images/plane.png",
              author: "VITTORIO ELLIOT",
            },
            {
              title:
                "Engineers between 19 and 24, most linked to Musk's companies",
              image: "/images/plane.png",
              author: "VITTORIO ELLIOT",
            },
          ].map((article, index, arr) => (
            <div
              key={index}
              className={`w-full flex items-stretch pr-4 mt-2 border-gray-300
        ${
          index !== arr.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
        }`}
            >
              <Card
                className={` overflow-hidden container   shadow-none flex flex-row-reverse justify-between  w-[335px] text-start h-[90px] border-none rounded-none border-r border-gray-300 last:border-r-0 px-0 pl-0 pr-0 p-0`}
              >
                <CardHeader className="p-0">
                  <div className="w-[120px] h-[120px]">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-col justify-between gap-0     flex">
                  <div className="flex-1 p-0">
                    <CardTitle className="text-[16px] line-clamp-3 w-full max-w-[250px]">
                      {article.title}
                    </CardTitle>
                  </div>
                  {/* <div>
                    <p className="text-[12px] text-muted-foreground">
                      {article.author}
                    </p>
                  </div> */}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NewsOverview;

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function NewsOverview() {
  return (
    <div className="min-h-screen  p-0    overflow-hidden">
      <section className="container mx-auto px-8 py-8 max-w-10xl">
        <div className="flex flex-row gap-14 sm:gap-2">
          <div className=" overflow-hidden rounded-lg">
            <Image
              src="/images/plane.png"
              alt="Stylized illustration of an airplane over Paris"
              width={1920}
              height={872}
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                The Young, Inexperienced Engineers Aiding Elon Musk's Government
                Takeover
              </h1>
              <p className="text-lg text-black">VITTORIO ELLIOT</p>
            </div>
            <p className="text-lg text-muted-foreground">
              Engineers between 19 and 24, most linked to Musk's companies, are
              playing a key role as he seizes control of federal infrastructure.
              Engineers between 19 and 24, most linked to Musk's companies.
            </p>
          </div>
        </div>
        <br />

        {/* Related Articles */}
        <div className="flex w-full max-w-10xl gap-0 -ml-5 sm:ml-0">
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
              className={`w-full h-[100px] flex items-stretch pr-1
    ${index !== arr.length - 1 ? "border-r border-gray-300" : ""}`}
            >
              <Card
                className={`overflow-hidden w-full   shadow-none flex flex-row-reverse justify-start text-start h-[100px] border-none rounded-none border-r border-gray-300 last:border-r-0`}
              >
                <CardHeader className="p-0">
                  <div className=" ">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      height={200}
                      width={200}
                      className="rounded-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-col justify-between gap-0     flex">
                  <div className="flex-1 p-0">
                    <CardTitle className="text-sm line-clamp-3 w-full max-w-[250px]">
                      {article.title}
                    </CardTitle>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {article.author}
                    </p>
                  </div>
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

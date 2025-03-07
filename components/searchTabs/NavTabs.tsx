"use client";
import React, { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

function NavTabs() {
  const [activeTab, setActiveTab] = useState("recent");
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeIndex = ["recent", "top", "featured", "proco"].indexOf(
      activeTab
    );
    const activeTabElement = tabsRef.current[activeIndex];
    const container = tabsContainerRef.current;

    if (activeTabElement && container) {
      const containerWidth = container.offsetWidth;
      const tabWidth = activeTabElement.offsetWidth;
      const tabOffsetLeft = activeTabElement.offsetLeft;

      const scrollLeft = tabOffsetLeft - containerWidth / 2 + tabWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <div className="max-w-10xl sm:md:max-w-sm w-full border-gray-800 overflow-hidden">
      <div className="container mx-auto md:px-5 pr-0 px-5 py-4">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
          <div className="px-[24px] w-full pl-1">
            <div className="flex items-center w-full max-w-[800px] p-2 sm:p-0 bg-white bg-opacity-[10%] rounded-full shadow-md outline-none ">
              <Input
                type="text"
                placeholder="How can I help you?"
                className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-transparent"
              />
              <Button
                size="icon"
                variant="ghost"
                className="text-black rounded-full bg-white"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div
            ref={tabsContainerRef}
            className="w-full overflow-x-auto scrollbar-hide whitespace-nowrap"
          >
            <Tabs
              defaultValue="recent"
              onValueChange={setActiveTab}
              className="flex justify-start"
            >
              <TabsList className="bg-[#FFFFFF] bg-opacity-[10%] rounded-full inline-flex h-14 min-w-max whitespace-nowrap">
                {["recent", "top", "featured", "proco"].map((tab, index) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    ref={(el) => {
                      tabsRef.current[index] = el;
                    }}
                    className="z-10 px-3 py-2 text-sm transition-all font-semibold rounded-full text-white data-[state=active]:text-black hover:bg-gray-500 my-1 mx-[3px] hover:bg-opacity-50"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} stories
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavTabs;

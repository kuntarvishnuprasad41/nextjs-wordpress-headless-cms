"use client";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

function NavTabs() {
  const [activeTab, setActiveTab] = useState("recent");
  const [tabWidth, setTabWidth] = useState(0);
  const [tabOffset, setTabOffset] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = ["recent", "top", "featured", "proco"].indexOf(
      activeTab
    );
    if (tabsRef.current[activeIndex]) {
      setTabWidth(tabsRef.current[activeIndex]?.offsetWidth || 0);
      setTabOffset(tabsRef.current[activeIndex]?.offsetLeft || 0);
    }
  }, [activeTab]);
  return (
    <div className="max-w-10xl  border-gray-800">
      <div className="container mx-auto px-5 py-4">
        <div className="flex   sm:flex-row gap-1 items-center justify-between">
          <div className="flex items-center w-full max-w-[800px] p-2 bg-white bg-opacity-[10%] rounded-full shadow-md outline-none">
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
          <Tabs
            defaultValue="recent"
            onValueChange={setActiveTab}
            className="w-full sm:w-auto flex justify-center"
          >
            <TabsList className="relative   bg-[#FFFFFF] bg-opacity-[10%]   rounded-full   inline-flex h-14">
              <motion.div
                className="absolute top-0 h-full bg-white rounded-full"
                animate={{ width: tabWidth, left: tabOffset }}
                transition={{
                  type: "inertia",
                  stiffness: 200,
                  damping: 20,
                }}
              />

              {["recent", "top", "featured", "proco"].map((tab, index) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  ref={(el) => {
                    tabsRef.current[index] = el;
                  }}
                  className="relative z-10 px-4 py-3 text-sm transition-all font-semibold rounded-full text-white data-[state=active]:text-black  hover:bg-gray-500 my-1 mx-[3px] hover:bg-opacity-50"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} stories
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default NavTabs;

"use client";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { motion } from "framer-motion";

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
    <div className="  border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex   sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-[300px]">
            <Input
              placeholder="How can I help you?"
              className="pl-10 bg-gray-800 border-gray-700 rounded-full text-sm"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Tabs
            defaultValue="recent"
            onValueChange={setActiveTab}
            className="w-full sm:w-auto flex justify-center"
          >
            <TabsList className="relative   bg-[#FFFFFF] bg-opacity-[10%]   rounded-full   inline-flex">
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
                  ref={(el) => (tabsRef.current[index] = el)}
                  className="relative z-10 px-4 py-2 text-sm transition-all font-semibold rounded-full text-white data-[state=active]:text-black"
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

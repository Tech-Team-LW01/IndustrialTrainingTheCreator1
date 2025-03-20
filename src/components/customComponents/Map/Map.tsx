"use client"

import React from "react";
import { Button } from "@/components/ui/button";

import { Youtube,Instagram ,Linkedin ,Globe ,Cpu ,KeyRound  } from 'lucide-react';


import MapScroll from "./MapScroll";
import { Inter,Khand,Poppins } from 'next/font/google'
const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
})
const khandFont = Khand({
  subsets: ['latin'],
  weight: ['700']
})
const Map = () => {
  return (
    <section className=" max-w-6xl pt-8 mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-0">
<div className="bg-black h-full pb-0 lg:p-10 space-y-6">
            {/* Decorative background elements */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
              <div className="absolute right-0 h-full w-[100px] bg-gradient-to-r from-transparent to-red-700/30" />
            </div>

            <div className="relative p-8 md:p-0 z-10 pt-8 text-white space-y-5">
  {/* Main Content Stack */}
  <div className="space-y-2">
    <h1 className={`text-3xl lg:text-4xl xl:text-4xl  text-center md:text-left md:block text-[#ff0000] tracking-tight ${khandFont.className}`}>
      Engineering Students from across India participate
    </h1>
    <p className={`text-lg lg:text-2xl text-red-100 text-center md:text-left md:block ${poppins.className}`}>
      The One & Only Integration Level Research Based Summer Internship Program
    </p>
  </div>

  {/* Apply Now Button - Centered on Mobile */}


  <div className="hidden md:block">
    <MapScroll />
  </div>
  <div className="flex pt-4 hidden justify-center md:block">
    <a href="/application-form">
    <Button
                size="lg"
                className={`transform bg-[#ff0000] hover:bg-red-800 transition-all duration-300 hover:scale-105 px-8 py-3  shadow-lg hover:shadow-xl`}
               
              >
               Apply Now
              </Button>
              </a>
  </div>

  
</div>
</div>


<div className="w-full h-full">
  <img src="/assets/map/map.png" className="w-full h-[400px] lg:h-[550px]"/>
  <div className=" md:hidden md:mt-4 pt-4">
             <MapScroll/>
             </div>
</div>


<div className="flex lg:hidden mt-8 justify-center md:hidden">
    <a href="/application-form">
    <Button
                size="lg"
                className={`transform bg-[#ff0000] hover:bg-red-800 transition-all duration-300 hover:scale-105 px-8 py-3 rounded-lg shadow-lg hover:shadow-xl`}
               
              >
               Apply Now
              </Button>
              </a>
  </div>

      </div>
     
    
    </section>
  );
};

export default Map;
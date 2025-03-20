import React from "react";
import { Button } from "@/components/ui/button";
// import { IndiaMap } from "@/components/ui/India-map";
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion';
// import { MdOnlinePrediction } from "react-icons/md"
import { BsCalendarCheck } from "react-icons/bs"
import { AiOutlineHourglass } from "react-icons/ai"
// import { HiShieldCheck } from "react-icons/hi2"
import { Album ,ShieldCheck} from "lucide-react";
import Link from "next/link";
import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
});

import localFont from "next/font/local";
const khandFont = localFont({
    src: '../../../app/fonts/Khand-SemiBold.woff',
    weight: '100 900',
});
const Hero2 = () => {    
    return (
        <div className=" h-full mx-auto w-full">
     <div className="relative max-w-full h-full mx-auto">
  {/* Button Container - fixed position using percentages */}
  {/* <div className="absolute left-[4%] top-[72%] z-10">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
     
     <Link
  href="/application-form"
  className="bg-[#ff0000] hidden md:block p-1 text-sm md:p-2 md:text-lg rounded-sm pr-4 text-white hover:bg-red-800 font-semibold relative z-10 shadow-lg"
>
  Applications Open
</Link>

    </motion.div>
  </div> */}
  
  {/* Image */}
  {/* This is just a image, for Desktip  */}
  <img className="w-full h-full mx-auto hidden md:block lg:block" src="/assets/Hero/hero-section.jpg" alt="Hero" />

  {/* Hero section for mobile */}

  <div className=" grid grid-row-2 md:hidden lg:hidden sm:block">

    {/* Image  */}
    <div  className="mb-2">
      <img src="/assets/MobileHero.png  " ></img>

    </div>


  {/* <div className="h-full flex mt-2 items-center justify-center bg-black text-white px-4 ">
      <div className="max-w-4xl mx-auto text-center ">
        <h1 className="text-4xl text-[#ff0000] md:text-6xl font-extrabold leading-tight tracking-tighter ">
          Summer Internship 2025
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold ">Industrial Training Program</h2>
        <h3 className="text-xl md:text-3xl font-medium ">For Engineering Students</h3>
        <p className="text-lg  md:text-xl text-gray-300 mb-[12px]">(Open for B.Tech | M.Tech | BCA | MCA | B.Sc IT)</p>
<div>
 
         
     <Link
  href="/application-form"
  className="bg-[#ff0000]  p-1 text-sm md:p-2 md:text-lg rounded-sm pr-4 text-white hover:bg-red-800 font-semibold relative z-10 shadow-lg"
>
  Applications Open
</Link>
        </div>
      </div>
    </div> */}



    
  </div>

</div>

           
            {/* <div className="relative mt-4 md:-mt-12 lg:-mt-4 z-30">
              <div className="md:hidden p-4 w-full">
                <h1 className="text-3xl text-center text-bold text-[#ff0000]">Details of Summer Program</h1>
              </div>
  <div className="md:bg-black rounded-lg p-3 sm:p-5 md:p-6 shadow-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-6xl md:border md:border-white mx-auto">
    <div className="flex flex-col lg:flex-row justify-between items-start gap-3 sm:gap-5 md:gap-6">
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 w-full">
        

        <div className="flex items-start gap-2 justify-start min-w-[150px] sm:min-w-[220px] md:min-w-[250px]">
          <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-red-50 rounded-lg">
            <BsCalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#ff0000]" />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            <span className={`text-[#ff0000] text-[11px] sm:text-xs md:text-sm font-medium uppercase tracking-wide ${khandFont.className}`}>
              TENTATIVE START DATES
            </span>
            <span className={`font-bold text-[7px] sm:text-xs md:text-sm text-white mt-1  ${poppins.className}`}>
              May 2025 / June 2025 <br className="md:hidden"></br> / July 2025
            </span>
            <Badge variant="outline" className="text-[#ff0000] border-red-200 text-[7px] sm:text-[9px] md:text-[10px] mt-2 w-fit">
              Limited seats
            </Badge>
          </div>
        </div>

      
        <div className="flex items-start gap-2 justify-start min-w-[150px] sm:min-w-[220px] md:min-w-[250px]">
          <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-red-50 rounded-lg">
            <AiOutlineHourglass className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#ff0000]" />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            <span className={`text-[#ff0000] text-[11px] sm:text-xs md:text-sm font-medium uppercase tracking-wide ${khandFont.className}`}>
              DURATION SUMMER PROGRAM
            </span>
            <span className={`font-bold text-[7px] sm:text-xs md:text-sm text-white mt-1 ${poppins.className}`}>
              6 weeks / 8 weeks
            </span>
          </div>
        </div>

      
        <div className="flex items-start gap-2 justify-start min-w-[150px] sm:min-w-[220px] md:min-w-[250px]">
          <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-red-50 rounded-lg">
            <Album className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#ff0000]" />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            <span className={`text-[#ff0000] text-[11px] sm:text-xs md:text-sm font-medium uppercase tracking-wide ${khandFont.className}`}>
              Internship
            </span>
            <span className={`font-bold text-[7px] sm:text-xs md:text-sm text-white mt-1 ${poppins.className}`}>
              Industry Recognised Internship (Project) Certificate
            </span>
          </div>
        </div>

        
        <div className="flex items-start gap-2 justify-start min-w-[150px] sm:min-w-[220px] md:min-w-[250px]">
          <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-red-50 rounded-lg">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#ff0000]" />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            <span className={`text-[#ff0000] text-[11px] sm:text-xs md:text-sm font-medium uppercase tracking-wide ${khandFont.className}`}>
              Training Certificate
            </span>
            <span className={`font-bold text-[7px] sm:text-xs md:text-sm text-white mt-1 ${poppins.className}`}>
              Training Certificate from <br></br> LinuxWorld Informatics Pvt Ltd
            </span>
          </div>
        </div>
      </div>

   
      <div className="flex items-center justify-center lg:border-l lg:pl-6 w-full lg:w-auto mt-2 sm:mt-4 md:mt-6 lg:mt-0">
        <div className="flex  flex-col items-center justify-center w-full lg:w-auto">
          <Link href="/application-form" rel="noopener noreferrer" className="w-full flex justify-center">
            <Button
              className={`bg-[#ff0000] font-semibold text-xs sm:text-sm py-3 px-5 sm:py-4 sm:px-6 md:py-6 md:px-8 hover:bg-[#ff0000]/90 hover:shadow-lg transition-all duration-300  font-semibold `}
              size="lg"
              >
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div> */}



        </div>
    );
};

export default Hero2;
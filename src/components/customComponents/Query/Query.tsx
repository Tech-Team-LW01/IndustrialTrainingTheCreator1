// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Facebook, Linkedin, Loader2 } from "lucide-react";
// import toast, { Toaster } from 'react-hot-toast';
// import { Inter, Poppins } from 'next/font/google';

// const poppins = Poppins({
//    subsets: ['latin'],
//    weight: ['400']
// });

// import localFont from "next/font/local";
// const khandFont = localFont({
//     src: '../../../app/fonts/Khand-SemiBold.woff',
//     weight: '100 900',
// });

// interface FormData {
//   fullName: string;
//   email: string;
//   phone: string;
//   query: string;
//   college: string;
// }

// const initialFormData: FormData = {
//   fullName: "",
//   email: "",
//   phone: "",
//   query: "",
//   college: ""
// };

// export default function Query() {
//   const [isSwapped, setIsSwapped] = useState(false);
//   const [isSignInForm, setIsSignInForm] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState<FormData>(initialFormData);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.fullName.trim()) {
//       toast.error("Please enter your full name");
//       return false;
//     }
//     if (!formData.college.trim()) {
//       toast.error("Please enter your college name");
//       return false;
//     }
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
//       toast.error("Please enter a valid email address");
//       return false;
//     }
//     if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
//       toast.error("Please enter a valid 10-digit phone number");
//       return false;
//     }
//     if (!formData.query.trim()) {
//       toast.error("Please enter your query");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;
    
//     setLoading(true);
    
//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         toast.success("Query submitted successfully!");
//         setFormData(initialFormData);
//       } else {
//         toast.error(data.message || "Something went wrong!");
//       }
//     } catch (error) {
//       toast.error("Failed to submit query");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSwap = () => {
//     setIsSwapped(!isSwapped);
//     setIsSignInForm(!isSignInForm);
//   };

//   // Form component to avoid duplication
//   const FormContent = () => (
//     <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
//       <Input 
//         type="text" 
//         name="fullName"
//         placeholder="Full Name" 
//         value={formData.fullName}
//         onChange={handleChange}
//         className="bg-gray-50" 
//         disabled={loading}
//       />
//       <Input 
//         type="email" 
//         name="email"
//         placeholder="Email" 
//         value={formData.email}
//         onChange={handleChange}
//         className="bg-gray-50"
//         disabled={loading}
//       />
//       <Input 
//         type="tel" 
//         name="phone"
//         placeholder="Phone" 
//         value={formData.phone}
//         onChange={handleChange}
//         className="bg-gray-50"
//         disabled={loading}
//         maxLength={10}
//       />
//       <Input 
//         type="text" 
//         name="college"
//         placeholder="College Name" 
//         value={formData.college}
//         onChange={handleChange}
//         className="bg-gray-50"
//         disabled={loading}
//       />
//       <Input 
//         type="text" 
//         name="query"
//         placeholder="Query" 
//         value={formData.query}
//         onChange={handleChange}
//         className="bg-gray-50 min-h-[100px]"
//         disabled={loading}
//       />
//       <Button
//         type="submit"
//         className="w-full bg-[#ff0000] hover:bg-[#6f6f6f] text-white"
//         disabled={loading}
//       >
//         {loading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Submitting...
//           </>
//         ) : (
//           'Submit'
//         )}
//       </Button>
//     </form>
//   );

//   return (
//     <div className="min-h-screen w-full bg-black p-4 sm:p-6 flex flex-col items-center justify-center" id="query">
//       <h1 className={`text-3xl md:text-4xl font-bold text-[#ff0000] mb-2 text-center ${khandFont.className}`}>
//         Lets Talk
//       </h1>

//       <h1 className={`text-lg md:text-3xl text-white mb-4 sm:mb-8 text-center px-4 ${poppins.className}`}>
//         Our Summer Executive will connect in next 24 hours
//       </h1>

//       <Toaster position="top-center" reverseOrder={false} />

//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="relative w-full h-full">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={isSignInForm ? "form" : "welcome"}
//               initial={{ opacity: 0, x: isSignInForm ? -100 : 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: isSignInForm ? 100 : -100 }}
//               transition={{ duration: 0.3 }}
//               className="w-full"
//             >
//               <div className="flex flex-col lg:flex-row">
//                 {/* Form Section */}
//                 <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-16">
//                   <FormContent />
//                 </div>

//                 {/* Welcome Panel */}
//                 <div 
//                   className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat min-h-[400px]"
//                   style={{
//                     backgroundImage: "url('/assets/Projects/form.jpg')"
//                   }}
//                 >
//                   <div className="text-center">
//                     <h2 className={`text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white ${khandFont.className}`}>
//                       Hello, Friend!
//                     </h2>
//                     <p className={`mb-6 sm:mb-8 text-base sm:text-lg text-white ${poppins.className}`}>
//                       {isSignInForm 
//                         ? "I am looking for Offline Summer Industrial Training where I can meet Engineering students from across India & work together as a team 😊" 
//                         : "I know I will miss all the Offline Benefits of Summer Program & attend JAZBAA but still want to attend Online Training 😔"}
//                     </p>
//                     <Button
//                       variant="outline"
//                       className="border-2 border-white bg-[#ff0000] text-white hover:bg-white/10 text-sm sm:text-base"
//                       onClick={handleSwap}
//                     >
//                       {isSignInForm 
//                         ? "No, I am looking for Online Summer Program" 
//                         : "No, I think I should attend Offline Summer Program"}
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }


















"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400']
});

import localFont from "next/font/local";
const khandFont = localFont({
    src: '../../../app/fonts/Khand-SemiBold.woff',
    weight: '100 900',
});

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  query: string;
  college: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  query: "",
  college: ""
};

export default function Query() {
  const [isSwapped, setIsSwapped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!formData.college.trim()) {
      toast.error("Please enter your college name");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.query.trim()) {
      toast.error("Please enter your query");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Query submitted successfully!");
        setFormData(initialFormData);
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to submit query");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  // Form component to avoid duplication
  const FormContent = () => (
    <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
      <Input 
        type="text" 
        name="fullName"
        placeholder="Full Name" 
        value={formData.fullName}
        onChange={handleChange}
        className="bg-gray-50" 
        disabled={loading}
      />
      <Input 
        type="email" 
        name="email"
        placeholder="Email" 
        value={formData.email}
        onChange={handleChange}
        className="bg-gray-50"
        disabled={loading}
      />
      <Input 
        type="tel" 
        name="phone"
        placeholder="Phone" 
        value={formData.phone}
        onChange={handleChange}
        className="bg-gray-50"
        disabled={loading}
        maxLength={10}
      />
      <Input 
        type="text" 
        name="college"
        placeholder="College Name" 
        value={formData.college}
        onChange={handleChange}
        className="bg-gray-50"
        disabled={loading}
      />
      <Input 
        type="text" 
        name="query"
        placeholder="Query" 
        value={formData.query}
        onChange={handleChange}
        className="bg-gray-50 min-h-[100px]"
        disabled={loading}
      />
      <Button
        type="submit"
        className="w-full bg-[#ff0000] hover:bg-[#6f6f6f] text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen w-full bg-black p-4 sm:p-6 flex flex-col items-center justify-center" id="query">
      <h1 className={`text-3xl md:text-4xl font-bold text-[#ff0000] mb-2 text-center ${khandFont.className}`}>
        Lets Talk
      </h1>

      <h1 className={`text-lg md:text-3xl text-white mb-4 sm:mb-8 text-center px-4 ${poppins.className}`}>
        Our Summer Executive will connect in next 24 hours
      </h1>

      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: isSwapped ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSwapped ? 100 : -100 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Form Section */}
                <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-16">
                  <FormContent />
                </div>

                {/* Welcome Panel */}
                <div 
                  className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat min-h-[400px]"
                  style={{
                    backgroundImage: "url('/assets/Projects/form.jpg')"
                  }}
                >
                  <div className="text-center">
                    <h2 className={`text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white ${khandFont.className}`}>
                      Hello, Friend!
                    </h2>
                    <p className={`mb-6 sm:mb-8 text-base sm:text-lg text-white ${poppins.className}`}>
                      {isSwapped 
                        ? "I know I will miss all the Offline Benefits of Summer Program & attend JAZBAA but still want to attend Online Training 😔"
                        : "I am looking for Offline Summer Industrial Training where I can meet Engineering students from across India & work together as a team 😊"}
                    </p>
                    <Button
                      variant="outline"
                      className="border-2 border-white bg-[#ff0000] text-white hover:bg-white/10 text-sm sm:text-base"
                      onClick={handleSwap}
                    >
                      {isSwapped 
                        ? "No, I think I should attend Offline Summer Program"
                        : "No, I am looking for Online Summer Program"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
















"use client";

import React, { 
  useState, 
  useCallback, 
  useRef, 
  FormEvent, 
  ChangeEvent 
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { Poppins } from 'next/font/google';

// Font configurations
const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400', '600']
});

import localFont from "next/font/local";
const khandFont = localFont({
    src: '../../../app/fonts/Khand-SemiBold.woff',
    weight: '100 900',
});

// Form data interface
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  query: string;
  college: string;
}

// Initial form state
const INITIAL_FORM_STATE: FormData = {
  fullName: "",
  email: "",
  phone: "",
  query: "",
  college: ""
};

export default function QueryForm() {
  // State management
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [formVariant, setFormVariant] = useState<'offline' | 'online'>('offline');

  // Refs for input fields
  const inputRefs = {
    fullName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    college: useRef<HTMLInputElement>(null),
    query: useRef<HTMLInputElement>(null)
  };

  // Input change handler with improved type safety
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone number (only digits)
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Form validation with detailed error handling
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      errors.fullName = "Full Name is required";
      inputRefs.fullName.current?.focus();
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      inputRefs.email.current?.focus();
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
      inputRefs.email.current?.focus();
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      inputRefs.phone.current?.focus();
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
      inputRefs.phone.current?.focus();
    }

    // College validation
    if (!formData.college.trim()) {
      errors.college = "College name is required";
      inputRefs.college.current?.focus();
    }

    // Query validation
    if (!formData.query.trim()) {
      errors.query = "Query is required";
      inputRefs.query.current?.focus();
    }

    // Display errors
    Object.values(errors).forEach(error => toast.error(error));

    return Object.keys(errors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) return;

    // Set loading state
    setLoading(true);

    try {
      // API call to submit form
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: formVariant
        }),
      });
      
      const result = await response.json();
      
      // Handle response
      if (response.ok) {
        toast.success("Query submitted successfully!");
        // Reset form
        setFormData(INITIAL_FORM_STATE);
      } else {
        toast.error(result.message || "Submission failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle form variant
  const toggleFormVariant = () => {
    setFormVariant(prev => prev === 'offline' ? 'online' : 'offline');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={formVariant}
            initial={{ opacity: 0, x: formVariant === 'offline' ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: formVariant === 'offline' ? 100 : -100 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row"
          >
            {/* Form Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  ref={inputRefs.fullName}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full"
                />
                <Input
                  ref={inputRefs.email}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full"
                />
                <Input
                  ref={inputRefs.phone}
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                  maxLength={10}
                  className="w-full"
                />
                <Input
                  ref={inputRefs.college}
                  type="text"
                  name="college"
                  placeholder="College Name"
                  value={formData.college}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full"
                />
                <Input
                  ref={inputRefs.query}
                  type="text"
                  name="query"
                  placeholder="Your Query"
                  value={formData.query}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full min-h-[100px]"
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Query'
                  )}
                </Button>
              </form>
            </div>

            {/* Variant Toggle Section */}
            <div 
              className="w-full lg:w-1/2 bg-cover bg-center flex items-center justify-center p-8"
              style={{
                backgroundImage: `url('/assets/Projects/form.jpg')`,
                backgroundBlendMode: 'overlay',
                backgroundColor: 'rgba(0,0,0,0.6)'
              }}
            >
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  {formVariant === 'offline' 
                    ? 'Offline Summer Industrial Training Program' 
                    : 'Online Summer Industrial Training Program'}
                </h2>
                <p className="mb-6">
                  {formVariant === 'offline'
                    ? "Join our offline summer program and collaborate with engineering students across India!"
                    : "Can't attend offline? Our online program keeps you connected!"}
                </p>
                <Button 
                  onClick={toggleFormVariant}
                  variant="outline"
                  className="border-white text-black hover:bg-white/20"
                >
                  Switch to {formVariant === 'offline' ? 'Online' : 'Offline'} Program
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
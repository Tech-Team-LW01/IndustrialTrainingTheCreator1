import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  query: string;
}

const Hero2 = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    query: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      setSubmitStatus("success");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        query: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="h-full mx-auto w-full">
      <div className="hidden md:flex lg:flex w-full">
        <div className="w-2/3">
          <img className="w-full h-full object-cover" src="/assets/Hero/hero-section.jpg" alt="Hero" />
        </div>

        <div className="w-1/3 flex items-center justify-center pr-8">
          <div className="bg-black border-2 border-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl mb-4 text-center text-white">Contact Us</h2>

            {submitStatus === "success" && (
              <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                Thank you! Your query has been submitted.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
                Error submitting form. Please try again.
              </div>
            )}

            <div className="space-y-3">
              <div>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
                  aria-label="Full Name"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
                  aria-label="Email Address"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                  maxLength={10}
                  className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
                  aria-label="Phone Number"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <Input
                type="text"
                name="college"
                placeholder="College Name"
                value={formData.college}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
                aria-label="College Name"
              />

              <Input
                type="text"
                name="query"
                placeholder="Your Query"
                value={formData.query}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white min-h-[80px]"
                aria-label="Your Query"
              />

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 text-white hover:cursor-pointer border border-white"
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
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-row-2 md:hidden lg:hidden sm:block">
        <div className="mb-2">
          <img src="/assets/Hero/hero-section.jpg" alt="Hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero2;

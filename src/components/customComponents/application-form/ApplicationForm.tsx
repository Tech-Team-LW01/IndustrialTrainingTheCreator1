"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import toast, { Toaster } from 'react-hot-toast'
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const currentYear = 2000;
const maxYear = 2030;

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  whatsappNo: z.string()
    .min(10, { message: "WhatsApp number must be 10 digits." })
    .max(10, { message: "WhatsApp number must be 10 digits." })
    .regex(/^[0-9]+$/, "Must contain only numbers"),
  emailAddress: z.string().email({
    message: "Please enter a valid email address.",
  }),
  collegeName: z.string().min(2, {
    message: "College name must be at least 2 characters.",
  }),
  branch: z.string().min(2, {
    message: "Branch must be at least 2 characters.",
  }),
  currentSemester: z.string().refine((val) => {
    const year = parseInt(val);
    return !isNaN(year) && year >= currentYear && year <= maxYear;
  }, {
    message: `Year must be between ${currentYear} and ${maxYear}`,
  }),
  applyingFor: z.string().min(1, {
    message: "Please select what you're applying for.",
  }),
  otherSpecification: z.string().optional(),
  tentativeDates: z.string().min(1, {
    message: "Please select tentative dates.",
  }),
  referenceName: z.string().optional(),
  source: z.string().min(1, {
    message: "Please select how you found us.",
  }),
  query: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtherSpecification, setShowOtherSpecification] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      whatsappNo: "",
      emailAddress: "",
      collegeName: "",
      branch: "",
      currentSemester: "",
      applyingFor: "",
      otherSpecification: "",
      tentativeDates: "",
      referenceName: "",
      source: "",
      query: "",
    },
  })

  async function onSubmit(values: FormValues) {
    const submissionPromise = new Promise(async (resolve, reject) => {
      try {
        setIsSubmitting(true);
        const response = await fetch('/api/submit-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Submission failed');
        }

        // Reset form on success
        form.reset();
        setShowOtherSpecification(false);
        resolve('Application submitted successfully!');
        toast.success("Query submitted successfully!");
      } catch (error) {
        console.error('Submission error:', error);
        reject(error instanceof Error ? error.message : 'Failed to submit application');
      } finally {
        setIsSubmitting(false);
      }
    });

    toast.promise(
      submissionPromise,
      {
        loading: 'Submitting application...',
        // success: (message) => message,
        error: (error) => error.toString(),
      },
      {
        position: 'top-center',
        duration: 4000,
      }
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-red-600">Summer Industrial Training Application Form</h1>
        <p className="text-sm text-red-600">
          BECOME A PART OF ONE & ONLY RESEARCH BASED THE SUMMER INDUSTRIAL TRAINING PROGRAM OF INDIA
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* WhatsApp Number */}
          <FormField
            control={form.control}
            name="whatsappNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp No *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your WhatsApp number" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Address */}
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="Enter your email address" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* College Name */}
          <FormField
            control={form.control}
            name="collegeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your college name" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch/Degree */}
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Degree *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your degree (e.g., B.Tech, MCA)" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Year of Passing */}
          <FormField
            control={form.control}
            name="currentSemester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Passing Out *</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    placeholder={`Enter your passing year..`}
                    {...field}
                    min={currentYear}
                    max={maxYear}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Applying For */}
          <FormField
            control={form.control}
            name="applyingFor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applying For *</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setShowOtherSpecification(value === "others");
                    if (value !== "others") {
                      form.setValue("otherSpecification", "");
                    }
                  }}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cloud">AWS CLOUD COMPUTING</SelectItem>
                    <SelectItem value="fullstack">PYTHON PROGRAMMING</SelectItem>
                    <SelectItem value="ml"> PYTHON FULL STACK WEB DEVELOPMENT</SelectItem>
                    <SelectItem value="genai">MACHINE LEARNING - AI</SelectItem>
                    <SelectItem value="clouddevops"> MERN STACK DEVELOPMENT</SelectItem>
                    <SelectItem value="mldevops"> GENERATIVE AI + MACHINE LEARNING</SelectItem>
                    <SelectItem value="fullStackMachineLearning">FULL STACK + MACHINE LEARNING</SelectItem>
                    <SelectItem value="CloudComputingAndFullStack"> CLOUD COMPUTING + FULL STACK WEB DEVELOPMENT</SelectItem>
                    <SelectItem value="others"> OTHERS</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Other Specification */}
          {showOtherSpecification && (
            <FormField
              control={form.control}
              name="otherSpecification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please Specify *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your program specification"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Tentative Dates */}
          <FormField
            control={form.control}
            name="tentativeDates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tentative Training Dates *</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dates" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="may2025">May 2025</SelectItem>
                    <SelectItem value="june2025">June 2025</SelectItem>
                    <SelectItem value="july2025">July 2025</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reference Name */}
          <FormField
            control={form.control}
            name="referenceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter reference name (optional)" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Source */}
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From where did you get to know about us? *</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Query */}
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Any query</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your query here (optional)"
                    className="resize-none"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className={cn(
              "w-full bg-red-600 hover:bg-red-700 text-white",
              isSubmitting && "opacity-50 cursor-not-allowed"
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </Form>

      {/* Contact Information */}
      <p className="text-sm text-center mt-6 text-gray-600">
        Note: In case of any query or issue feel free to connect with us on{" "}
        <span className="font-bold">+9193510 09002</span> or email us at{" "}
        <span className="text-red-600">Preeti@lwindia.com</span>
      </p>
    </div>
  )
}

export default ApplicationForm;
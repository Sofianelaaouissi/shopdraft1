"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  productType: z.string().min(1, { message: "Please select a product type." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const productTypes = [
  "Custom Journal",
  "Leather Notebook",
  "Photo Album",
  "Sketchbook",
  "Corporate Gift",
  "Wedding Album",
  "Other",
];

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      productType: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    reset();
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isSubmitted ? (
        <div className="bg-green-50 text-green-800 p-6 rounded-lg flex items-center space-x-3 animate-fade-in">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <h4 className="font-semibold text-lg">Thank you for your inquiry!</h4>
            <p>We'll get back to you within 24 hours to discuss your custom leather project.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                id="name"
                {...register("name")}
                className={cn(
                  "w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50",
                  errors.name ? "border-destructive" : "border-input"
                )}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={cn(
                  "w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50",
                  errors.email ? "border-destructive" : "border-input"
                )}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className="w-full px-4 py-3 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Product Type */}
            <div className="space-y-2">
              <label htmlFor="productType" className="text-sm font-medium text-foreground">
                Product Type <span className="text-destructive">*</span>
              </label>
              <select
                id="productType"
                {...register("productType")}
                className={cn(
                  "w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50",
                  errors.productType ? "border-destructive" : "border-input"
                )}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a product type
                </option>
                {productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.productType && (
                <p className="text-sm text-destructive">{errors.productType.message}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Your Message <span className="text-destructive">*</span>
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={5}
              className={cn(
                "w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50",
                errors.message ? "border-destructive" : "border-input"
              )}
            ></textarea>
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center"
          >
            {isSubmitting ? (
              <span>Processing...</span>
            ) : (
              <>
                Get Your Custom Quote <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
};

export default ContactForm;
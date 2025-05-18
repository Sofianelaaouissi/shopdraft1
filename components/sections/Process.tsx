"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const processSteps = [
  {
    number: "01",
    title: "Material Selection",
    description: "We select the finest quality leather from the Fez tanneries, known for their traditional tanning methods using natural materials.",
    image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg"
  },
  {
    number: "02",
    title: "Design Consultation",
    description: "We work with you to design your perfect leather book, discussing dimensions, leather type, binding style, and embellishments.",
    image: "https://images.pexels.com/photos/6045207/pexels-photo-6045207.jpeg"
  },
  {
    number: "03",
    title: "Hand Cutting & Tooling",
    description: "Each piece of leather is carefully cut by hand and tooled with traditional Moroccan designs if desired.",
    image: "https://images.pexels.com/photos/6044252/pexels-photo-6044252.jpeg"
  },
  {
    number: "04",
    title: "Traditional Binding",
    description: "Using time-honored techniques, we hand-bind your book with strong waxed thread for durability and authenticity.",
    image: "https://images.pexels.com/photos/6045216/pexels-photo-6045216.jpeg"
  }
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }

      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="process" className="section bg-muted/30">
      <div className="container-custom">
        <div ref={titleRef} className="text-center mb-16 fade-in">
          <h2 className="section-title">Our Crafting Process</h2>
          <p className="section-subtitle mx-auto">
            Each piece is crafted through a meticulous process that honors centuries-old Moroccan traditions.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-24 relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-0.5 bg-primary/20 hidden lg:block"></div>

          {processSteps.map((step, index) => (
            <div 
              key={index}
              ref={(el) => (stepRefs.current[index] = el)}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center fade-in relative",
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              )}
            >
              {/* Step Number for mobile */}
              <div className="absolute -top-10 left-0 text-5xl font-bold text-primary/10 lg:hidden">
                {step.number}
              </div>

              {/* Content */}
              <div className={cn(
                "p-6",
                index % 2 === 1 ? "lg:pl-16" : "lg:pr-16"
              )}>
                {/* Step Number for desktop */}
                <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    {index < 3 ? <ArrowDown size={20} /> : "✓"}
                  </div>
                </div>
                
                <div className="hidden lg:block text-7xl font-bold text-primary/10 mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </div>

              {/* Image */}
              <div className="rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
                <div className="relative h-[300px]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
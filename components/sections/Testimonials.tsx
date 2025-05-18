"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Art Collector",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    content: "The craftsmanship of my custom leather journal is extraordinary. The attention to detail and the quality of the leather exceeded my expectations. It's a piece of art that I'll treasure for years.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Wedding Photographer",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    content: "I ordered custom photo albums for my clients, and they were stunned by the quality. The leather work is impeccable, and the binding is solid. My business has gained a reputation boost thanks to these beautiful albums.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Travel Writer",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    content: "As someone who travels constantly, I needed a journal that could withstand the journey. My Moroccan leather notebook has been across 4 continents and still looks beautiful. The leather has developed a gorgeous patina.",
    rating: 5
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Corporate Executive",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    content: "We ordered custom leather portfolios for our executive team, and the response was unanimous praise. The quality is exceptional, and the traditional Moroccan designs add a unique touch that makes a statement.",
    rating: 5
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    testimonialRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }

      testimonialRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="testimonials" className="section bg-primary/5">
      <div className="container-custom">
        <div ref={titleRef} className="text-center mb-16 fade-in">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle mx-auto">
            Read about the experiences of our clients with our handcrafted Moroccan leather products.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (testimonialRefs.current[index] = el)}
              className="fade-in bg-white rounded-lg p-8 shadow-md relative group hover:shadow-lg transition-all"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 bg-primary text-white p-3 rounded-full opacity-90 transition-all group-hover:scale-110">
                <Quote size={18} />
              </div>
              
              {/* Content */}
              <div className="mb-6">
                <p className="text-lg italic text-foreground/90">"{testimonial.content}"</p>
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={cn(
                      "mr-1",
                      i < testimonial.rating ? "text-accent fill-accent" : "text-muted"
                    )}
                  />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="rounded-full overflow-hidden w-12 h-12 mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
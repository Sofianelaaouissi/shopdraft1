"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === textRef.current) {
              textRef.current?.classList.add("appear");
            } else if (entry.target === imageRef.current) {
              imageRef.current?.classList.add("appear");
              // Stagger the appearance of the features
              const features = document.querySelectorAll(".feature-item");
              features.forEach((feature, index) => {
                setTimeout(() => {
                  feature.classList.add("appear");
                }, 300 * index);
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="section bg-muted/50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div ref={textRef} className="fade-in">
            <h2 className="section-title">A Heritage of Moroccan Craftsmanship</h2>
            <p className="section-subtitle">
              Soufiane's bookbinding tradition has been passed down through generations, preserving the authentic techniques of the Fez tanneries.
            </p>
            
            <div className="space-y-6">
              <div className="feature-item fade-in bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary/10 transition-all hover:shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-primary">Fez Tannery Heritage</h3>
                <p>
                  Our leather comes directly from the world-famous tanneries of Fez, where hides are processed using techniques unchanged since the 16th century.
                </p>
              </div>
              
              <div className="feature-item fade-in bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary/10 transition-all hover:shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-primary">Traditional Hand-Stitching</h3>
                <p>
                  Every book is meticulously hand-stitched using ancient Moroccan binding techniques that ensure durability and a unique aesthetic quality.
                </p>
              </div>
              
              <div className="feature-item fade-in bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary/10 transition-all hover:shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-primary">Natural Materials</h3>
                <p>
                  We use only natural dyes and materials, staying true to centuries-old traditions while creating sustainable, eco-friendly products.
                </p>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div ref={imageRef} className="fade-in">
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-xl border-8 border-white group transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2">
              <Image
                src="https://pub-2963cf54bb984b01b71c64f2fe8b4602.r2.dev/fatjma/khmissa.png"
                alt="Moroccan leather tannery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0"></div>
              <div className="absolute -bottom-1 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent flex items-end transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-0">
                <div className="p-6 text-white">
                  <p className="font-semibold text-lg">The ancient tanneries of Fez, Morocco</p>
                </div>
              </div>
            </div>
            
            {/* Features list */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                "Vegetable tanned",
                "Hand-tooled designs",
                "Naturally dyed",
                "Eco-friendly",
                "Fair trade practices",
                "Made to last generations"
              ].map((feature, index) => (
                <div key={index} className="feature-item fade-in flex items-center gap-2">
                  <CheckCircle size={18} className="text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

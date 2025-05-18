"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const textElement = textRef.current;
    
    if (heroElement && textElement) {
      // Add appear class after a short delay
      setTimeout(() => {
        textElement.classList.add('appear');
      }, 300);
    }
    
    const handleScroll = () => {
      if (heroElement) {
        const scrollPosition = window.scrollY;
        const translateY = scrollPosition * 0.4;
        heroElement.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-[600px] overflow-hidden"
    >
      {/* Background Image */}
      <div ref={heroRef} className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/6846093/pexels-photo-6846093.jpeg"
          alt="Moroccan leather workshop"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
      </div>
      
      {/* Overlay Pattern */}
      <div className="absolute inset-0 z-10 bg-black/30 hero-pattern opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container-custom">
          <div
            ref={textRef}
            className="max-w-3xl text-white fade-in"
          >
            <h1 className="section-title text-shadow mb-6">
              Experience Timeless Moroccan Craftsmanship
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-shadow">
              Custom leather book binding, handmade in Morocco using traditional techniques passed down through generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact" className={cn(
                "btn-primary",
                "bg-primary/90 hover:bg-primary text-white flex items-center justify-center gap-2"
              )}>
                Get a Custom Quote <ArrowRight size={18} />
              </Link>
              <Link href="#process" className={cn(
                "btn-secondary",
                "bg-white/90 hover:bg-white text-primary flex items-center justify-center gap-2"
              )}>
                Explore Our Process
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#about" className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
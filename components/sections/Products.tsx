"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Product data
const products = [
  {
    id: 1,
    title: "Custom Journals",
    description: "Personalized leather journals with custom embossing and high-quality paper.",
    image: "https://images.pexels.com/photos/6044237/pexels-photo-6044237.jpeg"
  },
  {
    id: 2,
    title: "Photo Albums",
    description: "Beautiful leather-bound photo albums to preserve your precious memories.",
    image: "https://images.pexels.com/photos/6045028/pexels-photo-6045028.jpeg"
  },
  {
    id: 3,
    title: "Sketchbooks",
    description: "Artist-quality sketchbooks with premium paper and durable leather covers.",
    image: "https://images.pexels.com/photos/4992397/pexels-photo-4992397.jpeg"
  },
  {
    id: 4,
    title: "Corporate Gifts",
    description: "Custom-branded leather portfolios and notebooks for business presentations.",
    image: "https://images.pexels.com/photos/2127037/pexels-photo-2127037.jpeg"
  }
];

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }

      productRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="products" className="section bg-white">
      <div className="container-custom">
        <div ref={titleRef} className="text-center mb-16 fade-in">
          <h2 className="section-title">Our Leather Creations</h2>
          <p className="section-subtitle mx-auto">
            Each piece is meticulously handcrafted using traditional Moroccan techniques and the finest quality leather.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              className="fade-in group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md h-[400px] transition-all duration-500 group-hover:shadow-xl">
                {/* Product Image */}
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                  <h3 className="text-2xl font-semibold text-white mb-2">{product.title}</h3>
                  <p className="text-white/80 mb-4">{product.description}</p>
                  <Link 
                    href="#contact" 
                    className="inline-flex items-center text-white hover:text-primary transition-colors"
                  >
                    Learn more <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <Link 
            href="#contact" 
            className="btn-primary inline-flex items-center"
          >
            Request Custom Order <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
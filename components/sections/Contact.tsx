"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "./ContactForm";
import { cn } from "@/lib/utils";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }

      contentRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="contact" className="section bg-white">
      <div className="container-custom">
        <div ref={titleRef} className="text-center mb-16 fade-in">
          <h2 className="section-title">Get Your Custom Quote</h2>
          <p className="section-subtitle mx-auto">
            Tell us about your vision, and we'll help bring it to life with our traditional Moroccan craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            ref={(el) => (contentRefs.current[0] = el)}
            className="bg-muted/20 p-6 md:p-10 rounded-xl shadow-sm fade-in"
          >
            <h3 className="text-2xl font-semibold mb-6">Request a Quote</h3>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div 
            ref={(el) => (contentRefs.current[1] = el)}
            className="fade-in space-y-8"
          >
            {/* Image */}
            <div className="rounded-xl overflow-hidden shadow-lg relative h-[300px]">
              <Image
                src="https://images.pexels.com/photos/4992401/pexels-photo-4992401.jpeg"
                alt="Moroccan leather craftsman"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20"></div>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-5 bg-muted/20 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Workshop & Studio</h4>
                  <p className="text-muted-foreground">Rue des Tanneurs, Fez Medina, Fez, Morocco</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-muted/20 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email Us</h4>
                  <p className="text-muted-foreground">info@fatjma.com</p>
                  <p className="text-muted-foreground">orders@fatjma.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-muted/20 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Call Us</h4>
                  <p className="text-muted-foreground">+212 612 345 678</p>
                  <p className="text-muted-foreground">+212 537 898 765</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-muted/20 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Working Hours</h4>
                  <p className="text-muted-foreground">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-muted-foreground">Saturday: 10AM - 4PM (GMT+1)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
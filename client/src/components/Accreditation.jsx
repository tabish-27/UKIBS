"use client";

import React, { useRef, useEffect } from "react";

const certificates = [
  "CPD LONDON.jpg",
  "ICI UK.jpg",
  "ICUK.jpg",
  "IEA.jpg",
  "INDIA 5000 BEST MSME.jpg",
  "MSME.jpg",
  "QMS.jpg",
  "QSME.jpg",
  "QVA.jpg",
  "SDC CANADA.jpg",
  "UNGPc.jpg",
];

// A self-contained component for the infinite moving cards
const InfiniteMovingCertificates = ({
  items,
  direction = "right",
  speed = "slow",
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    // Duplicate items for infinite scroll effect
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current.appendChild(duplicatedItem);
    });

    const isSlow = speed === "slow";
    const duration = isSlow ? "40s" : "20s";

    if (scrollerRef.current) {
      scrollerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "reverse" : "normal"
      );
      scrollerRef.current.style.setProperty("--animation-duration", duration);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <style>
        {`
          @keyframes scroll-right {
            0% { transform: translateX(calc(-50% - 6rem)); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-right {
            animation: scroll-right var(--animation-duration) linear infinite;
          }
        `}
      </style>
      <ul
        ref={scrollerRef}
        className="flex min-w-full shrink-0 w-max items-center gap-24 animate-scroll-right"
      >
        {items.map((cert, idx) => (
          <li key={idx} className="flex items-center justify-center">
            <img
              src={`/assets/accreditation_folder/${cert}`}
              alt={cert}
              className="md:h-80 h-60 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Accreditation = () => {
  return (
    <section className="bg-gradient-to-br from-[#FDDCEE] to-white pt-8 py-20">
      <div className="mx-auto px-0">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-16 tracking-wide relative inline-block text-center w-full">
          ACCREDITATIONS
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-4px] h-1 w-72 sm:w-96 lg:w-[30rem] bg-gradient-to-r from-transparent via-[#F8069D] to-transparent rounded-full"></span>
        </h2>

        <InfiniteMovingCertificates
          items={certificates}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
};

export default Accreditation;

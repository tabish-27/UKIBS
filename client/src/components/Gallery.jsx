import React, { useState, useEffect } from "react";

const Gallery = () => {
  const images = [
    "/assets/gallery_home_img/Bold Feather Glam.jpg",
    "/assets/gallery_home_img/Bold Glam Closeup.jpg",
    "/assets/gallery_home_img/Bridal Classic Smile.jpg",
    "/assets/gallery_home_img/bridal closeup glam.jpg",
    "/assets/gallery_home_img/bridal closeup shot.jpg",
    "/assets/gallery_home_img/Bridal Elegant Frame.jpg",
    "/assets/gallery_home_img/Bridal Fashion Shoot.jpg",
    "/assets/gallery_home_img/bridal gaze smile.jpg",
    "/assets/gallery_home_img/bridal holding prop.jpg",
    "/assets/gallery_home_img/Bridal Jewelry Look.jpg",
    "/assets/gallery_home_img/Bridal pose in pink outfit sitting.jpg",
    "/assets/gallery_home_img/BRIDAL_UK.jpg",
    "/assets/gallery_home_img/Bride in maroon saree with golden jewelry.jpg",
    "/assets/gallery_home_img/Bride in maroon saree with jewelry.jpg",
    "/assets/gallery_home_img/Bride in white gown with tiara.jpg",
  ];

  const visibleCount = 4;
  const [startIndex, setStartIndex] = useState(0);

  // Duplicate to avoid wrap-gap
  const extendedImages = [...images, ...images];

  // Preload all images once on mount (so next images appear immediately)
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []); // run once

  // Slide one image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // increment and wrap using original images length
      setStartIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Always take a contiguous slice from extendedImages
  const visibleImages = extendedImages.slice(
    startIndex,
    startIndex + visibleCount
  );

  return (
    <div className="w-full min-h-screen  bg-[#FDDCEE] flex flex-col items-center">
      <div className="text-center mb-12 mt-15 relative px-6 md:px-0">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8069D] mb-6 tracking-wide relative inline-block">
          CURATED MEDIA <br className="sm:hidden" />
          GALLERY
          <span className="absolute left-0 bottom-[-6px] h-1 w-full bg-gradient-to-r from-transparent via-[#F8069D] to-transparent rounded-full"></span>
        </h2>

        <p className="text-black/80 text-base md:text-lg max-w-3xl mx-auto">
          Discover your captivating look! Browse our gallery of elegant styles
          and timeless beauty.
        </p>
      </div>

      <main className="w-full max-w-[1200px] py-12 flex justify-center overflow-hidden">
        {/* This is the new container that will move */}
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${startIndex * 274}px)` }}
        >
          {extendedImages.map((src, index) => (
            <div
              key={index} // Use a unique key like the index to avoid React warnings
              className="w-[250px] h-[300px] bg-white rounded-xl shadow-md border-4 border-white flex-shrink-0"
            >
              <img
                src={src}
                alt={`Gallery ${index}`}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Gallery;

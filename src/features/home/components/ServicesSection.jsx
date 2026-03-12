"use client";

import React, { useState, useRef, useEffect } from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: "Signature Haircuts",
      description: "Precision styling tailored to your face shape and personal aesthetic.",
      image: "https://images.unsplash.com/photo-1553521041-d168abd31de3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhaXJjdXR8ZW58MHx8MHx8fDA%3D"
    },
    {
      title: "Luxury Skin Care",
      description: "Revitalizing facials and treatments using premium organic elixirs.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1IXVoviff2vw-vfbnEth3cRVJbetSWlpORQGs3h5LjLLD9H5OdOEei1FUdQTUx9HFAf_MxM0Lrgpda-Z_epKsSlJcRRIs7TB4H1V0C1r1lj0rJjgoot-9crr5L57tchCg-2Z4duk8w9AR97Qs-4NeiUD5JfFfoYyOwa2ZEHDqHI-8SJv56It59aYjrDxFqIsmUHwqPZkgz_qcsqDXuKvSoWfMhqqy8Vnavtk1btUXMAb_CqVj7tLvht43W98PU1-beQy4dfEZIRu9"
    },
    {
      title: "Artistic Manicures",
      description: "Custom nail art and therapeutic hand care for every occasion.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdblC_ad2bLjbNG1gzwDGiwBgnmnDTCAgGOKwuSqEUmyOYpGuolnD0WzzmcKtE1Em6Mcv7NtmPzmprSV80ruWKJ6GbHU7m-3K6zMc7I9oS8H1SLDb8rnZOSQlXxe4D_steWmcj_l9dTGc7byOoXU0WO3JtSqWXd1-bJ1vOAkxuhgyK4M9hCf05IeQi06ReZBzJImNKTCSEdXkPAK3lu_a0tOjMvhLWHXJE47-VY2FYGrVTw04JK6IqB2RSncxzG95UJtUq057UkIi5"
    },
    {
      title: "Bridal Packages",
      description: "Complete transformation services for your most special day.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZwatrTnvnmq9fKbDCD54TxCGWmSdF8uG7JHsAv0tsf_y3mGeYufo8SXtIpO5SGh5ZdtVgEvAvpcofmIXhg8ePC2wo6M5VSUlq5LDaZDwcuFsbofUOH--p6xj8SwLQYhQHiGmOllpVgvnClOpKg14NyUI5yuRUD3iJPUSkg-SnqU2y0z1bsZbaP25NgGW7wYH5jmHzl_5tQmksd7ezywNc_n6PnQhu8DraI5qkvvtgaDvi3GdA0mqj-nYxXuwNKtpY9G7YxDel5-Br"
    },
    {
      title: "Color & Highlights",
      description: "Vibrant, long-lasting color treatments crafted by expert colorists.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop"
    },
    {
      title: "Deep Massage",
      description: "Tension-melting body therapy using aromatic botanical oils.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop"
    },
    {
      title: "Lash & Brow",
      description: "Frame your eyes with sculpted brows and voluminous lash extensions.",
      image: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFzaHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      title: "Spa Rituals",
      description: "Full-body wellness journeys blending ancient and modern techniques.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop"
    }
  ];

  const [visibleCards, setVisibleCards] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setVisibleCards(4);
      else if (width >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = services.length - visibleCards;

  const goTo = (index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const prev = () => goTo(currentIndex - 1);
  const next = () => goTo(currentIndex + 1);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [maxIndex]);

  const resetAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 4000);
  };

  // Drag handlers
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - startX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 80;
    if (dragOffset < -threshold) { goTo(currentIndex + 1); resetAutoPlay(); }
    else if (dragOffset > threshold) { goTo(currentIndex - 1); resetAutoPlay(); }
    setDragOffset(0);
  };

  const onTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const onTouchMove = (e) => {
    setDragOffset(e.touches[0].clientX - startX);
  };

  const onTouchEnd = () => {
    const threshold = 60;
    if (dragOffset < -threshold) { goTo(currentIndex + 1); resetAutoPlay(); }
    else if (dragOffset > threshold) { goTo(currentIndex - 1); resetAutoPlay(); }
    setDragOffset(0);
  };

  const translateX = `calc(-${currentIndex * (100 / visibleCards)}% - ${currentIndex * (24 / visibleCards)}px + ${isDragging ? dragOffset : 0}px)`;

  return (
    <section className="bg-plum/5 py-10 w-full font-['Georgia',serif]">
      <div className="px-4 md:px-6 max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <p className="text-[#9b5876] text-[0.7rem] md:text-[0.8rem] tracking-[0.2em] uppercase mb-2 md:mb-3 font-['Georgia',serif]">
            Crafted With Care
          </p>
          <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-extrabold text-[#3c1432] m-0 leading-tight font-['Georgia',serif]">
            Our Premium Services
          </h2>
          <div className="w-12 md:w-16 h-[2px] md:h-[3px] bg-gradient-to-r from-[#9b5876] to-[#3c1432] mx-auto mt-3 md:mt-4 rounded-full" />
        </div>

        {/* Carousel */}
        <div className="relative group/carousel">
          {/* Track wrapper */}
          <div
            className={`overflow-hidden rounded-[4px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex gap-6 will-change-transform"
              style={{
                transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: `translateX(${translateX})`,
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="relative h-[380px] md:h-[420px] lg:h-[480px] rounded-[20px] overflow-hidden shrink-0 group shadow-none hover:shadow-[0_32px_60px_rgba(80,30,60,0.35)] transition-all duration-400 ease-in-out select-none"
                  style={{
                    width: `calc(100% / ${visibleCards} - ${((visibleCards - 1) * 24) / visibleCards}px)`
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3c1432]/90 via-[#3c1432]/15 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-7 w-full">
                    <h3 className="text-[#fff8f2] text-[1.35rem] font-bold mb-2 transition-transform duration-300 group-hover:-translate-y-1.5">
                      {service.title}
                    </h3>
                    <p className="text-[#fff8f2]/90 text-[0.85rem] leading-relaxed mb-4 opacity-0 translate-y-3 transition-all duration-300 delay-50 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3 md:line-clamp-none">
                      {service.description}
                    </p>
                    <button className="bg-transparent border-[1.5px] border-[#fff8f2]/70 text-[#fff8f2] px-[22px] py-2 rounded-full text-[0.8rem] font-semibold opacity-0 translate-y-3 transition-all duration-300 delay-100 tracking-wider hover:bg-[#fff8f2] hover:text-[#3c1432] group-hover:opacity-100 group-hover:translate-y-0">
                      Explore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="hidden md:flex w-12 h-12 rounded-full border-[1.5px] border-[#642850]/40 bg-white items-center justify-center transition-all duration-200 shadow-[0_4px_16px_rgba(100,40,80,0.12)] hover:bg-[#3c1432] hover:border-[#3c1432] hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed group absolute top-1/2 -translate-y-1/2 -left-3 lg:-left-6 z-10"
            onClick={() => { prev(); resetAutoPlay(); }}
            disabled={currentIndex === 0}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3c1432" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-200 group-hover:stroke-white">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="hidden md:flex w-12 h-12 rounded-full border-[1.5px] border-[#642850]/40 bg-white items-center justify-center transition-all duration-200 shadow-[0_4px_16px_rgba(100,40,80,0.12)] hover:bg-[#3c1432] hover:border-[#3c1432] hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed group absolute top-1/2 -translate-y-1/2 -right-3 lg:-right-6 z-10"
            onClick={() => { next(); resetAutoPlay(); }}
            disabled={currentIndex === maxIndex}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3c1432" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-200 group-hover:stroke-white">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dots for mobile - keeping them for better UX on 1-card view */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-6">
          {services.map((_, i) => (
            <button
              key={i}
              className={`cursor-pointer transition-all duration-300 border-none h-1 rounded-full ${i === currentIndex ? 'bg-[#3c1432] w-6' : 'bg-[#642850]/20 w-1.5'}`}
              onClick={() => { goTo(i); resetAutoPlay(); }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
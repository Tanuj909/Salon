"use client";

import React, { useEffect, useRef, useState } from 'react';

const ClientReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Client",
      image: "https://images.unsplash.com/photo-1494790108777-2fdad95f6b8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "Absolutely love this place! The signature haircut transformed my look completely. The stylist really listened to what I wanted and delivered beyond expectations. The ambiance is so relaxing too.",
      date: "March 2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "First-time Visitor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "Came for a hot stone massage and left feeling like a new person. The therapist was professional and knew exactly where to focus. Already booked my next appointment!",
      date: "March 2024"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Bride",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "The bridal package was worth every penny! My entire bridal party felt like royalty. The makeup lasted all night and the hairstyles stayed perfect through dancing. Thank you!",
      date: "February 2024"
    },
    {
      id: 4,
      name: "David Williams",
      role: "Loyal Customer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "Best barber in town! Consistent quality every single time. The attention to detail and the hot towel treatment at the end is the perfect finishing touch.",
      date: "February 2024"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Spa Enthusiast",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "The hydrating facial is absolutely divine! My skin hasn't glowed this much in years. The products they use smell amazing and feel so luxurious on the skin.",
      date: "January 2024"
    },
    {
      id: 6,
      name: "James Anderson",
      role: "Business Professional",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4,
      text: "Great atmosphere and skilled staff. The manicure was precise and lasted weeks. Would highly recommend for anyone looking for quality grooming services.",
      date: "January 2024"
    }
  ];

  const reviewsCount = reviews.length;
  const [visibleCards, setVisibleCards] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setVisibleCards(3);
      else if (width >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = reviewsCount - visibleCards;
  const GAP = 24;

  const goTo = (index) => setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));

  const startAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
  };

  useEffect(() => {
    if (!isPaused) startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [isPaused, maxIndex]);

  const handlePrev = () => { goTo(currentIndex - 1); startAutoplay(); };
  const handleNext = () => { goTo(currentIndex + 1); startAutoplay(); };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <svg
        key={i}
        style={{ color: i < rating ? '#9b5876' : '#e0d0d8' }}
        className="w-[18px] h-[18px] shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

  return (
    <section
      className="py-10 overflow-hidden bg-plum/5"
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <span className="w-6 h-px inline-block bg-[#D4A373]" />
              <span className="text-[0.65rem] md:text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#D4A373]">
                Client Testimonials
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-extrabold text-[#3c1432] leading-tight">
              Words From Our <span className="italic font-normal text-[#D4A373]">Guests</span>
            </h2>
          </div>
        </div>

        {/* Carousel row */}
        <div
          className="flex items-center gap-5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev button - Hidden on mobile */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous"
            className="hidden md:flex w-12 h-12 rounded-full shrink-0 items-center justify-center border border-[rgba(155,88,118,0.28)] bg-white cursor-pointer transition-all duration-200 hover:not-disabled:bg-[#3c1432] hover:not-disabled:border-[#3c1432] hover:not-disabled:scale-[1.08] disabled:opacity-[0.28] disabled:cursor-not-allowed group"
          >
            <svg
              className="transition-colors duration-200 group-hover:[stroke:#fff] group-disabled:[stroke:#3c1432]"
              width={20} height={20} fill="none" stroke="#3c1432"
              strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Track */}
          <div className="flex-1 overflow-hidden min-w-0">
            <div
              className="flex items-stretch"
              style={{
                gap: GAP,
                transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
                transform: `translateX(calc(-${currentIndex * (100 / visibleCards)}% - ${currentIndex * (GAP / visibleCards)}px))`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="min-w-0 shrink-0"
                  style={{
                    flex: `0 0 calc(100% / ${visibleCards} - ${((visibleCards - 1) * GAP) / visibleCards}px)`,
                  }}
                >
                  {/* Card - Optimized for narrow mobile */}
                  <div className="bg-white rounded-2xl px-5 md:px-[30px] pt-7 md:pt-9 pb-6 md:pb-[30px] border border-[rgba(155,88,118,0.12)]">

                    {/* Quote icon */}
                    <div className="mb-4 text-[rgba(155,88,118,0.15)]">
                      <svg width={28} height={28} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-[3px] mb-4">
                      {renderStars(review.rating)}
                    </div>

                    {/* Text */}
                    <p
                      className="text-[rgba(60,20,50,0.72)] text-[0.88rem] leading-[1.75] mb-6 grow overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      "{review.text}"
                    </p>

                    {/* Footer - Improved for narrow mobile */}
                    <div className="border-t border-[rgba(155,88,118,0.1)] pt-5 mt-auto flex items-start gap-3">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-10 h-10 md:w-[46px] md:h-[46px] rounded-full object-cover border-2 border-[rgba(155,88,118,0.22)] shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="m-0 font-bold text-[#3c1432] text-[0.8rem] md:text-[0.875rem] leading-tight mb-1 truncate">
                          {review.name}
                        </p>
                        <p className="m-0 text-[#9b5876] text-[0.7rem] md:text-[0.75rem] leading-tight">
                          {review.role}
                        </p>
                        <span className="block mt-2 text-[0.65rem] md:hidden text-[rgba(60,20,50,0.35)]">
                          {review.date}
                        </span>
                      </div>
                      <span className="hidden md:block ml-auto text-[0.7rem] text-[rgba(60,20,50,0.35)] shrink-0">
                        {review.date}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next button - Hidden on mobile */}
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            aria-label="Next"
            className="hidden md:flex w-12 h-12 rounded-full shrink-0 items-center justify-center border border-[rgba(155,88,118,0.28)] bg-white cursor-pointer transition-all duration-200 hover:not-disabled:bg-[#3c1432] hover:not-disabled:border-[#3c1432] hover:not-disabled:scale-[1.08] disabled:opacity-[0.28] disabled:cursor-not-allowed group"
          >
            <svg
              className="transition-colors duration-200 group-hover:[stroke:#fff] group-disabled:[stroke:#3c1432]"
              width={20} height={20} fill="none" stroke="#3c1432"
              strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dots
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); startAutoplay(); }}
              aria-label={`Slide ${i + 1}`}
              className="h-2 rounded-full border-none p-0 cursor-pointer transition-all duration-300"
              style={{
                width: i === currentIndex ? 28 : 8,
                background: i === currentIndex ? '#3c1432' : 'rgba(155,88,118,0.22)',
              }}
            />
          ))}
        </div> */}

      </div>
    </section>
  );
};

export default ClientReviews;
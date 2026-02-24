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

  const VISIBLE = 3;
  const maxIndex = reviews.length - VISIBLE; // 0–3
  const GAP = 24;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

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
  }, [isPaused]);

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
      className="py-24 overflow-hidden font-serif"
      style={{ background: 'linear-gradient(180deg, #fdf6f0 0%, #ffffff 100%)' }}
    >
      <div className="max-w-[1240px] mx-auto px-12">

        {/* Header - Fixed alignment */}
        <div className="text-center mb-14">
          <p className="text-[#9b5876] text-[0.75rem] tracking-[0.22em] uppercase mb-3 font-bold">
            Testimonials
          </p>
          <h2 className="text-[clamp(1.9rem,3.5vw,2.8rem)] font-extrabold text-[#3c1432] leading-[1.15]">
            What Our Clients Say
          </h2>
          <div
            className="w-16 h-[3px] mx-auto mt-4 mb-5 rounded-sm"
            style={{ background: 'linear-gradient(90deg, #9b5876, #3c1432)' }}
          />
          <div className='flex items-center justify-center'>
          <p className="text-[rgba(60,20,50,0.58)] max-w-[500px] mx-auto text-[0.93rem] leading-[1.65]">
            Don't just take our word for it — hear from our wonderful clients about their experiences
          </p>
          </div>

        </div>

        {/* Carousel row */}
        <div
          className="flex items-center gap-5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous"
            className="
              w-12 h-12 rounded-full shrink-0 flex items-center justify-center
              border border-[rgba(155,88,118,0.28)] bg-white
              cursor-pointer transition-all duration-200
              hover:not-disabled:bg-[#3c1432] hover:not-disabled:border-[#3c1432] hover:not-disabled:scale-[1.08]
              disabled:opacity-[0.28] disabled:cursor-not-allowed
              group
            "
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
                transform: `translateX(calc(-${currentIndex} * (100% / ${VISIBLE} + ${GAP / VISIBLE}px * ${VISIBLE - 1} / ${VISIBLE - 1 || 1})))`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="min-w-0 shrink-0"
                  style={{
                    flex: `0 0 calc(${100 / VISIBLE}% - ${(GAP * (VISIBLE - 1)) / VISIBLE}px)`,
                  }}
                >
                  {/* Card - Removed shadows and hover effects */}
                  <div className="
                    bg-white rounded-3xl px-[30px] pt-9 pb-[30px]
                    border border-[rgba(155,88,118,0.12)]
                  ">

                    {/* Quote icon */}
                    <div className="mb-[18px] text-[rgba(155,88,118,0.15)]">
                      <svg width={34} height={34} fill="currentColor" viewBox="0 0 24 24">
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

                    {/* Footer */}
                    <div className="border-t border-[rgba(155,88,118,0.1)] pt-5 mt-auto flex items-center gap-3">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-[46px] h-[46px] rounded-full object-cover border-2 border-[rgba(155,88,118,0.22)] shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="m-0 font-bold text-[#3c1432] text-[0.875rem] whitespace-nowrap overflow-hidden text-ellipsis">
                          {review.name}
                        </p>
                        <p className="mt-0.5 mb-0 text-[#9b5876] text-[0.75rem]">
                          {review.role}
                        </p>
                      </div>
                      <span className="ml-auto text-[0.7rem] text-[rgba(60,20,50,0.35)] shrink-0">
                        {review.date}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            aria-label="Next"
            className="
              w-12 h-12 rounded-full shrink-0 flex items-center justify-center
              border border-[rgba(155,88,118,0.28)] bg-white
              cursor-pointer transition-all duration-200
              hover:not-disabled:bg-[#3c1432] hover:not-disabled:border-[#3c1432] hover:not-disabled:scale-[1.08]
              disabled:opacity-[0.28] disabled:cursor-not-allowed
              group
            "
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
'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback } from 'react';
import { HiChevronLeft,HiChevronRight  } from "react-icons/hi";



interface EmblaCarouselProps {
    slides: React.ReactNode[] //passing components
}

export default function EmblaCarousel({ slides }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((component, index) => (
            <div className="flex-[0_0_50%] px-1 md:flex-[0_0_25%] md:px-2" key={index}>
                {component}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="flex justify-between mt-4 px-2"> */}
        <button
          onClick={scrollPrev}
          className="w-10 h-10 grid place-content-center cursor-pointer rounded bg-gray-200  hover:bg-gray-300 absolute top-[35%] left-0"
        >
          <HiChevronLeft />
        </button>
        <button
          onClick={scrollNext}
          className="w-10 h-10 grid place-content-center cursor-pointer bg-gray-200 rounded hover:bg-gray-300 absolute top-[35%] right-0"
        >
          <HiChevronRight />
        </button>
      {/* </div> */}
    </div>
  );
}

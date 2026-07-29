import { useState } from "react";

function Carousel({ images, alt }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  if (total === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  return (
    <div className="relative w-full max-w-3xl mx-auto select-none">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={images[current]}
          alt={alt ? `${alt} - foto ${current + 1}` : `Foto ${current + 1}`}
          className="w-full h-80 md:h-96 object-cover transition duration-500"
        />
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/20 backdrop-blur-md text-white text-xl flex items-center justify-center hover:bg-white/40 transition cursor-pointer"
          >
            &#8249;
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/20 backdrop-blur-md text-white text-xl flex items-center justify-center hover:bg-white/40 transition cursor-pointer"
          >
            &#8250;
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`size-2.5 rounded-full transition cursor-pointer ${
                  i === current ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <p className="text-center text-sm text-white/60 mt-1">
            {current + 1} / {total}
          </p>
        </>
      )}
    </div>
  );
}

export default Carousel;

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PRODUCTS } from '../data/products'

const allImages = PRODUCTS.flatMap((p) =>
  p.images?.map((src) => ({ src, name: p.name, code: p.code })) || []
)

export default function ProductCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  const next = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % allImages.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i - 1 + allImages.length) % allImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  if (allImages.length === 0) return null

  return (
    <section
      data-testid="product-carousel"
      className="relative py-24 md:py-32 bg-[#050505] border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">
            Gallery
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Product Visuals
          </h2>
          <p className="text-zinc-500 text-sm mt-2">
            Explore our full catalog through high-resolution product imagery.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative aspect-video bg-black border border-white/10 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={index}
                src={allImages[index].src}
                alt={allImages[index].name}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="p-3 border border-white/10 hover:border-accent hover:text-accent transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {allImages.slice(0, 10).map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
              {allImages.length > 10 && (
                <span className="text-xs text-zinc-500 ml-2">
                  +{allImages.length - 10} more
                </span>
              )}
            </div>

            <button
              onClick={next}
              className="p-3 border border-white/10 hover:border-accent hover:text-accent transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

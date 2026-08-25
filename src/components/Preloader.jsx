import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const controls = useAnimation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.8 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-accent text-xs uppercase tracking-[0.3em]"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  )
}

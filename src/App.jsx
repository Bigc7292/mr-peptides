import { useState, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Stacks from './components/Stacks'
import Products from './components/Products'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState('')

  const onNavigate = useCallback((id) => {
    const el = document.getElementById(id === 'hero' ? 'hero' : id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  const onRequestPrice = useCallback((name) => {
    setSelectedProduct(name)
    setTimeout(() => onNavigate('contact'), 50)
  }, [onNavigate])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onNavigate={onNavigate} />
      <main>
        <Hero onNavigate={onNavigate} />
        <Manifesto />
        <Stacks />
        <Products onRequestPrice={onRequestPrice} />
        <Contact
          selectedProduct={selectedProduct}
          onProductChange={setSelectedProduct}
        />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}

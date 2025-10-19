import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

export function Header({ config }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-4' : 'bg-white/95 backdrop-blur-sm py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            {config?.logoUrl ? (
              <img
                src={config.logoUrl}
                alt={config.logoAlt || config.siteName}
                className="h-12 object-contain"
              />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {config?.siteName || 'Carregando...'}
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Início
            </a>
            
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary transition-colors font-medium">
                Quem Somos
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-xl rounded-lg py-2 min-w-[200px]">
                  <a href="#sobre" onClick={(e) => { e.preventDefault(); scrollToSection('#sobre'); }} className="block px-6 py-3 hover:bg-gray-50 transition-colors">Sobre</a>
                  <a href="#equipe" onClick={(e) => { e.preventDefault(); scrollToSection('#equipe'); }} className="block px-6 py-3 hover:bg-gray-50 transition-colors">Equipe</a>
                  <a href="#depoimentos" onClick={(e) => { e.preventDefault(); scrollToSection('#depoimentos'); }} className="block px-6 py-3 hover:bg-gray-50 transition-colors">Depoimentos</a>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-700 hover:text-primary transition-colors font-medium">
                Áreas de Atuação
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-xl rounded-lg py-2 min-w-[200px]">
                  <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('#servicos'); }} className="block px-6 py-3 hover:bg-gray-50 transition-colors">Serviços</a>
                  <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('#portfolio'); }} className="block px-6 py-3 hover:bg-gray-50 transition-colors">Portfólio</a>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-700 hover:text-primary transition-colors font-medium">
                Recursos
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-xl rounded-lg py-2 min-w-[200px]">
                  <a href="#blog" onClick={(e) => { e.preventDefault(); scrollToSection('#blog'); }} className="block px-6 py-3 hover:bg-gray-50 transition-colors">Blog</a>
                  <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('#faq'); }} className="block px-6 py-3 hover:bg-gray-50 transition-colors">FAQ</a>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => scrollToSection('#contato')}
              className="ml-4"
            >
              Entre em Contato
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6 pb-4"
            >
              <div className="flex flex-col gap-4">
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="text-gray-700 hover:text-primary transition-colors font-medium py-2">Início</a>
                <a href="#sobre" onClick={(e) => { e.preventDefault(); scrollToSection('#sobre'); }} className="text-gray-700 hover:text-primary transition-colors font-medium py-2">Sobre</a>
                <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('#servicos'); }} className="text-gray-700 hover:text-primary transition-colors font-medium py-2">Serviços</a>
                <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('#portfolio'); }} className="text-gray-700 hover:text-primary transition-colors font-medium py-2">Portfólio</a>
                <a href="#equipe" onClick={(e) => { e.preventDefault(); scrollToSection('#equipe'); }} className="text-gray-700 hover:text-primary transition-colors font-medium py-2">Equipe</a>
                <a href="#blog" onClick={(e) => { e.preventDefault(); scrollToSection('#blog'); }} className="text-gray-700 hover:text-primary transition-colors font-medium py-2">Blog</a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('#faq'); }} className="text-gray-700 hover:text-primary transition-colors font-medium py-2">FAQ</a>
                <Button variant="primary" onClick={() => scrollToSection('#contato')} className="mt-4">Entre em Contato</Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

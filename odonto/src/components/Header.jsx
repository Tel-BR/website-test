import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header({ config }) {
  const [prefetchedSections, setPrefetchedSections] = useState(new Set());
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Início', href: '#home' },
    {
      label: 'Quem Somos',
      dropdown: [
        { label: 'Sobre', href: '#sobre' },
        { label: 'Equipe', href: '#equipe' },
        { label: 'Depoimentos', href: '#depoimentos' }
      ]
    },
    {
      label: 'O que Fazemos',
      dropdown: [
        { label: 'Serviços', href: '#servicos' }
      ]
    },
    {
      label: 'Recursos',
      dropdown: [
        { label: 'FAQ', href: '#faq' }
      ]
    }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleLinkHover = (sectionId) => {
    // Pré-carregar seção ao hover (apenas uma vez)
    if (!prefetchedSections.has(sectionId)) {
      const section = document.querySelector(sectionId);
      if (section) {
        // Força o navegador a processar a seção
        section.getBoundingClientRect();
        setPrefetchedSections(prev => new Set([...prev, sectionId]));
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group" onClick={handleLinkClick}>
            {config.logoUrl ? (
              <img 
                src={config.logoUrl} 
                alt={config.siteName}
                className="h-16 w-auto max-w-[200px] object-contain transition-opacity group-hover:opacity-80"
              />
            ) : (
              <>
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                     style={{ backgroundColor: config.primaryColor }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-secondary font-bold text-xl text-gray-800 group-hover:opacity-80 transition-opacity">
                  {config.siteName}
                </span>
              </>
            )}
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors"
                      onMouseEnter={() => setOpenDropdown(index)}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2"
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={handleLinkClick}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    onClick={handleLinkClick}
                    onMouseEnter={() => handleLinkHover(item.href)}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            
            {/* CTA Button */}
            <a
              href="#contato"
              className="ml-4 px-6 py-2.5 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: config.accentColor }}
              onClick={handleLinkClick}
            >
              Agende sua Consulta
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    <>
                      <button
                        className="w-full text-left px-4 py-2 text-gray-700 font-medium flex items-center justify-between"
                        onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === index ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === index && (
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                              onClick={handleLinkClick}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 font-medium hover:text-gray-900"
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <a
                href="#contato"
                className="mx-4 mt-4 px-6 py-3 rounded-full font-semibold text-white text-center"
                style={{ backgroundColor: config.accentColor }}
                onClick={handleLinkClick}
              >
                Agende sua Consulta
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

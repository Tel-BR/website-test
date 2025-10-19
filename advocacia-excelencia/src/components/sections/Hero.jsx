import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function Hero({ data, config }) {
  const heroData = data[0] || {};
  const backgroundImage = heroData.imagem_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop';

  return (
    <section
      id="home"
      className="relative h-[85vh] flex items-center justify-center pt-24"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 59, 122, 0.85), rgba(0, 59, 122, 0.75)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-20 text-center text-white">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {heroData.titulo || 'Carregando...'}
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroData.subtitulo || ''}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            variant="secondary"
            onClick={() => {
              const target = heroData.cta_link || '#contato';
              document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-lg px-10 py-5"
          >
            {heroData.cta_texto || 'Entre em Contato'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

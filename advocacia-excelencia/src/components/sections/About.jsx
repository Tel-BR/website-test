import { motion } from 'framer-motion';
import { LazyImage } from '../ui/LazyImage';

export function About({ data }) {
  const aboutData = data[0] || {};

  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {aboutData.titulo || 'Sobre Nós'}
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              {(aboutData.descricao || '').split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <LazyImage
              src={aboutData.imagem_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop'}
              alt="Sobre nós"
              className="rounded-2xl shadow-2xl h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

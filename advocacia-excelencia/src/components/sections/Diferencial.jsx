import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LazyImage } from '../ui/LazyImage';

export function Diferencial({ data }) {
  return (
    <section id="diferencial" className="py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nossos Diferenciais
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            O que nos torna únicos na advocacia especializada
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, index) => {
            const IconComponent = Icons[item.icone] || Icons.Star;
            
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              >
                {item.imagem_url && (
                  <LazyImage
                    src={item.imagem_url}
                    alt={item.titulo}
                    className="h-40 rounded-lg mb-6"
                  />
                )}
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <IconComponent size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{item.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{item.descricao}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

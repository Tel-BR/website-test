import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LazyImage } from '../ui/LazyImage';

export function Services({ data }) {
  return (
    <section id="servicos" className="py-24 bg-[#F0F4F8]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Áreas de Atuação
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expertise especializada para defender seus direitos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((service, index) => {
            const IconComponent = Icons[service.icone] || Icons.Briefcase;
            
            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {service.imagem_url && (
                  <LazyImage
                    src={service.imagem_url}
                    alt={service.titulo}
                    className="h-48"
                  />
                )}
                <div className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{service.titulo}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.descricao}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

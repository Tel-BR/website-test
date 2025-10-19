import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function Testimonials({ data }) {
  return (
    <section
      id="depoimentos"
      className="py-24 relative"
      style={{
        background: 'linear-gradient(135deg, #003B7A 0%, #004A9C 100%)'
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            O Que Dizem Nossos Clientes
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Resultados comprovados e satisfação garantida
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                {testimonial.avatar_url && (
                  <img
                    src={testimonial.avatar_url}
                    alt={testimonial.autor}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h4 className="font-bold text-primary">{testimonial.autor}</h4>
                  <p className="text-sm text-gray-600">{testimonial.cargo}</p>
                </div>
              </div>
              
              {testimonial.nota && (
                <div className="flex gap-1 mb-4">
                  {[...Array(parseInt(testimonial.nota))].map((_, i) => (
                    <Star key={i} size={18} className="fill-accent text-accent" />
                  ))}
                </div>
              )}
              
              <p className="text-gray-700 leading-relaxed italic">"{testimonial.texto}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

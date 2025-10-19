import { motion } from 'framer-motion';
import { LazyImage } from '../ui/LazyImage';
import { Trophy, TrendingUp, CheckCircle } from 'lucide-react';

export function Portfolio({ data }) {
  return (
    <section id="portfolio" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="text-accent" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Casos de Sucesso
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resultados expressivos conquistados para nossos clientes
          </p>
        </motion.div>

        {/* Layout em Timeline alternado */}
        <div className="max-w-6xl mx-auto">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className={`flex flex-col lg:flex-row gap-8 mb-16 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Imagem */}
              <div className="lg:w-1/2">
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl group"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.imagem_url && (
                    <LazyImage
                      src={item.imagem_url}
                      alt={item.titulo}
                      className="h-80 lg:h-96"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badge resultado flutuante */}
                  {item.resultado && (
                    <div className="absolute bottom-4 right-4 bg-accent text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      <TrendingUp size={16} className="inline mr-2" />
                      {item.resultado}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Conteúdo */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit">
                  {item.categoria}
                </span>
                
                <h3 className="text-3xl font-bold text-primary mb-4 leading-tight">
                  {item.titulo}
                </h3>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {item.descricao}
                </p>
                
                {/* Tags */}
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.split('|').map((tag, i) => (
                      <span key={i} className="flex items-center gap-1 text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-lg shadow-sm">
                        <CheckCircle size={14} className="text-accent" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Resultado destacado */}
                {item.resultado && (
                  <div className="bg-gradient-to-r from-accent/10 to-transparent border-l-4 border-accent p-4 rounded-r-lg">
                    <p className="text-primary font-bold text-lg">
                      ⚖️ Resultado: <span className="text-accent">{item.resultado}</span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

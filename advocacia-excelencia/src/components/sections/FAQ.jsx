import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-primary text-lg pr-4">
                  {item.pergunta}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                  {item.resposta}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

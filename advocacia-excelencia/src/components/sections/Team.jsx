import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export function Team({ data }) {
  return (
    <section id="equipe" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nosso Corpo Jurídico
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advogados especializados e comprometidos com sua causa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {member.imagem_url && (
                <img
                  src={member.imagem_url}
                  alt={member.nome}
                  className="w-full h-80 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">{member.nome}</h3>
                <p className="text-secondary font-semibold mb-2">{member.cargo}</p>
                <p className="text-gray-600 mb-4">{member.especialidade}</p>
                {member.telefone && (
                  <a
                    href={`tel:${member.telefone}`}
                    className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                  >
                    <Phone size={18} />
                    <span>{member.telefone}</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

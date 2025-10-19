import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

export function Contact({ config }) {
  return (
    <section
      id="contato"
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
            Entre em Contato
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Agende sua consulta gratuita e descubra como podemos ajudá-lo
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              
              {config?.email && (
                <div className="flex items-start gap-4 mb-6">
                  <Mail size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href={`mailto:${config.email}`} className="hover:text-accent transition-colors">
                      {config.email}
                    </a>
                  </div>
                </div>
              )}

              {config?.whatsapp && (
                <div className="flex items-start gap-4 mb-6">
                  <Phone size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">WhatsApp</p>
                    <a
                      href={`https://wa.me/${config.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      +{config.whatsapp}
                    </a>
                  </div>
                </div>
              )}

              {config?.endereco && (
                <div className="flex items-start gap-4 mb-6">
                  <MapPin size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Endereço</p>
                    <p className="text-white/90">{config.endereco}</p>
                  </div>
                </div>
              )}

              {config?.horario && (
                <div className="flex items-start gap-4">
                  <Clock size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Horário</p>
                    <p className="text-white/90">{config.horario}</p>
                  </div>
                </div>
              )}
            </div>

            {config?.outrosContatos && (
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-white">
                <h4 className="text-xl font-bold mb-4">Nossa Equipe</h4>
                <div className="space-y-2 text-white/90">
                  {config.outrosContatos.split('|').map((contato, i) => (
                    <p key={i} className="text-sm">{contato.trim()}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Google Maps */}
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8976!2d-49.2519!3d-16.6869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQxJzEyLjgiUyA0OcKwMTUnMDYuOCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Localização Advocacia de Excelência"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-2xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              action="https://formsubmit.co/advocaciadeexcelenciaservidor@gmail.com"
              method="POST"
              className="space-y-6"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Nova mensagem do site!" />
              
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                ></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

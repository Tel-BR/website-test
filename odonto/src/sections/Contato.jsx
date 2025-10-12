import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contato({ config }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');

    try {
      const response = await fetch('https://formsubmit.co/ajax/' + config.email, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          phone: formData.telefone,
          message: formData.mensagem,
          _subject: `Novo contato do site - ${config.siteName}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setStatus('sucesso');
        setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('erro');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setStatus('erro');
    }
  };

  const bgStyle = config.contato_bg || '';

  const getBackgroundStyle = () => {
    if (bgStyle.startsWith('gradient:auto')) {
      return {
        background: `linear-gradient(135deg, ${config.primaryColor}08 0%, ${config.accentColor}08 100%)`
      };
    } else if (bgStyle.startsWith('solid:auto')) {
      return {
        backgroundColor: `${config.secondaryColor}05`
      };
    } else if (bgStyle.startsWith('http')) {
      return {
        backgroundImage: `url(${bgStyle})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    return { backgroundColor: '#f9fafb' };
  };

  return (
    <section id="contato" className="py-20" style={getBackgroundStyle()}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos prontos para atender você. Agende sua consulta agora!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulário */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': config.primaryColor }}
                  onFocus={(e) => e.target.style.borderColor = config.primaryColor}
                  onBlur={(e) => e.target.style.borderColor = ''}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                  onFocus={(e) => e.target.style.borderColor = config.primaryColor}
                  onBlur={(e) => e.target.style.borderColor = ''}
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  required
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                  onFocus={(e) => e.target.style.borderColor = config.primaryColor}
                  onBlur={(e) => e.target.style.borderColor = ''}
                />
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows="4"
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all resize-none"
                  onFocus={(e) => e.target.style.borderColor = config.primaryColor}
                  onBlur={(e) => e.target.style.borderColor = ''}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'enviando'}
                className="w-full px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                style={{ backgroundColor: config.accentColor }}
              >
                {status === 'enviando' ? (
                  'Enviando...'
                ) : (
                  <>
                    Enviar Mensagem
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>

              {status === 'sucesso' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                  ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}

              {status === 'erro' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  ✗ Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.
                </div>
              )}
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-6">
                {config.endereco && (
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: `${config.primaryColor}20` }}>
                      <MapPin className="w-6 h-6" style={{ color: config.primaryColor }} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Endereço</div>
                      <div className="text-gray-600">{config.endereco}</div>
                    </div>
                  </div>
                )}

                {config.whatsapp && (
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: `${config.primaryColor}20` }}>
                      <Phone className="w-6 h-6" style={{ color: config.primaryColor }} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">WhatsApp</div>
                      <a 
                        href={`https://wa.me/${config.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:underline"
                      >
                        Clique para conversar
                      </a>
                    </div>
                  </div>
                )}

                {config.email && (
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: `${config.primaryColor}20` }}>
                      <Mail className="w-6 h-6" style={{ color: config.primaryColor }} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">E-mail</div>
                      <a 
                        href={`mailto:${config.email}`}
                        className="text-gray-600 hover:underline"
                      >
                        {config.email}
                      </a>
                    </div>
                  </div>
                )}

                {config.horario && (
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: `${config.primaryColor}20` }}>
                      <Clock className="w-6 h-6" style={{ color: config.primaryColor }} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Horário</div>
                      <div className="text-gray-600">
                        {config.horario.split(',').map((linha, index) => (
                          <div key={index}>{linha.trim()}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mapa */}
            {config.endereco && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-64">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(config.endereco)}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Sparkles, Smile, Drill, Baby, Wrench, Heart, Zap, Shield, Clock } from 'lucide-react';

const iconMap = {
  Sparkles, Smile, Drill, Baby, Wrench, Heart, Zap, Shield, Clock
};

export default function Servicos({ data, config }) {
  if (!data || data.length === 0) return null;

  const bgStyle = config.servicos_bg || 'solid:auto';

  const getBackgroundStyle = () => {
    if (bgStyle.startsWith('gradient:auto')) {
      return {
        background: `linear-gradient(135deg, ${config.primaryColor}08 0%, ${config.accentColor}08 100%)`
      };
    } else if (bgStyle.startsWith('solid:auto')) {
      return {
        backgroundColor: '#ffffff'
      };
    } else if (bgStyle.startsWith('http')) {
      return {
        backgroundImage: `url(${bgStyle})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    return { backgroundColor: '#ffffff' };
  };

  return (
    <section id="servicos" className="py-20" style={getBackgroundStyle()}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos uma gama completa de tratamentos odontológicos com tecnologia de ponta e profissionais especializados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((servico, index) => {
            const Icon = iconMap[servico.icone] || Smile;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div 
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${config.primaryColor}20` }}
                >
                  <Icon className="w-7 h-7" style={{ color: config.primaryColor }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {servico.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {servico.descricao}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contato"
            className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: config.accentColor }}
          >
            Agendar Consulta
          </a>
        </div>
      </div>
    </section>
  );
}

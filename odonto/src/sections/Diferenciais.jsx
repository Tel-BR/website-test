import { Heart, Cpu, CreditCard, Shield, Award, Zap } from 'lucide-react';

const iconMap = {
  Heart, Cpu, CreditCard, Shield, Award, Zap
};

export default function Diferenciais({ data, config }) {
  if (!data || data.length === 0) return null;

  const bgStyle = config.diferencial_bg || '';

  const getBackgroundStyle = () => {
    if (bgStyle.startsWith('gradient:auto')) {
      return {
        background: `linear-gradient(135deg, ${config.primaryColor}10 0%, ${config.accentColor}10 100%)`
      };
    } else if (bgStyle.startsWith('solid:auto')) {
      return {
        backgroundColor: `${config.secondaryColor}08`
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
    <section id="diferenciais" className="py-20" style={getBackgroundStyle()}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Diferenciais
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            O que nos torna únicos e a melhor escolha para cuidar do seu sorriso
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.map((item, index) => {
            const Icon = iconMap[item.icone] || Heart;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group"
              >
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${config.accentColor}20` }}
                >
                  <Icon className="w-8 h-8" style={{ color: config.accentColor }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.descricao}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

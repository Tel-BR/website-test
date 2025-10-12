import { Award, Medal, Star, Calendar, Users, ThumbsUp, Stethoscope } from 'lucide-react';

const iconMap = {
  Award, Medal, Star, Calendar, Users, ThumbsUp, Stethoscope
};

export default function Sobre({ data, numerosData, premiosData, config }) {
  if (!data || data.length === 0) return null;
  
  const sobre = data[0];
  const bgStyle = config.sobre_bg || 'solid:auto';

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
    return {};
  };

  return (
    <section id="sobre" className="py-20" style={getBackgroundStyle()}>
      <div className="container mx-auto px-4">
        {/* Sobre */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <img
              src={sobre.imagem_url || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80'}
              alt={sobre.titulo}
              className="rounded-2xl shadow-xl w-full h-auto"
              loading="lazy"
            />
            <div 
              className="absolute -top-6 -left-6 w-64 h-64 rounded-full opacity-20 blur-3xl -z-10"
              style={{ backgroundColor: config.primaryColor }}
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {sobre.titulo}
            </h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              {sobre.descricao?.split('\n\n').map((paragrafo, index) => (
                <p key={index}>{paragrafo}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Números */}
        {numerosData && numerosData.length > 0 && (
          <div className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {numerosData.map((item, index) => {
                const Icon = iconMap[item.icone] || Users;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                         style={{ backgroundColor: `${config.accentColor}20` }}>
                      <Icon className="w-8 h-8" style={{ color: config.accentColor }} />
                    </div>
                    <div className="text-4xl font-bold mb-2" style={{ color: config.primaryColor }}>
                      {item.numero}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Prêmios */}
        {premiosData && premiosData.length > 0 && (
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
              Reconhecimentos e Certificações
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {premiosData.map((premio, index) => {
                const Icon = iconMap[premio.icone] || Award;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                         style={{ backgroundColor: `${config.primaryColor}20` }}>
                      <Icon className="w-7 h-7" style={{ color: config.primaryColor }} />
                    </div>
                    <div className="text-sm font-semibold mb-2" style={{ color: config.accentColor }}>
                      {premio.ano}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {premio.titulo}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {premio.descricao}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

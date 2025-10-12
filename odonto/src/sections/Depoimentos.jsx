import { Quote } from 'lucide-react';

export default function Depoimentos({ data, config }) {
  if (!data || data.length === 0) return null;

  const bgStyle = config.depoimentos_bg || 'gradient:auto';

  const getBackgroundStyle = () => {
    if (bgStyle.startsWith('gradient:auto')) {
      return {
        background: `linear-gradient(135deg, ${config.primaryColor}15 0%, ${config.accentColor}15 100%)`
      };
    } else if (bgStyle.startsWith('solid:auto')) {
      return {
        backgroundColor: `${config.secondaryColor}10`
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
    <section id="depoimentos" className="py-20" style={getBackgroundStyle()}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O Que Nossos Pacientes Dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Depoimentos reais de quem confia em nosso trabalho
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.map((depoimento, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-6">
                <Quote className="w-10 h-10" style={{ color: config.accentColor, opacity: 0.3 }} />
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{depoimento.texto}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                     style={{ backgroundColor: config.primaryColor }}>
                  {depoimento.autor.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">
                    {depoimento.autor}
                  </div>
                  <div className="text-sm text-gray-500">
                    {depoimento.cargo}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

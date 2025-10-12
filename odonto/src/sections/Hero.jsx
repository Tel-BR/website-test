import { ArrowRight } from 'lucide-react';

export default function Hero({ data, config }) {
  if (!data || data.length === 0) return null;
  
  const hero = data[0];
  const bgStyle = config.home_bg || 'gradient:auto';

  const getBackgroundStyle = () => {
    if (bgStyle.startsWith('gradient:auto')) {
      return {
        background: `linear-gradient(135deg, ${config.primaryColor}15 0%, ${config.accentColor}15 100%)`
      };
    } else if (bgStyle.startsWith('solid:auto')) {
      return {
        backgroundColor: `${config.primaryColor}10`
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
    <section id="home" className="pt-32 pb-20 min-h-screen flex items-center" style={getBackgroundStyle()}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {hero.titulo}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {hero.subtitulo}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={hero.cta_link || '#contato'}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group"
                style={{ backgroundColor: config.accentColor }}
              >
                {hero.cta_texto || 'Agendar Consulta'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`https://wa.me/${config.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 hover:shadow-lg"
                style={{ 
                  borderColor: config.primaryColor,
                  color: config.primaryColor
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = config.primaryColor;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = config.primaryColor;
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Imagem */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={hero.imagem_url || "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80"}
                alt={hero.imagem_alt || config.siteName}
                className="w-full h-auto"
                loading="eager"
              />
            </div>
            {/* Decoração */}
            <div 
              className="absolute -bottom-6 -right-6 w-72 h-72 rounded-full opacity-20 blur-3xl -z-10"
              style={{ backgroundColor: config.accentColor }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

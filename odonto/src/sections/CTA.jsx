import { ArrowRight } from 'lucide-react';

export default function CTA({ data, config }) {
  if (!data || data.length === 0) return null;
  
  const cta = data[0];

  return (
    <section className="py-20" style={{ 
      background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)` 
    }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {cta.titulo}
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-95">
            {cta.descricao}
          </p>
          <a
            href={cta.cta_link || '#contato'}
            className="inline-flex items-center px-8 py-4 rounded-full font-semibold bg-white transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
            style={{ color: config.primaryColor }}
          >
            {cta.cta_texto || 'Agendar Agora'}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

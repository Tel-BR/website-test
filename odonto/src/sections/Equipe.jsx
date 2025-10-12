export default function Equipe({ data, config }) {
  if (!data || data.length === 0) return null;

  const bgStyle = config.equipe_bg || '';

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
    <section id="equipe" className="py-20" style={getBackgroundStyle()}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossa Equipe
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Profissionais altamente qualificados e dedicados ao seu bem-estar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((membro, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={membro.foto_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80'}
                  alt={membro.nome}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {membro.nome}
                </h3>
                <div className="text-sm font-semibold mb-1" style={{ color: config.accentColor }}>
                  {membro.cargo}
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  {membro.especialidade}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {membro.descricao}
                </p>
                {membro.croDentista && (
                  <div className="text-xs text-gray-500 font-medium">
                    {membro.croDentista}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer({ config }) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, url: config.facebookUrl, label: 'Facebook' },
    { icon: Instagram, url: `https://instagram.com/${config.instagramPerfil?.replace('@', '')}`, label: 'Instagram' },
    { icon: Linkedin, url: config.linkedinUrl, label: 'LinkedIn' },
    { icon: Youtube, url: config.youtubeUrl, label: 'YouTube' }
  ].filter(link => link.url && link.url !== '');

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              {config.logoUrl ? (
                <img 
                  src={config.logoUrl} 
                  alt={config.siteName}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: config.primaryColor }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-secondary font-bold text-xl text-white">
                    {config.siteName}
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {config.tagline}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label={social.label}
                    style={{ '--hover-color': config.primaryColor }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = config.primaryColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-secondary font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-sm hover:text-white transition-colors">Início</a></li>
              <li><a href="#sobre" className="text-sm hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#servicos" className="text-sm hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#equipe" className="text-sm hover:text-white transition-colors">Equipe</a></li>
              <li><a href="#faq" className="text-sm hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contato" className="text-sm hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-secondary font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              {config.endereco && (
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: config.accentColor }} />
                  <span className="text-sm">{config.endereco}</span>
                </li>
              )}
              {config.whatsapp && (
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 flex-shrink-0" style={{ color: config.accentColor }} />
                  <a href={`https://wa.me/${config.whatsapp}`} className="text-sm hover:text-white transition-colors">
                    WhatsApp
                  </a>
                </li>
              )}
              {config.email && (
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 flex-shrink-0" style={{ color: config.accentColor }} />
                  <a href={`mailto:${config.email}`} className="text-sm hover:text-white transition-colors">
                    {config.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Horário */}
          <div>
            <h3 className="font-secondary font-semibold text-white mb-4">Horário de Atendimento</h3>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: config.accentColor }} />
              <div className="text-sm">
                {config.horario?.split(',').map((linha, index) => (
                  <div key={index}>{linha.trim()}</div>
                ))}
              </div>
            </div>
            {config.outrosContatos && (
              <div className="mt-4 text-sm text-gray-400">
                {config.outrosContatos}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} {config.siteName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

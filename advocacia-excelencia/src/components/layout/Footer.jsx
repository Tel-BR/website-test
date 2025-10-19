import { Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer({ config }) {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{config?.siteName}</h3>
            <p className="text-white/80 mb-6">
              {config?.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#sobre" className="text-white/80 hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#servicos" className="text-white/80 hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#portfolio" className="text-white/80 hover:text-white transition-colors">Portfólio</a></li>
              <li><a href="#equipe" className="text-white/80 hover:text-white transition-colors">Equipe</a></li>
              <li><a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              {config?.email && (
                <li className="flex items-start gap-2">
                  <Mail size={20} className="mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${config.email}`} className="text-white/80 hover:text-white transition-colors">
                    {config.email}
                  </a>
                </li>
              )}
              {config?.endereco && (
                <li className="flex items-start gap-2">
                  <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{config.endereco}</span>
                </li>
              )}
              {config?.horario && (
                <li className="flex items-start gap-2">
                  <Clock size={20} className="mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{config.horario}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              {config?.facebookUrl && (
                <a href={config.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <Facebook size={24} />
                </a>
              )}
              {config?.instagramPerfil && (
                <a href={`https://instagram.com/${config.instagramPerfil.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <Instagram size={24} />
                </a>
              )}
              {config?.linkedinUrl && (
                <a href={config.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
              )}
              {config?.youtubeUrl && (
                <a href={config.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <Youtube size={24} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} {config?.siteName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

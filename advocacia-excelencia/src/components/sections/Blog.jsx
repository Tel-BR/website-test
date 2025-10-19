import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { LazyImage } from '../ui/LazyImage';

export function Blog({ data }) {
  const featuredPost = data[0];
  const otherPosts = data.slice(1);

  return (
    <section id="blog" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-accent" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Blog Jurídico
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conteúdo especializado para você estar sempre informado
          </p>
        </motion.div>

        {/* Post em Destaque (Featured) */}
        {featuredPost && (
          <motion.a
            href={featuredPost.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-16 group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 bg-gradient-to-br from-primary to-primary/90 rounded-3xl overflow-hidden shadow-2xl">
              {/* Imagem */}
              <div className="relative h-96 lg:h-auto overflow-hidden">
                {featuredPost.imagem_url && (
                  <LazyImage
                    src={featuredPost.imagem_url}
                    alt={featuredPost.titulo}
                    className="h-full group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-4 left-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Em Destaque
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-8 lg:p-12 flex flex-col justify-center text-white">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit">
                  {featuredPost.categoria}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-accent transition-colors">
                  {featuredPost.titulo}
                </h3>
                
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  {featuredPost.resumo}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-6">
                  {featuredPost.data && (
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>{new Date(featuredPost.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                  {featuredPost.autor && (
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      <span>{featuredPost.autor}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                  Ler artigo completo <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </motion.a>
        )}

        {/* Grid de Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post, index) => (
            <motion.a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Imagem com overlay */}
              <div className="relative h-56 overflow-hidden">
                {post.imagem_url && (
                  <LazyImage
                    src={post.imagem_url}
                    alt={post.titulo}
                    className="h-full group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Categoria badge */}
                <span className="absolute bottom-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                  {post.categoria}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                  {post.titulo}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.resumo}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {post.data && (
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                      </div>
                    )}
                    {post.autor && (
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.autor}</span>
                      </div>
                    )}
                  </div>
                  
                  <ArrowRight size={18} className="text-accent group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { useConfig, useSingleSheet } from './hooks/useGoogleSheets';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Diferencial } from './components/sections/Diferencial';
import { Testimonials } from './components/sections/Testimonials';
import { Team } from './components/sections/Team';
import { Portfolio } from './components/sections/Portfolio';
import { Blog } from './components/sections/Blog';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { SkeletonCard } from './components/ui/Skeleton';

function App() {
  const [loadPhase, setLoadPhase] = useState(1);
  const { config, loading: configLoading } = useConfig();
  
  // Phase 1: Critical (Hero)
  const { data: homeData, loading: homeLoading } = useSingleSheet('home', config);
  
  // Phase 2: Above fold
  const { data: sobreData } = useSingleSheet('sobre', config);
  const { data: servicosData } = useSingleSheet('servicos', config);
  const { data: diferencialData } = useSingleSheet('diferencial', config);
  
  // Phase 3: Below fold
  const { data: depoimentosData } = useSingleSheet('depoimentos', config);
  const { data: equipeData } = useSingleSheet('equipe', config);
  const { data: portfolioData } = useSingleSheet('portfolio', config);
  const { data: blogData } = useSingleSheet('blog', config);
  const { data: faqData } = useSingleSheet('faq', config);

  useEffect(() => {
    if (!configLoading && !homeLoading) {
      // Phase 1 loaded
      setTimeout(() => setLoadPhase(2), 100);
      
      // Phase 2 loaded
      setTimeout(() => setLoadPhase(3), 500);
    }
  }, [configLoading, homeLoading]);

  // Apply custom colors from config
  useEffect(() => {
    if (config) {
      const root = document.documentElement;
      if (config.primaryColor) root.style.setProperty('--color-primary', config.primaryColor);
      if (config.secondaryColor) root.style.setProperty('--color-secondary', config.secondaryColor);
      if (config.accentColor) root.style.setProperty('--color-accent', config.accentColor);
      
      // Update favicon
      if (config.faviconUrl) {
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) favicon.href = config.faviconUrl;
      }
      
      // Update title
      if (config.siteName) {
        document.title = config.siteName;
      }
    }
  }, [config]);

  if (configLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header config={config} />
      
      {/* PHASE 1: Hero (Critical) */}
      <Hero data={homeData} config={config} />
      
      {/* PHASE 2: Above Fold */}
      {loadPhase >= 2 && (
        <>
          {sobreData?.length > 0 && <About data={sobreData} />}
          
          {diferencialData?.length > 0 && <Diferencial data={diferencialData} />}
          
          {servicosData?.length > 0 ? (
            <Services data={servicosData} />
          ) : (
            <section className="py-24 bg-[#F0F4F8]">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            </section>
          )}
        </>
      )}
      
      {/* PHASE 3: Below Fold */}
      {loadPhase >= 3 && (
        <>
          {portfolioData?.length > 0 && <Portfolio data={portfolioData} />}
          {depoimentosData?.length > 0 && <Testimonials data={depoimentosData} />}
          {equipeData?.length > 0 && <Team data={equipeData} />}
          {blogData?.length > 0 && <Blog data={blogData} />}
          {faqData?.length > 0 && <FAQ data={faqData} />}
          <Contact config={config} />
        </>
      )}
      
      <Footer config={config} />
      <WhatsAppButton phone={config?.whatsapp} />
    </div>
  );
}

export default App;

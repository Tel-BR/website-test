import { useState, useEffect } from 'react';
import { loadConfig, loadSection } from './utils/sheetsLoader';
import Header from './components/Header';
import Footer from './components/Footer';
import SectionSkeleton from './components/SectionSkeleton';
import Hero from './sections/Hero';
import Sobre from './sections/Sobre';
import Diferenciais from './sections/Diferenciais';
import Servicos from './sections/Servicos';
import Equipe from './sections/Equipe';
import Depoimentos from './sections/Depoimentos';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Contato from './sections/Contato';

function App() {
  const [config, setConfig] = useState(null);
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // FASE 1: Carregar config e hero (viewport inicial)
        const configData = await loadConfig();
        setConfig(configData);

        // Carregar apenas o Hero para mostrar algo rapidamente
        const homeData = await loadSection(configData.home_GID);
        setSections(prev => ({ ...prev, home: homeData }));
        
        // Liberar a tela (remover loading)
        setLoading(false);

        if (import.meta.env.DEV) {
          console.log('[App] Fase 1 completa - Hero carregado');
        }

        // FASE 2: Carregar seções acima da dobra (background)
        Promise.all([
          loadSection(configData.sobre_GID),
          loadSection(configData.diferencial_GID),
          loadSection('1909706945'), // numeros_GID
          loadSection('1664987429')  // premios_GID
        ]).then(([sobreData, diferencialData, numerosData, premiosData]) => {
          setSections(prev => ({
            ...prev,
            sobre: sobreData,
            diferencial: diferencialData,
            numeros: numerosData,
            premios: premiosData
          }));
          
          if (import.meta.env.DEV) {
            console.log('[App] Fase 2 completa - Sobre/Diferenciais carregados');
          }
        });

        // FASE 3: Carregar restante (lazy)
        Promise.all([
          loadSection(configData.servicos_GID),
          loadSection(configData.equipe_GID),
          loadSection(configData.depoimentos_GID),
          loadSection(configData.faq_GID),
          loadSection(configData.cta_GID)
        ]).then(([servicosData, equipeData, depoimentosData, faqData, ctaData]) => {
          setSections(prev => ({
            ...prev,
            servicos: servicosData,
            equipe: equipeData,
            depoimentos: depoimentosData,
            faq: faqData,
            cta: ctaData
          }));
          
          if (import.meta.env.DEV) {
            console.log('[App] Fase 3 completa - Todas as seções carregadas');
          }
        });

        // FASE 4: SEO (não bloqueia nada)
        if (configData.seo_GID) {
          loadSection(configData.seo_GID).then(seoData => {
            if (seoData.length > 0) {
              const seo = seoData[0];
              document.title = seo.metaTitle || configData.siteName;
              
              let metaDesc = document.querySelector('meta[name="description"]');
              if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
              }
              metaDesc.content = seo.metaDescription || '';

              // Open Graph
              const ogTags = [
                { property: 'og:title', content: seo.ogTitle || seo.metaTitle },
                { property: 'og:description', content: seo.ogDescription || seo.metaDescription },
                { property: 'og:image', content: seo.ogImage || '' }
              ];

              ogTags.forEach(tag => {
                let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
                if (!ogTag) {
                  ogTag = document.createElement('meta');
                  ogTag.setAttribute('property', tag.property);
                  document.head.appendChild(ogTag);
                }
                ogTag.content = tag.content;
              });
            }
          });
        }

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-cyan-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-medium">Erro ao carregar configurações</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header config={config} />
      
      <main>
        <Hero data={sections.home} config={config} />
        
        {sections.sobre ? (
          <Sobre 
            data={sections.sobre} 
            numerosData={sections.numeros}
            premiosData={sections.premios}
            config={config} 
          />
        ) : (
          <SectionSkeleton type="default" />
        )}
        
        {sections.diferencial ? (
          <Diferenciais data={sections.diferencial} config={config} />
        ) : (
          <SectionSkeleton type="cards" />
        )}
        
        {sections.servicos ? (
          <Servicos data={sections.servicos} config={config} />
        ) : (
          <SectionSkeleton type="cards" />
        )}
        
        {sections.equipe ? (
          <Equipe data={sections.equipe} config={config} />
        ) : (
          <SectionSkeleton type="cards" />
        )}
        
        {sections.depoimentos ? (
          <Depoimentos data={sections.depoimentos} config={config} />
        ) : (
          <SectionSkeleton type="cards" />
        )}
        
        {sections.faq ? (
          <FAQ data={sections.faq} config={config} />
        ) : (
          <SectionSkeleton type="default" />
        )}
        
        {sections.cta && <CTA data={sections.cta} config={config} />}
        
        <Contato config={config} />
      </main>

      <Footer config={config} />
    </div>
  );
}

export default App;

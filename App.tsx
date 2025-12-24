import React, { useState, useEffect } from 'react';
import { Icons } from './components/Icons';
import Terminal from './components/Terminal';
import { USER_INFO, SOCIAL_LINKS, PROJECTS } from './constants';
import { Page, Project } from './types';

const SkillGroup = ({ icon, title, skills }: { icon: React.ReactNode, title: string, skills: string[] }) => (
  <div className="bg-cyber-gray/20 p-4 rounded border border-gray-800 hover:border-gray-700 transition-colors">
    <div className="flex items-center gap-2 mb-3 text-gray-300 font-bold">{icon}<span>{title}</span></div>
    <ul className="space-y-1">
      {skills.map((s, i) => (
        <li key={i} className="text-sm text-gray-500 font-mono flex items-center gap-2">
          <span className="w-1 h-1 bg-cyber-green/50 rounded-full"></span>{s}
        </li>
      ))}
    </ul>
  </div>
);

const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => (
  <div onClick={onClick} className="bg-cyber-black border border-gray-800 rounded-lg p-6 hover:border-cyber-green transition-all cursor-pointer group h-full flex flex-col relative overflow-hidden">
     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 text-white">
       {project.category === 'project' ? <Icons.Folder width={40} height={40} /> : <Icons.FileText width={40} height={40} />}
     </div>
     <div className="flex items-center gap-2 mb-4">
       <span className={`text-xs px-2 py-1 rounded border font-mono ${project.category === 'project' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5'}`}>{project.category === 'project' ? 'PROJE' : 'MAKALE'}</span>
       <span className="text-xs text-gray-500 flex items-center gap-1 font-mono"><Icons.Calendar width={12} height={12} />{project.date}</span>
     </div>
     <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-green transition-colors">{project.title}</h3>
     <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1">{project.description}</p>
     <div className="flex flex-wrap gap-2 mt-auto">
       {project.tags.map(t => <span key={t} className="text-xs text-gray-400 bg-gray-900 border border-gray-800 px-2 py-1 rounded flex items-center gap-1 font-mono"><Icons.Tag width={10} height={10} />{t}</span>)}
     </div>
  </div>
);

const App = () => {
  const [route, setRoute] = useState<{ page: Page, id: string | null }>({ page: 'home', id: null });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const parts = hash.split('/');
      
      if (parts[0] === '' || !parts[0]) {
        setRoute({ page: 'home', id: null });
      } else if (parts[0] === 'project' && parts[1]) {
        setRoute({ page: 'project-detail', id: parts[1] });
      } else {
        setRoute({ page: parts[0] as Page, id: null });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: Page, id: string | null = null) => {
    // threat-intel için özel kontrol:
    // Bu sayfa ayrı bir klasörde olduğu için window.location.href ile tam yönlendirme yapıyoruz.
    if (page === 'threat-intel') {
      window.location.href = '/threat-intel/';
      return;
    }
    
    if (page === 'home') window.location.hash = '/';
    else if (page === 'project-detail' && id) window.location.hash = `/project/${id}`;
    else window.location.hash = `/${page}`;
  };

  const navClass = (p: Page) => `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${route.page === p ? 'bg-cyber-gray text-cyber-green border border-cyber-green/30' : 'text-gray-300 hover:text-white'}`;

  const selectedProject = route.id ? PROJECTS.find(p => p.id === route.id) : null;

  const renderHome = () => (
    <div className="flex flex-col justify-between min-h-[80vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full mb-10 flex-1">
        <div className="order-2 lg:order-1 space-y-8 animate-fade-in">
          <div>
            <h2 className="text-cyber-green font-mono text-sm mb-2 flex items-center gap-2"><span className="w-2 h-2 bg-cyber-green animate-pulse rounded-full"></span>ROOT_ACCESS_GRANTED</h2>
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4">{USER_INFO.name}</h1>
            <p className="text-gray-400 font-mono text-sm">/home/berke/security-researcher</p>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed border-l-2 border-cyber-green/30 pl-4">{USER_INFO.bio}</p>
          <div className="flex gap-4">
            <button onClick={() => navigate('projects')} className="bg-cyber-green text-black px-6 py-3 font-mono font-bold rounded flex items-center gap-2 hover:bg-green-400 transition-colors">Blog <Icons.ArrowRight width={18} height={18} /></button>
            <button onClick={() => navigate('contact')} className="border border-cyber-green text-cyber-green px-6 py-3 font-mono font-bold rounded hover:bg-cyber-green/10 transition-colors">Bağlantı Kur</button>
          </div>
        </div>
        <div className="order-1 lg:order-2 flex justify-center w-full">
          <Terminal lines={USER_INFO.terminalIntro} onNavigate={(p) => navigate(p)} />
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 mt-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
         <div className="flex items-center gap-2 mb-6 text-gray-500 font-mono text-xs uppercase tracking-widest"><Icons.Terminal width={14} height={14} /> :: Teknik Envanter ::</div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           <SkillGroup icon={<Icons.Shield width={20} height={20} />} title="Güvenlik" skills={['Penetrasyon Testi', 'Malware Analizi', 'OWASP']} />
           <SkillGroup icon={<Icons.Hash width={20} height={20} />} title="Diller/Scripting" skills={['Python', 'Bash', 'PowerShell/VBS']} />
           <SkillGroup icon={<Icons.Server width={20} height={20} />} title="Sistem" skills={['Linux', 'Docker', 'Git']} />
           <SkillGroup icon={<Icons.Globe width={20} height={20} />} title="Araçlar" skills={['Wireshark', 'Splunk', 'Nmap']} />
         </div>
      </div>
    </div>
  );

  const renderProjects = () => {
    if (route.page === 'project-detail' && selectedProject) {
      return (
        <div className="max-w-4xl mx-auto pt-10 animate-fade-in">
          <button onClick={() => navigate('projects')} className="flex items-center gap-2 text-cyber-green hover:text-white mb-6 font-mono"><Icons.ArrowLeft width={16} height={16} /> Listeye Dön</button>
          <article className="bg-cyber-black border border-gray-800 rounded-lg p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
            <header className="mb-8 border-b border-gray-800 pb-8 relative z-10">
               <span className={`text-xs px-2 py-1 rounded border mb-4 inline-block ${selectedProject.category === 'project' ? 'border-blue-500/30 text-blue-400' : 'border-yellow-500/30 text-yellow-400'}`}>{selectedProject.category === 'project' ? 'PROJE' : 'MAKALE'}</span>
               <h1 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h1>
               <p className="text-gray-400">{selectedProject.description}</p>
            </header>
            <div className="formatted-content text-gray-300 font-mono mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedProject.content }} />
            {selectedProject.image && (
                <div className="mt-8 relative group rounded-lg overflow-hidden border border-cyber-gray/50 bg-black/40">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-green to-transparent opacity-50"></div>
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-cyber-green/5 pointer-events-none opacity-30 bg-[length:100%_4px] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)]"></div>
                </div>
            )}
            {selectedProject.github && (
              <div className="mt-8 pt-8 border-t border-gray-800">
                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded w-max hover:bg-gray-700 transition-colors"><Icons.Github width={20} height={20} /> GitHub Reposu</a>
              </div>
            )}
          </article>
        </div>
      );
    }
    return (
      <div className="pt-10 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 flex justify-center items-center gap-3"><Icons.Terminal width={32} height={32} className="text-cyber-green" /> Veri Arşivi</h1>
          <p className="text-gray-400">Projelerim, araştırmalarım ve teknik blog yazılarım.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map(p => <div key={p.id}><ProjectCard project={p} onClick={() => navigate('project-detail', p.id)} /></div>)}
        </div>
      </div>
    );
  };

  const renderContact = () => (
    <div className="max-w-3xl mx-auto pt-20 flex flex-col justify-center min-h-[60vh] animate-fade-in">
       <div className="bg-cyber-black border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-cyber-green/5 rounded-full blur-3xl"></div>
         <div className="relative z-10">
           <h1 className="text-4xl font-bold text-white mb-6">Bağlantı Kur</h1>
           <div className="grid grid-cols-1 gap-4">
             {SOCIAL_LINKS.map(link => (
               <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-800 rounded hover:border-cyber-green hover:bg-gray-900 transition-all group">
                 <div className="flex items-center gap-4 text-white">
                   {link.icon === 'github' && <Icons.Github width={20} height={20} />}
                   {link.icon === 'linkedin' && <Icons.Linkedin width={20} height={20} />}
                   {link.icon === 'mail' && <Icons.Mail width={20} height={20} />}
                   <div><div className="font-medium">{link.name}</div><div className="text-gray-500 text-sm">{link.username}</div></div>
                 </div>
                 <Icons.ExternalLink width={18} height={18} />
               </a>
             ))}
           </div>
         </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-text font-sans">
      <nav className="fixed top-0 w-full z-50 bg-cyber-black/90 backdrop-blur border-b border-cyber-gray">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('home')}>
            <Icons.Shield width={24} height={24} />
            <span className="font-mono font-bold text-lg text-white group-hover:text-cyber-green transition-colors">BERKE<span className="text-cyber-green group-hover:text-white transition-colors">BODUR</span></span>
          </div>
          <div className="hidden md:flex space-x-4">
            <button onClick={() => navigate('home')} className={navClass('home')}><Icons.Terminal width={16} height={16} /> Ana Sayfa</button>
            <button onClick={() => navigate('projects')} className={navClass('projects')}><Icons.Code width={16} height={16} /> Projeler</button>
            {/* Burada threat-intel/ klasörüne yönlendiriyoruz */}
            <a href="/threat-intel/" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:text-white"><Icons.Activity width={16} height={16} /> Threat Intel</a>
            <button onClick={() => navigate('contact')} className={navClass('contact')}><Icons.User width={16} height={16} /> İletişim</button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <Icons.X width={24} height={24} /> : <Icons.Menu width={24} height={24} />}</button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-cyber-black border-b border-gray-800 p-4 space-y-2">
             <button onClick={() => {navigate('home'); setMobileMenuOpen(false);}} className="block w-full text-left text-white py-2 hover:bg-gray-800 px-2 rounded">Ana Sayfa</button>
             <button onClick={() => {navigate('projects'); setMobileMenuOpen(false);}} className="block w-full text-left text-white py-2 hover:bg-gray-800 px-2 rounded">Projeler</button>
             {/* Mobil menü için de linki güncelledik */}
             <a href="/threat-intel/" className="block w-full text-left text-white py-2 hover:bg-gray-800 px-2 rounded">Threat Intel</a>
             <button onClick={() => {navigate('contact'); setMobileMenuOpen(false);}} className="block w-full text-left text-white py-2 hover:bg-gray-800 px-2 rounded">İletişim</button>
          </div>
        )}
      </nav>

      <main className="pt-20 px-4 max-w-7xl mx-auto pb-20">
        {route.page === 'home' && renderHome()}
        {(route.page === 'projects' || route.page === 'project-detail') && renderProjects()}
        {/* Threat Intel artık burada render edilmiyor, ayrı sayfaya gidiyor */}
        {route.page === 'contact' && renderContact()}
      </main> 

      <footer className="text-center text-gray-600 py-8 border-t border-gray-800 text-sm font-mono">
        <div className="flex justify-center items-center gap-2">
          <span>© {new Date().getFullYear()} Berke Bodur.</span>
          <span className="hidden sm:inline">|</span>
          <span>System Status: <span className="text-cyber-green animate-pulse">ONLINE</span></span>
        </div>
      </footer>
    </div>
  );
};

export default App;
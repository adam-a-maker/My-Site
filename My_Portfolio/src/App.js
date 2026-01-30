import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Wifi, 
  Settings, 
  Database, 
  AlertTriangle,
  ChevronRight,
  Maximize2,
  X,
  Power,
  Github,
  ExternalLink,
  User,
  Briefcase,
  Layers,
  Box,
  Code2,
  Mail,
  FileText
} from 'lucide-react';

/**
 * TERMINAL CLI DESIGN SYSTEM CONSTANTS
 */
const COLORS = {
  bg: '#0a0a0a',
  primary: '#33ff00',
  secondary: '#ffb000',
  muted: '#1f521f',
  error: '#ff3333',
  border: '#1f521f',
};

const ASCII_LOGO = `
 █████╗ ██████╗  █████╗ ███╗   ███╗    █████╗ ██████╗ ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔══██╗████╗ ████║   ██╔══██╗██╔══██╗██╔══██╗██╔═══██╗
███████║██║  ██║███████║██╔████╔██║   ███████║██████╔╝██║  ██║██║   ██║
██╔══██║██║  ██║██╔══██║██║╚██╔╝██║   ██╔══██║██╔══██╗██║  ██║██║   ██║
██║  ██║██████╔╝██║  ██║██║ ╚═╝ ██║   ██║  ██║██████╔╝██████╔╝╚██████╔╝
╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═════╝  ╚═════╝ 
           >> SYSTEM OPERATOR: ADAM ABDO <<
`;

const TerminalWindow = ({ title, children, className = "", height = "auto" }) => (
  <div className={`border border-[#1f521f] bg-[#0a0a0a] flex flex-col mb-4 ${className}`} style={{ height }}>
    <div className={`border-b border-[#1f521f] px-2 py-1 flex justify-between items-center bg-[#1f521f]/20`}>
      <div className="flex items-center gap-2">
        <span className="text-[10px] md:text-xs font-mono uppercase font-bold text-[#33ff00]">
          [+] --- {title} --- [+]
        </span>
      </div>
      <div className="flex gap-3">
        <button className="p-0.5 hover:bg-[#33ff00]/20 transition-colors">
          <Maximize2 size={14} className="text-[#1f521f] hover:text-[#33ff00] cursor-pointer" />
        </button>
        <button className="p-0.5 hover:bg-[#ff3333]/20 transition-colors">
          <X size={14} className="text-[#1f521f] hover:text-[#ff3333] cursor-pointer" />
        </button>
      </div>
    </div>
    <div className="p-4 font-mono text-sm overflow-auto custom-scrollbar flex-grow">
      {children}
    </div>
  </div>
);

const ProgressBar = ({ label, value, max = 100, color = COLORS.primary }) => {
  const percent = Math.floor((value / max) * 20);
  const bar = "█".repeat(percent) + ".".repeat(20 - percent);
  
  return (
    <div className="mb-3 font-mono">
      <div className="flex justify-between text-[10px] md:text-xs mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="text-xs tracking-tighter whitespace-pre" style={{ color }}>
        [{bar}]
      </div>
    </div>
  );
};

export default function App() {
  const [logs, setLogs] = useState([
    { id: 1, text: "INITIALIZING ADAM_OS v1.2.0...", type: "info" },
    { id: 2, text: "FETCHING LIVE GITHUB REPOS... [OK]", type: "success" },
    { id: 3, text: "SYNCING ROBOTICS_MODULES... [OK]", type: "info" },
    { id: 4, text: "SYSTEM SECURE. WELCOME OPERATOR. TRY help", type: "warn" },
  ]);
  const [input, setInput] = useState("");
  const [uptime, setUptime] = useState(0);
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const logEndRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch real GitHub repos
  useEffect(() => {
    fetch('https://api.github.com/users/adam-a-maker/repos?sort=updated&per_page=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoadingRepos(false);
      })
      .catch(() => setLoadingRepos(false));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setUptime(u => u + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;
      
      setLogs(prev => [...prev, { id: Date.now(), text: `adam@terminal:~$ ${cmd}`, type: "cmd" }]);
      
      const responses = {
        'help': "CMDS: about, hardware, experience, repos, contact, clear, secret",
        'about': "ADAM ABDO: @Lycéen Noisy le Grand. Robocup Junior 2024 top 11. Tech hardware and software enthusiast.",
        'hardware': "INVENTORY: ESP32, RPi 3b, Arduino, LiDAR. Currently building Robocup 2026 vision assisted Bot.",
        'experience': "INTERN at Cité des Sciences. PIX Cert: 500+. CS50 Harvard in progress.",
        'repos': `FETCHED ${repos.length} ACTIVE REPOSITORIES FROM GITHUB.`,
        'contact': "MAIL: dam.abd000@gmail.com | GITHUB: adam-a-maker",
        'secret': "SYSTEM_KEY: {R0B0CUP_2024_TOP-11}. Keep exploring.",
        'interest': "FAVORITE_LANGUAGES: Python, C++. Enjoys embedded systems and 3D modeling.",
        'internships': "Searching an intership in a tech/robotics/ai field, you can check my CV.",
        'clear': 'CLEAR'
      };

      if (cmd === 'clear') {
        setLogs([]);
      } else if (responses[cmd]) {
        setTimeout(() => setLogs(prev => [...prev, { id: Date.now() + 1, text: responses[cmd], type: 'success' }]), 100);
      } else {
        const errors = [
          `ERR: '${cmd}' IS NOT A VALID PROTOCOL, TRY "help".`,
          `ACCESS DENIED: COMMAND '${cmd.toUpperCase()}' IS RESTRICTED, TRY "help".`,
          `SYSLOG: UNKNOWN INPUT DETECTED: ${cmd}, TRY "help".`,
          `FATAL: USER ATTEMPTED TO EXECUTE '${cmd}'. REQUEST IGNORED, TRY "help".`
        ];
        const randomErr = errors[Math.floor(Math.random() * errors.length)];
        setTimeout(() => setLogs(prev => [...prev, { id: Date.now() + 1, text: randomErr, type: 'error' }]), 100);
      }
      setInput("");
    }
  };

  const downloadCV = () => {
    // In a real scenario, this would be a link to your PDF
    const cvLink = "uploaded:CV_Adam-Abdo.pdf"; 
    setLogs(prev => [...prev, { id: Date.now(), text: "REQUESTING CV_DATA... DOWNLOAD INITIALIZED.", type: 'info' }]);
    window.open(`https://example.com/path-to-your-cv.pdf`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono selection:bg-[#33ff00] selection:text-[#0a0a0a] relative overflow-hidden flex flex-col p-4 md:p-8">
      
      {/* CRT SCANLINE OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(rgba(51,255,0,0.05)_0%,transparent_70%)]" />
      </div>

      <header className="mb-6">
        <pre className="text-[5px] sm:text-[7px] md:text-[9px] leading-none mb-6 whitespace-pre text-[#33ff00] drop-shadow-[0_0_5px_rgba(51,255,0,0.5)]">
          {ASCII_LOGO}
        </pre>
        <div className="flex flex-wrap gap-3 text-[10px]">
          <span className="border border-[#33ff00] px-2 py-0.5 bg-[#33ff00] text-[#0a0a0a] font-bold uppercase tracking-widest">
            ADAM ABDO PORTFOLIO
          </span>
          <span className="border border-[#1f521f] px-2 py-0.5">
            SESSION_TIME: {Math.floor(uptime/60)}m {uptime%60}s
          </span>
          <span className="border border-[#1f521f] px-2 py-0.5 text-[#ffb000]">
            IP: 192.168.1.104
          </span>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-grow">
        
        {/* SIDEBAR */}
        <section className="lg:col-span-4 space-y-5">
          <TerminalWindow title="CORE_COMPETENCIES">
            <ProgressBar label="PYTHON_DEV" value={92} />
            <ProgressBar label="C++_EMBEDDED" value={88} color={COLORS.secondary} />
            <ProgressBar label="3D_MODELING" value={75} />
            <ProgressBar label="LINUX_EXPERIENCE" value={82} />
            
            <div className="mt-4 space-y-2 border-t border-[#1f521f] pt-4 text-xs">
              <div className="flex items-center gap-2"><Cpu size={14}/> <span>ROBOCUP_2024_CHAMPION</span></div>
              <div className="flex items-center gap-2 text-[#ffb000]"><Box size={14}/> <span>BLENDER & FUSION360</span></div>
              <div className="flex items-center gap-2"><Code2 size={14}/> <span>CS50_HARVARD_2025</span></div>
              <div className="flex items-center gap-2 text-[#33ff00]"><ShieldCheck size={14}/> <span>CTF_102ND_RANK</span></div>
            </div>
          </TerminalWindow>

          <TerminalWindow title="LIVE_GITHUB_SYNC">
            <div className="space-y-3 text-xs">
              {loadingRepos ? (
                <div className="animate-pulse text-[#1f521f]">FETCHING_REPOS...</div>
              ) : repos.length > 0 ? (
                repos.map((repo, i) => (
                  <a 
                    key={i} 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group border border-[#1f521f] p-2 hover:bg-[#33ff00]/10 hover:border-[#33ff00] transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-[#33ff00] group-hover:underline italic">/{repo.name}</span>
                      <ExternalLink size={10} />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#1f521f] mt-1">
                      <span>{repo.language || 'Code'}</span>
                      <span className="text-[#33ff00] opacity-50">★ {repo.stargazers_count}</span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-[#ff3333]">ERR: OFFLINE_MODE</div>
              )}
              <a 
                href="https://github.com/adam-a-maker" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center border-t border-[#1f521f] pt-2 text-[#33ff00] hover:underline uppercase text-[10px] tracking-widest"
              >
                [ VIEW ALL ON GITHUB ]
              </a>
            </div>
          </TerminalWindow>
        </section>

        {/* TERMINAL AREA */}
        <section className="lg:col-span-8 flex flex-col">
          <TerminalWindow title="ADAM_SHELL_V1.2" className="flex-grow min-h-[400px]" height="100%">
            <div className="flex flex-col h-full">
              <div className="flex-grow space-y-1 mb-4 overflow-y-auto custom-scrollbar">
                <div className="text-[#1f521f] mb-4 text-[10px] italic">
                  // LOGGED_IN_AS: adam-a-maker
                  <br />// DIRECTORY: /home/adam/portfolio
                  <br />// STATUS: CONNECTED_TO_WAN
                </div>
                {logs.map((log) => (
                  <div key={log.id} className="leading-tight text-xs md:text-sm">
                    {log.type === 'error' && <span className="text-[#ff3333] mr-1">[ERR]</span>}
                    {log.type === 'success' && <span className="text-[#33ff00] mr-1">[OK]</span>}
                    {log.type === 'warn' && <span className="text-[#ffb000] mr-1">[!]</span>}
                    {log.type === 'cmd' && <span className="text-[#33ff00] mr-1">$</span>}
                    <span className={log.type === 'cmd' ? 'font-bold' : ''}>{log.text}</span>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>

              {/* INPUT AREA */}
              <div 
                className="mt-auto pt-4 border-t border-[#1f521f] flex items-center relative cursor-text"
                onClick={() => inputRef.current?.focus()}
              >
                <span className="shrink-0 text-[#33ff00] font-bold text-xs mr-2">adam@terminal:~$</span>
                <div className="relative flex-grow flex items-center">
                  <span className="text-xs md:text-sm whitespace-pre z-10">{input}</span>
                  <span className="w-2 h-4 bg-[#33ff00] ml-0.5 animate-[blink_1s_step-end_infinite] shadow-[0_0_5px_#33ff00]"></span>
                  <input 
                    ref={inputRef}
                    type="text"
                    autoFocus
                    className="absolute inset-0 bg-transparent border-none outline-none text-transparent w-full"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    spellCheck="false"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </TerminalWindow>

          {/* QUICK LINKS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <a 
              href="https://github.com/adam-a-maker" 
              target="_blank" 
              className="flex items-center justify-center gap-2 border border-[#1f521f] py-3 hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all text-xs font-bold"
            >
              <Github size={14}/> GITHUB_PROFILE
            </a>
            <a 
              href="mailto:dam.abd000@gmail.com" 
              className="flex items-center justify-center gap-2 border border-[#1f521f] py-3 hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all text-xs font-bold"
            >
              <Mail size={14}/> EMAIL_ME
            </a>
            <button 
              onClick={downloadCV}
              className="flex items-center justify-center gap-2 border border-[#1f521f] py-3 hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all text-xs font-bold"
            >
              <FileText size={14}/> DOWNLOAD_CV
            </button>
            <a 
              href="https://github.com/adam-a-maker?tab=repositories"
              target="_blank"
              className="flex items-center justify-center gap-2 border border-[#1f521f] py-3 hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all text-xs font-bold"
            >
              <Layers size={14}/> PROJECTS
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-8 pt-4 border-t border-[#1f521f] flex justify-between items-center text-[9px] text-[#1f521f] uppercase tracking-widest">
        <div className="flex gap-4">
          <span>NOISY_LE_GRAND // FRANCE</span>
          <span>BILINGUAL: FR/EN/AR</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi size={10} className="animate-pulse" />
          <span>SESSION_ENCRYPTED</span>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0a0a0a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1f521f; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #33ff00; }
      `}} />
    </div>
  );
}

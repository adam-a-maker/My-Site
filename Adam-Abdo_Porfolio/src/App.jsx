import React, { useState, useEffect, useRef } from 'react';
import {
  Maximize2, X, Github, ExternalLink, Layers,
  Code2, Mail, FileText, ShieldCheck, Cpu, Wifi, Box, Lock, Activity
} from 'lucide-react';

// ── CONSTANTS ─────────────────────────────────────────────────

const COLORS = {
  bg: '#0a0a0a', primary: '#33ff00', secondary: '#ffb000',
  muted: '#1f521f', error: '#ff3333', border: '#1f521f',
};

const ASCII_LOGO = `
 █████╗ ██████╗  █████╗ ███╗   ███╗    █████╗ ██████╗ ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔══██╗████╗ ████║   ██╔══██╗██╔══██╗██╔══██╗██╔═══██╗
███████║██║  ██║███████║██╔████╔██║   ███████║██████╔╝██║  ██║██║   ██║
██╔══██║██║  ██║██╔══██║██║╚██╔╝██║   ██╔══██║██╔══██╗██║  ██║██║   ██║
██║  ██║██████╔╝██║  ██║██║ ╚═╝ ██║   ██║  ██║██████╔╝██████╔╝╚██████╔╝
╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═════╝  ╚═════╝
              >> SYSTEM OPERATOR: ADAM ABDO — v1.2.5 <<`;

// ── ANIMATION PRIMITIVES ──────────────────────────────────────

const AnimatedReveal = ({ lines, delay = 70, color = '#33ff00' }) => {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= lines.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), delay);
    return () => clearTimeout(t);
  }, [visible, lines.length, delay]);
  return (
    <pre style={{ color, fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.55', margin: 0, whiteSpace: 'pre' }}>
      {lines.slice(0, visible).map((line, i) => (
        <div key={i} style={{ animation: 'slideIn 0.08s ease-out' }}>{line || ' '}</div>
      ))}
    </pre>
  );
};

const TypewriterText = ({ text, speed = 30 }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return <span style={{ whiteSpace: 'pre-wrap' }}>{displayed}</span>;
};

const MatrixGrid = ({ rows = 6, cols = 50 }) => {
  const CHARS = "01アイウエカキクサシスハ@#$HACKER%&0xDEADBEEF";
  const mk = () => Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => CHARS[Math.floor(Math.random() * CHARS.length)]));
  const [grid, setGrid] = useState(mk);
  const [bright, setBright] = useState(() =>
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random() > 0.85)));
  useEffect(() => {
    const t = setInterval(() => {
      setGrid(g => g.map(row => row.map(c => Math.random() > 0.88 ? CHARS[Math.floor(Math.random() * CHARS.length)] : c)));
      setBright(b => b.map(row => row.map(() => Math.random() > 0.88)));
    }, 90);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'monospace', fontSize: '10px', lineHeight: '1.3', userSelect: 'none', overflow: 'hidden' }}>
      {grid.map((row, ri) => (
        <div key={ri}>
          {row.map((c, ci) => (
            <span key={ci} style={{ color: bright[ri][ci] ? '#aaffaa' : '#33ff00', opacity: bright[ri][ci] ? 0.9 : 0.25 + Math.random() * 0.25 }}>
              {c}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const GlitchText = ({ text, color = '#33ff00' }) => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const schedule = () => setTimeout(() => {
      setGlitch(true);
      setTimeout(() => { setGlitch(false); schedule(); }, 130);
    }, 2000 + Math.random() * 4000);
    const t = schedule();
    return () => clearTimeout(t);
  }, []);
  return (
    <span style={{
      color, display: 'inline-block',
      textShadow: glitch ? '2px 0 #ff3333, -2px 0 #0033ff, 0 0 8px #33ff00' : `0 0 8px ${color}55`,
      transform: glitch ? `translateX(${(Math.random() - 0.5) * 5}px) skewX(${(Math.random() - 0.5) * 3}deg)` : 'none',
    }}>{text}</span>
  );
};

const ScanningBar = ({ label, done }) => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPct(p => { if (p >= 100) { clearInterval(t); return 100; } return p + 4; }), 30);
    return () => clearInterval(t);
  }, []);
  const filled = Math.floor(pct / 5);
  return (
    <div style={{ fontFamily: 'monospace', fontSize: '10px', color: pct === 100 ? '#33ff00' : '#ffb000', marginBottom: 3 }}>
      {label} [{('█'.repeat(filled) + '.'.repeat(20 - filled))}] {pct}%{pct === 100 ? ' [OK]' : ''}
    </div>
  );
};

// ── COMMAND VISUAL COMPONENTS ─────────────────────────────────

const HelpVisual = () => (
  <AnimatedReveal delay={35} lines={[
    '╔════════════════════════════════════════════════════╗',
    '║          AVAILABLE PROTOCOLS // v1.2.5             ║',
    '╠════════════════╦═══════════════════════════════════╣',
    '║  about         ║  OPERATOR SYSTEM PROFILE          ║',
    '║  hardware      ║  EMBEDDED SYSTEMS & HOMELAB       ║',
    '║  experience    ║  CAREER TIMELINE & ACHIEVEMENTS   ║',
    '║  repos         ║  LIVE GITHUB SYNC STATUS          ║',
    '║  cybersec      ║  SECURITY SKILLS & CTF RESULTS    ║',
    '║  robocup       ║  ROBOT PROJECT STATUS             ║',
    '║  athletics     ║  SPORTS PROFILE                   ║',
    '║  contact       ║  OPEN SECURE CHANNEL              ║',
    '║  clear         ║  FLUSH TERMINAL BUFFER            ║',
    '║  [???]         ║  A SECRET PROTOCOL EXISTS...      ║',
    '╚════════════════╩═══════════════════════════════════╝',
  ]} />
);

const AboutVisual = () => (
  <AnimatedReveal delay={55} lines={[
    '╔══════════════════════════════════════════════════╗',
    '║            SYSTEM PROFILE: LOADED               ║',
    '╠══════════════════════════════════════════════════╣',
    '║  OPERATOR  : ADAM ABDO                          ║',
    '║  ROLE      : LYCÉEN  //  MAKER  //  BUILDER     ║',
    '║  SCHOOL    : LYCÉE INTERNATIONAL NOISY-LE-GRAND ║',
    '║  CLASS     : SECONDE — SECTION INTERNATIONALE   ║',
    '║  CITY      : LE PRÉ SAINT GERVAIS, FRANCE       ║',
    '║  STATUS    : SEEKING INTERNSHIP — JUIN 2026     ║',
    '╠══════════════════════════════════════════════════╣',
    '║  PROFILE   : Curieux et rigoureux.              ║',
    '║              J\'aime programmer, tester,         ║',
    '║              concevoir, et comprendre.          ║',
    '║  PASSIONS  : Robotique · IA · Systèmes emb.    ║',
    '║              Cybersécurité · Aéronautique · F1  ║',
    '║  LANGUAGES : FR (natif) · EN (B1) · AR (B1)    ║',
    '╚══════════════════════════════════════════════════╝',
  ]} />
);

const HardwareVisual = () => (
  <AnimatedReveal delay={60} color='#ffb000' lines={[
    '╔══════════════════════════════════════════════════╗',
    '║         HOMELAB // EMBEDDED SYSTEMS              ║',
    '╠══════════════════════════════════════════════════╣',
    '║                                                  ║',
    '║    [ESP32-WROOM] ──── WiFi ──── [RPi 3b]         ║',
    '║          │                          │            ║',
    '║    [Arduino UNO/NANO]         [Home Assistant]   ║',
    '║          │                          │            ║',
    '║       [Capteurs] ─────── [LAN_ROUTER]            ║',
    '║                                                  ║',
    '╠══════════════════════════════════════════════════╣',
    '║  HW      : ESP32 / RPi 3b / Arduino UNO+NANO    ║',
    '║  SERVER  : Home Assistant — Self-hosted          ║',
    '║  3D      : Blender · Fusion 360                  ║',
    '║  HOBBY   : Démontage & rétro-ingénierie          ║',
    '║  PROJECT : RoboCup 2026 — Robot vision caméra    ║',
    '╚══════════════════════════════════════════════════╝',
  ]} />
);

const ExperienceVisual = () => (
  <AnimatedReveal delay={85} lines={[
    '  TIMELINE ──────────────────────────────────────────────',
    '  │',
    '  ├─ 2023 ─── ARBITRE CHAMPIONNATS DE FRANCE',
    '  │           ATHLÉTISME UNSS',
    '  │',
    '  ├─ 2024 ─── ROBOCUP JUNIOR 2024',
    '  │           11ème / 55 ÉQUIPES [1ÈRE PARTICIPATION]',
    '  │',
    '  ├─ 2024 ─── 1ÈRE PLACE — CROSS DÉPARTEMENTAL UNSS',
    '  │',
    '  ├─ 2024 ─── BREVET DES COLLÈGES',
    '  │           MENTION TRÈS-BIEN + MENTION INTERNATIONALE',
    '  │',
    '  ├─ 2025 ─── STAGE CITÉ DES SCIENCES (1 SEMAINE)',
    '  │           ASSISTANT ÉLECTRIQUE + DÉVEL. / PROG.',
    '  │',
    '  ├─ 2025 ─── CTF HACK-TON-LYCÉE: 102ème / 1000+',
    '  │',
    '  ├─ 2025 ─── NUIT DU CODE 2025',
    '  │',
    '  ├─ 2025 ─── CHAMPIONNATS DE FRANCE ATHLÉT. UNSS',
    '  │           (EN ÉQUIPE)',
    '  │',
    '  ├─ 2025 ─── CS50 HARVARD [EN COURS]',
    '  │',
    '  └─ 2026 ─── ROBOCUP JUNIOR [ROBOT EN CONSTRUCTION]',
    '              STAGE RECHERCHE — 15 AU 26 JUIN 2026',
  ]} />
);

const CybersecVisual = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div>
      <MatrixGrid rows={5} cols={52} />
      <div style={{ marginTop: 6 }}>
        {phase === 0 ? (
          <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#ff3333' }}>
            SCANNING SECURITY PROFILE...
          </div>
        ) : (
          <AnimatedReveal delay={65} color='#ff3333' lines={[
            '╔════════════════════════════════════════════════╗',
            '║           CYBERSECURITY PROFILE                ║',
            '╠════════════════════════════════════════════════╣',
            '║  OS       : KALI LINUX                        ║',
            '║  TOOLS    : WIRESHARK · NMAP · BURPSUITE       ║',
            '║  PLATFORM : TRYHACKME — 30+ ROOMS COMPLETED   ║',
            '║  CTF      : HACK-TON-LYCÉE 2025               ║',
            '║             102ème / 1000+ PARTICIPANTS        ║',
            '║  NETWORK  : HOME ASSISTANT — SELF-HOSTED      ║',
            '║             COMPRÉHENSION RÉSEAUX/PROTO.       ║',
            '╠════════════════════════════════════════════════╣',
            '║  STATUS   : ACTIVE_LEARNER // LEVEL_UP...     ║',
            '╚════════════════════════════════════════════════╝',
          ]} />
        )}
      </div>
    </div>
  );
};

const RobocupVisual = () => {
  const [scanLine, setScanLine] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setScanLine(s => (s + 1) % 7), 250);
    return () => clearInterval(t);
  }, []);
  return (
    <div>
      <AnimatedReveal delay={55} color='#33ff00' lines={[
        '  ╔══════════════════════════════════════════════╗',
        '  ║          ROBOCUP_BOT v2.0 // SPECS           ║',
        '  ╠══════════════════════════════════════════════╣',
        '  ║                                              ║',
        '  ║         ┌─────────────────────┐             ║',
        '  ║         │   ╔═══════════╗     │             ║',
        '  ║         │   ║ [CAMERA]◉ ║     │ ← VISION   ║',
        '  ║         │   ╚═══════════╝     │             ║',
        '  ║         │   OBJECT_DETECT     │             ║',
        '  ║         └──────────┬──────────┘             ║',
        '  ║               =====╪=====                   ║',
        '  ║              /     │     \\                  ║',
        '  ║             /______|______\\                 ║',
        '  ║                                              ║',
        '  ╠══════════════════════════════════════════════╣',
        '  ║  MISSION : DETECT VICTIM-BALLS VIA CAMERA   ║',
        '  ║  MCU     : ESP32 + RPi VISION MODULE        ║',
        '  ║  PREV    : ROBOCUP 2024 — 11ème / 55 ÉQUIP. ║',
        '  ║  TARGET  : ROBOCUP JUNIOR 2026              ║',
        '  ║  STATUS  : [||||||||||.....] BUILDING...    ║',
        '  ╚══════════════════════════════════════════════╝',
      ]} />
    </div>
  );
};

const AthleticsVisual = () => (
  <AnimatedReveal delay={70} color='#ffb000' lines={[
    '  ╔══════════════════════════════════════════════╗',
    '  ║             ATHLETICS PROFILE               ║',
    '  ╠══════════════════════════════════════════════╣',
    '  ║                                              ║',
    '  ║     _O_   ══════════════════════► FINISH     ║',
    '  ║      |    ══════════════════════►            ║',
    '  ║     / \\   ══════════════════════►            ║',
    '  ║                                              ║',
    '  ╠══════════════════════════════════════════════╣',
    '  ║  [01] 1ERE PLACE — CROSS DEPARTEMENTAL UNSS  ║',
    '  ║       2024                                   ║',
    '  ║                                              ║',
    '  ║  [02] CHAMPIONNATS DE FRANCE ATHLETISME      ║',
    '  ║       EN EQUIPE UNSS — 2025                  ║',
    '  ║                                              ║',
    '  ║  [03] JEUNE JUGE UNSS — 4 ANS               ║',
    '  ║                                              ║',
    '  ║  [04] ARBITRE CHAMPIONNATS DE FRANCE UNSS    ║',
    '  ║       2023                                   ║',
    '  ╚══════════════════════════════════════════════╝',
  ]} />
);

const ContactVisual = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div style={{ fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.7' }}>
      <div style={{ color: '#1f521f' }}>
        {step >= 1 && <div style={{ animation: 'slideIn 0.1s' }}>&gt; INITIALIZING SECURE CHANNEL...      [<span style={{color:'#33ff00'}}>OK</span>]</div>}
        {step >= 2 && <div style={{ animation: 'slideIn 0.1s' }}>&gt; ESTABLISHING ENCRYPTED LINK...      [<span style={{color:'#33ff00'}}>OK</span>]</div>}
        {step >= 3 && <div style={{ animation: 'slideIn 0.1s' }}>&gt; CONTACT DATA DECRYPTED...           [<span style={{color:'#33ff00'}}>OK</span>]</div>}
      </div>
      {step >= 3 && (
        <div style={{ marginTop: 8 }}>
          <AnimatedReveal delay={45} lines={[
            '  ┌────────────────────────────────────────┐',
            '  │  MAIL   :  dam.abd000@gmail.com        │',
            '  │  CITY   :  Le Pré Saint Gervais, FR    │',
            '  │  TEL    :  06 02 31 71 08              │',
            '  │  GITHUB :  github.com/adam-a-maker      │',
            '  └────────────────────────────────────────┘',
            '  [CHANNEL_OPEN] [SESSION_ENCRYPTED] [GO]   ',
          ]} />
        </div>
      )}
    </div>
  );
};

const SecretVisual = () => {
  const FRAMES = [
    ['           *           '],
    ['          ***          ', '           *           '],
    ['         *****         ', '          ***          ', '           *           '],
    ['        *******        ', '         *****         ', '          ***          ', '      *    *    *      '],
    ['       *********       ', '        *******        ', '     * * * * * * *     ', '      ***     ***      ', '  *  * * *   * * *  *  '],
    ['      ***********      ', '   * * ********* * *   ', '     ***       ***     ', ' *  * * *       * * *  '],
  ];
  const [frame, setFrame] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setFrame(f => {
        if (f >= FRAMES.length - 1) { clearInterval(t); setDone(true); return f; }
        return f + 1;
      });
    }, 250);
    return () => clearInterval(t);
  }, []);
  return (
    <div>
      <pre style={{ color: '#ffb000', fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.4, margin: 0, minHeight: 80 }}>
        {FRAMES[frame].map((l, i) => <div key={i}>{l}</div>)}
      </pre>
      {done && (
        <AnimatedReveal delay={55} color='#ffb000' lines={[
          '',
          ' ╔══════════════════════════════════════════╗',
          ' ║   >> SYSTEM_KEY: {R0B0CUP_2026} <<      ║',
          ' ║      ACCESS_LEVEL : OPERATOR            ║',
          ' ║      CLEARANCE    : MAXIMUM             ║',
          ' ║      NOTE         : KEY IS USELESS BUT  ║',
          ' ║                     YOU FOUND IT!       ║',
          ' ╚══════════════════════════════════════════╝',
          '',
          ' [adam-a-maker SAYS: MERCI D\'AVOIR CHERCHÉ!]',
        ]} />
      )}
    </div>
  );
};

// ── UI COMPONENTS ─────────────────────────────────────────────

const TerminalWindow = ({ title, children, className = "", height = "auto" }) => (
  <div className={`border border-[#1f521f] bg-[#0a0a0a] flex flex-col mb-4 ${className}`} style={{ height }}>
    <div className="border-b border-[#1f521f] px-2 py-1 flex justify-between items-center bg-[#1f521f]/20">
      <span className="text-[10px] md:text-xs font-mono uppercase font-bold text-[#33ff00]">
        [+] --- {title} --- [+]
      </span>
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

const ProgressBar = ({ label, value, max = 100, color = '#33ff00' }) => {
  const pct = Math.floor((value / max) * 20);
  const bar = '█'.repeat(pct) + '.'.repeat(20 - pct);
  return (
    <div className="mb-3 font-mono">
      <div className="flex justify-between text-[10px] md:text-xs mb-1">
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="text-xs tracking-tighter whitespace-pre" style={{ color }}>
        [{bar}]
      </div>
    </div>
  );
};

// ── COMMAND REGISTRY ──────────────────────────────────────────

function buildResponse(cmd, repos) {
  switch (cmd) {
    case 'help':     return { type: 'visual', component: <HelpVisual /> };
    case 'about':    return { type: 'visual', component: <AboutVisual /> };
    case 'hardware': return { type: 'visual', component: <HardwareVisual /> };
    case 'experience': return { type: 'visual', component: <ExperienceVisual /> };
    case 'cybersec': return { type: 'visual', component: <CybersecVisual /> };
    case 'robocup':  return { type: 'visual', component: <RobocupVisual /> };
    case 'athletics': return { type: 'visual', component: <AthleticsVisual /> };
    case 'contact':  return { type: 'visual', component: <ContactVisual /> };
    case 'secret':   return { type: 'visual', component: <SecretVisual /> };
    case 'repos':    return { type: 'text', text: `FETCHED ${repos.length} ACTIVE REPO(S) FROM GITHUB.\nSEE LEFT PANEL OR VISIT github.com/adam-a-maker` };
    case 'clear':    return { type: 'clear' };
    default:         return null;
  }
}

// ── MAIN APP ──────────────────────────────────────────────────

export default function App() {
  const [logs, setLogs] = useState([
    { id: 1, text: 'ADAM_OS v1.2.5 BOOTING...', type: 'info' },
    { id: 2, text: 'KERNEL MODULE: python3 / c++ / linux [LOADED]', type: 'info' },
    { id: 3, text: 'GITHUB_SYNC: FETCHING REPOS... [OK]', type: 'success' },
    { id: 4, text: 'CYBERSEC_MODULE: KALI / TRYHACKME / CTF [READY]', type: 'success' },
    { id: 5, text: 'SECURE SHELL ACTIVE — TYPE \'help\' FOR PROTOCOLS.', type: 'warn' },
  ]);
  const [input, setInput] = useState('');
  const [uptime, setUptime] = useState(0);
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [userIP, setUserIP] = useState('DETECTING...');
  const logEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('https://api.github.com/users/adam-a-maker/repos?sort=updated&per_page=4')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setRepos(d); setLoadingRepos(false); })
      .catch(() => setLoadingRepos(false));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setUptime(u => u + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then(d => setUserIP(d.ip))
      .catch(() => setUserIP('UNKNOWN'));
  }, []);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setLogs(prev => [...prev, { id: Date.now(), text: `adam@terminal:~$ ${cmd}`, type: 'cmd' }]);

    const response = buildResponse(cmd, repos);

    if (!response) {
      const errors = [
        `ERR: '${cmd}' IS NOT A VALID PROTOCOL. TRY 'help'.`,
        `ACCESS DENIED: COMMAND '${cmd.toUpperCase()}' IS RESTRICTED. TRY 'help'.`,
        `SYSLOG: UNKNOWN INPUT DETECTED: ${cmd}. TRY 'help'.`,
        `FATAL: USER ATTEMPTED TO EXECUTE '${cmd}'. REQUEST IGNORED. TRY 'help'.`,
      ];
      setTimeout(() => setLogs(p => [...p, { id: Date.now() + 1, text: errors[Math.floor(Math.random() * errors.length)], type: 'error' }]), 100);
    } else if (response.type === 'clear') {
      setLogs([]);
    } else if (response.type === 'visual') {
      setTimeout(() => setLogs(p => [...p, { id: Date.now() + 1, type: 'visual', component: response.component }]), 100);
    } else {
      setTimeout(() => setLogs(p => [...p, { id: Date.now() + 1, text: response.text, type: 'success' }]), 100);
    }

    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono selection:bg-[#33ff00] selection:text-[#0a0a0a] relative overflow-hidden flex flex-col p-4 md:p-8">

      {/* CRT OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.22)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.015),rgba(0,0,255,0.04))] z-10 bg-[length:100%_2px,3px_100%]" />
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(rgba(51,255,0,0.04)_0%,transparent_70%)]" />
      </div>

      {/* HEADER */}
      <header className="mb-6">
        <pre className="text-[5px] sm:text-[7px] md:text-[9px] leading-none mb-4 whitespace-pre text-[#33ff00] drop-shadow-[0_0_5px_rgba(51,255,0,0.5)]">
          {ASCII_LOGO}
        </pre>
        <div className="flex flex-wrap gap-3 text-[10px]">
          <span className="border border-[#33ff00] px-2 py-0.5 bg-[#33ff00] text-[#0a0a0a] font-bold uppercase tracking-widest">
            ADAM ABDO PORTFOLIO
          </span>
          <span className="border border-[#1f521f] px-2 py-0.5">
            SESSION: {Math.floor(uptime / 60)}m {uptime % 60}s
          </span>
          <span className="border border-[#1f521f] px-2 py-0.5 text-[#ffb000]">
            IP: {userIP}
          </span>
          <span className="border border-[#1f521f] px-2 py-0.5 text-[#1f521f]">
            NODE: NOISY-LE-GRAND // FR
          </span>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-grow">

        {/* ── SIDEBAR ─────────────────────────────── */}
        <section className="lg:col-span-4 space-y-4">

          {/* CORE COMPETENCIES */}
          <TerminalWindow title="CORE_COMPETENCIES">
            <ProgressBar label="PYTHON_DEV" value={92} />
            <ProgressBar label="C++_EMBEDDED" value={85} color={COLORS.secondary} />
            <ProgressBar label="LINUX_EXPERIENCE" value={65} />
            <ProgressBar label="3D_MODELING" value={57} />
            <ProgressBar label="CYBERSEC_OPS" value={55} color="#ff3333" />

            <div className="mt-4 pt-3 border-t border-[#1f521f] space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-[#33ff00]">
                <Cpu size={12} /><span>ESP32 / RPi 3b / Arduino UNO+NANO</span>
              </div>
              <div className="flex items-center gap-2 text-[#ffb000]">
                <Box size={12} /><span>Blender · Fusion360</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 size={12} /><span>CS50_HARVARD_2025 — in progress</span>
              </div>
              <div className="flex items-center gap-2 text-[#ff3333]">
                <Lock size={12} /><span>Kali · Wireshark · TryHackMe 30+</span>
              </div>
              <div className="flex items-center gap-2 text-[#33ff00]">
                <ShieldCheck size={12} /><span>CTF Hack-ton-lycée — 102 / 1000+</span>
              </div>
              <div className="flex items-center gap-2 text-[#ffb000]">
                <Activity size={12} /><span>Robocup 2024 — 11e / 55 équipes</span>
              </div>
            </div>
          </TerminalWindow>

          {/* FORMATION */}
          <TerminalWindow title="FORMATION_DATA">
            <div className="space-y-3 text-[10px] md:text-[11px]">
              <div className="border-l-2 border-[#33ff00] pl-3">
                <div className="text-[#33ff00] font-bold">2025–2026</div>
                <div>SECONDE — SECTION INTERNATIONALE</div>
                <div className="text-[#1f521f]">Lycée Intl de Noisy-le-Grand</div>
              </div>
              <div className="border-l-2 border-[#ffb000] pl-3">
                <div className="text-[#ffb000] font-bold">2025</div>
                <div>STAGE — CITÉ DES SCIENCES</div>
                <div className="text-[#1f521f]">Assist. électrique + dével./prog.</div>
              </div>
              <div className="border-l-2 border-[#33ff00] pl-3">
                <div className="text-[#33ff00] font-bold">2024–2025</div>
                <div>BREVET MENTION TRÈS-BIEN</div>
                <div className="text-[#1f521f]">+ Mention internationale</div>
              </div>
              <div className="border-l-2 border-[#1f521f] pl-3 text-[#1f521f]">
                <div className="font-bold">CERTIFICATIONS</div>
                <div>PIX 500+ pts · CS50 Harvard</div>
              </div>
              <div className="pt-2 border-t border-[#1f521f] text-[#1f521f] italic text-[10px]">
                &gt; SEEKING INTERNSHIP 15–26 JUIN 2026
              </div>
            </div>
          </TerminalWindow>

          {/* LIVE GITHUB SYNC */}
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

        {/* ── TERMINAL ────────────────────────────── */}
        <section className="lg:col-span-8 flex flex-col">
          <TerminalWindow title="ADAM_SHELL_v1.2.5" className="flex-grow min-h-[450px]" height="100%">
            <div className="flex flex-col h-full">
              {/* LOG AREA */}
              <div className="flex-grow space-y-1 mb-4 overflow-y-auto custom-scrollbar">
                <div className="text-[#1f521f] mb-4 text-[10px] italic">
                  // LOGGED_IN_AS: adam-a-maker<br />
                  // DIRECTORY: /home/adam/portfolio<br />
                  // STATUS: CONNECTED_TO_WAN — type 'help' to start
                </div>

                {logs.map(log => (
                  <div key={log.id} className="leading-tight text-xs md:text-sm mb-1">
                    {log.type === 'visual' ? (
                      <div className="my-2 overflow-x-auto custom-scrollbar">{log.component}</div>
                    ) : (
                      <div>
                        {log.type === 'error' && <span className="text-[#ff3333] mr-1">[ERR]</span>}
                        {log.type === 'success' && <span className="text-[#33ff00] mr-1">[OK]</span>}
                        {log.type === 'warn' && <span className="text-[#ffb000] mr-1">[!]</span>}
                        {log.type === 'cmd' && <span className="text-[#33ff00] mr-1">$</span>}
                        {(log.type === 'success' || log.type === 'error') ? (
                          <TypewriterText text={log.text} />
                        ) : (
                          <span className={log.type === 'cmd' ? 'font-bold' : ''} style={{ whiteSpace: 'pre-wrap' }}>{log.text}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>

              {/* INPUT */}
              <div
                className="mt-auto pt-4 border-t border-[#1f521f] flex items-center cursor-text"
                onClick={() => inputRef.current?.focus()}
              >
                <span className="shrink-0 text-[#33ff00] font-bold text-xs mr-2">
                  <GlitchText text="adam@terminal:~$" />
                </span>
                <div className="relative flex-grow flex items-center">
                  <span className="text-xs md:text-sm whitespace-pre z-10">{input}</span>
                  <span className="w-2 h-4 bg-[#33ff00] ml-0.5 animate-[blink_1s_step-end_infinite] shadow-[0_0_6px_#33ff00]" />
                  <input
                    ref={inputRef}
                    type="text"
                    autoFocus
                    className="absolute inset-0 bg-transparent border-none outline-none text-transparent w-full"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    spellCheck="false"
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                </div>
              </div>
            </div>
          </TerminalWindow>

          {/* QUICK LINKS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-1">
            <a
              href="https://github.com/adam-a-maker"
              target="_blank"
              className="flex items-center justify-center gap-2 border border-[#1f521f] py-3 hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all text-xs font-bold"
            >
              <Github size={13} /> GITHUB
            </a>
            <a
              href="mailto:dam.abd000@gmail.com"
              className="flex items-center justify-center gap-2 border border-[#1f521f] py-3 hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all text-xs font-bold"
            >
              <Mail size={13} /> EMAIL
            </a>
            <button
              onClick={() => setLogs(p => [...p, { id: Date.now(), text: 'adam@terminal:~$ contact', type: 'cmd' }, { id: Date.now() + 1, type: 'visual', component: <ContactVisual /> }])}
              className="flex items-center justify-center gap-2 border border-[#1f521f] py-3 hover:bg-[#ffb000] hover:text-[#0a0a0a] transition-all text-xs font-bold"
            >
              <FileText size={13} /> CONTACT
            </button>
            <a
              href="https://github.com/adam-a-maker"
              target="_blank"
              className="flex items-center justify-center gap-2 border border-[#1f521f] py-3 hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all text-xs font-bold"
            >
              <Layers size={13} /> PROJECTS
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-8 pt-4 border-t border-[#1f521f] flex flex-wrap justify-between items-center gap-2 text-[9px] text-[#1f521f] uppercase tracking-widest">
        <div className="flex flex-wrap gap-4">
          <span>LE PRÉ SAINT GERVAIS // ÎLE-DE-FRANCE</span>
          <span>TRILINGUAL: FR / EN / AR</span>
          <span>ROBOCUP_2026 CONTENDER</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi size={10} className="animate-pulse text-[#33ff00]" />
          <span className="text-[#33ff00]">SESSION_ENCRYPTED</span>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-4px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .custom-scrollbar::-webkit-scrollbar{width:4px;height:4px}
        .custom-scrollbar::-webkit-scrollbar-track{background:#0a0a0a}
        .custom-scrollbar::-webkit-scrollbar-thumb{background:#1f521f}
        .custom-scrollbar::-webkit-scrollbar-thumb:hover{background:#33ff00}
      `}} />
    </div>
  );
}
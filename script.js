/**
 * ChomiamOS - Showcase Interactive Script
 * 100% Vanilla JS, 0% Python, Ultra-rapide & Réactif
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardShowcase();
  initTerminal();
  initExcuseGenerator();
  initFaqAccordion();
  initCopyButtons();
  initLightbox();
});

/* ==========================================================================
   1. DASHBOARD SHOWCASE TABS DATA & LOGIC
   ========================================================================== */

const DASHBOARD_TABS_DATA = [
  {
    id: 'system',
    tabTitle: 'Système & MAJ',
    icon: '📊',
    imgSrc: 'screenshots/dashboard-system.png',
    tag: 'Moniteurs & Maintenance',
    title: 'Vue d\'Ensemble Système & Test Débit 4K/eSport',
    desc: 'Surveillance hardware en temps réel de vos ressources système (CPU, GPU, RAM, Disques). Mettez à jour tout votre système en un clic avec commit signé GitHub (`git pull & nh os switch`), ou mesurez votre gigue et débit avec le speedtest intégré sans ouvrir un navigateur énergivore.',
    highlights: [
      'Jauges circulaires dynamiques CPU, GPU, RAM & Disques',
      'Mise à jour déclarative instantanée avec vérification de commit',
      'Test de débit intégré avec profils Gaming eSport & Streaming 4K',
      'Zéro télémétrie, respect absolu de la vie privée'
    ]
  },
  {
    id: 'disks',
    tabTitle: 'Gestion des Disques',
    icon: '💾',
    imgSrc: 'screenshots/dashboard-disks.png',
    tag: 'Montage Immuable NixOS',
    title: 'Montages Permanents & Détection Matérielle Btrfs/Ext4',
    desc: 'Oubliez le cauchemar d\'écrire des blocs `fileSystems."/mnt/..."` avec des UUIDs incompréhensibles à la main. Le Dashboard détecte automatiquement tous vos disques NVMe et SATA, formate en Btrfs avec subvolumes pour Emudeck ou en Ext4, et persiste les montages dans NixOS sans risque de corruption.',
    highlights: [
      'Formatage Ext4 & Btrfs en 1 clic sans risque d\'écraser la racine',
      'Intégration transparente pour les disques de jeux et Emudeck',
      'Gestion automatique de zram (swap compressé ultra-rapide)',
      'Protection permanente contre les réécritures GitHub'
    ]
  },
  {
    id: 'nix',
    tabTitle: 'Nix & Shell',
    icon: '❄️',
    imgSrc: 'screenshots/dashboard-nix-profiles.png',
    tag: 'Générations & Rollback',
    title: 'Gestion des Images Bootables & Nettoyage du Store',
    desc: 'Chaque modification génère une génération autonome bootable dans Grub/Systemd-boot (ici #219 sur Kernel 7.2.7-zen1). Un problème ? Rollback en 2 secondes au boot. Vous manquez de place ? Nettoyez les vieilles générations et optimisez les hardlinks du Store sans commande cryptique.',
    highlights: [
      'Historique complet des générations NixOS horodatées',
      'Bouton "Nettoyer & Garder 3 générations" ou Garbage Collect complet',
      'Optimisation du Nix Store par déduplication de hardlinks',
      'Configuration du shell préféré : Fish moderne ou Zsh avec Bash garanti'
    ]
  },
  {
    id: 'apps',
    tabTitle: 'Modules & Gaming',
    icon: '🎮',
    imgSrc: 'screenshots/dashboard-modules-apps.png',
    tag: 'Simracing & Environnements',
    title: 'Bureaux Graphiques, GameScope & Volants FFB',
    desc: 'Basculez entre GNOME, COSMIC Rust (par System76), Cinnamon et KDE Plasma 6 d\'un simple toggle ! Côté jeux : session console Steam GameScope intégrée, Oversteer pour volants à retour de force (Direct Drive, Logitech, Fanatec, Thrustmaster), MangoHud, Lutris, Sunshine, et Sober Roblox.',
    highlights: [
      'Switch entre GNOME, COSMIC Rust et KDE Plasma 6',
      'Session Steam GameScope plein écran (expérience console sans bureau)',
      'Support natif retour de force FFB pour volants Simracing',
      'Persistance automatique déclarative dans /etc/nixos/vars.nix'
    ]
  },
  {
    id: 'ai',
    tabTitle: 'IA & Inférence',
    icon: '🧠',
    imgSrc: 'screenshots/dashboard-ai-ollama.png',
    tag: 'Intelligence Artificielle Locale',
    title: 'Ollama Dédié & Autocomplétion Neovim en VRAM',
    desc: 'Pourquoi coder quand l\'IA peut le faire ? ChomiamOS intègre le serveur Ollama accéléré par GPU. Sélectionnez votre modèle de complétion de code : Qwen 2.5 Coder 7B, 3B ou 1.5B, ou DeepSeek R1 8B pour le raisonnement mathématique. Préchargement direct en VRAM pour une latence nulle sous Neovim.',
    highlights: [
      'Ollama préconfiguré et démarré en service systemd optimisé',
      'Modèles Qwen 2.5 Coder & DeepSeek R1 téléchargeables au clic',
      'Autocomplétion Neovim instantanée sans fuite de données dans le cloud',
      'Préchauffage VRAM pour un temps de réponse inférieur à 20ms'
    ]
  },
  {
    id: 'packages',
    tabTitle: 'Logithèque Nix',
    icon: '📦',
    imgSrc: 'screenshots/dashboard-nixpkgs.png',
    tag: 'Catalogue Nixpkgs',
    title: 'Recherche & Installation Stable 26.05 vs Unstable',
    desc: 'Accédez aux 100 000+ paquets de Nixpkgs sans jamais vous embourber dans la syntaxe des attributs. Choisissez entre la version Stable certifiée et la branche Unstable bleeding-edge. Le système applique automatiquement 45 règles de contrôle de conflits avant d\'exécuter `nh os switch`.',
    highlights: [
      'Recherche temps réel avec feedback de latence (632 ms)',
      'Choix fluide par paquet : Stable 26.05 ou Unstable en parallèle',
      'Moteur anti-conflits intelligent protégeant vos configurations',
      'Sauvegarde propre dans /etc/nixos/custom-packages.nix'
    ]
  },
  {
    id: 'network',
    tabTitle: 'Réseau & DNS',
    icon: '🌐',
    imgSrc: 'screenshots/dashboard-network.png',
    tag: 'Cybersécurité & DNS Rapides',
    title: 'Résolveurs DNS Ultra-Rapides & Sécurité Avancée',
    desc: 'Testez la latence de tous les résolveurs mondiaux en un clic. Basculez sur Cloudflare Standard (25.9 ms), Cloudflare Sécurité, Quad9 Suisse Zéro-Log ou AdGuard Bloqueur Pub. Appliquez à chaud pour la session ou gravez-le de manière permanente dans la config NixOS.',
    highlights: [
      'Benchmark de latence en direct de tous les serveurs DNS',
      'Chiffrement DNS-over-HTTPS/TLS et profils de protection parentale',
      'Gestion pare-feu intégrée, conteneurs Podman et partage sFTP sécurisé',
      'Application à chaud immédiate ou sauvegarde persistante dans NixOS'
    ]
  },
  {
    id: 'build',
    tabTitle: 'Console de Build',
    icon: '⚡',
    imgSrc: 'screenshots/dashboard-terminal-build.png',
    tag: 'Nix Output Monitor',
    title: 'Modal d\'Exécution en Direct & Cache Binaire Cachix',
    desc: 'Regardez votre OS se recompiler avec une beauté hypnotique. Visualisation de l\'arborescence de dépendances avec `nom` (Nix Output Monitor), téléchargement parallèle des paquets depuis `chomiamos.cachix.org` et cache officiel NixOS. Détection en direct des fichiers ajoutés et activation sans coupure.',
    highlights: [
      'Suivi en temps réel de l\'arbre des dérivations Nix',
      'Téléchargement accéléré via chomiamos.cachix.org',
      'Auto-scroll intelligent et logs colorisés avec timing précis',
      'Déploiement atomique sans interruption des applications en cours'
    ]
  }
];

function initDashboardShowcase() {
  const tabsContainer = document.getElementById('dashboardTabs');
  const screenshotImg = document.getElementById('dashboardScreenshot');
  const metaTag = document.getElementById('dashboardMetaTag');
  const metaTitle = document.getElementById('dashboardMetaTitle');
  const metaDesc = document.getElementById('dashboardMetaDesc');
  const metaHighlights = document.getElementById('dashboardHighlights');
  const fullScreenBtn = document.getElementById('fullscreenBtn');

  if (!tabsContainer || !screenshotImg) return;

  // Render tab buttons
  tabsContainer.innerHTML = '';
  DASHBOARD_TABS_DATA.forEach((tab, index) => {
    const btn = document.createElement('button');
    btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
    btn.dataset.id = tab.id;
    btn.innerHTML = `<span class="tab-icon">${tab.icon}</span> <span>${tab.tabTitle}</span>`;
    btn.addEventListener('click', () => switchTab(tab.id));
    tabsContainer.appendChild(btn);
  });

  function switchTab(tabId) {
    const data = DASHBOARD_TABS_DATA.find(t => t.id === tabId);
    if (!data) return;

    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.id === tabId);
    });

    // Animate image switch
    screenshotImg.style.opacity = '0.3';
    screenshotImg.style.transform = 'scale(0.98)';

    setTimeout(() => {
      screenshotImg.src = data.imgSrc;
      screenshotImg.alt = `Chomiam Dashboard - ${data.title}`;
      screenshotImg.dataset.fullSrc = data.imgSrc;
      screenshotImg.dataset.title = data.title;

      screenshotImg.style.opacity = '1';
      screenshotImg.style.transform = 'scale(1)';
    }, 150);

    // Update Meta
    if (metaTag) metaTag.textContent = data.tag;
    if (metaTitle) metaTitle.textContent = data.title;
    if (metaDesc) metaDesc.textContent = data.desc;

    if (metaHighlights) {
      metaHighlights.innerHTML = data.highlights.map(item => `
        <div class="highlight-row">
          <span class="highlight-check">✓</span>
          <span>${item}</span>
        </div>
      `).join('');
    }
  }

  // Init first tab
  switchTab(DASHBOARD_TABS_DATA[0].id);

  if (fullScreenBtn) {
    fullScreenBtn.addEventListener('click', () => {
      openLightbox(screenshotImg.src, screenshotImg.dataset.title || 'Chomiam Dashboard');
    });
  }

  screenshotImg.addEventListener('click', () => {
    openLightbox(screenshotImg.src, screenshotImg.dataset.title || 'Chomiam Dashboard');
  });
}

/* ==========================================================================
   2. TERMINAL SIMULATOR (Kitty / Fish style)
   ========================================================================== */

const TERMINAL_COMMANDS = {
  help: `Commandes disponibles :
  <span class="highlight-mauve">help</span>           : Affiche ce menu d'aide
  <span class="highlight-mauve">rust</span>           : Pourquoi Rust propulse le Dashboard et l'Installer
  <span class="highlight-mauve">cargo</span>          : Simuler la compilation native ultra-rapide
  <span class="highlight-mauve">electron</span>       : Tenter d'ouvrir une app desktop gloutonne
  <span class="highlight-mauve">java</span>           : Invoquer la JVM et son tas infini
  <span class="highlight-mauve">cpp</span>            : Tenter de déclencher un segfault
  <span class="highlight-mauve">fastfetch</span>      : Spécifications du système et logo Catppuccin
  <span class="highlight-mauve">aichat</span>         : Poser une question à l'IA embarquée locale
  <span class="highlight-mauve">nh os switch</span>   : Simuler un build atomique NixOS avec nom
  <span class="highlight-mauve">ollama list</span>    : Lister les modèles LLM préchargés en VRAM
  <span class="highlight-mauve">rollback</span>       : Revenir instantanément à la génération précédente
  <span class="highlight-mauve">python</span>         : Tester si Python ose exister ici
  <span class="highlight-mauve">sudo rm -rf /</span>  : Tenter de détruire le système immuable
  <span class="highlight-mauve">git commit</span>     : Générer un commit de pur vibe-coding
  <span class="highlight-mauve">joke</span>           : Générer une punchline de vibe-coding
  <span class="highlight-mauve">cat vars.nix</span>   : Examiner les variables écrites par le Dashboard
  <span class="highlight-mauve">clear</span>          : Nettoyer la console`,

  rust: `<span class="highlight-peach">🦀 rustc 1.85.0 (Borrow Checker Suprême) :</span>
- <strong>Chomiam Installer</strong> : 100% Rust natif (0 segfault, 0 crash)
- <strong>Chomiam Dashboard</strong> : 100% Rust natif (zéro Electron, zéro bloat)
- <strong>Temps de boot</strong> : 3.1 millisecondes
- <strong>Mémoire vive</strong> : ~14 Mo (vs 2 Go pour une appli web empaquetée)
<span class="highlight-green">✔ Garantie formelle : aucune fuite de mémoire autorisée par le compilateur.</span>`,

  cargo: `<span class="highlight-peach">📦 cargo build --release</span>
   <span class="highlight-green">Compiling</span> chomiam-installer v0.5.4
   <span class="highlight-green">Compiling</span> chomiam-dashboard v0.5.4
   <span class="highlight-green">Compiling</span> nixos-vars-bridge v0.2.1
    <span class="highlight-green">Finished</span> \`release\` profile [optimized + lto] in 1.34s
<span class="highlight-mauve">✔ Binaires natifs prêts dans target/release. Poids plume : 8.4 Mo.</span>`,

  electron: `<span class="highlight-peach">💀 Tentative d'invocation d'Electron détectée...</span>
<span class="highlight-red">ALERTE GLOUTONNERIE :</span> Un processus tente d'embarquer Google Chromium entier juste pour afficher 3 boutons.
<span class="highlight-peach">🐱 [RUST-SHIELD] :</span> Accès refusé ! Chomiam Dashboard tourne en binaire Rust natif pour économiser votre RAM pour Assetto Corsa et Neovim.`,

  java: `<span class="highlight-peach">☕ java -jar enterprise-system.jar</span>
Initialisation de la JVM...
Allocation de 32 Go de heap mémoire...
Chargement de 48 000 classes \`AbstractFactorySingletonProxyBean\`...
<span class="highlight-red">Erreur :</span> La course de Simracing s'est terminée avant la fin du garbage collection.`,

  cpp: `<span class="highlight-peach">💣 g++ -O3 main.cpp -o app</span>
147 warnings de pointeurs non initialisés ignorés avec dédain.
<span class="highlight-red">Segmentation fault (core dumped) à l'adresse 0x00000000.</span>
Un pointeur sauvage a écrasé la configuration de votre souris.
Passez à Rust, vos nerfs vous remercieront.`,

  fastfetch: `<span class="highlight-mauve">
       /\\_____/\\       </span><span class="highlight-blue">chomiam</span>@<span class="highlight-mauve">chomiamos</span>
      /  o   o  \\      ---------------
     ( ==  ^  == )     <span class="highlight-peach">OS:</span> ChomiamOS 26.05 (Mocha x86_64)
      )         (      <span class="highlight-peach">Host:</span> Station Gaming & IA (x86_64)
     (           )     <span class="highlight-peach">Kernel:</span> 7.2.7-zen1-chomiam
    ( (  )   (  ) )    <span class="highlight-peach">Uptime:</span> 42 jours (0 reboot, 0 fuite, 100% vibe)
   (__(__)___(__)__)   <span class="highlight-peach">Shell:</span> fish 4.0.0
                       <span class="highlight-peach">DE:</span> COSMIC Rust / GNOME / Gamescope
                       <span class="highlight-peach">CPU:</span> AMD Ryzen / Intel Core (Auto-Tuning)
                       <span class="highlight-peach">GPU:</span> AMD Radeon / NVIDIA / Intel Arc
                       <span class="highlight-peach">Memory:</span> Swap Zram dynamique ultra-rapide
                       <span class="highlight-peach">Python:</span> 0.00% (Strictement interdit sur ce disque)
                       <span class="highlight-peach">AI Engine:</span> Qwen 2.5 Coder 7B (Local GPU)
                       <span class="highlight-peach">Creator:</span> github.com/Chomiam`,

  'ollama list': `<span class="highlight-mauve">NAME                 ID           SIZE    MODIFIED</span>
qwen2.5-coder:7b     d6d7249826a7 4.7 GB  Active (En VRAM • Neovim Ready)
qwen2.5-coder:3b     5a8e1b9f712c 2.0 GB  Prêt (Mode Eco Gaming)
deepseek-r1:8b       7fa918b2c110 4.9 GB  Prêt (Raisonnement Math)
qwen2.5-coder:1.5b   12e45da7b98f 1.0 GB  Prêt (Mode Plume CPU)`,

  rollback: `<span class="highlight-peach">⏮ Restauration de la génération précédente...</span>
Génération courante : #219 (2026-09-25 11:27:08)
Bascule vers la génération : #218 (2026-09-25 11:24:12)
<span class="highlight-green">✔ Système restauré avec succès en 1.83s.</span>
Aucune trace du crash. Le chat ronronne à nouveau, les puristes d'Arch sont en pleurs.`,

  python: `<span class="highlight-red">⛔ ALERTE SÉCURITÉ ROYALE :</span>
bash: python: commande introuvable (et heureusement !).
ChomiamOS applique la convention de Genève sur les environnements virtuels :
- 0% de venv corrompu
- 0% de pip install qui casse tout votre système
- 0% de traceback de 42 lignes parce qu'il manque un espace
Ici on utilise du Rust natif, du C optimisé, du Nix déclaratif et des LLMs locaux.
Vos SSD vous disent un grand merci.`,

  python3: `<span class="highlight-red">⛔ ALERTE :</span> python3 n'existe pas non plus. Vous espériez quoi ? Un serpent dans un aquarium Catppuccin ?`,

  'sudo rm -rf /': `<span class="highlight-peach">🐱 Tentative de destruction détectée...</span>
<span class="highlight-blue">[NIX-STORE-SHIELD] :</span> /nix/store est monté en Lecture Seule Immuable avec hachage SHA-256 cryptographique.
Même avec les droits root suprêmes, vous ne pouvez pas casser ChomiamOS.
L'OS vous regarde droit dans les yeux avec condescendance et mange une croquette.`,

  'git commit': () => {
    const commits = [
      "git commit -m 'feat: j'ai demandé poliment à DeepSeek de ne pas freeze le wifi, ça marche'",
      "git commit -m 'fix: suppression de 400 lignes de code remplacées par une prière à Claude 3.7'",
      "git commit -m 'style: rendu encore plus Catppuccin parce que les FPS augmentent avec les couleurs pastel'",
      "git commit -m 'perf: activation du retour de force Fanatec à 1000% pour sentir les nids-de-poule dans Neovim'",
      "git commit -m 'chore: refactorisation totale à 4h12 du matin sans aucun test, que Dieu nous garde'"
    ];
    return `<span class="highlight-green">✔ Commit vibe-codé créé :</span><br><code>${commits[Math.floor(Math.random() * commits.length)]}</code>`;
  },

  'cat vars.nix': `<span class="highlight-blue"># /etc/nixos/vars.nix - Généré automatiquement par Chomiam Dashboard</span>
{
  chomiam = {
    desktop = "cosmic"; # GNOME | cosmic | cinnamon | kde
    gaming = {
      enable = true;
      steamGamescope = true;
      simracing = {
        oversteer = true;
        ffb_wheel = "fanatec-directdrive";
      };
      sunshine = false;
    };
    ai = {
      enableOllama = true;
      defaultModel = "qwen2.5-coder:7b";
      neovimAutocomplete = true;
    };
    dns = "cloudflare-standard";
    pythonAllowed = false; # Ne jamais toucher sous peine d'excommunication
  };
}`,

  'nh os switch': `<span class="highlight-mauve">⚙ nh os switch --ask</span>
<span class="highlight-sapphire">nixos-system-chomiamos-26.05 > building '/nix/store/89...-activate.drv'</span>
<span class="highlight-green">✔ Dependency Graph:</span>
  <span class="highlight-green">✔</span> wireplumber-configs
  <span class="highlight-green">✔</span> unit-wireplumber.service
  <span class="highlight-green">✔</span> nixos-system-chomiamos-26.05.20260924
<span class="highlight-peach">Builds: 13 | Downloads: 16 (chomiamos.cachix.org)</span>
<span class="highlight-green">Finished in 24s. Activation atomique sans reboot terminée ! 🚀</span>`,

  joke: () => {
    const jokes = [
      "« Pourquoi passer 2 heures à écrire un flake Nix quand un LLM peut faire une faute de syntaxe en 3 secondes ? »",
      "« Chez ChomiamOS, notre département QA est composé d'une boucle while True qui demande à Claude si le kernel va bien. »",
      "« Neovim avec Qwen 7B en local : il termine votre code avant même que vous n'ayez compris ce que vous vouliez faire. »",
      "« Notre ISO pèse 3 Go mais contient 100% de pure confiance aveugle en l'intelligence artificielle. »",
      "« Un bug dans ChomiamOS ? Impossible, c'est une dérive hallucinée non supervisée sous licence libre. »",
      "« La différence entre un dev NixOS classique et nous ? Lui lit 600 pages de doc en allemand, nous on boit un café pendant que DeepSeek hallucine la dérivation. »",
      "« Pourquoi 0% de Python ? Parce que la vie est trop courte pour déboguer un module compiled against a different NumPy version. »"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
};

function initTerminal() {
  const terminalBody = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');
  const chipButtons = document.querySelectorAll('.term-chip-btn');

  if (!terminalBody || !terminalInput) return;

  const history = [];
  let historyIdx = -1;

  function appendOutput(cmd, outputHtml) {
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line';
    cmdLine.innerHTML = `<span class="term-prompt">chomiam@chomiamos</span>:<span class="term-dir">~</span>$ <span class="highlight-mauve">${escapeHtml(cmd)}</span>`;
    terminalBody.appendChild(cmdLine);

    if (outputHtml) {
      const outLine = document.createElement('div');
      outLine.className = 'term-output';
      outLine.innerHTML = outputHtml;
      terminalBody.appendChild(outLine);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    history.push(cmd);
    historyIdx = history.length;

    if (cmd.toLowerCase() === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    if (cmd.toLowerCase().includes('vibe.sh') || cmd.toLowerCase().includes('chomiamos.org')) {
      appendOutput(cmd, `
        <span class="highlight-red">curl: (6) Could not resolve host: chomiamos.org</span><br>
        <span class="highlight-peach">🐱 [VIBE-WATCHDOG] :</span> On vous avait prévenu juste sous le bouton ! Ce script est 100% fictif et parodique.<br>
        L'IA n'a pas encore acheté le domaine. Pour installer pour de vrai, téléchargez l'ISO sur le <strong>Google Drive</strong> !
      `);
      return;
    }

    if (cmd.toLowerCase().startsWith('aichat')) {
      const promptQuery = cmd.replace(/^aichat\s*/i, '').replace(/['"]/g, '');
      const aiResponses = [
        `🧠 <strong>aichat:</strong> D'après mes pondérations synaptiques, votre demande « ${promptQuery || 'NixOS'} » est tout à fait faisable sans lever le petit doigt. J'ai injecté la config dans <code>/etc/nixos/vars.nix</code>. Détendez-vous.`,
        `🧠 <strong>aichat:</strong> Question existentielle : pourquoi écrire du C++ quand on peut prompter un script en Nix ? Résolution terminée en 12ms.`,
        `🧠 <strong>aichat:</strong> J'ai analysé votre code. C'est 100% du pur vibe-coding. Aucun humain n'aurait pu imaginer une telle architecture, mais ça compile.`
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      appendOutput(cmd, randomResponse);
      return;
    }

    let foundKey = Object.keys(TERMINAL_COMMANDS).find(k => k.toLowerCase() === cmd.toLowerCase());
    if (foundKey) {
      const res = TERMINAL_COMMANDS[foundKey];
      const text = typeof res === 'function' ? res() : res;
      appendOutput(cmd, text);
    } else {
      appendOutput(cmd, `<span class="highlight-red">Commande inconnue: « ${escapeHtml(cmd)} ». Tapez <span class="highlight-mauve">help</span> pour la liste.</span>`);
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIdx > 0) {
        historyIdx--;
        terminalInput.value = history[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < history.length - 1) {
        historyIdx++;
        terminalInput.value = history[historyIdx];
      } else {
        historyIdx = history.length;
        terminalInput.value = '';
      }
    }
  });

  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      if (cmd) {
        terminalInput.value = cmd;
        handleCommand(cmd);
        terminalInput.value = '';
        terminalInput.focus();
      }
    });
  });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ==========================================================================
   3. AI EXCUSES / HALLUCINATION GENERATOR
   ========================================================================== */

const AI_EXCUSES = [
  "« Le modèle 7B a confondu `systemd` avec un poème symboliste du XIXe siècle. Le kernel a adoré la prose. »",
  "« Nous avons réglé la température de sampling à 0.95 : le pilote graphique a décidé de peindre en style cubiste. »",
  "« Pourquoi écrire des tests unitaires quand on peut déclarer que les bugs sont des choix esthétiques déconstructivistes ? »",
  "« Ce n'est pas une fuite de mémoire, c'est le modèle qui se souvient affectueusement de chaque octet depuis 1970. »",
  "« Le script a été généré avec un prompt de 4 mots à 4h du matin. Il fonctionne par pure télépathie quantique. »",
  "« Si Neovim refuse de quitter, c'est qu'Ollama a entamé une négociation diplomatique avec votre clavier. »",
  "« La configuration Nix est mathématiquement prouvée comme indestructible, le seul problème est que l'univers n'est pas prêt. »",
  "« On a demandé à l'IA d'optimiser le son des jeux, elle a transformé le klaxon de Fanatec en miaou. »",
  "« Le compilateur Rust a rejeté le code 47 fois, alors on a demandé à DeepSeek de flatter le compilateur. Ça a marché. »",
  "« Ce bug n'en est pas un : c'est un easter egg quantique généré pour tester vos réflexes cognitifs. »",
  "« Un problème avec votre carte graphique ? Elle essayait simplement de rendre en 16K une image d'un chat qui dort. »",
  "« Quelqu'un a mentionné le mot 'Python' près du serveur : le pare-feu s'est immédiatement mis en PLS par mesure de précaution. »"
];

function initExcuseGenerator() {
  const excuseQuote = document.getElementById('excuseQuote');
  const excuseBtn = document.getElementById('excuseBtn');

  if (!excuseQuote || !excuseBtn) return;

  excuseBtn.addEventListener('click', () => {
    excuseQuote.style.opacity = '0';
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * AI_EXCUSES.length);
      excuseQuote.textContent = AI_EXCUSES[randomIdx];
      excuseQuote.style.opacity = '1';
    }, 200);
  });
}

/* ==========================================================================
   4. FAQ ACCORDION
   ========================================================================== */

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close others if desired, or toggle
      faqItems.forEach(other => other.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ==========================================================================
   5. COPY BUTTONS & TOASTS
   ========================================================================== */

function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        btn.classList.add('copied');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✓ Vent Copié !</span>';

        if (textToCopy.includes('vibe.sh')) {
          showToast('🪄 Commande placebo copiée ! Vous venez de copier du vent avec élégance. Pour la vraie install, prenez l\'ISO sur Google Drive !');
        } else {
          showToast('Copié dans le presse-papier !');
        }

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalText;
        }, 2200);
      }).catch(err => {
        console.error('Erreur copie :', err);
      });
    });
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🐱</span> <span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

/* ==========================================================================
   6. LIGHTBOX MODAL
   ========================================================================== */

function initLightbox() {
  const lightbox = document.getElementById('modalLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (!lightbox || !lightboxImg) return;

  window.openLightbox = function(src, title) {
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = title || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('modal-content-wrapper')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * ChomiamOS - Showcase Interactive Script
 * 100% Vanilla JS, 0% Python, Ultra-rapide & Réactif
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardShowcase();
  initTerminal();
  initArcadeGame();
  initArcadeLeaderboard();
  initExcuseGenerator();
  initFaqAccordion();
  initCopyButtons();
  initLightbox();
  initBugReportTracker();
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
  <span class="highlight-mauve">game</span>           : Lancer le mini-jeu Terminal Arcade Meteor Buster 👾
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
  <span class="highlight-mauve">tokens</span>         : Consulter notre réserve de tokens IA pour recruter
  <span class="highlight-mauve">testers</span>        : Appel aux armes pour les crash-testeurs
  <span class="highlight-mauve">thanks</span>         : Crédits et hommages à GLFOS et Catppuccin
  <span class="highlight-mauve">legal</span>          : Mentions légales, conformité LCEN & RGPD
  <span class="highlight-mauve">cat vars.nix</span>   : Examiner les variables écrites par le Dashboard
  <span class="highlight-mauve">clear</span>          : Nettoyer la console`,

  game: `<span class="highlight-mauve">🚀 INITIALISATION DU TERMINAL ARCADE : METEOR BUSTER</span>
- <strong>Vaisseau :</strong> Starfighter ChomiamOS en pur esprit Rust (0% Python)
- <strong>Contrôles :</strong> Déplacements en <strong>ZQSD</strong>, tirs plasma avec <strong>ESPACE</strong>
- <strong>Mécanique :</strong> Les météores se cassent en 2 à chaque tir réussi ! Survivez avec vos 3 cœurs.
- <strong>Accès direct :</strong> <a href="#arcade" style="color: var(--mauve); text-decoration: underline; font-weight: bold;">Accéder au Terminal Arcade #arcade 👾</a>`,

  arcade: `<span class="highlight-mauve">🕹️ MINI-JEU D'ARCADE NIXOS :</span> Rendez-vous sur la section <a href="#arcade" style="color: var(--mauve); text-decoration: underline;">#arcade</a> pour détruire un maximum de météores en ZQSD !`,
  asteroids: `<span class="highlight-mauve">☄️ METEOR BUSTER :</span> Retrouvez le jeu directement sur <a href="#arcade" style="color: var(--mauve); text-decoration: underline;">#arcade</a> !`,
  meteor: `<span class="highlight-mauve">☄️ METEOR BUSTER :</span> Retrouvez le jeu directement sur <a href="#arcade" style="color: var(--mauve); text-decoration: underline;">#arcade</a> !`,

  thanks: `<span class="highlight-mauve">💖 HOMMAGES & REMERCIEMENTS OFFICIELS :</span>
- <span class="highlight-peach">🚀 GLFOS (glfos.org) :</span> C'est grâce à eux qu'on a découvert l'existence de NixOS ! Et leur nouvel installateur nous a donné envie de faire le nôtre en Rust (et surtout pas en Python comme eux). Vive le Rust ! 🦀
- <span class="highlight-pink">🐱 Catppuccin (catppuccin.com) :</span> Thème tellement divin qu'on a absolument tout copié sans vergogne. Merci pour vos palettes !`,

  legal: `<span class="highlight-mauve">⚖️ MENTIONS LÉGALES & TRANSPARENCE JURIDIQUE :</span>
- <strong>Éditeur :</strong> Projet open-source sous licence libre maintenu par Chomiam (Article 6, III, 2° LCEN).
- <strong>Hébergeur :</strong> Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA).
- <strong>Garantie :</strong> Fourni « EN L'ÉTAT » (AS IS). Sauvegardez vos données avant de tester !
- <strong>Page complète :</strong> Consultez <a href="mentions-legales.html" style="color: var(--mauve); text-decoration: underline;">mentions-legales.html</a> pour la version intégrale.`,

  mentions: `<span class="highlight-mauve">⚖️ MENTIONS LÉGALES :</span> Consultez <a href="mentions-legales.html" style="color: var(--mauve); text-decoration: underline;">mentions-legales.html</a> pour l'ensemble des dispositions LCEN et RGPD.`,

  tokens: `<span class="highlight-peach">🪙 RECRUTEMENT EN TOKENS IA NON TRANSFÉRABLES :</span>
- <strong>Rémunération horaire :</strong> 12 000 tokens Claude 3.7 + 1 caresse au chat.
- <strong>Profil recherché :</strong> Capacité à regarder un écran noir pendant 45s en disant « je crois que ça build ».
- <strong>Postuler :</strong> Téléchargez l'ISO sur Google Drive, cassez tout et rapportez les bugs !`,

  testers: `<span class="highlight-mauve">🎯 APPEL AUX CRASH-TESTEURS :</span>
Nous cherchons des testeurs déterminés pour :
1. <span class="highlight-peach">Simracing :</span> Maltraiter les volants Fanatec, Moza, Simucube, Thrustmaster, Logitech.
2. <span class="highlight-green">Steam GameScope :</span> Pousser les jeux Windows et l'upscaling FSR en session console.
3. <span class="highlight-blue">Hardware :</span> Tester sur Nvidia, Intel Arc et laptops hybrides.
Rendez-vous dans la section <span class="highlight-mauve">#report-bug</span> pour nous ouvrir une Issue GitHub !`,

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

/* ==========================================================================
   7. BUG REPORT TRACKER & GITHUB AUTH SIMULATOR
   ========================================================================== */

function initBugReportTracker() {
  const authBtn = document.getElementById('bugAuthBtn');
  const authBtnText = document.getElementById('bugAuthBtnText');
  const userAvatar = document.getElementById('bugUserAvatar');
  const userName = document.getElementById('bugUserName');
  const userStatus = document.getElementById('bugUserStatus');
  const submitBtn = document.getElementById('bugSubmitBtn');

  if (!submitBtn) return;

  let currentGhUser = localStorage.getItem('chomiam_gh_user') || null;

  async function loadGhUser(username) {
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
      if (!res.ok) throw new Error('Utilisateur non trouvé');
      const data = await res.json();
      currentGhUser = data.login;
      localStorage.setItem('chomiam_gh_user', data.login);

      userAvatar.src = data.avatar_url;
      userName.innerHTML = `<span>@${data.login}</span> <span class="badge" style="background: rgba(166, 227, 161, 0.2); color: var(--green); border: 1px solid var(--green); font-size: 0.7rem;">GitHub Vérifié ✔</span>`;
      userStatus.textContent = `${data.name ? data.name + ' • ' : ''}${data.public_repos} repos publics sur GitHub`;
      if (authBtnText) authBtnText.textContent = `Changer de compte (@${data.login})`;
      showToast(`Connecté avec succès en tant que @${data.login} !`);
    } catch (e) {
      showToast('❌ Compte GitHub introuvable. Vérifiez le pseudo saisi.');
    }
  }

  if (currentGhUser) {
    loadGhUser(currentGhUser);
  }

  if (authBtn) {
    authBtn.addEventListener('click', () => {
      const input = prompt('Entrez votre nom d\'utilisateur GitHub (ex: Chomiam, torvalds...) :', currentGhUser || '');
      if (input && input.trim()) {
        loadGhUser(input.trim());
      }
    });
  }

  submitBtn.addEventListener('click', () => {
    const category = document.getElementById('bugCategory').value;
    const hardware = document.getElementById('bugHardware').value.trim() || 'Non spécifié';
    const title = document.getElementById('bugTitle').value.trim();
    const desc = document.getElementById('bugDesc').value.trim();
    const checkRollback = document.getElementById('checkRollback').checked ? 'Oui' : 'Non';
    const checkNoPython = document.getElementById('checkNoPython').checked ? 'Oui (Strictement 0% Python)' : 'Non';
    const checkAiTolerant = document.getElementById('checkAiTolerant').checked ? 'Accepté' : 'Non';

    if (!title || !desc) {
      showToast('⚠️ Veuillez renseigner un titre et une description du bug !');
      return;
    }

    const reporter = currentGhUser ? `@${currentGhUser}` : 'Visiteur anonyme';

    const issueBody = `### 🐛 Description de l'anomalie
${desc}

---

### 🏷️ Détails techniques
- **Composant concerné :** ${category}
- **Configuration matérielle :** ${hardware}
- **Signalé par :** ${reporter}

### 🛡️ Check-list de survie
- [x] Rollback NixOS testé : **${checkRollback}**
- [x] Règle zéro Python respectée : **${checkNoPython}**
- [x] Tolérance aux hallucinations IA : **${checkAiTolerant}**

---
*Rapport généré automatiquement depuis le [Bug Tracker officiel ChomiamOS](https://chomiamos-website.vercel.app/#report-bug)*`;

    const repoUrl = 'https://github.com/Chomiam/chomiamos-website/issues/new';
    const fullUrl = `${repoUrl}?title=${encodeURIComponent('[' + category.toUpperCase() + '] ' + title)}&body=${encodeURIComponent(issueBody)}&labels=bug,vibe-coded`;

    showToast('🚀 Préparation du ticket GitHub... Redirection en cours !');
    setTimeout(() => {
      window.open(fullUrl, '_blank');
    }, 600);
  });
}

/* ==========================================================================
   8. TERMINAL ARCADE MINI-GAME : METEOR BUSTER
   100% Canvas 2D + Web Audio API Synthétiseur
   Contrôles : ZQSD + ESPACE • Thème Catppuccin Mocha • 3 Vies (Cœurs)
   Division binaire des météores : Gros -> 2 Moyens -> 4 Petits -> Destruction
   ========================================================================== */

function initArcadeGame() {
  const container = document.getElementById('arcadeScreenContainer');
  const canvas = document.getElementById('arcadeCanvas');
  const terminalWindow = document.getElementById('arcadeTerminalWindow');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');

  // DOM Elements
  const headerScore = document.getElementById('arcadeHeaderScore');
  const headerHearts = document.getElementById('arcadeHeaderHearts');
  const soundBtn = document.getElementById('arcadeSoundBtn');
  const soundIcon = document.getElementById('arcadeSoundIcon');
  const soundText = document.getElementById('arcadeSoundText');
  const resetBtn = document.getElementById('arcadeResetBtn');
  const dotReset = document.getElementById('arcadeDotReset');
  const dotPause = document.getElementById('arcadeDotPause');
  const dotExpand = document.getElementById('arcadeDotExpand');

  const startOverlay = document.getElementById('arcadeStartOverlay');
  const pauseOverlay = document.getElementById('arcadePauseOverlay');
  const gameOverOverlay = document.getElementById('arcadeGameOverOverlay');
  const startBtn = document.getElementById('arcadeStartBtn');
  const resumeBtn = document.getElementById('arcadeResumeBtn');
  const restartBtn = document.getElementById('arcadeRestartBtn');

  const gameOverScore = document.getElementById('gameOverScore');
  const gameOverHigh = document.getElementById('gameOverHigh');
  const gameOverKills = document.getElementById('gameOverKills');
  const newRecordBanner = document.getElementById('newRecordBanner');

  // Virtual Canvas Dimensions
  const V_WIDTH = 900;
  const V_HEIGHT = 520;
  canvas.width = V_WIDTH;
  canvas.height = V_HEIGHT;

  // Catppuccin Mocha Palette
  const PALETTE = {
    crust: '#11111b',
    mantle: '#181825',
    base: '#1e1e2e',
    surface0: '#313244',
    surface1: '#45475a',
    surface2: '#585b70',
    overlay0: '#6c7086',
    overlay1: '#7f849c',
    text: '#cdd6f4',
    subtext0: '#a6adc8',
    subtext1: '#bac2de',
    mauve: '#cba6f7',
    lavender: '#b4befe',
    blue: '#89b4fa',
    sapphire: '#74c7ec',
    sky: '#89dceb',
    teal: '#94e2d5',
    green: '#a6e3a1',
    yellow: '#f9e2af',
    peach: '#fab387',
    maroon: '#eba0ac',
    red: '#f38ba8',
    pink: '#f5c2e7',
    flamingo: '#f2cdcd'
  };

  // Web Audio Synthesizer
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freqStart, freqEnd, duration, type = 'sine', vol = 0.12) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 20), audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (_) {}
  }

  function playNoise(duration, vol = 0.15) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const bufferSize = audioCtx.sampleRate * duration;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, audioCtx.currentTime);
      filter.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + duration);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      whiteNoise.start();
    } catch (_) {}
  }

  const sfx = {
    laser: () => playTone(840, 180, 0.12, 'sawtooth', 0.08),
    split: () => playTone(480, 95, 0.14, 'triangle', 0.14),
    explode: () => playNoise(0.3, 0.18),
    hurt: () => {
      playTone(180, 60, 0.35, 'square', 0.18);
      playTone(220, 80, 0.35, 'sawtooth', 0.14);
    },
    wave: () => {
      setTimeout(() => playTone(440, 440, 0.1, 'sine', 0.1), 0);
      setTimeout(() => playTone(554, 554, 0.1, 'sine', 0.1), 100);
      setTimeout(() => playTone(659, 659, 0.22, 'sine', 0.12), 200);
    },
    gameOver: () => {
      setTimeout(() => playTone(440, 415, 0.18, 'sawtooth', 0.1), 0);
      setTimeout(() => playTone(415, 370, 0.18, 'sawtooth', 0.1), 160);
      setTimeout(() => playTone(370, 311, 0.22, 'sawtooth', 0.1), 320);
      setTimeout(() => playTone(311, 196, 0.4, 'sawtooth', 0.12), 480);
    }
  };

  // Sound Toggle Button
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundIcon) soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      if (soundText) soundText.textContent = soundEnabled ? 'Son ON' : 'Son OFF';
      if (soundEnabled) initAudio();
    });
  }

  // Game States
  let gameState = 'START'; // 'START' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'
  let score = 0;
  let highScore = parseInt(localStorage.getItem('chomiamos_arcade_high') || '0', 10);
  let lives = 3;
  let wave = 1;
  let meteorsDestroyed = 0;
  let screenShake = 0;
  let waveBannerText = '';
  let waveBannerTimer = 0;

  // Key tracking (ZQSD + Space + Aliases)
  const keys = {
    thrust: false,  // Z / W / Up
    left: false,    // Q / A / Left
    right: false,   // D / Right
    brake: false,   // S / Down
    fire: false     // Space
  };

  // Spaceship (Physique ajustée : accélération plus progressive et maniable)
  const ship = {
    x: V_WIDTH / 2,
    y: V_HEIGHT / 2,
    vx: 0,
    vy: 0,
    angle: -Math.PI / 2,
    rotSpeed: 0.058,
    thrustPower: 0.085,
    brakePower: 0.92,
    drag: 0.980,
    maxSpeed: 4.8,
    radius: 14,
    invulnerable: 0,
    shootCooldown: 0
  };

  // Entities
  let bullets = [];
  let meteors = [];
  let particles = [];
  let floatingTexts = [];
  let stars = [];

  // Deep Starfield
  function initStars() {
    stars = [];
    const starColors = [PALETTE.lavender, PALETTE.mauve, PALETTE.blue, PALETTE.sky, PALETTE.subtext1, PALETTE.text];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * V_WIDTH,
        y: Math.random() * V_HEIGHT,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }
  }

  // Create Meteor (Asteroid)
  function createMeteor(x, y, tier, customVx, customVy) {
    let radius;
    let baseSpeed;
    let strokeColor;
    let fillColor;

    if (tier === 3) {
      // Grand météore (Gros)
      radius = Math.random() * 8 + 38;
      baseSpeed = Math.random() * 0.7 + 0.6;
      strokeColor = PALETTE.sapphire;
      fillColor = 'rgba(49, 50, 68, 0.45)';
    } else if (tier === 2) {
      // Moyen météore (après 1ère division)
      radius = Math.random() * 5 + 21;
      baseSpeed = Math.random() * 1.0 + 1.2;
      strokeColor = PALETTE.mauve;
      fillColor = 'rgba(69, 71, 90, 0.5)';
    } else {
      // Petit météore (après 2ème division - vitesse ralentie et agréable)
      radius = Math.random() * 4 + 11;
      baseSpeed = Math.random() * 0.5 + 1.1;
      strokeColor = PALETTE.peach;
      fillColor = 'rgba(88, 91, 112, 0.55)';
    }

    const angle = Math.random() * Math.PI * 2;
    const vx = customVx !== undefined ? customVx : Math.cos(angle) * baseSpeed;
    const vy = customVy !== undefined ? customVy : Math.sin(angle) * baseSpeed;

    const vertexCount = tier === 3 ? 12 : (tier === 2 ? 9 : 7);
    const vertices = [];
    for (let i = 0; i < vertexCount; i++) {
      const a = (i / vertexCount) * Math.PI * 2;
      const variance = (Math.random() * 0.45 + 0.8);
      vertices.push({
        x: Math.cos(a) * radius * variance,
        y: Math.sin(a) * radius * variance
      });
    }

    return {
      x,
      y,
      vx,
      vy,
      tier,
      radius,
      vertices,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.035,
      strokeColor,
      fillColor
    };
  }

  // Spawn Wave
  function spawnWave(waveNum) {
    meteors = [];
    const count = Math.min(3 + waveNum, 9);
    for (let i = 0; i < count; i++) {
      let x, y;
      do {
        x = Math.random() * V_WIDTH;
        y = Math.random() * V_HEIGHT;
      } while (Math.hypot(x - ship.x, y - ship.y) < 180);

      meteors.push(createMeteor(x, y, 3));
    }

    waveBannerText = `VAGUE ${waveNum}`;
    waveBannerTimer = 110;
    if (waveNum > 1) {
      sfx.wave();
    }
  }

  // Update HUD
  function updateHud() {
    if (headerScore) {
      headerScore.textContent = String(score).padStart(5, '0');
    }

    // Update 3 Hearts in Header
    if (headerHearts) {
      headerHearts.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const heartSpan = document.createElement('span');
        heartSpan.className = `arcade-heart ${i <= lives ? 'active' : 'inactive'}`;
        heartSpan.textContent = i <= lives ? '❤️' : '🖤';
        headerHearts.appendChild(heartSpan);
      }
      headerHearts.setAttribute('aria-label', `${lives} cœurs restants sur 3`);
    }
  }

  // Spawn Particles
  function spawnParticles(x, y, count, colors, speedMultiplier = 1) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 3 + 1) * speedMultiplier;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.floor(Math.random() * 25 + 20)
      });
    }
  }

  function spawnFloatingText(x, y, text, color) {
    floatingTexts.push({
      x,
      y,
      text,
      color,
      life: 0,
      maxLife: 45
    });
  }

  // Start / Restart Game
  function startGame() {
    initAudio();
    gameState = 'PLAYING';
    score = 0;
    lives = 3;
    wave = 1;
    meteorsDestroyed = 0;
    screenShake = 0;

    bullets = [];
    particles = [];
    floatingTexts = [];

    ship.x = V_WIDTH / 2;
    ship.y = V_HEIGHT / 2;
    ship.vx = 0;
    ship.vy = 0;
    ship.angle = -Math.PI / 2;
    ship.invulnerable = 150; // 2.5s safe time

    if (startOverlay) startOverlay.classList.add('hidden');
    if (pauseOverlay) pauseOverlay.classList.add('hidden');
    if (gameOverOverlay) gameOverOverlay.classList.add('hidden');

    spawnWave(wave);
    updateHud();
    container.focus();
  }

  // Pause Toggle
  function togglePause() {
    if (gameState === 'PLAYING') {
      gameState = 'PAUSED';
      if (pauseOverlay) pauseOverlay.classList.remove('hidden');
    } else if (gameState === 'PAUSED') {
      gameState = 'PLAYING';
      if (pauseOverlay) pauseOverlay.classList.add('hidden');
      container.focus();
    }
  }

  // Game Over
  function triggerGameOver() {
    gameState = 'GAMEOVER';
    sfx.gameOver();

    const isNewRecord = score > highScore;
    if (isNewRecord) {
      highScore = score;
      localStorage.setItem('chomiamos_arcade_high', highScore.toString());
    }

    if (gameOverScore) gameOverScore.textContent = String(score).padStart(5, '0');
    if (gameOverHigh) gameOverHigh.textContent = String(highScore).padStart(5, '0');
    if (gameOverKills) gameOverKills.textContent = meteorsDestroyed.toString();

    if (newRecordBanner) {
      if (isNewRecord && score > 0) {
        newRecordBanner.classList.remove('hidden');
      } else {
        newRecordBanner.classList.add('hidden');
      }
    }

    if (gameOverOverlay) gameOverOverlay.classList.remove('hidden');
    updateHud();

    // Notify Leaderboard & Hall of Fame of score
    if (typeof window.onArcadeGameOver === 'function') {
      window.onArcadeGameOver(score, wave, meteorsDestroyed);
    }
  }

  // Hit Meteor & 2-way Split Logic
  function hitMeteor(meteor, bulletVx, bulletVy) {
    meteorsDestroyed++;
    const nextTier = meteor.tier - 1;
    let pointsAwarded = 0;

    if (meteor.tier === 3) {
      pointsAwarded = 20;
    } else if (meteor.tier === 2) {
      pointsAwarded = 50;
    } else {
      pointsAwarded = 100;
    }

    score += pointsAwarded;
    spawnFloatingText(meteor.x, meteor.y, `+${pointsAwarded}`, PALETTE.green);

    const colors = [PALETTE.peach, PALETTE.pink, PALETTE.mauve, PALETTE.sapphire, PALETTE.yellow];
    spawnParticles(meteor.x, meteor.y, meteor.tier * 7, colors);

    if (nextTier >= 1) {
      // Scission en 2 morceaux (vitesse tempérée pour un bon feeling arcade)
      sfx.split();
      const baseAngle = Math.atan2(bulletVy, bulletVx);
      const splitAngle1 = baseAngle + 0.55 + Math.random() * 0.25;
      const splitAngle2 = baseAngle - 0.55 - Math.random() * 0.25;
      const childSpeed = nextTier === 1 
        ? Math.random() * 0.35 + 1.35   // Petits météores modérés et lisibles
        : Math.random() * 0.3 + 1.1;    // Moyens météores

      const m1 = createMeteor(meteor.x, meteor.y, nextTier, Math.cos(splitAngle1) * childSpeed, Math.sin(splitAngle1) * childSpeed);
      const m2 = createMeteor(meteor.x, meteor.y, nextTier, Math.cos(splitAngle2) * childSpeed, Math.sin(splitAngle2) * childSpeed);

      meteors.push(m1, m2);
    } else {
      // Destruction totale du petit fragment
      sfx.explode();
    }

    updateHud();
  }

  // Ship Hit
  function hitShip() {
    if (ship.invulnerable > 0) return;

    lives--;
    updateHud();
    screenShake = 16;
    sfx.hurt();

    spawnParticles(ship.x, ship.y, 28, [PALETTE.red, PALETTE.peach, PALETTE.yellow, PALETTE.flamingo], 1.4);

    if (lives <= 0) {
      triggerGameOver();
    } else {
      ship.x = V_WIDTH / 2;
      ship.y = V_HEIGHT / 2;
      ship.vx = 0;
      ship.vy = 0;
      ship.angle = -Math.PI / 2;
      ship.invulnerable = 150; // 2.5s safe shield

      for (const m of meteors) {
        const d = Math.hypot(m.x - ship.x, m.y - ship.y);
        if (d < 160) {
          const pushAngle = Math.atan2(m.y - ship.y, m.x - ship.x);
          m.x = ship.x + Math.cos(pushAngle) * 180;
          m.y = ship.y + Math.sin(pushAngle) * 180;
        }
      }
    }
  }

  // Laser Fire
  function shootLaser() {
    if (gameState !== 'PLAYING') return;
    if (ship.shootCooldown > 0) return;

    const noseX = ship.x + Math.cos(ship.angle) * ship.radius * 1.3;
    const noseY = ship.y + Math.sin(ship.angle) * ship.radius * 1.3;
    const bulletSpeed = 9.5;

    bullets.push({
      x: noseX,
      y: noseY,
      vx: Math.cos(ship.angle) * bulletSpeed + ship.vx * 0.35,
      vy: Math.sin(ship.angle) * bulletSpeed + ship.vy * 0.35,
      life: 0,
      maxLife: 48,
      color: PALETTE.teal
    });

    sfx.laser();
    ship.shootCooldown = 9;
  }

  // Keyboard Event Listeners (ZQSD + ESPACE + Aliases)
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.code;
    let handled = false;

    // Movement: Z (or W or Up) -> Propulsion
    if (key === 'KeyZ' || key === 'KeyW' || key === 'ArrowUp') {
      keys.thrust = true;
      handled = true;
    }
    // Q (or A or Left) -> Pivoter Gauche
    if (key === 'KeyQ' || key === 'KeyA' || key === 'ArrowLeft') {
      keys.left = true;
      handled = true;
    }
    // D (or Right) -> Pivoter Droite
    if (key === 'KeyD' || key === 'ArrowRight') {
      keys.right = true;
      handled = true;
    }
    // S (or Down) -> Rétro-freinage
    if (key === 'KeyS' || key === 'ArrowDown') {
      keys.brake = true;
      handled = true;
    }
    // Tir: ESPACE
    if (key === 'Space') {
      keys.fire = true;
      handled = true;
      if (gameState === 'START' || gameState === 'GAMEOVER') {
        startGame();
      } else if (gameState === 'PAUSED') {
        togglePause();
      } else if (gameState === 'PLAYING') {
        shootLaser();
      }
    }
    // Pause: P
    if (key === 'KeyP') {
      togglePause();
      handled = true;
    }
    // Restart: R
    if (key === 'KeyR') {
      startGame();
      handled = true;
    }
    // Mute: M
    if (key === 'KeyM') {
      if (soundBtn) soundBtn.click();
      handled = true;
    }

    if (handled && (gameState === 'PLAYING' || gameState === 'PAUSED' || document.activeElement === container)) {
      e.preventDefault();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.code;
    if (key === 'KeyZ' || key === 'KeyW' || key === 'ArrowUp') keys.thrust = false;
    if (key === 'KeyQ' || key === 'KeyA' || key === 'ArrowLeft') keys.left = false;
    if (key === 'KeyD' || key === 'ArrowRight') keys.right = false;
    if (key === 'KeyS' || key === 'ArrowDown') keys.brake = false;
    if (key === 'Space') keys.fire = false;
  });

  // Touch Virtual Controls for Mobile Devices
  const touchMap = [
    { id: 'touchUp', key: 'thrust' },
    { id: 'touchLeft', key: 'left' },
    { id: 'touchDown', key: 'brake' },
    { id: 'touchRight', key: 'right' }
  ];

  touchMap.forEach(item => {
    const el = document.getElementById(item.id);
    if (!el) return;
    const setPress = (val) => (e) => {
      e.preventDefault();
      keys[item.key] = val;
    };
    el.addEventListener('touchstart', setPress(true), { passive: false });
    el.addEventListener('touchend', setPress(false), { passive: false });
    el.addEventListener('mousedown', setPress(true));
    el.addEventListener('mouseup', setPress(false));
    el.addEventListener('mouseleave', setPress(false));
  });

  const touchFire = document.getElementById('touchFire');
  if (touchFire) {
    const fireAction = (e) => {
      e.preventDefault();
      if (gameState === 'START' || gameState === 'GAMEOVER') {
        startGame();
      } else if (gameState === 'PAUSED') {
        togglePause();
      } else if (gameState === 'PLAYING') {
        shootLaser();
      }
    };
    touchFire.addEventListener('touchstart', fireAction, { passive: false });
    touchFire.addEventListener('mousedown', fireAction);
  }

  // Buttons & Header Controls
  if (startBtn) startBtn.addEventListener('click', startGame);
  if (resumeBtn) resumeBtn.addEventListener('click', togglePause);
  if (restartBtn) restartBtn.addEventListener('click', startGame);
  if (resetBtn) resetBtn.addEventListener('click', startGame);

  if (dotReset) dotReset.addEventListener('click', startGame);
  if (dotPause) dotPause.addEventListener('click', togglePause);
  if (dotExpand) {
    dotExpand.addEventListener('click', () => {
      if (terminalWindow) terminalWindow.classList.toggle('is-expanded');
    });
  }

  // Main Update
  function update() {
    if (screenShake > 0) screenShake *= 0.88;
    if (screenShake < 0.2) screenShake = 0;

    if (waveBannerTimer > 0) waveBannerTimer--;

    for (const star of stars) {
      star.alpha += (Math.random() - 0.5) * star.twinkleSpeed;
      if (star.alpha > 0.95) star.alpha = 0.95;
      if (star.alpha < 0.25) star.alpha = 0.25;
    }

    if (gameState !== 'PLAYING') return;

    // Ship Rotation (ZQSD: Q = Gauche, D = Droite)
    if (keys.left) ship.angle -= ship.rotSpeed;
    if (keys.right) ship.angle += ship.rotSpeed;

    // Ship Thrust (ZQSD: Z = Avancer)
    if (keys.thrust) {
      ship.vx += Math.cos(ship.angle) * ship.thrustPower;
      ship.vy += Math.sin(ship.angle) * ship.thrustPower;

      // Exhaust flame particles in Catppuccin Peach / Yellow / Red
      if (Math.random() < 0.75) {
        const flameAngle = ship.angle + Math.PI + (Math.random() - 0.5) * 0.45;
        const tailX = ship.x - Math.cos(ship.angle) * ship.radius;
        const tailY = ship.y - Math.sin(ship.angle) * ship.radius;
        const speed = Math.random() * 3 + 2;
        particles.push({
          x: tailX,
          y: tailY,
          vx: Math.cos(flameAngle) * speed + ship.vx * 0.3,
          vy: Math.sin(flameAngle) * speed + ship.vy * 0.3,
          size: Math.random() * 2.5 + 1.2,
          color: Math.random() > 0.5 ? PALETTE.peach : (Math.random() > 0.5 ? PALETTE.yellow : PALETTE.red),
          life: 0,
          maxLife: 16
        });
      }
    }

    // Ship Braking (ZQSD: S = Freiner)
    if (keys.brake) {
      ship.vx *= ship.brakePower;
      ship.vy *= ship.brakePower;
    }

    // Friction & Inertia
    ship.vx *= ship.drag;
    ship.vy *= ship.drag;

    const speed = Math.hypot(ship.vx, ship.vy);
    if (speed > ship.maxSpeed) {
      ship.vx = (ship.vx / speed) * ship.maxSpeed;
      ship.vy = (ship.vy / speed) * ship.maxSpeed;
    }

    ship.x += ship.vx;
    ship.y += ship.vy;

    // Wrap around screen
    if (ship.x < -ship.radius) ship.x = V_WIDTH + ship.radius;
    if (ship.x > V_WIDTH + ship.radius) ship.x = -ship.radius;
    if (ship.y < -ship.radius) ship.y = V_HEIGHT + ship.radius;
    if (ship.y > V_HEIGHT + ship.radius) ship.y = -ship.radius;

    if (ship.invulnerable > 0) ship.invulnerable--;
    if (ship.shootCooldown > 0) ship.shootCooldown--;

    // Bullets update
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.vx;
      b.y += b.vy;
      b.life++;

      if (b.x < 0) b.x = V_WIDTH;
      if (b.x > V_WIDTH) b.x = 0;
      if (b.y < 0) b.y = V_HEIGHT;
      if (b.y > V_HEIGHT) b.y = 0;

      if (b.life >= b.maxLife) {
        bullets.splice(i, 1);
        continue;
      }

      let bulletHit = false;
      for (let j = meteors.length - 1; j >= 0; j--) {
        const m = meteors[j];
        const dist = Math.hypot(b.x - m.x, b.y - m.y);
        if (dist < m.radius + 3) {
          const bVx = b.vx;
          const bVy = b.vy;
          meteors.splice(j, 1);
          bullets.splice(i, 1);
          hitMeteor(m, bVx, bVy);
          bulletHit = true;
          break;
        }
      }
      if (bulletHit) continue;
    }

    // Meteors update
    for (const m of meteors) {
      m.x += m.vx;
      m.y += m.vy;
      m.angle += m.rotSpeed;

      if (m.x < -m.radius) m.x = V_WIDTH + m.radius;
      if (m.x > V_WIDTH + m.radius) m.x = -m.radius;
      if (m.y < -m.radius) m.y = V_HEIGHT + m.radius;
      if (m.y > V_HEIGHT + m.radius) m.y = -m.radius;

      if (ship.invulnerable <= 0) {
        const dist = Math.hypot(ship.x - m.x, ship.y - m.y);
        if (dist < ship.radius + m.radius * 0.85) {
          hitShip();
          break;
        }
      }
    }

    // Wave Cleared Check
    if (meteors.length === 0) {
      wave++;
      score += wave * 250;
      spawnFloatingText(V_WIDTH / 2, V_HEIGHT / 2, `+${wave * 250} BONUS VAGUE !`, PALETTE.yellow);
      spawnWave(wave);
      updateHud();
    }

    // Particles update
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      if (p.life >= p.maxLife) {
        particles.splice(i, 1);
      }
    }

    // Floating texts update
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.y -= 0.8;
      ft.life++;
      if (ft.life >= ft.maxLife) {
        floatingTexts.splice(i, 1);
      }
    }
  }

  // Draw Pixel Heart for Arcade HUD on Canvas
  function drawPixelHeart(x, y, active) {
    ctx.save();
    ctx.translate(x, y);

    const matrix = [
      " 11  11 ",
      "11111111",
      "11111111",
      "11111111",
      " 111111 ",
      "  1111  ",
      "   11   "
    ];

    const pSize = 2;
    const color = active ? PALETTE.red : PALETTE.surface1;

    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] === '1') {
          if (active && r === 1 && (c === 1 || c === 2)) {
            ctx.fillStyle = PALETTE.flamingo;
          } else {
            ctx.fillStyle = color;
          }
          ctx.fillRect(c * pSize, r * pSize, pSize, pSize);
        }
      }
    }

    if (active) {
      ctx.shadowColor = PALETTE.red;
      ctx.shadowBlur = 6;
      ctx.strokeRect(0, 0, matrix[0].length * pSize, matrix.length * pSize);
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }

  // Render Canvas
  function render() {
    ctx.save();

    if (screenShake > 0) {
      const sx = (Math.random() - 0.5) * screenShake;
      const sy = (Math.random() - 0.5) * screenShake;
      ctx.translate(sx, sy);
    }

    // Background Fill
    ctx.fillStyle = PALETTE.crust;
    ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

    // Subtle space grid
    ctx.strokeStyle = 'rgba(49, 50, 68, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < V_WIDTH; x += 60) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, V_HEIGHT);
    }
    for (let y = 0; y < V_HEIGHT; y += 60) {
      ctx.moveTo(0, y);
      ctx.lineTo(V_WIDTH, y);
    }
    ctx.stroke();

    // Twinkling stars
    for (const star of stars) {
      ctx.fillStyle = star.color;
      ctx.globalAlpha = star.alpha;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }
    ctx.globalAlpha = 1.0;

    // Draw Meteors
    for (const m of meteors) {
      ctx.save();
      ctx.translate(m.x, m.y);
      ctx.rotate(m.angle);

      ctx.beginPath();
      for (let i = 0; i < m.vertices.length; i++) {
        const v = m.vertices[i];
        if (i === 0) ctx.moveTo(v.x, v.y);
        else ctx.lineTo(v.x, v.y);
      }
      ctx.closePath();

      ctx.fillStyle = m.fillColor;
      ctx.fill();

      ctx.strokeStyle = m.strokeColor;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = m.strokeColor;
      ctx.shadowBlur = 8;
      ctx.stroke();

      // Subtle crater line
      ctx.strokeStyle = 'rgba(205, 214, 244, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(m.radius * 0.25, m.radius * 0.2, m.radius * 0.25, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    // Draw Lasers
    for (const b of bullets) {
      ctx.save();
      ctx.shadowColor = PALETTE.teal;
      ctx.shadowBlur = 10;
      ctx.fillStyle = PALETTE.green;
      ctx.beginPath();
      ctx.arc(b.x, b.y, 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(b.x, b.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw Particles
    for (const p of particles) {
      const alpha = 1 - p.life / p.maxLife;
      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      ctx.restore();
    }

    // Draw Spaceship
    if (gameState === 'PLAYING' || gameState === 'PAUSED' || gameState === 'START') {
      const shouldDraw = (ship.invulnerable % 10 < 5) || ship.invulnerable === 0;
      if (shouldDraw) {
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.angle);

        // Shield
        if (ship.invulnerable > 0) {
          ctx.strokeStyle = PALETTE.teal;
          ctx.lineWidth = 2;
          ctx.shadowColor = PALETTE.teal;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(0, 0, ship.radius + 10, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = 'rgba(148, 226, 213, 0.12)';
          ctx.fill();
        }

        // Thruster flame animation
        if (keys.thrust) {
          ctx.beginPath();
          ctx.moveTo(-ship.radius * 0.9, -ship.radius * 0.45);
          ctx.lineTo(-ship.radius * (1.7 + Math.random() * 0.6), 0);
          ctx.lineTo(-ship.radius * 0.9, ship.radius * 0.45);
          ctx.closePath();
          ctx.fillStyle = PALETTE.peach;
          ctx.shadowColor = PALETTE.red;
          ctx.shadowBlur = 12;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(-ship.radius * 0.9, -ship.radius * 0.25);
          ctx.lineTo(-ship.radius * 1.3, 0);
          ctx.lineTo(-ship.radius * 0.9, ship.radius * 0.25);
          ctx.closePath();
          ctx.fillStyle = PALETTE.yellow;
          ctx.fill();
        }

        // Starfighter Body
        ctx.beginPath();
        ctx.moveTo(ship.radius * 1.5, 0);
        ctx.lineTo(-ship.radius * 0.9, ship.radius * 1.1);
        ctx.lineTo(-ship.radius * 0.45, 0);
        ctx.lineTo(-ship.radius * 0.9, -ship.radius * 1.1);
        ctx.closePath();

        ctx.fillStyle = PALETTE.base;
        ctx.fill();

        ctx.strokeStyle = PALETTE.mauve;
        ctx.lineWidth = 2.4;
        ctx.shadowColor = PALETTE.mauve;
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Cockpit
        ctx.beginPath();
        ctx.moveTo(ship.radius * 0.7, 0);
        ctx.lineTo(0, ship.radius * 0.35);
        ctx.lineTo(-ship.radius * 0.2, 0);
        ctx.lineTo(0, -ship.radius * 0.35);
        ctx.closePath();
        ctx.fillStyle = PALETTE.sky;
        ctx.shadowColor = PALETTE.sky;
        ctx.shadowBlur = 6;
        ctx.fill();

        // Wing details
        ctx.strokeStyle = PALETTE.lavender;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-ship.radius * 0.2, ship.radius * 0.5);
        ctx.lineTo(-ship.radius * 0.8, ship.radius * 0.9);
        ctx.moveTo(-ship.radius * 0.2, -ship.radius * 0.5);
        ctx.lineTo(-ship.radius * 0.8, -ship.radius * 0.9);
        ctx.stroke();

        ctx.restore();
      }
    }

    // Draw Floating Texts (+points)
    for (const ft of floatingTexts) {
      ctx.save();
      const alpha = 1 - ft.life / ft.maxLife;
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillStyle = ft.color;
      ctx.shadowColor = ft.color;
      ctx.shadowBlur = 6;
      ctx.fillText(ft.text, ft.x - 16, ft.y);
      ctx.restore();
    }

    // Canvas Arcade HUD (Score, High Score, 3 Hearts, Wave)
    ctx.save();
    ctx.font = '11px "Press Start 2P", monospace';
    ctx.shadowBlur = 6;

    // Top-Left: SCORE
    ctx.fillStyle = PALETTE.subtext0;
    ctx.fillText("SCORE", 20, 26);
    ctx.fillStyle = PALETTE.green;
    ctx.shadowColor = PALETTE.green;
    ctx.fillText(String(score).padStart(6, '0'), 20, 44);

    // Top-Center: RECORD
    ctx.fillStyle = PALETTE.subtext0;
    ctx.shadowBlur = 0;
    ctx.fillText("RECORD", V_WIDTH / 2 - 40, 26);
    ctx.fillStyle = PALETTE.mauve;
    ctx.shadowColor = PALETTE.mauve;
    ctx.shadowBlur = 6;
    ctx.fillText(String(highScore).padStart(6, '0'), V_WIDTH / 2 - 40, 44);

    // Top-Right: 3 HEARTS (LIVES)
    ctx.fillStyle = PALETTE.subtext0;
    ctx.shadowBlur = 0;
    ctx.fillText("VIES", V_WIDTH - 110, 26);
    drawPixelHeart(V_WIDTH - 112, 34, lives >= 1);
    drawPixelHeart(V_WIDTH - 84, 34, lives >= 2);
    drawPixelHeart(V_WIDTH - 56, 34, lives >= 3);

    // Wave & Meteors destroyed count
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.fillStyle = PALETTE.sapphire;
    ctx.shadowColor = PALETTE.sapphire;
    ctx.shadowBlur = 4;
    ctx.fillText(`VAGUE ${wave}`, 20, V_HEIGHT - 16);

    ctx.fillStyle = PALETTE.peach;
    ctx.shadowColor = PALETTE.peach;
    ctx.fillText(`MÉTÉORES : ${meteorsDestroyed}`, V_WIDTH - 170, V_HEIGHT - 16);

    // Wave cleared banner
    if (waveBannerTimer > 0) {
      const bannerAlpha = Math.min(1, waveBannerTimer / 25);
      ctx.globalAlpha = bannerAlpha;
      ctx.font = '18px "Press Start 2P", monospace';
      ctx.fillStyle = PALETTE.yellow;
      ctx.shadowColor = PALETTE.yellow;
      ctx.shadowBlur = 14;
      const textWidth = ctx.measureText(waveBannerText).width;
      ctx.fillText(waveBannerText, (V_WIDTH - textWidth) / 2, V_HEIGHT / 2 - 60);
      ctx.globalAlpha = 1.0;
    }

    ctx.restore();
    ctx.restore();
  }

  // Animation Loop
  function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
  }

  // Initialize
  initStars();
  updateHud();
  gameLoop();
}

/* ==========================================================================
   9. ARCADE LEADERBOARD & GITHUB PILOT PROFILES
   Classement Mondial des Pilotes • Hall of Fame Catppuccin
   ========================================================================== */

function initArcadeLeaderboard() {
  const leaderboardBody = document.getElementById('arcadeLeaderboardBody');
  const pilotAvatar = document.getElementById('arcadePilotAvatar');
  const pilotOnlineDot = document.getElementById('pilotOnlineDot');
  const pilotName = document.getElementById('arcadePilotName');
  const pilotBadge = document.getElementById('arcadePilotBadge');
  const pilotSubtext = document.getElementById('arcadePilotSubtext');
  const pilotInputGroup = document.getElementById('arcadePilotInputGroup');
  const pilotConnectedActions = document.getElementById('arcadePilotConnectedActions');
  const ghInput = document.getElementById('arcadeGhInput');
  const connectBtn = document.getElementById('arcadeGhConnectBtn');
  const changeBtn = document.getElementById('arcadeGhChangeBtn');
  const personalRecordDisplay = document.getElementById('pilotPersonalRecord');
  const gameOverAuthBox = document.getElementById('gameOverAuthBox');

  if (!leaderboardBody) return;

  // Initial Hall of Fame community records
  const DEFAULT_LEADERBOARD = [
    {
      login: 'Chomiam',
      name: 'Chomiam',
      avatar: 'https://github.com/Chomiam.png',
      score: 14250,
      wave: 12,
      kills: 168,
      title: 'Grand Architecte du Vibe-Coding 🦀',
      badge: 'Fondateur',
      badgeColor: 'badge-mauve'
    },
    {
      login: 'torvalds',
      name: 'Linus Torvalds',
      avatar: 'https://github.com/torvalds.png',
      score: 11800,
      wave: 10,
      kills: 134,
      title: 'Kernel BDFL Indestructible 🐧',
      badge: 'Kernel God',
      badgeColor: 'badge-green'
    },
    {
      login: 'catppuccin',
      name: 'Catppuccin',
      avatar: 'https://github.com/catppuccin.png',
      score: 9650,
      wave: 8,
      kills: 108,
      title: 'Palette Divinité Mocha 🐱',
      badge: 'Thème Master',
      badgeColor: 'badge-peach'
    },
    {
      login: 'ThePrimeagen',
      name: 'ThePrimeagen',
      avatar: 'https://github.com/ThePrimeagen.png',
      score: 8420,
      wave: 7,
      kills: 94,
      title: 'Neovim Blazingly Fast ⚡',
      badge: 'Vim Lord',
      badgeColor: 'badge-blue'
    },
    {
      login: 'mitchellh',
      name: 'Mitchell Hashimoto',
      avatar: 'https://github.com/mitchellh.png',
      score: 7200,
      wave: 6,
      kills: 82,
      title: 'Ghostty & Rust Whisperer 👻',
      badge: 'CLI Wizard',
      badgeColor: 'badge-sapphire'
    },
    {
      login: 'NixOS',
      name: 'Hydra NixOS',
      avatar: 'https://github.com/NixOS.png',
      score: 6500,
      wave: 6,
      kills: 76,
      title: 'Pure Flake Immutability ❄️',
      badge: 'Reproductible',
      badgeColor: 'badge-teal'
    }
  ];

  let currentGhUser = localStorage.getItem('chomiam_gh_user') || null;

  function getCustomScores() {
    try {
      return JSON.parse(localStorage.getItem('chomiamos_arcade_custom_scores')) || {};
    } catch (_) {
      return {};
    }
  }

  function saveCustomScores(scores) {
    try {
      localStorage.setItem('chomiamos_arcade_custom_scores', JSON.stringify(scores));
    } catch (_) {}
  }

  // Get full leaderboard merged and sorted
  function getLeaderboardList() {
    const list = JSON.parse(JSON.stringify(DEFAULT_LEADERBOARD));
    const customScores = getCustomScores();

    for (const [login, data] of Object.entries(customScores)) {
      const existingIdx = list.findIndex(item => item.login.toLowerCase() === login.toLowerCase());
      if (existingIdx !== -1) {
        if (data.score > list[existingIdx].score) {
          list[existingIdx].score = data.score;
          list[existingIdx].wave = data.wave;
          list[existingIdx].kills = data.kills;
        }
      } else {
        list.push({
          login: data.login,
          name: data.name || data.login,
          avatar: data.avatar || `https://github.com/${encodeURIComponent(data.login)}.png`,
          score: data.score,
          wave: data.wave || 1,
          kills: data.kills || 0,
          title: data.title || 'Pilote Certifié Vibe-Coding 🚀',
          badge: 'Pilote NixOS',
          badgeColor: 'badge-mauve'
        });
      }
    }

    list.sort((a, b) => b.score - a.score);
    return list;
  }

  // Render Leaderboard Table
  function renderLeaderboard() {
    const list = getLeaderboardList();
    leaderboardBody.innerHTML = '';

    list.forEach((entry, index) => {
      const rank = index + 1;
      const isUser = currentGhUser && entry.login.toLowerCase() === currentGhUser.toLowerCase();

      let rankDisplay = `#${rank}`;
      let rankClass = '';
      if (rank === 1) {
        rankDisplay = '🥇 1';
        rankClass = 'rank-1';
      } else if (rank === 2) {
        rankDisplay = '🥈 2';
        rankClass = 'rank-2';
      } else if (rank === 3) {
        rankDisplay = '🥉 3';
        rankClass = 'rank-3';
      }

      const tr = document.createElement('tr');
      if (isUser) {
        tr.className = 'is-current-user';
      }

      tr.innerHTML = `
        <td class="rank-cell ${rankClass}">${rankDisplay}</td>
        <td>
          <div class="pilot-cell">
            <img src="${entry.avatar}" alt="${entry.login}" class="pilot-cell-avatar" onerror="this.src='cat-logo.svg'">
            <div>
              <a href="https://github.com/${encodeURIComponent(entry.login)}" target="_blank" rel="noopener noreferrer" class="pilot-cell-link">@${entry.login}</a>
              ${isUser ? '<span class="badge badge-mauve pilot-cell-tag" style="margin-left: 6px;">VOUS</span>' : `<span class="badge ${entry.badgeColor || 'badge-blue'} pilot-cell-tag" style="margin-left: 6px;">${entry.badge || 'Pilote'}</span>`}
            </div>
          </div>
        </td>
        <td class="score-cell">${String(entry.score).padStart(6, '0')}</td>
        <td class="wave-cell">Vague ${entry.wave}</td>
        <td class="kills-cell">${entry.kills} ☄️</td>
        <td class="ship-cell">${entry.title}</td>
      `;

      leaderboardBody.appendChild(tr);
    });
  }

  // Update Pilot Header Banner
  function updatePilotBanner(user, avatarUrl) {
    if (user) {
      if (pilotAvatar) {
        pilotAvatar.src = avatarUrl || `https://github.com/${encodeURIComponent(user)}.png`;
      }
      if (pilotOnlineDot) {
        pilotOnlineDot.classList.add('active');
      }
      if (pilotName) {
        pilotName.textContent = `@${user}`;
      }
      if (pilotBadge) {
        pilotBadge.className = 'badge badge-green';
        pilotBadge.textContent = '✔ Pilote GitHub Certifié';
      }
      if (pilotSubtext) {
        pilotSubtext.textContent = 'Votre compte est lié. Tous vos records sont automatiquement inscrits dans le Hall of Fame !';
      }
      if (pilotInputGroup) pilotInputGroup.classList.add('hidden');
      if (pilotConnectedActions) pilotConnectedActions.classList.remove('hidden');

      const customScores = getCustomScores();
      const userRecord = customScores[user.toLowerCase()]?.score || localStorage.getItem('chomiamos_arcade_high') || 0;
      if (personalRecordDisplay) {
        personalRecordDisplay.textContent = String(userRecord).padStart(5, '0');
      }
    } else {
      if (pilotAvatar) pilotAvatar.src = 'cat-logo.svg';
      if (pilotOnlineDot) pilotOnlineDot.classList.remove('active');
      if (pilotName) pilotName.textContent = 'Pilote Anonyme';
      if (pilotBadge) {
        pilotBadge.className = 'badge badge-peach';
        pilotBadge.textContent = 'Invité non certifié';
      }
      if (pilotSubtext) {
        pilotSubtext.textContent = 'Liez votre compte GitHub pour enregistrer vos records et hisser votre nom au classement galactique !';
      }
      if (pilotInputGroup) pilotInputGroup.classList.remove('hidden');
      if (pilotConnectedActions) pilotConnectedActions.classList.add('hidden');
    }
  }

  // Connect GitHub User
  async function connectGitHubUser(rawUsername) {
    const username = rawUsername.replace(/^@/, '').trim();
    if (!username) return;

    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
      let avatar = `https://github.com/${encodeURIComponent(username)}.png`;
      let name = username;

      if (res.ok) {
        const data = await res.json();
        currentGhUser = data.login;
        avatar = data.avatar_url;
        name = data.name || data.login;
      } else {
        currentGhUser = username;
      }

      localStorage.setItem('chomiam_gh_user', currentGhUser);
      updatePilotBanner(currentGhUser, avatar);

      // Register high score if already played
      const savedHigh = parseInt(localStorage.getItem('chomiamos_arcade_high') || '0', 10);
      if (savedHigh > 0) {
        const customScores = getCustomScores();
        const existing = customScores[currentGhUser.toLowerCase()] || {};
        if (savedHigh > (existing.score || 0)) {
          customScores[currentGhUser.toLowerCase()] = {
            login: currentGhUser,
            name: name,
            avatar: avatar,
            score: savedHigh,
            wave: existing.wave || 1,
            kills: existing.kills || Math.floor(savedHigh / 60),
            title: 'Pilote Certifié Vibe-Coding 🚀'
          };
          saveCustomScores(customScores);
        }
      }

      renderLeaderboard();
      if (typeof showToast === 'function') {
        showToast(`🚀 Compte GitHub @${currentGhUser} lié avec succès au classement !`);
      }
    } catch (_) {
      currentGhUser = username;
      localStorage.setItem('chomiam_gh_user', currentGhUser);
      updatePilotBanner(currentGhUser, `https://github.com/${encodeURIComponent(username)}.png`);
      renderLeaderboard();
    }
  }

  // Hook Game Over
  window.onArcadeGameOver = function(finalScore, maxWave, killsCount) {
    currentGhUser = localStorage.getItem('chomiam_gh_user') || null;

    if (currentGhUser && finalScore > 0) {
      const customScores = getCustomScores();
      const existing = customScores[currentGhUser.toLowerCase()] || {};
      const bestScore = Math.max(finalScore, existing.score || 0);

      customScores[currentGhUser.toLowerCase()] = {
        login: currentGhUser,
        name: currentGhUser,
        avatar: `https://github.com/${encodeURIComponent(currentGhUser)}.png`,
        score: bestScore,
        wave: Math.max(maxWave, existing.wave || 1),
        kills: (existing.kills || 0) + killsCount,
        title: bestScore > 10000 ? 'Légende Cosmique NixOS 🌟' : 'Pilote Certifié Vibe-Coding 🚀'
      };

      saveCustomScores(customScores);
      renderLeaderboard();
      updatePilotBanner(currentGhUser);

      if (gameOverAuthBox) {
        gameOverAuthBox.innerHTML = `
          <span>🏆 Score de <strong>${finalScore} pts</strong> (Vague ${maxWave}) enregistré pour <strong style="color:var(--mauve);">@${currentGhUser}</strong> ! Consultez votre rang ci-dessous.</span>
        `;
      }
    } else {
      if (gameOverAuthBox) {
        gameOverAuthBox.innerHTML = `
          <span>🐙 <strong>${finalScore} pts obtenus !</strong> <a href="#arcadeLeaderboardSection" id="gameOverAuthLink">Liez votre compte GitHub</a> pour faire certifier ce score au classement officiel !</span>
        `;
        const link = document.getElementById('gameOverAuthLink');
        if (link) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.getElementById('arcadeLeaderboardSection');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
            if (ghInput) ghInput.focus();
          });
        }
      }
    }
  };

  // Event Listeners
  if (connectBtn && ghInput) {
    connectBtn.addEventListener('click', () => {
      connectGitHubUser(ghInput.value);
      ghInput.value = '';
    });
    ghInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        connectGitHubUser(ghInput.value);
        ghInput.value = '';
      }
    });
  }

  if (changeBtn) {
    changeBtn.addEventListener('click', () => {
      if (pilotInputGroup) pilotInputGroup.classList.remove('hidden');
      if (pilotConnectedActions) pilotConnectedActions.classList.add('hidden');
      if (ghInput) {
        ghInput.value = currentGhUser || '';
        ghInput.focus();
      }
    });
  }

  // Initial Load
  if (currentGhUser) {
    updatePilotBanner(currentGhUser);
  } else {
    updatePilotBanner(null);
  }
  renderLeaderboard();
}




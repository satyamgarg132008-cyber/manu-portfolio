/* ==========================================================
   KAWAII INTERACTIVE SCRIPT - MANU SHARMA 🌸
   Web Audio Synthesizer, Sparkle Engine, Microscope & Games
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------------
  // 1. KAWAII WEB AUDIO API SYNTHESIZER
  // Purely algorithmic, 0 external files needed, 100% reliable!
  // ----------------------------------------------------------
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Cute Pop Sound
  function playPopSound(freq = 600) {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.6, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch (e) {
      // Audio not permitted yet or unsupported
    }
  }

  // Sparkling Chime Sound
  function playChimeSound() {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Sweet Pentatonic)
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const startTime = audioCtx.currentTime + idx * 0.06;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.28);
      });
    } catch (e) {}
  }

  // Kawaii Boing / Pet sound
  function playBoingSound() {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.18);
    } catch (e) {}
  }

  // Sound Toggle Button
  const soundToggleBtn = document.getElementById('soundToggle');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      isSoundEnabled = !isSoundEnabled;
      const icon = soundToggleBtn.querySelector('.btn-icon');
      const text = soundToggleBtn.querySelector('.btn-text');
      if (isSoundEnabled) {
        icon.textContent = '🔊';
        text.textContent = 'Sound ON';
        playPopSound(750);
      } else {
        icon.textContent = '🔇';
        text.textContent = 'Sound OFF';
      }
    });
  }

  // ----------------------------------------------------------
  // 2. THEME SWITCHER
  // ----------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const paletteMenu = document.getElementById('paletteMenu');
  const paletteOpts = document.querySelectorAll('.palette-opt');

  if (themeToggleBtn && paletteMenu) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playPopSound(520);
      paletteMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!paletteMenu.contains(e.target) && e.target !== themeToggleBtn) {
        paletteMenu.classList.remove('show');
      }
    });

    paletteOpts.forEach(btn => {
      btn.addEventListener('click', () => {
        playChimeSound();
        const theme = btn.getAttribute('data-theme');
        document.body.className = theme;
        paletteOpts.forEach(o => o.classList.remove('active'));
        btn.classList.add('active');
        paletteMenu.classList.remove('show');
      });
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      playPopSound(500);
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ----------------------------------------------------------
  // 3. CUSTOM CURSOR & CANVAS SPARKLE PARTICLES
  // ----------------------------------------------------------
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Floating background sparkles canvas
  const canvas = document.getElementById('sparkles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const sparkles = [];
    const pastelColors = ['#FFD1DC', '#E6E6FA', '#D8F3DC', '#FFE5D9', '#FFF3B0', '#D0E1FD'];

    class Sparkle {
      constructor(x, y, manual = false) {
        this.x = x !== undefined ? x : Math.random() * width;
        this.y = y !== undefined ? y : Math.random() * height;
        this.size = manual ? Math.random() * 8 + 4 : Math.random() * 4 + 2;
        this.color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        this.speedY = manual ? (Math.random() - 0.5) * 4 : -(Math.random() * 0.6 + 0.3);
        this.speedX = manual ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 0.6;
        this.alpha = 1;
        this.decay = manual ? 0.025 : 0.003;
        this.type = Math.random() > 0.4 ? 'star' : 'circle';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        if (this.type === 'circle') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw 4-pointed star
          ctx.beginPath();
          const s = this.size * 1.5;
          ctx.moveTo(this.x, this.y - s);
          ctx.quadraticCurveTo(this.x, this.y, this.x + s, this.y);
          ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + s);
          ctx.quadraticCurveTo(this.x, this.y, this.x - s, this.y);
          ctx.quadraticCurveTo(this.x, this.y, this.x, this.y - s);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Populate ambient sparkles
    for (let i = 0; i < 40; i++) {
      sparkles.push(new Sparkle());
    }

    function animateSparkles() {
      ctx.clearRect(0, 0, width, height);

      // Add ambient slowly
      if (sparkles.length < 50 && Math.random() < 0.3) {
        sparkles.push(new Sparkle(Math.random() * width, height + 10));
      }

      for (let i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].update();
        sparkles[i].draw();
        if (sparkles[i].alpha <= 0 || sparkles[i].y < -20 || sparkles[i].x < -20 || sparkles[i].x > width + 20) {
          sparkles.splice(i, 1);
        }
      }
      requestAnimationFrame(animateSparkles);
    }
    animateSparkles();

    // Click anywhere to burst sparkles
    window.addEventListener('click', (e) => {
      // Don't trigger if clicked playground or button to avoid clutter
      if (e.target.closest('#playgroundBoard') || e.target.closest('button')) return;
      playPopSound(700);
      for (let i = 0; i < 12; i++) {
        sparkles.push(new Sparkle(e.clientX, e.clientY, true));
      }
    });
  }

  // ----------------------------------------------------------
  // 4. INTERACTIVE MICROSCOPE
  // ----------------------------------------------------------
  const slideButtons = document.querySelectorAll('.slide-tab-btn');
  const specimenContents = document.querySelectorAll('.specimen-content');
  const focusRange = document.getElementById('focusRange');
  const focusStatus = document.getElementById('focusStatus');
  const microscopeDisplay = document.getElementById('microscopeDisplay');

  slideButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      playPopSound(680);
      slideButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      specimenContents.forEach(spec => {
        if (spec.id === targetId) {
          spec.classList.add('active');
        } else {
          spec.classList.remove('active');
        }
      });
    });
  });

  if (focusRange && focusStatus && microscopeDisplay) {
    focusRange.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      const blurVal = Math.abs(val - 8) * 1.4;
      microscopeDisplay.style.filter = `blur(${blurVal}px) brightness(${1 + (val - 5) * 0.04})`;
      const pct = Math.max(20, Math.min(100, Math.round(100 - blurVal * 12)));
      focusStatus.textContent = `Sharpness: ${pct}% ✨`;
    });
  }

  // ----------------------------------------------------------
  // 5. "100% USELESS INFORMATION" GACHAPON MACHINE
  // ----------------------------------------------------------
  const uselessFacts = [
    {
      emoji: "🪳",
      text: "Has an M.Sc in Zoology and knows insect anatomy down to the spiracles, but will spontaneously teleport 3 meters backwards if a moth flaps near her cheek.",
      tag: "Uselessness: 99.8% ⭐"
    },
    {
      emoji: "🖊️",
      text: "Spends up to 12 minutes deliberating between 'Sakura Pink' and 'Pastel Coral' highlighter for a single one-line biology definition on the board.",
      tag: "Aesthetic Priority: 100% 🌸"
    },
    {
      emoji: "⏰",
      text: "Chai protocol is sacred: must be consumed at exactly 4:15 PM. If tea is delayed past 4:30 PM, science lecture quality drops by exactly 37.5%.",
      tag: "Bio-Clock Factor: Extreme ☕"
    },
    {
      emoji: "🧬",
      text: "Can recite the entire Kreb's Cycle backwards while half-asleep, but will search for 20 minutes for the spectacles currently perched on her nose.",
      tag: "Memory Distribution: Chaotic 🤓"
    },
    {
      emoji: "🪴",
      text: "Firmly convinced that the classroom lab money plants grow twice as fast if she updates them on Saint Mary’s school staff room gossip.",
      tag: "Botany Method: Questionable 🌱"
    },
    {
      emoji: "🐼",
      text: "Can organically steer any topic—whether it's sedimentary rocks, quadratic equations, or mitochondria—back into why Red Pandas are nature's greatest creation.",
      tag: "Red Panda Agenda: Unstoppable 🐾"
    },
    {
      emoji: "🍪",
      text: "Possesses a military-grade ultrasonic hearing frequency tuned exclusively to the crinkle of potato chip wrappers in the back bench.",
      tag: "Teacher Radar: 100/10 🕵️‍♀️"
    },
    {
      emoji: "🎒",
      text: "Owns 47 pastel gel pens with cute bunny toppers, but when asked for a plain blue pen for signing a register, has zero available.",
      tag: "Stationery Hoard: Critical 🐰"
    },
    {
      emoji: "💤",
      text: "Olympic-level power napper: can fall asleep sitting up in 42 seconds between double lectures and awaken fully recharged with lesson plans ready.",
      tag: "Superpower: Unlocked ⚡"
    },
    {
      emoji: "🐦",
      text: "Can identify 40 bird species by their morning chirp, but still sets 7 consecutive alarms spaced 5 minutes apart every single dawn.",
      tag: "Ornithology vs Sleep: 0 - 1 ⏰"
    }
  ];

  let currentFactIndex = 0;
  const spinFactBtn = document.getElementById('spinFactBtn');
  const factEmoji = document.getElementById('factEmoji');
  const factText = document.getElementById('factText');
  const factTag = document.getElementById('factTag');
  const dispenserCard = document.getElementById('dispenserCard');

  if (spinFactBtn && dispenserCard) {
    spinFactBtn.addEventListener('click', () => {
      playChimeSound();
      dispenserCard.style.transform = 'scale(0.92) rotate(-2deg)';
      dispenserCard.style.opacity = '0.5';

      setTimeout(() => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * uselessFacts.length);
        } while (nextIndex === currentFactIndex && uselessFacts.length > 1);

        currentFactIndex = nextIndex;
        const fact = uselessFacts[currentFactIndex];

        factEmoji.textContent = fact.emoji;
        factText.textContent = `“${fact.text}”`;
        factTag.textContent = fact.tag;

        dispenserCard.style.transform = 'scale(1.04) rotate(1deg)';
        dispenserCard.style.opacity = '1';

        setTimeout(() => {
          dispenserCard.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
      }, 220);
    });
  }

  // ----------------------------------------------------------
  // 6. PET THE MASCOT (BOBA THE BUNNY)
  // ----------------------------------------------------------
  const bunnyPet = document.getElementById('bunnyPet');
  const petBunnyBtn = document.getElementById('petBunnyBtn');
  const feedCarrotBtn = document.getElementById('feedCarrotBtn');
  const bunnyHeartsContainer = document.getElementById('bunnyHearts');
  const affectionFill = document.getElementById('affectionFill');
  const petCountText = document.getElementById('petCountText');
  const bunnyMoodTitle = document.getElementById('bunnyMoodTitle');

  let affectionScore = 75;

  function petBunnyAction(treat = false) {
    playBoingSound();

    affectionScore = Math.min(100, affectionScore + (treat ? 8 : 4));
    if (affectionFill) affectionFill.style.width = `${affectionScore}%`;
    if (petCountText) petCountText.textContent = `${affectionScore} / 100 Hugs`;

    if (affectionScore >= 100) {
      bunnyMoodTitle.textContent = "Boba is in Pure Ecstasy! 🌟💖🐰";
    } else if (affectionScore > 80) {
      bunnyMoodTitle.textContent = "Boba feels Super Loved! 💖";
    } else {
      bunnyMoodTitle.textContent = "Boba is Happy & Nibbling! 🥕";
    }

    // Spawn floating heart or carrot
    if (bunnyHeartsContainer) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = treat ? '🥕' : (['💖', '💕', '✨', '🌸', '🥰'][Math.floor(Math.random() * 5)]);
      heart.style.left = `${Math.random() * 60 + 20}%`;
      heart.style.top = `${Math.random() * 40 + 30}%`;
      bunnyHeartsContainer.appendChild(heart);

      setTimeout(() => heart.remove(), 1000);
    }
  }

  if (bunnyPet) bunnyPet.addEventListener('click', () => petBunnyAction(false));
  if (petBunnyBtn) petBunnyBtn.addEventListener('click', () => petBunnyAction(false));
  if (feedCarrotBtn) feedCarrotBtn.addEventListener('click', () => petBunnyAction(true));

  // ----------------------------------------------------------
  // 7. KAWAII STICKER PLAYGROUND
  // ----------------------------------------------------------
  const playgroundBoard = document.getElementById('playgroundBoard');
  const clearBoardBtn = document.getElementById('clearBoardBtn');
  const cuteStickers = ['🌸', '🐰', '🔬', '🍓', '⭐', '🧬', '🧸', '☕', '🦋', '🪴', '🎀', '✨', '🍰', '🧁'];

  if (playgroundBoard) {
    playgroundBoard.addEventListener('click', (e) => {
      // If clicked an existing sticker, pop it!
      if (e.target.classList.contains('board-sticker')) {
        playPopSound(800);
        e.target.style.transform = 'scale(1.4)';
        e.target.style.opacity = '0';
        setTimeout(() => e.target.remove(), 180);
        return;
      }

      playPopSound(580);
      const rect = playgroundBoard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const sticker = document.createElement('div');
      sticker.className = 'board-sticker';
      sticker.textContent = cuteStickers[Math.floor(Math.random() * cuteStickers.length)];
      sticker.style.left = `${x - 20}px`;
      sticker.style.top = `${y - 20}px`;
      const rotation = (Math.random() - 0.5) * 40;
      sticker.style.transform = `rotate(${rotation}deg)`;

      playgroundBoard.appendChild(sticker);
    });

    if (clearBoardBtn) {
      clearBoardBtn.addEventListener('click', () => {
        playPopSound(450);
        const stickers = playgroundBoard.querySelectorAll('.board-sticker');
        stickers.forEach((s, idx) => {
          setTimeout(() => {
            s.style.opacity = '0';
            s.remove();
          }, idx * 25);
        });
      });
    }
  }

  // ----------------------------------------------------------
  // 8. CHAI REFILL INTERACTION
  // ----------------------------------------------------------
  const refillChaiBtn = document.getElementById('refillChaiBtn');
  if (refillChaiBtn) {
    refillChaiBtn.addEventListener('click', () => {
      playChimeSound();
      refillChaiBtn.innerHTML = '<span>☕ Chai Poured Fresh! (Level 100%) 💖</span>';
      refillChaiBtn.style.background = '#FFE5D9';
      setTimeout(() => {
        refillChaiBtn.innerHTML = '<span>🫖 Pour Warm Chai (+10 Cheer)</span>';
        refillChaiBtn.style.background = '';
      }, 3000);
    });
  }

  // ----------------------------------------------------------
  // 9. COPY EMAIL BUTTON
  // ----------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      playPopSound(720);
      navigator.clipboard.writeText('manus412000@gmail.com').then(() => {
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = '💖 Copied!';
        copyEmailBtn.style.background = '#FFB7C5';
        copyEmailBtn.style.color = '#FFF';

        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.color = '';
        }, 2200);
      });
    });
  }

  // ----------------------------------------------------------
  // 10. CONTACT FORM MODAL
  // ----------------------------------------------------------
  window.submitCuteForm = function() {
    playChimeSound();
    const popup = document.getElementById('formSuccess');
    if (popup) {
      popup.classList.add('show');
    }
    const form = document.getElementById('contactForm');
    if (form) form.reset();
  };

  window.closeSuccessPopup = function() {
    playPopSound(500);
    const popup = document.getElementById('formSuccess');
    if (popup) {
      popup.classList.remove('show');
    }
  };
});

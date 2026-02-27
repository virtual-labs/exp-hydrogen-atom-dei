/**
 * ============================================
 * HYDROGEN ORBITAL VISUALIZER - MAIN LOGIC
 * Interactive Quantum Mechanics Simulation
 * ============================================
 */

// ============ Global State ============
const state = {
  n: 1,
  l: 0,
  m: 0,
  viewMode: 'outline',
  isAnimating: true,
  animationId: null,
  rotationAngle: 0
};

// Orbital type names
const orbitalTypes = ['s', 'p', 'd', 'f', 'g', 'h', 'i'];

// Orbital explanations
const orbitalExplanations = {
  's': 'S-orbitals are spherically symmetric around the nucleus. They have no angular nodes, meaning the electron density is distributed uniformly in all directions from the nucleus.',
  'p': 'P-orbitals have a dumbbell shape with one nodal plane passing through the nucleus. There are three p-orbitals (px, py, pz) oriented along the three coordinate axes.',
  'd': 'D-orbitals have more complex shapes with two nodal planes. There are five d-orbitals with different orientations. They play a crucial role in transition metal chemistry.',
  'f': 'F-orbitals are even more complex with three nodal planes. There are seven f-orbitals. They are important in lanthanide and actinide chemistry.',
  'g': 'G-orbitals are theoretical orbitals with four nodal planes. They become relevant only for very heavy atoms or in high-energy states.',
  'h': 'H-orbitals have five nodal planes and are primarily theoretical, relevant in advanced quantum mechanical calculations.',
  'i': 'I-orbitals have six nodal planes and exist only in theoretical contexts for extremely high principal quantum numbers.'
};

// ============ DOM Elements ============
let canvas, ctx;
let nSlider, lSlider, mSlider;
let nValue, lValue, mValue;

// ============ Initialization ============
document.addEventListener('DOMContentLoaded', function () {
  initializeElements();
  setupEventListeners();
  updateOrbital();
  startAnimation();
});

function initializeElements() {
  canvas = document.getElementById('orbitalCanvas');
  ctx = canvas.getContext('2d');

  nSlider = document.getElementById('n-slider');
  lSlider = document.getElementById('l-slider');
  mSlider = document.getElementById('m-slider');

  nValue = document.getElementById('n-value');
  lValue = document.getElementById('l-value');
  mValue = document.getElementById('m-value');
}

function setupEventListeners() {
  // Slider events
  nSlider.addEventListener('input', handleNChange);
  lSlider.addEventListener('input', handleLChange);
  mSlider.addEventListener('input', handleMChange);

  // Button events
  document.getElementById('draw-btn').addEventListener('click', drawOrbital);
  document.getElementById('reset-btn').addEventListener('click', resetToDefault);
  document.getElementById('screenshot-btn').addEventListener('click', takeScreenshot);

  // Preset buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', handlePresetClick);
  });

  // View mode buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', handleViewModeChange);
  });

  // Animation toggle
  document.getElementById('animate-toggle').addEventListener('change', handleAnimationToggle);

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // Load saved theme
  loadSavedTheme();
}

// ============ Event Handlers ============
function handleNChange(e) {
  state.n = parseInt(e.target.value);
  nValue.textContent = state.n;

  // Update l slider max value (l can be 0 to n-1)
  const maxL = state.n - 1;
  lSlider.max = maxL;
  if (state.l > maxL) {
    state.l = maxL;
    lSlider.value = maxL;
    lValue.textContent = maxL;
  }

  // Update m slider based on new l
  updateMSlider();
  updateOrbital();
}

function handleLChange(e) {
  state.l = parseInt(e.target.value);
  lValue.textContent = state.l;
  updateMSlider();
  updateOrbital();
}

function handleMChange(e) {
  state.m = parseInt(e.target.value);
  mValue.textContent = state.m;
  updateOrbital();
}

function updateMSlider() {
  // m can be -l to +l
  mSlider.min = -state.l;
  mSlider.max = state.l;

  if (state.m < -state.l) {
    state.m = -state.l;
  } else if (state.m > state.l) {
    state.m = state.l;
  }

  mSlider.value = state.m;
  mValue.textContent = state.m;
}

function handlePresetClick(e) {
  const btn = e.currentTarget;
  state.n = parseInt(btn.dataset.n);
  state.l = parseInt(btn.dataset.l);
  state.m = parseInt(btn.dataset.m);

  // Update sliders
  nSlider.value = state.n;
  nValue.textContent = state.n;

  lSlider.max = state.n - 1;
  lSlider.value = state.l;
  lValue.textContent = state.l;

  mSlider.min = -state.l;
  mSlider.max = state.l;
  mSlider.value = state.m;
  mValue.textContent = state.m;

  // Update preset button states
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  updateOrbital();
}

function handleViewModeChange(e) {
  const btn = e.currentTarget;
  state.viewMode = btn.dataset.mode;

  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  drawOrbital();
}

function handleAnimationToggle(e) {
  state.isAnimating = e.target.checked;

  if (state.isAnimating) {
    startAnimation();
    updateStatus('running', 'Simulation Running');
  } else {
    stopAnimation();
    drawOrbital();
    updateStatus('ready', 'Ready');
  }
}

function updateStatus(statusClass, statusText) {
  const statusIndicator = document.getElementById('status-indicator');
  const dot = statusIndicator.querySelector('.status-dot');
  const text = statusIndicator.querySelector('.status-text');

  dot.className = 'status-dot ' + statusClass;
  text.textContent = statusText;
}

function resetToDefault() {
  state.n = 1;
  state.l = 0;
  state.m = 0;
  state.rotationAngle = 0;

  nSlider.value = 1;
  nValue.textContent = 1;

  lSlider.max = 0;
  lSlider.value = 0;
  lValue.textContent = 0;

  mSlider.min = 0;
  mSlider.max = 0;
  mSlider.value = 0;
  mValue.textContent = 0;

  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.preset-btn[data-n="1"][data-l="0"]').classList.add('active');

  updateOrbital();
}

function takeScreenshot() {
  const link = document.createElement('a');
  link.download = `hydrogen-orbital-${state.n}${orbitalTypes[state.l]}-m${state.m}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ============ Update Functions ============
function updateOrbital() {
  updateInfoPanel();
  drawOrbital();
}

function updateInfoPanel() {
  const orbitalType = orbitalTypes[state.l];
  const orbitalName = `${state.n}${orbitalType}`;

  // Update current orbital display
  document.getElementById('current-orbital').textContent = `${orbitalName} Orbital`;
  document.getElementById('orbital-label').textContent = `${orbitalName} Orbital`;
  document.getElementById('orbital-type-badge').textContent = `${orbitalType}-orbital`;

  // Update quantum numbers display
  document.getElementById('q-n').textContent = state.n;
  document.getElementById('q-l').textContent = state.l;
  document.getElementById('q-m').textContent = state.m;

  // Calculate and display energy
  const energy = (-13.6 / (state.n * state.n)).toFixed(3);
  document.getElementById('energy-value').textContent = `${energy} eV`;

  // Update energy bar (percentage based on n=1 being 100%)
  const energyPercent = (1 / (state.n * state.n)) * 100;
  document.getElementById('energy-fill').style.width = `${energyPercent}%`;

  // Update explanation
  document.getElementById('orbital-explanation').textContent = orbitalExplanations[orbitalType];

  // Update electron configuration
  updateElectronConfig();
}

function updateElectronConfig() {
  const orbitalType = orbitalTypes[state.l];
  const configDisplay = document.getElementById('electron-config');
  configDisplay.innerHTML = `<span class="config-notation">${state.n}${orbitalType}<sup>1</sup></span>`;
}

// ============ Drawing Functions ============
function drawOrbital() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background grid
  drawGrid();

  // Draw axes
  drawAxes();

  // Draw orbital based on view mode
  switch (state.viewMode) {
    case 'outline':
      drawOutlineOrbital();
      break;
    case 'filled':
      drawFilledOrbital();
      break;
    case 'probability':
      drawProbabilityOrbital();
      break;
  }

  // Draw nucleus
  drawNucleus();

  // Draw info overlay
  drawInfoOverlay();
}

function drawGrid() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const gridSize = 40;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;

  // Vertical lines
  for (let x = centerX % gridSize; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Horizontal lines
  for (let y = centerY % gridSize; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function drawAxes() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);

  // X axis
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.stroke();

  // Y axis
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.stroke();

  ctx.setLineDash([]);

  // Axis labels
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = '12px Poppins';
  ctx.fillText('x', canvas.width - 20, centerY - 10);
  ctx.fillText('y', centerX + 10, 20);
}

function drawNucleus() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Glow effect
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 15);
  gradient.addColorStop(0, 'rgba(255, 100, 100, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 100, 100, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 100, 100, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
  ctx.fill();

  // Core
  ctx.fillStyle = '#ff6464';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawOutlineOrbital() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 30;

  ctx.save();
  ctx.translate(centerX, centerY);

  if (state.isAnimating) {
    ctx.rotate(state.rotationAngle);
  }

  // Create gradient stroke
  const gradient = ctx.createLinearGradient(-maxRadius, 0, maxRadius, 0);
  gradient.addColorStop(0, '#4facfe');
  gradient.addColorStop(0.5, '#00f2fe');
  gradient.addColorStop(1, '#4facfe');

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#00f2fe';
  ctx.shadowBlur = 15;

  ctx.beginPath();

  const points = state.n * 360;
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const radius = calculateRadius(angle, maxRadius);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();
  ctx.stroke();

  // Draw additional lobes for higher l values
  if (state.l > 0) {
    for (let lobe = 1; lobe <= state.l; lobe++) {
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const radius = calculateRadius(angle + (lobe * Math.PI / state.l), maxRadius * 0.8);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawFilledOrbital() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 30;

  ctx.save();
  ctx.translate(centerX, centerY);

  if (state.isAnimating) {
    ctx.rotate(state.rotationAngle);
  }

  // Create radial gradient fill
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, maxRadius);
  gradient.addColorStop(0, 'rgba(102, 126, 234, 0.8)');
  gradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.4)');
  gradient.addColorStop(1, 'rgba(79, 172, 254, 0.1)');

  ctx.fillStyle = gradient;
  ctx.shadowColor = '#667eea';
  ctx.shadowBlur = 20;

  ctx.beginPath();

  const points = state.n * 360;
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const radius = calculateRadius(angle, maxRadius);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();
  ctx.fill();

  // Add outline
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}

function drawProbabilityOrbital() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 30;

  // Draw probability cloud with dots
  const numDots = 2000 + (state.n * 500);

  for (let i = 0; i < numDots; i++) {
    const angle = Math.random() * Math.PI * 2;
    const randomRadius = Math.random() * maxRadius;

    // Calculate probability based on orbital shape
    const orbitalRadius = calculateRadius(angle + (state.isAnimating ? state.rotationAngle : 0), maxRadius);
    const probability = Math.exp(-Math.abs(randomRadius - orbitalRadius * 0.7) / (maxRadius * 0.3));

    if (Math.random() < probability) {
      const x = centerX + randomRadius * Math.cos(angle);
      const y = centerY + randomRadius * Math.sin(angle);

      // Color based on distance from center
      const distRatio = randomRadius / maxRadius;
      const hue = 180 + distRatio * 60; // Cyan to purple
      const alpha = (1 - distRatio) * 0.8 + 0.2;

      ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Draw shape outline faintly
  ctx.save();
  ctx.translate(centerX, centerY);
  if (state.isAnimating) {
    ctx.rotate(state.rotationAngle);
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);

  ctx.beginPath();
  const points = state.n * 360;
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const radius = calculateRadius(angle, maxRadius);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function calculateRadius(angle, maxRadius) {
  const { n, l, m } = state;

  // Enhanced orbital shape calculation
  let radius;

  if (l === 0) {
    // s-orbital: spherical with radial nodes
    radius = maxRadius * (0.3 + 0.7 * Math.pow(Math.sin(n * angle / 2), 2));
  } else {
    // p, d, f orbitals: angular dependence
    const angular = Math.pow(Math.cos(l * angle + m * Math.PI / 4), 2);
    const radial = 0.5 + 0.5 * Math.sin((n - l) * angle / 2);
    radius = maxRadius * angular * radial;

    // Add lobes
    radius += maxRadius * 0.2 * Math.pow(Math.sin((l + 1) * angle), 2);
  }

  // Ensure minimum radius
  return Math.max(radius, maxRadius * 0.05);
}

function drawInfoOverlay() {
  // Quantum numbers in corner
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '12px Poppins';
  ctx.textAlign = 'right';
  ctx.fillText(`n=${state.n}  ℓ=${state.l}  mₗ=${state.m}`, canvas.width - 15, canvas.height - 15);
  ctx.textAlign = 'left';
}

// ============ Animation ============
function startAnimation() {
  if (state.animationId) {
    cancelAnimationFrame(state.animationId);
  }

  function animate() {
    if (state.isAnimating) {
      state.rotationAngle += 0.005;
      drawOrbital();
      state.animationId = requestAnimationFrame(animate);
    }
  }

  animate();
}

function stopAnimation() {
  if (state.animationId) {
    cancelAnimationFrame(state.animationId);
    state.animationId = null;
  }
}

// ============ Utility Functions ============
function lerp(start, end, t) {
  return start + (end - start) * t;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// ============ Theme Toggle ============
function toggleTheme() {
  const html = document.documentElement;
  const themeIcon = document.getElementById('theme-icon');
  const currentTheme = html.getAttribute('data-theme');

  if (currentTheme === 'light') {
    // Switch to dark
    html.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
    localStorage.setItem('hydrogen-orbital-theme', 'dark');
  } else {
    // Switch to light
    html.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀️';
    localStorage.setItem('hydrogen-orbital-theme', 'light');
  }

  // Redraw orbital with new colors
  drawOrbital();
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem('hydrogen-orbital-theme');
  const themeIcon = document.getElementById('theme-icon');

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
  }
}
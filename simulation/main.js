function drawOrbital() {
    const n = parseInt(document.getElementById('n').value);
    const l = parseInt(document.getElementById('l').value);
    const m = parseInt(document.getElementById('m').value);
  
    // Get canvas context
    const canvas = document.getElementById('orbitalCanvas');
    const ctx = canvas.getContext('2d');
  
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Translate to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);
  
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 20;
    ctx.beginPath();
    ctx.strokeStyle = '#00ffcc'; // Line color
    ctx.lineWidth = 1.5; // Line thickness
  
    // Generate outline pattern for orbitals
    for (let i = 0; i <= n * 100; i++) {
      const angle = (i / (n * 100)) * Math.PI * 2;
      const radius = (Math.sin(l * angle) * Math.cos(m * angle) + 1) * maxRadius / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
  
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
  
    ctx.stroke();
    ctx.closePath();
    ctx.resetTransform();
  }
  
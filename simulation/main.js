document.getElementById('drawButton').addEventListener('click', drawOrbital);

function drawOrbital() {
    const n = parseInt(document.getElementById('n').value);
    const l = parseInt(document.getElementById('l').value);
    const m = parseInt(document.getElementById('m').value);

    // Validate input values
    if (l >= n || m > l || m < -l) {
        alert("Invalid quantum numbers! Make sure: 0 ≤ l < n and -l ≤ m ≤ l.");
        return;
    }

    // Generate data for visualization
    const data = generateOrbitalData(n, l, m);

    // Plot the orbital using Plotly.js
    Plotly.newPlot('plot', data, {
        margin: { t: 0 }
    });
}

function generateOrbitalData(n, l, m) {
    // This function should generate data based on quantum numbers (n, l, m)
    // and return an object suitable for Plotly.js plotting.
    // For simplicity, we use mock data.

    // Create a 3D meshgrid for x, y, z
    let x = [];
    let y = [];
    let z = [];
    let values = [];

    for (let i = -10; i <= 10; i++) {
        for (let j = -10; j <= 10; j++) {
            for (let k = -10; k <= 10; k++) {
                x.push(i);
                y.push(j);
                z.push(k);
                values.push(Math.sin(i) * Math.sin(j) * Math.sin(k));  // Simplified mock data
            }
        }
    }

    return [{
        type: 'scatter3d',
        mode: 'markers',
        x: x,
        y: y,
        z: z,
        marker: {
            size: 2,
            color: values,
            colorscale: 'Viridis',
            opacity: 0.8
        }
    }];
}

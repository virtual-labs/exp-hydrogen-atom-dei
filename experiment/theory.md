# Theory: Quantum Mechanics of the Hydrogen Atom

## Introduction

The hydrogen atom, being the simplest atom with only one proton and one electron, serves as the foundation for understanding quantum mechanics. This experiment explores the wave nature of electrons, the concept of orbitals, and the probabilistic nature of electron distribution within the atom.

## The Schrödinger Equation

The behavior of electrons in a hydrogen atom is described by the **Schrödinger equation**, which governs the wave function of the electron.

The time-independent Schrödinger equation for the hydrogen atom is:

**Ĥψ = Eψ**

Where:
- **Ĥ** is the Hamiltonian operator
- **ψ** is the wave function
- **E** is the total energy

The complete form is:

**[-ℏ²/2m ∇² + V(r)]ψ(r) = Eψ(r)**

Where:
- **ℏ** is the reduced Planck constant (h/2π)
- **m** is the mass of the electron
- **∇²** is the Laplacian operator
- **V(r)** is the electrostatic potential energy
- **E** is the total energy of the electron

## Quantum Numbers

The solution to the Schrödinger equation yields wave functions characterized by **three quantum numbers**:

<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
<tr style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;">
<th style="padding: 12px; border: 1px solid #ddd;">Quantum Number</th>
<th style="padding: 12px; border: 1px solid #ddd;">Symbol</th>
<th style="padding: 12px; border: 1px solid #ddd;">Allowed Values</th>
<th style="padding: 12px; border: 1px solid #ddd;">Physical Significance</th>
</tr>
<tr><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">Principal</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">n</td><td style="padding: 8px; border: 1px solid #ddd;">1, 2, 3, 4, ...</td><td style="padding: 8px; border: 1px solid #ddd;">Determines energy level and orbital size</td></tr>
<tr style="background: #f9f9f9;"><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">Azimuthal</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">ℓ</td><td style="padding: 8px; border: 1px solid #ddd;">0 to (n-1)</td><td style="padding: 8px; border: 1px solid #ddd;">Determines orbital shape (s, p, d, f)</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">Magnetic</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">mₗ</td><td style="padding: 8px; border: 1px solid #ddd;">-ℓ to +ℓ</td><td style="padding: 8px; border: 1px solid #ddd;">Determines orbital orientation in space</td></tr>
<tr style="background: #f9f9f9;"><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">Spin</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">mₛ</td><td style="padding: 8px; border: 1px solid #ddd;">+½ or -½</td><td style="padding: 8px; border: 1px solid #ddd;">Determines electron spin direction</td></tr>
</table>

## Orbital Types and Shapes

<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
<tr style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;">
<th style="padding: 12px; border: 1px solid #ddd;">Orbital Type</th>
<th style="padding: 12px; border: 1px solid #ddd;">ℓ Value</th>
<th style="padding: 12px; border: 1px solid #ddd;">Shape</th>
<th style="padding: 12px; border: 1px solid #ddd;">Number of Orbitals</th>
<th style="padding: 12px; border: 1px solid #ddd;">Max Electrons</th>
</tr>
<tr><td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: bold;">s</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">0</td><td style="padding: 8px; border: 1px solid #ddd;">Spherical</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">1</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">2</td></tr>
<tr style="background: #f9f9f9;"><td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: bold;">p</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">1</td><td style="padding: 8px; border: 1px solid #ddd;">Dumbbell (two lobes)</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">3</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">6</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: bold;">d</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">2</td><td style="padding: 8px; border: 1px solid #ddd;">Cloverleaf (four lobes)</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">5</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">10</td></tr>
<tr style="background: #f9f9f9;"><td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: bold;">f</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">3</td><td style="padding: 8px; border: 1px solid #ddd;">Complex multi-lobed</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">7</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">14</td></tr>
</table>

## Energy Levels

The energy of an electron in a hydrogen atom is given by:

**Eₙ = -13.6 eV / n²**

Where:
- **n** is the principal quantum number
- **-13.6 eV** is the ground state energy (Rydberg energy)

<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
<tr style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;">
<th style="padding: 12px; border: 1px solid #ddd;">Energy Level (n)</th>
<th style="padding: 12px; border: 1px solid #ddd;">Energy (eV)</th>
<th style="padding: 12px; border: 1px solid #ddd;">Orbital Name</th>
<th style="padding: 12px; border: 1px solid #ddd;">Electron Capacity</th>
</tr>
<tr><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">1</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">-13.6</td><td style="padding: 8px; border: 1px solid #ddd;">1s</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">2</td></tr>
<tr style="background: #f9f9f9;"><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">2</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">-3.4</td><td style="padding: 8px; border: 1px solid #ddd;">2s, 2p</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">8</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">3</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">-1.51</td><td style="padding: 8px; border: 1px solid #ddd;">3s, 3p, 3d</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">18</td></tr>
<tr style="background: #f9f9f9;"><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">4</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">-0.85</td><td style="padding: 8px; border: 1px solid #ddd;">4s, 4p, 4d, 4f</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">32</td></tr>
</table>

## Wave Function Components

The complete wave function is expressed as:

**ψₙₗₘ(r, θ, φ) = Rₙₗ(r) × Yₗₘ(θ, φ)**

Where:
- **Rₙₗ(r)** is the **radial wave function** - depends on distance from nucleus
- **Yₗₘ(θ, φ)** is the **spherical harmonic** - determines angular distribution

## Probability Density

The probability of finding an electron at a given location is proportional to **|ψ|²**. This probability density distribution creates the characteristic shapes of atomic orbitals that you will visualize in this simulation.

## Key Concepts to Remember

1. **Orbitals are NOT orbits** - electrons do not travel in defined paths
2. **Wave-particle duality** - electrons exhibit both wave and particle properties
3. **Probability distributions** - we can only predict WHERE an electron is likely to be found
4. **Quantization** - energy levels are discrete, not continuous
5. **Nodal surfaces** - regions where probability of finding electron is zero


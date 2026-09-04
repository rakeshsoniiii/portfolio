import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SOLAR_WAYPOINTS = [
  { id: 'earth', name: 'EARTH · HOME ORBIT', sub: '28.6139° N, 77.2090° E', dist: '1.00 AU' },
  { id: 'moon', name: 'THE MOON & MARS · RELAY', sub: '384,400 KM · ORBITAL RELAY', dist: '1.52 AU' },
  { id: 'jupiter', name: 'JUPITER & GALILEAN MOONS', sub: 'GREAT RED SPOT · 5.20 AU', dist: '5.20 AU' },
  { id: 'saturn', name: 'SATURN & TITAN · RING DIVE', sub: 'YEAR RINGS & HONORS · 9.58 AU', dist: '9.58 AU' },
  { id: 'uranus', name: 'URANUS & NEPTUNE · ICE GIANTS', sub: '11 REPOSITORIES · 19.2 AU', dist: '19.2 AU' },
  { id: 'contact', name: 'NEPTUNE · DEEP DISPATCH', sub: 'DIRECT COMMS · 30.07 AU', dist: '30.07 AU' },
  { id: 'system', name: 'HELIOS · 360° SOLAR SYSTEM', sub: 'ALL PLANETARY ORBITS · SYSTEM CORE', dist: '0.00 AU' },
];

export const PLANET_INFO = SOLAR_WAYPOINTS;

export default function SolarCanvas({ onWaypointChange, onPlanetChange }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020308, 0.0018);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 0.5, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // --- Texture Loader with Error Fallbacks ---
    const textureLoader = new THREE.TextureLoader();
    const loadTex = (url) => {
      const tex = textureLoader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // --- Starfield Background (Realistic Deep Space with Soft Circular Sprites) ---
    const createCircleTexture = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 32;
      cvs.height = 32;
      const ctx = cvs.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.75)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(cvs);
    };
    const circleTex = createCircleTexture();

    const starCount = 5000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const dist = 400 + Math.random() * 1200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = dist * Math.cos(phi);

      const colorRoll = Math.random();
      const brightness = 0.35 + Math.random() * 0.55;
      if (colorRoll > 0.92) {
        starCols[i * 3] = 0.65 * brightness;
        starCols[i * 3 + 1] = 0.78 * brightness;
        starCols[i * 3 + 2] = 1.0 * brightness;
      } else if (colorRoll > 0.82) {
        starCols[i * 3] = 1.0 * brightness;
        starCols[i * 3 + 1] = 0.82 * brightness;
        starCols[i * 3 + 2] = 0.55 * brightness;
      } else {
        starCols[i * 3] = 0.88 * brightness;
        starCols[i * 3 + 1] = 0.92 * brightness;
        starCols[i * 3 + 2] = 1.0 * brightness;
      }

      starSizes[i] = Math.random() < 0.05 ? 1.4 + Math.random() * 1.0 : 0.4 + Math.random() * 0.6;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      map: circleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      alphaTest: 0.005,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // --- Central Helios Sun (Realistic Deep-Space Solar Core) ---
    const sunPos = new THREE.Vector3(0, 0, -420);
    const sunGroup = new THREE.Group();
    sunGroup.position.copy(sunPos);

    // Realistic Sun Surface Shader with animated turbulence
    const sunGeo = new THREE.SphereGeometry(14, 64, 48);
    const sunMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        // Simplex noise approximation
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        
        float noise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
        }
        
        float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 5; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        void main() {
          // Animated surface turbulence
          vec3 surfaceP = vPosition * 0.25 + vec3(uTime * 0.03, uTime * 0.02, uTime * 0.01);
          float turb = fbm(surfaceP);
          float turb2 = fbm(surfaceP * 1.8 + vec3(10.0));
          
          // Solar surface color palette — hot white center, amber edges
          vec3 hotWhite = vec3(1.0, 0.97, 0.92);
          vec3 hotYellow = vec3(1.0, 0.85, 0.4);
          vec3 deepOrange = vec3(0.95, 0.45, 0.1);
          vec3 darkSpot = vec3(0.7, 0.28, 0.05);
          
          // Mix colors based on turbulence + view angle
          float rim = 1.0 - max(dot(vNormal, vec3(0, 0, 1.0)), 0.0);
          float surfaceMix = turb * 0.7 + rim * 0.3;
          
          vec3 color = mix(hotWhite, hotYellow, surfaceMix);
          color = mix(color, deepOrange, turb2 * 0.4 + rim * 0.5);
          
          // Sunspot simulation
          float spots = smoothstep(0.58, 0.65, turb2);
          color = mix(color, darkSpot, spots * 0.35);
          
          // Limb darkening — edges go darker/redder
          color *= (1.0 - rim * 0.45);
          
          // Bright overall emission
          color *= 1.8;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Inner Corona Glow (tight around sun)
    const coronaGeo1 = new THREE.SphereGeometry(21, 48, 32);
    const coronaMat1 = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(max(0.0, 0.55 - dot(vNormal, vec3(0, 0, 1.0))), 2.2);
          gl_FragColor = vec4(1.0, 0.85, 0.5, 1.0) * intensity * 0.9;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    sunGroup.add(new THREE.Mesh(coronaGeo1, coronaMat1));

    // Outer Corona Glow (wider, softer)
    const coronaGeo2 = new THREE.SphereGeometry(26, 36, 24);
    const coronaMat2 = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(max(0.0, 0.42 - dot(vNormal, vec3(0, 0, 1.0))), 3.0);
          gl_FragColor = vec4(1.0, 0.6, 0.2, 1.0) * intensity * 0.4;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    sunGroup.add(new THREE.Mesh(coronaGeo2, coronaMat2));

    // Sun Core Light
    const sunLight = new THREE.PointLight(0xfffae8, 5.0, 1500, 0.6);
    sunGroup.add(sunLight);
    scene.add(sunGroup);


    // Ambient Space Light
    const ambientLight = new THREE.AmbientLight(0x1a2233, 0.6);
    scene.add(ambientLight);

    // Directional Lighting for near planets — warm sunlight from front-left
    const dirSun = new THREE.DirectionalLight(0xfffaea, 3.0);
    dirSun.position.set(-35, 25, 45);
    scene.add(dirSun);

    // Subtle Cyan/Blue Rim Fill
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.65);
    fillLight.position.set(45, -15, 25);
    scene.add(fillLight);

    // --- Concentric Planetary Orbit Lines (8 Planets) ---
    const createOrbitLine = (rx, rz) => {
      const curve = new THREE.EllipseCurve(0, 0, rx, rz, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(128);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x8fc7a4,
        transparent: true,
        opacity: 0.22,
      });
      const line = new THREE.Line(orbitGeo, orbitMat);
      line.position.copy(sunPos);
      return line;
    };

    const orbitRadii = [32, 48, 68, 92, 140, 185, 230, 275];
    const orbitLines = orbitRadii.map((r) => {
      const line = createOrbitLine(r, r * 0.94);
      scene.add(line);
      return line;
    });

    // --- Celestial Bodies & Moons ---
    const bodies = {};

    // 1. Mercury (Modeled on inner orbit near Sun)
    const mercuryGroup = new THREE.Group();
    mercuryGroup.position.set(22, 0, -250);
    const mercuryGeo = new THREE.SphereGeometry(1.2, 36, 24);
    const mercuryMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/mercury.webp'),
      roughness: 0.9,
    });
    mercuryGroup.add(new THREE.Mesh(mercuryGeo, mercuryMat));
    scene.add(mercuryGroup);
    bodies.mercury = { group: mercuryGroup, speed: 0.003 };

    // 2. Venus (Superheated second planet near Sun)
    const venusGroup = new THREE.Group();
    venusGroup.position.set(-36, 1.5, -242);
    const venusGeo = new THREE.SphereGeometry(2.1, 40, 28);
    const venusMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/venus.webp'),
      roughness: 0.75,
    });
    venusGroup.add(new THREE.Mesh(venusGeo, venusMat));
    scene.add(venusGroup);
    bodies.venus = { group: venusGroup, speed: 0.0018 };

    // 3. Earth & Clouds (Hero Section)
    const earthGroup = new THREE.Group();
    earthGroup.position.set(3.2, -0.2, 0);

    const earthGeo = new THREE.SphereGeometry(3.3, 64, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/earth-day.webp'),
      roughness: 0.85,
      metalness: 0.05,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // Rotating Clouds
    const cloudGeo = new THREE.SphereGeometry(3.34, 64, 48);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/earth-clouds.webp'),
      transparent: true,
      opacity: 0.85,
      blending: THREE.NormalBlending,
      roughness: 1.0,
    });
    const earthClouds = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(earthClouds);

    // Earth Atmosphere Fresnel Glow (Vibrant Blue Halo matching reference)
    const atmoGeo = new THREE.SphereGeometry(3.48, 64, 48);
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.35, 0.72, 1.0, 1.0) * intensity * 1.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    earthGroup.add(new THREE.Mesh(atmoGeo, atmoMat));
    scene.add(earthGroup);
    bodies.earth = { group: earthGroup, mesh: earthMesh, clouds: earthClouds, speed: 0.0014, cloudSpeed: 0.0022 };

    // 4. The Moon (Orbiting Earth / Close in Section 2)
    const moonPivot = new THREE.Group();
    moonPivot.position.set(3.2, 0.4, -30);

    const moonGeo = new THREE.SphereGeometry(2.2, 64, 48);
    const moonMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/moon.webp'),
      roughness: 0.95,
      metalness: 0.02,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonPivot.add(moonMesh);
    scene.add(moonPivot);
    bodies.moon = { group: moonPivot, mesh: moonMesh, speed: 0.001 };

    // 5. Mars (Visible in About Relay)
    const marsGroup = new THREE.Group();
    marsGroup.position.set(8.5, 3.5, -45);
    const marsGeo = new THREE.SphereGeometry(1.7, 48, 32);
    const marsMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/mars.webp'),
      roughness: 0.9,
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsGroup.add(marsMesh);

    // Phobos & Deimos Moons
    const phobosGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const phobosMat = new THREE.MeshStandardMaterial({ color: 0x887766 });
    const phobos = new THREE.Mesh(phobosGeo, phobosMat);
    phobos.position.set(2.8, 0.6, 0);
    marsGroup.add(phobos);

    scene.add(marsGroup);
    bodies.mars = { group: marsGroup, mesh: marsMesh, phobos, speed: 0.0014 };

    // Asteroids removed to eliminate blocky white square particle artifacts

    // 6. Jupiter & 4 Galilean Moons (Featured Section)
    const jupiterGroup = new THREE.Group();
    jupiterGroup.position.set(4.0, -0.3, -85);

    const jupiterGeo = new THREE.SphereGeometry(4.7, 64, 48);
    const jupiterMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/jupiter.webp'),
      roughness: 0.8,
      metalness: 0.05,
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiterGroup.add(jupiterMesh);

    // 4 Galilean Moons (Io, Europa, Ganymede, Callisto)
    const moonsConfig = [
      { name: 'io', r: 6.2, size: 0.35, color: 0xffdd44, speed: 0.024 },
      { name: 'europa', r: 8.0, size: 0.3, color: 0xeef5ff, speed: 0.016 },
      { name: 'ganymede', r: 10.2, size: 0.45, color: 0x999988, speed: 0.011 },
      { name: 'callisto', r: 12.5, size: 0.4, color: 0x666655, speed: 0.007 },
    ];
    const jupiterMoons = moonsConfig.map((m) => {
      const mMesh = new THREE.Mesh(
        new THREE.SphereGeometry(m.size, 24, 16),
        new THREE.MeshStandardMaterial({ color: m.color, roughness: 0.9 })
      );
      jupiterGroup.add(mMesh);
      return { mesh: mMesh, ...m, angle: Math.random() * Math.PI * 2 };
    });

    scene.add(jupiterGroup);
    bodies.jupiter = { group: jupiterGroup, mesh: jupiterMesh, moons: jupiterMoons, speed: 0.0024 };

    // 7. Saturn with 3D Rings & Titan Moon (Achievements Section)
    const saturnGroup = new THREE.Group();
    saturnGroup.position.set(3.8, 0.4, -145);

    const saturnGeo = new THREE.SphereGeometry(3.7, 64, 48);
    const saturnMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/saturn.webp'),
      roughness: 0.85,
    });
    const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
    saturnGroup.add(saturnMesh);

    // 3D Saturn Rings
    const ringGeo = new THREE.RingGeometry(4.4, 9.2, 128);
    ringGeo.rotateX(-Math.PI / 2);

    // Planar radial UV mapping
    const ringPos = ringGeo.attributes.position;
    const ringUV = ringGeo.attributes.uv;
    for (let i = 0; i < ringPos.count; i++) {
      const rx = ringPos.getX(i);
      const rz = ringPos.getZ(i);
      const rdist = Math.sqrt(rx * rx + rz * rz);
      const norm = (rdist - 4.4) / (9.2 - 4.4);
      ringUV.setXY(i, norm, 0.5);
    }
    ringUV.needsUpdate = true;

    const ringTex = loadTex('/textures/saturn-rings.webp');
    ringTex.wrapS = THREE.ClampToEdgeWrapping;
    ringTex.wrapT = THREE.ClampToEdgeWrapping;

    const ringMat = new THREE.MeshStandardMaterial({
      map: ringTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.94,
      roughness: 0.75,
    });
    const saturnRingMesh = new THREE.Mesh(ringGeo, ringMat);
    saturnGroup.add(saturnRingMesh);

    // Titan Moon
    const titanMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 24, 16),
      new THREE.MeshStandardMaterial({ color: 0xddaa55, roughness: 0.85 })
    );
    titanMesh.position.set(11.5, 1.2, 0);
    saturnGroup.add(titanMesh);

    saturnGroup.rotation.z = THREE.MathUtils.degToRad(26.7);
    saturnGroup.rotation.x = THREE.MathUtils.degToRad(16);
    scene.add(saturnGroup);
    bodies.saturn = { group: saturnGroup, mesh: saturnMesh, titan: titanMesh, speed: 0.0016 };

    // 8. Uranus & Neptune (Projects & Contact Sections)
    const uranusGroup = new THREE.Group();
    uranusGroup.position.set(3.4, 0.2, -195);
    const uranusGeo = new THREE.SphereGeometry(3.1, 48, 36);
    const uranusMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/uranus.webp'),
      roughness: 0.85,
    });
    uranusGroup.add(new THREE.Mesh(uranusGeo, uranusMat));
    uranusGroup.rotation.z = THREE.MathUtils.degToRad(97.77);
    scene.add(uranusGroup);
    bodies.uranus = { group: uranusGroup, speed: 0.0013 };

    const neptuneGroup = new THREE.Group();
    neptuneGroup.position.set(3.0, -0.3, -235);
    const neptuneGeo = new THREE.SphereGeometry(3.1, 48, 36);
    const neptuneMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/neptune.webp'),
      roughness: 0.85,
    });
    neptuneGroup.add(new THREE.Mesh(neptuneGeo, neptuneMat));

    // Triton Moon
    const tritonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 20, 16),
      new THREE.MeshStandardMaterial({ color: 0xccddee, roughness: 0.9 })
    );
    tritonMesh.position.set(6.2, 0.8, 0);
    neptuneGroup.add(tritonMesh);

    scene.add(neptuneGroup);
    bodies.neptune = { group: neptuneGroup, triton: tritonMesh, speed: 0.0014 };

    // --- Cinematic Camera Flight Waypoints (Scroll-driven 3D Path) ---
    // Curved trajectory positioning planets on screen-right to ensure 100% text legibility on left
    const flightPath = [
      // 0.00: Earth Close Orbit (Hero Start) — Earth positioned majestically on the right
      { p: 0.00, cam: new THREE.Vector3(-0.8, 0.4, 10.5), look: new THREE.Vector3(1.6, -0.2, 0), roll: 0.0 },
      // 0.08: 180° Orbital Swing around Earth's terminator
      { p: 0.08, cam: new THREE.Vector3(-2.8, 1.8, 12.0), look: new THREE.Vector3(1.2, 0.1, -5), roll: 0.2 },
      // 0.18: Moon & Mars (About Section) — framed on right
      { p: 0.18, cam: new THREE.Vector3(-1.4, 0.8, -18.0), look: new THREE.Vector3(1.2, 0.4, -30), roll: -0.2 },
      // 0.28: Martian Orbit approach
      { p: 0.28, cam: new THREE.Vector3(-0.2, 1.8, -36.0), look: new THREE.Vector3(3.2, 2.0, -45), roll: 0.15 },
      // 0.38: Approach towards Jupiter
      { p: 0.38, cam: new THREE.Vector3(-2.2, -0.6, -62.0), look: new THREE.Vector3(1.0, -0.3, -85), roll: -0.3 },
      // 0.48: Jupiter & Galilean Moons (Featured Section) — framed on right
      { p: 0.48, cam: new THREE.Vector3(-2.0, -0.2, -72.0), look: new THREE.Vector3(1.0, -0.3, -85), roll: 0.12 },
      // 0.58: Saturn Rings High Angle (Achievements Approach) — rings span right side
      { p: 0.58, cam: new THREE.Vector3(-1.8, 5.2, -125.0), look: new THREE.Vector3(0.8, 0.4, -145), roll: 0.35 },
      // 0.68: Saturn Cassini Underpass — text completely clear on left
      { p: 0.68, cam: new THREE.Vector3(-2.6, 2.0, -132.0), look: new THREE.Vector3(0.6, 0.4, -145), roll: -0.22 },
      // 0.78: Uranus Flight (Projects Section) — Uranus on right, left 65% open for projects grid
      { p: 0.78, cam: new THREE.Vector3(-1.8, 0.8, -177.0), look: new THREE.Vector3(0.6, 0.2, -195), roll: 0.18 },
      // 0.88: Neptune Deep Space Outpost (Contact Section) — Neptune & Sun on right
      { p: 0.88, cam: new THREE.Vector3(-3.4, 0.6, -218.0), look: new THREE.Vector3(0.2, -0.2, -235), roll: -0.12 },
      // 0.94: Pulling back into Heliocentric Overview
      { p: 0.94, cam: new THREE.Vector3(-2.0, 48.0, -280.0), look: new THREE.Vector3(1.0, 0, -420), roll: 0.05 },
      // 1.00: Full 360° Grand Solar System View & Sun Core
      { p: 1.00, cam: new THREE.Vector3(0.0, 140.0, -200.0), look: new THREE.Vector3(0, 0, -420), roll: 0.0 },
    ];

    // Spline-like smooth Hermite interpolation along 3D flight path
    const getFlightState = (prog) => {
      const p = Math.max(0, Math.min(1, prog));
      let idx = 0;
      for (let i = 0; i < flightPath.length - 1; i++) {
        if (p >= flightPath[i].p && p <= flightPath[i + 1].p) {
          idx = i;
          break;
        }
      }
      const p0 = flightPath[idx];
      const p1 = flightPath[Math.min(idx + 1, flightPath.length - 1)];
      const span = p1.p - p0.p || 0.001;
      const localT = (p - p0.p) / span;
      // Smooth quintic easing
      const t = localT * localT * localT * (localT * (localT * 6 - 15) + 10);

      const pos = new THREE.Vector3().lerpVectors(p0.cam, p1.cam, t);
      const look = new THREE.Vector3().lerpVectors(p0.look, p1.look, t);
      const roll = p0.roll + (p1.roll - p0.roll) * t;

      return { pos, look, roll };
    };

    // --- Mouse Parallax (6-DOF Cockpit Feel) ---
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Resize ---
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const isMob = width < 768;
      camera.aspect = width / height;
      camera.fov = isMob ? 54 : 45;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- Scroll Trigger ---
    let currentProg = 0;
    let targetProg = 0;
    let lastActiveIdx = -1;

    const handleScroll = () => {
      const introEl = document.getElementById('cinematic-intro');
      const introHeight = introEl ? introEl.offsetHeight : 0;
      const currentY = window.scrollY;

      if (currentY <= introHeight) {
        // While user is in intro, SolarCanvas stays locked at 0.00 (Earth)
        targetProg = 0.0;
        return;
      }

      // Precise section-anchored waypoint interpolation
      const sectionAnchors = [
        { id: 'hero', prog: 0.00 },
        { id: 'about', prog: 0.18 },
        { id: 'featured', prog: 0.48 },
        { id: 'achievements', prog: 0.68 },
        { id: 'projects', prog: 0.78 },
        { id: 'contact', prog: 0.94 },
      ];

      const tops = sectionAnchors.map((item) => {
        const el = document.getElementById(item.id);
        return el ? el.offsetTop : null;
      });

      if (tops[0] === null) {
        const mainScrollable = document.documentElement.scrollHeight - window.innerHeight - introHeight;
        targetProg = mainScrollable > 0 ? Math.max(0, Math.min(1, (currentY - introHeight) / mainScrollable)) : 0;
        return;
      }

      const scrollPos = currentY;
      if (scrollPos <= tops[0]) {
        targetProg = 0.00;
        return;
      }
      if (scrollPos >= tops[tops.length - 1]) {
        targetProg = 1.00;
        return;
      }

      for (let i = 0; i < tops.length - 1; i++) {
        const topCurrent = tops[i];
        const topNext = tops[i + 1];
        if (topCurrent !== null && topNext !== null && scrollPos >= topCurrent && scrollPos < topNext) {
          const ratio = (scrollPos - topCurrent) / (topNext - topCurrent);
          targetProg = sectionAnchors[i].prog + ratio * (sectionAnchors[i + 1].prog - sectionAnchors[i].prog);
          return;
        }
      }
      targetProg = 1.00;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Animation Loop ---
    let animId;
    let clock = new THREE.Clock();
    const currentLook = new THREE.Vector3(2.8, -0.2, 0);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth flight interpolation
      currentProg += (targetProg - currentProg) * 0.06;

      // Update Waypoint Telemetry
      const floatWaypoint = currentProg * (SOLAR_WAYPOINTS.length - 1);
      const activeWaypoint = Math.min(Math.round(floatWaypoint), SOLAR_WAYPOINTS.length - 1);
      if (activeWaypoint !== lastActiveIdx) {
        lastActiveIdx = activeWaypoint;
        const currentData = SOLAR_WAYPOINTS[activeWaypoint];
        if (onWaypointChange) onWaypointChange(currentData);
        if (onPlanetChange) onPlanetChange(currentData);
      }

      // Calculate camera position and lookAt on the flight path
      const flight = getFlightState(currentProg);

      // Responsive 6-DOF mouse parallax & mobile viewport framing
      const isMob = width < 768;
      const pX = mouseX * (isMob ? 0.2 : 0.6);
      const pY = -mouseY * (isMob ? 0.2 : 0.6);
      const mobCamZ = isMob ? (currentProg > 0.04 ? 2.8 : 0) : 0;
      const mobCamX = isMob ? -0.5 : 0;

      camera.position.x += (flight.pos.x + pX + mobCamX - camera.position.x) * 0.065;
      camera.position.y += (flight.pos.y + pY - camera.position.y) * 0.065;
      camera.position.z += (flight.pos.z + mobCamZ - camera.position.z) * 0.065;

      currentLook.x += (flight.look.x - currentLook.x) * 0.065;
      currentLook.y += (flight.look.y - currentLook.y) * 0.065;
      currentLook.z += (flight.look.z - currentLook.z) * 0.065;

      camera.lookAt(currentLook);
      camera.rotation.z += (flight.roll - camera.rotation.z) * 0.065;

      // Idle Rotation & Orbiting Moons
      if (bodies.earth) {
        bodies.earth.mesh.rotation.y += bodies.earth.speed;
        bodies.earth.clouds.rotation.y += bodies.earth.cloudSpeed;
      }
      if (bodies.moon) {
        bodies.moon.mesh.rotation.y += bodies.moon.speed;
      }
      if (bodies.mars) {
        bodies.mars.mesh.rotation.y += bodies.mars.speed;
        if (bodies.mars.phobos) {
          bodies.mars.phobos.position.x = Math.cos(elapsed * 2.2) * 2.8;
          bodies.mars.phobos.position.z = Math.sin(elapsed * 2.2) * 2.8;
        }
      }
      if (bodies.mercury) bodies.mercury.group.rotation.y += bodies.mercury.speed;
      if (bodies.venus) bodies.venus.group.rotation.y += bodies.venus.speed;
      if (bodies.jupiter) {
        bodies.jupiter.mesh.rotation.y += bodies.jupiter.speed;
        // Orbit Galilean Moons around Jupiter
        bodies.jupiter.moons.forEach((m) => {
          m.angle += m.speed;
          m.mesh.position.x = Math.cos(m.angle) * m.r;
          m.mesh.position.z = Math.sin(m.angle) * m.r;
        });
      }
      if (bodies.saturn) {
        bodies.saturn.mesh.rotation.y += bodies.saturn.speed;
        if (bodies.saturn.titan) {
          bodies.saturn.titan.position.x = Math.cos(elapsed * 0.6) * 11.5;
          bodies.saturn.titan.position.z = Math.sin(elapsed * 0.6) * 11.5;
        }
      }
      if (bodies.uranus) bodies.uranus.group.rotation.y += bodies.uranus.speed;
      if (bodies.neptune) {
        bodies.neptune.group.rotation.y += bodies.neptune.speed;
        if (bodies.neptune.triton) {
          bodies.neptune.triton.position.x = Math.cos(elapsed * 0.8) * 6.2;
          bodies.neptune.triton.position.z = Math.sin(elapsed * 0.8) * 6.2;
        }
      }

      // Animate Sun surface shader
      sunMat.uniforms.uTime.value = elapsed;

      // Rotate Starfield & Sun
      starPoints.rotation.y += 0.00008;
      sunMesh.rotation.y += 0.001;

      // Fade orbit lines into view as we zoom out to the whole solar system
      const orbitOpacity = Math.max(0, (currentProg - 0.72) / 0.28) * 0.38;
      orbitLines.forEach((line) => {
        line.material.opacity = orbitOpacity;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

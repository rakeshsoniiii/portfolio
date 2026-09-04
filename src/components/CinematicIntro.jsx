import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CinematicIntro() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [stageInfo, setStageInfo] = useState({
    title: 'STATION // PILOT WORKSPACE',
    altitude: '0.8M',
    sub: 'DEVELOPER STUDY · FOCUS PLAN EXECUTE REPEAT',
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvasContainer = canvasRef.current;
    if (!container || !canvasContainer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      container.style.display = 'none';
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020308, 0.0015);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 2000);
    camera.position.set(0, 0, 3.8);
    const baseFov = 42;

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
    canvasContainer.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const loadTex = (url) => {
      const tex = textureLoader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // Soft circular texture for stars
    const createCircleTexture = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 64;
      cvs.height = 64;
      const ctx = cvs.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.15, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.35)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(cvs);
    };

    // =========================================================================
    // LIGHTING — Cinematic multi-stage
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x0a1020, 0.5);
    scene.add(ambientLight);

    // Warm desk lamp glow for stage 1
    const deskLamp = new THREE.PointLight(0xf59e0b, 2.5, 10);
    deskLamp.position.set(-1.4, 0.6, 1.8);
    scene.add(deskLamp);

    // Laptop screen blue glow
    const laptopGlow = new THREE.PointLight(0x60a5fa, 2.8, 8);
    laptopGlow.position.set(0, -0.3, 1.5);
    scene.add(laptopGlow);

    // Sunlight for space stage
    const spaceSun = new THREE.DirectionalLight(0xfffaea, 3.2);
    spaceSun.position.set(-35, 25, 45);
    scene.add(spaceSun);

    // Cyan atmosphere rim fill
    const spaceFill = new THREE.DirectionalLight(0x38bdf8, 0.8);
    spaceFill.position.set(40, -15, 25);
    scene.add(spaceFill);

    // =========================================================================
    // STAGE 1: 3D LAPTOP, DESK & USER PORTRAIT
    // =========================================================================
    const studioGroup = new THREE.Group();

    // Rakesh photo plane
    const portraitTex = loadTex('/images/rakesh.png');
    const portraitMat = new THREE.MeshBasicMaterial({
      map: portraitTex,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
    });
    const portraitMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 3.45), portraitMat);
    portraitMesh.position.set(0, 0, -0.2);
    studioGroup.add(portraitMesh);

    // Procedural 3D Desk Surface
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x181d28,
      roughness: 0.75,
      metalness: 0.15,
      transparent: true,
      opacity: 1.0,
    });
    const deskMesh = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.15, 2.5), deskMat);
    deskMesh.position.set(0, -1.35, 1.1);
    studioGroup.add(deskMesh);

    // Procedural 3D Laptop
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.35, -1.25, 1.4);
    laptopGroup.rotation.y = THREE.MathUtils.degToRad(8);

    const laptopBodyMat = new THREE.MeshStandardMaterial({
      color: 0x28303f,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 1.0,
    });
    laptopGroup.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 1.1), laptopBodyMat));

    const keyboardMat = new THREE.MeshBasicMaterial({
      color: 0x0f1420,
      transparent: true,
      opacity: 1.0,
    });
    const keyboardMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.75), keyboardMat);
    keyboardMesh.rotation.x = -Math.PI / 2;
    keyboardMesh.position.set(0, 0.025, 0.05);
    laptopGroup.add(keyboardMesh);

    const screenLidGroup = new THREE.Group();
    screenLidGroup.position.set(0, 0.02, -0.5);
    screenLidGroup.rotation.x = -Math.PI * 0.08;
    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.03), laptopBodyMat);
    lidMesh.position.set(0, 0.5, 0);
    screenLidGroup.add(lidMesh);

    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.95,
    });
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.92), screenMat);
    screenMesh.position.set(0, 0.5, 0.02);
    screenLidGroup.add(screenMesh);

    laptopGroup.add(screenLidGroup);
    studioGroup.add(laptopGroup);

    // Room ambient glow particles (dust motes)
    const dustCount = 120;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 6;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 3 + 1;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xf5d4a0,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      map: createCircleTexture(),
      alphaTest: 0.01,
      sizeAttenuation: true,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    studioGroup.add(dustPoints);

    scene.add(studioGroup);

    // =========================================================================
    // STAGE 2: REALISTIC NIGHT CITY (Dense InstancedMesh with depth fog)
    // =========================================================================
    const cityGroup = new THREE.Group();
    cityGroup.position.set(0, -3.5, -10.0);
    cityGroup.rotation.x = -Math.PI / 3.8;

    const buildingCount = 350;
    const buildingGeo = new THREE.BoxGeometry(0.8, 1, 0.8);
    const buildingMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying float vHeight;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * instanceMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          vHeight = position.y; // local height within building
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying float vHeight;
        uniform float uOpacity;
        uniform float uTime;
        
        float hash21(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        
        void main() {
          // Window grid — tighter pattern for realism
          vec2 windowCoord = vWorldPosition.xy * 5.0;
          vec2 windowCell = floor(windowCoord);
          vec2 windowLocal = fract(windowCoord);
          
          // Window shape: rectangular with thin mullion gaps
          float mullionX = step(0.12, windowLocal.x) * (1.0 - step(0.88, windowLocal.x));
          float mullionY = step(0.15, windowLocal.y) * (1.0 - step(0.85, windowLocal.y));
          float isWindow = mullionX * mullionY;
          
          // Only vertical faces have windows
          float isVertical = 1.0 - abs(vNormal.y);
          
          // Per-window randomization
          float seed = hash21(windowCell);
          float seed2 = hash21(windowCell + vec2(42.0));
          
          // 40% of windows are dark
          float isLit = step(0.40, seed);
          
          // Color variety: warm amber (70%), cool white (20%), cyan accent (10%)
          vec3 warmAmber = vec3(1.0, 0.72, 0.28);
          vec3 coolWhite = vec3(0.85, 0.88, 0.95);
          vec3 accentCyan = vec3(0.35, 0.75, 0.95);
          vec3 litColor = warmAmber;
          if (seed2 > 0.7) litColor = coolWhite;
          if (seed2 > 0.9) litColor = accentCyan;
          
          // Subtle flicker for realism
          float flicker = 0.92 + 0.08 * sin(uTime * 1.5 + seed * 80.0 + seed2 * 30.0);
          
          // Dark concrete/glass facade
          vec3 facade = vec3(0.025, 0.03, 0.055);
          // Slightly lighter edges for building separation
          float edgeHighlight = pow(abs(vNormal.x * vNormal.z), 0.3) * 0.015;
          facade += edgeHighlight;
          
          vec3 col = mix(facade, litColor * 1.2 * flicker, isWindow * isVertical * isLit);
          
          // Vertical gradient: buildings darker at base, lighter at roofline
          float heightGrad = smoothstep(-0.5, 0.45, vHeight);
          col *= 0.7 + heightGrad * 0.3;
          
          // Roof glow: flat tops emit faint blue
          float isTop = step(0.98, vNormal.y);
          col += vec3(0.008, 0.012, 0.025) * isTop;
          
          // Atmospheric depth fog: buildings far from camera fade into haze
          float distFromCam = length(vWorldPosition.xz) / 20.0;
          float fogFactor = 1.0 - smoothstep(0.0, 1.0, distFromCam * 0.5);
          vec3 fogColor = vec3(0.015, 0.025, 0.055);
          col = mix(fogColor, col, fogFactor * 0.85 + 0.15);
          
          gl_FragColor = vec4(col, uOpacity);
        }
      `,
      uniforms: {
        uOpacity: { value: 0.0 },
        uTime: { value: 0.0 },
      },
      transparent: true,
    });

    const instancedBuildings = new THREE.InstancedMesh(buildingGeo, buildingMat, buildingCount);
    const dummy = new THREE.Object3D();
    const cityExtent = 36;

    for (let i = 0; i < buildingCount; i++) {
      // Organic placement: clustered downtown core with suburban sprawl
      let x, z;
      if (i < 60) {
        // Dense downtown core
        x = (Math.random() - 0.5) * 8;
        z = (Math.random() - 0.5) * 8;
      } else if (i < 150) {
        // Inner ring
        const angle = Math.random() * Math.PI * 2;
        const r = 4 + Math.random() * 10;
        x = Math.cos(angle) * r;
        z = Math.sin(angle) * r;
      } else {
        // Suburban sprawl
        x = (Math.random() - 0.5) * cityExtent;
        z = (Math.random() - 0.5) * cityExtent;
      }

      const distFromCenter = Math.sqrt(x * x + z * z) / (cityExtent * 0.5);
      
      // Downtown skyscrapers vs suburban low-rises
      let heightScale;
      if (distFromCenter < 0.2) {
        heightScale = 5.0 + Math.random() * 8.0; // Tall downtown
      } else if (distFromCenter < 0.5) {
        heightScale = 2.0 + Math.random() * 5.0; // Mid-rise
      } else {
        heightScale = 0.8 + Math.random() * 2.5; // Suburban
      }

      // Vary building footprint for realism
      const widthX = 0.35 + Math.random() * 0.9;
      const widthZ = 0.35 + Math.random() * 0.9;
      
      dummy.position.set(x, heightScale / 2, z);
      dummy.scale.set(widthX, heightScale, widthZ);
      // Slight random rotation for organic feel
      dummy.rotation.y = (Math.random() - 0.5) * 0.15;
      dummy.updateMatrix();
      instancedBuildings.setMatrixAt(i, dummy.matrix);
    }
    instancedBuildings.instanceMatrix.needsUpdate = true;
    cityGroup.add(instancedBuildings);

    // City Ground with realistic road network
    const gridGroundMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uOpacity;
        uniform float uTime;
        
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        
        void main() {
          // Multi-scale road grid
          vec2 uv = vUv;
          
          // Local streets (thin, dim)
          vec2 localGrid = abs(fract(uv * 40.0 - 0.5) - 0.5) / fwidth(uv * 40.0);
          float localLine = 1.0 - min(min(localGrid.x, localGrid.y), 1.0);
          
          // Collector roads (medium)
          vec2 collectorGrid = abs(fract(uv * 10.0 - 0.5) - 0.5) / fwidth(uv * 10.0);
          float collectorLine = 1.0 - min(min(collectorGrid.x, collectorGrid.y), 1.0);
          
          // Highways (bright, wide feel)
          vec2 hwGrid = abs(fract(uv * 3.0 - 0.5) - 0.5) / fwidth(uv * 3.0);
          float hwLine = 1.0 - min(min(hwGrid.x, hwGrid.y), 1.0);
          
          // Ground is nearly black
          vec3 ground = vec3(0.008, 0.012, 0.025);
          vec3 localStreetColor = vec3(0.6, 0.45, 0.2);
          vec3 collectorColor = vec3(0.9, 0.6, 0.2);
          vec3 hwColor = vec3(1.0, 0.75, 0.3);
          
          vec3 col = ground;
          col += localStreetColor * localLine * 0.12;
          col += collectorColor * collectorLine * 0.2;
          col += hwColor * hwLine * 0.15;
          
          // Scattered ground lights (parked cars, signs)
          float scatter = hash(floor(uv * 80.0));
          col += vec3(1.0, 0.85, 0.5) * step(0.97, scatter) * 0.08;
          
          // Radial city center glow
          float dist = length(uv - 0.5);
          col += vec3(0.015, 0.01, 0.005) * (1.0 - smoothstep(0.0, 0.5, dist));
          
          gl_FragColor = vec4(col, uOpacity);
        }
      `,
      uniforms: {
        uOpacity: { value: 0.0 },
        uTime: { value: 0.0 },
      },
      transparent: true,
    });
    const gridGround = new THREE.Mesh(
      new THREE.PlaneGeometry(cityExtent * 1.8, cityExtent * 1.8, 1, 1),
      gridGroundMat
    );
    gridGround.rotation.x = -Math.PI / 2;
    cityGroup.add(gridGround);

    // City Light Pollution Dome (volumetric amber haze above city)
    const cityHazeMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPos;
        uniform float uOpacity;
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          // Bell-curve glow concentrated at center
          float glow = exp(-dist * dist * 3.0);
          // Amber-orange haze transitioning to dark blue at edges
          vec3 innerGlow = vec3(0.95, 0.55, 0.15);
          vec3 outerGlow = vec3(0.12, 0.18, 0.35);
          vec3 col = mix(innerGlow, outerGlow, dist * 0.8);
          gl_FragColor = vec4(col * 0.15, glow * uOpacity * 0.55);
        }
      `,
      uniforms: { uOpacity: { value: 0.0 } },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const cityHaze = new THREE.Mesh(new THREE.PlaneGeometry(42, 42), cityHazeMat);
    cityHaze.position.set(0, 8, 0);
    cityHaze.rotation.x = -Math.PI / 2;
    cityGroup.add(cityHaze);
    
    // Second haze layer (lower, wider) for realistic light bleed
    const cityHaze2 = new THREE.Mesh(new THREE.PlaneGeometry(55, 55), cityHazeMat.clone());
    cityHaze2.material.uniforms = { uOpacity: { value: 0.0 } };
    cityHaze2.position.set(0, 3.5, 0);
    cityHaze2.rotation.x = -Math.PI / 2;
    cityGroup.add(cityHaze2);

    scene.add(cityGroup);

    // =========================================================================
    // STAGE 3: INDIA SUBCONTINENT — Procedural Terrain Shader
    // =========================================================================
    const subcontinentGroup = new THREE.Group();
    subcontinentGroup.position.set(0, -1.8, -20.0);
    subcontinentGroup.rotation.x = -Math.PI / 5.2;

    const subcontinentGeo = new THREE.SphereGeometry(18, 64, 48, 0, Math.PI * 0.65, 0, Math.PI * 0.45);
    const subcontinentMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uOpacity;
        uniform float uTime;
        
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1,0)), f.x),
            mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
            f.y
          );
        }
        
        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 6; i++) {
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }
        
        void main() {
          // Procedural terrain: land vs ocean
          vec2 terrainCoord = vUv * 12.0 + vec2(3.0, 1.5);
          float terrain = fbm(terrainCoord);
          float terrain2 = fbm(terrainCoord * 1.5 + vec2(5.0));
          
          // Land elevation
          float landMask = smoothstep(0.38, 0.45, terrain);
          
          // Ocean colors
          vec3 deepOcean = vec3(0.01, 0.04, 0.12);
          vec3 shallowOcean = vec3(0.02, 0.08, 0.18);
          vec3 oceanColor = mix(deepOcean, shallowOcean, terrain2);
          
          // Land colors: green lowland -> brown highland -> white peaks
          vec3 lowland = vec3(0.06, 0.15, 0.04);
          vec3 forest = vec3(0.04, 0.12, 0.03);
          vec3 highland = vec3(0.18, 0.14, 0.08);
          vec3 mountain = vec3(0.35, 0.28, 0.2);
          vec3 snow = vec3(0.85, 0.88, 0.92);
          
          float elev = terrain * 1.2;
          vec3 landColor = mix(lowland, forest, smoothstep(0.4, 0.5, elev));
          landColor = mix(landColor, highland, smoothstep(0.55, 0.65, elev));
          landColor = mix(landColor, mountain, smoothstep(0.7, 0.8, elev));
          landColor = mix(landColor, snow, smoothstep(0.85, 0.95, elev));
          
          vec3 color = mix(oceanColor, landColor, landMask);
          
          // Night-side city lights
          float nightSide = 1.0 - max(dot(vNormal, normalize(vec3(-1.0, 0.5, 1.0))), 0.0);
          float cityLight = step(0.62, terrain2) * landMask * nightSide * 0.6;
          color += vec3(1.0, 0.78, 0.35) * cityLight;
          
          // Atmospheric scattering on edge
          float rim = pow(1.0 - max(dot(vNormal, vec3(0,0,1)), 0.0), 2.5);
          color = mix(color, vec3(0.3, 0.6, 1.0), rim * 0.4);
          
          // Lighting
          float diffuse = max(dot(vNormal, normalize(vec3(-1.0, 0.5, 1.0))), 0.0) * 0.7 + 0.3;
          color *= diffuse;
          
          gl_FragColor = vec4(color, uOpacity);
        }
      `,
      uniforms: {
        uOpacity: { value: 0.0 },
        uTime: { value: 0.0 },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
    const subcontinentMesh = new THREE.Mesh(subcontinentGeo, subcontinentMat);
    subcontinentMesh.rotation.y = THREE.MathUtils.degToRad(120);
    subcontinentMesh.rotation.x = THREE.MathUtils.degToRad(25);
    subcontinentGroup.add(subcontinentMesh);
    scene.add(subcontinentGroup);

    // =========================================================================
    // STAGE 4: VOLUMETRIC CLOUD LAYERS — Multi-layer parallax
    // =========================================================================
    const cloudLayers = [];
    for (let i = 0; i < 3; i++) {
      const cloudGeo = new THREE.PlaneGeometry(55 + i * 10, 35 + i * 5);
      const cloudMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uOpacity;
          uniform float uTime;
          uniform float uLayer;
          
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }
          
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(hash(i), hash(i + vec2(1,0)), f.x),
              mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
              f.y
            );
          }
          
          float fbm(vec2 p) {
            float v = 0.0; float a = 0.5;
            for (int i = 0; i < 5; i++) {
              v += a * noise(p);
              p *= 2.0; a *= 0.5;
            }
            return v;
          }
          
          void main() {
            vec2 uv = vUv + vec2(uTime * 0.008 * (1.0 + uLayer * 0.5), uTime * 0.003);
            float clouds = fbm(uv * 4.0 + uLayer * 3.0);
            float cloudShape = smoothstep(0.35, 0.7, clouds);
            
            // Fade edges
            float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x)
                           * smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
            
            vec3 col = mix(vec3(0.7, 0.75, 0.85), vec3(1.0, 1.0, 1.0), cloudShape);
            float alpha = cloudShape * edgeFade * uOpacity * (0.5 - uLayer * 0.12);
            
            gl_FragColor = vec4(col, alpha);
          }
        `,
        uniforms: {
          uOpacity: { value: 0.0 },
          uTime: { value: 0.0 },
          uLayer: { value: i * 1.0 },
        },
        transparent: true,
        blending: THREE.NormalBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      cloudMesh.position.set(0, 0.2 + i * 0.8, -16.0 - i * 2.0);
      scene.add(cloudMesh);
      cloudLayers.push({ mesh: cloudMesh, mat: cloudMat });
    }

    // =========================================================================
    // STAGE 5: DEEP SPACE STARS
    // =========================================================================
    const starCount = 4000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const dist = 300 + Math.random() * 900;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = dist * Math.cos(phi);

      const colorRoll = Math.random();
      const b = 0.4 + Math.random() * 0.5;
      if (colorRoll > 0.93) {
        // Blue-white hot stars
        starCols[i * 3] = 0.7 * b;
        starCols[i * 3 + 1] = 0.82 * b;
        starCols[i * 3 + 2] = 1.0 * b;
      } else if (colorRoll > 0.85) {
        // Amber/red giant stars
        starCols[i * 3] = 1.0 * b;
        starCols[i * 3 + 1] = 0.75 * b;
        starCols[i * 3 + 2] = 0.45 * b;
      } else {
        // Standard white-blue
        starCols[i * 3] = 0.9 * b;
        starCols[i * 3 + 1] = 0.93 * b;
        starCols[i * 3 + 2] = 1.0 * b;
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.0,
      map: createCircleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
      alphaTest: 0.005,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // =========================================================================
    // STAGE 6: FULL 3D EARTH (matches #hero SolarCanvas framing)
    // =========================================================================
    const earthGroup = new THREE.Group();
    earthGroup.position.set(3.2, -0.2, 0);

    const earthGeo = new THREE.SphereGeometry(3.3, 64, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/earth-day.webp'),
      roughness: 0.75,
      metalness: 0.05,
      transparent: true,
      opacity: 0.0,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.rotation.y = THREE.MathUtils.degToRad(185);
    earthGroup.add(earthMesh);

    // Rotating Clouds
    const earthCloudGeo = new THREE.SphereGeometry(3.34, 64, 48);
    const earthCloudMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/earth-clouds.webp'),
      transparent: true,
      opacity: 0.0,
      blending: THREE.NormalBlending,
      roughness: 1.0,
    });
    const earthClouds = new THREE.Mesh(earthCloudGeo, earthCloudMat);
    earthGroup.add(earthClouds);

    // Atmosphere Fresnel Glow
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
        uniform float uOpacity;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.35, 0.72, 1.0, 1.0) * intensity * 1.6 * uOpacity;
        }
      `,
      uniforms: {
        uOpacity: { value: 0.0 },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    earthGroup.add(new THREE.Mesh(atmoGeo, atmoMat));
    scene.add(earthGroup);

    // =========================================================================
    // NEBULA BACKGROUND — subtle cosmic color wash
    // =========================================================================
    const nebulaGeo = new THREE.PlaneGeometry(600, 600);
    const nebulaMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uOpacity;
        
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
        }
        float fbm(vec2 p) {
          float v = 0.0; float a = 0.5;
          for(int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
          return v;
        }
        
        void main() {
          float n1 = fbm(vUv * 3.0 + vec2(10.0));
          float n2 = fbm(vUv * 2.5 + vec2(50.0));
          
          vec3 nebula1 = vec3(0.08, 0.02, 0.15) * n1;
          vec3 nebula2 = vec3(0.02, 0.06, 0.12) * n2;
          
          vec3 col = nebula1 + nebula2;
          float alpha = (n1 * 0.3 + n2 * 0.2) * uOpacity;
          
          gl_FragColor = vec4(col, alpha);
        }
      `,
      uniforms: { uOpacity: { value: 0.0 } },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.set(0, 0, -400);
    scene.add(nebula);

    // --- Resize Handler ---
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- Scroll Scrubbing Logic ---
    let currentP = 0;
    let targetP = 0;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
        targetP = p;
        setScrollProgress(p);

        if (p >= 0.95) {
          sessionStorage.setItem('portfolio_intro_seen', 'true');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Animation Loop ---
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth scrub lerp
      currentP += (targetP - currentP) * 0.075;

      // Telemetry HUD updates
      if (currentP < 0.18) {
        setStageInfo({
          title: 'STATION // PILOT WORKSPACE',
          altitude: `${(0.8 + currentP * 80).toFixed(1)}M`,
          sub: 'DEVELOPER STUDY · FOCUS PLAN EXECUTE REPEAT',
        });
      } else if (currentP < 0.42) {
        setStageInfo({
          title: 'DRONE // URBAN AERIAL VIEW',
          altitude: `${Math.round(25 + (currentP - 0.18) * 3200)}M`,
          sub: '3D PROCEDURAL METROPOLIS · STREET LIGHTS',
        });
      } else if (currentP < 0.65) {
        setStageInfo({
          title: 'SATELLITE // REGIONAL ASCENT',
          altitude: `${Math.round(25 + (currentP - 0.42) * 450)}KM`,
          sub: 'WEST BENGAL · GANGES DELTA · BAY OF BENGAL',
        });
      } else if (currentP < 0.85) {
        setStageInfo({
          title: 'ORBITAL // ATMOSPHERIC TRANSIT',
          altitude: `${Math.round(180 + (currentP - 0.65) * 3500)}KM`,
          sub: 'CLOUD DECKS · ATMOSPHERIC SCATTERING',
        });
      } else {
        setStageInfo({
          title: 'DEEP SPACE // EARTH HOME ORBIT',
          altitude: '12,742KM',
          sub: '22.5726° N, 88.3639° E · HOME TELEMETRY',
        });
      }

      // =====================================================================
      // CROSS-FADING OPACITIES (bug-free — uses correct property access)
      // =====================================================================

      // 1. Studio & Laptop: visible at start, fades out 0.14 -> 0.26
      const studioOpacity = Math.max(0, Math.min(1, 1 - (currentP - 0.14) / 0.12));
      portraitMat.opacity = studioOpacity;
      deskMat.opacity = studioOpacity;
      laptopBodyMat.opacity = studioOpacity;
      keyboardMat.opacity = studioOpacity;
      screenMat.opacity = studioOpacity;
      dustMat.opacity = studioOpacity * 0.4;
      deskLamp.intensity = studioOpacity * 2.5;
      laptopGlow.intensity = studioOpacity * 2.8;

      // 2. City: fades in 0.14 -> 0.26, stays, fades out 0.40 -> 0.52
      let cityOpacity = 0;
      if (currentP < 0.14) cityOpacity = 0;
      else if (currentP < 0.26) cityOpacity = (currentP - 0.14) / 0.12;
      else if (currentP < 0.40) cityOpacity = 1.0;
      else if (currentP < 0.52) cityOpacity = 1 - (currentP - 0.40) / 0.12;
      buildingMat.uniforms.uOpacity.value = cityOpacity;
      buildingMat.uniforms.uTime.value = elapsed;
      gridGroundMat.uniforms.uOpacity.value = cityOpacity;
      cityHazeMat.uniforms.uOpacity.value = cityOpacity;

      // 3. Subcontinent Terrain: fades in 0.38 -> 0.50, stays, fades out 0.64 -> 0.76
      let subOpacity = 0;
      if (currentP < 0.38) subOpacity = 0;
      else if (currentP < 0.50) subOpacity = (currentP - 0.38) / 0.12;
      else if (currentP < 0.64) subOpacity = 1.0;
      else if (currentP < 0.76) subOpacity = 1 - (currentP - 0.64) / 0.12;
      // FIX: subcontinentMat is a ShaderMaterial now — use uniforms correctly
      subcontinentMat.uniforms.uOpacity.value = subOpacity;
      subcontinentMat.uniforms.uTime.value = elapsed;

      // 4. Cloud Decks: visible 0.55 -> 0.82
      let cloudBaseOpacity = 0;
      if (currentP >= 0.55 && currentP <= 0.85) {
        if (currentP < 0.65) cloudBaseOpacity = (currentP - 0.55) / 0.10;
        else if (currentP < 0.75) cloudBaseOpacity = 1.0;
        else cloudBaseOpacity = 1 - (currentP - 0.75) / 0.10;
      }
      cloudLayers.forEach((cl) => {
        cl.mat.uniforms.uOpacity.value = cloudBaseOpacity;
        cl.mat.uniforms.uTime.value = elapsed;
      });

      // 5. Stars: fade in when entering space (p >= 0.68)
      const starsOpacity = Math.max(0, Math.min(0.7, (currentP - 0.68) / 0.22));
      starMat.opacity = starsOpacity;
      starPoints.rotation.y += 0.00012;

      // 6. Nebula backdrop
      nebulaMat.uniforms.uOpacity.value = starsOpacity * 0.5;

      // 7. Full 3D Earth: fades in 0.72 -> 0.90
      const earthOpacity = Math.max(0, Math.min(1, (currentP - 0.72) / 0.18));
      earthMat.opacity = earthOpacity;
      earthCloudMat.opacity = earthOpacity * 0.85;
      atmoMat.uniforms.uOpacity.value = earthOpacity;

      earthMesh.rotation.y += 0.0014;
      earthClouds.rotation.y += 0.0022;

      // Animate dust motes floating
      if (studioOpacity > 0.01) {
        const positions = dustGeo.attributes.position.array;
        for (let i = 0; i < dustCount; i++) {
          positions[i * 3 + 1] += Math.sin(elapsed * 0.5 + i) * 0.0003;
          positions[i * 3] += Math.cos(elapsed * 0.3 + i * 0.7) * 0.0002;
        }
        dustGeo.attributes.position.needsUpdate = true;
      }

      // --- CAMERA CHOREOGRAPHY (Cinematic zoom-out with FOV + z-depth) ---
      let camX, camY, camZ, lookX, lookY, lookZ, fov, roll;

      if (currentP < 0.22) {
        // Stage 1: Intimate desk close-up → pulling back through room
        const t = currentP / 0.22;
        const ease = t * t * (3 - 2 * t);
        camX = THREE.MathUtils.lerp(0, 0.15, ease);
        camY = THREE.MathUtils.lerp(0, 1.2, ease);
        camZ = THREE.MathUtils.lerp(3.8, 12.0, ease); // Big Z pullback
        lookX = 0;
        lookY = THREE.MathUtils.lerp(0, -1.5, ease);
        lookZ = THREE.MathUtils.lerp(0, -3.0, ease);
        fov = THREE.MathUtils.lerp(baseFov, baseFov + 8, ease); // Widen FOV as pulling back
        roll = THREE.MathUtils.lerp(0, 0.04, ease);
      } else if (currentP < 0.48) {
        // Stage 2: Drone rising above city → aerial view
        const t = (currentP - 0.22) / 0.26;
        const ease = t * t * (3 - 2 * t);
        camX = THREE.MathUtils.lerp(0.15, -0.3, ease);
        camY = THREE.MathUtils.lerp(1.2, 3.5, ease); // Rising high
        camZ = THREE.MathUtils.lerp(12.0, 18.0, ease);
        lookX = THREE.MathUtils.lerp(0, 0, ease);
        lookY = THREE.MathUtils.lerp(-1.5, -2.5, ease); // Looking down at city
        lookZ = THREE.MathUtils.lerp(-3.0, -8.0, ease);
        fov = THREE.MathUtils.lerp(baseFov + 8, baseFov + 4, ease);
        roll = THREE.MathUtils.lerp(0.04, -0.06, ease); // Banking turn
      } else if (currentP < 0.70) {
        // Stage 3: Continental ascent → high atmosphere
        const t = (currentP - 0.48) / 0.22;
        const ease = t * t * t * (t * (t * 6 - 15) + 10); // quintic
        camX = THREE.MathUtils.lerp(-0.3, 0.0, ease);
        camY = THREE.MathUtils.lerp(3.5, 2.0, ease);
        camZ = THREE.MathUtils.lerp(18.0, 22.0, ease);
        lookX = 0;
        lookY = THREE.MathUtils.lerp(-2.5, 0.0, ease);
        lookZ = THREE.MathUtils.lerp(-8.0, -5.0, ease);
        fov = THREE.MathUtils.lerp(baseFov + 4, baseFov - 2, ease); // Narrowing = telephoto
        roll = THREE.MathUtils.lerp(-0.06, 0.03, ease);
      } else {
        // Stage 4: Space → lock into Earth hero framing
        const t = (currentP - 0.70) / 0.30;
        const ease = t * t * t * (t * (t * 6 - 15) + 10);
        camX = THREE.MathUtils.lerp(0.0, -0.4, ease);
        camY = THREE.MathUtils.lerp(2.0, 0.4, ease);
        camZ = THREE.MathUtils.lerp(22.0, 10.5, ease); // Dramatic pull-in to Earth
        lookX = THREE.MathUtils.lerp(0.0, 2.8, ease);
        lookY = THREE.MathUtils.lerp(0.0, -0.2, ease);
        lookZ = 0;
        fov = THREE.MathUtils.lerp(baseFov - 2, baseFov + 3, ease); // Settle to hero FOV
        roll = THREE.MathUtils.lerp(0.03, 0.0, ease);
      }

      // Subtle breathing motion
      camX += Math.sin(elapsed * 0.25) * 0.015;
      camY += Math.cos(elapsed * 0.2) * 0.01;

      // Apply FOV animation
      camera.fov = fov;
      camera.updateProjectionMatrix();
      
      camera.position.set(camX, camY, camZ);
      camera.lookAt(lookX, lookY, lookZ);
      // Apply roll
      camera.rotation.z += roll;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      buildingGeo.dispose();
      buildingMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    };
  }, []);

  const handleSkip = () => {
    sessionStorage.setItem('portfolio_intro_seen', 'true');
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: containerRef.current ? containerRef.current.offsetHeight : window.innerHeight * 3.5,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="cinematic-intro"
      ref={containerRef}
      className="relative h-[450vh] w-full bg-[#020308] z-20"
      aria-label="Cinematic 3D Zoom-Out Intro"
    >
      {/* 100vh Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#020308]">
        {/* Three.js Canvas */}
        <div ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        {/* Editorial HUD Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-12 lg:p-16 z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ink-faint">
                {stageInfo.title}
              </span>
            </div>

            <button
              onClick={handleSkip}
              className="px-4 py-2 text-[10px] font-mono tracking-[0.25em] uppercase text-ink-dim hover:text-ink-solid bg-surface/60 hover:bg-surface/90 border border-line/40 backdrop-blur-md transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>SKIP INTRO</span>
              <span className="text-accent group-hover:translate-x-0.5 transition-transform">»</span>
            </button>
          </div>

          {/* Center Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-15 hidden md:block">
            <div className="w-20 h-20 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-ink-faint/40 to-transparent" />
              <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-ink-faint/40 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-accent/50 rounded-full" />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
            <div className="space-y-1">
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-ink-faint">
                ELEVATION // {stageInfo.altitude}
              </div>
              <div className="text-xs sm:text-sm font-light text-ink-dim font-mono tracking-wider">
                {stageInfo.sub}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-3 text-[9px] font-mono tracking-[0.28em] uppercase text-ink-faint">
                <span>SCROLL TO ZOOM OUT</span>
                <span className="text-accent">{(scrollProgress * 100).toFixed(0)}%</span>
              </div>
              <div className="w-44 h-[2px] bg-line/30 overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-75"
                  style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

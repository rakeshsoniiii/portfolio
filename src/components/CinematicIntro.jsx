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

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      container.style.display = 'none';
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020308, 0.002);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1500);
    camera.position.set(0, 0, 3.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
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

    // =========================================================================
    // LIGHTING
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x182030, 0.85);
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
    // STAGE 1: 3D LAPTOP, DESK & USER PORTRAIT (images/rakesh.png)
    // =========================================================================
    const studioGroup = new THREE.Group();
    studioGroup.position.set(0, 0, 0);

    // 1. Rakesh photo plane (workspace portrait backdrop)
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

    // 2. Procedural 3D Desk Surface
    const deskGeo = new THREE.BoxGeometry(6.5, 0.15, 2.5);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x181d28,
      roughness: 0.75,
      metalness: 0.15,
      transparent: true,
      opacity: 1.0,
    });
    const deskMesh = new THREE.Mesh(deskGeo, deskMat);
    deskMesh.position.set(0, -1.35, 1.1);
    studioGroup.add(deskMesh);

    // 3. Procedural 3D Laptop Model (positioned cleanly on desk in front of Rakesh)
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.35, -1.25, 1.4);
    laptopGroup.rotation.y = THREE.MathUtils.degToRad(8);

    // Laptop Base / Keyboard deck
    const baseGeo = new THREE.BoxGeometry(1.6, 0.04, 1.1);
    const laptopBodyMat = new THREE.MeshStandardMaterial({
      color: 0x28303f,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 1.0,
    });
    const baseMesh = new THREE.Mesh(baseGeo, laptopBodyMat);
    laptopGroup.add(baseMesh);

    // Keyboard Key Deck
    const keyboardGeo = new THREE.PlaneGeometry(1.4, 0.75);
    const keyboardMat = new THREE.MeshBasicMaterial({
      color: 0x0f1420,
      transparent: true,
      opacity: 1.0,
    });
    const keyboardMesh = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboardMesh.rotation.x = -Math.PI / 2;
    keyboardMesh.position.set(0, 0.025, 0.05);
    laptopGroup.add(keyboardMesh);

    // Laptop Screen Lid (tilted at natural 105 degrees)
    const screenLidGroup = new THREE.Group();
    screenLidGroup.position.set(0, 0.02, -0.5);
    screenLidGroup.rotation.x = -Math.PI * 0.08;

    const lidGeo = new THREE.BoxGeometry(1.6, 1.0, 0.03);
    const lidMesh = new THREE.Mesh(lidGeo, laptopBodyMat);
    lidMesh.position.set(0, 0.5, 0);
    screenLidGroup.add(lidMesh);

    // Glowing Code Screen Plane
    const screenGeo = new THREE.PlaneGeometry(1.5, 0.92);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.95,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.5, 0.02);
    screenLidGroup.add(screenMesh);

    laptopGroup.add(screenLidGroup);
    studioGroup.add(laptopGroup);

    // 4. Architectural Window Opening (camera flies through as it pulls back)
    const windowBorderGeo = new THREE.RingGeometry(2.6, 7.0, 4);
    const windowBorderMat = new THREE.MeshBasicMaterial({
      color: 0x050812,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
    });
    const windowBorder = new THREE.Mesh(windowBorderGeo, windowBorderMat);
    windowBorder.position.set(0, 0, 2.5);
    studioGroup.add(windowBorder);

    scene.add(studioGroup);

    // =========================================================================
    // STAGE 2: PROCEDURAL 3D CITY AERIAL / DRONE VIEW (BUILT WITH CODE)
    // =========================================================================
    const cityGroup = new THREE.Group();
    cityGroup.position.set(0, -3.0, -8.0);
    cityGroup.rotation.x = -Math.PI / 4.5;

    // Procedural 3D Skyscraper Blocks using InstancedMesh (180 buildings)
    const buildingCount = 180;
    const buildingGeo = new THREE.BoxGeometry(0.8, 1, 0.8);
    const buildingMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * instanceMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        uniform float uOpacity;
        void main() {
          vec3 grid = fract(vWorldPosition * 3.5);
          float isWindow = step(0.35, grid.x) * step(0.35, grid.y);
          
          vec3 darkFacade = vec3(0.06, 0.08, 0.14);
          vec3 amberWindow = vec3(1.0, 0.78, 0.35);
          vec3 cyanWindow = vec3(0.4, 0.8, 1.0);
          
          float windowColorPick = fract(sin(dot(floor(vWorldPosition * 3.5), vec3(12.9898, 78.233, 45.164))) * 43758.5453);
          vec3 litWindow = mix(amberWindow, cyanWindow, step(0.7, windowColorPick));
          
          float isVertical = 1.0 - abs(vNormal.y);
          vec3 col = mix(darkFacade, litWindow * 1.8, isWindow * isVertical * step(0.35, windowColorPick));
          
          gl_FragColor = vec4(col, uOpacity);
        }
      `,
      uniforms: {
        uOpacity: { value: 0.0 },
      },
      transparent: true,
    });

    const instancedBuildings = new THREE.InstancedMesh(buildingGeo, buildingMat, buildingCount);
    const dummy = new THREE.Object3D();
    const cityExtent = 24;

    for (let i = 0; i < buildingCount; i++) {
      const x = (Math.random() - 0.5) * cityExtent;
      const z = (Math.random() - 0.5) * cityExtent;
      const heightScale = 1.5 + Math.random() * 6.5;

      dummy.position.set(x, heightScale / 2, z);
      dummy.scale.set(0.6 + Math.random() * 0.7, heightScale, 0.6 + Math.random() * 0.7);
      dummy.updateMatrix();
      instancedBuildings.setMatrixAt(i, dummy.matrix);
    }
    instancedBuildings.instanceMatrix.needsUpdate = true;
    cityGroup.add(instancedBuildings);

    // City Ground Grid & Glowing Arterial Highway Lines
    const gridGroundGeo = new THREE.PlaneGeometry(cityExtent * 1.6, cityExtent * 1.6, 24, 24);
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
        void main() {
          vec2 grid = abs(fract(vUv * 30.0 - 0.5) - 0.5) / fwidth(vUv * 30.0);
          float line = 1.0 - min(min(grid.x, grid.y), 1.0);
          
          vec3 col = mix(vec3(0.02, 0.04, 0.08), vec3(1.0, 0.65, 0.2), line * 0.65);
          gl_FragColor = vec4(col, uOpacity);
        }
      `,
      uniforms: {
        uOpacity: { value: 0.0 },
      },
      transparent: true,
    });
    const gridGround = new THREE.Mesh(gridGroundGeo, gridGroundMat);
    gridGround.rotation.x = -Math.PI / 2;
    cityGroup.add(gridGround);

    scene.add(cityGroup);

    // =========================================================================
    // STAGE 3: WEST BENGAL & REGIONAL CONTINENTAL TERRAIN (BUILT WITH CODE)
    // =========================================================================
    const subcontinentGroup = new THREE.Group();
    subcontinentGroup.position.set(0, -1.8, -20.0);
    subcontinentGroup.rotation.x = -Math.PI / 5.2;

    const subcontinentGeo = new THREE.SphereGeometry(18, 48, 36, 0, Math.PI * 0.65, 0, Math.PI * 0.45);
    const subcontinentMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/earth-day.webp'),
      roughness: 0.7,
      metalness: 0.1,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
    });
    const subcontinentMesh = new THREE.Mesh(subcontinentGeo, subcontinentMat);
    subcontinentMesh.rotation.y = THREE.MathUtils.degToRad(120);
    subcontinentMesh.rotation.x = THREE.MathUtils.degToRad(25);
    subcontinentGroup.add(subcontinentMesh);
    scene.add(subcontinentGroup);

    // =========================================================================
    // STAGE 4: VOLUMETRIC CLOUD DECKS & ATMOSPHERE
    // =========================================================================
    const cloudDeckGeo = new THREE.PlaneGeometry(50, 30);
    const cloudDeckMat = new THREE.MeshBasicMaterial({
      map: loadTex('/textures/earth-clouds.webp'),
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const cloudDeck = new THREE.Mesh(cloudDeckGeo, cloudDeckMat);
    cloudDeck.position.set(0, 0.2, -16.0);
    scene.add(cloudDeck);

    // =========================================================================
    // STAGE 5: DEEP SPACE STARS (FADE IN ONLY ONCE IN SPACE)
    // =========================================================================
    const starCount = 3500;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const dist = 300 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = dist * Math.cos(phi);

      const b = 0.4 + Math.random() * 0.5;
      starCols[i * 3] = 0.9 * b;
      starCols[i * 3 + 1] = 0.95 * b;
      starCols[i * 3 + 2] = 1.0 * b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      map: createCircleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.0, // Appears only when entering space
      alphaTest: 0.005,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // =========================================================================
    // STAGE 6: FULL 3D EARTH (EXACT #HERO SCALE & FRAMING)
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
    const cloudGeo = new THREE.SphereGeometry(3.34, 64, 48);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: loadTex('/textures/earth-clouds.webp'),
      transparent: true,
      opacity: 0.0,
      blending: THREE.NormalBlending,
      roughness: 1.0,
    });
    const earthClouds = new THREE.Mesh(cloudGeo, cloudMat);
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
    });
    earthGroup.add(new THREE.Mesh(atmoGeo, atmoMat));
    scene.add(earthGroup);

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

        // Mark session intro seen once 95% complete
        if (p >= 0.95) {
          sessionStorage.setItem('portfolio_intro_seen', 'true');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Animation Loop ---
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth scrub lerp
      currentP += (targetP - currentP) * 0.085;

      // Telemetry HUD updates based on altitude
      if (currentP < 0.20) {
        setStageInfo({
          title: 'STATION // PILOT WORKSPACE',
          altitude: `${(0.8 + currentP * 80).toFixed(1)}M`,
          sub: 'DEVELOPER STUDY · FOCUS PLAN EXECUTE REPEAT',
        });
      } else if (currentP < 0.45) {
        setStageInfo({
          title: 'DRONE // URBAN AERIAL VIEW',
          altitude: `${Math.round(25 + (currentP - 0.20) * 3200)}M`,
          sub: '3D PROCEDURAL METROPOLIS & STREET LIGHTS',
        });
      } else if (currentP < 0.70) {
        setStageInfo({
          title: 'SATELLITE // REGIONAL ASCENT',
          altitude: `${Math.round(25 + (currentP - 0.45) * 450)}KM`,
          sub: 'WEST BENGAL · GANGES DELTA · BAY OF BENGAL',
        });
      } else if (currentP < 0.88) {
        setStageInfo({
          title: 'ORBITAL // INDIAN SUBCONTINENT',
          altitude: `${Math.round(180 + (currentP - 0.70) * 3500)}KM`,
          sub: 'CONTINENTAL VIEW · ATMOSPHERIC CLOUD DECKS',
        });
      } else {
        setStageInfo({
          title: 'DEEP SPACE // EARTH HOME ORBIT',
          altitude: '12,742KM',
          sub: '28.6139° N, 77.2090° E · HOME TELEMETRY',
        });
      }

      // --- CROSS-FADING OPACITIES ---
      // 1. Studio & Laptop: 1.0 at start, fades out 0.16 -> 0.28
      const studioOpacity = Math.max(0, Math.min(1, 1 - (currentP - 0.16) / 0.12));
      portraitMat.opacity = studioOpacity;
      deskMat.opacity = studioOpacity;
      laptopBodyMat.opacity = studioOpacity;
      keyboardMat.opacity = studioOpacity;
      screenMat.opacity = studioOpacity;
      windowBorderMat.opacity = studioOpacity * 0.95;
      deskLamp.intensity = studioOpacity * 2.5;
      laptopGlow.intensity = studioOpacity * 2.8;

      // 2. 3D Procedural City: Fades in 0.16 -> 0.28, stays, fades out 0.44 -> 0.56
      let cityOpacity = 0;
      if (currentP < 0.16) {
        cityOpacity = 0;
      } else if (currentP < 0.28) {
        cityOpacity = (currentP - 0.16) / 0.12;
      } else if (currentP < 0.44) {
        cityOpacity = 1.0;
      } else if (currentP < 0.56) {
        cityOpacity = 1 - (currentP - 0.44) / 0.12;
      } else {
        cityOpacity = 0;
      }
      buildingMat.uniforms.uOpacity.value = cityOpacity;
      gridGroundMat.uniforms.uOpacity.value = cityOpacity;

      // 3. West Bengal & India Terrain: Fades in 0.42 -> 0.54, stays, fades out 0.68 -> 0.80
      let subOpacity = 0;
      if (currentP < 0.42) {
        subOpacity = 0;
      } else if (currentP < 0.54) {
        subOpacity = (currentP - 0.42) / 0.12;
      } else if (currentP < 0.68) {
        subOpacity = 1.0;
      } else if (currentP < 0.80) {
        subOpacity = 1 - (currentP - 0.68) / 0.12;
      } else {
        subOpacity = 0;
      }
      subcontinentMat.uniforms.uOpacity.value = subOpacity;

      // 4. Cloud Decks: Visible 0.60 -> 0.86
      let cloudOpacity = 0;
      if (currentP >= 0.60 && currentP <= 0.88) {
        if (currentP < 0.72) {
          cloudOpacity = (currentP - 0.60) / 0.12;
        } else {
          cloudOpacity = 1 - (currentP - 0.72) / 0.16;
        }
      }
      cloudDeckMat.opacity = cloudOpacity * 0.85;

      // 5. Stars: Fades in ONLY when entering space (p >= 0.72)
      const starsOpacity = Math.max(0, Math.min(0.65, (currentP - 0.72) / 0.20));
      starMat.opacity = starsOpacity;
      starPoints.rotation.y += 0.0001;

      // 6. Full 3D Earth: Fades in 0.74 -> 0.92, matches #hero
      const earthOpacity = Math.max(0, Math.min(1, (currentP - 0.74) / 0.18));
      earthMat.opacity = earthOpacity;
      cloudMat.opacity = earthOpacity * 0.85;
      atmoMat.uniforms.uOpacity.value = earthOpacity;

      earthMesh.rotation.y += 0.0014;
      earthClouds.rotation.y += 0.0022;

      // --- CAMERA CHOREOGRAPHY ---
      let camX, camY, camZ, lookX, lookY, lookZ;

      if (currentP < 0.30) {
        // Pulling back from 3D laptop through window
        const t = currentP / 0.30;
        camX = THREE.MathUtils.lerp(0, 0.1, t);
        camY = THREE.MathUtils.lerp(0, 0.3, t);
        camZ = THREE.MathUtils.lerp(3.8, 7.5, t);
        lookX = 0;
        lookY = 0;
        lookZ = 0;
      } else if (currentP < 0.70) {
        // High drone altitude into continental overview
        const t = (currentP - 0.30) / 0.40;
        camX = THREE.MathUtils.lerp(0.1, 0.0, t);
        camY = THREE.MathUtils.lerp(0.3, 0.6, t);
        camZ = THREE.MathUtils.lerp(7.5, 9.5, t);
        lookX = 0;
        lookY = 0;
        lookZ = 0;
      } else {
        // Reaching space and locking into #hero framing:
        // cam (-0.4, 0.4, 10.5), look (2.8, -0.2, 0)
        const t = (currentP - 0.70) / 0.30;
        const ease = t * t * (3 - 2 * t);
        camX = THREE.MathUtils.lerp(0.0, -0.4, ease);
        camY = THREE.MathUtils.lerp(0.6, 0.4, ease);
        camZ = THREE.MathUtils.lerp(9.5, 10.5, ease);
        lookX = THREE.MathUtils.lerp(0.0, 2.8, ease);
        lookY = THREE.MathUtils.lerp(0.0, -0.2, ease);
        lookZ = 0;
      }

      camera.position.set(camX, camY, camZ);
      camera.lookAt(lookX, lookY, lookZ);

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
    };
  }, []);

  // Skip Intro handler: smoothly scrolls directly past intro into #hero
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
      className="relative h-[380vh] w-full bg-[#020308] z-20"
      aria-label="Cinematic 3D Zoom-Out Intro"
    >
      {/* 100vh Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#020308]">
        {/* Three.js Canvas Container */}
        <div ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        {/* Minimal Editorial HUD Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-12 lg:p-16 z-10">
          {/* Top Bar: Telemetry & Skip Button */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ink-faint">
                {stageInfo.title}
              </span>
            </div>

            {/* Skip Intro Button */}
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-[10px] font-mono tracking-[0.25em] uppercase text-ink-dim hover:text-ink-solid bg-surface/60 hover:bg-surface/90 border border-line/40 backdrop-blur-md transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>SKIP INTRO</span>
              <span className="text-accent group-hover:translate-x-0.5 transition-transform">»</span>
            </button>
          </div>

          {/* Center Coordinates Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden md:block">
            <div className="w-16 h-16 border border-line/50 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-accent rounded-full" />
            </div>
          </div>

          {/* Bottom Bar: Altitude Telemetry & Scroll Cue */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
            <div className="space-y-1">
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-ink-faint">
                ELEVATION // {stageInfo.altitude}
              </div>
              <div className="text-xs sm:text-sm font-light text-ink-dim font-mono tracking-wider">
                {stageInfo.sub}
              </div>
            </div>

            {/* Scroll Indicator with scrub progress bar */}
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

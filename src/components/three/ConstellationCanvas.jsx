import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

// ─── Configuration ───────────────────────────────────────────────
const CONFIG = {
  PARTICLE_COUNT: 100, // 80–120 sweet spot for density vs perf
  CONNECTION_DISTANCE: 2.8, // Max distance to draw a line between two dots
  DOT_SIZE: 0.045, // Radius of each sphere dot
  DRIFT_SPEED: 0.0012, // How fast particles float (very slow)
  MOUSE_INFLUENCE: 1.6, // Camera parallax intensity (subtle)
  MOUSE_EASE: 0.03, // Smoothing factor for camera lerp
  BOUNDS: { x: 8, y: 5, z: 4 }, // 3D bounding box for particle space
  BG_COLOR: 0x0a0a12, // Near-black, not pure black
  DOT_COLOR: 0xcbd5e1, // slate-300 — soft white
  LINE_COLOR: 0x94a3b8, // slate-400 — slightly dimmer for lines
  LINE_OPACITY: 0.15, // Very faint connections
  FOG_NEAR: 3,
  FOG_FAR: 14,
};

// ─── Particle class ──────────────────────────────────────────────
// Each particle stores its position AND a velocity vector for drifting.
class Particle {
  constructor(bounds) {
    this.position = new THREE.Vector3(
      (Math.random() - 0.5) * bounds.x * 2,
      (Math.random() - 0.5) * bounds.y * 2,
      (Math.random() - 0.5) * bounds.z * 2,
    );
    // Tiny random velocity for organic drifting
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * CONFIG.DRIFT_SPEED,
      (Math.random() - 0.5) * CONFIG.DRIFT_SPEED,
      (Math.random() - 0.5) * CONFIG.DRIFT_SPEED * 0.5,
    );
    this.bounds = bounds;
  }

  update() {
    this.position.add(this.velocity);
    // Soft wrap: reverse direction when approaching bounds edge
    // This avoids harsh teleporting and keeps motion seamless
    if (Math.abs(this.position.x) > this.bounds.x) this.velocity.x *= -1;
    if (Math.abs(this.position.y) > this.bounds.y) this.velocity.y *= -1;
    if (Math.abs(this.position.z) > this.bounds.z) this.velocity.z *= -1;
  }
}

// ─── React Component ─────────────────────────────────────────────
const ConstellationCanvas = () => {
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  const init = useCallback((container) => {
    // ── Scene setup ────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.BG_COLOR);
    scene.fog = new THREE.Fog(CONFIG.BG_COLOR, CONFIG.FOG_NEAR, CONFIG.FOG_FAR);

    // ── Camera ─────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 8);

    // ── Renderer ───────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    // Fade-in: start transparent, transition to full opacity over 1s
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 1s ease-out";
    container.appendChild(renderer.domElement);

    // Trigger the CSS fade-in after paint
    requestAnimationFrame(() => {
      renderer.domElement.style.opacity = "1";
    });

    // ── Create particles ───────────────────────────────────────
    const particles = [];
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      particles.push(new Particle(CONFIG.BOUNDS));
    }

    // ── Dot meshes (InstancedMesh for performance) ─────────────
    // InstancedMesh renders all 100 dots in a SINGLE draw call
    const dotGeometry = new THREE.SphereGeometry(CONFIG.DOT_SIZE, 8, 8);
    const dotMaterial = new THREE.MeshBasicMaterial({
      color: CONFIG.DOT_COLOR,
      transparent: true,
      opacity: 0.8,
    });
    const dots = new THREE.InstancedMesh(
      dotGeometry,
      dotMaterial,
      CONFIG.PARTICLE_COUNT,
    );
    scene.add(dots);

    const dummy = new THREE.Object3D(); // Reusable transform object

    // ── Connection lines ───────────────────────────────────────
    // Pre-allocate a LineSegments buffer big enough for worst-case connections.
    // Max possible pairs = n*(n-1)/2, each pair = 2 vertices = 6 floats
    const maxPairs = (CONFIG.PARTICLE_COUNT * (CONFIG.PARTICLE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(maxPairs * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeometry.setDrawRange(0, 0); // Start with nothing drawn
    const lineMaterial = new THREE.LineBasicMaterial({
      color: CONFIG.LINE_COLOR,
      transparent: true,
      opacity: CONFIG.LINE_OPACITY,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    // Manually set bounding sphere to suppress NaN warning when draw range starts at 0
    lineGeometry.boundingSphere = new THREE.Sphere(
      new THREE.Vector3(0, 0, 0),
      20,
    );
    scene.add(lines);

    // ── Mouse tracking ─────────────────────────────────────────
    const mouse = { x: 0, y: 0 }; // Raw normalized position
    const smoothMouse = { x: 0, y: 0 }; // Lerped for smooth camera motion

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; // -1 to 1 (inverted)
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize handler ─────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ─────────────────────────────────────────
    let animationId;
    const distThresholdSq =
      CONFIG.CONNECTION_DISTANCE * CONFIG.CONNECTION_DISTANCE;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // 1. Update particle positions
      for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
        particles[i].update();

        // Update InstancedMesh matrix for this dot
        dummy.position.copy(particles[i].position);
        dummy.updateMatrix();
        dots.setMatrixAt(i, dummy.matrix);
      }
      dots.instanceMatrix.needsUpdate = true;

      // 2. Compute connections (O(n²) but trivial for ~100 particles)
      let lineVertexCount = 0;
      const posAttr = lineGeometry.attributes.position;

      for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < CONFIG.PARTICLE_COUNT; j++) {
          const dx = particles[i].position.x - particles[j].position.x;
          const dy = particles[i].position.y - particles[j].position.y;
          const dz = particles[i].position.z - particles[j].position.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < distThresholdSq) {
            const idx = lineVertexCount * 3;
            // Vertex A
            linePositions[idx] = particles[i].position.x;
            linePositions[idx + 1] = particles[i].position.y;
            linePositions[idx + 2] = particles[i].position.z;
            // Vertex B
            linePositions[idx + 3] = particles[j].position.x;
            linePositions[idx + 4] = particles[j].position.y;
            linePositions[idx + 5] = particles[j].position.z;
            lineVertexCount += 2;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineVertexCount);
      posAttr.needsUpdate = true;

      // 3. Smooth mouse parallax on camera
      smoothMouse.x += (mouse.x - smoothMouse.x) * CONFIG.MOUSE_EASE;
      smoothMouse.y += (mouse.y - smoothMouse.y) * CONFIG.MOUSE_EASE;
      camera.position.x = smoothMouse.x * CONFIG.MOUSE_INFLUENCE;
      camera.position.y = smoothMouse.y * CONFIG.MOUSE_INFLUENCE;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup function ───────────────────────────────────────
    // Properly dispose every Three.js resource to avoid GPU memory leaks
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      dotGeometry.dispose();
      dotMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize the scene
    cleanupRef.current = init(container);

    // Fire disposal on unmount
    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{
        background: `#${CONFIG.BG_COLOR.toString(16).padStart(6, "0")}`,
      }}
      aria-hidden="true" // Accessibility: decorative-only element
    />
  );
};

export default ConstellationCanvas;

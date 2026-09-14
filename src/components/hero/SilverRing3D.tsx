import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Hero.module.css';

/**
 * Anel de prata 925 em 3D (Three.js puro, carregado sob demanda).
 *
 * - Perfil do aro desenhado com LatheGeometry (meia-cana com arestas suaves), como um anel real.
 * - Reflexos vêm de um "estúdio" gerado em código (faixas de luz + um toque azul-luz) pré-filtrado
 *   com PMREM: nenhum HDR externo precisa ser baixado.
 * - Reage ao cursor (inclinação) e à rolagem (giro); o loop pausa fora da tela ou com a aba oculta.
 */

function ringProfile(radius: number, width: number, thickness: number) {
  // Seção do aro: parte interna reta (conforto), externa abaulada.
  const pts: THREE.Vector2[] = [];
  const steps = 28;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI;
    pts.push(new THREE.Vector2(radius + Math.sin(t) * thickness, -Math.cos(t) * (width / 2)));
  }
  pts.push(new THREE.Vector2(radius - thickness * 0.08, width / 2));
  pts.push(new THREE.Vector2(radius - thickness * 0.08, -width / 2));
  pts.push(pts[0].clone());
  return pts;
}

function studioEnvironment(renderer: THREE.WebGLRenderer) {
  const scene = new THREE.Scene();
  // Fundo cinza médio: a prata reflete o ambiente inteiro, então um fundo preto a deixaria "cromo negro".
  scene.background = new THREE.Color('#5d636d');
  const panel = (w: number, h: number, color: string, intensity: number, pos: [number, number, number]) => {
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    mesh.position.set(...pos);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
  };
  panel(14, 3, '#ffffff', 3.5, [0, 7, 1]); // softbox superior
  panel(2.5, 12, '#f5f7fa', 2.6, [-8, 0, 3]); // faixa lateral esquerda
  panel(2.5, 12, '#ffffff', 1.8, [8, 0, 4]); // faixa lateral direita
  panel(1.2, 9, '#8db8e8', 2.2, [6, 1, -5]); // recorte azul-luz
  panel(16, 5, '#1b1e23', 1, [0, -7, 0]); // chão escuro: dá contraste e definição às bordas
  panel(4, 1, '#ffffff', 5, [2, -3, 7]); // brilho frontal baixo

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(scene, 0.035).texture;
  pmrem.dispose();
  scene.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    }
  });
  return env;
}

export default function SilverRing3D({ onReady }: { onReady?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.environment = studioEnvironment(renderer);

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 0, 9);

    const silver = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#eef1f5'),
      metalness: 1,
      roughness: 0.16,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.35,
    });
    const brushed = silver.clone();
    brushed.roughness = 0.34;
    brushed.color = new THREE.Color('#c9ced7');

    const rig = new THREE.Group();
    scene.add(rig);

    // Aro principal (largo) + aro orbital fino entrelaçado.
    const band = new THREE.Mesh(new THREE.LatheGeometry(ringProfile(1.35, 0.62, 0.2), 160), silver);
    band.rotation.x = Math.PI / 2;
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.055, 32, 220), brushed);
    orbit.rotation.set(Math.PI / 2.6, Math.PI / 5, 0);
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.11, 48, 48), silver);
    rig.add(band, orbit, bead);

    const key = new THREE.DirectionalLight('#ffffff', 1.6);
    key.position.set(3, 5, 6);
    const rim = new THREE.DirectionalLight('#8db8e8', 1.1);
    rim.position.set(-5, -2, -3);
    scene.add(key, rim);

    // Estado de interação suavizado (lerp) para evitar movimentos bruscos.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let scroll = 0;
    let visible = true;
    let frame = 0;
    const startedAt = performance.now();

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Em telas estreitas, afasta a câmera para o anel caber inteiro.
      camera.position.z = w / h < 0.8 ? 11.5 : 9;
      camera.updateProjectionMatrix();
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
    };

    const render = () => {
      frame = 0;
      if (!visible) return;
      const t = (performance.now() - startedAt) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      // Começa em vista 3/4 (nunca de perfil puro), gira devagar e responde ao cursor e à rolagem.
      rig.rotation.y = 0.7 + Math.sin(t * 0.22) * 0.55 + pointer.x * 0.4 + scroll * 1.1;
      rig.rotation.x = -0.55 + pointer.y * 0.25 + scroll * 0.35;
      rig.rotation.z = Math.sin(t * 0.3) * 0.06;
      rig.position.y = Math.sin(t * 0.8) * 0.08 + scroll * 0.6;
      orbit.rotation.z = t * 0.25;
      const a = t * 0.5;
      bead.position.set(Math.cos(a) * 1.62, 0, Math.sin(a) * 1.62).applyEuler(orbit.rotation);

      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(render);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(host);
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    resize();
    onScroll();
    renderer.render(scene, camera);
    onReady?.();
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
      silver.dispose();
      brushed.dispose();
      scene.environment?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady]);

  return <div ref={hostRef} className={styles.canvasHost} />;
}

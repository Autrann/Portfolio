import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function DataCore({ nodes }) {
  const mountRef = useRef(null);
  const shellRef = useRef(null);
  const connectionRef = useRef(null);
  const centerRef = useRef(null);
  const pathRefs = useRef(new Map());
  const nodeDotRefs = useRef(new Map());

  useEffect(() => {
    let frameId = 0;

    const updateConnections = () => {
      const connectionLayer = connectionRef.current;
      const centerBadge = centerRef.current;

      if (connectionLayer && centerBadge) {
        const svgRect = connectionLayer.getBoundingClientRect();
        const centerRect = centerBadge.getBoundingClientRect();
        const startX = ((centerRect.left + centerRect.width / 2 - svgRect.left) / svgRect.width) * 100;
        const startY = ((centerRect.top + centerRect.height / 2 - svgRect.top) / svgRect.height) * 100;

        nodes.forEach((node) => {
          const path = pathRefs.current.get(node.id);
          const dot = nodeDotRefs.current.get(node.id);
          if (!path || !dot) return;

          const dotRect = dot.getBoundingClientRect();
          const endX = ((dotRect.left + dotRect.width / 2 - svgRect.left) / svgRect.width) * 100;
          const endY = ((dotRect.top + dotRect.height / 2 - svgRect.top) / svgRect.height) * 100;
          const deltaX = endX - startX;
          const deltaY = endY - startY;

          path.setAttribute(
            'd',
            `M ${startX} ${startY} C ${startX + deltaX * 0.32} ${startY + deltaY * 0.08}, ${endX - deltaX * 0.16} ${endY - deltaY * 0.3}, ${endX} ${endY}`
          );
        });
      }

      frameId = requestAnimationFrame(updateConnections);
    };

    frameId = requestAnimationFrame(updateConnections);
    return () => cancelAnimationFrame(frameId);
  }, [nodes]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.15, 6.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const atom = new THREE.Group();
    scene.add(atom);

    const colors = {
      cyan: 0x4fe3c1,
      gold: 0xffc857,
      coral: 0xf25f5c,
      violet: 0x7c5cff,
      white: 0xf6f7fb,
    };

    const nucleus = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.72, 3),
      new THREE.MeshStandardMaterial({
        color: 0x111723,
        emissive: 0x143c45,
        roughness: 0.24,
        metalness: 0.38,
        wireframe: true,
      })
    );
    atom.add(nucleus);

    const innerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.52, 32, 32),
      new THREE.MeshBasicMaterial({
        color: colors.cyan,
        transparent: true,
        opacity: 0.16,
      })
    );
    atom.add(innerGlow);

    const rings = [
      [0, 0, 0, colors.cyan],
      [Math.PI / 2.8, 0, Math.PI / 7, colors.gold],
      [Math.PI / 2, Math.PI / 4, 0, colors.violet],
      [Math.PI / 2.4, -Math.PI / 5, Math.PI / 3, colors.coral],
    ].map(([x, y, z, color], index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.72 + index * 0.08, 0.008, 16, 160),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.58,
        })
      );
      ring.rotation.set(x, y, z);
      atom.add(ring);
      return ring;
    });

    const electrons = [];
    const electronGeometry = new THREE.SphereGeometry(0.065, 18, 18);
    rings.forEach((ring, index) => {
      const electron = new THREE.Mesh(
        electronGeometry,
        new THREE.MeshBasicMaterial({ color: [colors.cyan, colors.gold, colors.violet, colors.coral][index] })
      );
      electron.userData = {
        radius: 1.72 + index * 0.08,
        speed: 0.85 + index * 0.18,
        offset: index * 1.55,
        ring,
      };
      atom.add(electron);
      electrons.push(electron);
    });

    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    for (let index = 0; index < 140; index += 1) {
      starPositions.push(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5.2,
        (Math.random() - 0.5) * 4
      );
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({
        color: colors.white,
        size: 0.018,
        transparent: true,
        opacity: 0.38,
      })
    );
    scene.add(stars);

    scene.add(new THREE.AmbientLight(0xffffff, 0.82));
    const light = new THREE.PointLight(colors.cyan, 20, 12);
    light.position.set(2.8, 2.2, 3.2);
    scene.add(light);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener('pointermove', onPointerMove);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let frameId = 0;
    const animate = (time) => {
      const t = time * 0.001;
      atom.rotation.y = t * 0.18 + pointer.x * 0.18;
      atom.rotation.x = Math.sin(t * 0.4) * 0.1 + pointer.y * 0.12;
      nucleus.rotation.x = t * 0.42;
      nucleus.rotation.z = t * 0.28;
      innerGlow.scale.setScalar(1 + Math.sin(t * 2.2) * 0.08);
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0018 + index * 0.0008;
      });
      electrons.forEach((electron) => {
        const angle = t * electron.userData.speed + electron.userData.offset;
        const local = new THREE.Vector3(
          Math.cos(angle) * electron.userData.radius,
          Math.sin(angle) * electron.userData.radius,
          0
        );
        local.applyEuler(electron.userData.ring.rotation);
        electron.position.copy(local);
      });
      stars.rotation.y = -t * 0.035;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      electronGeometry.dispose();
      starsGeometry.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  const handleTilt = (event) => {
    const shell = shellRef.current;
    if (!shell) return;
    const rect = shell.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    shell.style.setProperty('--tiltX', `${y}deg`);
    shell.style.setProperty('--tiltY', `${x}deg`);
  };

  return (
    <div className="dataCore dataCoreHub" ref={shellRef} onPointerMove={handleTilt}>
      <svg
        className="connectionLayer"
        ref={connectionRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {nodes.map((node) => (
          <path
            className={`connectionLine ${node.tone}`}
            d="M 50 50"
            key={node.id}
            ref={(element) => {
              if (element) pathRefs.current.set(node.id, element);
            }}
          />
        ))}
      </svg>

      <div className="canvasShell atomCanvas" ref={mountRef} aria-label="Atomo 3D interactivo" />

      <div className="centerBadge" ref={centerRef}>
        <span>Data</span>
        <strong>Core</strong>
      </div>

      {nodes.map((node) => (
        <a className={`hubCard ${node.position} ${node.tone}`} href={`#${node.id}`} key={node.id}>
          <span
            className="nodeDot"
            ref={(element) => {
              if (element) nodeDotRefs.current.set(node.id, element);
            }}
          />
          <div className="hubPreview">
            {node.preview.slice(0, 3).map((item, index) => (
              <span key={item} style={{ '--size': `${54 + index * 16}%` }}>
                {item}
              </span>
            ))}
          </div>
          <div className="hubCopy">
            <small>{node.label}</small>
            <h3>{node.title}</h3>
            <p>{node.text}</p>
          </div>
          <strong className="hubStat">{node.stat}</strong>
        </a>
      ))}
    </div>
  );
}

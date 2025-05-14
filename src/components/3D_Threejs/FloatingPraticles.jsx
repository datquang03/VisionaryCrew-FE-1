import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Use React.memo to prevent re-renders of Planet components
const Planet = React.memo(({ position }) => {
  const planetRef = useRef();
  const geometry = useMemo(() => new THREE.SphereGeometry(0.5, 32, 32), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x1e90ff,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (planetRef.current) {
      const time = clock.getElapsedTime();
      const radius = 5;
      const speed = 0.04;

      planetRef.current.position.x =
        radius * Math.cos(time * speed) + position[0];
      planetRef.current.position.z =
        radius * Math.sin(time * speed) + position[2];

      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={planetRef}
      position={position}
      geometry={geometry}
      material={material}
    />
  );
});

const FloatingParticles = React.memo(() => {
  const ref = useRef();
  const count = 500;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;

    colors[i] = Math.random();
    colors[i + 1] = Math.random();
    colors[i + 2] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const posAttr = ref.current.geometry.attributes.position;
    const posArray = posAttr.array;

    for (let i = 0; i < posArray.length; i += 3) {
      posArray[i + 1] += Math.sin(time + posArray[i]) * 0.001;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <group>
      <points ref={ref} geometry={geometry}>
        <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
      </points>
      <Planet position={[4, 3, -5]} />
      <Planet position={[-3, -4, 2]} />
      <Planet position={[2, -1, 4]} />
    </group>
  );
});

export default FloatingParticles;

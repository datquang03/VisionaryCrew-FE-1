import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// DreamyCircles Component for the misty, moving circles effect
const DreamyCircles = () => {
  const circlesRef = React.useRef([]);
  const count = 5; // Number of circles

  // Create circles with random properties
  const circles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10, // X
          (Math.random() - 0.5) * 10, // Y
          (Math.random() - 0.5) * 5 // Z
        ),
        scale: Math.random() * 2 + 1, // Random size (1 to 3)
        speed: Math.random() * 0.02 + 0.01, // Random speed
        opacity: Math.random() * 1 + 2, // Increased base opacity (0.5 to 0.8)
      });
    }
    return temp;
  }, [count]);

  // Shader for soft, glowing circles
  const shaderMaterial = React.useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color("#87CEEB") },
        uOpacity: { value: 0.7 }, // Increased default opacity
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform float uOpacity;
        void main() {
          float dist = length(vUv - vec2(0.5)); // Distance from center
          float alpha = smoothstep(0.5, 0.1, dist); // Soft edge
          gl_FragColor = vec4(uColor, alpha * uOpacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  // Animate the circles
  useFrame(() => {
    circlesRef.current.forEach((circle, i) => {
      const data = circles[i];
      circle.position.y += data.speed; // Move up
      if (circle.position.y > 5) {
        circle.position.y = -5; // Reset to bottom
      }
      // Slight horizontal drift
      circle.position.x += Math.sin(circle.position.y * 0.5) * 0.01;
      // Fade in/out effect with increased range
      data.opacity = 0.5 + 0.3 * Math.sin(Date.now() * 0.001 + i); // Opacity 0.5 to 0.8
      circle.material.uniforms.uOpacity.value = data.opacity;
    });
  });

  return (
    <>
      {circles.map((circle, i) => (
        <mesh
          key={i}
          ref={(el) => (circlesRef.current[i] = el)}
          position={circle.position}
          scale={[circle.scale, circle.scale, 1]}
          material={shaderMaterial}
        >
          <planeGeometry args={[1, 1]} />
        </mesh>
      ))}
    </>
  );
};

export default DreamyCircles;

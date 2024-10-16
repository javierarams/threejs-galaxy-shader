import { MathUtils } from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import fragmentShader from '../assets/shaders/fragment.glsl';
import vertexShader from '../assets/shaders/vertex.glsl';

export default function Galaxy() {
  const [particles, setParticles] = useState([]);
  const pointsRef = useRef();

  const handleClick = () => {
    if (particles.length <= 1500) {
      const newParticles = Array.from({ length: 100 }, () => ({
        position: [
          MathUtils.randFloatSpread(1),
          MathUtils.randFloatSpread(1),
          MathUtils.randFloatSpread(1),
        ],
        randomness: [
          MathUtils.randFloatSpread(10),
          MathUtils.randFloatSpread(10),
          MathUtils.randFloatSpread(10),
        ],
        lifetime: MathUtils.randFloat(1, 3),
      }));
      setParticles((prev) => [...prev, ...newParticles]);
    }
  };

  function Points() {
    const positions = new Float32Array(particles.length * 3);
    const randomness = new Float32Array(particles.length * 3);
    const lifetimes = new Float32Array(particles.length);

    particles.forEach((particle, i) => {
      positions.set(particle.position, i * 3);
      randomness.set(particle.randomness, i * 3);
      lifetimes.set([particle.lifetime], i);
    });

    return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={particles.length}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aRandomness"
            array={randomness}
            count={particles.length}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aLifetime"
            array={lifetimes}
            count={particles.length}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          uniforms={{
            uTime: { value: 0.0 },
            uSize: { value: 5.0 },
            uVelocity: { value: 1.0 },
          }}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
      </points>
    );
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (time > 1) {
      handleClick();
    }

    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = time;
    }
  });

  return (
    <>
      <Points />
    </>
  );
}

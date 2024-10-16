uniform float uSize;
uniform float uTime;
attribute vec3 aRandomness;
attribute float aLifetime;

varying float vLifetime;

void main() {
    float lifeProgress = mod(uTime, aLifetime) / aLifetime;

    // Initial random velocity and slowdown effect
    vec3 velocity = aRandomness * (1.0 - lifeProgress);

    // Particle position
    vec3 startPosition = vec3(0.0, 0.0, 0.0);
    vec3 newPosition = startPosition + (velocity);

    // Set the gl_Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = uSize * (1.0 - lifeProgress); // Particle size decreases over time
}
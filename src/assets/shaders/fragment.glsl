varying float vLifetime;

void main() {
    // Simple fading effect based on lifetime
    float alpha = 1.0 - vLifetime;
    
    // Final color (can be adjusted for a more paint-like effect)
    gl_FragColor = vec4(1.0, 0.5, 0.2, alpha); // Orange color with fade-out effect
}